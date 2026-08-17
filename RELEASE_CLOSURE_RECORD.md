# NamoNexus Mode A Public Release — Closure Record

**Closure date:** 2026-08-17  
**Release tag:** `v2026.08.17-mode-a-release`  
**Source branch:** `main`  
**Repository:** `icezingza/namonexus-cloudflare-worker-candidate` (private)

## Release identity

The approved NamoNexus Mode A release is served by Worker `namonexus-production-candidate` and is publicly available at `https://www.namonexus.com`. The source HEAD used for the release is `8bfb70159d1bf4313e6687f079b6062d8e487711`. The deployed application code originated from `81e4dd4448d0a5c20d8f8a0fe4626c97c816d256`; the final evidence and closure documentation are included in subsequent commits on the same release line.

| Item | Value |
|---|---|
| Active Worker deployment | `b7779623-ec95-42d1-9ec8-967b9a7c803a` |
| Active Worker version | `894158c8-912b-4f0e-976e-bb2d81bba7f2` |
| Previous rollback deployment | `eecdcd61-c4ff-4094-baf3-09dfded9dc8c` |
| Previous rollback version | `3bf98942-8d2d-494f-b331-61dbb27c72e7` |
| Worker URL | `https://namonexus-production-candidate.icezingza.workers.dev` |
| Public URL | `https://www.namonexus.com` |

## Security closure

The previously exposed Cloudflare user API token named `Cloudflare Agent Token - 2026-08-16` was revoked in the Cloudflare dashboard and was verified absent from the User API Tokens list. The separate Cloudflare Tunnel token was not changed because it was not identified as the exposed deployment credential.

The exposed R2 S3-compatible Access Key was matched to the Cloudflare Account API token named `falling-brook-3e5e`. That account token was revoked through the authenticated Cloudflare dashboard session. The dashboard API returned HTTP 200 with `success: true`, and a subsequent token inventory request returned an empty list with the matching token absent. No secret access-key value was viewed, exported, logged, committed, or reused.

No new credential was created. Wrangler OAuth was logged out after deployment. No secret, `.env` file, API key, Resend key, or R2 secret was added to the repository or frontend build.

## Validation completed

The final live smoke check returned HTTP 200 for `/`, `/capability`, `/principles`, `/contact`, `/privacy`, `/robots.txt`, and `/sitemap.xml`. The `/capabilities` compatibility route returned the SPA shell over HTTP and was verified in the browser to resolve client-side to `/capability` and render the approved Capability page. `/api/health` returned HTTP 200.

A synthetic empty Contact POST returned validation HTTP 400 without sending data. A synthetic valid high-level Contact POST returned HTTP 503 with `The inquiry service is not configured.` This confirms fail-closed behavior, with no email sent. The frontend remains Mode A and disabled, with no network request, mailto fallback, analytics request, CRM, database, storage, or placeholder success state.

The release line passed frozen install, TypeScript check, Vite production build, and 14 tests. Previous browser validation also passed for the approved route matrix, 390px mobile layout, keyboard traversal, reduced-motion behavior, and zero console errors.

## Approved public policy

The public MVP is English-only. The footer uses `© 2025–2026 NamoNexus.` and exposes only the official LinkedIn URL. Contact data, when the channel is activated in a separately approved phase, is intended for inquiry evaluation and reply only, is not for marketing spam, is retained for up to 30 days and deleted if no project proceeds, and has a founder reply target of 24–48 business hours. This policy does not mean the current Contact channel is active.

## Explicitly outside this release

The `/about` page, case studies, client claims, metrics, certifications, public technical audit room, and live Contact integration were not added because they require separate publishable evidence, ownership, privacy controls, and approval. The `www.namonexus.com/robots.txt` response remains a Cloudflare-managed edge response rather than the authored Worker asset; fixing that requires separate Cloudflare zone/edge ownership work and was not changed during closure. DNS and custom-domain configuration were not changed.

## Rollback

To roll back the Worker, use the previously recorded deployment/version target `eecdcd61-c4ff-4094-baf3-09dfded9dc8c` / `3bf98942-8d2d-494f-b331-61dbb27c72e7` through the Cloudflare Worker deployment controls. Do not delete the current deployment until the rollback decision is reviewed and the target is verified.

## Closure decision

This release is closed as a **Mode A public website release**. Future Contact activation, Cloudflare robots policy changes, public company/about content, and evidence-backed case studies are separate workstreams and must not be treated as included in this closure.
