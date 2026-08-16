# NamoNexus production candidate validation evidence

## Source and isolation

The supplied Cloudflare Worker handoff ZIP was verified before extraction:

```text
SHA-256: f473f1b67f075667183fcee7506b2053db2f788d5ecfa60ac12236ad1a6a9034
```

The candidate is isolated at `/home/ubuntu/namonexus-cloudflare-candidate` on branch `feature/cloudflare-worker-staging`. It has no remote configured at this checkpoint and is separate from the production source. No custom domain, DNS, Resend dashboard, or real-email action was performed.

## Clean install and build

A fresh copy of the Cloudflare candidate completed the following with pnpm `10.4.1`:

```text
pnpm install --frozen-lockfile --ignore-scripts   PASS
pnpm check                                        PASS
pnpm test                                         PASS — 14 tests (8 Node + 6 Worker)
pnpm build                                        PASS — Vite assets to `dist/public`
```

The direct `lucide-react` dependency resolves to exact `0.453.0`, and the Resend SDK resolves to exact `6.20.0`. The build emitted the existing non-blocking Vite chunk-size advisory only. The final post-prune verification was repeated from `/tmp/namonexus-candidate-fresh-final` and produced the same PASS results.

## Node and Worker Contact tests

`server/contact.test.ts` and `worker.test.ts` cover the following without calling Resend or sending an email:

| Case                           | Result                                                                |
| ------------------------------ | --------------------------------------------------------------------- |
| Empty payload                  | PASS — 7 field-level validation errors                                |
| Sensitive terms                | PASS — blocked before provider state                                  |
| Valid request with mock sender | PASS — `202`; fixed sender/recipient and validated `replyTo` asserted |
| Missing provider configuration | PASS — generic `503`                                                  |
| Populated honeypot             | PASS — generic `202`, payload not forwarded                           |
| Unapproved origin              | PASS — `403`                                                          |
| Wrong content type             | PASS — `415`                                                          |
| Request-size limit             | PASS — `413` before JSON parsing                                      |
| Rate limit                     | PASS — `429` with `Retry-After`                                       |

The mock sender test is deterministic and does not use a provider secret, provider endpoint, real recipient, or external network.

## Frontend and Worker route audit

The Vite build emitted the four route entry behavior for the Worker asset binding. The Worker-specific tests verify `/api/health`, delegation of `/`, `/capability`, `/principles`, and `/contact` to `ASSETS.fetch`, and the expected SPA fallback configuration is recorded in `wrangler.jsonc`. A live workers.dev route remains pending deployment.

| Route         | HTTP | Mobile width result                  | Favicon        |
| ------------- | ---: | ------------------------------------ | -------------- |
| `/`           |  200 | `clientWidth=390`, `scrollWidth=390` | `/favicon.svg` |
| `/capability` |  200 | `clientWidth=390`, `scrollWidth=390` | `/favicon.svg` |
| `/principles` |  200 | `clientWidth=390`, `scrollWidth=390` | `/favicon.svg` |
| `/contact`    |  200 | `clientWidth=390`, `scrollWidth=390` | `/favicon.svg` |

Mobile navigation opened with four links. With `prefers-reduced-motion: reduce`, the media query matched and motion orbit/particle animations computed to `none`. A fresh console check returned 0 errors and 0 warnings.

A final 390px keyboard traversal reached the brand link, Menu, name, work email, organization, context, focus, situation, Broad timing, consent, and submit control. The last repeated submit button is the expected subsequent Tab target after the form's interactive controls.

## Browser Contact audit

The latest browser run at 390×844 produced the following evidence:

- Node and Worker tests cover empty payload, sensitive terms, mock success, missing provider, honeypot, unapproved origin, content type, body size, and rate limit.
- The Worker returns a generic `503` for a valid request when the Resend values are absent.
- The Worker never calls Resend when the provider configuration is absent.
- A live staging browser/network audit is pending until the Cloudflare Worker deploy succeeds.

## Static secret and artifact scan

The candidate contains no actual `RESEND_API_KEY`, production recipient email, or provider response/message ID. The client bundle and `dist/public` contain no secret values or recipient literals. The Worker source uses only the server-side bindings defined in `wrangler.jsonc` deployment configuration. `.env` and `.env.local` remain ignored; `.env.example` contains placeholders only.

Legacy case/research pages and stale metadata are not reachable in the live router. Any such files remain governed by the supplied handoff ZIP and are not part of the Worker route boundary.

## Remaining UNVERIFIED gates

| Gate                             | Status     | Reason                                                                       |
| -------------------------------- | ---------- | ---------------------------------------------------------------------------- |
| Cloudflare staging deployment   | UNVERIFIED | Worker deploy/authentication has not yet been performed                       |
| Real/staging provider delivery   | UNVERIFIED | No key, recipient, or email send was used                                    |
| Distributed rate limiting        | UNVERIFIED | Candidate uses in-memory single-process limiter                              |
| Privacy/legal/retention approval | UNVERIFIED | Requires owner/business/legal decision                                       |
| Production asset rights          | UNVERIFIED | Logo, wordmark, favicon, font and trademark decisions remain owner approvals |
| Independent slide pixel review   | UNVERIFIED | Not part of this candidate server work                                       |
| Custom domain/DNS                 | UNVERIFIED | Intentionally not configured or changed                                      |

No production-ready, secure, compliant, delivery, response-time, confidentiality, or outcome claim is made by this evidence record.
