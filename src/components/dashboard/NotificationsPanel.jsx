import Link from "next/link";
import {
  Bell,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Monthly Thrift Savings Posted",
    message:
      "Your July thrift savings contribution has been successfully credited.",
    date: "Today",
    type: "success",
  },
  {
    id: 2,
    title: "Annual General Meeting",
    message:
      "The Annual General Meeting will hold on 20 August 2026 at the Court of Appeal Hall.",
    date: "2 days ago",
    type: "info",
  },
  {
    id: 3,
    title: "Loan Repayment Reminder",
    message: "Your next loan repayment is due on 15 August 2026.",
    date: "3 days ago",
    type: "warning",
  },
];

const styles = {
  success: {
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
    bg: "bg-emerald-50",
    badge: "bg-emerald-100 text-emerald-700",
    label: "Success",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-600",
    bg: "bg-blue-50",
    badge: "bg-blue-100 text-blue-700",
    label: "Notice",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-amber-600",
    bg: "bg-amber-50",
    badge: "bg-amber-100 text-amber-700",
    label: "Reminder",
  },
};

export default function NotificationsPanel() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notifications</h2>

          <p className="mt-2 text-slate-500">
            Recent updates from the cooperative.
          </p>
        </div>

        <div className="relative">
          <Bell className="text-slate-600" size={24} />

          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
            {notifications.length}
          </span>
        </div>
      </div>

      {/* Notification List */}

      <div className="space-y-5">
        {notifications.map((item) => {
          const style = styles[item.type];
          const Icon = style.icon;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border border-slate-200 ${style.bg} p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Icon className={style.iconColor} size={22} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.message}
                  </p>

                  <p className="mt-3 text-xs text-slate-500">{item.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <Link
        href="/dashboard/notifications"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F4D] transition hover:gap-3"
      >
        View All Notifications
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}
