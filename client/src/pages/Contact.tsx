import { FormEvent, useState } from "react";
import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import SeoHead from "@/components/SeoHead";
import { SITUATION_MAX_LENGTH, type ContactField } from "@shared/contact";

type FormErrors = Partial<Record<ContactField, string>>;

export default function Contact() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [serviceNotice, setServiceNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setServiceNotice(
      "The inquiry service is not active yet. The contact channel is being prepared; no information was sent or stored."
    );
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
      <SeoHead
        title="NamoNexus — Start a high-level conversation"
        description="Share a high-level workflow or decision context with NamoNexus. The inquiry channel is currently being prepared and accepts no submissions."
        path="/contact"
      />
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
          <div className="mt-8 border border-fuchsia-300/35 bg-fuchsia-300/5 p-5" role="status" aria-live="polite">
            <div className="mono text-fuchsia-200">CONTACT CHANNEL / PREPARING</div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The inquiry service is not active yet. This form is available for interface review only; no information is sent or stored, and no submission can be accepted at this stage. When active, the channel will be used only to evaluate an inquiry and reply — not for marketing spam. Inquiries will be retained for up to 30 days and then deleted if no project proceeds; the founder reply target is 24–48 business hours.
            </p>
          </div>
          <p className="mt-5 text-xs leading-5 text-slate-500">
            Read the <a href="/privacy" className="text-cyan-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300">Privacy / Contact data notice</a> before sharing context.
          </p>
          <form
            className="mt-8 grid gap-5 md:grid-cols-2"
            onSubmit={handleSubmit}
            noValidate
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
              {serviceNotice && (
                <p
                  className="md:col-span-2 text-sm text-fuchsia-200"
                  role="alert"
                  aria-live="assertive"
                >
                  {serviceNotice}
                </p>
              )}
              <div className="flex flex-col gap-4 border-t border-cyan-300/15 pt-5 md:col-span-2 md:flex-row md:items-center md:justify-between">
                <p className="max-w-xl text-xs leading-5 text-slate-500">
                  Contact channel is being prepared. This page does not send or store inquiry data. There is no mailto fallback or other submission channel until the approved server-side configuration and abuse controls are verified.
                </p>
                <button
                  type="submit"
                  disabled
                  aria-disabled="true"
                  className="cursor-not-allowed border border-slate-500/40 px-5 py-3 text-sm font-semibold text-slate-500 opacity-80"
                >
                  Inquiry service not active
                </button>
              </div>
            </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
