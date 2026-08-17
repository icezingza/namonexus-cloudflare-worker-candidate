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
