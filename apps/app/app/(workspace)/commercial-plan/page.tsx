"use client";

import { useWorkspace } from "@repo/ui/context";
import { CreditCard, PieChart, ShieldAlert } from "lucide-react";

export default function CommercialPlanPage() {
  const { hotel, engagement } = useWorkspace();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Commercial Plan
          </h2>
          <p className="text-sm text-muted-foreground">
            Revenue strategy and optimization guidelines for {hotel.name}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-2">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <CreditCard className="size-4" /> Pricing & Bundling
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Configure tiered corporate rates and seasonal packages. Dynamic
            rates are currently driven by active engagement code{" "}
            <code className="font-mono bg-muted/55 px-1 py-0.5 rounded text-[11px] border border-border/30">
              {engagement.code}
            </code>
            .
          </p>
        </div>

        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-2">
          <div className="flex items-center gap-2 text-violet-500 font-semibold text-sm">
            <PieChart className="size-4" /> Channel Distribution
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Monitor OTA commissions, GDS, and brand direct margins. Ensure
            parity across distribution nodes.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
        <ShieldAlert className="size-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-semibold text-amber-500">
            Unapproved Strategies Detected
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Two commercial modifications have been drafted but require executive
            validation before release to production networks.
          </p>
        </div>
      </div>
    </div>
  );
}
