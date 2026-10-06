import {cookies} from "next/headers";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {getMembershipByIdForUser} from "@/lib/queries/memberships";

export async function getSelectedCooperative() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const cookieStore = await cookies();

  const membershipId = cookieStore.get("selected_cooperative")?.value;

  if (!membershipId) {
    return null;
  }

  const membership = await getMembershipByIdForUser(membershipId, user.userId);

  return membership;
}
