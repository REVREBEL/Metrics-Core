"use client";

import { IconLayoutSidebarLeftExpandFilled } from "@tabler/icons-react";
import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarView } from "./components/calendar-view";
import { ByDepartmentView, ByPersonView } from "./components/group-views";
import {
  GrowthPlanHeader,
  type GrowthPlanMode,
  type HeaderTab,
  type HeaderViewMode,
} from "./components/growth-plan-header";
import { GrowthPlanSidebar } from "./components/growth-plan-sidebar";
import { EmptyState } from "./components/growth-plan-states";
import {
  type GrowthPlanView,
  GrowthPlanViewSwitcher,
} from "./components/growth-plan-view-switcher";
import { KanbanView } from "./components/kanban-view";
import { MeetingRecapView } from "./components/meeting-recap-view";
import { OwnerRollupView } from "./components/owner-rollup-view";
import { TasksDialogs } from "./components/tasks-dialogs";
import { TasksProvider } from "./components/tasks-provider";
import { TasksTable } from "./components/tasks-table";
import { WorkstreamsSection } from "./components/workstreams-section";
import type { Initiative, Task } from "./data/schema";
import { initiatives, tasks } from "./data/tasks";

export default function GrowthPlanPage() {
  const [activeView, setActiveView] = useState<GrowthPlanView>("kanban");
  const [mode, setMode] = useState<GrowthPlanMode>("tasks");
  const [selectedInitiative, setSelectedInitiative] =
    useState<Initiative | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<HeaderTab>("overview");
  const [headerViewMode, setHeaderViewMode] = useState<HeaderViewMode>("board");
  const [addInitiativeOpen, setAddInitiativeOpen] = useState(false);
  const [newInitiative, setNewInitiative] = useState({
    title: "",
    objective: "",
    priority: "medium",
    strategyType: "demand_generation",
  });

  const handleCreateInitiative = () => {
    setAddInitiativeOpen(true);
  };

  const handleCreateTask = () => {};

  const handleInitiativeClick = (initiative: Initiative) => {
    setSelectedInitiative(initiative);
  };

  const handleTaskClick = (_task: Task) => {};

  const handleTabChange = (tab: HeaderTab) => {
    setActiveTab(tab);
    // Map tabs to appropriate views
    if (tab === "overview") {
      setMode("initiatives");
      setActiveView("kanban");
    } else if (tab === "tasks") {
      setMode("tasks");
      setActiveView("kanban");
    } else if (tab === "notes") {
      // Notes view - could show meeting recap for now
      setActiveView("meeting-recap");
    } else if (tab === "questions") {
      // Questions view - show meeting recap for now
      setActiveView("meeting-recap");
    }
  };

  const handleViewModeChange = (viewMode: HeaderViewMode) => {
    setHeaderViewMode(viewMode);
    // Map header view modes to GrowthPlanView
    if (viewMode === "board") {
      setActiveView("kanban");
    } else if (viewMode === "schedule") {
      setActiveView("calendar");
    } else if (viewMode === "list") {
      setActiveView("list");
    }
  };

  const handleInitiativeSubmit = () => {
    // In a real app, this would create the initiative
    setNewInitiative({
      title: "",
      objective: "",
      priority: "medium",
      strategyType: "demand_generation",
    });
    setAddInitiativeOpen(false);
  };

  const renderView = () => {
    const hasInitiatives = initiatives.length > 0;
    const hasTasks = tasks.length > 0;

    switch (activeView) {
      case "kanban":
        if (mode === "initiatives" && !hasInitiatives) {
          return (
            <EmptyState
              view={activeView}
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          );
        }
        if (mode === "tasks" && !hasTasks) {
          return (
            <EmptyState
              view={activeView}
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          );
        }
        return (
          <KanbanView
            initiatives={initiatives}
            tasks={tasks}
            mode={mode}
            onInitiativeClick={handleInitiativeClick}
            onTaskClick={handleTaskClick}
          />
        );

      case "list":
        return <TasksTable data={tasks} />;

      case "by-person":
        if (!hasTasks) {
          return (
            <EmptyState
              view={activeView}
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          );
        }
        return <ByPersonView tasks={tasks} onTaskClick={handleTaskClick} />;

      case "by-department":
        if (!hasTasks) {
          return (
            <EmptyState
              view={activeView}
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          );
        }
        return <ByDepartmentView tasks={tasks} onTaskClick={handleTaskClick} />;

      case "calendar":
        return <CalendarView tasks={tasks} onTaskClick={handleTaskClick} />;

      case "owner-rollup":
        if (!hasInitiatives) {
          return (
            <EmptyState
              view={activeView}
              mode={mode}
              onCreateInitiative={handleCreateInitiative}
              onCreateTask={handleCreateTask}
            />
          );
        }
        return <OwnerRollupView initiatives={initiatives} />;

      case "meeting-recap":
        return <MeetingRecapView initiatives={initiatives} tasks={tasks} />;

      default:
        return null;
    }
  };

  return (
    <TasksProvider>
      <Header fixed>
        <div className="min-w-0">
          <p
            className="text-sm font-semibold leading-none uppercase"
            style={{ letterSpacing: "0.025em" }}
          >
            Growth Plan
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Revenue Action Plan
          </p>
        </div>
        <div className="ms-auto flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            <IconLayoutSidebarLeftExpandFilled
              className="size-5"
              strokeWidth={1.5}
            />
          </Button>
          <ThemeSwitch />
        </div>
      </Header>

      <div className="flex flex-1 overflow-hidden pt-[var(--header-height)]">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-[280px] flex-shrink-0 hidden lg:block">
            <GrowthPlanSidebar
              initiatives={initiatives}
              selectedInitiative={selectedInitiative}
              onInitiativeSelect={setSelectedInitiative}
              onAddInitiative={handleCreateInitiative}
            />
          </aside>
        )}

        {/* Main Content */}
        <Main className="flex flex-1 flex-col gap-4 overflow-auto">
          {/* Header with progress and team */}
          <GrowthPlanHeader
            mode={mode}
            onModeChange={setMode}
            onCreateInitiative={handleCreateInitiative}
            onCreateTask={handleCreateTask}
            initiatives={initiatives}
            selectedInitiative={selectedInitiative}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            activeViewMode={headerViewMode}
            onViewModeChange={handleViewModeChange}
          />

          {/* Workstreams */}
          <WorkstreamsSection
            initiativeId={selectedInitiative?.id}
            className="px-1"
          />

          {/* View Switcher */}
          <GrowthPlanViewSwitcher
            activeView={activeView}
            onViewChange={setActiveView}
          />

          {/* View Content */}
          <div className="flex-1 min-h-0">{renderView()}</div>
        </Main>
      </div>

      <TasksDialogs />

      {/* Add Initiative Dialog */}
      <Dialog open={addInitiativeOpen} onOpenChange={setAddInitiativeOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Create New Initiative</DialogTitle>
            <DialogDescription>
              Add a new initiative to your growth plan. Fill in the details
              below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="init-title">Title</Label>
              <Input
                id="init-title"
                placeholder="Enter initiative title"
                value={newInitiative.title}
                onChange={(e) =>
                  setNewInitiative((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="init-objective">Objective</Label>
              <Textarea
                id="init-objective"
                placeholder="Describe the objective of this initiative"
                value={newInitiative.objective}
                onChange={(e) =>
                  setNewInitiative((prev) => ({
                    ...prev,
                    objective: e.target.value,
                  }))
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  value={newInitiative.priority}
                  onValueChange={(value) =>
                    setNewInitiative((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Strategy Type</Label>
                <Select
                  value={newInitiative.strategyType}
                  onValueChange={(value) =>
                    setNewInitiative((prev) => ({
                      ...prev,
                      strategyType: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="demand_generation">
                      Demand Generation
                    </SelectItem>
                    <SelectItem value="product_revenue">
                      Product Revenue
                    </SelectItem>
                    <SelectItem value="retention_expansion">
                      Retention &amp; Expansion
                    </SelectItem>
                    <SelectItem value="operational_efficiency">
                      Operational Efficiency
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddInitiativeOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleInitiativeSubmit}
              disabled={!newInitiative.title}
            >
              Create Initiative
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TasksProvider>
  );
}
