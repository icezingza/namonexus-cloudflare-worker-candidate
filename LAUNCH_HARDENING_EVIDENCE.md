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

This commit is the validated source release. Deployment is permitted only to the already-confirmed `namonexus-production-candidate` Worker. DNS, custom domains, Resend, email, storage, analytics, and secrets remain outside this change. Post-deployment live route and Contact evidence must be appended to this document before the release is considered fully evidenced.
