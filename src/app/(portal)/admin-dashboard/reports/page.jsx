"use client";
import RequireAccess from "@/components/admin/RequireAccess";
import PageHeader from "@/components/admin/PageHeader";

export default function Page() {
  return (
    <RequireAccess area="reports">
      <PageHeader title="Reports" description="Summaries you can export to Excel or PDF." />
      <p className="adm-empty">This section will be built next.</p>
    </RequireAccess>
  );
}
