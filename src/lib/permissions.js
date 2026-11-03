// One place that decides who can do what. Edit the role lists to match your constitution.
export const EXECUTIVE_ROLES = [
  "Chairman",
  "Vice Chairman",
  "Secretary",
  "Assist. Secretary",
  "Treasurer",
  "Financial Secretary",
  "Public Relations Officer",
];

const ALL = EXECUTIVE_ROLES;

export const PERMISSIONS = {
  members:    { view: ALL, edit: ["Secretary", "Assist. Secretary"] },
  deductions: { view: ["Chairman", "Vice Chairman", "Secretary", "Treasurer", "Financial Secretary"], generate: ["Financial Secretary"] },
  loans:      { view: ["Chairman", "Vice Chairman", "Treasurer", "Financial Secretary"], approve: ["Chairman", "Vice Chairman"] },
  payments:   { view: ["Chairman", "Vice Chairman", "Treasurer", "Financial Secretary"], create: ["Treasurer"] },
  notices:    { view: ALL, edit: ["Chairman", "Secretary", "Assist. Secretary", "Public Relations Officer"] },
  reports:    { view: ALL },
  settings:   { view: ["Chairman", "Secretary"] },
};

export function can(role, area, action = "view") {
  return PERMISSIONS[area]?.[action]?.includes(role) ?? false;
}

// Sidebar links. "area: null" means every executive sees it.
export const NAV = [
  { href: "/admin-dashboard", label: "Overview", area: null, icon: "home" },
  { href: "/admin-dashboard/members", label: "Members", area: "members", icon: "people" },
  { href: "/admin-dashboard/deductions", label: "Deductions", area: "deductions", icon: "ledger" },
  { href: "/admin-dashboard/loans", label: "Loans", area: "loans", icon: "coins" },
  { href: "/admin-dashboard/payments", label: "Payments", area: "payments", icon: "send" },
  { href: "/admin-dashboard/notices", label: "Notices", area: "notices", icon: "bell" },
  { href: "/admin-dashboard/reports", label: "Reports", area: "reports", icon: "chart" },
  { href: "/admin-dashboard/settings", label: "Settings", area: "settings", icon: "gear" },
];

// Use this in YOUR existing sidebar to decide whether to show an "Admin" link.
export function isExecutive(role) {
  return EXECUTIVE_ROLES.includes(role);
}
