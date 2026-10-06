"use client";

import {Bell, Menu} from "lucide-react";

export default function AdminTopbar({onMenuClick}) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <nav className="flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-slate-900 md:text-xl">
              Executive Dashboard
            </h1>
            <p className="text-xs text-slate-500">
              Court of Appeal Calabar Staff MPCS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-6">
          <button className="relative rounded-2xl bg-slate-100 p-3 hover:bg-slate-200">
            <Bell size={18} className="text-slate-600" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0B1F4D] bg-[#0B1F4D]/5 text-sm font-semibold text-[#0B1F4D]">
              CT
            </div>
            <div className="hidden flex-col items-start md:flex">
              <p className="text-xs font-semibold text-slate-900">
                Chidi Thomas
              </p>
              <p className="text-xs text-slate-500">Treasurer</p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
