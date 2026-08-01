import Topbar from "@/components/dashboard/Topbar";
import WelcomeCard from "@/components/dashboard/WelcomeCard";
import SavingsOverview from "@/components/dashboard/SavingsOverview";
import LoanOverview from "@/components/dashboard/LoanOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import NotificationsPanel from "@/components/dashboard/NotificationsPanel";

export default function DashboardPage() {
  return (
    <>
      <Topbar />
      <div className="pt-27 px-12 flex gap-3">
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <WelcomeCard />
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
