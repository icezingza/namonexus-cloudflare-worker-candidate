import type { NextFunction, Request, RequestHandler, Response } from "express";
import { Resend } from "resend";
import { validateContactPayload, type ContactPayload } from "@shared/contact";

const DEFAULT_MAX_BODY_BYTES = 16 * 1024;
const DEFAULT_RATE_LIMIT = 5;
const DEFAULT_RATE_WINDOW_MS = 15 * 60 * 1000;

type ContactEnvironment = NodeJS.ProcessEnv;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type ContactServiceConfig = {
  apiKey: string;
  fromEmail: string;
  toEmail: string;
  allowedOrigins: Set<string>;
  maxBodyBytes: number;
  rateLimit: number;
  rateWindowMs: number;
  requireOrigin: boolean;
};

type ContactEmail = {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
};

export type ContactDependencies = {
  sendEmail?: (email: ContactEmail) => Promise<unknown>;
};

type ContactService = {
  config: ContactServiceConfig;
  handleOptions: RequestHandler;
  preflight: RequestHandler;
  handle: RequestHandler;
};

const asPositiveInteger = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

function getConfig(env: ContactEnvironment): ContactServiceConfig {
  const allowedOrigins = new Set(
    (env.CONTACT_ALLOWED_ORIGIN ?? "")
      .split(",")
      .map(origin => origin.trim())
      .filter(Boolean)
  );

  return {
    apiKey: env.RESEND_API_KEY?.trim() ?? "",
    fromEmail: env.RESEND_FROM_EMAIL?.trim() ?? "",
    toEmail: env.CONTACT_TO_EMAIL?.trim() ?? "",
    allowedOrigins,
    maxBodyBytes: asPositiveInteger(
      env.CONTACT_MAX_BODY_BYTES,
      DEFAULT_MAX_BODY_BYTES
    ),
    rateLimit: asPositiveInteger(
      env.CONTACT_RATE_LIMIT_PER_WINDOW,
      DEFAULT_RATE_LIMIT
    ),
    rateWindowMs:
      asPositiveInteger(
        env.CONTACT_RATE_LIMIT_WINDOW_SECONDS,
        DEFAULT_RATE_WINDOW_MS / 1000
      ) * 1000,
    requireOrigin:
      env.CONTACT_REQUIRE_ORIGIN === "true" || env.NODE_ENV === "production",
  };
}

function getClientKey(request: Request): string {
  return request.ip || request.socket.remoteAddress || "unknown";
}

function getOrigin(request: Request): string | undefined {
  const origin = request.get("origin")?.trim();
  return origin || undefined;
}

function applyCors(response: Response, origin: string | undefined) {
  if (!origin) return;
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Vary", "Origin");
}

function isOriginAllowed(
  config: ContactServiceConfig,
  origin: string | undefined
): boolean {
  if (!origin) return !config.requireOrigin;
  return config.allowedOrigins.has(origin);
}

function logEvent(
  event: string,
  requestId: string,
  metadata: Record<string, unknown> = {}
) {
  // Deliberately log only operational metadata. Never log request bodies, email addresses, API keys, or provider payloads.
  console.info(`[Contact] ${event}`, { requestId, ...metadata });
}

function renderPlainText(payload: ContactPayload): string {
  const timing = payload.timing ?? "Not specified";
  return [
    "NamoNexus contact inquiry",
    "",
    `Name: ${payload.name}`,
    `Work email: ${payload.email}`,
    `Organization: ${payload.organization}`,
    `Organization context: ${payload.context}`,
    `Conversation focus: ${payload.focus}`,
    `Broad timing: ${timing}`,
    "",
    "High-level situation:",
    payload.situation,
    "",
    "The sender confirmed the high-level data boundary.",
  ].join("\n");
}

function genericError(response: Response, status: number, message: string) {
  return response.status(status).json({ ok: false, message });
}

