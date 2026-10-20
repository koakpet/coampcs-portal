import {redirect} from "next/navigation";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {getMembershipByUserId} from "@/lib/queries/memberships";
import {getSelectedCooperative} from "@/lib/auth/getSelectedCooperative";

export async function getPortalContext() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const memberships = await getMembershipByUserId(user.userId);

  if (!memberships || memberships.length === 0) {
    redirect("/");
  }

  let selectedCooperative;

  if (memberships.length === 1) {
    selectedCooperative = memberships[0];
  } else {
    selectedCooperative = await getSelectedCooperative();
  }

  return {
    user,
    memberships,
    selectedCooperative,
  };
}
