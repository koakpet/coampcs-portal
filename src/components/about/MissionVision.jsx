import {Eye, Target} from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
            Our Foundation
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Building Financial Security Through Cooperation
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            The Court of Appeal Calabar Staff Multi-Purpose Cooperative Society
            exists to promote financial wellbeing, responsible savings, and
            affordable access to credit for members through transparency,
            accountability, and collective growth.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Mission */}
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F4D]/10">
              <Target className="text-[#0B1F4D]" size={28} />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>

            <p className="mt-5 leading-8 text-slate-600">
              To provide reliable savings and loan services that empower members
              to achieve financial stability while maintaining the highest
              standards of integrity, transparency, and service excellence.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
              <Eye className="text-emerald-700" size={28} />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>

            <p className="mt-5 leading-8 text-slate-600">
              To be a trusted and innovative cooperative society that enhances
              the financial wellbeing of every member through sustainable
              cooperative practices, digital innovation, and shared prosperity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
