# NamoNexus Contact Form — Production Readiness Checklist

The candidate Contact form posts only to the isolated server endpoint `/api/contact`. The endpoint fails closed with `503` when provider configuration is absent and no data is sent to Resend, stored, or forwarded in the current test environment. Do not configure a real provider or deploy until the decisions below are approved and recorded.

## Product and lead workflow

Define the purpose of the form, the intended respondent, the internal owner of each inquiry, the response expectation, the escalation path, and the disposition of leads that are not a fit. Decide whether the first contact should be a qualification request, a meeting request, or a request for a secure follow-up channel.

Confirm that the public copy remains high-level and evidence-bounded. The form should not promise confidentiality, legal privilege, response time, regulated-data handling, security guarantees, or a specific commercial outcome.

## Data minimization and privacy

Approve the exact preview field list: name, work email, organization, organization context, conversation focus, high-level situation, broad timing, consent, and a hidden honeypot. In the current source, Broad timing is an optional routing field; the required fields are name, work email, organization, organization context, conversation focus, and high-level situation, plus preview consent. The high-level situation is capped at 1,200 characters. The sensitive-term guard covers passwords, credentials, API keys, secrets, tokens, credit-card or bank-account details, financial information, medical or health records/information, security secrets, incident evidence, regulated records/data, confidential information, and proprietary information. Users are instructed not to submit those materials.

Document the lawful basis or consent approach, privacy notice, data controller/processor roles, retention period, deletion process, user access process, data residency requirements, and any cross-border transfer implications. Decide whether free-text should be disabled for especially sensitive audiences.

## Backend and transport

Choose the backend endpoint and provider only after reviewing data-processing terms and approved environment controls. Keep provider keys server-side, never in browser bundles or committed files. Enforce HTTPS, strict origin handling, content-type checks, request size limits, server-side validation, and structured error responses that do not echo submitted content.

Do not trust browser validation. The candidate revalidates every field on the server, including email syntax, the 1,200-character situation limit, enumerated context/focus/timing values, consent, honeypot, and the same sensitive-content guard. When provider secrets are absent, the candidate intentionally returns a generic configuration error and does not call an external provider.

## Spam and abuse controls

Choose a rate-limit policy by IP, session, and identity signal without storing more personal data than necessary. Add a honeypot and consider CAPTCHA or an equivalent challenge only if spam volume justifies the friction. Add replay protection, duplicate detection, abuse logging with a defined retention period, and alerting for sustained abuse.

Do not expose provider errors, stack traces, API keys, recipient addresses, or internal routing in client-visible responses. Use a generic success response where appropriate to avoid account or organization enumeration.

## Email and operations

Approve the verified sender domain, display name, reply-to policy, recipient owner, mailbox access, forwarding rules, bounce handling, and delivery monitoring. Define what happens when the provider is unavailable. The UI must not claim that an inquiry was delivered unless the backend has a clear delivery acknowledgement.

Decide whether the original message is included in email, whether the email body is redacted, and whether a link to a controlled lead record is safer than sending free text through email.

## Security and compliance review

Review threat modeling for injection, header injection, template injection, malicious URLs, oversized payloads, spam, denial of service, sensitive-data leakage, log leakage, and unauthorized access. Confirm that secrets are stored only in approved environment variables or a secret manager and that `.env` files are excluded from version control.

Obtain security, privacy, legal, and business-owner approval for the final workflow. Do not claim a security certification or compliance posture unless an approved, verifiable basis exists.

## QA and release gates

Before production, test valid submissions, empty required fields, invalid work email, situation text over 1,200 characters, each forbidden sensitive-term category, honeypot population, missing consent, repeated submissions, provider outage, timeout, malformed JSON, wrong content type, request-size limits, CORS/origin behavior, keyboard operation, screen-reader labels, mobile layout, and reduced-motion behavior. In the current candidate, verify that valid input with Broad timing selected reaches the endpoint and receives the expected no-provider `503` until an approved provider configuration exists.

Verify that the browser creates the expected request only after production integration is enabled, that no analytics or third-party request captures free text without approval, that no secret appears in source maps or browser responses, and that logs contain no raw sensitive input.

Record the final approval with the source commit, environment configuration version, privacy notice version, sender/recipient owner, test evidence, rollback method, and the explicit decision to publish. Until then, keep provider secrets absent, use synthetic test data only, and do not claim delivery, compliance, security, or response time.
