"use client";

import { ArrowLeft, Loader2, Mail, Send } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please input your secure email address.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    // Simulate recovery link dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-white">Reset Access Key</h3>
        <p className="text-xs text-slate-400">
          Request a secure cryptographic handshake link to rekey your access
          password
        </p>
      </div>

      {error && (
        <div className="text-xs font-semibold px-3 py-2.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
          {error}
        </div>
      )}

      {success ? (
        <div className="space-y-4 py-4 animate-fade-in">
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-slate-300 space-y-2 leading-relaxed">
            <p className="font-bold text-white flex items-center gap-1.5 text-[13px]">
              <span className="inline-block size-2 rounded-full bg-emerald-500 animate-ping" />
              Cryptographic Link Dispatched
            </p>
            <p className="text-[11px] text-slate-400">
              An access rekeying package has been securely sent to{" "}
              <strong className="text-violet-400">{email}</strong>. This secure
              token expires in exactly 15 minutes.
            </p>
          </div>

          <Link
            href="/reset-password"
            className="w-full rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-bold text-xs py-2.5 px-4 transition-colors flex items-center justify-center gap-2"
          >
            <span>Proceed to Key Reset Screen</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Operator Email Address
            </span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@revrebel.io"
                disabled={isSubmitting}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 disabled:opacity-50 transition-all duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs py-3 px-4 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-[0.98] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 mt-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Hashing Gateway Key...</span>
              </>
            ) : (
              <>
                <span>Send Key Recovery Email</span>
                <Send className="size-3.5" />
              </>
            )}
          </button>
        </form>
      )}

      <div className="pt-4 border-t border-slate-850 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Return to Gateway Login</span>
        </Link>
      </div>
    </div>
  );
}
