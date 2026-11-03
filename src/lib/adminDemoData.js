// DEMO DATA ONLY. Replace each of these with real database queries later.
export const PERIOD = "November 2026";

const treasurer = {
  title: "Money in and money out",
  note: "Cash position for the month and payments waiting on you.",
  figures: [
    { label: "Deductions expected", value: 12450000, money: true },
    { label: "Paid out this month", value: 3180000, money: true },
    { label: "Awaiting disbursement", value: 1275000, money: true },
    { label: "Loans outstanding", value: 28900000, money: true },
  ],
  actions: [
    { count: 4, text: "payments are approved and waiting to be disbursed", href: "/admin-dashboard/payments", cta: "Review payments" },
    { count: 1, text: "vendor invoice needs a payment type", href: "/admin-dashboard/payments", cta: "Assign type" },
  ],
};

const finSec = {
  title: "Deductions and contributions",
  note: "Where this month's deductions and loan repayments stand.",
  figures: [
    { label: "Active members", value: 312 },
    { label: "Thrift this month", value: 4120000, money: true },
    { label: "Loan repayments due", value: 2760000, money: true },
    { label: "Deductions status", value: "Not generated" },
  ],
  actions: [
    { count: 1, text: "month still to generate: November 2026", href: "/admin-dashboard/deductions", cta: "Generate deductions" },
    { count: 7, text: "members have a mandate that looks unusual", href: "/admin-dashboard/deductions", cta: "Check mandates" },
  ],
};

const secretary = {
  title: "Membership and communication",
  note: "Member records and notices in your care.",
  figures: [
    { label: "Active members", value: 312 },
    { label: "Retired", value: 41 },
    { label: "Joined this year", value: 18 },
    { label: "Notices published", value: 6 },
  ],
  actions: [
    { count: 9, text: "member records are missing a phone number or bank detail", href: "/admin-dashboard/members", cta: "Fix records" },
    { count: 1, text: "notice is still a draft", href: "/admin-dashboard/notices", cta: "Open draft" },
  ],
};

const chairman = {
  title: "Decisions waiting for you",
  note: "Loan approvals and the health of the society at a glance.",
  figures: [
    { label: "Pending loan applications", value: 5 },
    { label: "Loans outstanding", value: 28900000, money: true },
    { label: "Total thrift held", value: 96400000, money: true },
    { label: "Active members", value: 312 },
  ],
  actions: [
    { count: 5, text: "loan applications need your approval", href: "/admin-dashboard/loans", cta: "Review loans" },
    { count: 2, text: "payments above the usual limit were recorded", href: "/admin-dashboard/payments", cta: "View payments" },
  ],
};

const pro = {
  title: "Notices and announcements",
  note: "What members have been told, and what is still unsent.",
  figures: [
    { label: "Notices published", value: 6 },
    { label: "Drafts", value: 1 },
    { label: "Active members", value: 312 },
  ],
  actions: [{ count: 1, text: "notice is still a draft", href: "/admin-dashboard/notices", cta: "Open draft" }],
};

export const DASHBOARDS = {
  Treasurer: treasurer,
  "Financial Secretary": finSec,
  Secretary: secretary,
  "Assist. Secretary": secretary,
  Chairman: chairman,
  "Vice Chairman": chairman,
  "Public Relations Officer": pro,
};

export const RECENT_ACTIVITY = [
  { when: "Today, 09:42", who: "Treasurer", what: "Recorded payment of ₦250,000 to a vendor (equipment)" },
  { when: "Yesterday", who: "Secretary", what: "Updated bank details for 3 members" },
  { when: "Yesterday", who: "Chairman", what: "Approved loan application for membership no. 0148" },
  { when: "30 Oct", who: "Financial Secretary", what: "Locked October 2026 deductions" },
  { when: "28 Oct", who: "Public Relations Officer", what: "Published notice: Annual General Meeting date" },
];

export const DEMO_MEMBERS = [
  { no: "0101", name: "Adaeze Okon", role: "Member", status: "Active", joined: "2016-03-14" },
  { no: "0102", name: "Bassey Etim", role: "Treasurer", status: "Active", joined: "2014-08-01" },
  { no: "0107", name: "Comfort Ita", role: "Member", status: "Retired", joined: "2009-11-20" },
  { no: "0113", name: "Emmanuel Effiong", role: "Secretary", status: "Active", joined: "2012-05-09" },
  { no: "0120", name: "Grace Archibong", role: "Member", status: "Withdrawn", joined: "2018-01-30" },
  { no: "0131", name: "Ime Udoh", role: "Member", status: "Deceased", joined: "2005-06-12" },
];
