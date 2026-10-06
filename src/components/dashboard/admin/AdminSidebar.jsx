"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Landmark,
  Bell,
  PiggyBank,
  Settings,
  LogOut,
} from "lucide-react";

const items = [
  {name: "Overview", href: "/admin", icon: LayoutDashboard},
  {name: "Members", href: "/admin/members", icon: Users},
  {name: "Loan Approvals", href: "/admin/loans", icon: Landmark},
  {name: "Savings", href: "/admin/savings", icon: PiggyBank},
  {name: "Notices", href: "/admin/notices", icon: Bell},
  {name: "Settings", href: "/admin/settings", icon: Settings},
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B1F4D] text-white font-bold">
            CA
          </div>

          <div>
            <p className="font-semibold text-slate-900">CoA-MPCS</p>
            <p className="text-xs text-slate-500">Executive Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-[#0B1F4D] text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
