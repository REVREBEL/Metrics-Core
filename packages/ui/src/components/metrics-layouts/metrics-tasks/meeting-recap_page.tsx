"use client";

import {
  IconAlertCircle,
  IconArrowRight,
  IconCalendar,
  IconCircleCheck,
  IconFileText,
  IconPlus,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui-core/card";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { initiativeStatuses, taskStatuses } from "../data/data";
import type { Initiative, Task } from "../data/schema";

type MeetingRecapViewProps = {
  initiatives: Initiative[];
  tasks: Task[];
  meetingDate?: string;
};

type RecapSection = {
  title: string;
  icon: React.ElementType;
  items: Array<{
    id: string;
    title: string;
    status: string;
    type: "initiative" | "task";
  }>;
  emptyMessage: string;
};

function RecapSectionCard({ section }: { section: RecapSection }) {
  const Icon = section.icon;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="size-4 text-muted-foreground" />
          <span className="font-display uppercase tracking-tight">
            {section.title}
          </span>
          <Badge variant="secondary" className="ml-auto">
            {section.items.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {section.items.length > 0 ? (
          <ul className="space-y-2">
            {section.items.map((item) => {
              const statusInfo =
                item.type === "initiative"
                  ? initiativeStatuses.find((s) => s.value === item.status)
                  : taskStatuses.find((s) => s.value === item.status);

              return (
                <li
                  key={item.id}
                  className="flex items-start gap-2 rounded-md border bg-card p-2.5 text-sm"
                >
                  {statusInfo?.icon && (
                    <statusInfo.icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="flex-1">{item.title}</span>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {statusInfo?.label || item.status}
                  </Badge>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">
            {section.emptyMessage}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function MeetingRecapView({
  initiatives,
  tasks,
  meetingDate,
}: MeetingRecapViewProps) {
  // ⚡ Bolt: Memoize formatted date to prevent re-calculation of Intl formatting on every render.
  const formattedDate = useMemo(() => {
    const recapDate = meetingDate ? new Date(meetingDate) : new Date();
    return recapDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [meetingDate]);

  // ⚡ Bolt: Single pass O(N + M) grouping and filtering inside useMemo.
  // This also hoists new Date() and date string comparisons, and keeps stable dependencies
  // to ensure that the useMemo cache actually hits (previously invalidated by fresh Date object references).
  const sections = useMemo((): RecapSection[] => {
    const recapDate = meetingDate ? new Date(meetingDate) : new Date();
    const recapDateStr = recapDate.toISOString().split("T")[0];

    const oneWeekAgo = new Date(recapDate);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const newInitiatives: Initiative[] = [];
    const reviewedInitiatives: Initiative[] = [];

    // Single-pass loop for initiatives
    for (const i of initiatives) {
      const created = new Date(i.createdAt);
      if (created >= oneWeekAgo && created <= recapDate) {
        newInitiatives.push(i);
      } else {
        const updated = new Date(i.updatedAt);
        if (created < oneWeekAgo && updated >= oneWeekAgo && updated <= recapDate) {
          reviewedInitiatives.push(i);
        }
      }
    }

    const completedTasks: Task[] = [];
    const overdueTasks: Task[] = [];
    const newAssignments: Task[] = [];

    // Single-pass loop for tasks
    for (const t of tasks) {
      const created = new Date(t.createdAt);
      if (created >= oneWeekAgo && created <= recapDate) {
        newAssignments.push(t);
      }

      if (t.status === "complete" && t.completedAt) {
        const completed = new Date(t.completedAt);
        if (completed >= oneWeekAgo && completed <= recapDate) {
          completedTasks.push(t);
        }
      } else if (t.status !== "canceled" && t.dueDate) {
        if (t.dueDate.split("T")[0] < recapDateStr) {
          overdueTasks.push(t);
        }
      }
    }

    return [
      {
        title: "New Initiatives",
        icon: IconPlus,
        items: newInitiatives.map((i) => ({
          id: i.id,
          title: i.title,
          status: i.status,
          type: "initiative" as const,
        })),
        emptyMessage: "No new initiatives created this period",
      },
      {
        title: "Initiatives Reviewed",
        icon: IconFileText,
        items: reviewedInitiatives.map((i) => ({
          id: i.id,
          title: i.title,
          status: i.status,
          type: "initiative" as const,
        })),
        emptyMessage: "No initiatives reviewed this period",
      },
      {
        title: "Completed Tasks",
        icon: IconCircleCheck,
        items: completedTasks.map((t) => ({
          id: t.id,
          title: t.title,
          status: t.status,
          type: "task" as const,
        })),
        emptyMessage: "No tasks completed this period",
      },
      {
        title: "Overdue Tasks",
        icon: IconAlertCircle,
        items: overdueTasks.map((t) => ({
          id: t.id,
          title: t.title,
          status: t.status,
          type: "task" as const,
        })),
        emptyMessage: "No overdue tasks",
      },
      {
        title: "New Assignments",
        icon: IconArrowRight,
        items: newAssignments.map((t) => ({
          id: t.id,
          title: t.title,
          status: t.status,
          type: "task" as const,
        })),
        emptyMessage: "No new assignments this period",
      },
    ];
  }, [initiatives, tasks, meetingDate]);

  // Summary stats
  const stats = useMemo(() => {
    let activeInitiatives = 0;
    let atRiskInitiatives = 0;
    for (const i of initiatives) {
      const status = i.status;
      if (status === "active" || status === "planning") {
        activeInitiatives++;
      } else if (status === "at_risk" || status === "blocked") {
        atRiskInitiatives++;
      }
    }

    let openTasks = 0;
    let blockedTasks = 0;
    for (const t of tasks) {
      const status = t.status;
      if (status !== "complete" && status !== "canceled") {
        openTasks++;
      }
      if (status === "blocked") {
        blockedTasks++;
      }
    }

    return { activeInitiatives, atRiskInitiatives, openTasks, blockedTasks };
  }, [initiatives, tasks]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <IconCalendar size={20} stroke={1.5} className="text-primary" />
            <div>
              <CardTitle className="font-display text-lg uppercase tracking-tight">
                Meeting Recap
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {formattedDate}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">
                {stats.activeInitiatives}
              </span>
              <span className="text-xs text-muted-foreground">
                Active Initiatives
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-orange-500">
                {stats.atRiskInitiatives}
              </span>
              <span className="text-xs text-muted-foreground">
                At Risk / Blocked
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">{stats.openTasks}</span>
              <span className="text-xs text-muted-foreground">Open Tasks</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-red-500">
                {stats.blockedTasks}
              </span>
              <span className="text-xs text-muted-foreground">
                Blocked Tasks
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recap Sections */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <RecapSectionCard key={section.title} section={section} />
        ))}
      </div>
    </div>
  );
}
