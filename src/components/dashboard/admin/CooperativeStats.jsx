import {Users, PiggyBank, Wallet, FileText, HandCoins} from "lucide-react";

const currencyFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export default function CooperativeStats({allocation, allocationMonth}) {
  const currency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });

  const stats = [
    {
      label: `${allocationMonth} Allocation`,
      value: currency(allocation),
      change: "+2.4% this month",
      icon: PiggyBank,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      border: "border-emerald-100",
    },
    {
      label: "Month Disbursement",
      value: "₦4,620,000",
      change: "+6 this month",
      icon: Wallet,
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
      border: "border-indigo-100",
    },
    {
      label: "Loans Request",
      value: "₦3,300,000",
      change: "58 members",
      icon: FileText,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      border: "border-blue-100",
    },
    {
      label: "Loan Disbursed",
      value: "₦1,300,000",
      change: "Requires action",
      icon: HandCoins,
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      border: "border-amber-100",
    },
    {
      label: "Total Members",
      value: "342",
      change: "+6 this month",
      icon: Users,
      bgColor: "bg-[#0B1F4D]/5",
      iconColor: "text-[#0B1F4D]",
      border: "border-[#0B1F4D]/10",
    },
  ];

  return (
    <div className="w-full overflow-x-scroll scrollbar-none md:border md:border-slate-200 md:p-1.5 md:rounded-2xl">
      <div className="flex gap-3 w-max">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`w-56 rounded-2xl border px-5 py-6 ${item.border} ${item.bgColor}`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <p className="rounded-md bg-white p-2 shadow-sm">
                  <Icon className={item.iconColor} size={22} />
                </p>
              </div>

              <h3 className="pt-6 text-2xl font-bold text-slate-900 text-right">
                {item.value}
              </h3>
              <p className="pt-1 text-xs text-slate-400 text-right">
                {item.change}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