export function createContactService(
  env: ContactEnvironment = process.env,
  dependencies: ContactDependencies = {}
): ContactService {
  const config = getConfig(env);
  const resend =
    config.apiKey && config.fromEmail && config.toEmail
      ? new Resend(config.apiKey)
      : null;
  const sendEmail =
    dependencies.sendEmail ??
    (resend ? (email: ContactEmail) => resend.emails.send(email) : null);
  const rateLimits = new Map<string, RateLimitEntry>();

  const allowRequest = (
    key: string
  ): { allowed: boolean; retryAfterSeconds: number } => {
    const now = Date.now();
    const current = rateLimits.get(key);
    if (!current || current.resetAt <= now) {
      rateLimits.set(key, { count: 1, resetAt: now + config.rateWindowMs });
      return { allowed: true, retryAfterSeconds: 0 };
    }
    if (current.count >= config.rateLimit) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((current.resetAt - now) / 1000)
        ),
      };
    }
    current.count += 1;
    return { allowed: true, retryAfterSeconds: 0 };
  };

  const handleOptions: RequestHandler = (request, response) => {
    const origin = getOrigin(request);
    if (!isOriginAllowed(config, origin))
      return genericError(response, 403, "Origin is not allowed.");
    applyCors(response, origin);
    return response.status(204).end();
  };

  const preflight: RequestHandler = (request, response, next) => {
    const requestId = crypto.randomUUID();
    const origin = getOrigin(request);
    response.locals.contactRequestId = requestId;
    applyCors(response, origin);

    if (!isOriginAllowed(config, origin)) {
      logEvent("origin_rejected", requestId);
      return genericError(response, 403, "Origin is not allowed.");
    }

    const limit = allowRequest(getClientKey(request));
    if (!limit.allowed) {
      response.setHeader("Retry-After", String(limit.retryAfterSeconds));
      logEvent("rate_limited", requestId);
      return genericError(response, 429, "Please wait before trying again.");
    }

    if (!request.is("application/json")) {
      logEvent("content_type_rejected", requestId);
      return genericError(
        response,
        415,
        "Content-Type must be application/json."
      );
    }

    const contentLength = Number(request.get("content-length") ?? 0);
    if (Number.isFinite(contentLength) && contentLength > config.maxBodyBytes) {
      logEvent("body_too_large", requestId);
      return genericError(response, 413, "The inquiry is too large.");
    }

    return next();
  };

  const handle: RequestHandler = async (request, response) => {
    const requestId = String(
      response.locals.contactRequestId ?? crypto.randomUUID()
    );
    const origin = getOrigin(request);
    applyCors(response, origin);

    const body = request.body as Record<string, unknown> | undefined;
    if (body && typeof body.website === "string" && body.website.trim()) {
      // Return a generic accepted response to avoid teaching spam automation about the honeypot.
      logEvent("honeypot_accepted", requestId);
      return response.status(202).json({ ok: true });
    }

    const validation = validateContactPayload(body);
    if (!validation.ok) {
      logEvent("validation_rejected", requestId, {
        fieldCount: Object.keys(validation.fields).length,
      });
      return response
        .status(400)
        .json({ ok: false, fields: validation.fields });
    }

    if (!sendEmail) {
      logEvent("provider_not_configured", requestId);
      return genericError(
        response,
        503,
        "The inquiry service is not configured."
      );
    }

    try {
      await sendEmail({
        from: config.fromEmail,
        to: [config.toEmail],
        replyTo: validation.value.email,
        subject: `NamoNexus contact — ${validation.value.focus}`,
        text: renderPlainText(validation.value),
      });
      logEvent("accepted", requestId);
      return response.status(202).json({ ok: true });
    } catch (error) {
      logEvent("provider_failed", requestId, {
        errorType: error instanceof Error ? error.name : "UnknownError",
      });
      return genericError(
        response,
        502,
        "The inquiry service could not accept this request. Please try again later."
      );
    }
  };

  return { config, handleOptions, preflight, handle };
}

export function contactErrorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) {
  const typed = error as { type?: string; status?: number };
  if (typed.type === "entity.too.large")
    return genericError(response, 413, "The inquiry is too large.");
  if (typed.type === "entity.parse.failed")
    return genericError(response, 400, "Please submit valid JSON.");
  if (typed.status === 400)
    return genericError(response, 400, "The inquiry could not be parsed.");
  return next(error);
}
