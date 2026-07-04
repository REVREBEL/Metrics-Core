"use client";

import { useWorkspace } from "@repo/ui/context";
import { Plus, Search, TableProperties } from "lucide-react";

export default function MetricsLibraryPage() {
  const { workspace } = useWorkspace();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Metrics Library
          </h2>
          <p className="text-sm text-muted-foreground">
            Central repository of calculated metric definitions for{" "}
            {workspace.name}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" /> Add Metric
        </button>
      </div>

      <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search metric formulas..."
              className="h-9 w-full pl-9 pr-3 text-xs bg-background hover:bg-muted/10 transition-colors rounded-md border border-border/40 text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="rounded-lg border border-border/30 bg-background overflow-hidden">
          <div className="grid grid-cols-3 gap-4 border-b border-border/30 bg-muted/30 p-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <div>Metric Name</div>
            <div>Formula</div>
            <div>Category</div>
          </div>
          <div className="divide-y divide-border/25">
            {[
              {
                name: "ADR",
                formula: "Total Rooms Revenue / Rooms Sold",
                cat: "Revenue",
              },
              {
                name: "RevPAR",
                formula: "Total Rooms Revenue / Total Available Rooms",
                cat: "Revenue",
              },
              {
                name: "Occupancy",
                formula: "Rooms Sold / Total Available Rooms",
                cat: "Inventory",
              },
            ].map((metric) => (
              <div
                key={metric.name}
                className="grid grid-cols-3 gap-4 p-3 text-xs text-foreground items-center hover:bg-muted/5"
              >
                <div className="font-semibold flex items-center gap-2">
                  <TableProperties className="size-3.5 text-primary" />{" "}
                  {metric.name}
                </div>
                <div className="font-mono text-muted-foreground text-[11px]">
                  {metric.formula}
                </div>
                <div>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
                    {metric.cat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
