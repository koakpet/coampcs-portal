"use client";

import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Landmark,
  FileText,
  Bell,
  User,
  Settings,
  LogOut,
  Repeat2,
} from "lucide-react";
import SelectCooperative from "../popups/SelectCooperative";
import {useState} from "react";

const links = [
  {name: "Dashboard", href: "/dashboard", icon: LayoutDashboard},
  {name: "Statements", href: "/dashboard/statements", icon: FileText},
  {name: "Loan Summary", href: "/dashboard/loans", icon: Landmark},
  {name: "Notifications", href: "/dashboard/notifications", icon: Bell},
  {name: "Mandate", href: "/dashboard/settings", icon: Settings},
  {name: "Profile", href: "/dashboard/profile", icon: User},
];

const baseClasses =
  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition";
const activeClasses = "bg-[#0B1F4D] text-white shadow-lg";
const inactiveClasses =
  "text-slate-600 hover:bg-slate-100 hover:text-slate-900";

export default function Sidebar({user, menu, admin}) {
  const [showCooperatives, setShowCooperatives] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    try {
      const response = await fetch("/api/auth/logout", {method: "POST"});
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
      <aside className="fixed flex flex-col mt-20 pb-20 w-72 border-r border-slate-200 bg-white h-screen">
        <nav className="flex-1 space-y-1 p-4">
          {links.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");

            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}

          {admin.role !== "Member" && (
            <Link
              href="/admin-dashboard"
              className={`${baseClasses} ${
                pathname.startsWith("/admin-dashboard")
                  ? activeClasses
                  : inactiveClasses
              }`}
            >
              <Repeat2 size={20} /> Admin Dashboard
            </Link>
          )}

          {menu.length > 1 && (
            <button
              className={`${baseClasses} ${inactiveClasses}`}
              type="button"
              onClick={() => setShowCooperatives(true)}
            >
              <Repeat2 size={20} /> Switch Cooperative
            </button>
          )}
        </nav>

        <div className="grid gap-3 py-4 mx-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl py-3 text-sm font-medium text-red-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <LogOut size={20} />
            Logout
          </button>

          <div className="md:hidden flex gap-1.5">
            <div className="overflow-hidden h-9 w-9 rounded-full border border-[#0B1F4D]">
              <Image src="/user.jpg" width={90} height={90} alt="user_image" />
            </div>

            <div className="flex flex-col ">
              <p className="text-sm font-semibold text-slate-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-slate-500">{admin.role}</p>
            </div>
          </div>
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
