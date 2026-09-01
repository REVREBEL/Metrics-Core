"use client";

import { useWorkspace } from "@repo/ui/context";
import { BookOpen, MessageCircle } from "lucide-react";
import Link from "next/link";

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
        <Link
          href="/docs"
          className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-3 hover:border-primary/20 transition-all group"
        >
          <div className="p-2 bg-primary/10 text-primary rounded-lg w-fit">
            <BookOpen className="size-4" />
          </div>
          <h3 className="font-semibold text-sm text-foreground">
            Documentation
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Browse guides, integration documentation, and reference material.
          </p>
        </Link>

        <div className="rounded-xl border border-border/40 bg-muted/10 p-5 space-y-3 opacity-50">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-violet-500/10 text-violet-500 rounded-lg w-fit">
              <MessageCircle className="size-4" />
            </div>
            <div className="text-xs font-medium text-violet-500 bg-violet-500/10 border border-violet-500/20 rounded-full px-2 py-0.5">
              Coming soon
            </div>
          </div>
          <h3 className="font-semibold text-sm text-foreground">
            Support Chat
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Direct chat with our technical team will be available in a future
            update.
          </p>
        </div>
      </div>
    </div>
  );
}
