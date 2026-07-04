"use client";

import { useWorkspace } from "@repo/ui/context";
import { SendHorizontal, Users } from "lucide-react";

export default function ThreadsPage() {
  const { workspace } = useWorkspace();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Threads
          </h2>
          <p className="text-sm text-muted-foreground">
            Collaborative team chats and system logs for {workspace.name}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-border/25 pb-3">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              #general-alignment
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground">
            4 members active
          </span>
        </div>

        <div className="space-y-4 min-h-[180px] flex flex-col justify-end">
          <div className="space-y-3">
            <div className="flex gap-2.5 items-start max-w-lg">
              <div className="rounded-full bg-primary/10 text-primary px-2 py-1 font-bold text-[10px] shrink-0">
                GS
              </div>
              <div className="rounded-lg bg-background border border-border/30 p-3">
                <p className="text-xs text-muted-foreground font-semibold">
                  Gary Stringham{" "}
                  <span className="font-normal text-[10px] ml-1">
                    2 hours ago
                  </span>
                </p>
                <p className="text-xs text-foreground mt-1 leading-relaxed">
                  Has the new pricing structure for occupancy growth been fully
                  configured in the Commercial Plan yet?
                </p>
              </div>
            </div>

            <div className="flex gap-2.5 items-start max-w-lg">
              <div className="rounded-full bg-violet-500/10 text-violet-500 px-1.5 py-1 font-bold text-[10px] shrink-0">
                SYS
              </div>
              <div className="rounded-lg bg-background border border-border/30 p-3">
                <p className="text-xs text-muted-foreground font-semibold">
                  System Agent{" "}
                  <span className="font-normal text-[10px] ml-1">
                    1 hour ago
                  </span>
                </p>
                <p className="text-xs text-foreground mt-1 leading-relaxed">
                  Yes Gary, the pricing modules are updated. Metrics sync is
                  optimal across all GHS-01 rooms categories.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-2">
          <input
            type="text"
            placeholder="Type a message to your team..."
            className="h-10 w-full pl-4 pr-10 text-xs bg-background hover:bg-muted/5 transition-colors rounded-lg border border-border/40 text-foreground outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <button
            type="button"
            className="absolute right-2 top-4 text-primary hover:text-primary/80 transition-colors"
          >
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
