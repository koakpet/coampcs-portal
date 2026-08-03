import Link from "next/link";
import {
  PiggyBank,
  Wallet,
  Landmark,
  ArrowRight,
  AlertCircle,
  House,
} from "lucide-react";

const savings = [
  {
    title: "Thrift",
    amount: "2,350,000",
    contribution: "5,000",
    icon: PiggyBank,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
    description: "Regular monthly savings",
  },
  {
    title: "Special Savings",
    amount: "480,000",
    contribution: "3,000",
    icon: Wallet,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    description: "Savings for personal goals",
  },
  {
    title: "Rent",
    amount: "830,000",
    contribution: "4,000",
    icon: House,
    bgColor: "bg-[#0B1F4D]/5",
    iconColor: "text-[#0B1F4D]",
    border: "border-[#0B1F4D]/10",
    description: "Special savings for rent",
  },
  {
    title: "Total Savings",
    amount: "2,830,000",
    contribution: "5,000",
    icon: Landmark,
    bgColor: "bg-[#0B1F4D]/5",
    iconColor: "text-[#0B1F4D]",
    border: "border-[#0B1F4D]/10",
    description: "Combined savings balance",
  },
];

export default function SavingsOverview() {
  return (
    <>
      <section className="p-3 md:p-6 flex flex-col items-start gap-6 border rounded-2xl border-slate-200 shadow-sm bg-white">
        {/* Header */}

        <div className="w-full flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Savings Overview
            </h2>
            <p className="mt-2 text-slate-500">
              All your current savings balances; monitor your financial growth.
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

        {/* Saving Cards */}
        <div className="w-full overflow-x-auto scrollbar-none">
          <div className="flex gap-3 w-max">
            {savings.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`w-60 px-3 md:px-6 py-6 md:py-9 border rounded-2xl ${item.border} ${item.bgColor} hover:shadow-lg`}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-500">{item.title} </p>

                    <p className="p-2 rounded-md md:rounded-sm bg-white shadow-sm">
                      <Icon className={item.iconColor} size={30} />
                    </p>
                  </div>

                  <h3 className="pt-9 md:pt-12 text-2xl font-bold text-right text-slate-900">
                    ₦{item.amount}
                  </h3>
                  <p className="text-xs text-right text-slate-400">
                    Monthly Deduction:
                    <span className="text-slate-500">₦{item.contribution}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
