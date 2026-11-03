"use client";
import { useState } from "react";
import { useRole } from "@/components/admin/AdminProvider";
import RequireAccess from "@/components/admin/RequireAccess";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import { can } from "@/lib/permissions";
import { DEMO_MEMBERS } from "@/lib/adminDemoData";

const STATUSES = ["All", "Active", "Retired", "Deceased", "Withdrawn"];

export default function MembersPage() {
  const role = useRole();
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");

  const rows = DEMO_MEMBERS.filter(
    (m) =>
      (status === "All" || m.status === status) &&
      m.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <RequireAccess area="members">
      <PageHeader title="Members" description="Everyone on the cooperative's register.">
        {can(role, "members", "edit") && <button className="adm-btn">Add member</button>}
      </PageHeader>

      {!can(role, "members", "edit") && (
        <p className="adm-note">The {role} role can view member records but not change them.</p>
      )}

      <div className="adm-filters">
        <input type="search" placeholder="Search by name" value={query}
               onChange={(e) => setQuery(e.target.value)} aria-label="Search members" />
        <div className="adm-seg" role="group" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button key={s} className={status === s ? "is-on" : ""} onClick={() => setStatus(s)}>{s}</button>
          ))}
        </div>
      </div>

      <DataTable
        empty="No members match this search."
        columns={[
          { key: "no", label: "Membership no." },
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "status", label: "Status", render: (m) => <span className={`adm-chip st-${m.status.toLowerCase()}`}>{m.status}</span> },
          { key: "joined", label: "Joined", align: "right" },
        ]}
        rows={rows}
      />
    </RequireAccess>
  );
}
