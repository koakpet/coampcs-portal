import "./admin.css";
import AdminProvider from "@/components/admin/AdminProvider";

export const metadata = {title: "Executive office | CoA-MPCS"};

// This layout sits INSIDE the (portal) layout, so your navbar and sidebar still wrap it.
// Later: read the logged-in member's role on the server and pass it as realRole.
export default function AdminLayout({children}) {
  return <AdminProvider>{children}</AdminProvider>;
}
