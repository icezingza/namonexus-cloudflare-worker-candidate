import { Link } from "wouter";
import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import SeoHead from "@/components/SeoHead";

function MotionPanel() {
  return (
    <div
      className="relative min-h-80 overflow-hidden border border-[#00CEC9]/30 bg-[radial-gradient(circle_at_center,rgba(0,206,201,.12),transparent_56%)]"
      aria-label="Decorative sovereign technology motion panel"
    >
      <div className="absolute left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00CEC9]/40 [transform:translate(-50%,-50%)_rotate(-18deg)_scaleX(1.12)] motion-orbit" />
      <div className="absolute left-1/2 top-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00B894]/35 [transform:translate(-50%,-50%)_rotate(48deg)_scaleY(.72)] motion-orbit motion-orbit-delay" />
      <div className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#00CEC9] bg-[#0A1128]/90 text-3xl font-semibold text-[#BFF8F1] shadow-[0_0_50px_rgba(0,206,201,.18)]">
        N
      </div>
      <span className="absolute left-[22%] top-[25%] size-1.5 rounded-full bg-[#BFF8F1] motion-particle" />
      <span className="absolute right-[20%] top-[38%] size-1 rounded-full bg-[#00B894] motion-particle motion-particle-delay" />
      <span className="absolute bottom-[22%] left-[38%] size-1 rounded-full bg-[#BFF8F1] motion-particle" />
      <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[.16em] text-slate-500">
        Stable boundary / accountable system
      </div>
    </div>
  );
}

const capabilities = [
  {
    id: "ai-strategy-discovery",
    title: "AI Strategy & Discovery",
    detail:
      "Frame the decision, workflow, constraints, ownership, and evidence needed before solutioning.",
  },
  {
    id: "private-ai-architecture",
    title: "Private AI Architecture",
    detail:
      "Make data boundaries, provider dependencies, access controls, and operating choices available for review.",
  },
  {
    id: "human-in-the-loop-workflows",
    title: "Human-in-the-loop Workflows",
    detail:
      "Design review, escalation, override, and decision records around the people who remain accountable.",
  },
  {
    id: "applied-ai-prototyping",
    title: "Applied AI Prototyping",
    detail:
      "Build a narrow, traceable working slice that helps test assumptions before larger investment.",
  },
];

