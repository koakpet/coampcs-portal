import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/marketing/Hero";
import Signature from "@/components/layout/Signature";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-8 lg:px-10">
        <Hero />
      </div>
      <Signature />
    </>
  );
}
