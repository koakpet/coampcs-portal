import Link from "next/link";
import {PiggyBank, Wallet, Landmark, ArrowRight} from "lucide-react";

const savings = [
  {
    title: "Thrift Savings",
    amount: "₦2,350,000",
    icon: PiggyBank,
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
    description: "Regular monthly savings",
  },
  {
    title: "Special Savings",
    amount: "₦480,000",
    icon: Wallet,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    description: "Savings for personal goals",
  },
  {
    title: "Total Savings",
    amount: "₦2,830,000",
    icon: Landmark,
    color: "bg-[#0B1F4D]/5",
    iconColor: "text-[#0B1F4D]",
    border: "border-[#0B1F4D]/10",
    description: "Combined savings balance",
  },
];

export default function SavingsOverview() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Savings Overview
          </h2>

          <p className="mt-2 text-slate-500">
            View your current savings balances and monitor your financial
            growth.
          </p>
        </div>

        <Link
          href="/dashboard/statements"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#0B1F4D] hover:text-[#0B1F4D]"
        >
          View Statement
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Savings Cards */}

      <div className="grid gap-6 lg:grid-cols-3">
        {savings.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`rounded-2xl border ${item.border} ${item.color} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm`}
                >
                  <Icon size={28} className={item.iconColor} />
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                  Demo
                </span>
              </div>

              <p className="mt-8 text-sm font-medium text-slate-500">
                {item.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                {item.amount}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
