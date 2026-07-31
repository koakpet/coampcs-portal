import {CalendarDays, UserCircle2, BadgeCheck} from "lucide-react";

export default function WelcomeCard() {
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mb-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1F4D] via-[#16356D] to-[#214C94] p-8 text-white shadow-xl">
        {/* Background Decoration */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 h-40 w-40 rounded-full bg-white/5 blur-2xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left Side */}
          <div>
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              Member Dashboard
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight">
              Good Morning, Demo Member
            </h1>

            <p className="mt-3 max-w-2xl text-lg text-slate-200">
              Welcome to the Court of Appeal Calabar Staff Multi-Purpose
              Cooperative Society Member Portal. Manage your savings, loan
              applications and account information securely.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <UserCircle2 size={18} />

                <span>Membership No: DEMO-001</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={18} />

                <span>{today}</span>
              </div>
            </div>
          </div>

          {/* Right Side */}

          <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Dashboard Status</h3>

              <BadgeCheck className="text-green-300" size={22} />
            </div>

            <div className="mt-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-slate-200">Account Status</span>

                <span className="font-semibold">Active</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-200">Last Login</span>

                <span className="font-semibold">Today</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-200">Security</span>

                <span className="font-semibold">Protected</span>
              </div>
            </div>

            {/* Demo Badge */}

            <div className="mt-8 rounded-xl border border-amber-300/40 bg-amber-400/10 p-3 text-sm text-amber-100">
              <strong>Presentation Mode</strong>

              <p className="mt-1 text-xs leading-5">
                This dashboard currently displays demonstration data for
                stakeholder presentation purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
