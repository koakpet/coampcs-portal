import {PiggyBank, Wallet, Landmark, UserCircle2} from "lucide-react";

const services = [
  {
    icon: PiggyBank,
    title: "Thrift Savings",
    description:
      "Build financial discipline through regular monthly savings while growing your personal financial security.",
  },
  {
    icon: Wallet,
    title: "Special Savings",
    description:
      "Save towards personal projects, emergencies, education, celebrations, or any future financial goal.",
  },
  {
    icon: Landmark,
    title: "Affordable Loans",
    description:
      "Access transparent and affordable loan facilities with fair repayment terms designed for cooperative members.",
  },
  {
    icon: UserCircle2,
    title: "Member Portal",
    description:
      "View your savings, submit loan applications, monitor repayments, download statements and receive important notices online.",
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
            Member Services
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Everything Members Need in One Secure Platform
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Our cooperative provides financial services that help members save
            consistently, access affordable loans, and conveniently manage their
            cooperative activities through a secure online portal.
          </p>
        </div>

        {/* Service Cards */}

        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#0B1F4D]/20 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B1F4D]/10 transition-colors duration-300 group-hover:bg-[#0B1F4D]">
                  <Icon
                    size={28}
                    className="text-[#0B1F4D] transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
