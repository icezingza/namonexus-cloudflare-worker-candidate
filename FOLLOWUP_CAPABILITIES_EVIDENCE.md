# NamoNexus follow-up compatibility-route evidence

## Scope

This follow-up applies the safe recommendation from the attached review without inventing `/about` content, activating Contact, exposing private GitHub material, changing DNS, or modifying Cloudflare edge configuration. The confirmed source is `/home/ubuntu/namonexus-cloudflare-repo` on `feature/contact-mode-a-staging-release`, based on the previously deployed NamoNexus Worker release.

## Change

Added a backward-compatible `/capabilities` route that redirects to the approved singular `/capability` route. The redirect has an accessible fallback link and does not add a second capability content source, unsupported claims, or a new sitemap URL. The canonical public route remains `/capability`.

## Validation

| Check | Result |
|---|---|
| `pnpm install --frozen-lockfile` | PASS |
| `pnpm check` | PASS |
| `pnpm build` | PASS |
| `pnpm test` | PASS; 14 tests |
| Local `/capabilities` navigation | PASS; resolves to `/capability` and renders the Capability page |
| Local compatibility route network | PASS; no API, analytics, or Resend request; only the existing Google Fonts stylesheet was observed |
| Existing route source | PASS; `/`, `/capability`, `/principles`, `/contact`, and `/privacy` remain registered |
| Contact policy | Unchanged; Mode A remains disabled and no mailto fallback was added |

## Explicitly not implemented

`/about` remains absent because no publishable founder/team/history facts were supplied. Contact remains inactive because real Resend configuration, verified sender domain, server-only secrets, and abuse controls are separate approval gates. Public GitHub/technical documentation remains absent because the repository is private and no public audit material has been approved. The live custom-hostname managed `robots.txt` override remains an infrastructure-level caveat requiring Cloudflare zone/edge control.

## Deployment evidence

- Source commit: `81e4dd4448d0a5c20d8f8a0fe4626c97c816d256`
- Worker: `namonexus-production-candidate`
- Deployment ID: `b7779623-ec95-42d1-9ec8-967b9a7c803a`
- Active version ID: `894158c8-912b-4f0e-976e-bb2d81bba7f2`
- Previous rollback target: deployment `eecdcd61-c4ff-4094-baf3-09dfded9dc8c`, version `3bf98942-8d2d-494f-b331-61dbb27c72e7`

Live `/capabilities` resolved to `/capability`, rendered the approved Capability page, showed no fallback redirect text, and produced no API, analytics, or Resend-like request. The compatibility deployment did not modify DNS, custom domain configuration, Contact backend, Resend, secrets, email, storage, or analytics.
