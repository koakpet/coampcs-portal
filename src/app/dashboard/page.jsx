import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
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
        <div className="flex flex-col gap-3">
          <WelcomeCard />
          <SavingsOverview />
          <LoanOverview />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </>
  );
}
