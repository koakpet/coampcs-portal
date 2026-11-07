import CooperativeStats from "@/components/dashboard/admin/CooperativeStats";
import {getPortalContext} from "@/lib/auth/getPortalContext";
import getTotalDeductions from "@/lib/queries/deductions";

export default async function admin() {
  const {selectedCooperative} = await getPortalContext();

  const deductions = await getTotalDeductions(
    selectedCooperative.cooperative_code,
  );

  return (
    <>
      <CooperativeStats />
    </>
  );
}
