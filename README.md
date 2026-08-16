# NamoNexus Sovereign AI Systems Studio — production candidate

This isolated candidate is derived only from the approved Cloudflare Worker handoff ZIP whose SHA-256 is:

```text
F473F1B67F075667183FCEE7506B2053DB2F788D5ECFA60AC12236AD1A6A9034
```

It preserves the dark premium NamoNexus frontend experience and adds a server-side Contact endpoint design that **fails closed until its environment is configured and separately approved**. No Resend API key, recipient secret, custom domain, DNS change, or real email send is included in this repository. The Cloudflare Worker configuration is for an explicit staging deployment only.

## Core routes

- `/` — business-first Hero, where we help, capabilities, principles, and CTA.
- `/capability` — Discover → Design → Prototype → Validate decision process.
- `/principles` — sovereignty, risk inputs, decision rights, evidence boundary.
- `/contact` — high-level inquiry form with server-side validation contract.

Legacy research/project pages from the imported handoff are not registered in the live router for this candidate. This prevents old unverified claims and remote media references from being reachable through production routes.

## Technology

The candidate uses React 19, TypeScript, Vite, Tailwind CSS, Wouter, Express, Vitest, and the pinned Resend Node SDK `6.20.0`. The direct `lucide-react` dependency remains pinned to `0.453.0`. The package manager is pinned to pnpm `10.4.1`.

## Local verification

Install dependencies from the lockfile, then run the checks:

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm check
pnpm test
pnpm build
```

`pnpm build` produces the frontend under `dist/public` and bundles the server as `dist/index.js`. The existing Vite chunk-size advisory is non-blocking; it must not be represented as a security or performance guarantee.

To run the built candidate locally:

```bash
NODE_ENV=development PORT=3000 pnpm start
```

Without Contact provider configuration, `POST /api/contact` returns a generic `503` and does not call Resend. This is intentional fail-closed behavior.

## Contact data boundary

The allowed high-level fields are `name`, `email`, `organization`, `context`, `focus`, `situation`, `timing`, `consent`, and the hidden `website` honeypot. The server revalidates the same contract as the client:

- required name, work email, organization, context, focus, situation, and consent;
- optional `Broad timing` selected from an allow-list;
- 1,200-character maximum for the high-level situation;
- sensitive-content guard for credentials, API keys, secrets, tokens, financial/account details, health data, security secrets, incident evidence, regulated data, confidential information, and proprietary information;
- request-size limit, origin policy, rate limiting, honeypot handling, redacted operational logging, and generic errors.

The endpoint never accepts a browser-controlled sender address. If a future approved Resend configuration is present, the server uses `RESEND_FROM_EMAIL` as `from` and the validated work email only as `reply_to`.

## Server-only environment contract

These are placeholders only. Do not commit real values and do not expose them through `VITE_*` variables:

```dotenv
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="NamoNexus Contact <contact@mail.example>"
CONTACT_TO_EMAIL="approved-recipient@example.invalid"
CONTACT_ALLOWED_ORIGIN="https://www.example.com"
CONTACT_REQUIRE_ORIGIN="true"
CONTACT_MAX_BODY_BYTES="16384"
CONTACT_RATE_LIMIT_PER_WINDOW="5"
CONTACT_RATE_LIMIT_WINDOW_SECONDS="900"
```

The exact verified sending domain, recipient, origin, privacy notice, retention policy, and secret manager must be approved before any real integration is enabled.

## Cloudflare staging boundary

`wrangler.jsonc` publishes Vite output from `dist/public` through the `ASSETS` binding, routes `/api/*` to `worker.ts`, and enables single-page-application fallback for non-API routes. The staging deployment must use a `workers.dev` URL only; no custom domain or DNS record is part of this step.

## Security boundary

The following actions have not been performed by this candidate work:

- no custom domain, DNS, Resend dashboard, or production configuration change; the Cloudflare Worker deployment is staging-only and must be reported separately;
- no API key creation, storage, or retrieval;
- no real email send;
- no database, CRM, analytics, or storage integration;
- no claim of production security, compliance, confidentiality, delivery, response time, or customer outcome.

## Asset status

The compact N mark, wordmark, motion panel, and favicon are technically usable for preview. Master logo geometry, wordmark approval, favicon approval, trademark/copyright ownership, font licensing, and final production asset rights remain owner decisions. Watermarked media is not used in the core routes.

See:

- `PRODUCTION_RELEASE_READINESS.md`
- `CONTACT_RESEND_INTEGRATION_RUNBOOK.md`
- `PRODUCTION_APPROVAL_REQUEST.md`
- `CONTACT_FORM_PRODUCTION_READINESS.md`
- `VALIDATION_EVIDENCE.md`
- `EXPORT_MANIFEST.md`

This candidate is reviewable but is not itself production approval.
