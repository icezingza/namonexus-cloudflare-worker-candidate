import { afterEach, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import { createApp } from "./index";

const originalEnv = { ...process.env };

function restoreEnvironment() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
}

async function withServer(
  run: (baseUrl: string) => Promise<void>,
  env: Record<string, string | undefined> = {},
  dependencies: Parameters<typeof createApp>[1] = {}
) {
  restoreEnvironment();
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }

  const server: Server = createServer(createApp(undefined, dependencies));
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Test server did not expose a port");

  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) =>
      server.close(error => (error ? reject(error) : resolve()))
    );
    restoreEnvironment();
  }
}

const validPayload = {
  name: "Preview Test",
  email: "preview@example.org",
  organization: "Example Organization",
  context: "Research or knowledge work",
  focus: "AI strategy and discovery",
  situation: "A high-level workflow question without restricted details.",
  timing: "Exploring the question",
  consent: "yes",
};

describe("POST /api/contact", () => {
  afterEach(restoreEnvironment);

  it("rejects empty payloads with field-level validation", async () => {
    await withServer(async baseUrl => {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const body = await response.json();
      expect(response.status).toBe(400);
      expect(body.fields).toMatchObject({
        name: expect.any(String),
        email: expect.any(String),
        consent: expect.any(String),
      });
    });
  });

  it("rejects sensitive content before provider configuration is checked", async () => {
    await withServer(async baseUrl => {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validPayload,
          situation:
            "We need to share an API key and confidential incident evidence.",
        }),
      });
      const body = await response.json();
      expect(response.status).toBe(400);
      expect(body.fields.situation).toContain("Keep this high level");
    });
  });

  it("accepts a valid request after an approved sender acknowledges it", async () => {
    let sent:
      | Parameters<NonNullable<Parameters<typeof createApp>[1]["sendEmail"]>>[0]
      | undefined;
    await withServer(
      async baseUrl => {
        const response = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: {
            Origin: "http://127.0.0.1:0",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validPayload),
        });
        expect(response.status).toBe(202);
        expect(await response.json()).toEqual({ ok: true });
      },
      {
        NODE_ENV: "production",
        CONTACT_REQUIRE_ORIGIN: "true",
        CONTACT_ALLOWED_ORIGIN: "http://127.0.0.1:0",
        RESEND_FROM_EMAIL: "NamoNexus Contact <contact@mail.example>",
        CONTACT_TO_EMAIL: "approved-recipient@example.invalid",
      },
      {
        sendEmail: async email => {
          sent = email;
          return { data: { id: "test-provider-id" } };
        },
      }
    );
    expect(sent).toMatchObject({
      from: "NamoNexus Contact <contact@mail.example>",
      to: ["approved-recipient@example.invalid"],
      replyTo: validPayload.email,
    });
  });

  it("returns a generic accepted response for a populated honeypot", async () => {
    await withServer(async baseUrl => {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validPayload, website: "bot-value" }),
      });
      expect(response.status).toBe(202);
      expect(await response.json()).toEqual({ ok: true });
    });
  });

  it("fails closed when provider secrets are absent", async () => {
    await withServer(async baseUrl => {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      });
      const body = await response.json();
      expect(response.status).toBe(503);
      expect(body).toEqual({
        ok: false,
        message: "The inquiry service is not configured.",
      });
    });
  });

  it("rejects an unapproved origin before parsing the body", async () => {
    await withServer(
      async baseUrl => {
        const response = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "https://evil.example",
          },
          body: JSON.stringify(validPayload),
        });
        expect(response.status).toBe(403);
      },
      {
        NODE_ENV: "production",
        CONTACT_REQUIRE_ORIGIN: "true",
        CONTACT_ALLOWED_ORIGIN: "https://www.namonexus.com",
      }
    );
  });

  it("returns 429 after the configured request window is exhausted", async () => {
    await withServer(
      async baseUrl => {
        const submit = () =>
          fetch(`${baseUrl}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(validPayload),
          });
        const first = await submit();
        const second = await submit();
        expect(first.status).toBe(503);
        expect(second.status).toBe(429);
        expect(second.headers.get("retry-after")).toBeTruthy();
      },
      { CONTACT_RATE_LIMIT_PER_WINDOW: "1" }
    );
  });

  it("rejects oversized requests before the JSON parser runs", async () => {
    await withServer(
      async baseUrl => {
        const response = await fetch(`${baseUrl}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...validPayload,
            situation: "x".repeat(1000),
          }),
        });
        expect(response.status).toBe(413);
      },
      { CONTACT_MAX_BODY_BYTES: "512" }
    );
  });
});
