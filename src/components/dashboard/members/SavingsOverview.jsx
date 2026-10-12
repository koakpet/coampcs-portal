import Link from "next/link";
import {
  PiggyBank,
  Wallet,
  Gift,
  ArrowRight,
  AlertCircle,
  House,
  LandPlot,
} from "lucide-react";

const savings = [
  {
    title: "Thrift",
    dataKey: "thrift",
    icon: PiggyBank,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
    description: "Regular monthly savings",
  },
  {
    title: "Special Savings",
    dataKey: "special_savings",
    icon: Wallet,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    description: "Savings for personal goals",
  },
  {
    title: "Commodity",
    dataKey: "commodity",
    icon: Gift,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    description: "Xmas commodity",
  },
  {
    title: "Rent",
    dataKey: "rent",
    icon: House,
    bgColor: "bg-[#0B1F4D]/5",
    iconColor: "text-[#0B1F4D]",
    border: "border-[#0B1F4D]/10",
    description: "Savings for rent",
  },
  {
    title: "Land Payment",
    dataKey: "land",
    icon: LandPlot,
    bgColor: "bg-[#0B1F4D]/5",
    iconColor: "text-[#0B1F4D]",
    border: "border-[#0B1F4D]/10",
    description: "Land payment tracker",
  },
  // {
  //   title: "Total Savings",
  //   amount: "2,830,000",
  //   contribution: "5,000",
  //   icon: Landmark,
  //   bgColor: "bg-[#0B1F4D]/5",
  //   iconColor: "text-[#0B1F4D]",
  //   border: "border-[#0B1F4D]/10",
  //   description: "Combined savings balance",
  // },
];

function formatNaira(amount) {
  return Number(amount ?? 0).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function SavingsOverview({deductions, mandate}) {
  return (
    <>
      <section className="p-3 md:p-6 flex flex-col items-start gap-6 border rounded-2xl border-slate-200 shadow-sm bg-white">
        {/* Header */}

        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900">
              Savings Overview
            </h2>
            <p className="text-sm text-slate-500">
              All your current savings balances; monitor your financial growth.
            </p>
          </div>
          <Link
            href="/dashboard/statements"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-600 hover:text-indigo-600"
          >
            Action <ArrowRight size={16} />
          </Link>
        </div>

        {/* Saving Cards */}
        <div className="w-full overflow-x-auto scrollbar-none">
          <div className="flex gap-3 w-max">
            {savings
              .filter((item) => {
                if (item.dataKey === "rent" || item.dataKey === "land") {
                  return Number(mandate?.[item.dataKey] ?? 0) > 0;
                }

                return true;
              })
              .map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`w-60 px-3 md:px-6 py-6 md:py-9 border rounded-2xl ${item.border} ${item.bgColor} hover:shadow-lg`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-slate-500">
                        {item.title}{" "}
                      </p>

                      <p className="p-2 rounded-md md:rounded-sm bg-white shadow-sm">
                        <Icon className={item.iconColor} size={30} />
                      </p>
                    </div>

                    <h3 className="pt-9 md:pt-12 text-2xl font-bold text-right text-slate-900">
                      ₦
                      {item.dataKey
                        ? formatNaira(deductions?.[item.dataKey])
                        : item.amount}
                    </h3>
                    <p className="text-xs text-right text-slate-400">
                      Monthly Deduction:
                      <span className="text-slate-500">
                        ₦
                        {item.dataKey
                          ? formatNaira(mandate?.[item.dataKey])
                          : item.amount}
                      </span>
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
