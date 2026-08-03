"use client";

import {CalendarDays, UserCircle2, BadgeCheck} from "lucide-react";

export default function WelcomeCard() {
  const now = new Date();
  const hour = now.getHours();

  let greeting = "Good Evening";

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = now.toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="p-6 rounded-2xl text-white bg-gradient-to-r from-[#0B1F4D] via-[#16356D] to-[#214C94] shadow-xl">
        <div className="inline-flex px-4 py-2 rounded-full  bg-white/15 text-sm font-medium">
          • Member Dashboard •
        </div>
        <div className="font-bold text-5xl md:text-4xl pt-3">
          {greeting}, Kohly Akpet
        </div>
        <p className="inline-flex pt-1.5 text-sm">
          <UserCircle2 size={18} /> &nbsp;Membership No.: DEMO-0001
        </p>
      </div>
    </>
  );
}
