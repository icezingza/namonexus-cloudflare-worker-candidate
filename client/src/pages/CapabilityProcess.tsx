import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import SeoHead from "@/components/SeoHead";

const stages = [
  {
    n: "01",
    name: "Discover",
    lens: "Reduce problem uncertainty",
    body: "Make decisions, users, data, constraints, failure costs, system boundaries, and responsibility explicit before solutioning.",
    gate: "Is there a defined problem and an accountable owner?",
    artifact: "Decision and workflow map",
  },
  {
    n: "02",
    name: "Design",
    lens: "Reduce control uncertainty",
    body: "Compare architecture, dependencies, access boundaries, review points, fallback behavior, and operating ownership.",
    gate: "Can the proposed shape meet privacy and control requirements?",
    artifact: "Architecture and risk brief",
  },
  {
    n: "03",
    name: "Prototype",
    lens: "Reduce implementation uncertainty",
    body: "Expose important assumptions through a narrow, traceable, end-to-end working slice with failure-aware behavior.",
    gate: "Does the slice create credible evidence for the next move?",
    artifact: "Working slice and decision log",
  },
  {
    n: "04",
    name: "Validate",
    lens: "Reduce investment uncertainty",
    body: "Use users, scenarios, and evidence to decide whether to proceed, change direction, pause, or stop.",
    gate: "What has been learned — and what remains unproven?",
    artifact: "Validation findings",
  },
];

const capabilityScopes = [
  {
    id: "ai-strategy-discovery",
    n: "01",
    title: "AI Strategy & Discovery",
    body: "Frame the decision before selecting a system shape: who owns it, which workflow is in view, what constraints matter, and what evidence would change the next decision.",
    artifact: "Illustrative output: decision and workflow map",
  },
  {
    id: "private-ai-architecture",
    n: "02",
    title: "Private AI Architecture",
    body: "Make data boundaries, provider dependency, access, observability, fallback, and operating ownership available for challenge before sensitive context is committed.",
    artifact: "Illustrative output: architecture and risk brief",
  },
  {
    id: "human-in-the-loop-workflows",
    n: "03",
    title: "Human-in-the-loop Workflows",
    body: "Design where a person reviews, overrides, escalates, records, pauses, or rolls back so responsibility remains visible around the system.",
    artifact: "Illustrative output: review and escalation map",
  },
  {
    id: "applied-ai-prototyping",
    n: "04",
    title: "Applied AI Prototyping",
    body: "Build a narrow, traceable working slice that tests important assumptions in context without implying production readiness or a guaranteed outcome.",
    artifact: "Illustrative output: working slice and decision log",
  },
];

export default function CapabilityProcess() {
  return (
    <div className="min-h-screen bg-[#0A0F2C] text-slate-100">
      <SeoHead
        title="NamoNexus — Capabilities and decision discipline"
        description="Explore NamoNexus capabilities across AI strategy, private AI architecture, human-in-the-loop workflows, and applied AI prototyping."
        path="/capability"
      />
      <PrototypeNav />
      <main>
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mono text-cyan-300">CAPABILITY / DECISION DISCIPLINE</div>
          <div className="mt-7 grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.06em] text-white md:text-7xl">
                From uncertainty to <span className="text-cyan-300">evidence.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                Discover → Design → Prototype → Validate is a focused way to make the problem, the control, the working slice, and the next investment decision explicit.
              </p>
            </div>
            <div className="border border-cyan-300/30 p-6 text-sm leading-7 text-slate-300">
              <div className="mono text-fuchsia-300">METHOD POSITION</div>
              <p className="mt-4">
                This is not a promise of scale. It is a way to reduce a different category of uncertainty before an organization commits sensitive data, operational trust, or larger investment.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-cyan-300/15" aria-labelledby="capability-scopes-heading">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
              <div>
                <div className="mono text-cyan-300">CAPABILITY SCOPES</div>
                <h2 id="capability-scopes-heading" className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
                  Four ways to start with the boundary.
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {capabilityScopes.map((capability) => (
                  <article
                    id={capability.id}
                    key={capability.id}
                    className="scroll-mt-28 border-t-2 border-cyan-300 pt-4"
                  >
                    <div className="mono text-fuchsia-300">{capability.n}</div>
                    <h3 className="mt-5 text-2xl font-semibold tracking-[-.04em] text-white">
                      {capability.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {capability.body}
                    </p>
                    <p className="mt-5 text-xs text-slate-500">{capability.artifact}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-cyan-300/15" aria-labelledby="stages-heading">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
              <div>
                <div className="mono text-cyan-300">FOUR STAGES / FOUR GATES</div>
                <h2 id="stages-heading" className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
                  A method before a stack.
                </h2>
              </div>
              <div className="grid border-t-2 border-cyan-300 md:grid-cols-2 xl:grid-cols-4">
                {stages.map((stage) => (
                  <article
                    key={stage.name}
                    className="border-b border-cyan-300/20 p-5 xl:border-b-0 xl:border-r xl:last:border-r-0"
                  >
                    <div className="mono text-fuchsia-300">{stage.n}</div>
                    <div className="mt-14 mono text-cyan-300">{stage.lens}</div>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-white">
                      {stage.name}
                    </h3>
                    <p className="mt-4 text-sm leading-6 text-slate-400">{stage.body}</p>
                    <div className="mt-8 border-t border-cyan-300/20 pt-4">
                      <div className="mono text-[10px] text-cyan-300">DECISION GATE</div>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{stage.gate}</p>
                    </div>
                    <div className="mt-6 text-xs text-slate-500">
                      Illustrative artifact: <span className="text-slate-300">{stage.artifact}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-cyan-300/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <article className="border-t border-cyan-300/60 pt-4">
                <div className="mono text-cyan-300">ENGINEERING FOCUS</div>
                <h2 className="mt-4 text-2xl font-semibold">Boundaries &amp; dependencies</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Make data movement, provider dependency, access, versioning, observability, and degraded modes available for challenge.
                </p>
              </article>
              <article className="border-t border-cyan-300/60 pt-4">
                <div className="mono text-cyan-300">OPERATING FOCUS</div>
                <h2 className="mt-4 text-2xl font-semibold">Ownership &amp; escalation</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Clarify who reviews, overrides, changes, pauses, rolls back, and is accountable for the decision.
                </p>
              </article>
              <article className="border-t border-cyan-300/60 pt-4">
                <div className="mono text-cyan-300">EVIDENCE FOCUS</div>
                <h2 className="mt-4 text-2xl font-semibold">What remains unproven</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Record scenarios, findings, limitations, and decision rationale before making a claim or scaling trust.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="border border-cyan-300/30 p-8 md:p-12">
            <div className="mono text-cyan-300">START WITH THE BOUNDARY</div>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-.04em] text-white">
              Bring us the workflow that cannot be treated casually.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-400">
              Illustrative capability language only. No production readiness, customer outcome, or certification is implied.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
