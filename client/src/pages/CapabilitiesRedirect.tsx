import { useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function CapabilitiesRedirect() {
  const [, navigate] = useLocation();

  useEffect(() => {
    navigate("/capability");
  }, [navigate]);

  return (
    <main className="min-h-screen bg-[#0A0F2C] px-5 py-20 text-slate-100">
      <p className="text-sm text-slate-300">
        Redirecting to capabilities. If you are not redirected, {" "}
        <Link
          href="/capability"
          className="text-cyan-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          continue to the capability page
        </Link>
        .
      </p>
    </main>
  );
}
