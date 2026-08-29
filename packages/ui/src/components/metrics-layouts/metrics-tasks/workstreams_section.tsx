"use client";

import { IconClock } from "@tabler/icons-react";
import { Building2, ChevronDown, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { ExternalAssignee, Workstream } from "../data/schema";
import { useTasks } from "./tasks-provider";

const entityTypeLabels: Record<string, string> = {
  internal_department: "Internal Dept",
  third_party_agency: "Agency",
  ownership: "Ownership",
  vendor: "Vendor",
  brand_corporate: "Brand / Corp",
  management_company: "Mgmt Co",
  hotel_team: "Hotel Team",
  other: "Other",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  not_started: {
    label: "Not Started",
    className:
      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  },
  in_progress: {
    label: "In Progress",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  },
  waiting: {
    label: "Waiting",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  },
  blocked: {
    label: "Blocked",
    className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },
  complete: {
    label: "Complete",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

function VendorBadge({ assignee }: { assignee: ExternalAssignee }) {
  const typeLabel = assignee.entityType
    ? entityTypeLabels[assignee.entityType]
    : null;
  return (
    <div className="flex items-center gap-1.5">
      <ExternalLink size={13} className="text-primary shrink-0" />
      <span className="text-sm font-medium text-foreground truncate">
        {assignee.name}
      </span>
      {typeLabel && (
        <Badge
          variant="outline"
          className="text-xs h-5 px-1.5 shrink-0 border-primary/30 text-primary"
        >
          {typeLabel}
        </Badge>
      )}
    </div>
  );
}

function WorkstreamRow({
  workstream,
  vendor,
}: {
  workstream: Workstream;
  vendor?: ExternalAssignee | null;
}) {
  // ⚡ Bolt: Vendor lookup passed down directly from parent O(1) Map to avoid O(N * M) .find() array traversals.
  const entityTypeLabel =
    entityTypeLabels[workstream.responsibleEntityType] ??
    workstream.responsibleEntityType;
  const status = statusConfig[workstream.status] ?? {
    label: workstream.status,
    className: "",
  };

  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card px-4 py-3 hover:bg-muted/40 transition-colors">
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 shrink-0 mt-0.5">
        <Building2 size={16} className="text-primary" />
      </div>

      <div className="flex-1 min-w-0 grid gap-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-sm text-foreground truncate">
            {workstream.responsibleEntityName}
          </span>
          <Badge variant="outline" className="text-xs h-5 px-1.5 shrink-0">
            {entityTypeLabel}
          </Badge>
          <Badge
            className={cn(
              "text-xs h-5 px-1.5 font-medium border-0 shrink-0",
              status.className,
            )}
          >
            {status.label}
          </Badge>
        </div>

        {workstream.responsibilitySummary && (
          <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
            {workstream.responsibilitySummary}
          </p>
        )}

        {vendor ? (
          <VendorBadge assignee={vendor} />
        ) : workstream.ownerName ? (
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Owner:</span>
            <span className="text-xs font-medium">{workstream.ownerName}</span>
          </div>
        ) : null}
      </div>

      {workstream.dueDate && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-1">
          <IconClock size={13} stroke={1.5} />
          <span>{formatDate(workstream.dueDate)}</span>
        </div>
      )}
    </div>
  );
}

type WorkstreamsSectionProps = {
  initiativeId?: string | null;
  className?: string;
};

export function WorkstreamsSection({
  initiativeId,
  className,
}: WorkstreamsSectionProps) {
  const { workstreams, externalAssignees } = useTasks();
  const [open, setOpen] = useState(true);

  // ⚡ Bolt: Combined filtering, external count calculation, and vendor Map creation into a single pass O(N) useMemo block.
  // Replaces multiple .filter() array traversals and per-row O(M) .find() calls with O(1) Map lookups.
  const { filtered, externalCount, externalAssigneesMap } = useMemo(() => {
    const assigneesMap = new Map<string, ExternalAssignee>();
    for (const a of externalAssignees) {
      assigneesMap.set(a.id, a);
    }

    const filteredList: Workstream[] = [];
    let extCount = 0;

    for (const ws of workstreams) {
      if (!initiativeId || ws.initiativeId === initiativeId) {
        filteredList.push(ws);
        if (ws.ownerExternalAssigneeId) {
          extCount++;
        }
      }
    }

    return {
      filtered: filteredList,
      externalCount: extCount,
      externalAssigneesMap: assigneesMap,
    };
  }, [workstreams, initiativeId, externalAssignees]);

  if (filtered.length === 0) return null;

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={className}>
      <div className="flex items-center justify-between mb-2">
        <CollapsibleTrigger className="flex items-center gap-2 group">
          <span className="text-sm font-semibold text-foreground">
            Workstreams
          </span>
          <Badge variant="secondary" className="text-xs h-5 px-1.5">
            {filtered.length}
          </Badge>
          {externalCount > 0 && (
            <Badge
              variant="outline"
              className="text-xs h-5 px-1.5 border-primary/30 text-primary gap-1"
            >
              <ExternalLink size={10} />
              {externalCount} vendor{externalCount !== 1 ? "s" : ""}
            </Badge>
          )}
          <ChevronDown
            size={15}
            className={cn(
              "text-muted-foreground transition-transform",
              !open && "-rotate-90",
            )}
          />
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent>
        <div className="flex flex-col gap-2">
          {filtered.map((ws) => (
            <WorkstreamRow
              key={ws.id}
              workstream={ws}
              vendor={
                ws.ownerExternalAssigneeId
                  ? externalAssigneesMap.get(ws.ownerExternalAssigneeId)
                  : null
              }
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
