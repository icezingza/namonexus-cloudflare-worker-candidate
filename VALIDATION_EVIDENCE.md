# NamoNexus Mode A staging release validation evidence

## Release identity and scope

The release candidate was built only from the verified NamoNexus Cloudflare Worker handoff source. The source handoff SHA-256 is:

```text
f473f1b67f075667183fcee7506b2053db2f788d5ecfa60ac12236ad1a6a9034
```

The working repository is the private GitHub candidate repository at `https://github.com/icezingza/namonexus-cloudflare-worker-candidate`. This release was created on branch `feature/contact-mode-a-staging-release` at commit:

```text
3123a574d248245c938742e5ed44c51debb5209b
```

The worktree was built from the repository source. No outer ZIP, flattened export, `node_modules`, build output, `.env`, secret, watermarked media, DNS record, custom domain, Hostinger setting, production Worker, Resend setting, analytics configuration, or production route was changed.

## Files changed in the release commit

| File | Change | Scope |
| --- | --- | --- |
| `client/src/pages/Contact.tsx` | Converted Contact UI to explicit Mode A preview state; removed fetch/API submission and false success behavior; disabled inquiry action while the channel is being prepared | Frontend only |
| `PRODUCTION_RELEASE_READINESS.md` | Synchronized readiness status with Mode A and separated frontend preview behavior from the future server candidate | Documentation |
| `CONTACT_RESEND_INTEGRATION_RUNBOOK.md` | Marked the current frontend as Mode A and kept Resend as a future gated integration | Documentation |

## Local reproducibility gates

The exact release commit passed the required clean validation using pnpm `10.4.1` and the committed lockfile:

```text
pnpm install --frozen-lockfile    PASS
pnpm check                        PASS
pnpm test --run                   PASS — 14 tests (8 Node + 6 Worker)
pnpm build                        PASS — Vite assets generated in dist/public
```

The Vite build generated five files including the reviewed asset directory marker, `index.html`, the current JavaScript bundle, the current CSS bundle, and `favicon.svg`. No secret values were present in source, build output, or committed evidence.

## Contact Mode A behavior

Mode A is deliberately preview-safe. The Contact page does not call `/api/contact`, email, CRM, database, storage, analytics, or any other submission provider. It does not show a success state because no inquiry is accepted. The interface states that the inquiry service is not active and that the contact channel is being prepared; the inquiry button is disabled until an approved channel exists.

The form retains the approved data-minimizing field set: name, work email, organization, organization context, conversation focus, high-level situation, broad timing, consent, and honeypot. The page warns users not to provide health information, financial details, credentials, security secrets, incident evidence, regulated records, or confidential/proprietary implementation details.

The future Worker endpoint was tested separately with a non-sensitive `.invalid` synthetic payload. Without provider secrets it returned the generic fail-closed response:

```text
HTTP 503
{"ok":false,"message":"The inquiry service is not configured."}
```

This direct endpoint check is not a Contact UI submission. The browser UI does not invoke the endpoint. A request that supplied the staging origin while no allowed origin was configured returned `403 Origin is not allowed`, which is consistent with the Worker origin policy and does not send data to a provider.

## Staging deployment

The release was deployed only to the existing workers.dev staging Worker:

| Item | Value |
| --- | --- |
| Worker name | `namonexus-production-candidate` |
| Worker ID | `16c3de08f48242a5af0719df8e4f37e2` |
| Staging URL | `https://namonexus-production-candidate.icezingza.workers.dev` |
| Current version ID | `d8f14f3c-dfe5-4be6-86f1-dc6c92418b49` |
| Current deployment ID | `f85903d2-5abc-4e92-a029-37b4a3ee7788` |
| Deployment traffic | 100% to the current version |
| Deployment source | Wrangler OAuth, staging Worker only |
| workers.dev subdomain | Enabled |
| Custom domain/DNS | Not configured or changed |

The deployment uploaded five new or modified static assets and bound the existing `ASSETS` binding. The prior F473 staging deployment remains in version history as rollback target `3ecfad75-7408-4e28-9940-e51ec2af0543` with deployment ID `5c0eb1ef-bcf9-4329-a003-2467c3e232d1`.

## Live route matrix

All route checks below were performed against the current workers.dev deployment.

| Route | Result | Evidence |
| --- | --- | --- |
| `/` | PASS — HTTP 200 | Homepage rendered with `AI systems for decisions that matter.` and the approved NamoNexus document title |
| `/capability` | PASS — HTTP 200 | Discover → Design → Prototype → Validate process, decision gates, and illustrative artifacts rendered |
| `/principles` | PASS — HTTP 200 | Sovereignty, privacy, traceability, human responsibility, risk inputs, and evidence ladder rendered |
| `/contact` | PASS — HTTP 200 | Mode A notice, data-minimizing fields, Broad timing, consent, honeypot, and disabled inquiry action rendered |
| Unknown frontend route | PASS — SPA application 404 | `/staging-release-audit-route` served the application 404 view with `Go Home`, not a Cloudflare placeholder or Worker error |
| `/api/health` | PASS — HTTP 200 | `{"ok":true}` |
| Direct `/api/contact` synthetic test | PASS — HTTP 503 | Generic no-provider response; no email was sent |

## Browser and mobile audit

The live Contact page was inspected at a 390×844 viewport using Playwright. The document width and body width were both 390 pixels, so no horizontal overflow was observed. The `prefers-reduced-motion: reduce` media query matched successfully. The document title was `NamoNexus — Sovereign AI Systems Studio`.

Keyboard traversal reached the brand link, Menu button, name, email, organization, organization-context select, conversation-focus select, situation textarea, Broad timing select, honeypot, consent control, and subsequent controls in DOM order. The inquiry action remained disabled. The browser had no false success text, and the filtered network audit returned no `/api/contact`, Resend, analytics, CRM, database, or storage request. The console audit returned zero errors and zero warnings.

## Approval status and remaining gates

| Gate | Status | Notes |
| --- | --- | --- |
| Mode A UI no-network behavior | PASS | No submission request and no false success state |
| Frozen install, type check, tests, Vite build | PASS | 14 tests passed; exact lockfile install passed |
| Staging deployment and workers.dev URL | PASS | Current version and deployment IDs recorded above |
| Live route matrix | PASS | Main routes, unknown route, and health endpoint verified |
| Contact provider delivery | NOT ENABLED | Resend secrets are absent; no email was sent |
| Production Contact integration | NOT APPROVED | Requires privacy notice, consent, retention/deletion policy, verified sender, recipient ownership, server-only secrets, and a separate approval |
| Cloudflare credential hygiene | REQUIRED | Revoke/rotate credentials previously pasted into chat before production work |
| Distributed rate limiting | UNVERIFIED | Candidate in-memory limiter is not a distributed production control |
| Production logo, wordmark, favicon, and asset rights | UNVERIFIED | Requires owner approval and rights confirmation |
| Custom domain/DNS | NOT IN SCOPE | No custom domain or DNS change was made |
| Production merge/deploy | NOT APPROVED | This document is a staging handoff only |

The release makes no customer, metric, certification, security-guarantee, compliance, privacy-certification, production-readiness, delivery, or outcome claim. Production deployment must remain blocked until the owner gives separate explicit approval after reviewing this evidence.
