import PrototypeNav, { Footer } from "@/components/PrototypeNav";
import SeoHead from "@/components/SeoHead";
import { Link } from "wouter";

type Project = {
  id: string;
  category: string;
  name: string;
  summary: string;
  context: string;
  scope: string[];
  positioning: string;
  evaluation: string[];
};

const featuredProjects: Project[] = [
  {
    id: "nre",
    category: "Sovereign AI Infrastructure",
    name: "NamoNexus Resonance Engine",
    summary:
      "A sovereign AI systems foundation designed for privacy-sensitive, locally governed, and evidence-conscious applications.",
    context:
      "NamoNexus Resonance Engine is the core systems foundation behind a broader NamoNexus platform direction. It is designed for situations where local control, careful reasoning, and responsible system behavior matter more than generic cloud-first automation.",
    scope: [
      "Core AI-system architecture for locally governed deployment models",
      "Multimodal reasoning and fusion-oriented system design",
      "Safety and explainability layers for higher-accountability use cases",
      "Streaming and monitoring patterns for real-time application flows",
    ],
    positioning:
      "Designed for organizations that need AI systems to remain legible, governable, and adaptable to sensitive operating conditions.",
    evaluation: [
      "What it is: a sovereign AI systems foundation for accountable operating environments.",
      "Who it is for: teams that need local control, reviewable reasoning, and clear system boundaries.",
      "How to evaluate it: inspect architecture choices, control surfaces, and evidence discipline before scale.",
    ],
  },
  {
    id: "ipd-smart-sentinel",
    category: "Healthcare Safety Systems",
    name: "IPD Smart Sentinel",
    summary:
      "A privacy-first inpatient safety monitoring concept built around sovereign edge processing, non-camera sensing, and structured event evidence for high-accountability care environments.",
    context:
      "IPD Smart Sentinel is a hospital safety system concept for inpatient environments where privacy, traceability, and calm operations must coexist. The project direction focuses on situations where unwitnessed falls, delayed situational awareness, and alarm fatigue create operational and clinical risk.",
    scope: [
      "Edge-system architecture for closed-network ward deployment",
      "Multi-sensor monitoring logic for inpatient safety workflows",
      "Visual-first alert-state behavior for nurse-facing operations",
      "Event-trace design for reviewable incident timelines",
    ],
    positioning:
      "Designed for sensitive care environments where trust, traceability, and human responsibility cannot be treated as afterthoughts.",
    evaluation: [
      "What it is: a privacy-first inpatient safety monitoring concept.",
      "Who it is for: care environments where calm operations and reviewable alert behavior both matter.",
      "How to evaluate it: inspect deployment boundary, event evidence, and human-response workflow.",
    ],
  },
  {
    id: "aegisgrid",
    category: "Security Infrastructure",
    name: "AegisGrid",
    summary:
      "A Python security foundations library for service applications, focused on authentication flows, encryption utilities, endpoint protection, and tamper-evident audit patterns.",
    context:
      "AegisGrid was created for service applications and API teams that need a more structured approach to authentication, encryption, request protection, and auditability.",
    scope: [
      "Token-management design for signed authentication flows",
      "Encryption utilities for multi-key handling and re-encryption workflows",
      "Tamper-evident audit patterns for higher-integrity event trails",
      "FastAPI-oriented protection workflows with test-backed verification",
    ],
    positioning:
      "Designed for teams that want security controls to be built into application behavior from the start, rather than added later as scattered safeguards.",
    evaluation: [
      "What it is: a security-focused Python foundation for service applications.",
      "Who it is for: teams that want authentication, encryption, and auditability treated as core behavior.",
      "How to evaluate it: inspect protection patterns, test coverage, and operational integrity assumptions.",
    ],
  },
  {
    id: "smart-classroom",
    category: "AI Education Systems",
    name: "NamoNexus Smart Classroom",
    summary:
      "An AI-assisted Dhamma learning system built around retrieval-backed study, real-time interaction, and ethical system design for guided educational use.",
    context:
      "NamoNexus Smart Classroom brings together retrieval-backed knowledge access, guided classroom interaction, and ethical system controls to support study environments where clarity, trust, and responsible use matter.",
    scope: [
      "Hybrid system architecture connecting local compute and managed cloud services",
      "Retrieval-backed knowledge workflows for guided learning",
      "Reasoning and safety layers to reduce low-quality outputs",
      "Real-time classroom interaction flows and operational tooling",
    ],
    positioning:
      "Designed as a responsible learning tool that helps people engage with knowledge more clearly, while keeping human teaching, judgment, and interpretation at the center.",
    evaluation: [
      "What it is: an AI-assisted guided learning system with retrieval-backed study support.",
      "Who it is for: learning environments that still keep human teaching and interpretation in control.",
      "How to evaluate it: inspect retrieval quality, safety boundaries, and classroom operating flow.",
    ],
  },
];

