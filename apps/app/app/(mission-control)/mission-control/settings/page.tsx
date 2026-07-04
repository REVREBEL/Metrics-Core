"use client";

import {
  CheckCircle,
  Globe,
  RefreshCw,
  Save,
  Server,
  Sliders,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export default function SystemSettingsPage() {
  const [config, setConfig] = useState({
    systemName: "REVREBEL Metrics Enterprise",
    refreshRate: "15",
    primaryLocation: "us-east-01",
    telemetryEnabled: true,
    errorLogging: true,
    sessionTimeout: "120",
    maxUploadLimit: "50",
  });

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSavingStatus] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavingStatus(
      "Syncing configuration constants across 12 running clusters...",
    );

    setTimeout(() => {
      setSavingStatus("Reloading container configurations...");
      setTimeout(() => {
        setSaving(false);
        setSavingStatus("All configuration values saved successfully.");
        setTimeout(() => setSavingStatus(null), 3000);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-blue-950/20 to-transparent p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">
            <Sliders className="size-3" /> Config Core
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            System Settings & Cluster Params
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Configure system-wide constants, region specifications, and global
            telemetry parameters. Changes made here are pushed asynchronously to
            all active container pools.
          </p>
        </div>
      </div>

      {/* Floating Sync Log */}
      {saveStatus && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-violet-500/30 text-violet-300 px-4 py-3 rounded-xl shadow-2xl shadow-black/80 flex items-center gap-3 text-xs font-semibold">
          {saving ? (
            <RefreshCw className="size-4 text-violet-400 animate-spin" />
          ) : (
            <CheckCircle className="size-4 text-emerald-400" />
          )}
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Settings Form Grid */}
      <form onSubmit={handleSave} className="grid gap-6 md:grid-cols-2">
        {/* Core Settings Panel */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Server className="size-4 text-violet-400" /> Global Application
            Params
          </h3>

          <div className="space-y-4 pt-2">
            {/* App Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="systemName"
                className="text-xs font-semibold text-slate-400"
              >
                System Brand Label
              </label>
              <input
                id="systemName"
                type="text"
                value={config.systemName}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, systemName: e.target.value }))
                }
                className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-violet-500/60"
              />
            </div>

            {/* Sync Rate */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="refreshRate"
                className="text-xs font-semibold text-slate-400"
              >
                Data Grid Refresh Cycle
              </label>
              <select
                id="refreshRate"
                value={config.refreshRate}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    refreshRate: e.target.value,
                  }))
                }
                className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-violet-500/60"
              >
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="60">Hourly</option>
                <option value="720">Every 12 hours</option>
              </select>
            </div>

            {/* Session Timeout */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sessionTimeout"
                className="text-xs font-semibold text-slate-400"
              >
                Operator Session TTL (Minutes)
              </label>
              <input
                id="sessionTimeout"
                type="number"
                value={config.sessionTimeout}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    sessionTimeout: e.target.value,
                  }))
                }
                className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-violet-500/60"
              />
            </div>
          </div>
        </div>

        {/* Region & Telemetry Panel */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Globe className="size-4 text-blue-400" /> Regional Node &
            Diagnostics
          </h3>

          <div className="space-y-5 pt-2">
            {/* Primary Node Location */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="primaryLocation"
                className="text-xs font-semibold text-slate-400"
              >
                Primary Cluster Location
              </label>
              <select
                id="primaryLocation"
                value={config.primaryLocation}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    primaryLocation: e.target.value,
                  }))
                }
                className="bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-violet-500/60"
              >
                <option value="us-east-01">
                  US-East (Virginia Cloud Node)
                </option>
                <option value="us-west-02">US-West (Oregon Cloud Node)</option>
                <option value="eu-central-01">
                  EU-Central (Frankfurt Cloud Node)
                </option>
                <option value="ap-south-01">
                  AP-South (Mumbai Cloud Node)
                </option>
              </select>
            </div>

            {/* Telemetry Switch */}
            <div className="flex items-center justify-between border-t border-slate-800/60 pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  Anonymous Health Telemetry
                </span>
                <span className="text-[10px] text-slate-500 max-w-xs">
                  Broadcast CPU, memory, and heap logs to the central
                  aggregator.
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    telemetryEnabled: !prev.telemetryEnabled,
                  }))
                }
                className={`w-10 h-6 flex items-center rounded-full p-1 transition-all ${
                  config.telemetryEnabled
                    ? "bg-violet-600 justify-end"
                    : "bg-slate-850 justify-start"
                }`}
              >
                <span className="size-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            {/* Error Logging Switch */}
            <div className="flex items-center justify-between border-t border-slate-800/60 pt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  Client Crash Dumping
                </span>
                <span className="text-[10px] text-slate-500 max-w-xs">
                  Relay uncaught layout exceptions to telemetry logs.
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setConfig((prev) => ({
                    ...prev,
                    errorLogging: !prev.errorLogging,
                  }))
                }
                className={`w-10 h-6 flex items-center rounded-full p-1 transition-all ${
                  config.errorLogging
                    ? "bg-violet-600 justify-end"
                    : "bg-slate-850 justify-start"
                }`}
              >
                <span className="size-4 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Save Trigger */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs px-6 py-2.5 transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-500/10"
          >
            {saving ? (
              <>
                <RefreshCw className="size-4 animate-spin" />
                <span>Syncing Clusters...</span>
              </>
            ) : (
              <>
                <Save className="size-4" />
                <span>Save Config Parameters</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
