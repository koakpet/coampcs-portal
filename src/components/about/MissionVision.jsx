import {Eye, Target} from "lucide-react";

export default function MissionVision() {
  return (
    <section className="bg-white pt-36 pb-24 md:px-30 px-9">
      <div className="flex flex-col items-center gap-12">
        {/* Section Header */}
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
          • Our Foundation •
        </span>

        <div className="flex flex-col items-center gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Building Financial Security Through Cooperation
          </h2>

          <p className="text-lg text-slate-600 text-center">
            The Court of Appeal Calabar Staff Multi-Purpose Cooperative Society
            exists to promote financial wellbeing, responsible savings, and
            affordable access to credit for members through transparency,
            accountability, and collective growth.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Mission */}
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex gap-3 items-center pb-6">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F4D]/10">
                <Target className="text-[#0B1F4D]" size={28} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
            </div>

            <p className="mt-5 leading-8 text-slate-600">
              To provide reliable savings and loan services that empower members
              to achieve financial stability while maintaining the highest
              standards of integrity, transparency, and service excellence.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex gap-3 items-center pb-6">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F4D]/10">
                <Eye className="text-emerald-700" size={28} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
            </div>

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
