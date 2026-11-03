"use client";
import RequireAccess from "@/components/admin/RequireAccess";
import PageHeader from "@/components/admin/PageHeader";

export default function Page() {
  return (
    <RequireAccess area="loans">
      <PageHeader title="Loans" description="Applications, approvals and repayments." />
      <p className="adm-empty">This section will be built next.</p>
    </RequireAccess>
  );
}
