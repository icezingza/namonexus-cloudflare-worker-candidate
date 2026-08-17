# Frontend integration validation findings (draft)

## Home — local preview

- URL: `http://localhost:3000/`
- Title: `NamoNexus — Sovereign AI with data sovereignty`
- New hero copy rendered: `Sovereign AI with data sovereignty built into the deployment boundary.`
- New CTAs rendered: `Explore the systems`, `Review Security & Trust`, and `View Contact status`.
- Solutions, About, Principles, Capability, Contact, Privacy, and LinkedIn navigation links rendered.
- Current Mode A wording rendered: no information is sent or stored; no submission can be accepted.
- No visible browser error in the extracted page.

## Solutions — local preview

- URL: `http://localhost:3000/solutions`
- Title: `NamoNexus Solutions — Sensitive Healthcare Workflows`
- Three solution areas rendered: NamoNexus Enterprise, NaMo Care, and NamoNexus Fusion Engine.
- Evidence labels and disclaimers rendered; page explicitly does not claim clinical outcomes, certifications, customer deployments, or production assurance.
- Synthetic workflow boundary and Security/Contact CTAs rendered.
- No visible browser error in the extracted page.

## Scope note

These are local preview observations only; they are not production deployment evidence.

## Security & Trust — local preview

- URL: `http://localhost:3000/security`
- Title: `NamoNexus — Security & Trust`
- Data boundaries, identity/access, traceability, graceful failure, human responsibility, and evidence status rendered.
- On-premise is explicitly described as a boundary choice, not a security guarantee.
- Procurement & IT section and Contact/Principles CTAs rendered.
- No visible browser error in the extracted page.

## About — local preview

- URL: `http://localhost:3000/about`
- Title: `About NamoNexus — Sovereign AI Systems Studio`
- Public scope, non-claims, release boundary, and governance disclaimer rendered.
- No unsupported identity, customer, certification, clinical, or production claims introduced.
- No visible browser error in the extracted page.

## Contact — local preview

- URL: `http://localhost:3000/contact`
- Title: `NamoNexus — Start a high-level conversation`
- Mode A remains intact: `Inquiry service not active`, no information is sent or stored, no mailto fallback, and no active success state.
- The approved data-boundary warning, retention/reply-target copy, privacy link, disabled button, and honeypot/consent fields remain present.

## Console

- Console inspection showed only the standard React DevTools informational message.
- No runtime error was visible during the route checks performed.

## Build and repository validation

The frozen install, TypeScript check, Vite production build, and Vitest suite passed. The test suite reported 14 passing tests across two test files. `git diff --check` passed. The secret scan found only documented placeholder/configuration names and existing runbook references; no actual secret values were introduced by the feature changes.

## Local route smoke

The local preview returned HTTP 200 for `/`, `/about`, `/solutions`, `/capability`, `/principles`, `/security`, `/contact`, `/privacy`, and `/404`. This smoke test confirms local SPA route serving, not production deployment.
