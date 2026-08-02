import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import {Bell, Search} from "lucide-react";

export default function Topbar() {
  return (
    <>
      <header className="fixed inset-x-0 top-0">
        <nav className="px-3 md:px-6 flex justify-between items-center bg-white/80 border border-slate-200/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <button className="relative rounded-2xl bg-slate-100 p-3 hover:bg-slate-200">
              <Bell size={18} className="text-slate-600" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* User Details */}
            <button className="flex items-center gap-1.5">
              {/* User Image */}
              <div className="relative overflow-hidden h-9 w-9 rounded-full border border-[#0B1F4D]">
                <Image
                  src="/user.jpg"
                  width={120}
                  height={120}
                  alt="user_image"
                />

                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </div>

              {/* Username */}
              <div className="hidden md:flex flex-col items-start">
                <p className="text-xs font-semibold text-slate-900">
                  Kohly Akpet
                </p>
                <p className="text-xs text-slate-500">Member</p>
              </div>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
