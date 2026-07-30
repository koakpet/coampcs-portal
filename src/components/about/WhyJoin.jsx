import {ShieldCheck, Landmark, Smartphone, Users} from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description:
      "Members' savings and loan records are managed with accountability, transparency, and secure digital processes.",
  },
  {
    icon: Landmark,
    title: "Affordable Loan Facilities",
    description:
      "Eligible members can access affordable loans with fair repayment terms designed to support financial wellbeing.",
  },
  {
    icon: Smartphone,
    title: "Digital Member Portal",
    description:
      "Access your cooperative account anytime to view savings, apply for loans, track repayments, and receive important notices.",
  },
  {
    icon: Users,
    title: "Built for Court of Appeal Staff",
    description:
      "Exclusively designed to serve the financial needs of staff of the Court of Appeal Calabar Division through cooperative principles.",
  },
];

export default function WhyJoin() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
            Why Members Trust Us
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Built on Trust, Service and Financial Empowerment
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our cooperative exists to help members achieve financial stability
            through responsible savings, affordable credit, and a secure,
            transparent digital experience.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#0B1F4D]/20 hover:bg-white hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F4D]/10 transition-colors duration-300 group-hover:bg-[#0B1F4D]">
                  <Icon
                    size={28}
                    className="text-[#0B1F4D] transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-xl font-bold text-slate-900">
                  {reason.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Statistics */}
        <div className="mt-20 rounded-3xl bg-[#0B1F4D] px-8 py-12 text-white">
          <div className="grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-4xl font-bold">250+</h3>
              <p className="mt-2 text-slate-300">Active Members</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">₦180M+</h3>
              <p className="mt-2 text-slate-300">Total Member Savings</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">98%</h3>
              <p className="mt-2 text-slate-300">Loan Recovery Rate</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold">12+</h3>
              <p className="mt-2 text-slate-300">Years of Service</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
