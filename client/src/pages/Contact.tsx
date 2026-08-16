import { FormEvent, useState } from "react";
import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import {
  SITUATION_MAX_LENGTH,
  validateContactPayload,
  type ContactField,
} from "@shared/contact";

type FormErrors = Partial<Record<ContactField, string>>;

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const website = String(data.get("website") ?? "").trim();

    // Do not send honeypot submissions to the server.
    if (website) return;

    const validation = validateContactPayload({
      name: data.get("name"),
      email: data.get("email"),
      organization: data.get("organization"),
      context: data.get("context"),
      focus: data.get("focus"),
      situation: data.get("situation"),
      timing: data.get("timing"),
      consent: data.get("consent"),
    });

    setServerError("");
    if (!validation.ok) {
      setErrors(validation.fields);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.value),
      });
      const responseBody = (await response.json().catch(() => ({}))) as {
        fields?: FormErrors;
        message?: string;
      };

      if (!response.ok) {
        if (response.status === 400 && responseBody.fields)
          setErrors(responseBody.fields);
        else if (response.status === 429)
          setServerError("Please wait before trying again.");
        else
          setServerError(
            responseBody.message ??
              "We could not accept this inquiry. Please try again."
          );
        return;
      }

      setSubmitted(true);
    } catch {
      setServerError(
        "We could not connect to the inquiry service. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const error = (field: ContactField) =>
    errors[field] ? (
      <p className="mt-2 text-xs text-fuchsia-300" role="alert">
        {errors[field]}
      </p>
    ) : null;
  const fieldClass =
    "mt-2 w-full border border-cyan-300/25 bg-[#10183B] px-4 py-3 text-white outline-none focus-visible:border-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-300/30";

  return (
    <div className="min-h-screen bg-[#0A0F2C] text-slate-100">
      <PrototypeNav />
      <main className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:py-28">
        <section>
          <div className="mono text-cyan-300">
            START A CONVERSATION / SENSITIVE WORKFLOW
          </div>
          <h1 className="mt-7 max-w-2xl text-5xl font-semibold leading-[.98] tracking-[-.06em] text-white md:text-7xl">
            Bring us the decision, workflow, or{" "}
            <span className="text-cyan-300">constraint</span> that cannot be
            treated casually.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
            NamoNexus works with organizations exploring private, human-centered
            AI systems where context, control, and accountability matter.
          </p>
          <div className="mt-10 border-t-2 border-fuchsia-300/70 pt-5 text-sm leading-7 text-slate-400">
            <strong className="block text-slate-100">Data boundary</strong>
            Please do not include personal health information, financial account
            details, credentials, security secrets, incident evidence, regulated
            records, or confidential implementation details. We only need a
            high-level description to decide how to respond.
          </div>
        </section>
        <section className="border-t-2 border-cyan-300 pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-3xl font-semibold tracking-[-.04em] text-white">
              Start with the context.
            </h2>
            <span className="mono text-slate-500">
              HIGH-LEVEL QUALIFICATION ONLY
            </span>
          </div>
          {submitted ? (
            <div
              className="mt-8 border border-cyan-300/40 p-8"
              role="status"
              aria-live="polite"
            >
              <div className="mono text-cyan-300">INQUIRY ACCEPTED</div>
              <h3 className="mt-4 text-3xl font-semibold">
                Your inquiry was accepted for review.
              </h3>
              <p className="mt-4 leading-7 text-slate-400">
                This confirmation does not claim email delivery or a response
                time. No confidential material should be submitted through this
                form.
              </p>
              <button
                type="button"
                className="mt-7 border border-cyan-300/50 px-4 py-3 text-sm text-cyan-200 focus-visible:outline-2 focus-visible:outline-cyan-200"
                onClick={() => {
                  setErrors({});
                  setServerError("");
                  setSubmitted(false);
                }}
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form
              className="mt-8 grid gap-5 md:grid-cols-2"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={submitting}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold">
                  How should we address you?
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClass}
                />
                {error("name")}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">
                  Where should we reply?
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClass}
                />
                <p className="mt-2 text-xs text-slate-500">
                  A work email is preferred.
                </p>
                {error("email")}
              </div>
              <div>
                <label
                  htmlFor="organization"
                  className="block text-sm font-semibold"
                >
                  Organization
                </label>
                <input
                  id="organization"
                  name="organization"
                  autoComplete="organization"
                  aria-invalid={Boolean(errors.organization)}
                  className={fieldClass}
                />
                {error("organization")}
              </div>
              <div>
                <label
                  htmlFor="context"
                  className="block text-sm font-semibold"
                >
                  Organization context
                </label>
                <select
                  id="context"
                  name="context"
                  defaultValue=""
                  aria-invalid={Boolean(errors.context)}
                  className={fieldClass}
                >
                  <option value="">Choose one</option>
                  <option>Healthcare or care</option>
                  <option>Education or learning</option>
                  <option>Public or civic sector</option>
                  <option>Research or knowledge work</option>
                  <option>Regulated or sensitive operations</option>
                  <option>Other</option>
                </select>
                {error("context")}
              </div>
              <div className="md:col-span-2">
                <label htmlFor="focus" className="block text-sm font-semibold">
                  What would be most useful to discuss?
                </label>
                <select
                  id="focus"
                  name="focus"
                  defaultValue=""
                  aria-invalid={Boolean(errors.focus)}
                  className={fieldClass}
                >
                  <option value="">Choose one</option>
                  <option>AI strategy and discovery</option>
                  <option>Private AI architecture</option>
                  <option>Human-in-the-loop workflow</option>
                  <option>Applied AI prototype</option>
                  <option>Principles and risk posture</option>
                  <option>I am still framing the problem</option>
                </select>
                {error("focus")}
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="situation"
                  className="block text-sm font-semibold"
                >
                  What decision or workflow are you trying to understand?
                </label>
                <textarea
                  id="situation"
                  name="situation"
                  maxLength={SITUATION_MAX_LENGTH}
                  aria-invalid={Boolean(errors.situation)}
                  className={`${fieldClass} min-h-32`}
                />
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  High-level description only. Do not include confidential,
                  regulated, personal, security-sensitive, or proprietary
                  information.
                </p>
                {error("situation")}
              </div>
              <div>
                <label htmlFor="timing" className="block text-sm font-semibold">
                  Broad timing
                </label>
                <select
                  id="timing"
                  name="timing"
                  defaultValue="Exploring the question"
                  aria-invalid={Boolean(errors.timing)}
                  className={fieldClass}
                >
                  <option>Exploring the question</option>
                  <option>Planning a focused discovery</option>
                  <option>Considering a prototype</option>
                  <option>Timing is not yet defined</option>
                </select>
                {error("timing")}
              </div>
              <label
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                Leave empty
                <input tabIndex={-1} autoComplete="off" name="website" />
              </label>
              <div className="md:col-span-2">
                <label className="flex items-start gap-3 text-xs leading-5 text-slate-400">
                  <input
                    name="consent"
                    value="yes"
                    type="checkbox"
                    className="mt-1 accent-cyan-300"
                  />{" "}
                  <span>
                    I understand this form accepts only high-level context and I
                    will not submit confidential or sensitive details.
                  </span>
                </label>
                {error("consent")}
              </div>
              {serverError && (
                <p
                  className="md:col-span-2 text-sm text-fuchsia-300"
                  role="alert"
                  aria-live="assertive"
                >
                  {serverError}
                </p>
              )}
              <div className="flex flex-col gap-4 border-t border-cyan-300/15 pt-5 md:col-span-2 md:flex-row md:items-center md:justify-between">
                <p className="max-w-xl text-xs leading-5 text-slate-500">
                  High-level inquiry only. The server validates the request
                  before any approved provider is called. Do not submit
                  confidential information.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#0A0F2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200 disabled:cursor-wait disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Send inquiry →"}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
