import Navbar from "@/components/layout/Navbar";
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

      {children}
    </>
  );
}
