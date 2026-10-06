import Link from "next/link";
import {Landmark, CalendarDays, BadgeCheck, ArrowRight} from "lucide-react";

export default function LoanOverview() {
  const loan = {
    status: "Active",
    totalLoan: "1,000,000",
    outstanding: "750,000",
    monthlyRepayment: "25,000",
    progress: 3, // Percentage repaid
    standing: "Good standing",
  };

  return (
    <section className="p-6 flex flex-col items-start gap-6 border rounded-2xl border-slate-200 shadow-sm bg-white">
      {/* Header */}

      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            Loan Overview
          </h2>

          <p className="text-sm text-slate-500">
            Track your active loan, repayments and upcoming payment schedule.
          </p>
        </div>
        {/* <Link
          href="/dashboard/loans"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#0B1F4D] hover:text-[#0B1F4D]"
        >
          View Statement
          <ArrowRight size={16} />
        </Link> */}

        <Link
          href="/dashboard/loans"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-green-800 hover:text-green-800"
        >
          Apply<span className="hidden md:inline">for Loan</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Loan Cards */}
      <div className="w-full overflow-x-auto scrollbar-none">
        <div className="flex gap-3 w-max">
          <div className="w-60 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-500">Loan Status </p>

              <p className="p-2 rounded-sm bg-white shadow-sm">
                <Landmark size={34} className="text-[#0B1F4D]" />
              </p>
            </div>

            <div className="pt-15 flex items-center justify-between">
              <h3 className="pr-2 text-xl font-bold text-slate-900">
                {loan.status}
              </h3>

              <span className="rounded-full bg-green-100 py-1.5 px-3 tracking-tighter text-sm font-medium text-green-700">
                {loan.standing}
              </span>
            </div>
          </div>

          <div className="w-60 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-500">Original Loan </p>

              <p className="p-2 rounded-sm bg-white shadow-sm">
                <BadgeCheck size={34} className="text-emerald-600" />
              </p>
            </div>

            <div className="pt-15">
              <h3 className="pr-2 text-xl font-bold text-slate-900 text-right">
                ₦{loan.totalLoan}
              </h3>
            </div>
          </div>

          <div className="w-60 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-500">Monthly Repayment</p>

              <p className="p-2 rounded-sm bg-white shadow-sm">
                <CalendarDays size={34} className="text-blue-600" />
              </p>
            </div>

            <div className="pt-15">
              <h3 className="pr-2 text-xl font-bold text-slate-900 text-right">
                ₦{loan.monthlyRepayment}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">
            Loan Repayment Progress
          </h3>

          <span className="font-semibold text-[#0B1F4D]">{loan.progress}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-[#0B1F4D] transition-all duration-500"
            style={{
              width: `${loan.progress}%`,
            }}
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Outstanding Balance</p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {loan.outstanding}
            </h3>
          </div>
        </div>
      </div>

      {/* Demo Notice */}

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800">
          <strong>Presentation Mode:</strong> Loan values shown are
          demonstration data for stakeholder review and do not represent actual
          member records.
        </p>
      </div>
    </section>
  );
}
