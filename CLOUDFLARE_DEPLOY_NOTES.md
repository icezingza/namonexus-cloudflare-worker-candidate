# Cloudflare staging deployment notes

## Official source

Cloudflare Workers Static Assets Direct Upload: https://developers.cloudflare.com/workers/static-assets/direct-upload/

The official guide describes this sequence: create or reuse the Worker, create an assets upload session with a manifest map of asset paths to `{hash, size}`, upload base64-encoded asset buckets, create a Worker version with an assets binding and the completion JWT, then create a deployment that routes traffic to the version.

## API endpoints located from the Cloudflare OpenAPI spec

The authenticated Cloudflare API account is supplied by the connector at runtime. The selected account is `fe3fd1fd7fe555810f625630c22a7b86`.

- `POST /accounts/{account_id}/workers/scripts/{script_name}/assets-upload-session` — create an assets upload session with `{ manifest: { "/path": { hash, size } } }`.
- `POST /accounts/{account_id}/workers/assets/upload?base64=true` — upload base64 asset payload buckets keyed by hash.
- `POST /accounts/{account_id}/workers/scripts/{script_name}/versions` — upload a Worker version with multipart module/metadata, an `assets` binding, and the completion JWT.
- `POST /accounts/{account_id}/workers/scripts/{script_name}/deployments` — deploy a version with a percentage strategy.
- `GET /accounts/{account_id}/workers/subdomain` — inspect workers.dev subdomain state.
- `PUT /accounts/{account_id}/workers/subdomain` — create/enable workers.dev subdomain only if the account has none; do not call this without explicit confirmation if it would change account-level state.

## Asset hash detail

Cloudflare's official Direct Upload example computes each manifest hash as `sha256(base64(file bytes) + file extension).digest("hex").slice(0, 32)`, producing a 32-character hexadecimal hash. The upload endpoint requires multipart/form-data, each hash field contains base64-encoded file contents, and the JWT from the registration response is sent as the bearer authorization token. The returned completion JWT is then used in the Worker version metadata.

The first attempt using full 64-character SHA-256 hashes was rejected with Cloudflare error `10304: Invalid manifest: file hash size of 64 is too large`; the candidate flow therefore follows the 32-character formula from the official guide.

Source: https://developers.cloudflare.com/workers/static-assets/direct-upload/

## Scope boundary

This task must not attach any custom domain, create DNS records, configure Resend secrets, create real provider keys, or send an email. The Worker should be deployed with provider values absent so `/api/contact` returns generic 503. The final validation must use the generated workers.dev URL only.

## Mode A release deployment record

The Mode A release candidate was deployed from repository commit `3123a574d248245c938742e5ed44c51debb5209b` to the existing workers.dev-only Worker `namonexus-production-candidate` using Wrangler OAuth with the least-privilege account/user/Workers scopes approved for this staging operation.

- Staging URL: `https://namonexus-production-candidate.icezingza.workers.dev`
- Current version ID: `d8f14f3c-dfe5-4be6-86f1-dc6c92418b49`
- Current deployment ID: `f85903d2-5abc-4e92-a029-37b4a3ee7788`
- Traffic: 100% to the current Mode A version
- Rollback target version: `3ecfad75-7408-4e28-9940-e51ec2af0543`
- Rollback target deployment: `5c0eb1ef-bcf9-4329-a003-2467c3e232d1`

Rollback is a controlled action only. It requires an explicit incident decision and should be performed by promoting the recorded prior version through the Cloudflare Workers Deployments control or the approved Wrangler/API runbook. No rollback was executed during this release.
