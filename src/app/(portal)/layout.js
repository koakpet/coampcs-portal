import Navbar from "@/components/layout/Navbar";
import QuickActions from "@/components/layout/QuickActions";
import SelectCooperative from "@/components/popups/SelectCooperative";
import {getPortalContext} from "@/lib/auth/getPortalContext";

export default async function PortalLayout({children}) {
  const {user, memberships, selectedCooperative} = await getPortalContext();

  if (!selectedCooperative) {
    return <SelectCooperative cooperative={memberships} />;
  }

  return (
    <>
      <Navbar
        user={user}
        memberships={selectedCooperative}
        menu={memberships}
      />
      <div className="pt-27 px-3 md:px-12 md:flex gap-3">
        <div className="md:grow">{children}</div>
        <div className="w-80">
          <QuickActions />
        </div>
      </div>
    </>
  );
}
