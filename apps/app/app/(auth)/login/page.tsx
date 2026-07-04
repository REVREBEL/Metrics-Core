"use client";

import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all security parameters.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    // Simulate cryptographic handshake and secure login
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/metrics");
      }, 1000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-white">
          Gateway Authorization
        </h3>
        <p className="text-xs text-slate-400">
          Enter credentials to access the metrics infrastructure
        </p>
      </div>

      {error && (
        <div className="text-xs font-semibold px-3 py-2.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
          {error}
        </div>
      )}

      {success ? (
        <div className="space-y-4 py-8 flex flex-col items-center justify-center text-center animate-fade-in">
          <div className="size-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 animate-pulse">
            <Loader2 className="size-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">
              Session Authenticated
            </h4>
            <p className="text-[11px] text-emerald-400">
              Initializing workspace nodes...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Secure Email Address
            </span>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@revrebel.io"
                disabled={isSubmitting}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 disabled:opacity-50 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Access Key Password
              </span>
              <Link
                href="/forgot-password"
                className="text-[10px] font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                Forgot Key?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isSubmitting}
                className="w-full pl-9 pr-10 py-2.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 disabled:opacity-50 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isSubmitting}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs py-3 px-4 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-[0.98] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 group mt-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Decrypting Access Tokens...</span>
              </>
            ) : (
              <>
                <span>Authorize Connection</span>
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>
      )}

      <div className="pt-4 border-t border-slate-850 text-center">
        <p className="text-[11px] text-slate-450">
          First time terminal user?{" "}
          <Link
            href="/register"
            className="font-bold text-violet-400 hover:text-violet-300 transition-colors inline-flex items-center gap-0.5"
          >
            Request Node Credentials
          </Link>
        </p>
      </div>
    </div>
  );
}
