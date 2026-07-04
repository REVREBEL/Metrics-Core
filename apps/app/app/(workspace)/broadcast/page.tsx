"use client";

import { useWorkspace } from "@repo/ui/context";
import { Mail, MessageSquare, Send } from "lucide-react";

export default function BroadcastPage() {
  const { hotel } = useWorkspace();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Broadcast
          </h2>
          <p className="text-sm text-muted-foreground">
            Multi-channel campaign deployment and communication dispatch for{" "}
            {hotel.name}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-2">
          <div className="flex items-center gap-2 text-violet-500 font-semibold text-sm">
            <Mail className="size-4" /> Email Campaigns
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Dispatch newsletters, promotional offers, and loyalty program
            updates directly to curated visitor databases.
          </p>
        </div>

        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-2">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <MessageSquare className="size-4" /> SMS & WhatsApp Alerts
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Coordinate high-urgency notifications, booking confirmations, and
            concierge messaging channels.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border/30 bg-muted/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
            <Send className="size-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-xs font-semibold text-foreground">
              Campaign Dispatch Ready
            </h4>
            <p className="text-xs text-muted-foreground">
              No active dispatches running currently. All gateways optimal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
