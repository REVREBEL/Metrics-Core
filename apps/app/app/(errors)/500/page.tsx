"use client";

import { AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function InternalServerErrorPage() {
  const [restarting, setRestarting] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [completed, setCompleted] = useState(false);

  const triggerColdRestart = () => {
    setRestarting(true);
    setPercentage(0);
    setCompleted(false);

    const interval = setInterval(() => {
      setPercentage((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setRestarting(false);
            setCompleted(true);
          }, 500);
          return 100;
        }
        return p + 10;
      });
    }, 250);
  };

  return (
    <div className="space-y-6 text-center">
      {/* Warning Triangle Icon */}
      <div className="flex justify-center">
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full shrink-0 relative animate-pulse">
          <AlertTriangle className="size-10" />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-mono">
          500: SERVER ERROR
        </h1>
        <h3 className="text-sm font-semibold text-slate-300">
          Telemetry Offline: Critical Process Core Failure
        </h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed pt-1">
          An unhandled exception has corrupted the active application scope
          context thread. A heap overflow was triggered in the data collection
          pool.
        </p>
      </div>

      {/* Telemetry Heap Dump Console */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-left text-[11px] text-slate-500 space-y-1 shadow-inner max-h-40 overflow-y-auto">
        <div className="text-red-400 font-bold uppercase text-[10px] pb-1.5 border-b border-slate-900 mb-1">
          [CRITICAL_CORE_ERR] PROCESS THREAD PANIC DUMP
        </div>
        <div>
          FATAL ERROR: Ineffective mark-compacts near heap limit Allocation
          failed - JavaScript heap out of memory
        </div>
        <div> 1: 0x10129bc44 node::Abort()</div>
        <div> 2: 0x10129ce0c node::OnFatalError(char const*, char const*)</div>
        <div>
          {" "}
          3: 0x1013fe050 v8::Utils::ReportOOMFailure(v8::internal::Isolate*,
          char const*, bool)
        </div>
        <div>
          {" "}
          4: 0x1013fdfdc
          v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char
          const*, bool)
        </div>
        <div>
          {" "}
          5: 0x1015690b0 v8::internal::Heap::FatalProcessOutOfMemory(char
          const*)
        </div>
        <div>[diag-dump] Process id: 18492 (Thread node-worker-3)</div>
      </div>

      {/* Progress & Cold Restart action */}
      <div className="space-y-3 pt-2">
        {restarting ? (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-amber-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <RefreshCw className="size-3.5 animate-spin text-amber-400" />
                Flushing garbage collector heap...
              </span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800">
              <div
                className="bg-amber-500 h-1.5 rounded-full transition-all duration-200"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        ) : completed ? (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="size-4" />
            <span>
              Garbage Collector and Heap Cleared. Node status: Nominal.
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={triggerColdRestart}
            className="w-full flex items-center justify-center gap-2 rounded bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2.5 transition-all uppercase tracking-wider shadow-md shadow-red-500/10"
          >
            <RefreshCw className="size-3.5" />
            <span>Flush Garbage & Clear Heap Memory</span>
          </button>
        )}
      </div>
    </div>
  );
}
