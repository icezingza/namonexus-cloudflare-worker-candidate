export const SITUATION_MAX_LENGTH = 1200;

export const CONTEXT_VALUES = [
  "Healthcare or care",
  "Education or learning",
  "Public or civic sector",
  "Research or knowledge work",
  "Regulated or sensitive operations",
  "Other",
] as const;

export const FOCUS_VALUES = [
  "AI strategy and discovery",
  "Private AI architecture",
  "Human-in-the-loop workflow",
  "Applied AI prototype",
  "Principles and risk posture",
  "I am still framing the problem",
] as const;

export const TIMING_VALUES = [
  "Exploring the question",
  "Planning a focused discovery",
  "Considering a prototype",
  "Timing is not yet defined",
] as const;

export const SENSITIVE_CONTENT_PATTERN =
  /(?:password|credential|api[_ -]?key|secret|token|credit\s*card|bank\s*account|financial\s*(?:account|detail|information)|medical\s*record|health\s*(?:record|information|data)|security\s*secret|incident\s*evidence|regulated\s*(?:record|data|information)|confidential|proprietary)/i;

export type ContactField =
  | "name"
  | "email"
  | "organization"
  | "context"
  | "focus"
  | "situation"
  | "timing"
  | "consent";

export type ContactPayload = {
  name: string;
  email: string;
  organization: string;
  context: (typeof CONTEXT_VALUES)[number];
  focus: (typeof FOCUS_VALUES)[number];
  situation: string;
  timing?: (typeof TIMING_VALUES)[number];
  consent: "yes";
  website?: string;
};

export type ContactValidation =
  | { ok: true; value: ContactPayload }
  | { ok: false; fields: Partial<Record<ContactField, string>> };

const ALLOWED_KEYS = new Set([
  "name",
  "email",
  "organization",
  "context",
  "focus",
  "situation",
  "timing",
  "consent",
  "website",
]);

const isString = (value: unknown): value is string => typeof value === "string";
const isOneOf = <T extends readonly string[]>(
  value: string,
  values: T
): value is T[number] => values.includes(value);

function clean(value: unknown): string {
  return isString(value) ? value.trim() : "";
}

export function validateContactPayload(input: unknown): ContactValidation {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {
      ok: false,
      fields: { situation: "Please submit a valid high-level inquiry." },
    };
  }

  const data = input as Record<string, unknown>;
  if (Object.keys(data).some(key => !ALLOWED_KEYS.has(key))) {
    return {
      ok: false,
      fields: {
        situation: "Please submit only the approved high-level fields.",
      },
    };
  }

  const name = clean(data.name);
  const email = clean(data.email);
  const organization = clean(data.organization);
  const context = clean(data.context);
  const focus = clean(data.focus);
  const situation = clean(data.situation);
  const timing = clean(data.timing);
  const consent = clean(data.consent);
  const website = clean(data.website);
  const fields: Partial<Record<ContactField, string>> = {};

  if (!name) fields.name = "Please enter your name.";
  else if (name.length > 120)
    fields.name = "Please keep your name under 120 characters.";

  if (!email) fields.email = "Please enter a work email.";
  else if (email.length > 320 || !/^\S+@\S+\.\S+$/.test(email))
    fields.email = "Please enter a valid work email.";

  if (!organization) fields.organization = "Please enter your organization.";
  else if (organization.length > 200)
    fields.organization = "Please keep your organization under 200 characters.";

  if (!isOneOf(context, CONTEXT_VALUES))
    fields.context = "Please choose an organization context.";
  if (!isOneOf(focus, FOCUS_VALUES))
    fields.focus = "Please choose a conversation focus.";
  if (!situation)
    fields.situation = "Please describe the situation at a high level.";
  else if (
    situation.length > SITUATION_MAX_LENGTH ||
    SENSITIVE_CONTENT_PATTERN.test(situation)
  ) {
    fields.situation =
      "Keep this high level; do not include secrets, regulated, personal, or confidential information.";
  }
  if (timing && !isOneOf(timing, TIMING_VALUES))
    fields.timing = "Please choose a valid broad timing.";
  if (consent !== "yes")
    fields.consent = "Please confirm the high-level data boundary.";

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    value: {
      name,
      email,
      organization,
      context: context as ContactPayload["context"],
      focus: focus as ContactPayload["focus"],
      situation,
      ...(timing ? { timing: timing as ContactPayload["timing"] } : {}),
      consent: "yes",
      ...(website ? { website } : {}),
    },
  };
}
