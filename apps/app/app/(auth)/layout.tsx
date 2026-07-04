import { Terminal } from "lucide-react";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans selection:bg-violet-500/20 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-violet-600/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-96 rounded-full bg-blue-600/10 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      <div className="relative z-10 w-full max-w-md p-4">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 mb-3 shadow-lg shadow-violet-500/5">
            <Terminal className="size-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            REVREBEL Metrics
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Secure Infrastructure Gateway
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/50 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
          {children}
        </div>
      </div>
    </div>
  );
}
