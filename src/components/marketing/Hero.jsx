"use client";

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import ProductShowcase from "./ProductShowcase";
import {useState} from "react";
import LoginForm from "../login/LoginForm";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <LoginForm />}
      <div className="pt-30 pb-15 px-1 md:px-6 flex">
        {/* LEFT SIDE */}
        <div className="flex-1">
          <div className="inline-flex px-3 py-1 rounded-full text-slate-600 border border-slate-300 bg-slate-200">
            • Official Members Portal •
          </div>

          {/* Heading */}
          <h1 className="py-3 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
            Together We <br className="hidden md:block " />
            <span className="text-green-500">Save</span>.
            <br />
            Together We <br className="hidden md:block " />
            <span className="text-blue-500">Grow</span>.
          </h1>

          {/* Misson */}
          <p className="pb-8 max-w-xl md:text-lg md:leading-8 text-slate-600">
            A secure digital platform that gives members access to their
            savings, loans, repayments and cooperative services from anywhere.
          </p>

          {/* Redirect Buttons */}

          <div className="flex gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="rounded-full border border-[#0B1F4D] bg-[#0B1F4D] hover:bg-[#0233a5] text-white hover:border-[#0B1F4D] px-5 py-3"
            >
              Member Login
            </button>
            <Link
              href="/about"
              className="rounded-full border border-slate-300 hover:border-[#0B1F4D] px-5 py-3"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <ProductShowcase />
      </div>
    </>
  );
}
