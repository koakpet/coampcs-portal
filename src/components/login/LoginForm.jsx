"use client";

import Link from "next/link";
import {useState} from "react";
import {Eye, EyeOff, Lock, ShieldCheck, User} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="mx-auto max-w-md px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        {/* Logo / Title */}

        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B1F4D] text-white text-2xl font-bold">
            CA
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Member Login
          </h1>

          <p className="mt-3 text-slate-600">
            Access your savings, loans and cooperative services securely.
          </p>
        </div>

        {/* Form */}

        <form className="space-y-6">
          {/* Membership Number */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Membership Number
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-[#0B1F4D]">
              <User size={18} className="text-slate-400" />

              <input
                type="text"
                placeholder="Enter your membership number"
                className="w-full bg-transparent px-3 py-4 outline-none"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-[#0B1F4D]">
              <Lock size={18} className="text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full bg-transparent px-3 py-4 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-slate-500" />
                ) : (
                  <Eye size={18} className="text-slate-500" />
                )}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="font-medium text-[#0B1F4D] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#0B1F4D] py-4 text-lg font-semibold text-white transition hover:opacity-90"
          >
            Login
          </button>
        </form>

        {/* Security Notice */}

        <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <ShieldCheck size={18} className="text-green-600" />
          Secure encrypted member access
        </div>
      </div>
    </section>
  );
}
