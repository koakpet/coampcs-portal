"use client";
import RequireAccess from "@/components/admin/RequireAccess";
import PageHeader from "@/components/admin/PageHeader";

export default function Page() {
  return (
    <RequireAccess area="payments">
      <PageHeader title="Payments" description="Payments and withdrawals to members and vendors." />
      <p className="adm-empty">This section will be built next.</p>
    </RequireAccess>
  );
}
