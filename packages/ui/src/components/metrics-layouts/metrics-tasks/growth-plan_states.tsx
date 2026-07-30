"use client";

import { Button } from "@buttons/button";
import {
  IconAlertCircle,
  IconBuilding,
  IconCalendar,
  IconFileText,
  IconLayoutGrid,
  IconList,
  IconLoader2,
  IconPlus,
  IconPresentation,
  IconUser,
} from "@tabler/icons-react";
import type { GrowthPlanView } from "./growth-plan-view-switcher";

type EmptyStateProps = {
  view: GrowthPlanView;
  mode: "initiatives" | "tasks";
  onCreateInitiative?: () => void;
  onCreateTask?: () => void;
};

type LoadingStateProps = {
  message?: string;
};

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

const viewConfig: Record<
  GrowthPlanView,
  { icon: React.ElementType; title: string; description: string }
> = {
  kanban: {
    icon: IconLayoutGrid,
    title: "No items to display",
    description:
      "Create your first initiative or task to see them organized by status.",
  },
  list: {
    icon: IconList,
    title: "No items found",
    description: "Create initiatives and tasks to see them in a sortable list.",
  },
  "by-person": {
    icon: IconUser,
    title: "No assignments yet",
    description: "Assign tasks to team members to see work grouped by person.",
  },
  "by-department": {
    icon: IconBuilding,
    title: "No department work",
    description: "Assign tasks to departments to see work grouped by team.",
  },
  calendar: {
    icon: IconCalendar,
    title: "No upcoming deadlines",
    description: "Add due dates to tasks to see them on the calendar.",
  },
  "owner-rollup": {
    icon: IconPresentation,
    title: "No initiatives to report",
    description:
      "Create initiatives to generate owner-ready progress summaries.",
  },
  "meeting-recap": {
    icon: IconFileText,
    title: "No meeting activity",
    description:
      "Activity from the past week will appear here for meeting review.",
  },
};

export function EmptyState({
  view,
  mode: _mode,
  onCreateInitiative,
  onCreateTask,
}: EmptyStateProps) {
  const config = viewConfig[view];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <Icon className="size-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-tight">
        {config.title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {config.description}
      </p>
      <div className="mt-6 flex gap-3">
        <Button variant="outline" onClick={onCreateInitiative}>
          <IconPlus size={20} stroke={1.5} className="mr-1.5" />
          New Initiative
        </Button>
        <Button onClick={onCreateTask}>
          <IconPlus size={20} stroke={1.5} className="mr-1.5" />
          New Task
        </Button>
      </div>
    </div>
  );
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <IconLoader2
        size={32}
        stroke={1.5}
        className="animate-spin text-muted-foreground"
      />
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10">
        <IconAlertCircle size={32} stroke={1.5} className="text-destructive" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-tight">
        Error
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-6" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}
