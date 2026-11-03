"use client";
import RequireAccess from "@/components/admin/RequireAccess";
import PageHeader from "@/components/admin/PageHeader";

export default function Page() {
  return (
    <RequireAccess area="notices">
      <PageHeader title="Notices" description="Announcements members will see." />
      <p className="adm-empty">This section will be built next.</p>
    </RequireAccess>
  );
}
