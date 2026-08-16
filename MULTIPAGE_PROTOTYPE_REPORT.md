# NamoNexus multi-page frontend and Contact production candidate report

## Scope

This report covers an isolated Cloudflare Worker candidate derived only from the verified F473 handoff ZIP. The candidate preserves the four required routes and adds a Worker `/api/contact` path without configuring a provider secret or custom domain.

## Route boundary

| Route         | Status | Evidence                                                        |
| ------------- | ------ | --------------------------------------------------------------- |
| `/`           | PASS   | Built server returned 200, expected title/H1, 390px no overflow |
| `/capability` | PASS   | Built server returned 200, expected title/H1, 390px no overflow |
| `/principles` | PASS   | Built server returned 200, expected title/H1, 390px no overflow |
| `/contact`    | PASS   | Built server returned 200, expected title/H1, 390px no overflow |

Legacy project/research pages and unused research components were removed from this candidate; only the four required routes remain live.

## Contact implementation

The client and server share the validation contract in `shared/contact.ts`. The allowed fields are name, work email, organization, organization context, conversation focus, high-level situation, optional Broad timing, consent, and a hidden honeypot.

The server enforces required fields, work-email syntax, allow-listed context/focus/timing, the 1,200-character situation limit, the sensitive-content guard, content type, request-size limit, origin policy, in-memory rate limit, honeypot handling, redacted logs, generic errors, and fixed sender/recipient configuration. It uses the exact-pinned Resend SDK only when server-side configuration is present. Without provider configuration it returns generic `503` and does not call Resend.

This implementation is not represented as production-secure, compliant, or operationally complete. The in-memory rate limit is suitable only for a single-process candidate and must be replaced or backed by a deployment-appropriate shared control before multi-instance production.

## Validation matrix

| Check                                   | Status                     | Evidence                                                                                                     |
| --------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Cloudflare handoff ZIP SHA-256         | PASS                       | Matches `f473f1b67f075667183fcee7506b2053db2f788d5ecfa60ac12236ad1a6a9034`                                   |
| Frozen install with pnpm 10.4.1         | PASS                       | Clean `/tmp/namonexus-candidate-fresh` environment                                                           |
| Direct lucide-react pin                 | PASS                       | `0.453.0` in manifest and lockfile                                                                           |
| Resend SDK pin                          | PASS                       | `6.20.0` in manifest and lockfile                                                                            |
| Type check                              | PASS                       | `pnpm check`                                                                                                 |
| Node + Worker tests                    | PASS                       | 14 Vitest tests                                                                                              |
| Vite production build                  | PASS                       | `pnpm build`; assets emitted to `dist/public`, existing non-blocking chunk-size advisory only                |
| Empty Contact                           | PASS                       | 7 field-level alerts, zero API request                                                                       |
| Sensitive Contact text                  | PASS                       | Client blocked before request; server test also rejects                                                      |
| Valid Contact without provider          | PASS                       | One local `POST /api/contact`, generic `503`, no external request                                            |
| Mock sender success path                | PASS                       | 202 tested with mock only; no Resend call or real email                                                      |
| Honeypot                                | PASS                       | Generic 202 without forwarding payload                                                                       |
| Origin policy                           | PASS                       | Unapproved origin 403                                                                                        |
| Wrong content type                      | PASS                       | 415                                                                                                          |
| Request-size limit                      | PASS                       | 413 before JSON parsing                                                                                      |
| Rate limit                              | PASS                       | 429 with `Retry-After` after configured threshold                                                            |
| Mobile 390px overflow                   | PASS                       | `clientWidth=390`, `scrollWidth=390` on all routes                                                           |
| Mobile navigation                       | PASS                       | Menu opens with four links                                                                                   |
| Keyboard focus | PASS | Final 390px traversal reached brand link, Menu, all fields, Broad timing, consent, and submit |
| Reduced motion                          | PASS                       | Media query matches, motion animations compute to `none`                                                     |
| Fresh console                           | PASS                       | 0 errors and 0 warnings                                                                                      |
| Cloudflare staging deployment          | UNVERIFIED                 | Wrangler config and Worker source are present; authentication/deploy remains pending                        |
| Provider delivery                       | UNVERIFIED                 | No provider key or real/staging email was used                                                               |
| Custom domain/DNS                       | UNVERIFIED                 | Intentionally not configured or changed                                                                      |
| Production privacy/legal/brand approval | UNVERIFIED                 | Owner approvals still required                                                                               |

## Security boundary

No API key, actual recipient, browser secret, production configuration, or provider response/message ID is in the candidate. The client has no `RESEND_API_KEY` or recipient literal. Server logs include only request IDs, event names, counts, and error type; they do not log raw request bodies or provider payloads.

## Final release blockers

Before merge or deploy, the owner must approve the exact verified sender domain, recipient owner, secret-manager location, privacy notice, consent/lawful basis, retention/deletion, data residency, access control, rate-limit architecture, anti-spam policy, monitoring, rollback, font and brand asset rights, staging provider test, production domains, and explicit merge/deploy action.

## Related documents

- `PRODUCTION_RELEASE_READINESS.md`
- `CONTACT_RESEND_INTEGRATION_RUNBOOK.md`
- `PRODUCTION_APPROVAL_REQUEST.md`
- `CONTACT_FORM_PRODUCTION_READINESS.md`
- `VALIDATION_EVIDENCE.md`
- `EXPORT_MANIFEST.md`
