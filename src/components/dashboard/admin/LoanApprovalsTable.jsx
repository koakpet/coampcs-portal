"use client";

import {useState} from "react";
import {Check, X, Eye} from "lucide-react";

const loans = [
  {
    id: "LN-2026-041",
    member: "Grace Effiong",
    type: "Personal Loan",
    amount: "600,000",
    date: "Aug 2, 2026",
    status: "Pending",
  },
  {
    id: "LN-2026-042",
    member: "Okon Bassey",
    type: "Emergency Loan",
    amount: "250,000",
    date: "Aug 3, 2026",
    status: "Pending",
  },
  {
    id: "LN-2026-043",
    member: "Ima Etim",
    type: "Personal Loan",
    amount: "1,200,000",
    date: "Aug 4, 2026",
    status: "Pending",
  },
  {
    id: "LN-2026-038",
    member: "Blessing Okoro",
    type: "Personal Loan",
    amount: "400,000",
    date: "Jul 22, 2026",
    status: "Approved",
  },
  {
    id: "LN-2026-033",
    member: "Emmanuel Udo",
    type: "Emergency Loan",
    amount: "150,000",
    date: "Jul 15, 2026",
    status: "Rejected",
  },
];

const tabs = ["Pending", "Approved", "Rejected", "All"];

const statusStyle = {
  Pending: "bg-amber-50 text-amber-700",
  Approved: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-red-50 text-red-700",
};

export default function LoanApprovalsTable() {
  const [tab, setTab] = useState("Pending");

  const filtered =
    tab === "All" ? loans : loans.filter((l) => l.status === tab);

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
          Loan Applications
        </h2>
        <p className="text-sm text-slate-500">
          Review and act on member loan requests.
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition ${
              tab === t
                ? "bg-[#0B1F4D] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="pb-3 font-medium">Loan ID</th>
              <th className="pb-3 font-medium">Member</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((l) => (
              <tr key={l.id}>
                <td className="py-4 font-medium text-slate-700">{l.id}</td>
                <td className="py-4 font-semibold text-slate-900">
                  {l.member}
                </td>
                <td className="py-4 text-slate-600">{l.type}</td>
                <td className="py-4 font-medium text-slate-900">
                  ₦{l.amount}
                </td>
                <td className="py-4 text-slate-600">{l.date}</td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[l.status]}`}
                  >
                    {l.status}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      title="View details"
                    >
                      <Eye size={16} />
                    </button>
                    {l.status === "Pending" && (
                      <>
                        <button
                          className="flex items-center gap-1 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                          title="Approve"
                        >
                          <Check size={14} /> Approve
                        </button>
                        <button
                          className="flex items-center gap-1 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                          title="Reject"
                        >
                          <X size={14} /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400">
                  No {tab.toLowerCase()} loan applications.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
