import Contact from "@/components/about/Contact";
import MissionVision from "@/components/about/MissionVision";
import ServicesOverview from "@/components/about/ServicesOverview";
import WhyJoin from "@/components/about/WhyJoin";
import Navbar from "@/components/layout/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <MissionVision />
      <Contact />
      {/* <ServicesOverview />
      <WhyJoin /> */}
    </>
  );
}
