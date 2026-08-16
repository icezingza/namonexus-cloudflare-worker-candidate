# NamoNexus Contact Form — Resend integration runbook

## Current decision

The current candidate contains a server-side `POST /api/contact` implementation and a frontend integration, but the provider is deliberately **not configured**. Without the required server-only environment values, the endpoint fails closed with a generic `503`; it does not call Resend and no real email is sent. DNS, provider dashboard, hosting, and production changes remain outside this candidate.

> Never put `RESEND_API_KEY` in browser code, `client/`, a `VITE_*` variable, a static asset, a committed `.env` file, or a client-visible response.

## Architecture options

| Approach                                                                             | Tradeoffs                                                                                                                                                             |                                  Cost | Setup complexity |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------: | ---------------: |
| Keep the current preview-only form and provide a separately approved contact channel | Lowest risk and no secret or backend. It does not create an automated lead email from the form.                                                                       |                                Lowest |              Low |
| Add a small server-side `POST /api/contact` endpoint alongside the deployed app      | Simple user experience and one code path. Requires server runtime, secret management, rate limiting, logging policy, and backend deployment.                          |   Hosting/provider cost as applicable |           Medium |
| Run a separate form relay/edge function that validates the request and calls Resend  | Isolates the email secret from the static frontend and can be rolled back independently. Adds a second deployment, origin policy, monitoring, and ownership boundary. | Additional service cost as applicable |      Medium–High |

Do not select an approach only because the form is visually complete. The deciding factors are data boundary, privacy operations, secret management, abuse controls, and who owns replies and incidents.

## Resend and domain setup

Resend requires a domain owned by the sender and verified before sending. Prefer a dedicated transactional subdomain such as `mail.example.com` or another owner-approved subdomain rather than sending from an unverified or shared domain. Replace the example with the exact domain approved by the owner; do not infer production DNS records from this document. Use the exact DNS records shown by Resend for the chosen domain; do not invent or reuse records from another provider.

1. In the Resend dashboard, add the owner-approved sending domain or subdomain.
2. Add the DNS records displayed by Resend at the DNS provider. The owner or DNS administrator must perform this step.
3. Wait for domain verification and confirm the sender address is allowed by the verified domain.
4. Create a dedicated API key named for this environment, for example `NamoNexus Production Contact`.
5. Choose the least privilege that works: a sending-only key and, where available, restrict it to the verified sending domain.
6. Store the key in the hosting provider's server-side secret manager. Do not paste it into the repository, browser environment, build logs, screenshots, or support tickets.
7. Keep staging and production keys separate. Revoke and rotate the key if it is exposed or if ownership changes.

## Environment variables

The following names are a proposed contract. The final hosting platform may use a secret manager UI rather than a local `.env` file.

```dotenv
# Server-only secrets/configuration. Never prefix with VITE_.
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL="NamoNexus Contact <contact@mail.example>"
CONTACT_TO_EMAIL="approved-recipient@example.invalid"
CONTACT_ALLOWED_ORIGIN="https://www.example.com"
CONTACT_RATE_LIMIT_PER_WINDOW="5"
CONTACT_RATE_LIMIT_WINDOW_SECONDS="900"
```

For local development, use an ignored `.env.local` file only if the repository's secret policy permits it. Confirm that `.env*` is excluded from Git, and run a secret scan before commit. The candidate intentionally works without these values by returning a generic `503`; do not use a real key or recipient during local validation.

## Server endpoint contract

The candidate implements `POST /api/contact` in `server/index.ts` and `server/contact.ts`. A future deployment may keep this route or move it to an approved relay, but the same contract and controls must remain. The browser should submit only the approved high-level fields: `name`, `email`, `organization`, `context`, `focus`, `situation`, `timing`, `consent`, and the hidden `website` honeypot.

The server must independently validate the same rules as the current prototype:

- Require name, work email, organization, organization context, conversation focus, high-level situation, and consent.
- Treat Broad timing as optional, but validate it against an allow-list when present.
- Enforce the 1,200-character situation limit after trimming and before sending.
- Reject passwords, credentials, API keys, secrets, tokens, financial/account details, medical/health information, security secrets, incident evidence, regulated data, confidential information, and proprietary information.
- Reject a populated honeypot without revealing whether the request was classified as spam.
- Check `Content-Type`, request size, origin, method, and rate limit before processing free text.
- Do not accept a user-controlled `from` address. Set `from` from `RESEND_FROM_EMAIL` and use the validated work email only as `reply_to`.
- Do not log raw situation text, credentials, API keys, full email bodies, or provider responses containing user content.

