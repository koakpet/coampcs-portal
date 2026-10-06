import {redirect} from "next/navigation";
import {getCurrentUser} from "@/lib/auth/getCurrentUser";
import {getMembershipByUserId} from "@/lib/queries/memberships";
import Navbar from "@/components/layout/Navbar";
import WelcomeCard from "@/components/dashboard/members/WelcomeCard";
import SavingsOverview from "@/components/dashboard/members/SavingsOverview";
import LoanOverview from "@/components/dashboard/members/LoanOverview";
import QuickActions from "@/components/dashboard/members/QuickActions";
import SelectCooperative from "@/components/popups/SelectCooperative";
import {getSelectedCooperative} from "@/lib/auth/getSelectedCooperative";
import NotificationsPanel from "@/components/dashboard/members/NotificationsPanel";

export default async function DashboardPage() {
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

    if (!selectedCooperative) {
      return <SelectCooperative cooperative={memberships} />;
    }
  }

  return (
    <>
      <Navbar
        user={user}
        memberships={selectedCooperative}
        menu={memberships}
      />
      <div className="pt-27 px-3 md:px-12 md:flex gap-3">
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <WelcomeCard user={user} memberships={selectedCooperative} />
          <SavingsOverview />
          <LoanOverview />
        </div>
        <div className="w-80">
          <QuickActions />
        </div>
      </div>
    </>
  );
}
