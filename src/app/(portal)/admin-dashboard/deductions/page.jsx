"use client";
import RequireAccess from "@/components/admin/RequireAccess";
import PageHeader from "@/components/admin/PageHeader";

export default function Page() {
  return (
    <RequireAccess area="deductions">
      <PageHeader title="Deductions" description="Generate and review monthly deductions from the mandate." />
      <p className="adm-empty">This section will be built next.</p>
    </RequireAccess>
  );
}
