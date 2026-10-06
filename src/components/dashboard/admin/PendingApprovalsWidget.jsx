import Link from "next/link";
import {ArrowRight, Check, X} from "lucide-react";

const pending = [
  {
    id: "LN-2026-041",
    member: "Grace Effiong",
    type: "Personal Loan",
    amount: "600,000",
    date: "Aug 2, 2026",
  },
  {
    id: "LN-2026-042",
    member: "Okon Bassey",
    type: "Emergency Loan",
    amount: "250,000",
    date: "Aug 3, 2026",
  },
  {
    id: "LN-2026-043",
    member: "Ima Etim",
    type: "Personal Loan",
    amount: "1,200,000",
    date: "Aug 4, 2026",
  },
];

export default function PendingApprovalsWidget() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            Pending Loan Approvals
          </h2>
          <p className="text-sm text-slate-500">
            Applications waiting on executive review.
          </p>
        </div>
        <Link
          href="/admin/loans"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-slate-100">
        {pending.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-slate-900">{item.member}</p>
              <p className="text-xs text-slate-500">
                {item.type} · {item.id} · {item.date}
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <p className="font-bold text-slate-900">₦{item.amount}</p>

              <div className="flex items-center gap-2">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
