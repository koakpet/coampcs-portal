import Link from "next/link";
import {
  Landmark,
  FileText,
  Wallet,
  UserCircle2,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Apply for Loan",
    description: "Submit a new loan application.",
    href: "/dashboard/loans/apply",
    icon: Landmark,
    color: "bg-[#0B1F4D]/10",
    iconColor: "text-[#0B1F4D]",
  },
  {
    title: "Savings Statement",
    description: "View or download your savings statement.",
    href: "/dashboard/statements/savings",
    icon: FileText,
    color: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    title: "Loan Statement",
    description: "View your repayment schedule and loan history.",
    href: "/dashboard/statements/loans",
    icon: Wallet,
    color: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    title: "My Profile",
    description: "Update your personal information.",
    href: "/dashboard/profile",
    icon: UserCircle2,
    color: "bg-amber-100",
    iconColor: "text-amber-700",
  },
];

export default function QuickActions() {
  return (
    <section className="hidden md:block rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}

      <div className="mb-8 bg-white">
        <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>

        <p className="mt-2 text-slate-500">Frequently used member services.</p>
      </div>

      {/* Action Cards */}

      <div className="flex flex-col gap-3 pt-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B1F4D]/20 hover:bg-slate-50 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
                >
                  <Icon size={26} className={action.iconColor} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {action.description}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={20}
                className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#0B1F4D]"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
