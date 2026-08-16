# NamoNexus production release readiness

## Candidate boundary

This isolated candidate is derived only from the approved clean handoff ZIP. It adds a server-side `POST /api/contact` candidate implementation and tests, but it is **not production-approved, not deployed, and not configured with a Resend secret**.

The Contact endpoint fails closed with a generic `503` when `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, or `CONTACT_TO_EMAIL` is absent. No API key, production recipient, DNS change, provider dashboard change, hosting change, or real email send exists in this worktree.

## Asset and rights audit

| Asset                         | Current implementation                                                          | Technical status                                             | Production approval                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Compact N mark                | CSS treatment in `client/src/components/PrototypeNav.tsx`                       | PASS for preview; no raster dependency                       | UNVERIFIED — owner must approve geometry and brand use                              |
| Horizontal NamoNexus wordmark | CSS text treatment in `PrototypeNav.tsx`                                        | PASS for preview; text remains editable                      | UNVERIFIED — owner must approve typography, spacing, and final wordmark asset       |
| Hero motion panel             | CSS shapes and text in `client/src/pages/Home.tsx`                              | PASS for preview; decorative, no remote media                | UNVERIFIED — approve motion language, geometry, performance, and final master asset |
| Favicon                       | Local `client/public/favicon.svg`, labelled as prototype vector mark            | PASS for preview build; local asset path                     | UNVERIFIED — owner must approve final favicon geometry and rights                   |
| Watermarked media             | Not used by the four live routes or exported source package                     | PASS — excluded                                              | Not applicable                                                                      |
| External fonts                | Google Fonts stylesheet remains in `client/index.html`                          | UNVERIFIED for production dependency/rights and availability | Owner/product decision required; self-hosting may be preferable                     |
| Legacy route assets | Legacy project/research pages/components and stale metadata were removed from this candidate | PASS for live route boundary | Not part of candidate release |

This is a technical readiness review, not legal rights clearance. Asset ownership, trademark permission, font licensing, and production brand approval must be confirmed by the brand owner or authorized counsel.

## Contact implementation status

The live frontend routes remain `/`, `/capability`, `/principles`, and `/contact`. The Contact page now validates through the shared `shared/contact.ts` contract and submits only approved high-level fields to `/api/contact`.

The server implementation in `server/contact.ts` and `server/index.ts` includes:

- server-side required-field, work-email, enum, consent, 1,200-character, and sensitive-content validation;
- optional `Broad timing` allow-list validation;
- honeypot handling that does not forward the bot payload;
- request-size limit before JSON parsing;
- origin policy and `OPTIONS` handling;
- in-memory rate limiting suitable for a single-process candidate only;
- server-only `RESEND_API_KEY` usage through the exact-pinned Resend SDK;
- fixed sender/recipient configuration and validated email as `reply_to`;
- generic provider and error responses;
- redacted operational logs containing request IDs and event types only.

The implementation is **not yet production-ready as an operational system**. In-memory rate limiting is not sufficient for a multi-instance deployment, and real provider, privacy, monitoring, incident-response, and rollback evidence is still absent.

## Remaining unverified or blocked gates

1. Verified Resend sending domain/subdomain and DNS records are not configured or tested.
2. A production-only `RESEND_API_KEY` and approved recipient are intentionally absent.
3. No real or staging Resend email has been sent.
4. Privacy notice, lawful basis/consent, retention/deletion, data residency, access control, reply ownership, and incident response still require owner approval.
5. The production rate-limit store, CAPTCHA/anti-spam policy, alerting, and rollback mechanism require deployment-specific decisions. The current in-memory limiter is not a distributed control.
6. Legal/brand ownership, trademark, and font-license clearance remain UNVERIFIED.
7. Independent pixel-level slide overlap/clipping measurement remains UNVERIFIED.
8. A full production hosting/deployment verification remains UNVERIFIED because no hosting or DNS action was authorized.

## Dependency reproducibility gate

The direct `lucide-react` dependency is pinned to exact `0.453.0`, and the lockfile is regenerated. The Resend Node SDK is pinned to exact `6.20.0`. A fresh environment must pass `pnpm install --frozen-lockfile --ignore-scripts`, `pnpm check`, `pnpm test`, and `pnpm build` before this candidate is considered build-complete.

## Release gate

Do not merge this candidate into `main`, connect it to a provider, configure production secrets, or deploy a production domain until the owner records explicit approval for the exact action. A staging URL may be used for synthetic, non-confidential testing only after the deployment plan and secret ownership are approved.
