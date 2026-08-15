"use client";

import {
  IconAlertTriangle,
  IconCircleCheck,
  IconClock,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui-core/card";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Initiative } from "../data/schema";

type OwnerRollupViewProps = {
  initiatives: Initiative[];
};

type RollupStatus = "on_track" | "watch" | "at_risk" | "complete";

function getOwnerStatus(initiative: Initiative): RollupStatus {
  if (initiative.status === "complete") return "complete";
  if (initiative.status === "blocked" || initiative.status === "at_risk")
    return "at_risk";
  if (initiative.status === "planning" || initiative.status === "discussed")
    return "watch";
  return "on_track";
}

const STATUS_CONFIG: Record<
  RollupStatus,
  { label: string; className: string }
> = {
  on_track: {
    label: "On Track",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  watch: {
    label: "Watch",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  },
  at_risk: {
    label: "At Risk",
    className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
  complete: {
    label: "Complete",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
};

function StatusBadge({ status }: { status: RollupStatus }) {
  const { label, className } = STATUS_CONFIG[status];

  return (
    <Badge className={cn("text-xs font-medium", className)}>{label}</Badge>
  );
}

const ROLLUP_PRIORITY_MAP: Record<RollupStatus, number> = {
  at_risk: 0,
  watch: 1,
  on_track: 2,
  complete: 3,
};

export function OwnerRollupView({ initiatives }: OwnerRollupViewProps) {
  // ⚡ Bolt: Single pass O(N) filtering, mapping and stats gathering combined in a single useMemo hook.
  const { rollupData, stats } = useMemo(() => {
    const data: { initiative: Initiative; ownerStatus: RollupStatus }[] = [];
    let onTrack = 0;
    let watch = 0;
    let atRisk = 0;
    let complete = 0;

    for (const initiative of initiatives) {
      if (
        initiative.status === "canceled" ||
        initiative.status === "archived"
      ) {
        continue;
      }
      const ownerStatus = getOwnerStatus(initiative);
      data.push({ initiative, ownerStatus });

      if (ownerStatus === "on_track") {
        onTrack++;
      } else if (ownerStatus === "watch") {
        watch++;
      } else if (ownerStatus === "at_risk") {
        atRisk++;
      } else if (ownerStatus === "complete") {
        complete++;
      }
    }

    data.sort(
      (a, b) =>
        ROLLUP_PRIORITY_MAP[a.ownerStatus] - ROLLUP_PRIORITY_MAP[b.ownerStatus],
    );

    return {
      rollupData: data,
      stats: { total: data.length, onTrack, watch, atRisk, complete },
    };
  }, [initiatives]);

  return (
    <div className="flex flex-col gap-6">
      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              On Track
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <IconCircleCheck stroke={1.5} className="text-green-500" />
              <span className="text-2xl font-bold">{stats.onTrack}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Watch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <IconClock className="size-5 text-yellow-500" />
              <span className="text-2xl font-bold">{stats.watch}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              At Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <IconAlertTriangle className="size-5 text-red-500" />
              <span className="text-2xl font-bold">{stats.atRisk}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <IconCircleCheck className="size-5 text-blue-500" />
              <span className="text-2xl font-bold">{stats.complete}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rollup Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-lg uppercase tracking-tight">
            Owner Rollup Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Initiative</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[200px]">Completed</TableHead>
                  <TableHead className="min-w-[200px]">Open / Next</TableHead>
                  <TableHead className="min-w-[200px]">Risk</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rollupData.length > 0 ? (
                  rollupData.map(({ initiative, ownerStatus }) => (
                    <TableRow key={initiative.id}>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">
                            {initiative.title}
                          </span>
                          {initiative.objective && (
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {initiative.objective}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={ownerStatus} />
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {initiative.ownerFacingSummary || "-"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {initiative.nextSteps || "-"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {initiative.risksBlockers ? (
                          <span className="text-sm text-orange-600 dark:text-orange-400">
                            {initiative.risksBlockers}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No owner action needed
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No initiatives to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
