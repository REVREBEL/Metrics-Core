"use client";

import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Cpu,
  Network,
  RefreshCw,
  Server,
  Square,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface AppContainer {
  id: string;
  name: string;
  type: string;
  status: "running" | "restarting" | "stopped" | "degraded";
  cpu: number;
  memory: string;
  uptime: string;
  port: number;
  version: string;
}

export default function AppManagementPage() {
  const [containers, setContainers] = useState<AppContainer[]>([
    {
      id: "api-gw",
      name: "API Gateway Node",
      type: "network",
      status: "running",
      cpu: 4.8,
      memory: "1.2 GB",
      uptime: "14d 6h 32m",
      port: 8080,
      version: "v2.4.1",
    },
    {
      id: "metric-processor",
      name: "Metrics Engine",
      type: "compute",
      status: "running",
      cpu: 18.4,
      memory: "8.4 GB",
      uptime: "14d 6h 32m",
      port: 9000,
      version: "v4.1.0-alpha",
    },
    {
      id: "telemetry-queue",
      name: "Telemetry Pipeline",
      type: "queue",
      status: "running",
      cpu: 1.2,
      memory: "256 MB",
      uptime: "29d 12h 11m",
      port: 6379,
      version: "v6.2.6",
    },
    {
      id: "report-scheduler",
      name: "Broadcast Dispatcher",
      type: "cron",
      status: "running",
      cpu: 0.5,
      memory: "512 MB",
      uptime: "4d 2h 15m",
      port: 3001,
      version: "v1.8.2",
    },
  ]);

  const [globalLogs, setGlobalLogs] = useState<{ id: string; text: string }[]>([
    { id: "1", text: "[14:32:01] [api-gw] GET /metrics - 200 OK - 14ms" },
    {
      id: "2",
      text: "[14:32:05] [metric-processor] Compiled 4,120 properties metrics segment",
    },
    {
      id: "3",
      text: "[14:32:10] [report-scheduler] Standard report dispatch thread sleeping",
    },
    {
      id: "4",
      text: "[14:32:15] [telemetry-queue] Flushed 89 buffer nodes to BigQuery catalog",
    },
  ]);

  const restartContainer = (id: string) => {
    // Set to restarting
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "restarting", cpu: 0 } : c,
      ),
    );

    const containerName = containers.find((c) => c.id === id)?.name || id;

    // Log restart trigger
    setGlobalLogs((prev) => [
      {
        id: Math.random().toString(),
        text: `[${new Date().toLocaleTimeString()}] [system] Initiating graceful rollover for ${containerName}...`,
      },
      ...prev.slice(0, 8),
    ]);

    // Transition back to running after 2.5s
    setTimeout(() => {
      setContainers((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "running",
                cpu: parseFloat((Math.random() * 15 + 2).toFixed(1)),
                uptime: "0d 0h 0m",
              }
            : c,
        ),
      );
      setGlobalLogs((prev) => [
        {
          id: Math.random().toString(),
          text: `[${new Date().toLocaleTimeString()}] [system] ${containerName} restarted successfully. Cluster status: NOMINAL`,
        },
        ...prev.slice(0, 8),
      ]);
    }, 2500);
  };

  const getStatusBadge = (status: AppContainer["status"]) => {
    switch (status) {
      case "running":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="size-3" /> RUNNING
          </span>
        );
      case "restarting":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            <RefreshCw className="size-3 animate-spin" /> RESTARATING
          </span>
        );
      case "stopped":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <Square className="size-3" /> STOPPED
          </span>
        );
      case "degraded":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertTriangle className="size-3" /> DEGRADED
          </span>
        );
    }
  };

  const getContainerIcon = (type: string) => {
    switch (type) {
      case "network":
        return <Network className="size-5 text-violet-400" />;
      case "compute":
        return <Cpu className="size-5 text-blue-400" />;
      case "queue":
        return <Zap className="size-5 text-amber-400" />;
      default:
        return <Server className="size-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-blue-950/20 to-transparent p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">
            <Cpu className="size-3" /> Container Deployment
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            Core App & Cluster Microservices
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Monitor, orchestrate, and restart decoupled nodes powering the
            Metrics system. Restarts trigger zero-downtime rolling upgrades by
            Spinning up a side-channel process.
          </p>
        </div>
      </div>

      {/* Grid of Microservices */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Server className="size-4 text-violet-400" /> Active Service Nodes
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {containers.map((c) => (
              <div
                key={c.id}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4 relative overflow-hidden hover:border-slate-700/80 transition-all duration-300"
              >
                {/* Upper line */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800/80 border border-slate-700 rounded-lg shrink-0">
                      {getContainerIcon(c.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-none">
                        {c.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-1 leading-none">
                        {c.id} | port {c.port} | {c.version}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(c.status)}
                </div>

                {/* Resource Sliders */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">CPU Load</span>
                    <span className="font-mono text-white font-semibold">
                      {c.cpu}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className="bg-violet-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(c.cpu * 3, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] pt-1">
                    <span className="text-slate-400">Memory Allocation</span>
                    <span className="font-mono text-slate-300">{c.memory}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/40">
                    <span>Uptime</span>
                    <span>{c.uptime}</span>
                  </div>
                </div>

                {/* Restart Controls */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => restartContainer(c.id)}
                    disabled={c.status === "restarting"}
                    className="w-full flex items-center justify-center gap-1.5 rounded bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold text-[10px] py-2 border border-slate-700 hover:border-slate-650 transition-all duration-250 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw
                      className={`size-3.5 ${
                        c.status === "restarting" ? "animate-spin" : ""
                      }`}
                    />
                    <span>
                      {c.status === "restarting"
                        ? "Gracefully Restarting..."
                        : "Restart Service Container"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live System Logging Stream */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Activity className="size-4 text-emerald-400" /> Infrastructure
          Activity Ledger
        </h3>

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs space-y-2 max-h-60 overflow-y-auto shadow-inner shadow-black">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 pb-2 border-b border-slate-900">
            <span className="text-emerald-500">● LIVE</span>
            <span>SYSTEM LOGSTREAM — node-us-east-01</span>
          </div>
          <div className="space-y-1.5 pt-1 text-slate-400">
            {globalLogs.map((log) => {
              let colorClass = "text-slate-400";
              if (log.text.includes("[system]")) {
                colorClass = log.text.includes("successfully")
                  ? "text-emerald-400 font-semibold"
                  : "text-amber-400 font-semibold";
              }
              return (
                <div key={log.id} className={`leading-relaxed ${colorClass}`}>
                  {log.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
