# NamoNexus launch-hardening evidence

## Scope and release identity

This change was made in `/home/ubuntu/namonexus-cloudflare-repo`, branch `feature/contact-mode-a-staging-release`, using the verified private repository `https://github.com/icezingza/namonexus-cloudflare-worker-candidate.git`. The live read-only check at 2026-08-17T09:44Z found that `https://www.namonexus.com/` and `https://namonexus-production-candidate.icezingza.workers.dev/` returned the same HTML body SHA-256: `f1f95a0d92139693fbffd22ea174a364e0811ad413dfd5297bd5e5318f4f175a`. The source checkout before this change was commit `b778382c0e9043e7193f301590137858de2389b`; the active Worker was `namonexus-production-candidate` with 100% deployment `f85903d2-5abc-4e92-a029-37b4a3ee7788` and version `d8f14f3c-dfe5-4be6-86f1-dc6c92418b49`. No DNS, custom-domain, backend, Resend, secret, storage, email, or analytics setting was changed during source work.

## Approved policy implemented

The public MVP remains English-only. The footer now uses `© 2025–2026 NamoNexus.`, contains the single official LinkedIn URL `https://www.linkedin.com/company/namonexus/`, and links to the Privacy / Contact data notice. The Contact channel remains Mode A and disabled, with no mailto fallback, no placeholder success state, and no network request. The notice states that an active channel would be used only for inquiry evaluation and reply, not marketing spam; inquiries would be retained up to 30 days and deleted if no project proceeds; and the founder reply target would be 24–48 business hours. Activation remains gated on a real Resend configuration, verified sender domain, server-only secrets, and abuse controls.

## Implemented source changes

| Area | Change |
|---|---|
| SEO | Added `SeoHead.tsx` for route-aware title, description, robots, and canonical metadata. Added default description/robots metadata in `client/index.html`. |
| Crawl files | Added `client/public/robots.txt` and `client/public/sitemap.xml` for `/`, `/capability`, `/principles`, `/contact`, and `/privacy`. |
| Privacy | Added `client/src/pages/Privacy.tsx` and `/privacy` route. |
| Footer | Updated `client/src/components/PrototypeNav.tsx` with approved copyright, Privacy link, and official LinkedIn only. |
| Capabilities | Updated Home cards and Capability page with four distinct capability anchors: `ai-strategy-discovery`, `private-ai-architecture`, `human-in-the-loop-workflows`, and `applied-ai-prototyping`. |
| Contact | Updated policy copy and Privacy notice link without changing disabled Mode A behavior. |
| Asset metadata | Removed prototype wording from the favicon SVG title/description without changing its mark geometry. |

## Validation before deployment

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | PASS |
| `pnpm check` | PASS |
| `pnpm build` | PASS; Vite 7.1.9 generated `dist/public` |
| `pnpm test` | PASS; 14 tests in 2 files |
| Local routes and page-specific metadata | PASS for `/`, `/capability`, `/principles`, `/contact`, `/privacy` |
| 390×844 mobile overflow | PASS on all five routes; document/body width remained 390px |
| Mobile navigation | PASS; menu opens with four links |
| Keyboard focus | PASS; Tab reaches the brand link and navigation remains keyboard reachable |
| Reduced motion | PASS; orbit and particle animations compute to `none` under `prefers-reduced-motion: reduce` |
| Contact Mode A | PASS; submit disabled, no form action, no mailto, no success state |
| Contact/API/Resend/analytics network behavior | PASS; no matching requests observed in local interaction audit |
| Console/page errors | PASS; none captured in local Playwright audit |
| Unsupported public claims/social links | PASS; prototype footer text absent and only the approved LinkedIn URL is present |

## Deployment gate

This commit is the validated source release. Deployment was performed only to the already-confirmed `namonexus-production-candidate` Worker. DNS, custom domains, Resend, email, storage, analytics, and secrets remained outside this change.

## Post-deployment evidence

- Source commit deployed: `efcb84650720e4f6398f7c961a4e29959046f552`
- Worker: `namonexus-production-candidate`
- Deployment ID: `eecdcd61-c4ff-4094-baf3-09dfded9dc8c`
- Version ID: `3bf98942-8d2d-494f-b331-61dbb27c72e7`
- 100% active version confirmed by read-only Cloudflare deployment lookup at 2026-08-17T10:20Z.
- Rollback target: deployment `f85903d2-5abc-4e92-a029-37b4a3ee7788`, version `d8f14f3c-dfe5-4be6-86f1-dc6c92418b49`. Earlier rollback remains deployment `5c0eb1ef-bcf9-4329-a003-2467c3e232d1`, version `3ecfad75-7408-4e28-9940-e51ec2af0543`.

Live smoke tests returned HTTP 200 for `/`, `/capability`, `/principles`, `/contact`, `/privacy`, and an unknown SPA route. `/api/health` returned `{"ok":true}`. A GET to `/api/contact` returned 405 without provider action. The live Home DOM exposed the new title, description, canonical, footer, official LinkedIn-only link, Privacy link, and four distinct capability anchors. The live Contact DOM showed a disabled `Inquiry service not active` button, no form action, no mailto link, the approved purpose/retention/SLA policy, and no Contact/API/Resend/analytics-like performance requests.

The production 390×844 Playwright audit passed on all five routes: no horizontal overflow, mobile menu opens with four links, reduced-motion disables orbit and particle animations, Contact remains disabled, no mailto fallback exists, no prototype footer text remains, no matching network requests occurred, and no console/page errors were captured.

The authored `sitemap.xml` is served live as `application/xml` with the five public URLs. The Worker subdomain serves the authored 71-byte `robots.txt`, but the custom live hostname returns a Cloudflare-managed 1,907-byte robots response with Content-Signal directives instead of the authored file. This is an edge configuration behavior on the custom hostname; resolving or disabling that override requires control of the relevant Cloudflare zone/edge configuration and was not changed in this release.

Final scope confirmation: no DNS, custom-domain, Resend, email, storage, analytics, or secret setting was changed. Contact remains Mode A and disabled.
