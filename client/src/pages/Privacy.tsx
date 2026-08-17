import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import SeoHead from "@/components/SeoHead";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] text-slate-100">
      <SeoHead
        title="NamoNexus — Privacy and Contact data"
        description="NamoNexus contact-data notice: high-level inquiry evaluation and reply only, with a 30-day retention limit if no project proceeds."
        path="/privacy"
      />
      <PrototypeNav />
      <main className="mx-auto max-w-4xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="mono text-cyan-300">PRIVACY / CONTACT DATA</div>
        <h1 className="mt-7 text-5xl font-semibold leading-[.98] tracking-[-.06em] text-white md:text-7xl">
          A narrow boundary for a first conversation.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
          This notice describes the intended contact-data boundary for the NamoNexus MVP. The inquiry channel is currently inactive: the form is disabled, makes no network request, and does not send or store information.
        </p>

        <div className="mt-14 grid gap-8 border-t-2 border-cyan-300 pt-6 md:grid-cols-2">
          <section aria-labelledby="purpose-heading">
            <div className="mono text-fuchsia-300">PURPOSE</div>
            <h2 id="purpose-heading" className="mt-3 text-2xl font-semibold text-white">
              Inquiry evaluation and reply only.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              When the channel becomes active, submitted context will be used only to understand whether an inquiry is a suitable conversation and to reply. It will not be used for marketing spam.
            </p>
          </section>
          <section aria-labelledby="boundary-heading">
            <div className="mono text-fuchsia-300">DATA BOUNDARY</div>
            <h2 id="boundary-heading" className="mt-3 text-2xl font-semibold text-white">
              High-level context only.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              The intended fields are name, work email, organization, broad context, conversation focus, high-level situation, broad timing, consent, and a spam honeypot. Do not submit health information, financial details, credentials, API keys, security secrets, incident evidence, regulated records, or confidential implementation details.
            </p>
          </section>
          <section aria-labelledby="retention-heading">
            <div className="mono text-fuchsia-300">RETENTION</div>
            <h2 id="retention-heading" className="mt-3 text-2xl font-semibold text-white">
              Up to 30 days.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              When the channel is active, inquiries will be retained for up to 30 days and then deleted if no project proceeds. Any real implementation must verify the storage, deletion, and access controls before activation.
            </p>
          </section>
          <section aria-labelledby="reply-heading">
            <div className="mono text-fuchsia-300">REPLY</div>
            <h2 id="reply-heading" className="mt-3 text-2xl font-semibold text-white">
              Founder reply target: 24–48 business hours.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              This is a target for the future active channel, not a delivery guarantee. The channel remains disabled until a real Resend configuration, verified sender domain, server-only secrets, and abuse controls are separately verified.
            </p>
          </section>
        </div>

        <section className="mt-14 border border-cyan-300/30 p-8" aria-labelledby="status-heading">
          <div className="mono text-cyan-300">CURRENT STATUS</div>
          <h2 id="status-heading" className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white">
            No contact data is being accepted in this release.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
            Contact remains Mode A and disabled. There is no mailto fallback, no analytics, no CRM, no email delivery, and no persistence path attached to the form.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
