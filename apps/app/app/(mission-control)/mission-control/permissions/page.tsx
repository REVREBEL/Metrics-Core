"use client";

import {
  Check,
  Database,
  FileText,
  Lock,
  Network,
  Server,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";

interface PermissionRow {
  key: string;
  category: "infrastructure" | "data" | "billing" | "security";
  name: string;
  description: string;
  admin: boolean;
  sbu: boolean;
  gm: boolean;
  auditor: boolean;
}

export default function RolesPermissionsPage() {
  const [permissions, setPermissions] = useState<PermissionRow[]>([
    {
      key: "ssh-access",
      category: "infrastructure",
      name: "Shell Node access",
      description: "Direct terminal SSH commands to deployment server clusters",
      admin: true,
      sbu: false,
      gm: false,
      auditor: false,
    },
    {
      key: "restart-service",
      category: "infrastructure",
      name: "Restart Core Containers",
      description: "Trigger graceful process roll-overs on container pods",
      admin: true,
      sbu: true,
      gm: false,
      auditor: false,
    },
    {
      key: "bq-query",
      category: "data",
      name: "Write BigQuery Pipelines",
      description: "Establish and overwrite direct cloud telemetry catalogs",
      admin: true,
      sbu: true,
      gm: true,
      auditor: false,
    },
    {
      key: "metrics-view",
      category: "data",
      name: "Access Workspace Metrics",
      description: "Read metrics reports, dashboard canvas, and inspector data",
      admin: true,
      sbu: true,
      gm: true,
      auditor: true,
    },
    {
      key: "billing-modify",
      category: "billing",
      name: "Modify Billing Profile",
      description: "Upgrade subscriptions, add payment methods, edit limits",
      admin: true,
      sbu: false,
      gm: true,
      auditor: false,
    },
    {
      key: "audit-read",
      category: "security",
      name: "View Audit Ledgers",
      description: "Query tamper-proof security incident log stream",
      admin: true,
      sbu: false,
      gm: false,
      auditor: true,
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const togglePermission = (
    key: string,
    role: "admin" | "sbu" | "gm" | "auditor",
  ) => {
    // Admins are locked on everything except if custom rules are made
    if (role === "admin") {
      setNotification(
        "System Admin permissions are locked to prevent server lockout.",
      );
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setPermissions((prev) =>
      prev.map((p) => {
        if (p.key === key) {
          const nextVal = !p[role];
          const roleLabel =
            role === "sbu"
              ? "SBU Manager"
              : role === "gm"
                ? "General Manager"
                : "Auditor";
          setNotification(
            `Permission updated: "${p.name}" ${
              nextVal ? "GRANTED" : "REVOKED"
            } for ${roleLabel}`,
          );
          setTimeout(() => setNotification(null), 3000);
          return { ...p, [role]: nextVal };
        }
        return p;
      }),
    );
  };

  const getCategoryIcon = (category: PermissionRow["category"]) => {
    switch (category) {
      case "infrastructure":
        return <Server className="size-4 text-violet-400" />;
      case "data":
        return <Database className="size-4 text-blue-400" />;
      case "billing":
        return <FileText className="size-4 text-emerald-400" />;
      default:
        return <Network className="size-4 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-blue-950/20 to-transparent p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">
            <ShieldCheck className="size-3" /> Security Access Guard
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            Roles & Granular RBAC Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Configure Role-Based Access Controls (RBAC) across core modules.
            Permissions are enforced dynamically by evaluating active token
            claims. Click cells to toggle access.
          </p>
        </div>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-violet-500/30 text-violet-300 px-4 py-3 rounded-xl shadow-2xl shadow-black/80 flex items-center gap-2 text-xs font-semibold animate-bounce">
          <span className="size-2 rounded-full bg-violet-500 animate-ping" />
          <span>{notification}</span>
        </div>
      )}

      {/* Permissions Matrix */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden shadow-2xl shadow-black/40">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-4 w-96">Module / Policy Permission</th>
                <th className="px-6 py-4 text-center">System Admin</th>
                <th className="px-6 py-4 text-center">SBU Manager</th>
                <th className="px-6 py-4 text-center">General Manager</th>
                <th className="px-6 py-4 text-center">Auditor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/25">
              {permissions.map((p) => (
                <tr
                  key={p.key}
                  className="hover:bg-slate-900/35 transition-colors"
                >
                  {/* Left Label */}
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-slate-800/60 border border-slate-700/60 rounded mt-0.5 shrink-0">
                        {getCategoryIcon(p.category)}
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">
                          {p.name}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 max-w-sm leading-relaxed">
                          {p.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* System Admin cell */}
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => togglePermission(p.key, "admin")}
                      className="inline-flex size-7 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400 font-bold focus:outline-none cursor-not-allowed"
                      title="Locked System Access"
                    >
                      <Lock className="size-3.5" />
                    </button>
                  </td>

                  {/* SBU Manager cell */}
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => togglePermission(p.key, "sbu")}
                      className={`inline-flex size-7 items-center justify-center rounded-lg border transition-all duration-150 ${
                        p.sbu
                          ? "bg-blue-500/15 border-blue-500/40 text-blue-400 hover:bg-blue-500/20"
                          : "bg-slate-900/50 border-slate-800 text-slate-600 hover:border-slate-700 hover:text-slate-400"
                      }`}
                    >
                      {p.sbu ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-3" />
                      )}
                    </button>
                  </td>

                  {/* General Manager cell */}
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => togglePermission(p.key, "gm")}
                      className={`inline-flex size-7 items-center justify-center rounded-lg border transition-all duration-150 ${
                        p.gm
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-slate-900/50 border-slate-800 text-slate-600 hover:border-slate-700 hover:text-slate-400"
                      }`}
                    >
                      {p.gm ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-3" />
                      )}
                    </button>
                  </td>

                  {/* Auditor cell */}
                  <td className="px-6 py-4 text-center">
                    <button
                      type="button"
                      onClick={() => togglePermission(p.key, "auditor")}
                      className={`inline-flex size-7 items-center justify-center rounded-lg border transition-all duration-150 ${
                        p.auditor
                          ? "bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/20"
                          : "bg-slate-900/50 border-slate-800 text-slate-600 hover:border-slate-700 hover:text-slate-400"
                      }`}
                    >
                      {p.auditor ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-3" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
