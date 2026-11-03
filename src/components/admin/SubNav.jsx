"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, can } from "@/lib/permissions";

// A tab bar for the admin area. Your own sidebar and navbar stay as they are.
export default function SubNav({ role }) {
  const pathname = usePathname();
  const links = NAV.filter((item) => item.area === null || can(role, item.area, "view"));

  return (
    <nav className="adm-tabs" aria-label="Executive sections">
      <span className="adm-tabs-role">{role}</span>
      {links.map((item) => {
        const active = item.href === "/admin-dashboard" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href}
                className={active ? "is-active" : ""} aria-current={active ? "page" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
