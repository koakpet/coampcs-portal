import Link from "next/link";
import Image from "next/image";
import {Phone, Mail, UserCircle2} from "lucide-react";

const executives = [
  {
    id: 0,
    position: "Chairman",
    title: "Mr.",
    name: "Nathaniel Essien",
    Surfix: "esq.",
    phone: "+234 806 592 6052",
    email: "",
    image: "/user.jpg",
  },
  {
    id: 1,
    position: "Vice Chairman",
    title: "Mr.",
    name: "Christopher Udom",
    Surfix: "",
    phone: "+234 703 289 1980",
    email: "",
    image: "/user.jpg",
  },
  {
    id: 2,
    position: "Secretary",
    title: "Mr.",
    name: "Kohly Akpet",
    Surfix: "",
    phone: "+234 803 697 0656",
    email: "koakpet@yahoo.co.uk",
    image: "/kohly_akpet.jpg",
  },
  {
    id: 3,
    position: "Assist. Secretary",
    title: "Mr.",
    name: "Timothy Idu",
    Surfix: "",
    phone: "+234 906 755 2867",
    email: "",
    image: "/user.jpg",
  },
  {
    id: 4,
    position: "Financial Secretary",
    title: "Mrs.",
    name: "Bassey Ikpeme",
    Surfix: "",
    phone: "",
    email: "",
    image: "/user.jpg",
  },
  {
    id: 5,
    position: "Treasurer",
    title: "Mr.",
    name: "Eval Alobo",
    Surfix: "",
    phone: "+234 805 578 3491",
    email: "",
    image: "/user.jpg",
  },
  {
    id: 6,
    position: "Public Relations Officer",
    title: "Mr.",
    name: "Ikuma Ikuma",
    Surfix: "",
    phone: "+234 806 748 6879",
    email: "ikumajoncoa@gmail.com",
    image: "/user.jpg",
  },
];

export default function Contact() {
  return (
    <section className="bg-slate-50 py-18 md:px-30">
      <div className="flex flex-col items-center gap-9">
        {/* Section Header */}
        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
          • Executive Committee •
        </span>

        <div className="flex flex-col items-center gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Contact the Executive Committee
          </h2>

          <p className="text-lg text-slate-600 text-center">
            For enquiries regarding savings, loans, membership or other
            cooperative matters, members may contact any member of the Executive
            Committee.
          </p>
        </div>

        {/* Executive Cards */}

        <div className="w-full overflow-x-auto scrollbar-none">
          <div className="flex gap-6">
            {executives.map((exco) => (
              <div
                key="exco.id"
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Avatar */}

                <div className="flex items-center gap-3">
                  <div className="h-18 w-18 rounded-2xl overflow-hidden">
                    <Image
                      src={exco.src}
                      alt="akpet_picture"
                      height="120"
                      width="120"
                      className="object-fill"
                    />
                  </div>

                  <div>
                    {/* Name */}

                    <h3 className="text-2xl font-bold text-slate-700">
                      Kohly Akpet
                    </h3>

                    {/* Position */}

                    <p className="text-sm  tracking-wider font-semibold text-slate-900">
                      Secretary
                    </p>
                  </div>
                </div>

                <div className="pt-9">
                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-emerald-600" />
                    <a
                      href="tel:+2348036970656"
                      className="text-blue-700 hover:text-blue-400 text-sm"
                    >
                      +234 803 697 0656
                    </a>
                  </div>
                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-600" />

                    <a
                      href="malto:koakpet@yahoo.co.uk"
                      className="text-blue-700 hover:text-blue-400 text-sm"
                    >
                      koakpet@yahoo.co.uk
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
