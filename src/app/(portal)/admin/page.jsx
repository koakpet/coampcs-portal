import CooperativeStats from "@/components/dashboard/admin/CooperativeStats";
import LoanApprovalsTable from "@/components/dashboard/admin/LoanApprovalsTable";
import {getPortalContext} from "@/lib/auth/getPortalContext";
import getTotalDeductions from "@/lib/queries/deductions";
import getTotalDisbursementMade from "@/lib/queries/transactions";

export default async function admin() {
  const {selectedCooperative} = await getPortalContext();

  const deductions = await getTotalDeductions(
    selectedCooperative.cooperative_code,
  );

  const loan = await getTotalDisbursementMade(
    selectedCooperative.cooperative_code,
  );

  console.log(loan);

  return (
    <>
      <CooperativeStats
        allocation={deductions.allocation}
        allocationMonth={deductions.allocation_month.trim()}
        loanDisbursed={loan.loan_disbursed}
      />
      <LoanApprovalsTable />
    </>
  );
}
