"use client";

import { Compass, RefreshCw, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const pathname = usePathname();
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6 text-center">
      {/* Search Radar Animation */}
      <div className="flex justify-center">
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full shrink-0 relative">
          <Compass className={`size-10 ${scanning ? "animate-spin" : ""}`} />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-mono">
          404: NOT FOUND
        </h1>
        <h3 className="text-sm font-semibold text-slate-300">
          No Route Sector Found: Path Deallocated
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed pt-1">
          The requested path address is not indexed in the active routing
          registry. It may have been deprecated or moved behind administrative
          wrappers.
        </p>
      </div>

      {/* Dynamic Coordinate Telemetry */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-left text-[11px] text-slate-500 space-y-1.5 shadow-inner">
        <div className="flex justify-between border-b border-slate-900 pb-1 text-[10px] text-slate-600 font-bold uppercase">
          <span>Search Parameter</span>
          <span>Status</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-slate-400 font-semibold truncate max-w-[280px]">
            Path: &quot;{pathname}&quot;
          </span>
          <span className="text-red-400 font-bold">UNRESOLVED</span>
        </div>
        <div className="flex justify-between">
          <span>Routing Node Group</span>
          <span>(errors)</span>
        </div>
        <div className="flex justify-between">
          <span>Network Latency Search</span>
          <span>{scanning ? "Locating..." : "0ms"}</span>
        </div>
        {scanning ? (
          <div className="text-amber-400 border-t border-slate-900 pt-2 mt-1.5 flex items-center gap-1.5 font-sans font-bold">
            <RefreshCw className="size-3 animate-spin text-amber-400" />
            <span>Scanning virtual clusters network hierarchy...</span>
          </div>
        ) : (
          <div className="text-red-400 border-t border-slate-900 pt-2 mt-1.5 font-sans font-bold flex items-center gap-1.5">
            <Search className="size-3.5" />
            <span>Scan Complete: Node target unresolved.</span>
          </div>
        )}
      </div>
    </div>
  );
}
