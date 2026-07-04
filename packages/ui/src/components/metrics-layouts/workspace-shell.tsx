"use client";

import { Button } from "@buttons/button";
import { Input } from "@inputs/input";
import { Avatar, AvatarFallback } from "@ui-core/avatar";
import { Logo } from "@ui-core/logo";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@ui-core/resizable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-core/select";
import {
  Activity,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  Compass,
  Database,
  FileText,
  HelpCircle,
  Layers,
  Megaphone,
  PanelRight,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { useMemo, useState } from "react";
import { useWorkspace } from "@/context/workspace-provider";
import { cn } from "@/lib/utils";

// Mock options matching fixture schemas
const WORKSPACE_OPTIONS = [
  { id: "ws-rebel-01", name: "RevRebel Workspace", slug: "revrebel-workspace" },
  {
    id: "ws-enterprise-01",
    name: "Enterprise Core Workspace",
    slug: "enterprise-core",
  },
  {
    id: "ws-sandbox-01",
    name: "Client Sandbox Workspace",
    slug: "client-sandbox",
  },
];

const HOTEL_OPTIONS = [
  { id: "hotel-01", name: "Grand Hotel", slug: "grand-hotel", code: "GHS-01" },
  {
    id: "hotel-02",
    name: "Boutique Resort & Spa",
    slug: "boutique-resort",
    code: "BRS-02",
  },
  {
    id: "hotel-03",
    name: "Coastal Lodge & Cabins",
    slug: "coastal-lodge",
    code: "CLC-03",
  },
];

const ENGAGEMENT_OPTIONS = [
  { id: "eng-metrics-01", name: "Metrics Implementation", code: "REV-METRICS" },
  { id: "eng-revops-01", name: "Q3 RevOps Alignment", code: "REV-OPS" },
  {
    id: "eng-audit-01",
    name: "Technical Infrastructure Audit",
    code: "REV-AUDIT",
  },
];

const SIDEBAR_NAV_ITEMS = [
  {
    id: "metrics",
    name: "Metrics",
    path: "/metrics",
    icon: <TrendingUp className="size-4" />,
  },
  {
    id: "commercial-plan",
    name: "Commercial Plan",
    path: "/commercial-plan",
    icon: <Briefcase className="size-4" />,
  },
  {
    id: "growth-plan",
    name: "Growth Plan",
    path: "/growth-plan",
    icon: <Compass className="size-4" />,
  },
  {
    id: "broadcast",
    name: "Broadcast",
    path: "/broadcast",
    icon: <Megaphone className="size-4" />,
  },
  {
    id: "metrics-library",
    name: "Metrics Library",
    path: "/metrics-library",
    icon: <Database className="size-4" />,
  },
  {
    id: "playbook",
    name: "Playbook",
    path: "/playbook",
    icon: <FileText className="size-4" />,
  },
  {
    id: "threads",
    name: "Threads",
    path: "/threads",
    icon: <Users className="size-4" />,
  },
  {
    id: "help-desk",
    name: "Help Desk",
    path: "/help-desk",
    icon: <HelpCircle className="size-4" />,
  },
];

const GLOBAL_NAV_TABS = ["Overview", "Workspaces", "Integrations", "Analytics"];

const AUDIT_CHECKLIST = [
  { label: "Workspace provider linked", ok: true },
  { label: "Routing boundary secure", ok: true },
  { label: "Selector fixture parsed", ok: true },
  { label: "Inspector collapsible", ok: true },
];

interface WorkspaceShellProps {
  children: React.ReactNode;
}

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  const scope = useWorkspace();
  const pathname = usePathname();

  // Active Selectors State, pre-populated with scope context fixture defaults
  const [activeWorkspace, setActiveWorkspace] = useState(scope.workspace.id);
  const [activeHotel, setActiveHotel] = useState(scope.hotel.id);
  const [activeEngagement, setActiveEngagement] = useState(scope.engagement.id);

  // Layout Sidebar/Panel states
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  // Retrieve selected object details for high fidelity display
  // Memoized to avoid redundant .find() calls on every render
  const currentWorkspace = useMemo(
    () =>
      WORKSPACE_OPTIONS.find((w) => w.id === activeWorkspace) ||
      scope.workspace,
    [activeWorkspace, scope.workspace],
  );

  const currentHotel = useMemo(
    () => HOTEL_OPTIONS.find((h) => h.id === activeHotel) || scope.hotel,
    [activeHotel, scope.hotel],
  );

  const currentEngagement = useMemo(
    () =>
      ENGAGEMENT_OPTIONS.find((e) => e.id === activeEngagement) ||
      scope.engagement,
    [activeEngagement, scope.engagement],
  );

  // Determine active item dynamically based on active route path
  // Memoized to avoid redundant .find() calls on every render
  const currentItem = useMemo(
    () =>
      SIDEBAR_NAV_ITEMS.find(
        (item) =>
          pathname === item.path ||
          (item.path === "/metrics" && pathname === "/"),
      ) || SIDEBAR_NAV_ITEMS[0],
    [pathname],
  );

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-background text-foreground selection:bg-primary/20">
      {/* 1. Global Workspace Header */}
      <header className="z-40 flex h-14 w-full shrink-0 items-center justify-between border-b border-border/40 bg-background/80 px-4 backdrop-blur-md">
        {/* Branding & Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-9 items-center justify-center rounded-lg bg-primary/5 px-2.5 py-1 border border-primary/10 hover:border-primary/20 transition-all duration-300">
            <Logo />
          </div>
          <span className="hidden text-xs font-semibold uppercase tracking-wider text-muted-foreground md:inline-block">
            Metrics Core
          </span>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="hidden h-full space-x-1 md:flex">
          {GLOBAL_NAV_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "relative flex h-full items-center px-4 text-sm font-medium transition-colors hover:text-foreground",
                tab === "Workspaces"
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                  : "text-muted-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Search, Actions & Profile */}
        <div className="flex items-center space-x-3">
          {/* Mock Search Input */}
          <div className="relative hidden max-w-xs md:block">
            <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Quick search (⌘K)..."
              className="h-9 w-48 pl-9 pr-3 text-xs bg-muted/20 hover:bg-muted/40 transition-colors rounded-md"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground relative"
          >
            <Sparkles className="size-4 text-violet-500 animate-pulse" />
          </Button>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 border-l border-border/50 pl-3">
            <Avatar className="size-8 border border-border/50 shadow-sm transition-transform hover:scale-105 duration-200">
              <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                GS
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col text-left md:flex">
              <span className="text-xs font-semibold leading-none">
                Gary Stringham
              </span>
              <span className="text-[10px] text-muted-foreground leading-none mt-1">
                REVREBEL
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Context Navigation & Scope Selection Bar */}
      <div className="z-30 flex h-12 w-full shrink-0 items-center justify-between border-b border-border/40 bg-muted/20 px-4 py-1">
        {/* Dynamic Context Selector Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
            <Layers className="size-3.5 text-primary" />
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              Scope
            </span>
            <ChevronRight className="size-3 text-muted-foreground/60" />
          </div>

          {/* Workspace Dropdown Selector */}
          <div className="flex items-center space-x-1">
            <Briefcase className="size-3.5 text-muted-foreground" />
            <Select value={activeWorkspace} onValueChange={setActiveWorkspace}>
              <SelectTrigger
                size="sm"
                className="h-8 border-none bg-transparent font-medium hover:bg-muted/40 px-2 gap-1.5 text-xs text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <SelectValue placeholder="Workspace" />
              </SelectTrigger>
              <SelectContent>
                {WORKSPACE_OPTIONS.map((ws) => (
                  <SelectItem key={ws.id} value={ws.id} className="text-xs">
                    {ws.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="h-4 w-px bg-border/40 hidden md:block" />

          {/* Hotel/Property Dropdown Selector */}
          <div className="flex items-center space-x-1">
            <Building2 className="size-3.5 text-muted-foreground" />
            <Select value={activeHotel} onValueChange={setActiveHotel}>
              <SelectTrigger
                size="sm"
                className="h-8 border-none bg-transparent font-medium hover:bg-muted/40 px-2 gap-1.5 text-xs text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <SelectValue placeholder="Property" />
              </SelectTrigger>
              <SelectContent>
                {HOTEL_OPTIONS.map((hotel) => (
                  <SelectItem
                    key={hotel.id}
                    value={hotel.id}
                    className="text-xs"
                  >
                    {hotel.name}{" "}
                    <span className="text-[10px] text-muted-foreground ml-1">
                      ({hotel.code})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="h-4 w-px bg-border/40 hidden md:block" />

          {/* Engagement Dropdown Selector */}
          <div className="flex items-center space-x-1">
            <Compass className="size-3.5 text-muted-foreground" />
            <Select
              value={activeEngagement}
              onValueChange={setActiveEngagement}
            >
              <SelectTrigger
                size="sm"
                className="h-8 border-none bg-transparent font-medium hover:bg-muted/40 px-2 gap-1.5 text-xs text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <SelectValue placeholder="Engagement" />
              </SelectTrigger>
              <SelectContent>
                {ENGAGEMENT_OPTIONS.map((eng) => (
                  <SelectItem key={eng.id} value={eng.id} className="text-xs">
                    {eng.name}{" "}
                    <span className="text-[10px] text-muted-foreground ml-1">
                      ({eng.code})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Panel Toggles & Auxiliary Controls */}
        <div className="flex items-center space-x-2">
          {/* Active Status Badge */}
          <div className="hidden items-center space-x-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-500 border border-emerald-500/15 sm:flex">
            <Activity className="size-3 animate-pulse" />
            <span className="font-semibold text-[10px] uppercase tracking-wider leading-none">
              Live Context
            </span>
          </div>

          {/* Inspector Panel Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsInspectorOpen(!isInspectorOpen)}
            className={cn(
              "h-8 px-2 gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors",
              isInspectorOpen && "bg-muted/50 text-foreground",
            )}
          >
            <PanelRight className="size-4" />
            <span className="hidden md:inline">Inspector</span>
          </Button>
        </div>
      </div>

      {/* 3. Lower Structural Regions (Explorer Sidebar, Canvas, Inspector) */}
      <div className="flex flex-1 w-full overflow-hidden">
        <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
          {/* Region A: Explorer Panel (Left Sidebar) */}
          <ResizablePanel
            defaultSize={20}
            minSize={15}
            maxSize={30}
            className="bg-background flex flex-col h-full"
          >
            <div className="flex flex-col h-full border-r border-border/40 select-none">
              {/* Explorer Header */}
              <div className="flex h-10 items-center justify-between px-4 border-b border-border/20 bg-muted/10">
                <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Explorer
                </span>
                <span className="rounded bg-primary/10 px-1 py-0.5 text-[9px] font-bold text-primary tracking-wider uppercase">
                  Workspace
                </span>
              </div>

              {/* Sidebar Navigation Menu */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {SIDEBAR_NAV_ITEMS.map((item) => {
                  const isActive =
                    pathname === item.path ||
                    (item.path === "/metrics" && pathname === "/");
                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-all duration-200 outline-none hover:bg-muted/40",
                        isActive
                          ? "bg-primary/10 text-primary border-l-2 border-primary pl-2 shadow-xs font-semibold"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Sidebar Footnote / Info */}
              <div className="p-3 border-t border-border/20 bg-muted/5 text-[10px] text-muted-foreground">
                <p className="font-semibold uppercase tracking-wider text-[8px] text-muted-foreground/60 leading-none">
                  Core Framework
                </p>
                <p className="mt-1 leading-relaxed">
                  Workspace routes rendering boundary is sandbox verified.
                </p>
              </div>
            </div>
          </ResizablePanel>

          {/* Resizable Divider Handle A */}
          <ResizableHandle withHandle />

          {/* Region B: Canvas Panel (Center Page Content) */}
          <ResizablePanel
            defaultSize={isInspectorOpen ? 60 : 80}
            minSize={40}
            className="bg-muted/10 flex flex-col h-full"
          >
            <div className="flex-1 overflow-auto h-full w-full">
              {/* Canvas Header / Breadcrumbs */}
              <div className="flex h-10 items-center justify-between px-6 border-b border-border/25 bg-background/50 select-none">
                <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
                  <span>{currentWorkspace.name}</span>
                  <ChevronRight className="size-3" />
                  <span className="font-medium text-foreground capitalize">
                    {currentItem.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-[10px] font-semibold tracking-wider text-muted-foreground bg-muted/20 px-2 py-0.5 rounded-full">
                  <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                  <span>RENDER ENGINE: WEB</span>
                </div>
              </div>

              {/* Dynamic Viewport Banner */}
              <div className="m-6 mb-0 rounded-xl border border-primary/10 bg-gradient-to-r from-primary/5 via-violet-500/5 to-transparent p-5 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-primary/5 blur-xl" />
                <div className="flex flex-col gap-1 relative z-10">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest leading-none">
                    <Activity className="size-3 text-primary" /> Active Canvas
                    View
                  </div>
                  <h1 className="text-xl font-bold tracking-tight text-foreground mt-1">
                    {currentWorkspace.name} — {currentHotel.name}
                  </h1>
                  <p className="text-xs text-muted-foreground mt-1.5 max-w-2xl leading-relaxed">
                    Showing current viewport modules mapped to the active{" "}
                    <strong>{currentEngagement.name}</strong> engagement code:{" "}
                    <code className="bg-muted/40 px-1 py-0.5 rounded text-[11px] border border-border/40 font-mono font-semibold">
                      {currentEngagement.code}
                    </code>
                    .
                  </p>
                </div>
              </div>

              {/* Children Page Portlet */}
              <div className="p-6 pt-4 min-h-[300px]">
                <div className="rounded-xl border border-border/40 bg-background shadow-xs p-6 overflow-hidden">
                  {children}
                </div>
              </div>
            </div>
          </ResizablePanel>

          {/* Region C: Collapsible Inspector Panel (Right Sidebar) */}
          {isInspectorOpen && (
            <>
              {/* Resizable Divider Handle B */}
              <ResizableHandle withHandle />

              <ResizablePanel
                defaultSize={20}
                minSize={15}
                maxSize={30}
                className="bg-background flex flex-col h-full"
              >
                <div className="flex flex-col h-full border-l border-border/40">
                  {/* Inspector Header */}
                  <div className="flex h-10 items-center justify-between px-4 border-b border-border/20 bg-muted/10 select-none">
                    <span className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                      Inspector
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsInspectorOpen(false)}
                      className="size-6 text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded"
                    >
                      <X className="size-3.5" />
                    </Button>
                  </div>

                  {/* Inspector Metadata Content */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Workspace Scope Diagnostics */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        <FileText className="size-3.5 text-primary" /> Scope
                        Diagnostics
                      </div>

                      {/* Workspace Block */}
                      <div className="rounded-lg border border-border/40 bg-muted/10 p-3 space-y-1">
                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                          Active Workspace
                        </div>
                        <div className="text-xs font-semibold mt-1 truncate">
                          {currentWorkspace.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                          id: {currentWorkspace.id}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">
                          slug: {currentWorkspace.slug}
                        </div>
                      </div>

                      {/* Organization Block */}
                      <div className="rounded-lg border border-border/40 bg-muted/10 p-3 space-y-1">
                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                          Active Organization
                        </div>
                        <div className="text-xs font-semibold mt-1 truncate">
                          {scope.organization.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                          id: {scope.organization.id}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">
                          slug: {scope.organization.slug}
                        </div>
                      </div>

                      {/* Hotel Block */}
                      <div className="rounded-lg border border-border/40 bg-muted/10 p-3 space-y-1">
                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                          Active Property (Hotel)
                        </div>
                        <div className="text-xs font-semibold mt-1 truncate">
                          {currentHotel.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                          id: {currentHotel.id}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">
                          code: {currentHotel.code}
                        </div>
                      </div>

                      {/* Engagement Block */}
                      <div className="rounded-lg border border-border/40 bg-muted/10 p-3 space-y-1">
                        <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                          Active Engagement
                        </div>
                        <div className="text-xs font-semibold mt-1 truncate">
                          {currentEngagement.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                          id: {currentEngagement.id}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono truncate">
                          code: {currentEngagement.code}
                        </div>
                      </div>
                    </div>

                    {/* Verification & Audit */}
                    <div className="pt-2 border-t border-border/20 space-y-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none">
                        <CheckCircle2 className="size-3.5 text-emerald-500" />{" "}
                        Audit Checklist
                      </div>
                      <div className="space-y-2">
                        {AUDIT_CHECKLIST.map((chk) => (
                          <div
                            key={chk.label}
                            className="flex items-center gap-2 text-xs text-muted-foreground leading-none"
                          >
                            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0" />
                            <span>{chk.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
