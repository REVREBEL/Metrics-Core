"use client";

import {
  Activity,
  ArrowLeft,
  Cpu,
  CreditCard,
  Database,
  Server,
  ShieldCheck,
  Sliders,
  Terminal,
  Users as UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

interface SidebarNavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const adminNavItems: SidebarNavItem[] = [
  { name: "System Overview", path: "/mission-control", icon: Terminal },
  { name: "App Management", path: "/mission-control/apps", icon: Cpu },
  { name: "User Registry", path: "/mission-control/users", icon: UsersIcon },
  {
    name: "Roles & Permissions",
    path: "/mission-control/permissions",
    icon: ShieldCheck,
  },
  {
    name: "Billing & Limits",
    path: "/mission-control/billing",
    icon: CreditCard,
  },
  { name: "System Settings", path: "/mission-control/settings", icon: Sliders },
  {
    name: "Data Connectors",
    path: "/mission-control/data-sources",
    icon: Database,
  },
  {
    name: "System Audit Logs",
    path: "/mission-control/audit-logs",
    icon: Activity,
  },
];

export default function MissionControlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-violet-500/20">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 -translate-y-1/2 size-96 rounded-full bg-violet-600/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 translate-y-1/2 size-96 rounded-full bg-blue-600/10 blur-3xl animate-pulse"
          style={{ animationDuration: "12s" }}
        />
      </div>

      {/* Admin Left Sidebar */}
      <aside className="relative z-10 w-64 border-r border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400 shrink-0">
            <Server className="size-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-white leading-none">
              Mission Control
            </h2>
            <p className="text-[10px] text-slate-400 mt-1 leading-none">
              Infrastructure Cockpit
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-violet-500/10 border border-violet-500/30 text-violet-300 shadow-md shadow-violet-500/5"
                    : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon
                  className={`size-4 ${isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar - Return to normal workspace */}
        <div className="p-4 border-t border-slate-800">
          <Link
            href="/metrics"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg hover:border-slate-600 transition-all duration-300"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to App</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin View Container */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top telemetry bar */}
        <header className="border-b border-slate-800 bg-slate-900/40 backdrop-blur-sm px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-ping" />
              Infrastructure: Nominal
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span>Cluster: node-us-east-01</span>
            <span className="text-slate-700">|</span>
            <span>
              Env: <strong className="text-emerald-400">PRODUCTION</strong>
            </span>
          </div>
        </header>

        {/* Content Pane */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
