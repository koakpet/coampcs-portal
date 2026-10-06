"use client";

import {useState} from "react";
import {Search, MoreVertical} from "lucide-react";

const allMembers = [
  {
    name: "Blessing Okoro",
    membershipNo: "CACS-0339",
    department: "Registry",
    savings: "420,000",
    status: "Active",
  },
  {
    name: "Emmanuel Udo",
    membershipNo: "CACS-0340",
    department: "Admin",
    savings: "1,180,000",
    status: "Active",
  },
  {
    name: "Patience Nnamdi",
    membershipNo: "CACS-0341",
    department: "Registry",
    savings: "0",
    status: "Pending",
  },
  {
    name: "Grace Effiong",
    membershipNo: "CACS-0298",
    department: "Finance",
    savings: "2,350,000",
    status: "Active",
  },
  {
    name: "Okon Bassey",
    membershipNo: "CACS-0301",
    department: "Registry",
    savings: "760,000",
    status: "Active",
  },
  {
    name: "Ima Etim",
    membershipNo: "CACS-0312",
    department: "Admin",
    savings: "95,000",
    status: "Suspended",
  },
];

const statusStyle = {
  Active: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Suspended: "bg-red-50 text-red-700",
};

const filters = ["All", "Active", "Pending", "Suspended"];

export default function MembersTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = allMembers.filter((m) => {
    const matchesFilter = filter === "All" || m.status === filter;
    const matchesQuery =
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.membershipNo.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
            Members
          </h2>
          <p className="text-sm text-slate-500">
            {allMembers.length} registered members of the cooperative.
          </p>
        </div>

        <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-[#0B1F4D] md:w-72">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or ID"
            className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-none">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition ${
              filter === f
                ? "bg-[#0B1F4D] text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="pb-3 font-medium">Member</th>
              <th className="pb-3 font-medium">Department</th>
              <th className="pb-3 font-medium">Total Savings</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((m) => (
              <tr key={m.membershipNo}>
                <td className="py-4">
                  <p className="font-semibold text-slate-900">{m.name}</p>
                  <p className="text-xs text-slate-500">{m.membershipNo}</p>
                </td>
                <td className="py-4 text-slate-600">{m.department}</td>
                <td className="py-4 font-medium text-slate-900">
                  ₦{m.savings}
                </td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[m.status]}`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-slate-400">
                  No members match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
