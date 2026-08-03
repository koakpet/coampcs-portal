"use client";

import Link from "next/link";
import {useState} from "react";
import {X, Eye, EyeOff, Lock, ShieldCheck, User} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [close, setClose] = useState(true);

  return (
    <>
      {close && (
        <section className="fixed insert-0 h-screen w-screen">
          <div className="w-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <button
                onClick={() => setClose(false)}
                className="absolute top-3 right-6 text-[#0B1F4D]"
              >
                <X size={15} />
              </button>

              <h1 className="py-9 text-3xl font-bold text-slate-900 text-center">
                Member Login
              </h1>

              {/* Form */}
              <form className="flex flex-col gap-12">
                <div className="flex flex-col gap-3">
                  {/* Membership Number */}
                  <div>
                    {/* <label className="mb-2 block text-sm font-medium text-slate-700">
              Membership Number
            </label> */}

                    <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-[#0B1F4D]">
                      <User size={18} className="text-slate-400" />

                      <input
                        type="text"
                        placeholder="Email Address"
                        className="w-full bg-transparent px-1.5 py-3 outline-none"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    {/* <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label> */}

                    <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-[#0B1F4D]">
                      <Lock size={18} className="text-slate-400" />

                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full bg-transparent px-1.5 py-3 outline-none"
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
          </div>
        </section>
      )}
    </>
  );
}
