"use client";
import { createContext, useContext, useState } from "react";
import SubNav from "./SubNav";
import { EXECUTIVE_ROLES } from "@/lib/permissions";

// The context lets any admin page ask: "which role is using me?"
const RoleContext = createContext({ role: "Treasurer" });
export const useRole = () => useContext(RoleContext).role;

// realRole: pass the logged-in member's role once login is wired up.
// While it is missing, a "Viewing as" menu lets you preview every role.
export default function AdminProvider({ children, realRole }) {
  const [previewRole, setPreviewRole] = useState("Treasurer");
  const role = realRole ?? previewRole;

  return (
    <RoleContext.Provider value={{ role }}>
      <div className="adm">
        {!realRole && (
          <div className="adm-previewbar">
            <label>
              Viewing as
              <select value={previewRole} onChange={(e) => setPreviewRole(e.target.value)}>
                {EXECUTIVE_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </label>
            <span>Preview only. Remove once login supplies the role.</span>
          </div>
        )}
        <SubNav role={role} />
        {children}
      </div>
    </RoleContext.Provider>
  );
}
