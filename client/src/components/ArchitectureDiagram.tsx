import type { LucideIcon } from "lucide-react";
import {
  MessageCircle,
  Server,
  Database,
  Layers,
  Sparkles,
  Bell,
} from "lucide-react";

interface DiagramNode {
  id: string;
  label: string;
  sub: string;
  icon: LucideIcon;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
  variant: "flow" | "feedback";
}

const NODES: DiagramNode[] = [
  {
    id: "line",
    label: "LINE Messaging API",
    sub: "Elderly chat interface",
    icon: MessageCircle,
    x: 10,
    y: 22,
  },
  {
    id: "api",
    label: "FastAPI Gateway",
    sub: "Webhook · Auth · Routing",
    icon: Server,
    x: 50,
    y: 22,
  },
  {
    id: "supabase",
    label: "Supabase",
    sub: "Postgres · Realtime · Auth",
    icon: Database,
    x: 50,
    y: 62,
  },
  {
    id: "vector",
    label: "Vector Store",
    sub: "RAG Retrieval",
    icon: Layers,
    x: 90,
    y: 22,
  },
  {
    id: "llm",
    label: "LLM Ensemble",
    sub: "Claude · GPT-4 · Llama",
    icon: Sparkles,
    x: 90,
    y: 62,
  },
  {
    id: "alert",
    label: "Caregiver Alert",
    sub: "Real-time push to family",
    icon: Bell,
    x: 70,
    y: 92,
  },
];

const CONNECTIONS: Connection[] = [
  { from: "line", to: "api", variant: "flow" },
  { from: "api", to: "supabase", variant: "flow" },
  { from: "api", to: "vector", variant: "flow" },
  { from: "supabase", to: "vector", variant: "flow" },
  { from: "vector", to: "llm", variant: "flow" },
  { from: "llm", to: "alert", variant: "flow" },
  { from: "llm", to: "line", variant: "feedback" },
];

const NODE_MAP = new Map(NODES.map(n => [n.id, n]));

function nodeById(id: string): DiagramNode {
  const node = NODE_MAP.get(id);
  if (!node) throw new Error(`ArchitectureDiagram: unknown node id "${id}"`);
  return node;
}

function flowPath(a: DiagramNode, b: DiagramNode) {
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

function feedbackPath(a: DiagramNode, b: DiagramNode) {
  return `M ${a.x} ${a.y} C ${a.x + 6} 4, ${b.x - 6} 4, ${b.x} ${b.y}`;
}

export default function ArchitectureDiagram() {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="min-w-[800px]">
        <div className="glass-card-hover relative w-full aspect-[16/10] p-6 sm:p-10 overflow-hidden">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <marker
                id="arch-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0 0 L10 5 L0 10 Z" fill="#00E0FF" />
              </marker>
              <linearGradient id="arch-flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00E0FF" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00E0FF" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {CONNECTIONS.map(c => {
              const a = nodeById(c.from);
              const b = nodeById(c.to);
              const d =
                c.variant === "feedback" ? feedbackPath(a, b) : flowPath(a, b);
              return (
                <g key={`${c.from}-${c.to}`}>
                  <path
                    d={d}
                    fill="none"
                    stroke="url(#arch-flow)"
                    strokeWidth={1.4}
                    strokeDasharray={
                      c.variant === "feedback" ? "3 2" : undefined
                    }
                    vectorEffect="non-scaling-stroke"
                    markerEnd="url(#arch-arrow)"
                  />
                  {c.variant === "flow" && (
                    <circle r="1" fill="#00E0FF">
                      <animateMotion
                        dur="2.8s"
                        repeatCount="indefinite"
                        path={d}
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {NODES.map(node => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-32 sm:w-40"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="glass-card-hover flex flex-col items-center gap-1.5 px-3 py-3 text-center">
                  <Icon className="w-5 h-5 text-accent" />
                  <span className="text-[11px] sm:text-xs font-bold leading-tight">
                    {node.label}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-muted-foreground leading-tight">
                    {node.sub}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
