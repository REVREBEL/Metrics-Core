import { ShieldAlert, Terminal } from "lucide-react";
import Link from "next/link";
import type React from "react";

export default function ErrorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans selection:bg-rose-500/20 relative overflow-hidden">
      {/* Glitch Animated Radar Mask & Scanline */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25" />

        {/* Glowing Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-rose-900/10 blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 right-1/4 size-80 rounded-full bg-red-900/10 blur-3xl animate-pulse"
          style={{ animationDuration: "10s" }}
        />

        {/* Animated Scanline Sweep */}
        <div
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/20 to-transparent top-0 animate-[scan_6s_linear_infinite]"
          style={{
            animationName: "scan",
          }}
        />

        <style>{`
          @keyframes scan {
            0% { top: 0%; }
            100% { top: 100%; }
          }
        `}</style>
      </div>

      <div className="relative z-10 w-full max-w-lg p-4">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex size-11 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 mb-3 shadow-lg shadow-red-500/5">
            <ShieldAlert className="size-6" />
          </div>
          <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">
            Metrics Core Diagnostics
          </h2>
          <p className="text-[10px] text-red-400/80 font-mono mt-1 uppercase tracking-widest">
            Exception Intercept Boundary
          </p>
        </div>

        {/* Child error pages */}
        <div className="rounded-2xl border border-red-500/15 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/80 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
          {children}
        </div>

        {/* Return Button */}
        <div className="text-center mt-6">
          <Link
            href="/metrics"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white hover:underline transition-colors uppercase tracking-wider"
          >
            <Terminal className="size-3.5 text-violet-400" />
            <span>Return to Core System</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
