"use client";

import {useState} from "react";
import {ListCheck, X} from "lucide-react";
import {useRouter} from "next/navigation";

export default function SelectCooperative({cooperative, onClose}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  async function handleSelect(membershipId) {
    try {
      setLoading(true);
      setSelectedId(membershipId);
      setError("");

      const response = await fetch("/api/cooperative/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          membershipId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.message || "Unable to select cooperative.");
        setLoading(false);
        return;
      }

      // Close only when this popup was opened
      // from the Sidebar.
      if (onClose) {
        onClose();
      }

      router.refresh();
    } catch (error) {
      console.error("Cooperative selection error:", error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={20} />
          </button>
        )}

        <h1 className="py-6 text-center text-2xl font-bold text-slate-900">
          Select Cooperative
        </h1>

        <p className="mb-6 text-center text-sm text-slate-500">
          You belong to more than one cooperative. Select one to continue.
        </p>

        <div className="flex flex-col gap-3">
          {cooperative.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={loading}
              onClick={() => handleSelect(item.id)}
              className="w-full rounded-xl border border-slate-200 px-5 py-4 text-left transition hover:border-[#0B1F4D] hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <p className="font-semibold text-slate-900">
                {item.cooperative_name}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Membership No: {item.membership_number}
              </p>

              <p className="mt-1 text-xs text-slate-400">{item.role}</p>
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-4 text-center text-sm text-red-600">{error}</p>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <ListCheck size={18} className="text-green-600" />

          {loading && selectedId
            ? "Setting up your cooperative..."
            : "Select a cooperative to proceed"}
        </div>
      </div>
    </section>
  );
}
