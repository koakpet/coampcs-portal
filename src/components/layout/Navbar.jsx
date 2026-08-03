"use client";

import Link from "next/link";
import Logo from "./Logo";
import {Menu, X} from "lucide-react";
import {useState} from "react";
import LoginForm from "../login/LoginForm";

// const navLinks = [
//   {name: "About", href: "/about"},
//   {name: "Services", href: "/services"},
//   {name: "Notices", href: "/notices"},
//   {name: "Contact", href: "/contact"},
// ];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0">
        <nav className="bg-white/80 border border-slate-200/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          <div className="flex h-20 items-center justify-between px-3 md:px-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1">
              <Logo />
            </Link>

            {/* <div className="hidden md:flex items-center gap-9">
            <div className="items-center gap-5 flex">
              {navLinks.map((link) => {
                return (
                  <Link key={link.name} href={link.href}>
                    <span className="text-sm font-medium text-gray-600 transition hover:text-[#0B1F4D]">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            <Link
              href="/login"
              className="hidden md:block bg-[#0B1F4D] rounded-lg px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-white text-sm font-semibold">Login</span>
            </Link>
          </div>

          <button
            className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="transition-all duration-500 flex flex-col gap-9 items-start md:hidden border-t border-slate-200 px-6 py-6">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                return (
                  <Link key={link.name} href={link.href}>
                    <span className="text-sm font-medium text-gray-600 transition hover:text-[#0B1F4D]">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div> 

            <Link
              href="/login"
              className="bg-[#0B1F4D] rounded-lg px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-white text-sm font-semibold">Login</span>
            </Link>
          </div>
        )} */}
            {/* <button className="bg-[#0B1F4D] rounded-lg px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <span className="text-white text-sm font-semibold">Login</span>
            </button> */}

            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle Login"
              aria-expanded={open}
              className="bg-[#0B1F4D] rounded-lg px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="text-white text-sm font-semibold">Login</span>
            </button>
          </div>
        </nav>

        {/* {open && <LoginForm />} */}
      </header>
      {open && <LoginForm />}
    </>
  );
}
