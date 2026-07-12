"use client";

import { Button } from "@buttons/button";
import {
  IconAlertTriangle,
  IconDotsVertical,
  IconEye,
  IconGripVertical,
  IconLink,
  IconListCheck,
  IconMessage,
  IconPlus,
} from "@tabler/icons-react";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { initiativeStatuses, strategyTypes, taskStatuses } from "../data/data";
import type { Initiative, Task } from "../data/schema";
import { useTasks } from "./tasks-provider";

type KanbanViewProps = {
  initiatives: Initiative[];
  tasks: Task[];
  mode: "initiatives" | "tasks";
  onInitiativeClick?: (initiative: Initiative) => void;
  onTaskClick?: (task: Task) => void;
};

// Status dot colors mapping
const statusDotColors: Record<string, string> = {
  discussed: "bg-red-500",
  planning: "bg-blue-500",
  active: "bg-emerald-500",
  blocked: "bg-orange-500",
  complete: "bg-emerald-600",
  not_started: "bg-red-500",
  in_progress: "bg-blue-500",
  waiting: "bg-orange-500",
  completed: "bg-emerald-500",
  canceled: "bg-slate-400",
  at_risk: "bg-orange-500",
  archived: "bg-slate-400",
};

// Category badge colors - matching the reference design
const categoryColors: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  demand_generation: {
    bg: "bg-teal-100 dark:bg-teal-900/40",
    text: "text-teal-700 dark:text-teal-300",
    label: "Demand Gen",
  },
  product_revenue: {
    bg: "bg-orange-100 dark:bg-orange-900/40",
    text: "text-orange-700 dark:text-orange-300",
    label: "Product Revenue",
  },
  retention_expansion: {
    bg: "bg-purple-100 dark:bg-purple-900/40",
    text: "text-purple-700 dark:text-purple-300",
    label: "Retention",
  },
  operational_efficiency: {
    bg: "bg-blue-100 dark:bg-blue-900/40",
    text: "text-blue-700 dark:text-blue-300",
    label: "Operations",
  },
  marketing: {
    bg: "bg-yellow-100 dark:bg-yellow-900/40",
    text: "text-yellow-800 dark:text-yellow-300",
    label: "Marketing",
  },
  sales: {
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    text: "text-emerald-700 dark:text-emerald-300",
    label: "Sales",
  },
  product: {
    bg: "bg-purple-100 dark:bg-purple-900/40",
    text: "text-purple-700 dark:text-purple-300",
    label: "Product",
  },
  operations: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    label: "Operations",
  },
  finance: {
    bg: "bg-blue-100 dark:bg-blue-900/40",
    text: "text-blue-700 dark:text-blue-300",
    label: "Finance",
  },
  customer_success: {
    bg: "bg-teal-100 dark:bg-teal-900/40",
    text: "text-teal-700 dark:text-teal-300",
    label: "Customer Success",
  },
  // Department mappings
  revenue_management: {
    bg: "bg-blue-100 dark:bg-blue-900/40",
    text: "text-blue-700 dark:text-blue-300",
    label: "Revenue",
  },
  digital_agency: {
    bg: "bg-purple-100 dark:bg-purple-900/40",
    text: "text-purple-700 dark:text-purple-300",
    label: "Agency",
  },
  front_office: {
    bg: "bg-orange-100 dark:bg-orange-900/40",
    text: "text-orange-700 dark:text-orange-300",
    label: "Front Office",
  },
  // Strategy type mappings
  promotion: {
    bg: "bg-teal-100 dark:bg-teal-900/40",
    text: "text-teal-700 dark:text-teal-300",
    label: "Promotion",
  },
  rate_strategy: {
    bg: "bg-blue-100 dark:bg-blue-900/40",
    text: "text-blue-700 dark:text-blue-300",
    label: "Rate Strategy",
  },
  content_update: {
    bg: "bg-yellow-100 dark:bg-yellow-900/40",
    text: "text-yellow-800 dark:text-yellow-300",
    label: "Content",
  },
  sales_push: {
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    text: "text-emerald-700 dark:text-emerald-300",
    label: "Sales",
  },
  campaign: {
    bg: "bg-orange-100 dark:bg-orange-900/40",
    text: "text-orange-700 dark:text-orange-300",
    label: "Campaign",
  },
};

