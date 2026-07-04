"use client";

import { useWorkspace } from "@repo/ui/context";
import { LineChart, Milestone, Sparkles } from "lucide-react";

export default function GrowthPlanPage() {
  const { hotel } = useWorkspace();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Growth Plan
          </h2>
          <p className="text-sm text-muted-foreground">
            Market expansion and marketing optimization framework for{" "}
            {hotel.name}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-2">
          <div className="flex items-center gap-2 text-violet-500 font-semibold text-sm">
            <Sparkles className="size-4" /> AI Marketing Engine
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Generate and deploy highly personalized, platform-specific ad copy
            across Meta, Google, and LinkedIn channels.
          </p>
        </div>

        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-2">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Milestone className="size-4" /> Strategic Milestones
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Track customer acquisition costs (CAC) and lifetime value (LTV)
            cohorts systematically to reach occupancy targets.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border/30 bg-muted/5 p-5 flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-foreground">
            Quarterly Performance Projections
          </h4>
          <p className="text-xs text-muted-foreground">
            Model optimization loops using synthetic Monte Carlo simulations.
          </p>
        </div>
        <div className="p-2 bg-primary/10 text-primary rounded-lg">
          <LineChart className="size-4" />
        </div>
      </div>
    </div>
  );
}
