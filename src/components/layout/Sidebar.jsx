"use client";

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
  Repeat2,
} from "lucide-react";
import {useRouter} from "next/navigation";
import SelectCooperative from "../popups/SelectCooperative";
import {useState} from "react";

const items = [
  {name: "Dashboard", href: "/dashboard", icon: LayoutDashboard},
  // {name: "Thrift Savings", href: "/dashboard/thrift", icon: PiggyBank},
  // {name: "Special Savings", href: "/dashboard/special", icon: Wallet},
  // {name: "Loans", href: "/dashboard/loans", icon: Landmark},
  {name: "Statements", href: "/dashboard/statements", icon: FileText},
  {name: "Notifications", href: "/dashboard/notifications", icon: Bell},
  {name: "Mandate", href: "/dashboard/settings", icon: Settings},
  {name: "Profile", href: "/dashboard/profile", icon: User},
];

export default function Sidebar({menu, admin}) {
  const [showCooperatives, setShowCooperatives] = useState(false);

  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.success) {
        router.push("/");
      }
    } catch (error) {
      console.error("Log out error", error);
    }
  }

  return (
    <>
      <aside className="fixed mt-20 w-72 border-r border-slate-200 bg-white h-screen">
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
          {admin.role != "MEMBER" && (
            <Link
              href="/admin-dashboard"
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              <Repeat2 size={20} /> Admin Dashboard
            </Link>
          )}

          {menu.length > 1 && (
            <button
              className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              type="button"
              onClick={() => setShowCooperatives(true)}
            >
              <Repeat2 size={20} /> Switch Cooperative
            </button>
          )}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
      {showCooperatives && (
        <SelectCooperative
          cooperative={menu}
          onClose={() => setShowCooperatives(false)}
        />
      )}
    </>
  );
}
