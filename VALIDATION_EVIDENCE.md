# NamoNexus Cloudflare staging validation evidence

## Source, isolation, and repository

The supplied Cloudflare Worker handoff ZIP was verified before extraction. Its SHA-256 is:

```text
f473f1b67f075667183fcee7506b2053db2f788d5ecfa60ac12236ad1a6a9034
```

The candidate is isolated at `/home/ubuntu/namonexus-cloudflare-candidate` on branch `feature/cloudflare-worker-staging`. The private repository is `https://github.com/icezingza/namonexus-cloudflare-worker-candidate`. The reviewed source commit before deployment was `38c16ebc8ae717dec0d49e29c075d6f8b4745de7`. No custom domain, DNS record, production Worker, Resend configuration, or real-email action was performed.

## Local build and tests

A fresh candidate install completed with pnpm `10.4.1`:

```text
pnpm install --frozen-lockfile --ignore-scripts   PASS
pnpm check                                        PASS
pnpm test                                         PASS — 14 tests (8 Node + 6 Worker)
pnpm build                                        PASS — Vite assets to dist/public
```

The direct `lucide-react` dependency resolves to exact `0.453.0`, and the Resend SDK resolves to exact `6.20.0`. The build emitted only the existing non-blocking Vite chunk-size advisory. No `.env`, provider secret, `node_modules`, or build output was committed to the repository.

## Worker Contact tests

The deterministic Node and Worker tests cover empty payload, sensitive-term blocking, mock provider success, missing provider configuration, honeypot handling, unapproved origin, content type, body-size limit, and rate limiting. The missing-provider path returns a generic `503` before a provider call.

| Case | Result |
| --- | --- |
| Empty payload | PASS — field-level validation errors |
| Sensitive terms | PASS — blocked before provider state |
| Valid request with mock sender | PASS — `202`; provider is mocked |
| Missing provider configuration | PASS — generic `503` |
| Populated honeypot | PASS — generic `202`; payload not forwarded |
| Unapproved origin | PASS — `403` |
| Wrong content type | PASS — `415` |
| Request-size limit | PASS — `413` |
| Rate limit | PASS — `429` with `Retry-After` |

## Cloudflare staging deployment

The approved candidate was deployed to a workers.dev-only staging Worker:

| Item | Value |
| --- | --- |
| Worker name | `namonexus-production-candidate` |
| Worker ID | `16c3de08f48242a5af0719df8e4f37e2` |
| Version ID | `3ecfad75-7408-4e28-9940-e51ec2af0543` |
| Deployment ID | `5c0eb1ef-bcf9-4329-a003-2467c3e232d1` |
| Staging URL | `https://namonexus-production-candidate.icezingza.workers.dev` |
| workers.dev subdomain | Enabled for this Worker |
| Custom domain/DNS | Not configured or changed |

The user-provided Cloudflare API token was used only in the deployment process environment. Its value was not written to source, logs, build output, repository, or evidence files. The R2 S3 credentials were not used.

The deployed asset manifest contains four files:

| Path | Cloudflare asset hash | Size |
| --- | --- | ---: |
| `/assets/index-6MOBI1uY.js` | `543a1a72b9e156e1bf106a45f0eeecfb` | 357,945 bytes |
| `/assets/index-ByL8kSJJ.css` | `2debe052c4e41abb3ad8c00fcc56950d` | 124,827 bytes |
| `/favicon.svg` | `b78bf2e60f69b87039f26b7ec7d0b051` | 420 bytes |
| `/index.html` | `70b68bd50e010cbdbfd810a28c2323b1` | 367,757 bytes |

## Live route and API matrix

The matrix was collected from the deployed workers.dev URL after enabling the Worker subdomain. The unknown frontend path returned the Vite SPA shell and the application’s own 404 view, rather than Cloudflare’s default placeholder.

| Route | Result | Content evidence |
| --- | --- | --- |
| `/` | PASS — HTTP 200 | NamoNexus homepage, title `NamoNexus — Sovereign AI Systems Studio` |
| `/capability` | PASS — HTTP 200 | Discover → Design → Prototype → Validate and decision gates rendered |
| `/principles` | PASS — HTTP 200 | Sovereignty, privacy, traceability, human responsibility, risk inputs rendered |
| `/contact` | PASS — HTTP 200 | Data-minimizing form and broad timing field rendered |
| `/not-a-real-route` | PASS — HTTP 200 SPA shell | Application 404 view rendered from the SPA shell |
| `/api/health` | PASS — HTTP 200 | `{"ok":true}` |
| `/api/contact` with valid synthetic high-level payload | PASS — HTTP 503 | `{"ok":false,"message":"The inquiry service is not configured."}`; no email was sent |

The synthetic Contact request used only non-sensitive staging text and an `.invalid` email address. It was not a real inquiry and was not delivered to any provider.

## Evidence from browser audit

The live browser audit confirmed the shared navigation and page titles across the homepage, Capability, Principles, and Contact routes. The Contact page exposed name, work email, organization, organization context, conversation focus, high-level situation, broad timing, consent, and honeypot fields, with explicit instructions not to submit confidential, regulated, personal, security-sensitive, or proprietary information.

Screenshots captured during the audit are available in the sandbox at:

```text
/home/ubuntu/screenshots/namonexus-production_2026-08-17_01-36-16_8329.webp
/home/ubuntu/screenshots/namonexus-production_2026-08-17_01-36-34_9740.webp
/home/ubuntu/screenshots/namonexus-production_2026-08-17_01-36-44_1398.webp
/home/ubuntu/screenshots/namonexus-production_2026-08-17_01-37-04_7893.webp
```

## Remaining approval gates

| Gate | Status | Reason |
| --- | --- | --- |
| workers.dev staging route and API behavior | PASS | Verified from the deployed URL |
| Real provider delivery | UNVERIFIED / intentionally disabled | No Resend secret was configured and no email was sent |
| Cloudflare secret rotation | REQUIRED | The user-provided API token and R2 keys were pasted into chat and should be revoked/rotated |
| Distributed rate limiting | UNVERIFIED | Candidate limiter is in-memory and single-process |
| Privacy, legal, consent, and retention approval | UNVERIFIED | Requires owner/business/legal decision |
| Production logo, wordmark, favicon, and asset rights | UNVERIFIED | Requires owner approval and rights confirmation |
| Independent slide pixel review | UNVERIFIED | Outside this Worker staging deployment |
| Custom domain/DNS | NOT IN SCOPE | Intentionally not configured or changed |
| Production merge/deploy | NOT APPROVED | Staging only; explicit production approval remains required |

This evidence record makes no customer, metric, certification, security guarantee, compliance, production-readiness, delivery, or outcome claim.