export default function Projects() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0F2C] text-slate-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,224,255,0.12),transparent_30%),radial-gradient(circle_at_80%_12%,rgba(217,70,239,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_25%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]"
      />
      <SeoHead
        title="NamoNexus — Selected work"
        description="Selected NamoNexus project profiles focused on privacy-conscious architecture, accountable systems, and evidence-bounded public positioning."
        path="/projects"
      />
      <PrototypeNav />
      <main className="relative">
        <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="mono text-cyan-300">SELECTED WORK</div>
              <h1 className="mt-5 text-5xl font-semibold leading-[.98] tracking-[-.06em] text-white md:text-7xl">
                Projects shaped around <span className="text-cyan-300">trust, control, and accountability.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
                NamoNexus highlights work where privacy-conscious architecture, legible system behavior, and high-accountability
                software design matter more than inflated claims.
              </p>
            </div>

            <div className="border border-cyan-300/20 bg-white/[0.03] p-6 shadow-[0_0_60px_rgba(0,224,255,0.08)] backdrop-blur-sm">
              <div className="mono text-cyan-300">BUYER READINESS</div>
              <div className="mt-6 space-y-4 text-sm leading-6 text-slate-300">
                <p>Architecture before marketing language.</p>
                <p>Operating boundary before scale assumptions.</p>
                <p>Evidence discipline before trust claims.</p>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {featuredProjects.map((project, index) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className="rounded-full border border-cyan-300/25 bg-white/[0.02] px-4 py-2 text-xs font-mono uppercase tracking-[.16em] text-slate-300 transition hover:border-cyan-300/60 hover:bg-cyan-300/8 hover:text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              >
                {`0${index + 1} / ${project.name}`}
              </a>
            ))}
          </div>
        </section>

        <section className="border-y border-cyan-300/15 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-3 lg:px-8">
            {[
              "Public-safe positioning only",
              "Architecture and workflow first",
              "No unsupported performance or compliance claims",
            ].map((item, index) => (
              <div key={item} className="relative overflow-hidden border border-cyan-300/15 px-5 py-4">
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-px ${index === 1 ? "bg-fuchsia-300/70" : "bg-cyan-300/70"}`}
                />
                <div className="mono text-cyan-300">REVIEW STARTS HERE</div>
                <p className="mt-3 text-sm leading-6 text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-cyan-300/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className="group relative overflow-hidden border border-cyan-300/20 bg-white/[0.03] p-7 transition hover:border-cyan-300/50 hover:bg-white/[0.05]"
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 ${index % 2 === 0 ? "bg-[linear-gradient(90deg,rgba(0,224,255,0.85),transparent)]" : "bg-[linear-gradient(90deg,rgba(217,70,239,0.65),rgba(0,224,255,0.45),transparent)]"}`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 top-8 size-36 rounded-full bg-cyan-300/8 blur-3xl transition group-hover:bg-cyan-300/12"
                  />
                  <div className="mono text-cyan-300">{project.category}</div>
                  <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white">{project.name}</h2>
                  <p className="mt-4 text-base leading-7 text-slate-300">{project.summary}</p>
                  <a
                    href={`#${project.id}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-sm border border-cyan-300/40 px-4 py-2 text-sm font-semibold text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                  >
                    View details
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-cyan-300/15">
          <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
            <div className="grid gap-16">
              {featuredProjects.map((project, index) => (
                <article
                  id={project.id}
                  key={project.id}
                  className="grid gap-8 border-t border-cyan-300/15 pt-10 lg:grid-cols-[0.9fr_1.1fr]"
                >
                  <div>
                    <div className="mono text-fuchsia-300">0{index + 1}</div>
                    <div className="mt-4 mono text-cyan-300">{project.category}</div>
                    <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white">{project.name}</h2>
                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">{project.positioning}</p>
                  </div>

                  <div>
                    <div className="border border-cyan-300/15 bg-white/[0.02] p-6">
                      <div className="mono text-cyan-300">OPERATING CONTEXT</div>
                      <p className="mt-4 text-lg leading-8 text-slate-300">{project.context}</p>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                      {project.scope.map((item) => (
                        <div key={item} className="border border-cyan-300/15 bg-white/[0.02] p-5">
                          <p className="text-sm leading-6 text-slate-300">{item}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 border border-cyan-300/15 bg-white/[0.02] p-5">
                      <div className="mono text-cyan-300">EVALUATION LENS</div>
                      <div className="mt-4 space-y-3">
                        {project.evaluation.map((item) => (
                          <p key={item} className="text-sm leading-6 text-slate-300">
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-cyan-300/15">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <div className="mono text-cyan-300">R&D BOUNDARY</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
                What stays outside the first public lineup.
              </h2>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>
                Experimental conversational systems, archive material, and adult-adjacent research are intentionally kept out of the main
                project lineup unless they receive clearly separated lab-style presentation.
              </p>
              <p>
                Public project pages should emphasize system design, operating context, and evidence-bounded capability without exposing
                internal thresholds, secrets, unsupported benchmark claims, or compliance wording that implies formal approval.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-cyan-300/15">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <div className="mono text-cyan-300">PUBLIC FRAMING</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
                What this page is designed to help a serious buyer assess.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "What the system or project is",
                "Who it is designed for",
                "What operating context it fits",
                "Which controls and boundaries matter",
                "How the work should be evaluated",
                "What is intentionally not being claimed",
              ].map((item) => (
                <div key={item} className="border border-cyan-300/15 bg-white/[0.02] p-5">
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-cyan-300/15">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <div className="mono text-cyan-300">NEXT STEP</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
                Start with the operating boundary, not the headline.
              </h2>
            </div>
            <div>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                If a project looks relevant, the next serious conversation should focus on decision scope, deployment boundary,
                review responsibility, and the evidence needed before scale.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-sm bg-cyan-300 px-5 py-3 text-sm font-semibold text-[#0A0F2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                >
                  Start a conversation
                </Link>
                <Link
                  href="/principles"
                  className="rounded-sm border border-cyan-300/40 px-5 py-3 text-sm font-semibold text-cyan-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
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