export function KanbanView({
  initiatives,
  tasks,
  mode,
  onInitiativeClick,
  onTaskClick,
}: KanbanViewProps) {
  const statuses = mode === "initiatives" ? initiativeStatuses : taskStatuses;

  const columns = useMemo(() => {
    const itemsByStatus: Record<string, (Initiative | Task)[]> = {};
    const items = mode === "initiatives" ? initiatives : tasks;

    // Single pass grouping to avoid O(S * T) complexity
    // where S is number of statuses and T is total items
    for (const item of items) {
      if (!itemsByStatus[item.status]) {
        itemsByStatus[item.status] = [];
      }
      itemsByStatus[item.status].push(item);
    }

    return statuses.map((status) => ({
      ...status,
      items: itemsByStatus[status.value] || [],
    }));
  }, [initiatives, tasks, mode, statuses]);

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 p-1 min-w-max pb-4">
        {columns.map((column) => {
          const items = column.items || [];

          return (
            <div key={column.value} className="w-[320px] flex-shrink-0">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "size-2.5 rounded-full",
                      statusDotColors[column.value] || "bg-slate-400",
                    )}
                  />
                  <span className="font-semibold text-foreground">
                    {column.label}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-7">
                      <IconDotsVertical size={20} stroke={1.5} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit Column</DropdownMenuItem>
                    <DropdownMenuItem>
                      Add {mode === "initiatives" ? "Initiative" : "Task"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      Delete Column
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Add New Button */}
              <Button
                variant="outline"
                className="w-full mb-3 border-dashed border-border/60 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/50"
              >
                <IconPlus size={20} stroke={1.5} className="mr-2" />
                Add New {mode === "initiatives" ? "Initiative" : "Task"}
              </Button>

              {/* Cards */}
              <div className="space-y-3">
                {items.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border/50 bg-muted/30 p-8 text-center">
                    <div className="mx-auto size-10 rounded-full bg-muted flex items-center justify-center mb-3">
                      <IconPlus
                        size={20}
                        stroke={1.5}
                        className="text-muted-foreground"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No {mode === "initiatives" ? "initiatives" : "tasks"} yet
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      Add one to get started
                    </p>
                  </div>
                ) : mode === "initiatives" ? (
                  (items as Initiative[]).map((item) => (
                    <InitiativeCard
                      key={item.id}
                      initiative={item}
                      onClick={() => onInitiativeClick?.(item)}
                    />
                  ))
                ) : (
                  (items as Task[]).map((item) => (
                    <TaskCard
                      key={item.id}
                      task={item}
                      onClick={() => onTaskClick?.(item)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function InitiativeCard({
  initiative,
  onClick,
}: {
  initiative: Initiative;
  onClick?: () => void;
}) {
  const strategyType = strategyTypes.find(
    (s) => s.value === initiative.strategyType,
  );
  const colors = categoryColors[initiative.strategyType] || {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    label: "Uncategorized",
  };

  // Calculate progress
  const cardTasks = initiative.tasks || [];
  const totalTasks = cardTasks.length;
  const completedTasks = cardTasks.filter((t) => t.status === "done").length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    // biome-ignore lint/a11y/useSemanticElements: complex card layout requires div with role="button"
    <div
      role="button"
      tabIndex={0}
      className="group bg-card rounded-xl border border-border/60 p-4 hover:border-border transition-all cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Drag Handle + Menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconGripVertical
            size={20}
            stroke={1.5}
            className="text-muted-foreground cursor-grab"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 -mt-1 -mr-1"
              onClick={(e) => e.stopPropagation()}
            >
              <IconDotsVertical size={20} stroke={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Badge */}
      <Badge
        variant="secondary"
        className={cn("mb-3 font-medium border-0", colors.bg, colors.text)}
      >
        {strategyType?.label || colors.label}
      </Badge>

      {initiative.objective ? (
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {initiative.objective}
        </p>
      ) : null}

      {/* Task Progress */}
      {totalTasks > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <IconListCheck
            size={20}
            stroke={1.5}
            className="text-muted-foreground"
          />
          <span
            className={cn(
              "text-sm font-medium px-2 py-0.5 rounded",
              progress === 100
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                : progress > 50
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
            )}
          >
            {completedTasks}/{totalTasks}
          </span>
        </div>
      )}

      {/* Risk Indicator */}
      {(initiative.hasRisk || initiative.risksBlockers) && (
        <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 mb-3">
          <IconAlertTriangle size={20} stroke={1.5} />
          <span className="text-xs font-medium line-clamp-1">
            {initiative.risksBlockers || "At Risk"}
          </span>
        </div>
      )}

      {/* Footer: Avatars + Metrics */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        {/* Avatar Stack */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {initiative.leadDepartment && (
              <Avatar className="size-7 border-2 border-card">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${initiative.leadDepartment}`}
                />
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">
                  {initiative.leadDepartment.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            {totalTasks > 0 && (
              <Avatar className="size-7 border-2 border-card">
                <AvatarFallback className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium">
                  +{Math.min(totalTasks, 3)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs">
            <IconEye size={20} stroke={1.5} />
            {(initiative.id.charCodeAt(initiative.id.length - 1) % 10) + 1}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <IconMessage size={20} stroke={1.5} />
            {initiative.id.charCodeAt(initiative.id.length - 1) % 5}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <IconLink size={20} stroke={1.5} />
            {initiative.id.charCodeAt(initiative.id.length - 1) % 3}
          </span>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, onClick }: { task: Task; onClick?: () => void }) {
  const { setOpen, setCurrentRow } = useTasks();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentRow(task);
    setOpen("update");
  };

  // Get category from department
  const categoryKey = task.assignedDepartment || "operations";
  const colors = categoryColors[categoryKey] || {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    label: "General",
  };

  const checklistItems = task.checklist ?? [];
  const checklistTotal = checklistItems.length;
  const checklistCompleted = checklistItems.filter(
    (item) => item.completed,
  ).length;
  const isChecklistComplete =
    checklistTotal > 0 && checklistCompleted === checklistTotal;

  return (
    // biome-ignore lint/a11y/useSemanticElements: complex card layout requires div with role="button"
    <div
      role="button"
      tabIndex={0}
      className="group bg-card rounded-xl border border-border/60 p-4 hover:border-border transition-all cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Drag Handle + Menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconGripVertical
            size={20}
            stroke={1.5}
            className="text-muted-foreground cursor-grab"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 -mt-1 -mr-1"
              onClick={(e) => e.stopPropagation()}
            >
              <IconDotsVertical size={20} stroke={1.5} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Category Badge */}
      <Badge
        variant="secondary"
        className={cn("mb-3 font-medium border-0", colors.bg, colors.text)}
      >
        {colors.label}
      </Badge>

      {/* Title */}
      <h4 className="font-semibold text-foreground mb-2 line-clamp-2 leading-snug">
        {task.title}
      </h4>

      {/* Description */}
      {task.notes && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {task.notes}
        </p>
      )}

      {checklistTotal > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <IconListCheck
            size={20}
            stroke={1.5}
            className="text-muted-foreground"
          />
          <span
            className={cn(
              "text-sm font-medium px-2 py-0.5 rounded",
              isChecklistComplete
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
            )}
          >
            {checklistCompleted}/{checklistTotal}
          </span>
        </div>
      )}

      {/* Blocker Note */}
      {task.blockerNotes && (
        <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 mb-3">
          <IconAlertTriangle size={20} stroke={1.5} />
          <span className="text-xs font-medium line-clamp-1">
            {task.blockerNotes}
          </span>
        </div>
      )}

      {/* Footer: Avatars + Metrics */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        {/* Avatar Stack */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            {task.assignedTo && (
              <Avatar className="size-7 border-2 border-card">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`}
                />
                <AvatarFallback className="text-[10px] bg-primary/10 text-primary font-medium">
                  {task.assignedTo
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
            {task.priority === "critical" || task.priority === "high" ? (
              <Avatar className="size-7 border-2 border-card">
                <AvatarFallback className="text-[10px] bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 font-medium">
                  +2
                </AvatarFallback>
              </Avatar>
            ) : null}
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="flex items-center gap-1 text-xs">
            <IconEye size={20} stroke={1.5} />
            {(task.id.charCodeAt(task.id.length - 1) % 10) + 1}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <IconMessage size={20} stroke={1.5} />
            {task.id.charCodeAt(task.id.length - 1) % 5}
          </span>
          <span className="flex items-center gap-1 text-xs">
            <IconLink size={20} stroke={1.5} />
            {task.id.charCodeAt(task.id.length - 1) % 3}
          </span>
        </div>
      </div>
    </div>
  );
}
