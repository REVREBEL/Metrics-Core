"use client";

import {
  IconCalendar,
  IconLayoutKanban,
  IconPlus,
  IconTable,
} from "@tabler/icons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@buttons/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@forms/fields/input";
import { Label } from "@ui-core/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Initiative } from "../data/schema";

export type GrowthPlanMode = "initiatives" | "tasks";
export type HeaderTab = "overview" | "tasks" | "notes" | "questions";
export type HeaderViewMode = "board" | "schedule" | "list";

type GrowthPlanHeaderProps = {
  mode: GrowthPlanMode;
  onModeChange: (mode: GrowthPlanMode) => void;
  onCreateInitiative?: () => void;
  onCreateTask?: () => void;
  initiatives?: Initiative[];
  selectedInitiative?: Initiative | null;
  activeTab?: HeaderTab;
  onTabChange?: (tab: HeaderTab) => void;
  activeViewMode?: HeaderViewMode;
  onViewModeChange?: (viewMode: HeaderViewMode) => void;
  onAddMember?: () => void;
};

// Mock team avatars
const teamAvatars = [
  { name: "Sarah Chen", seed: "sarah" },
  { name: "Marcus Johnson", seed: "marcus" },
  { name: "Emily Rodriguez", seed: "emily" },
  { name: "David Kim", seed: "david" },
];

export function GrowthPlanHeader({
  mode: _mode,
  onModeChange,
  onCreateInitiative: _onCreateInitiative,
  onCreateTask: _onCreateTask,
  initiatives = [],
  selectedInitiative,
  activeTab = "overview",
  onTabChange,
  activeViewMode = "board",
  onViewModeChange,
  onAddMember,
}: GrowthPlanHeaderProps) {
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");

  // Calculate overall progress
  const totalTasks = initiatives.reduce(
    (acc, i) => acc + (i.tasks?.length || 0),
    0,
  );
  const completedTasks = initiatives.reduce(
    (acc, i) => acc + (i.tasks?.filter((t) => t.status === "done").length || 0),
    0,
  );
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleTabClick = (tab: HeaderTab) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    // Also map to mode for backward compatibility
    if (tab === "overview") {
      onModeChange("initiatives");
    } else if (tab === "tasks") {
      onModeChange("tasks");
    }
  };

  const handleViewModeClick = (viewMode: HeaderViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(viewMode);
    }
  };

  const handleAddMember = () => {
    if (onAddMember) {
      onAddMember();
    } else {
      setAddMemberOpen(true);
    }
  };

  const handleMemberSubmit = () => {
    // In a real app, this would add the member
    setMemberEmail("");
    setAddMemberOpen(false);
  };

  return (
    <>
      <div
        className="border border-border bg-card"
        style={{ borderRadius: "3px", padding: "16px 16px 21px 16px" }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Title and Progress */}
          <div className="flex items-center gap-4">
            {/* Logo Icon */}
            <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10">
              <span className="text-primary font-bold text-xl">P</span>
            </div>

            <div className="flex-1">
              <h1
                className="font-bold text-lg text-foreground"
                style={{ textTransform: "uppercase", letterSpacing: "0.074em" }}
              >
                {selectedInitiative?.title || "Growth Plan"}
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <Progress value={progress} className="w-32 h-2" />
                <span className="text-sm text-muted-foreground">
                  {progress}% complete
                </span>
              </div>
            </div>
          </div>

          {/* Right: Team Avatars + Actions */}
          <div className="flex items-center gap-4">
            {/* Team Avatar Stack */}
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {teamAvatars.map((member) => (
                  <Avatar
                    key={member.seed}
                    className="size-9 border-2 border-card"
                  >
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}`}
                    />
                    <AvatarFallback className="text-xs">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
                <Avatar className="size-9 border-2 border-card">
                  <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-medium">
                    +3
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Add Member Button */}
            <Button
              variant="default"
              size="sm"
              className="gap-1.5"
              onClick={handleAddMember}
            >
              <IconPlus size={20} stroke={1.5} strokeWidth={1.5} />
              Add Member
            </Button>
          </div>
        </div>

        {/* Tabs Row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-muted-foreground hover:text-foreground",
                activeTab === "overview" &&
                  "text-foreground font-medium border-b-2 border-primary rounded-none",
              )}
              onClick={() => handleTabClick("overview")}
            >
              Overview
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-muted-foreground hover:text-foreground",
                activeTab === "tasks" &&
                  "text-foreground font-medium border-b-2 border-primary rounded-none",
              )}
              onClick={() => handleTabClick("tasks")}
            >
              Tasks
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-muted-foreground hover:text-foreground",
                activeTab === "notes" &&
                  "text-foreground font-medium border-b-2 border-primary rounded-none",
              )}
              onClick={() => handleTabClick("notes")}
            >
              Notes
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "text-muted-foreground hover:text-foreground",
                activeTab === "questions" &&
                  "text-foreground font-medium border-b-2 border-primary rounded-none",
              )}
              onClick={() => handleTabClick("questions")}
            >
              Questions
            </Button>
          </div>

          {/* View Mode Toggles */}
          <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 gap-1.5",
                activeViewMode === "board" && "bg-background",
              )}
              onClick={() => handleViewModeClick("board")}
            >
              <IconLayoutKanban size={20} stroke={1.5} strokeWidth={1.5} />
              Board
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 gap-1.5",
                activeViewMode === "schedule" && "bg-background",
              )}
              onClick={() => handleViewModeClick("schedule")}
            >
              <IconCalendar size={20} stroke={1.5} strokeWidth={1.5} />
              Schedule
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 gap-1.5",
                activeViewMode === "list" && "bg-background",
              )}
              onClick={() => handleViewModeClick("list")}
            >
              <IconTable size={20} stroke={1.5} strokeWidth={1.5} />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>
              Invite a new member to collaborate on this growth plan.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMemberOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMemberSubmit} disabled={!memberEmail}>
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
