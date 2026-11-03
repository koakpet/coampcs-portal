"use client";
import { useRole } from "./AdminProvider";
import { can } from "@/lib/permissions";
import PageHeader from "./PageHeader";

// Wrap a page in this. If the role can't view the area, show a clear message instead.
// NOTE: this only hides the screen. Real protection must also happen on the server.
export default function RequireAccess({ area, children }) {
  const role = useRole();
  if (can(role, area, "view")) return children;
  return (
    <>
      <PageHeader title="You don't have access to this page" />
      <p className="adm-empty">
        The {role} role can't open this section. Ask the Chairman if you think this is a mistake.
      </p>
    </>
  );
}
