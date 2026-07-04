"use client";

import {
  Activity,
  Cpu,
  Database,
  Globe,
  HardDrive,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

export default function MissionControlPage() {
  return (
    <div className="space-y-6">
      {/* Telemetry Header */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-blue-950/20 to-transparent p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">
            <Radio className="size-3 text-violet-400 animate-pulse" /> Network
            Status
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            All Core Nodes Operational
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Global synchronization status is in nominal range. Core database
            networks, SMS/Email dispatchers, and AI growth recommendation
            pipelines are running concurrently with zero exceptions detected in
            the past 24 hours.
          </p>
        </div>
      </div>

      {/* Global System Telemetry Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              System CPU Usage
            </span>
            <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg">
              <Cpu className="size-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight text-white">
              14.2%
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
              <div
                className="bg-violet-500 h-1.5 rounded-full"
                style={{ width: "14.2%" }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Nominal load (64 Cores)
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Memory Utilization
            </span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <HardDrive className="size-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight text-white">
              32.8 GB
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
              <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: "51.2%" }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              51.2% of 64.0 GB total
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              API Gateway Traffic
            </span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <Globe className="size-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight text-white">
              4,892 req/m
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
              <div
                className="bg-emerald-500 h-1.5 rounded-full animate-pulse"
                style={{ width: "68%" }}
              />
            </div>
            <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-1">
              <Activity className="size-3" /> Healthy Response Time: 12ms
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 relative overflow-hidden group hover:border-amber-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Database Node Sync
            </span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Database className="size-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight text-white">
              99.999%
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
              <div
                className="bg-amber-500 h-1.5 rounded-full"
                style={{ width: "99.999%" }}
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Replication latency: 42ms
            </p>
          </div>
        </div>
      </div>

      {/* Administration Actions & Live Telemetry Details */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Admin Control Cards */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Server className="size-4 text-violet-400" /> Infrastructure Node
            Controls
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all duration-200">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Network className="size-4 text-violet-400" /> API Gateway
                Firewall
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manage active threat mitigation policies, rate limits, IP
                blacklists, and SSL/TLS cipher configurations.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  className="rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold text-[10px] px-2.5 py-1.5 transition-colors uppercase tracking-wider"
                >
                  Configure Rules
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all duration-200">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Database className="size-4 text-blue-400" /> Partition Manager
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Optimize, index, or snapshot core metric tables. Manage
                automated horizontal partition migrations.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  className="rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[10px] px-2.5 py-1.5 transition-colors uppercase tracking-wider"
                >
                  Optimize Clusters
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all duration-200">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <Zap className="size-4 text-amber-400" /> Redis Cache Control
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Flush global page caches, pre-heat static metric assets, or
                adjust data retention time-to-live settings.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  className="rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[10px] px-2.5 py-1.5 transition-colors border border-slate-700 uppercase tracking-wider"
                >
                  Flush Cache
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 space-y-3 relative overflow-hidden group hover:border-slate-700 transition-all duration-200">
              <div className="flex items-center gap-2 text-white font-semibold text-sm">
                <ShieldCheck className="size-4 text-emerald-400" /> Security
                Auditing
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trigger on-demand vulnerability sweeps, audit access token
                distributions, and export compliance reports.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  className="rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[10px] px-2.5 py-1.5 transition-colors border border-slate-700 uppercase tracking-wider"
                >
                  Run Compliance Sweep
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* System Environment Metrics Panel */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Terminal className="size-4 text-violet-400" /> Active System Specs
          </h3>

          <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-5 space-y-4">
            <div className="text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Environment</span>
                <span className="font-mono text-emerald-400 font-bold">
                  PRODUCTION
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Node.js version</span>
                <span className="font-mono text-white">v20.12.2</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Next.js version</span>
                <span className="font-mono text-white">v16.2.9</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400">Active Shell Context</span>
                <span className="font-mono text-white">/usr/bin/zsh</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Compliance</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="size-3.5" /> SOC2 Type II
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
