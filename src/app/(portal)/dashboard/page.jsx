import {getPortalContext} from "@/lib/auth/getPortalContext";
import {getDeductionTotals} from "@/lib/queries/deductions";
import {getMandate} from "@/lib/queries/mandate";
import {getTransactionsMade} from "@/lib/queries/transactions";
import WelcomeCard from "@/components/dashboard/members/WelcomeCard";
import SavingsOverview from "@/components/dashboard/members/SavingsOverview";
import LoanOverview from "@/components/dashboard/members/LoanOverview";
import QuickActions from "@/components/dashboard/members/QuickActions";
import NotificationsPanel from "@/components/dashboard/members/NotificationsPanel";

export default async function DashboardPage() {
  const {user, selectedCooperative} = await getPortalContext();

  const deductionsTotal = await getDeductionTotals(selectedCooperative.id);
  const mandateDeductions = await getMandate(selectedCooperative.id);
  const transactionsMade = await getTransactionsMade(selectedCooperative.id);

  return (
    <>
      <div className="pt-27 px-3 md:px-12 md:flex gap-3">
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          {/* Demo Notice */}
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Development Notice:</strong> Please be notified that the
              values shown may be incorrect as members full records have not
              been completely uploaded to the dataase.
            </p>
          </div>

          <WelcomeCard user={user} memberships={selectedCooperative} />
          <SavingsOverview
            deductions={deductionsTotal}
            mandate={mandateDeductions}
          />
          <LoanOverview
            mandate={mandateDeductions}
            transaction={transactionsMade}
          />

          {/* Demo Notice */}
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Development Notice:</strong> Please be notified that the
              values shown may be incorrect as members full records have not
              been completely uploaded to the dataase.
            </p>
          </div>
        </div>
        <div className="w-80">
          <QuickActions />
        </div>
      </div>
    </>
  );
}
