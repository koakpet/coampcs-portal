import Link from "next/link";
import {Landmark, CalendarDays, BadgeCheck, ArrowRight} from "lucide-react";

export default function LoanOverview() {
  const loan = {
    status: "Active",
    totalLoan: "₦1,000,000",
    outstanding: "₦750,000",
    monthlyRepayment: "₦25,000",
    nextRepayment: "15 August 2026",
    progress: 25, // Percentage repaid
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Loan Overview</h2>

          <p className="mt-2 text-slate-500">
            Track your active loan, repayments and upcoming payment schedule.
          </p>
        </div>

        <Link
          href="/dashboard/loans"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#0B1F4D] hover:text-[#0B1F4D]"
        >
          View Loan Details
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Top Cards */}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <Landmark size={34} className="text-[#0B1F4D]" />

          <p className="mt-6 text-sm text-slate-500">Loan Status</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            {loan.status}
          </h3>

          <span className="mt-4 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            In Good Standing
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <BadgeCheck size={34} className="text-emerald-600" />

          <p className="mt-6 text-sm text-slate-500">Original Loan</p>

          <h3 className="mt-2 text-2xl font-bold">{loan.totalLoan}</h3>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <CalendarDays size={34} className="text-blue-600" />

          <p className="mt-6 text-sm text-slate-500">Monthly Repayment</p>

          <h3 className="mt-2 text-2xl font-bold">{loan.monthlyRepayment}</h3>
        </div>
      </div>

      {/* Progress */}

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
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

          <div>
            <p className="text-sm text-slate-500">Next Repayment Date</p>

            <h3 className="mt-2 text-xl font-semibold text-slate-900">
              {loan.nextRepayment}
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
