"use client";

import {
  Activity,
  AlertCircle,
  CheckCircle,
  Database,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";

interface DataConnector {
  id: string;
  name: string;
  type: string;
  status: "connected" | "testing" | "error" | "disconnected";
  dataset: string;
  lastSync: string;
  latency: string;
  credentialId: string;
}

export default function DataSourcesPage() {
  const [connectors, setContainers] = useState<DataConnector[]>([
    {
      id: "bigquery",
      name: "Google BigQuery Data Vault",
      type: "Data Warehouse",
      status: "connected",
      dataset: "revrebel-dw-prod.metrics_v1",
      lastSync: "32 mins ago",
      latency: "142ms",
      credentialId: "sa-bq-engine-prod",
    },
    {
      id: "ga4",
      name: "Google Analytics 4 Pipeline",
      type: "Web Analytics",
      status: "connected",
      dataset: "properties-sessions-stream",
      lastSync: "14 mins ago",
      latency: "89ms",
      credentialId: "ga4-oauth-vault",
    },
    {
      id: "salesforce",
      name: "Salesforce Cloud Connector",
      type: "CRM Feed",
      status: "connected",
      dataset: "accounts-revenue-leads",
      lastSync: "2 hours ago",
      latency: "245ms",
      credentialId: "sf-oauth-enterprise",
    },
    {
      id: "mailchimp",
      name: "Mailchimp Marketing Feed",
      type: "Email Dispatcher",
      status: "disconnected",
      dataset: "campaigns-broadcast-stats",
      lastSync: "3 days ago",
      latency: "N/A",
      credentialId: "mc-api-legacy-key",
    },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const testConnection = (id: string) => {
    // Set to testing status
    setContainers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "testing" } : c)),
    );

    const name = connectors.find((c) => c.id === id)?.name || id;

    setTimeout(() => {
      setContainers((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "connected",
                latency: `${Math.round(Math.random() * 200 + 40)}ms`,
              }
            : c,
        ),
      );
      setNotification(
        `Connection Secure: ${name} responded with nominal payload.`,
      );
      setTimeout(() => setNotification(null), 3000);
    }, 2000);
  };

  const forceSync = (id: string) => {
    // Show quick toast
    const name = connectors.find((c) => c.id === id)?.name || id;
    setNotification(`Manually forcing ingestion sync on ${name}...`);

    setTimeout(() => {
      setContainers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, lastSync: "Just now" } : c)),
      );
      setNotification(`Database ingestion complete for ${name}.`);
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  };

  const getStatusBadge = (status: DataConnector["status"]) => {
    switch (status) {
      case "connected":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="size-3" /> SECURE
          </span>
        );
      case "testing":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
            <RefreshCw className="size-3 animate-spin" /> TESTING
          </span>
        );
      case "disconnected":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">
            <AlertCircle className="size-3" /> OFFLINE
          </span>
        );
      case "error":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
            <AlertCircle className="size-3" /> CREDENTIAL ERROR
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-blue-950/20 to-transparent p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">
            <Database className="size-3" /> Integration Desk
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            Data Connectors & Pipelines
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Monitor and test third-party cloud integrations and databases
            pipeline connections. Ingestion latency and token distributions are
            verified asynchronously.
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

      {/* Connectors Catalog Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {connectors.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-4 relative overflow-hidden hover:border-slate-700/80 transition-all duration-300"
          >
            {/* Upper line */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-850 border border-slate-850 rounded-lg shrink-0 text-violet-400">
                  <Database className="size-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white leading-none">
                    {c.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1.5 leading-none">
                    {c.type} | Credentials:{" "}
                    <span className="font-mono">{c.credentialId}</span>
                  </p>
                </div>
              </div>
              {getStatusBadge(c.status)}
            </div>

            {/* Ingestion Details */}
            <div className="text-xs space-y-2 border-t border-slate-800/60 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">
                  Active Catalog Path
                </span>
                <span className="font-mono text-slate-300 text-[10px]">
                  {c.dataset}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">
                  Last Ingest Sync
                </span>
                <span className="text-slate-300">{c.lastSync}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">
                  Ping Latency
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  {c.latency}
                </span>
              </div>
            </div>

            {/* Action controls */}
            <div className="flex gap-2 pt-2 border-t border-slate-800/40">
              <button
                type="button"
                onClick={() => testConnection(c.id)}
                disabled={c.status === "testing"}
                className="flex-1 flex items-center justify-center gap-1.5 rounded bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white font-bold text-[10px] py-2 border border-slate-700 hover:border-slate-650 transition-all duration-250 uppercase tracking-wider"
              >
                <Activity className="size-3.5" />
                <span>Test Connection</span>
              </button>
              <button
                type="button"
                onClick={() => forceSync(c.id)}
                disabled={c.status === "testing" || c.status === "disconnected"}
                className="flex-1 flex items-center justify-center gap-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold text-[10px] py-2 transition-all duration-250 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="size-3.5" />
                <span>Ingest Sync</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
