"use client";

import { useWorkspace } from "@repo/ui/context";
import { ArrowRight, FileText } from "lucide-react";

export default function PlaybookPage() {
  const { workspace } = useWorkspace();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Playbook
          </h2>
          <p className="text-sm text-muted-foreground">
            Standard operating procedures and execution checklists for{" "}
            {workspace.name}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          {
            title: "Standard Brand Onboarding Setup",
            desc: "Configuration prerequisites, credential mapping protocols, and verification sequences.",
          },
          {
            title: "Dynamic Revenue Optimization Cycle",
            desc: "Automated trigger points, cohort segmentation checks, and commercial rate adjustments.",
          },
          {
            title: "Crisis Response and Outreach Protocol",
            desc: "Incident reporting pathways, emergency communication templates, and stakeholders alignments.",
          },
        ].map((sop, i) => (
          <div
            key={sop.title}
            className="rounded-xl border border-border/40 bg-muted/10 p-5 flex items-start gap-4 hover:border-primary/20 transition-all duration-300 group cursor-pointer"
          >
            <div className="rounded-lg bg-primary/10 text-primary p-2.5 shrink-0">
              <FileText className="size-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">
                  {sop.title}
                </h4>
                <span className="text-[10px] font-mono text-muted-foreground">
                  SOP-0{i + 1}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {sop.desc}
              </p>
              <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-primary group-hover:gap-1.5 transition-all">
                View Playbook Guidelines <ArrowRight className="size-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
