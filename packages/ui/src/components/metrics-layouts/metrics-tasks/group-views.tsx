"use client";

import {
  IconAlertCircle,
  IconBuilding,
  IconChevronDown,
  IconCircleCheck,
  IconClock,
  IconUser,
} from "@tabler/icons-react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui-core/card";
import { useMemo } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { assigneeTypes, departments, taskStatuses } from "../data/data";
import type { Task } from "../data/schema";

// Format date without locale-specific formatting to avoid hydration mismatch
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}

type ByPersonViewProps = {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
};

type ByDepartmentViewProps = {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
};

type PersonGroup = {
  name: string;
  type: string;
  department?: string;
  email?: string;
  tasks: Task[];
  /** Pre-calculated for sorting performance */
  openTasksCount: number;
};

type DepartmentGroup = {
  name: string;
  label: string;
  tasks: Task[];
  /** Pre-calculated for sorting performance */
  openTasksCount: number;
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TaskMiniCard({ task, onClick }: { task: Task; onClick?: () => void }) {
  const statusInfo = taskStatuses.find((s) => s.value === task.status);
  const StatusIcon = statusInfo?.icon;

  const statusColor = {
    not_started: "text-slate-500",
    in_progress: "text-blue-500",
    waiting: "text-yellow-500",
    blocked: "text-red-500",
    complete: "text-green-500",
    canceled: "text-gray-400",
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: complex card layout requires div with role="button"
    <div
      role="button"
      tabIndex={0}
      className="flex items-start gap-3 rounded-md border bg-card p-3 transition-colors hover:bg-muted/50 cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {StatusIcon && (
        <StatusIcon
          className={cn("mt-0.5 size-4 shrink-0", statusColor[task.status])}
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-tight truncate">
          {task.title}
        </p>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          {task.dueDate && (
            <span className="flex items-center gap-1">
              <IconClock size={20} stroke={1.5} strokeWidth={1.5} />
              {formatDate(task.dueDate)}
            </span>
          )}
          <Badge variant="outline" className="text-xs h-5 px-1.5">
            {task.priority}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function PersonCard({
  person,
  onTaskClick,
}: {
  person: PersonGroup;
  onTaskClick?: (task: Task) => void;
}) {
  // ⚡ Bolt: Calculate stats in a single pass O(N) loop and memoize results. Hoist `new Date()`.
  const cardStats = useMemo(() => {
    const now = new Date();
    let completedCount = 0;
    let overdueCount = 0;
    const openTasksList: Task[] = [];

    for (const t of person.tasks) {
      if (t.status === "complete") {
        completedCount++;
      } else if (t.status !== "canceled") {
        openTasksList.push(t);
        if (t.dueDate) {
          const taskDueDate = new Date(t.dueDate);
          if (taskDueDate < now) {
            overdueCount++;
          }
        }
      }
    }

    return {
      completedCount,
      overdueCount,
      openTasks: openTasksList,
    };
  }, [person.tasks]);

  const completionRate =
    person.tasks.length > 0
      ? Math.round((cardStats.completedCount / person.tasks.length) * 100)
      : 0;

  const typeLabel =
    assigneeTypes.find((t) => t.value === person.type)?.label || person.type;

  return (
    <Collapsible defaultOpen={cardStats.openTasks.length > 0}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                  {getInitials(person.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base font-semibold truncate">
                    {person.name}
                  </CardTitle>
                  {person.type !== "app_user" && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {typeLabel}
                    </Badge>
                  )}
                </div>
                {person.department && (
                  <p className="text-sm text-muted-foreground truncate">
                    {departments.find((d) => d.value === person.department)
                      ?.label || person.department}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <IconCircleCheck
                      size={20}
                      stroke={1.5}
                      className="text-green-500"
                      strokeWidth={1.5}
                    />
                    <span className="font-medium">
                      {cardStats.completedCount}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <IconClock size={20} stroke={1.5} strokeWidth={1.5} />
                    <span>{cardStats.openTasks.length}</span>
                  </span>
                  {cardStats.overdueCount > 0 && (
                    <span className="flex items-center gap-1 text-red-500">
                      <IconAlertCircle
                        size={20}
                        stroke={1.5}
                        strokeWidth={1.5}
                      />
                      <span className="font-medium">
                        {cardStats.overdueCount}
                      </span>
                    </span>
                  )}
                </div>
                <IconChevronDown
                  size={20}
                  stroke={1.5}
                  className="text-muted-foreground transition-transform [[data-state=closed]_&]:-rotate-90"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <Progress value={completionRate} className="h-1.5 mt-3" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-2">
              {person.tasks.map((task) => (
                <TaskMiniCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick?.(task)}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function DepartmentCard({
  department,
  onTaskClick,
}: {
  department: DepartmentGroup;
  onTaskClick?: (task: Task) => void;
}) {
  // ⚡ Bolt: Calculate stats in a single pass O(N) loop and memoize results. Removed unused _overdueTasks.
  const cardStats = useMemo(() => {
    let completedCount = 0;
    let blockedCount = 0;
    const openTasksList: Task[] = [];

    for (const t of department.tasks) {
      if (t.status === "complete") {
        completedCount++;
      } else if (t.status !== "canceled") {
        openTasksList.push(t);
        if (t.status === "blocked") {
          blockedCount++;
        }
      }
    }

    return {
      completedCount,
      blockedCount,
      openTasks: openTasksList,
    };
  }, [department.tasks]);

  const completionRate =
    department.tasks.length > 0
      ? Math.round((cardStats.completedCount / department.tasks.length) * 100)
      : 0;

  return (
    <Collapsible defaultOpen={cardStats.openTasks.length > 0}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <IconBuilding
                  size={20}
                  stroke={1.5}
                  className="text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base font-semibold">
                  {department.label}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {department.tasks.length} tasks
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <IconCircleCheck
                      size={20}
                      stroke={1.5}
                      className="text-green-500"
                      strokeWidth={1.5}
                    />
                    <span className="font-medium">
                      {cardStats.completedCount}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <IconClock size={20} stroke={1.5} strokeWidth={1.5} />
                    <span>{cardStats.openTasks.length}</span>
                  </span>
                  {cardStats.blockedCount > 0 && (
                    <span className="flex items-center gap-1 text-red-500">
                      <IconAlertCircle
                        size={20}
                        stroke={1.5}
                        strokeWidth={1.5}
                      />
                      <span className="font-medium">
                        {cardStats.blockedCount}
                      </span>
                    </span>
                  )}
                </div>
                <IconChevronDown
                  size={20}
                  stroke={1.5}
                  className="text-muted-foreground transition-transform [[data-state=closed]_&]:-rotate-90"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <Progress value={completionRate} className="h-1.5 mt-3" />
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="flex flex-col gap-2">
              {department.tasks.map((task) => (
                <TaskMiniCard
                  key={task.id}
                  task={task}
                  onClick={() => onTaskClick?.(task)}
                />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

export function ByPersonView({ tasks, onTaskClick }: ByPersonViewProps) {
  const personGroups = useMemo(() => {
    const groups: Record<string, PersonGroup> = {};

    // Single pass to group and pre-calculate open tasks count
    // This avoids O(N log N * M) complexity during sorting
    for (const task of tasks) {
      const key = task.assignedTo || "Unassigned";
      if (!groups[key]) {
        groups[key] = {
          name: key,
          type: task.assignedTo
            ? task.assigneeType || "department_placeholder"
            : "app_user",
          department: task.assignedTo ? task.assignedDepartment : undefined,
          tasks: [],
          openTasksCount: 0,
        };
      }
      groups[key].tasks.push(task);
      if (task.status !== "complete" && task.status !== "canceled") {
        groups[key].openTasksCount++;
      }
    }

    return Object.values(groups).sort(
      (a, b) => b.openTasksCount - a.openTasksCount,
    );
  }, [tasks]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <IconUser size={20} stroke={1.5} strokeWidth={1.5} />
        <span>{personGroups.length} assignees</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {personGroups.map((person) => (
          <PersonCard
            key={person.name}
            person={person}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  );
}

export function ByDepartmentView({
  tasks,
  onTaskClick,
}: ByDepartmentViewProps) {
  const departmentGroups = useMemo(() => {
    const groups: Record<string, DepartmentGroup> = {};

    // Single pass to group and pre-calculate open tasks count
    // This avoids O(N log N * M) complexity during sorting
    for (const task of tasks) {
      const key = task.assignedDepartment || "unassigned";
      if (!groups[key]) {
        const deptInfo = departments.find((d) => d.value === key);
        groups[key] = {
          name: key,
          label: deptInfo?.label || (key === "unassigned" ? "Unassigned" : key),
          tasks: [],
          openTasksCount: 0,
        };
      }
      groups[key].tasks.push(task);
      if (task.status !== "complete" && task.status !== "canceled") {
        groups[key].openTasksCount++;
      }
    }

    return Object.values(groups).sort(
      (a, b) => b.openTasksCount - a.openTasksCount,
    );
  }, [tasks]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <IconBuilding size={20} stroke={1.5} strokeWidth={1.5} />
        <span>{departmentGroups.length} departments</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {departmentGroups.map((department) => (
          <DepartmentCard
            key={department.name}
            department={department}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </div>
  );
}
