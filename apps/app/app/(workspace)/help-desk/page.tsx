"use client";

import { useWorkspace } from "@repo/ui/context";
import { BookOpen, LifeBuoy, MessageCircle } from "lucide-react";

export default function HelpDeskPage() {
  const { workspace } = useWorkspace();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Help Desk
          </h2>
          <p className="text-sm text-muted-foreground">
            Customer support, technical assistance, and core references for{" "}
            {workspace.name}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-3 hover:border-primary/20 transition-all cursor-pointer group">
          <div className="p-2 bg-primary/10 text-primary rounded-lg w-fit">
            <BookOpen className="size-4" />
          </div>
          <h3 className="font-semibold text-sm text-foreground">
            Knowledge Base
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Read complete system guides, integration documentations, and dynamic
            custom setups instructions.
          </p>
        </div>

        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-3 hover:border-violet-500/20 transition-all cursor-pointer group">
          <div className="p-2 bg-violet-500/10 text-violet-500 rounded-lg w-fit">
            <MessageCircle className="size-4" />
          </div>
          <h3 className="font-semibold text-sm text-foreground">
            Support Chat
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Connect immediately with technical experts and specialists to debug
            platform-level pipelines.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border/30 bg-muted/5 p-4 flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <LifeBuoy
            className="size-4 text-primary animate-spin"
            style={{ animationDuration: "12s" }}
          />
          <span>
            System status optimal. Average response latency:{" "}
            <strong>8 minutes</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}