const solutionAreas = [
  {
    id: "enterprise",
    label: "PROPOSED SOLUTION",
    title: "NamoNexus Enterprise",
    detail:
      "A proposed on-premise AI triage architecture for psychiatric crisis workflows, designed to make review queues, escalation, and human decision rights explicit.",
  },
  {
    id: "care",
    label: "SYNTHETIC WORKFLOW BRIEF",
    title: "NaMo Care",
    detail:
      "A proposed care-coordination platform concept for tasks, check-ins, follow-up, and human escalation using synthetic workflow examples.",
  },
  {
    id: "fusion-engine",
    label: "PROPOSED CAPABILITY",
    title: "NamoNexus Fusion Engine",
    detail:
      "A proposed analytics engine for examining patterns across approved operational data sources inside a reviewed customer boundary.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A1128] text-slate-100">
      <SeoHead
        title="NamoNexus — Sovereign AI with data sovereignty"
        description="NamoNexus designs and evaluates private, human-centered AI systems for healthcare workflows where information control, accountable decisions, and operational evidence matter."
        path="/"
      />
      <PrototypeNav />
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:py-28">
          <div>
            <div className="mono mb-5 text-[#00CEC9]">SOVEREIGN AI SYSTEMS STUDIO</div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[.98] tracking-[-.06em] text-white md:text-7xl">
              Sovereign AI with data sovereignty built into the deployment boundary.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              NamoNexus designs and evaluates private, human-centered AI systems for
              healthcare workflows where information control, accountable decisions,
              and operational evidence matter.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/solutions"
                className="rounded-sm bg-[#00B894] px-5 py-3 text-sm font-semibold text-[#0A1128] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00CEC9]"
              >
                Explore the systems
              </Link>
              <Link
                href="/security"
                className="rounded-sm border border-[#00CEC9]/70 px-5 py-3 text-sm font-semibold text-[#00CEC9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00CEC9]"
              >
                Review Security &amp; Trust
              </Link>
            </div>
            <p className="mt-5 max-w-xl text-xs leading-5 text-slate-500">
              Public materials describe proposed and illustrative capabilities. They do
              not claim clinical outcomes, certifications, or production assurance.
            </p>
          </div>
          <MotionPanel />
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <div className="mono text-[#00CEC9]">WHERE WE HELP</div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
                  When context, control, and responsibility cannot be treated casually.
                </h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2">
                <article className="border-t border-[#00B894]/70 pt-4">
                  <h3 className="text-xl font-semibold">Sensitive data</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Workflows where privacy, access boundaries, and data movement require
                    explicit decisions.
                  </p>
                </article>
                <article className="border-t border-[#00B894]/70 pt-4">
                  <h3 className="text-xl font-semibold">Human oversight</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Decisions where review, escalation, and accountability must remain
                    visible.
                  </p>
                </article>
                <article className="border-t border-[#00B894]/70 pt-4">
                  <h3 className="text-xl font-semibold">Fragmented knowledge</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Contexts where people need traceable assistance across distributed
                    knowledge and systems.
                  </p>
                </article>
                <article className="border-t border-[#00B894]/70 pt-4">
                  <h3 className="text-xl font-semibold">Operational resilience</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Workflows that need a clear response when a model, integration,
                    network, or operator is unavailable.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mono text-[#00CEC9]">CAPABILITIES</div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
                  A method before a stack.
                </h2>
              </div>
              <Link
                href="/capability"
                className="text-sm text-[#00CEC9] underline-offset-4 hover:underline"
              >
                Explore the process →
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((capability, index) => (
                <Link
                  href={`/capability#${capability.id}`}
                  key={capability.id}
                  aria-label={`Explore ${capability.title}`}
                  className="border border-[#00CEC9]/20 p-6 transition hover:border-[#00CEC9]/70 focus-visible:outline-2 focus-visible:outline-[#00CEC9]"
                >
                  <div className="mono text-[#00B894]">0{index + 1}</div>
                  <h3 className="mt-12 text-xl font-semibold">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{capability.detail}</p>
                  <span className="mt-6 inline-block text-xs uppercase tracking-[.12em] text-[#00CEC9]">
                    View scope →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mono text-[#00CEC9]">SOLUTION AREAS</div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
                  Explore the questions before naming the system.
                </h2>
              </div>
              <Link
                href="/solutions"
                className="text-sm text-[#00CEC9] underline-offset-4 hover:underline"
              >
                View all solution areas →
              </Link>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {solutionAreas.map((solution) => (
                <Link
                  key={solution.id}
                  href={`/solutions#${solution.id}`}
                  className="group border border-[#00CEC9]/20 bg-[#1A2332]/45 p-6 transition hover:border-[#00CEC9]/70 focus-visible:outline-2 focus-visible:outline-[#00CEC9]"
                >
                  <div className="mono text-[#00B894]">{solution.label}</div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{solution.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{solution.detail}</p>
                  <span className="mt-6 inline-block text-xs uppercase tracking-[.12em] text-[#00CEC9] group-hover:underline">
                    Review boundary →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            <div>
              <div className="mono text-[#00CEC9]">PRINCIPLES</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
                Trust is a system property.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-300">
                Sovereignty, privacy, traceability, human responsibility, graceful
                failure, and evidence before scale shape the way the work is framed.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/principles"
                  className="text-sm text-[#00CEC9] underline-offset-4 hover:underline"
                >
                  Read the principles →
                </Link>
                <Link
                  href="/about"
                  className="text-sm text-[#00CEC9] underline-offset-4 hover:underline"
                >
                  About this release →
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#00CEC9]/15">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            <div>
              <div className="mono text-[#00CEC9]">CONTACT CHANNEL / PREPARING</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] text-white">
                Start with the context.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                The inquiry channel is currently being prepared. The Contact form is
                shown for interface review only; no information is sent or stored, and
                no submission can be accepted at this stage.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-block rounded-sm border border-[#00CEC9]/70 px-5 py-3 text-sm font-semibold text-[#00CEC9] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00CEC9]"
              >
                View Contact status
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
