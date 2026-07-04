"use client";

import { ArrowRight, Key, RefreshCw, ShieldX } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForbiddenPage() {
  const [requesting, setRequesting] = useState(false);
  const [overrideStatus, setOverrideStatus] = useState<string | null>(null);

  const requestOverride = () => {
    setRequesting(true);
    setOverrideStatus("Broadcasting temporary bypass token request...");

    setTimeout(() => {
      setOverrideStatus("Awaiting General Manager administrative sign-off...");
      setTimeout(() => {
        setRequesting(false);
        setOverrideStatus(
          "Bypass signature REJECTED: Insufficient elevation criteria.",
        );
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6 text-center">
      {/* Icon Graphic */}
      <div className="flex justify-center">
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full shrink-0 relative animate-pulse">
          <ShieldX className="size-10" />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-mono">
          403: FORBIDDEN
        </h1>
        <h3 className="text-sm font-semibold text-slate-300">
          Access Denied: Node Authorization Mismatch
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed pt-1">
          Your active JWT token claims have failed the route validation boundary
          check. Necessary elevation criteria:{" "}
          <code className="font-mono text-rose-400 font-bold uppercase">
            SystemAdmin
          </code>{" "}
          or{" "}
          <code className="font-mono text-rose-400 font-bold uppercase">
            SBUManager
          </code>{" "}
          required.
        </p>
      </div>

      {/* Diagnostics Console */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-left text-[11px] text-slate-500 space-y-1 shadow-inner relative overflow-hidden">
        <div>[diag-check] GET /mission-control/settings ... FAIL</div>
        <div>[diag-claims] sub: &quot;usr-03&quot;</div>
        <div>[diag-claims] role: &quot;Auditor&quot;</div>
        <div className="text-red-400">
          [diag-err] CODE: REBEL_AUTH_MUTATION_DENIED
        </div>
        {overrideStatus && (
          <div className="text-amber-400 border-t border-slate-900 pt-2 mt-2 flex items-center gap-1.5 font-sans font-bold">
            {requesting && (
              <RefreshCw className="size-3 animate-spin text-amber-400" />
            )}
            <span>{overrideStatus}</span>
          </div>
        )}
      </div>

      {/* Action override buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={requestOverride}
          disabled={requesting}
          className="w-full flex items-center justify-center gap-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 transition-all uppercase tracking-wider disabled:opacity-50"
        >
          <Key className="size-3.5" />
          <span>Request Security Override</span>
        </button>

        <Link
          href="/login"
          className="w-full flex items-center justify-center gap-1.5 rounded border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-[10px] py-2.5 transition-all uppercase tracking-wider"
        >
          <span>Re-authenticate Identity</span>
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}
