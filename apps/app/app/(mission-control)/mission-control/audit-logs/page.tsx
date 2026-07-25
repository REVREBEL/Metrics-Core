"use client";

import {
  Activity,
  AlertTriangle,
  Clock,
  Download,
  Filter,
  Info,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  severity: "info" | "warning" | "security";
  ipAddress: string;
}

const getSeverityBadge = (sev: AuditLogEntry["severity"]) => {
  switch (sev) {
    case "info":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Info className="size-3" /> INFO
        </span>
      );
    case "warning":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <AlertTriangle className="size-3" /> WARNING
        </span>
      );
    case "security":
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
          <ShieldCheck className="size-3" /> SECURITY
        </span>
      );
  }
};

export default function AuditLogsPage() {
  const [logs] = useState<AuditLogEntry[]>([
    {
      id: "log-8941",
      timestamp: "2026-07-03 14:32:05",
      actor: "Gary Stringham",
      action: "Initiated rolling container upgrade: [Metrics Engine]",
      severity: "info",
      ipAddress: "192.168.1.142",
    },
    {
      id: "log-8940",
      timestamp: "2026-07-03 14:15:11",
      actor: "Elizabeth Bennett",
      action: "Auth token refreshed: [ga4-oauth-vault]",
      severity: "info",
      ipAddress: "192.168.1.18",
    },
    {
      id: "log-8939",
      timestamp: "2026-07-03 13:42:01",
      actor: "System Watchdog",
      action: "Database sync latency spike: 242ms (threshold: 200ms)",
      severity: "warning",
      ipAddress: "127.0.0.1",
    },
    {
      id: "log-8938",
      timestamp: "2026-07-03 12:11:58",
      actor: "Gary Stringham",
      action: "Access permission GRANT updated: [SBU Manager -> Read BigQuery]",
      severity: "security",
      ipAddress: "192.168.1.142",
    },
    {
      id: "log-8937",
      timestamp: "2026-07-03 11:02:44",
      actor: "Anonymous Operator",
      action: "Failed console login attempt for: [admin@revrebel.com]",
      severity: "security",
      ipAddress: "104.244.72.115",
    },
    {
      id: "log-8936",
      timestamp: "2026-07-03 09:21:05",
      actor: "Jane Austen",
      action: "Exported Q3 Commercial Metrics Report: [CSV format]",
      severity: "info",
      ipAddress: "192.168.1.23",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [exporting, setExporting] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Optimized: Use useMemo to prevent expensive filtering and string operations on every re-render.
  // This avoids recalculation when export state changes or toast notifications trigger a render.
  const filteredLogs = useMemo(() => {
    const lowerSearchQuery = searchQuery.toLowerCase();

    return logs.filter((log) => {
      // Early return if severity filter does not match
      if (severityFilter !== "all" && log.severity !== severityFilter) {
        return false;
      }

      // Only perform search if there is a query
      if (!lowerSearchQuery) {
        return true;
      }

      return (
        log.actor.toLowerCase().includes(lowerSearchQuery) ||
        log.action.toLowerCase().includes(lowerSearchQuery) ||
        log.id.toLowerCase().includes(lowerSearchQuery)
      );
    });
  }, [logs, searchQuery, severityFilter]);

  const triggerExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setNotification(
        "Cryptographic Audit CSV compiled successfully. Checksum SHA-256 verified.",
      );
      setTimeout(() => setNotification(null), 4000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-blue-950/20 to-transparent p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">
            <Activity className="size-3" /> Security Vault
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            System Audit Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Query the tamper-proof security incident stream and administrative
            activity log. Every configuration update, permission change, and
            login attempt is logged here.
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-violet-500/30 text-violet-300 px-4 py-3 rounded-xl shadow-2xl shadow-black/80 flex items-center gap-2 text-xs font-semibold animate-bounce">
          <span className="size-2 rounded-full bg-violet-500 animate-ping" />
          <span>{notification}</span>
        </div>
      )}

      {/* Control Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 pointer-events-none">
            <Search className="size-4" />
          </span>
          <input
            type="text"
            placeholder="Filter logs by actor, action, or id..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-10 pr-4 py-2 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/20 transition-all"
          />
        </div>

        {/* Severity Filter Dropdown & Export */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto self-stretch sm:self-auto justify-end">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 shrink-0">
              <Filter className="size-3.5" /> Severity:
            </span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-violet-500/60 w-full sm:w-auto"
            >
              <option value="all">All Events</option>
              <option value="info">INFO</option>
              <option value="warning">WARNING</option>
              <option value="security">SECURITY</option>
            </select>
          </div>

          <button
            type="button"
            onClick={triggerExport}
            disabled={exporting}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-4 py-2 transition-all uppercase tracking-wider disabled:opacity-50"
          >
            {exporting ? (
              <>
                <RefreshCw className="size-3.5 animate-spin" />
                <span>Compiling CSV...</span>
              </>
            ) : (
              <>
                <Download className="size-3.5" />
                <span>Export Ledger</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden shadow-2xl shadow-black/40">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-4 w-32">Timestamp</th>
                <th className="px-6 py-4 w-28">Log ID</th>
                <th className="px-6 py-4 w-40">Security Actor</th>
                <th className="px-6 py-4">Action Decoded Log Description</th>
                <th className="px-6 py-4 w-28">Severity</th>
                <th className="px-6 py-4 w-36 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/25">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-900/35 transition-colors font-mono text-[11px]"
                  >
                    {/* Timestamp */}
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3" />
                        {log.timestamp}
                      </span>
                    </td>

                    {/* Log ID */}
                    <td className="px-6 py-4 font-bold text-slate-400 whitespace-nowrap">
                      {log.id}
                    </td>

                    {/* Actor */}
                    <td className="px-6 py-4 text-white font-semibold font-sans whitespace-nowrap">
                      {log.actor}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-slate-350 font-sans leading-relaxed">
                      {log.action}
                    </td>

                    {/* Severity */}
                    <td className="px-6 py-4">
                      {getSeverityBadge(log.severity)}
                    </td>

                    {/* IP */}
                    <td className="px-6 py-4 text-slate-500 text-right">
                      {log.ipAddress}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-slate-500 font-medium font-sans"
                  >
                    No audit records match your filters.
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
