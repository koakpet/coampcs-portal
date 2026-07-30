import Link from "next/link";
import {Building2, Mail, Phone} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-300 bg-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1F4D] text-white font-bold">
                CA
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Court of Appeal Calabar
                </h3>

                <p className="text-sm text-slate-500">
                  Staff Multi-Purpose Cooperative Society
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Providing secure savings, affordable loans and financial
              empowerment exclusively for staff of the Court of Appeal Calabar
              Division.
            </p>
          </div>

          {/* Quick Links */}

          <div>
            <h4 className="mb-5 font-semibold text-slate-900">Quick Links</h4>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-[#0B1F4D]"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="text-slate-600 hover:text-[#0B1F4D]"
                >
                  Services
                </Link>
              </li>

              <li>
                <Link
                  href="/notices"
                  className="text-slate-600 hover:text-[#0B1F4D]"
                >
                  Notices
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-[#0B1F4D]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Member Portal */}

          <div>
            <h4 className="mb-5 font-semibold text-slate-900">Member Portal</h4>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-[#0B1F4D]"
                >
                  Member Login
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="text-slate-600 hover:text-[#0B1F4D]"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/savings"
                  className="text-slate-600 hover:text-[#0B1F4D]"
                >
                  Savings
                </Link>
              </li>

              <li>
                <Link
                  href="/loans"
                  className="text-slate-600 hover:text-[#0B1F4D]"
                >
                  Loan Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h4 className="mb-5 font-semibold text-slate-900">Contact</h4>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Building2 size={18} className="mt-1 text-[#0B1F4D]" />

                <p className="text-sm leading-6 text-slate-600">
                  Court of Appeal Calabar Division
                  <br />
                  Calabar, Cross River State
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#0B1F4D]" />

                <p className="text-sm text-slate-600">info@cacsmcs.org</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#0B1F4D]" />

                <p className="text-sm text-slate-600">+234 XXX XXX XXXX</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-500 md:flex-row">
            <p>
              © {new Date().getFullYear()} Court of Appeal Calabar Staff
              Multi-Purpose Cooperative Society. All rights reserved.
            </p>

            <p>
              Designed & Developed by{" "}
              <a
                href="https://yourportfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#0B1F4D] hover:underline"
              >
                Kohly Akpet
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