## Send flow

Use the official Resend Node SDK in the server environment, or a direct HTTPS request only if the implementation supplies the required authentication and `User-Agent` behavior. A conceptual Node flow is:

```ts
const resend = new Resend(process.env.RESEND_API_KEY);

const result = await resend.emails.send({
  from: process.env.RESEND_FROM_EMAIL!,
  to: [process.env.CONTACT_TO_EMAIL!],
  replyTo: validated.email,
  subject: `NamoNexus contact — ${validated.focus}`,
  text: renderPlainText(validated),
  headers: {
    // Use a request-specific idempotency strategy if the chosen SDK/API path supports it.
  },
});
```

Keep `renderPlainText` bounded and redact or omit the free-text field if the approved privacy design requires that. Do not attach raw request JSON or confidential content. Return a generic success response only after the provider acknowledges the send. If the provider fails, return a generic retry message without claiming delivery and without echoing provider details.

## Security and privacy gates

Before configuring the provider, approve a privacy notice, consent wording, lawful basis, data controller/processor roles, retention period, deletion process, data residency, access control, reply ownership, incident response, and whether email is an acceptable transport for the approved high-level inquiry.

Add request rate limiting, duplicate/replay handling, honeypot or CAPTCHA policy, CORS/origin controls, body-size limits, timeout handling, provider outage behavior, structured redacted logging, alerting, and a rollback flag that can return the UI to preview-only behavior.

## Staging procedure

1. Deploy the backend endpoint and frontend integration to a staging URL only.
2. Use a staging Resend key and a staging sender or approved test recipient where possible.
3. Submit one synthetic, non-confidential test inquiry to the approved test mailbox.
4. Confirm the recipient, `reply_to`, subject, formatting, redaction, and provider response.
5. Confirm no raw input or API key appears in logs, browser bundles, source maps, responses, or error messages.
6. Test empty fields, invalid email, overlong situation, every sensitive-term category, honeypot, missing consent, repeated submission, rate limit, origin rejection, timeout, provider failure, and rollback.
7. Record the staging commit, environment version, provider message ID if appropriate, test evidence, and approver.
8. Do not use the production key or production recipient until the separate Production Approval is recorded.

## Production enablement commands

These commands are templates for the owner or hosting administrator. They were not executed with a real key in this candidate task.

```bash
# Run locally only after the server integration exists and secrets are supplied securely.
export RESEND_API_KEY='re_...'
export RESEND_FROM_EMAIL='NamoNexus Contact <contact@mail.example>'
export CONTACT_TO_EMAIL='approved-recipient@example.invalid'

pnpm check
pnpm exec vite build
# Run the approved server test suite and start the server using the hosting platform's command.
```

For a managed hosting provider, set the same values in the provider's **server-only** environment configuration for staging first, then production. Do not use `echo`, `printenv`, or build output to display the key. After testing, unset shell variables and rotate the key if it was ever exposed in terminal history.

## Rollback

If delivery, privacy, validation, or abuse behavior is not acceptable, disable the provider integration or route the form back to a no-provider state, remove the provider secret from the active environment, and preserve the evidence needed for incident review. The frontend must remain usable without an external provider.

## Official references

[1]: https://resend.com/docs/api-reference/introduction "Resend API Introduction"
[2]: https://resend.com/docs/api-reference/api-keys/create-api-key "Resend Create API Key"
[3]: https://resend.com/docs/api-reference/emails/send-email "Resend Send Email API"
[4]: https://resend.com/docs/dashboard/domains/introduction "Resend Verified Domains"

Resend documents HTTPS API authentication with a Bearer API key, recommends official SDKs for most use cases, supports restricted sending access for API keys, requires a verified owned domain for sending, and supports sender, recipient, subject, reply-to, text/HTML, and idempotency-related fields in the Send Email API. [1] [2] [3] [4]

## References

[1] [Resend API Introduction](https://resend.com/docs/api-reference/introduction)
[2] [Resend Create API Key](https://resend.com/docs/api-reference/api-keys/create-api-key)
[3] [Resend Send Email API](https://resend.com/docs/api-reference/emails/send-email)
[4] [Resend Verified Domains](https://resend.com/docs/dashboard/domains/introduction)
