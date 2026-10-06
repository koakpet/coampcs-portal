import {Users, PiggyBank, Landmark, Clock} from "lucide-react";

const stats = [
  {
    label: "Total Members",
    value: "342",
    change: "+6 this month",
    icon: Users,
    bgColor: "bg-[#0B1F4D]/5",
    iconColor: "text-[#0B1F4D]",
    border: "border-[#0B1F4D]/10",
  },
  {
    label: "Total Cooperative Savings",
    value: "₦184,620,000",
    change: "+2.4% this month",
    icon: PiggyBank,
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    border: "border-emerald-100",
  },
  {
    label: "Active Loans",
    value: "₦46,300,000",
    change: "58 members",
    icon: Landmark,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-100",
  },
  {
    label: "Pending Approvals",
    value: "12",
    change: "Requires action",
    icon: Clock,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    border: "border-amber-100",
  },
];

export default function CooperativeStats() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className={`rounded-2xl border px-5 py-6 ${item.border} ${item.bgColor}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {item.label}
              </p>
              <p className="rounded-md bg-white p-2 shadow-sm">
                <Icon className={item.iconColor} size={22} />
              </p>
            </div>

            <h3 className="pt-6 text-2xl font-bold text-slate-900">
              {item.value}
            </h3>
            <p className="pt-1 text-xs text-slate-400">{item.change}</p>
          </div>
        );
      })}
    </div>
  );
}
