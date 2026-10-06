"use client";

import {redirect, useRouter} from "next/navigation";
import Link from "next/link";
import {useState} from "react";
import {X, Eye, EyeOff, Lock, ShieldCheck, User} from "lucide-react";
import {escapeIdentifier} from "pg";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [close, setClose] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push("/dashboard");
        return;
      }

      setError(data.message);
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {close && (
        <section className="fixed inset-0 h-screen w-screen">
          <div className="w-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <button
                onClick={() => setClose(false)}
                className="absolute top-3 right-6 text-[#0B1F4D]"
              >
                <X size={15} />
              </button>

              <h1 className="py-9 text-3xl font-bold text-slate-900 text-center">
                Member Login
              </h1>

              <form onSubmit={handleLogin} className="flex flex-col gap-12">
                <div className="flex flex-col gap-3">
                  {/* Email */}
                  <div>
                    <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-[#0B1F4D]">
                      <User size={18} className="text-slate-400" />

                      <input
                        type="text"
                        placeholder="Email Address or Phone Number"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full bg-transparent px-1.5 py-3 outline-none"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-[#0B1F4D]">
                      <Lock size={18} className="text-slate-400" />

                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  {error && <p className="text-sm text-red-600">{error}</p>}

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
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#0B1F4D] py-4 text-lg font-semibold text-white transition hover:opacity-90"
                >
                  {loading ? "Logging in..." : "Login"}
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
