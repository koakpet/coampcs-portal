"use client";
import Link from "next/link";
import { useRole } from "@/components/admin/AdminProvider";
import PageHeader from "@/components/admin/PageHeader";
import DataTable from "@/components/admin/DataTable";
import { DASHBOARDS, RECENT_ACTIVITY, PERIOD } from "@/lib/adminDemoData";

const naira = (n) => "₦" + new Intl.NumberFormat("en-NG").format(n);

export default function AdminOverview() {
  const role = useRole();
  const view = DASHBOARDS[role];

  return (
    <>
      <PageHeader title={view.title} description={`${PERIOD}. ${view.note}`} />

      <section className="adm-glance" aria-label="Key figures">
        {view.figures.map((f) => (
          <div key={f.label}>
            <span className="adm-fig">{f.money ? naira(f.value) : f.value}</span>
            <span className="adm-figlabel">{f.label}</span>
          </div>
        ))}
      </section>

      <div className="adm-split">
        <section>
          <h2>Needs your attention</h2>
          <ul className="adm-actions">
            {view.actions.map((a) => (
              <li key={a.text}>
                <span className="adm-count">{a.count}</span>
                <span className="adm-actiontext">{a.text}</span>
                <Link href={a.href} className="adm-btn adm-btn-quiet">{a.cta}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Recent activity</h2>
          <DataTable
            columns={[
              { key: "when", label: "When" },
              { key: "who", label: "By" },
              { key: "what", label: "What happened" },
            ]}
            rows={RECENT_ACTIVITY}
          />
        </section>
      </div>
    </>
  );
}
