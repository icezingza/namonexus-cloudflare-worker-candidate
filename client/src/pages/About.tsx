import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import SeoHead from "@/components/SeoHead";

const boundaries = [
  {
    title: "What is public",
    body: "This release explains a proposed approach, illustrative capabilities, and the decisions that should remain visible when systems operate in sensitive environments.",
  },
  {
    title: "What is not claimed",
    body: "Customer outcomes, certifications, clinical validation, security guarantees, and production assurance are not claimed without a reviewed evidence record.",
  },
  {
    title: "What comes next",
    body: "Identity, engagement details, technical evidence, and product status will be published only when they are approved for disclosure.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100">
      <SeoHead
        title="About NamoNexus — Sovereign AI Systems Studio"
        description="NamoNexus explores private, human-centered AI systems for sensitive workflows, with explicit boundaries around evidence and responsibility."
        path="/about"
      />
      <PrototypeNav />
      <main>
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mono text-[#00CEC9]">ABOUT THIS RELEASE</div>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-.06em] text-white md:text-7xl">
              A clear boundary around the work.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              NamoNexus is a sovereign AI systems studio focused on private,
              human-centered workflows where context, control, and accountability
              matter.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
              This public release explains an approach and illustrative capabilities.
              It does not present customer outcomes, certifications, security
              guarantees, or production assurance.
            </p>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <div className="mono text-[#00CEC9]">PUBLIC SCOPE</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white md:text-4xl">
                  Transparency is part of the product boundary.
                </h2>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                {boundaries.map((boundary) => (
                  <article key={boundary.title} className="border-t border-[#00B894]/70 pt-4">
                    <h3 className="text-lg font-semibold text-white">{boundary.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{boundary.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <div className="mono text-[#00CEC9]">HOW TO READ THIS SITE</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white md:text-4xl">
                  Evidence earns the right to scale.
                </h2>
              </div>
              <div className="space-y-5 text-base leading-7 text-slate-300">
                <p>
                  Principles describe how decisions should be framed. Capabilities
                  describe illustrative ways of working. Validation refers only to
                  checks completed for a named release or evaluation scope.
                </p>
                <p>
                  Product names, intended use, deployment status, clinical claims,
                  and assurance evidence require their own owner-approved record.
                  A prototype is not proof of production readiness.
                </p>
                <p className="border-l-2 border-[#00B894] pl-5 text-slate-400">
                  The public website is a communication layer. It is not a patient
                  record system and it does not replace clinical, legal, privacy, or
                  security governance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
