import { validateContactPayload, type ContactPayload } from "./shared/contact";

type Assets = { fetch(request: Request): Promise<Response> };

type RateLimitEntry = { count: number; resetAt: number };

export interface Env {
  ASSETS: Assets;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_ALLOWED_ORIGIN?: string;
  CONTACT_REQUIRE_ORIGIN?: string;
  CONTACT_MAX_BODY_BYTES?: string;
  CONTACT_RATE_LIMIT_PER_WINDOW?: string;
  CONTACT_RATE_LIMIT_WINDOW_SECONDS?: string;
}

const rateLimits = new Map<string, RateLimitEntry>();

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });

const securityHeaders = (response: Response) => {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  headers.set("X-Frame-Options", "DENY");
  return new Response(response.body, { status: response.status, headers });
};

const numberEnv = (value: string | undefined, fallback: number, minimum: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= minimum ? parsed : fallback;
};

const maxBodyBytes = (env: Env) => numberEnv(env.CONTACT_MAX_BODY_BYTES, 16 * 1024, 1024);
const rateLimitPerWindow = (env: Env) =>
  numberEnv(env.CONTACT_RATE_LIMIT_PER_WINDOW, 5, 1);
const rateWindowMs = (env: Env) =>
  numberEnv(env.CONTACT_RATE_LIMIT_WINDOW_SECONDS, 900, 1) * 1000;

const allowedOrigin = (request: Request, env: Env) => {
  const origin = request.headers.get("Origin");
  const required = env.CONTACT_REQUIRE_ORIGIN === "true";
  if (!origin) return required ? undefined : "";
  const configured = (env.CONTACT_ALLOWED_ORIGIN ?? "")
    .split(",")
    .map(value => value.trim())
    .filter(Boolean);
  return configured.includes(origin) ? origin : undefined;
};

const corsHeaders = (origin: string) =>
  origin
    ? {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "600",
        Vary: "Origin",
      }
    : {};

const requestKey = (request: Request) =>
  request.headers.get("CF-Connecting-IP") ??
  request.headers.get("X-Forwarded-For")?.split(",")[0]?.trim() ??
  "anonymous";

const allowRequest = (request: Request, env: Env) => {
  const now = Date.now();
  const key = requestKey(request);
  const current = rateLimits.get(key);
  const windowMs = rateWindowMs(env);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  const limit = rateLimitPerWindow(env);
  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }
  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
};

const plainText = (payload: ContactPayload) =>
  [
    "NamoNexus contact inquiry",
    "",
    `Name: ${payload.name}`,
    `Work email: ${payload.email}`,
    `Organization: ${payload.organization}`,
    `Organization context: ${payload.context}`,
    `Conversation focus: ${payload.focus}`,
    `Broad timing: ${payload.timing ?? "Not specified"}`,
    "",
    "High-level situation:",
    payload.situation,
  ].join("\n");

async function contact(request: Request, env: Env): Promise<Response> {
  const origin = allowedOrigin(request, env);
  if (origin === undefined)
    return json({ ok: false, message: "Origin is not allowed." }, 403);
  const cors = corsHeaders(origin);
  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST")
    return json({ ok: false, message: "Method not allowed." }, 405, cors);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json(
      { ok: false, message: "Content-Type must be application/json." },
      415,
      cors
    );

  const limit = allowRequest(request, env);
  if (!limit.allowed) {
    return json(
      { ok: false, message: "Please wait before trying again." },
      429,
      { ...cors, "Retry-After": String(limit.retryAfterSeconds) }
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  const configuredMaxBodyBytes = maxBodyBytes(env);
  if (Number.isFinite(declaredLength) && declaredLength > configuredMaxBodyBytes)
    return json({ ok: false, message: "The inquiry is too large." }, 413, cors);

  let body: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > configuredMaxBodyBytes)
      return json({ ok: false, message: "The inquiry is too large." }, 413, cors);
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "Please submit valid JSON." }, 400, cors);
  }

  const validation = validateContactPayload(body);
  if (!validation.ok) return json({ ok: false, fields: validation.fields }, 400, cors);
  if (validation.value.website) return json({ ok: true }, 202, cors);

  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL || !env.CONTACT_TO_EMAIL)
    return json(
      { ok: false, message: "The inquiry service is not configured." },
      503,
      cors
    );

  try {
    const resend = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: validation.value.email,
        subject: `NamoNexus contact — ${validation.value.focus}`,
        text: plainText(validation.value),
      }),
    });
    if (!resend.ok)
      return json(
        {
          ok: false,
          message:
            "The inquiry service could not accept this request. Please try again later.",
        },
        502,
        cors
      );
    return json({ ok: true }, 202, cors);
  } catch {
    return json(
      {
        ok: false,
        message:
          "The inquiry service could not accept this request. Please try again later.",
      },
      502,
      cors
    );
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/health")
      return securityHeaders(json({ ok: true }));
    if (url.pathname === "/api/contact")
      return securityHeaders(await contact(request, env));
    return securityHeaders(await env.ASSETS.fetch(request));
  },
};
