"use client";

import {
  IconChevronDown,
  IconDeviceDesktop,
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconStack2,
  IconTrendingUp,
  IconWorld,
} from "@tabler/icons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import type { Initiative } from "../data/schema";

type GrowthPlanSidebarProps = {
  initiatives: Initiative[];
  selectedInitiative?: Initiative | null;
  onInitiativeSelect: (initiative: Initiative) => void;
  teamMembers?: TeamMember[];
  onAddInitiative?: () => void;
};

type TeamMember = {
  name: string;
  role: string;
  online: boolean;
  lastActive: string;
};

// Mock team members with static last active times
const defaultTeamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Product Lead",
    online: true,
    lastActive: "08:23:26",
  },
  {
    name: "Marcus Johnson",
    role: "Engineering",
    online: true,
    lastActive: "08:23:26",
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing",
    online: false,
    lastActive: "2h ago",
  },
  { name: "David Kim", role: "Sales", online: true, lastActive: "08:23:26" },
  {
    name: "Lisa Thompson",
    role: "Customer Success",
    online: false,
    lastActive: "1d ago",
  },
];

// Initiative icons based on strategy type
const strategyIcons: Record<string, React.ReactNode> = {
  demand_generation: <IconWorld size={20} stroke={1.5} />,
  product_revenue: <IconStack2 size={20} stroke={1.5} />,
  retention_expansion: <IconTrendingUp size={20} stroke={1.5} />,
  operational_efficiency: <IconDeviceDesktop size={20} stroke={1.5} />,
};

export function GrowthPlanSidebar({
  initiatives,
  selectedInitiative,
  onInitiativeSelect,
  teamMembers = defaultTeamMembers,
  onAddInitiative,
}: GrowthPlanSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [teamExpanded, setTeamExpanded] = useState(true);

  const filteredInitiatives = initiatives.filter((i) =>
    i.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate overall progress
  const totalTasks = initiatives.reduce(
    (acc, i) => acc + (i.tasks?.length || 0),
    0,
  );
  const completedTasks = initiatives.reduce(
    (acc, i) => acc + (i.tasks?.filter((t) => t.status === "done").length || 0),
    0,
  );
  const _overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col h-full border-r border-border bg-card/50">
      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <IconSearch
            size={20}
            stroke={1.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search"
            className="pl-9 bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          {/* Initiatives Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Initiatives
            </h3>
            <div className="space-y-1">
              {filteredInitiatives.map((initiative) => {
                const isSelected = selectedInitiative?.id === initiative.id;
                const icon = strategyIcons[initiative.strategyType] || (
                  <IconStack2 size={16} stroke={1.5} />
                );

                return (
                  <button
                    type="button"
                    key={initiative.id}
                    tabIndex={0}
                    onClick={() => onInitiativeSelect(initiative)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onInitiativeSelect(initiative);
                      }
                    }}
                    className={cn(
                      "group w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center size-8 rounded-lg",
                        isSelected ? "bg-primary-foreground/20" : "bg-muted",
                      )}
                    >
                      {icon}
                    </div>
                    <span className="flex-1 text-sm font-medium truncate">
                      {initiative.title}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "size-6 opacity-0 group-hover:opacity-100",
                            isSelected ? "hover:bg-primary-foreground/20" : "",
                          )}
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
                  </button>
                );
              })}
            </div>

            {/* Add Initiative Button */}
            <Button
              variant="outline"
              className="w-full mt-3 border-dashed justify-start"
              onClick={onAddInitiative}
            >
              <IconPlus size={20} stroke={1.5} className="mr-2" />
              Add Initiative
            </Button>
          </div>

          {/* Team Members Section */}
          <Collapsible open={teamExpanded} onOpenChange={setTeamExpanded}>
            <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Team members
              </h3>
              <IconChevronDown
                size={20}
                stroke={1.5}
                className={cn(
                  "text-muted-foreground transition-transform",
                  teamExpanded ? "" : "-rotate-90",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-1">
                {teamMembers.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="size-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                        />
                        <AvatarFallback className="text-xs">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {member.online && (
                        <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        {member.online ? (
                          <>
                            <span className="text-emerald-500">Online</span>
                            <span>-</span>
                            <span>{member.lastActive}</span>
                          </>
                        ) : (
                          <span>{member.lastActive}</span>
                        )}
                      </p>
                    </div>
                    <IconChevronDown
                      size={20}
                      stroke={1.5}
                      className="text-muted-foreground"
                    />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>

      {/* Time Tracking Section */}
      <div className="p-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Time</h3>
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Total Hours
          </p>
          <p className="text-2xl font-bold text-foreground">23.7 hours</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
            <IconTrendingUp size={20} stroke={1.5} />
            2.5% from last week
          </p>
        </div>
      </div>
    </div>
  );
}
