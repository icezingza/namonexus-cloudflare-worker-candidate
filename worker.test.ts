import { describe, expect, it } from "vitest";
import worker, { type Env } from "./worker";

type AssetResponse = { status: number; url: string };

const assetResponse = (status = 200): Response =>
  new Response("<!doctype html><html><body>SPA</body></html>", {
    status,
    headers: { "content-type": "text/html" },
  });

const makeEnv = (overrides: Partial<Env> = {}) => {
  const calls: AssetResponse[] = [];
  const env: Env = {
    ASSETS: {
      fetch: async request => {
        calls.push({ status: 200, url: request.url });
        return assetResponse();
      },
    },
    CONTACT_ALLOWED_ORIGIN: "https://staging.example.workers.dev",
    CONTACT_REQUIRE_ORIGIN: "true",
    CONTACT_MAX_BODY_BYTES: "16384",
    CONTACT_RATE_LIMIT_PER_WINDOW: "5",
    CONTACT_RATE_LIMIT_WINDOW_SECONDS: "900",
    ...overrides,
  };
  return { env, calls };
};

const validPayload = {
  name: "Preview Test",
  email: "preview@example.org",
  organization: "Example Organization",
  context: "Research or knowledge work",
  focus: "AI strategy and discovery",
  situation: "A high-level workflow question without restricted details.",
  timing: "Exploring the question",
  consent: "yes",
  website: "",
};

const requestFor = (path: string, init: RequestInit = {}) => {
  const headers = new Headers(init.headers);
  headers.set("Origin", headers.get("Origin") ?? "https://staging.example.workers.dev");
  headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");
  headers.set(
    "CF-Connecting-IP",
    headers.get("CF-Connecting-IP") ??
      `198.51.100.${Math.floor(Math.random() * 200) + 1}`
  );
  return new Request(`https://staging.example.workers.dev${path}`, {
    ...init,
    headers,
  });
};

describe("Cloudflare Worker entrypoint", () => {
  it("returns a health response with security headers", async () => {
    const { env } = makeEnv();
    const response = await worker.fetch(
      new Request("https://staging.example.workers.dev/api/health"),
      env
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
  });

  it("delegates non-API routes to the asset binding for SPA fallback", async () => {
    const { env, calls } = makeEnv();
    const response = await worker.fetch(
      new Request("https://staging.example.workers.dev/capability"),
      env
    );
    expect(response.status).toBe(200);
    expect(calls).toHaveLength(1);
    expect(calls[0]?.url).toContain("/capability");
  });

  it("fails closed with 503 when Resend configuration is absent", async () => {
    const { env } = makeEnv();
    const response = await worker.fetch(
      requestFor("/api/contact", { method: "POST", body: JSON.stringify(validPayload) }),
      env
    );
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      ok: false,
      message: "The inquiry service is not configured.",
    });
  });

  it("rejects an unapproved origin before processing the payload", async () => {
    const { env } = makeEnv();
    const request = new Request("https://staging.example.workers.dev/api/contact", {
      method: "POST",
      headers: {
        Origin: "https://unapproved.example",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validPayload),
    });
    const response = await worker.fetch(request, env);
    expect(response.status).toBe(403);
  });

  it("rejects an oversized body before provider configuration is checked", async () => {
    const { env } = makeEnv({ CONTACT_MAX_BODY_BYTES: "1024" });
    const response = await worker.fetch(
      requestFor("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...validPayload, situation: "x".repeat(2000) }),
      }),
      env
    );
    expect(response.status).toBe(413);
  });

  it("returns 429 after the configured request window is exhausted", async () => {
    const { env } = makeEnv({ CONTACT_RATE_LIMIT_PER_WINDOW: "1" });
    const ip = "198.51.100.250";
    const request = () =>
      requestFor("/api/contact", {
        method: "POST",
        headers: { "CF-Connecting-IP": ip },
        body: JSON.stringify(validPayload),
      });
    const first = await worker.fetch(request(), env);
    const second = await worker.fetch(request(), env);
    expect(first.status).toBe(503);
    expect(second.status).toBe(429);
    expect(second.headers.get("retry-after")).toBeTruthy();
  });
});
