import { Link } from "wouter";
import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import SeoHead from "@/components/SeoHead";

const trustAreas = [
  {
    title: "Data boundaries",
    body: "Make clear what information should remain within an approved operating boundary, what may leave, and which support, update, backup, or integration paths exist.",
    status: "Proposed control area",
  },
  {
    title: "Identity and access",
    body: "Identify who can use, inspect, change, pause, approve, or roll back a system. Access decisions remain visible to the people who own the workflow and risk.",
    status: "Proposed control area",
  },
  {
    title: "Traceability",
    body: "Define which inputs, versions, context, changes, approvals, and review actions should be inspectable for a given deployment.",
    status: "Principle / method",
  },
  {
    title: "Graceful failure",
    body: "Specify what happens when a model, integration, network, data source, or operator is unavailable. Failure behavior is part of the design conversation.",
    status: "Proposed method",
  },
  {
    title: "Human responsibility",
    body: "Automation does not remove ownership. Review, escalation, override, pause, and rollback responsibilities must be assigned before a workflow is trusted.",
    status: "Principle / method",
  },
  {
    title: "Evidence status",
    body: "Every material statement should carry a status: verified, validated in this release, proposed, illustrative, not publicly evidenced, or blocked.",
    status: "Current release policy",
  },
];

const evidenceLevels = [
  ["Principle", "What should guide the work."],
  ["Method", "How the principle may shape engineering."],
  ["Artifact", "What can be inspected and revisited."],
  ["Validation", "How the system was tested in context."],
  ["Approved evidence", "What may be published with context and permission."],
];

export default function Security() {
  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100">
      <SeoHead
        title="NamoNexus — Security & Trust"
        description="How NamoNexus makes data boundaries, ownership, failure behavior, and evidence status visible without overstating assurance."
        path="/security"
      />
      <PrototypeNav />
      <main>
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mono text-[#00CEC9]">SECURITY / TRUST POSTURE</div>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-.06em] text-white md:text-7xl">
              Security is a deployment conversation, not a badge.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              The controls, data flows, identity model, and assurance evidence depend
              on the organization, intended use, deployment boundary, and operating
              responsibilities.
            </p>
            <p className="mt-5 max-w-3xl border-l-2 border-[#00B894] pl-5 text-sm leading-6 text-slate-400">
              This page separates implemented controls, proposed controls, and
              information that is not yet publicly evidenced.
            </p>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {trustAreas.map((area) => (
                <article key={area.title} className="border-t border-[#00CEC9]/60 pt-4">
                  <div className="mono text-[#00B894]">{area.status}</div>
                  <h2 className="mt-4 text-xl font-semibold text-white">{area.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{area.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <div>
              <div className="mono text-[#00CEC9]">DEPLOYMENT BOUNDARY</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white md:text-4xl">
                On-premise is a boundary choice, not a security guarantee.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-slate-300">
              <p>
                A deployment may be evaluated within an organization’s infrastructure,
                private cloud, or another approved operating boundary. The resulting
                assurance depends on identity, network segmentation, key custody,
                support access, backup, updates, monitoring, and the responsibilities
                of each party.
              </p>
              <p className="text-slate-400">
                A public website cannot prove that a customer deployment is secure,
                compliant, or clinically validated merely by describing an on-premise
                option.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <div className="mono text-[#00CEC9]">EVIDENCE LADDER</div>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white md:text-4xl">
                  Evidence earns the right to scale.
                </h2>
              </div>
              <div className="divide-y divide-[#00CEC9]/15 border-y border-[#00CEC9]/15">
                {evidenceLevels.map(([level, description], index) => (
                  <div key={level} className="grid gap-3 py-4 sm:grid-cols-[13rem_1fr]">
                    <div className="mono text-[#00CEC9]">0{index + 1} / {level}</div>
                    <p className="text-sm leading-6 text-slate-400">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="procurement" className="border-t border-[#00CEC9]/15">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            <div>
              <div className="mono text-[#00CEC9]">FOR PROCUREMENT &amp; IT</div>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-white md:text-4xl">
                Start with the questions that require evidence.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-7 text-slate-300">
              <p>
                A procurement review can begin with the deployment model, data flow,
                identity and access assumptions, integration prerequisites, evidence
                status, and the owner for each open question.
              </p>
              <p className="text-slate-400">
                Procurement materials are published only when reviewed, versioned, and
                approved for disclosure. No certification or implementation guarantee
                is implied by a document index.
              </p>
              <div className="flex flex-wrap gap-4 pt-3">
                <Link
                  href="/contact"
                  className="rounded-sm bg-[#00B894] px-5 py-3 text-sm font-semibold text-[#0A1128] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00CEC9]"
                >
                  View Contact status
                </Link>
                <Link
                  href="/principles"
                  className="rounded-sm border border-[#00CEC9]/70 px-5 py-3 text-sm font-semibold text-[#00CEC9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00CEC9]"
                >
                  Read the principles
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
