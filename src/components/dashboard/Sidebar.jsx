import Link from "next/link";
import {
  LayoutDashboard,
  PiggyBank,
  Wallet,
  Landmark,
  FileText,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const items = [
  {name: "Dashboard", href: "/dashboard", icon: LayoutDashboard},
  {name: "Thrift Savings", href: "/dashboard/thrift", icon: PiggyBank},
  {name: "Special Savings", href: "/dashboard/special", icon: Wallet},
  {name: "Loans", href: "/dashboard/loans", icon: Landmark},
  {name: "Statements", href: "/dashboard/statements", icon: FileText},
  {name: "Notifications", href: "/dashboard/notifications", icon: Bell},
  {name: "Profile", href: "/dashboard/profile", icon: User},
  {name: "Settings", href: "/dashboard/settings", icon: Settings},
];

export default function Sidebar() {
  return (
    <aside className="hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B1F4D] text-white font-bold">
            CA
          </div>

          <div>
            <p className="font-semibold text-slate-900">CACSMCS</p>
            <p className="text-xs text-slate-500">Member Portal</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                item.name === "Dashboard"
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
