import { useState } from "react";
import { Link, useLocation } from "wouter";

const links = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/capability", label: "Capability" },
  { href: "/security", label: "Security & Trust" },
  { href: "/principles", label: "Principles" },
  { href: "/contact", label: "Contact" },
];

function LogoMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-grid size-8 place-items-center rounded-full border border-cyan-300/80 text-sm font-bold text-cyan-300 shadow-[0_0_22px_rgba(0,224,255,.18)]"
    >
      N
    </span>
  );
}

export default function PrototypeNav() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-300/15 bg-[#0A0F2C]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
          onClick={() => setOpen(false)}
        >
          <LogoMark />
          <span className="text-lg font-semibold tracking-[-.04em] text-white">
            Namo<span className="text-cyan-300">Nexus</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = location === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-sm text-sm transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 ${active ? "text-cyan-300" : "text-slate-300 hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="rounded-sm border border-cyan-300/40 px-3 py-2 text-xs font-mono uppercase tracking-[.16em] text-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-cyan-300/15 px-5 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-sm px-2 py-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 ${active ? "bg-cyan-300/10 text-cyan-300" : "text-slate-200"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-cyan-300/15 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-xs text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <span>© 2025–2026 NamoNexus.</span>
        <span className="max-w-xl text-center lg:text-left">
          Illustrative content — no customer, metric, certification, or case-study claims.
        </span>
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-end">
          <Link
            href="/about"
            className="text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            About
          </Link>
          <Link
            href="/privacy"
            className="text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            Privacy / Contact data
          </Link>
          <a
            href="https://www.linkedin.com/company/namonexus/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}
