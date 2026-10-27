import {redirect} from "next/navigation";
import {cookies} from "next/headers";

import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {
  getMembershipByUserId,
  getMembershipByIdForUser,
} from "@/lib/queries/memberships";

export async function getPortalContext() {
  // 1. Check whether the user is logged in
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  // 2. Retrieve the user's cooperative memberships
  const allMemberships = await getMembershipByUserId(user.userId);

  // Only active memberships can be accessed
  const memberships = allMemberships.filter(
    (membership) => membership.status?.toUpperCase() === "ACTIVE",
  );

  // 3. User must have at least one active membership
  if (memberships.length === 0) {
    redirect("/");
  }

  let selectedCooperative = null;

  // 4. If the user has only one membership, select it automatically
  if (memberships.length === 1) {
    selectedCooperative = memberships[0];
  }

  // 5. If the user has multiple memberships, check the selection cookie
  if (memberships.length > 1) {
    const cookieStore = await cookies();

    const membershipId = cookieStore.get("selected_cooperative")?.value;

    if (membershipId) {
      selectedCooperative = await getMembershipByIdForUser(
        membershipId,
        user.userId,
      );
    }
  }

  // 6. Return the portal information
  return {
    user,
    memberships,
    selectedCooperative,
  };
}
