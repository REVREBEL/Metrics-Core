"use client";

import { AlertTriangle, ArrowLeft, Check, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const hasMinLength = password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumber = /\d/.test(password);

  const isFormValid =
    hasMinLength &&
    hasSpecialChar &&
    hasNumber &&
    password === confirmPassword &&
    password !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError("Please satisfy all cryptographic security requirements.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    // Simulate database key rekeying
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-white">
          Cryptographic Rekey
        </h3>
        <p className="text-xs text-slate-400">
          Establish your new secure access credentials
        </p>
      </div>

      {error && (
        <div className="text-xs font-semibold px-3 py-2.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 flex items-center gap-2">
          <AlertTriangle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="space-y-4 py-8 flex flex-col items-center justify-center text-center animate-fade-in">
          <div className="size-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 animate-pulse">
            <Loader2 className="size-6 animate-spin" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">
              Access Key Synchronized
            </h4>
            <p className="text-[11px] text-emerald-400">
              Broadcasting credentials update...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              New Access Code Password
            </span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isSubmitting}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 disabled:opacity-50 transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Verify Access Code Password
            </span>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isSubmitting}
                className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-950/60 border border-slate-800 rounded-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 disabled:opacity-50 transition-all duration-300"
              />
            </div>
          </div>

          {/* Password complexity tracker */}
          <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-lg space-y-2">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Security Strength Standards
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-center gap-2">
                <div
                  className={`size-3.5 rounded-full flex items-center justify-center border transition-all ${
                    hasMinLength
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-800 text-slate-600"
                  }`}
                >
                  <Check className="size-2.5" />
                </div>
                <span
                  className={hasMinLength ? "text-slate-300" : "text-slate-500"}
                >
                  Minimum length of 8 symbols
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className={`size-3.5 rounded-full flex items-center justify-center border transition-all ${
                    hasSpecialChar
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-800 text-slate-600"
                  }`}
                >
                  <Check className="size-2.5" />
                </div>
                <span
                  className={
                    hasSpecialChar ? "text-slate-300" : "text-slate-500"
                  }
                >
                  Includes special character (e.g. !, @, #)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className={`size-3.5 rounded-full flex items-center justify-center border transition-all ${
                    hasNumber
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-800 text-slate-600"
                  }`}
                >
                  <Check className="size-2.5" />
                </div>
                <span
                  className={hasNumber ? "text-slate-300" : "text-slate-500"}
                >
                  Includes numeral value (0-9)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div
                  className={`size-3.5 rounded-full flex items-center justify-center border transition-all ${
                    password === confirmPassword && password !== ""
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-slate-800 text-slate-600"
                  }`}
                >
                  <Check className="size-2.5" />
                </div>
                <span
                  className={
                    password === confirmPassword && password !== ""
                      ? "text-slate-300"
                      : "text-slate-500"
                  }
                >
                  Password confirmation values match
                </span>
              </li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs py-3 px-4 shadow-lg shadow-violet-500/10 hover:shadow-violet-500/20 active:scale-[0.98] disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2 mt-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Broadcasting Cryptographic Key...</span>
              </>
            ) : (
              <span>Authorize Key Rekey</span>
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
