# NamoNexus production candidate — clean source manifest

## Source authority

This candidate was created only from the supplied Cloudflare Worker handoff ZIP:

```text
/home/ubuntu/upload/NamoNexus-cloudflare-worker-candidate-handoff.zip
SHA-256: f473f1b67f075667183fcee7506b2053db2f788d5ecfa60ac12236ad1a6a9034
```

The ZIP was verified before extraction. Work then continued in the isolated candidate directory `/home/ubuntu/namonexus-cloudflare-candidate` on branch `feature/cloudflare-worker-staging`. It is not a worktree of the production repository. The target repository is a new private GitHub repository and the target deployment is a no-custom-domain Cloudflare Workers staging URL.

## Candidate additions

The candidate adds only the following implementation layers on top of the verified ZIP:

- `shared/contact.ts` — canonical client/Worker validation contract.
- `worker.ts` — Cloudflare Worker `/api/contact`, `/api/health`, and asset fallback entrypoint.
- `wrangler.jsonc` — Workers asset binding, `/api/*` worker-first routing, and SPA fallback configuration.
- `server/index.ts` — static server and `/api/contact` route.
- `server/contact.ts` — origin, request-size, rate-limit, honeypot, validation, redacted logging, fixed sender/recipient configuration, and fail-closed Resend adapter.
- `server/contact.test.ts` — deterministic Node reference tests without provider calls or real email.
- `worker.test.ts` — deterministic Worker route/fail-closed tests without provider calls or real email.
- `vitest.config.ts` and `pnpm test` — repository-root server and Worker test contract.
- `.env.example` — placeholders only; no secret or production recipient.
- Updated Contact UI, route boundary, README, readiness, runbook, approval, and validation documents.

## Included

The candidate preserves `package.json`, `pnpm-lock.yaml`, Vite/Tailwind/TypeScript configuration, the four live routes, local favicon, shared components, Worker source, Wrangler configuration, documentation, and source structure. The direct `lucide-react` dependency remains pinned to `0.453.0`; the Resend Node SDK is pinned to `6.20.0`; Wrangler is pinned to `4.29.1`.

## Excluded

The candidate contains no `node_modules`, Vite output, source repository `.git` history, production `.env`, `RESEND_API_KEY`, actual recipient email, DNS/Cloudflare configuration, hosting configuration, database/CRM/storage integration, watermarked media, `AccessDenied` artifacts, 111-byte artifacts, or real provider response/message IDs.

Legacy project/research pages, the unused research layout, `template.json`, and `ideas.md` were removed from the candidate after audit because they contained stale scaffold metadata, remote media references, or unverified metrics. They are not part of the candidate source export.

## Verification contract

A clean environment must pass:

```bash
pnpm install --frozen-lockfile --ignore-scripts
pnpm check
pnpm test
pnpm build
```

The server tests use a mock sender only. They do not create a Resend key, contact the Resend API, send email, or modify any external system.

## Release boundary

This candidate is ready for technical review of the Cloudflare Worker staging implementation, not production approval. The staging deploy must use the generated `workers.dev` URL only. Custom domains, DNS, Resend domain verification, secret configuration, staging provider email testing, and production merge require separate explicit approval.
