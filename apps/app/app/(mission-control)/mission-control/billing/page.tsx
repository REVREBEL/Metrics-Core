"use client";

import { Activity, Check, CreditCard, FileText, Zap } from "lucide-react";
import { useState } from "react";

interface ResourceLimit {
  name: string;
  used: number;
  total: number;
  unit: string;
  percentage: number;
}

interface InvoiceRow {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "pending";
  description: string;
}

export default function BillingLimitsPage() {
  const [limits] = useState<ResourceLimit[]>([
    {
      name: "SBU / Hotel Slots",
      used: 4,
      total: 10,
      unit: "Properties",
      percentage: 40,
    },
    {
      name: "API Volumes Threshold",
      used: 1.84,
      total: 5.0,
      unit: "Million Req/mo",
      percentage: 36.8,
    },
    {
      name: "Administrative Seats",
      used: 5,
      total: 20,
      unit: "Active Seats",
      percentage: 25,
    },
    {
      name: "AI Growth Pipeline Triggers",
      used: 124,
      total: 1000,
      unit: "Calculations/mo",
      percentage: 12.4,
    },
  ]);

  const [invoices, _setInvoices] = useState<InvoiceRow[]>([
    {
      id: "inv-2026-06",
      date: "Jun 1, 2026",
      amount: "$1,450.00",
      status: "paid",
      description: "Enterprise Metrics Core Plan",
    },
    {
      id: "inv-2026-05",
      date: "May 1, 2026",
      amount: "$1,450.00",
      status: "paid",
      description: "Enterprise Metrics Core Plan",
    },
    {
      id: "inv-2026-04",
      date: "Apr 1, 2026",
      amount: "$1,200.00",
      status: "paid",
      description: "Growth Tier - Pro Upgrade Pro-rata",
    },
  ]);

  const [isUpgraded, setIsUpgraded] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const upgradeLimits = () => {
    setIsUpgraded(true);
    setNotification(
      "Subscription request queued. Plan limits extended dynamically!",
    );
    setTimeout(() => setNotification(null), 4000);
  };

  const downloadReceipt = (id: string) => {
    setNotification(`Mock Receipt PDF generated for transaction ID: ${id}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-violet-500/20 bg-gradient-to-r from-violet-950/20 via-blue-950/20 to-transparent p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 size-24 rounded-full bg-violet-500/10 blur-xl" />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-violet-400 uppercase tracking-widest leading-none">
            <CreditCard className="size-3" /> Financial Control Room
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white mt-1">
            Billing Profile & Resource Limits
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Monitor active limits, audit invoices, and update billing methods.
            Resource limits scale horizontally depending on your active SBU
            metrics allocation.
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

      {/* Subscription Tier Info Card */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Activity className="size-4 text-violet-400" /> Subscription
            Utilization Gages
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {limits.map((l) => {
              const currentTotal = isUpgraded ? l.total * 2 : l.total;
              const currentPercentage = Math.round(
                (l.used / currentTotal) * 100,
              );

              return (
                <div
                  key={l.name}
                  className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 hover:border-slate-700/80 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-slate-400 leading-none">
                      {l.name}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500 font-bold uppercase leading-none">
                      {currentPercentage}% USED
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-xl font-bold text-white tracking-tight">
                      {l.used}{" "}
                      <span className="text-xs text-slate-500 font-semibold uppercase">
                        / {currentTotal} {l.unit}
                      </span>
                    </div>

                    <div className="w-full bg-slate-850 rounded-full h-1.5 pt-1">
                      <div
                        className="bg-violet-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${currentPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tier Pricing Summary */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Zap className="size-4 text-amber-400" /> Active Service Tier
          </h3>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 size-16 rounded-full bg-amber-500/5 blur-lg" />
            <div className="space-y-2">
              <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 uppercase tracking-wider">
                Enterprise SBU Plan
              </span>
              <div className="text-3xl font-bold text-white tracking-tight">
                $1,450{" "}
                <span className="text-xs text-slate-500 font-medium tracking-normal">
                  / month
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Unlimited hotel metrics processing, SOC2 compliance vault, and
                20 seats standard.
              </p>
            </div>

            <ul className="text-[11px] space-y-2 text-slate-300 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-400" />
                <span>Dedicated telemetry endpoints</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-400" />
                <span>Dedicated SLA support: &lt; 1 hour</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={upgradeLimits}
              disabled={isUpgraded}
              className="w-full rounded bg-violet-600 hover:bg-violet-500 text-white font-bold text-[10px] py-2.5 transition-all uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-violet-500/10"
            >
              {isUpgraded ? "Plan Limit Doubled" : "Extend Core Capacity"}
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Ledger */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <FileText className="size-4 text-emerald-400" /> Transaction Ledger
        </h3>

        <div className="rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Billing Date</th>
                <th className="px-6 py-4">Subscription Description</th>
                <th className="px-6 py-4">Amount Invoice</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/25">
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-slate-900/35 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-[11px] text-white">
                    {inv.id}
                  </td>
                  <td className="px-6 py-4 text-slate-400">{inv.date}</td>
                  <td className="px-6 py-4 text-slate-300">
                    {inv.description}
                  </td>
                  <td className="px-6 py-4 font-bold text-white">
                    {inv.amount}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                      PAID
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => downloadReceipt(inv.id)}
                      className="rounded border border-slate-700 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-bold text-[10px] px-2.5 py-1.5 transition-colors uppercase tracking-wider"
                    >
                      Download PDF
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
