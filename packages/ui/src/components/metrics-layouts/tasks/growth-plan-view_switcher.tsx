"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type GrowthPlanView =
  | "kanban"
  | "list"
  | "by-person"
  | "by-department"
  | "calendar"
  | "owner-rollup"
  | "meeting-recap";

type GrowthPlanViewSwitcherProps = {
  activeView: GrowthPlanView;
  onViewChange: (view: GrowthPlanView) => void;
  className?: string;
};

const views: { value: GrowthPlanView; label: string }[] = [
  { value: "kanban", label: "Kanban" },
  { value: "list", label: "List" },
  { value: "by-person", label: "By Person" },
  { value: "by-department", label: "By Department" },
  { value: "calendar", label: "Calendar" },
  { value: "owner-rollup", label: "Owner Rollup" },
  { value: "meeting-recap", label: "Meeting Recap" },
];

export function GrowthPlanViewSwitcher({
  activeView,
  onViewChange,
  className,
}: GrowthPlanViewSwitcherProps) {
  return (
    <Tabs
      value={activeView}
      onValueChange={(value) => onViewChange(value as GrowthPlanView)}
      className={cn("w-full", className)}
    >
      <div className="overflow-x-auto pb-2">
        <TabsList className="inline-flex h-9 w-fit items-center justify-start gap-0.5 rounded-lg bg-muted p-1">
          {views.map((view) => (
            <TabsTrigger
              key={view.value}
              value={view.value}
              className={cn(
                "h-7 min-w-20 justify-center rounded-md px-3 font-display text-sm font-semibold uppercase",
                "text-muted-foreground transition-colors",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "hover:bg-primary/10 hover:text-primary",
                "disabled:cursor-not-allowed disabled:opacity-35",
              )}
            >
              {view.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
