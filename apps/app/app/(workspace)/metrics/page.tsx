"use client";

import { useWorkspace } from "@repo/ui/context";
import {
  ArrowUpRight,
  BarChart3,
  Percent,
  RefreshCw,
  Target,
  TrendingUp,
} from "lucide-react";

export default function MetricsPage() {
  const { workspace, hotel, engagement } = useWorkspace();

  return (
    <div className="space-y-6">
      {/* Upper overview section */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Metrics Workspace
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time business performance metrics for {hotel.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-500 border border-emerald-500/20">
            <RefreshCw
              className="size-3 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            Synced
          </span>
        </div>
      </div>

      {/* Modern High-fidelity Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-3 relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 size-16 rounded-full bg-primary/5 blur-lg group-hover:bg-primary/10 transition-colors" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              ADR (Average Daily Rate)
            </span>
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <TrendingUp className="size-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold tracking-tight text-foreground">
              $245.50
            </div>
            <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              <ArrowUpRight className="size-3" /> +12.4%{" "}
              <span className="text-muted-foreground font-normal">
                vs last month
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-3 relative overflow-hidden group hover:border-violet-500/20 transition-all duration-300">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 size-16 rounded-full bg-violet-500/5 blur-lg group-hover:bg-violet-500/10 transition-colors" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              RevPAR (Revenue Per Room)
            </span>
            <div className="p-2 bg-violet-500/10 text-violet-500 rounded-lg">
              <BarChart3 className="size-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold tracking-tight text-foreground">
              $184.12
            </div>
            <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              <ArrowUpRight className="size-3" /> +8.2%{" "}
              <span className="text-muted-foreground font-normal">
                vs last month
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-3 relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 size-16 rounded-full bg-amber-500/5 blur-lg group-hover:bg-amber-500/10 transition-colors" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Occupancy Rate
            </span>
            <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
              <Percent className="size-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold tracking-tight text-foreground">
              75.0%
            </div>
            <p className="text-xs text-amber-500 font-medium flex items-center gap-1">
              <Target className="size-3" /> On Target{" "}
              <span className="text-muted-foreground font-normal">
                (Goal: 78%)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Scope diagnostics card */}
      <div className="rounded-xl border border-border/30 bg-muted/5 p-5 relative overflow-hidden">
        <h3 className="font-semibold text-sm text-foreground">
          Active Scope Information
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          These metrics are bound dynamically to the current workspace scope
          context.
        </p>
        <div className="grid gap-4 mt-4 grid-cols-2 md:grid-cols-3 text-xs">
          <div>
            <span className="text-muted-foreground block">Workspace</span>
            <span className="font-medium text-foreground">
              {workspace.name}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block">Property Code</span>
            <span className="font-mono font-medium text-foreground">
              {hotel.code}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground block">Engagement Code</span>
            <span className="font-mono font-medium text-foreground">
              {engagement.code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
