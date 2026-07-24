"use client";

import {
  Clock,
  Filter,
  Key,
  Search,
  Shield,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { useMemo, useState } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "System Admin" | "SBU Manager" | "General Manager" | "Auditor";
  status: "active" | "suspended" | "provisioning";
  tokenCount: number;
  lastActive: string;
}

const getRoleBadgeColor = (role: UserProfile["role"]) => {
  switch (role) {
    case "System Admin":
      return "bg-violet-500/10 text-violet-400 border-violet-500/20";
    case "SBU Manager":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "General Manager":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Auditor":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
  }
};

const getStatusBadge = (status: UserProfile["status"]) => {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ACTIVE
        </span>
      );
    case "suspended":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
          SUSPENDED
        </span>
      );
    case "provisioning":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
          PENDING
        </span>
      );
  }
};

export default function UserRegistryPage() {
  const [users, setUsers] = useState<UserProfile[]>([
    {
      id: "usr-01",
      name: "Gary Stringham",
      email: "gary.s@revrebel.com",
      role: "System Admin",
      status: "active",
      tokenCount: 3,
      lastActive: "Just now",
    },
    {
      id: "usr-02",
      name: "Elizabeth Bennett",
      email: "elizabeth.b@revrebel.com",
      role: "SBU Manager",
      status: "active",
      tokenCount: 1,
      lastActive: "14 mins ago",
    },
    {
      id: "usr-03",
      name: "Marcus Aurelius",
      email: "marcus.a@revrebel.com",
      role: "General Manager",
      status: "active",
      tokenCount: 2,
      lastActive: "2 hours ago",
    },
    {
      id: "usr-04",
      name: "Jane Austen",
      email: "jane.a@revrebel.com",
      role: "Auditor",
      status: "active",
      tokenCount: 1,
      lastActive: "1 day ago",
    },
    {
      id: "usr-05",
      name: "William Darcy",
      email: "william.d@revrebel.com",
      role: "SBU Manager",
      status: "provisioning",
      tokenCount: 0,
      lastActive: "Never",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === "active" ? "suspended" : "active";
          const nextTokens = nextStatus === "suspended" ? 0 : u.tokenCount;
          return { ...u, status: nextStatus, tokenCount: nextTokens };
        }
        return u;
      }),
    );
  };

  const revokeAllTokens = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, tokenCount: 0 } : u)),
    );
  };

  // Optimized: Use useMemo to prevent expensive filtering on every re-render
  // This avoids recalculation when user status is toggled or tokens are revoked.
  const filteredUsers = useMemo(() => {
    const lowerSearchQuery = searchQuery.toLowerCase();

    return users.filter((u) => {
      // Early return if role doesn't match
      if (roleFilter !== "all" && u.role !== roleFilter) return false;

      // Only perform search if there's a query
      if (!lowerSearchQuery) return true;

      return (
        u.name.toLowerCase().includes(lowerSearchQuery) ||
        u.email.toLowerCase().includes(lowerSearchQuery)
      );
    });
  }, [users, searchQuery, roleFilter]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-blue-950/20 to-transparent p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">
            <Users className="size-3" /> Identity Catalog
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            User Registry & Credentials
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Manage administrative profiles, SBU Managers, and auditors
            authorized to interact with the REVREBEL Metrics core nodes.
            Override sessions and suspend users instantly.
          </p>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 pointer-events-none">
            <Search className="size-4" />
          </span>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-10 pr-4 py-2 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto self-stretch sm:self-auto justify-end">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
            <Filter className="size-3.5" /> Role:
          </span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-violet-500/60"
          >
            <option value="all">All Roles</option>
            <option value="System Admin">System Admin</option>
            <option value="SBU Manager">SBU Manager</option>
            <option value="General Manager">General Manager</option>
            <option value="Auditor">Auditor</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden shadow-2xl shadow-black/40">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-4">Manager Profile</th>
                <th className="px-6 py-4">Security Role</th>
                <th className="px-6 py-4">Node Status</th>
                <th className="px-6 py-4">Tokens Active</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/25">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-slate-900/30 transition-colors"
                  >
                    {/* User Profile */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-xs">
                          {u.name}
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5">
                          {u.email}
                        </span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${getRoleBadgeColor(
                          u.role,
                        )}`}
                      >
                        <Shield className="size-3 mr-1" />
                        {u.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">{getStatusBadge(u.status)}</td>

                    {/* Tokens count */}
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-300">
                      <span className="flex items-center gap-1">
                        <Key className="size-3 text-slate-500" />
                        {u.tokenCount}
                      </span>
                    </td>

                    {/* Last active */}
                    <td className="px-6 py-4">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="size-3 text-slate-500" />
                        {u.lastActive}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right space-x-2">
                      {u.tokenCount > 0 && (
                        <button
                          type="button"
                          onClick={() => revokeAllTokens(u.id)}
                          className="rounded border border-red-500/20 bg-red-500/5 hover:bg-red-500/15 text-red-400 font-bold text-[10px] px-2.5 py-1.5 transition-colors uppercase tracking-wider"
                        >
                          Revoke Tokens
                        </button>
                      )}
                      {u.status !== "provisioning" && (
                        <button
                          type="button"
                          onClick={() => toggleUserStatus(u.id)}
                          className={`rounded border font-bold text-[10px] px-2.5 py-1.5 transition-colors uppercase tracking-wider ${
                            u.status === "active"
                              ? "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/15 text-amber-400"
                              : "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-400"
                          }`}
                        >
                          {u.status === "active" ? (
                            <span className="flex items-center gap-1 justify-end">
                              <UserX className="size-3" /> Suspend
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 justify-end">
                              <UserCheck className="size-3" /> Activate
                            </span>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500 font-medium"
                  >
                    No administrative operators match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
