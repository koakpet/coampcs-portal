import Link from "next/link";
import {ArrowRight} from "lucide-react";

const members = [
  {
    name: "Blessing Okoro",
    membershipNo: "CACS-0339",
    department: "Registry",
    joined: "Aug 1, 2026",
    status: "Active",
  },
  {
    name: "Emmanuel Udo",
    membershipNo: "CACS-0340",
    department: "Admin",
    joined: "Jul 28, 2026",
    status: "Active",
  },
  {
    name: "Patience Nnamdi",
    membershipNo: "CACS-0341",
    department: "Registry",
    joined: "Jul 25, 2026",
    status: "Pending",
  },
];

const statusStyle = {
  Active: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
};

export default function RecentMembersWidget() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            Recently Joined Members
          </h2>
          <p className="text-sm text-slate-500">
            New membership registrations.
          </p>
        </div>
        <Link
          href="/admin/members"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-slate-100">
        {members.map((m) => (
          <div
            key={m.membershipNo}
            className="flex items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
          >
            <div>
              <p className="font-semibold text-slate-900">{m.name}</p>
              <p className="text-xs text-slate-500">
                {m.membershipNo} · {m.department} · Joined {m.joined}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[m.status]}`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
