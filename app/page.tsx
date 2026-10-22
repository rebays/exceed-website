import Hero from "@/components/Hero";
import Statement from "@/components/sections/Statement";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Process from "@/components/sections/Process";
// Founder section hidden for now — restore this import and <Founder /> to bring it back.
// import Founder from "@/components/sections/Founder";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Services />
      <Work />
      <Process />
      {/* <Founder /> */}
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
