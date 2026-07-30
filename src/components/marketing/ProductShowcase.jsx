import {
  ArrowRight,
  PiggyBank,
  Wallet,
  FileText,
  Bell,
  CreditCard,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: PiggyBank,
    title: "Thrift Savings",
    description: "Track monthly savings contributions",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: Wallet,
    title: "Special Savings",
    description: "Manage flexible savings goals",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: CreditCard,
    title: "Loan Applications",
    description: "Apply and monitor loan requests online",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: ShieldCheck,
    title: "Loan Repayment Tracking",
    description: "View repayment schedules and balances",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: FileText,
    title: "Account Statements",
    description: "Download official PDF statements",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Bell,
    title: "Member Notifications",
    description: "Receive notices, approvals, and reminders",
    color: "bg-rose-100 text-rose-700",
  },
];

export default function ProductShowcase() {
  return (
    <>
      {/* App Window */}
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
        {/* Window Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-blue-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div className="font-medium text-sm text-slate-600">
            CoA-MPCS Portal
          </div>

          <div className="h-6 w-6 rounded-full bg-slate-100" />
        </div>

        {/* Portal Preview */}
        <div className="p-6">
          {/* Security Banner */}
          <div className="pb-3">
            <div className="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Secure Member Access
                </p>
                <p className="text-xs text-green-700">
                  Authentication required to view account information
                </p>
              </div>

              <ShieldCheck className="text-green-700" size={22} />
            </div>
          </div>

          {/* Feature grid */}
          <div className="grid gap-2 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.color}`}
                    >
                      <Icon size={22} />
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom status */}
          <div className="pt-3">
            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Members-Only Platform
                </p>
                <p className="text-xs text-slate-500">
                  Designed for members of the Court of Appeal Calabar Staff MPCS
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-slate-700">
                  Secure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
