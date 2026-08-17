import { Link } from "wouter";
import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import SeoHead from "@/components/SeoHead";

const solutions = [
  {
    id: "enterprise",
    label: "PROPOSED SOLUTION / EVALUATION BRIEF",
    title: "NamoNexus Enterprise",
    description:
      "NamoNexus Enterprise is a proposed on-premise AI triage architecture for psychiatric crisis workflows. It is intended to address a practical problem: high-consequence information is often distributed across records, teams, and operating systems, while clinicians still need to make the final decision. The proposed deployment model keeps processing within a customer-controlled environment when the installation, network egress, support path, backups, and updates are configured and verified accordingly. The system is designed to organize relevant context, support review queues, and make escalation and human decision rights explicit. It is not presented here as a diagnosis, treatment recommendation, clinical outcome, or validated medical device.",
    value: "Can help structure review and escalation around human-owned decisions. It does not replace clinical judgment.",
  },
  {
    id: "care",
    label: "PROPOSED SOLUTION / SYNTHETIC WORKFLOW BRIEF",
    title: "NaMo Care",
    description:
      "NaMo Care is a proposed care-coordination platform for elderly-care workflows, combining a web dashboard concept with a controlled messaging integration such as LINE. It addresses a coordination problem: care teams and families may need a shared view of tasks, check-ins, and follow-up responsibilities without turning every interaction into an open data exchange. A customer-controlled deployment can be evaluated on-premise or within another approved boundary, with the data flow, connector behavior, access roles, retention, and support path defined before use. The public mockup uses synthetic residents and simulated notifications only.",
    value: "Can make task status, follow-up, and human escalation more visible without presenting an automated clinical conclusion.",
  },
  {
    id: "fusion-engine",
    label: "PROPOSED CAPABILITY / EVALUATION BRIEF",
    title: "NamoNexus Fusion Engine",
    description:
      "NamoNexus Fusion Engine is a proposed AI analytics engine for examining patterns across approved operational data sources. It addresses a common systems problem: decision-makers may have useful information, but the context is separated across workflows, teams, and formats. The engine can be evaluated within a customer-controlled environment when the data boundary, connectors, model dependencies, access controls, audit events, and egress behavior are documented and tested. Public visualizations are synthetic and illustrative. They do not represent patient data, clinical performance, real-time monitoring, or a validated recommendation.",
    value: "Can help authorized teams examine workflow patterns and questions for review; it does not produce an autonomous clinical decision.",
  },
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100">
      <SeoHead
        title="NamoNexus Solutions — Sensitive Healthcare Workflows"
        description="Proposed and illustrative NamoNexus solution areas for private, human-centered healthcare workflows with explicit evidence boundaries."
        path="/solutions"
      />
      <PrototypeNav />
      <main>
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mono text-[#00CEC9]">SOLUTION AREAS</div>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-.06em] text-white md:text-7xl">
              Systems for sensitive healthcare workflows.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              The solution areas below describe proposed architectures and evaluation
              directions. Each one must be assessed against intended use, deployment
              boundary, data protection obligations, human oversight, and evidence
              available for publication.
            </p>
            <p className="mt-5 max-w-3xl border-l-2 border-[#00B894] pl-5 text-sm leading-6 text-slate-400">
              This page does not claim clinical outcomes, certifications, customer
              deployments, or production assurance.
            </p>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {solutions.map((solution) => (
                <article
                  id={solution.id}
                  key={solution.id}
                  className="flex min-h-[34rem] flex-col border border-[#00CEC9]/20 bg-[#1A2332]/55 p-6"
                >
                  <div className="mono text-[#00CEC9]">{solution.label}</div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-.04em] text-white">
                    {solution.title}
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-slate-300">{solution.description}</p>
                  <div className="mt-auto border-t border-[#00B894]/40 pt-5">
                    <div className="mono text-[#00B894]">POTENTIAL WORKFLOW VALUE</div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{solution.value}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            <div>
              <div className="mono text-[#00CEC9]">EVALUATION BOUNDARY</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white md:text-4xl">
                Start with the boundary, not the promise.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-slate-300">
              <p>
                Before an evaluation begins, define who uses the system, what it is
                intended to support, what it must not do, where data is processed,
                who owns the final decision, and how failure is handled.
              </p>
              <p className="text-slate-400">
                Synthetic examples on this page are not patient data and do not
                represent clinical performance or a live integration.
              </p>
              <div className="flex flex-wrap gap-4 pt-3">
                <Link
                  href="/security"
                  className="rounded-sm bg-[#00B894] px-5 py-3 text-sm font-semibold text-[#0A1128] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00CEC9]"
                >
                  Review Security &amp; Trust
                </Link>
                <Link
                  href="/contact"
                  className="rounded-sm border border-[#00CEC9]/70 px-5 py-3 text-sm font-semibold text-[#00CEC9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00CEC9]"
                >
                  View Contact status
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
