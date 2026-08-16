import express, { type ErrorRequestHandler } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  contactErrorHandler,
  createContactService,
  type ContactDependencies,
} from "./contact";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const clientDist = path.join(projectRoot, "dist", "public");

export function createApp(
  env: NodeJS.ProcessEnv = process.env,
  dependencies: ContactDependencies = {}
) {
  const app = express();
  const contact = createContactService(env, dependencies);

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use((_request, response, next) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    response.setHeader(
      "Permissions-Policy",
      "camera=(), microphone=(), geolocation=()"
    );
    response.setHeader("X-Frame-Options", "DENY");
    next();
  });

  app.get("/api/health", (_request, response) => {
    response.json({ ok: true });
  });

  app.options("/api/contact", contact.handleOptions);
  app.post(
    "/api/contact",
    contact.preflight,
    express.json({ limit: `${contact.config.maxBodyBytes}b`, strict: true }),
    contact.handle
  );
  app.use(contactErrorHandler);

  const genericErrorHandler: ErrorRequestHandler = (
    error,
    _request,
    response,
    _next
  ) => {
    console.error("[Server] unhandled_error", {
      errorType: error instanceof Error ? error.name : "UnknownError",
    });
    response
      .status(500)
      .json({ ok: false, message: "The request could not be completed." });
  };
  app.use(genericErrorHandler);

  app.use(express.static(clientDist, { index: false }));
  app.get("*", (_request, response) => {
    response.sendFile(path.join(clientDist, "index.html"));
  });

  return app;
}

const app = createApp();
const port = Number(process.env.PORT ?? 3000);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, "0.0.0.0", () => {
    console.log(`[Server] listening on port ${port}`);
  });
}

export default app;
