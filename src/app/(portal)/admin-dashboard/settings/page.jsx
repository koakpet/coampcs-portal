"use client";
import RequireAccess from "@/components/admin/RequireAccess";
import PageHeader from "@/components/admin/PageHeader";

export default function Page() {
  return (
    <RequireAccess area="settings">
      <PageHeader title="Settings" description="Payment types, roles and the activity log." />
      <p className="adm-empty">This section will be built next.</p>
    </RequireAccess>
  );
}
