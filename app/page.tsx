import Hero from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Clients from "@/components/sections/Clients";
import Services from "@/components/sections/Services";
import Recognition from "@/components/sections/Recognition";
import Process from "@/components/sections/Process";
import Founder from "@/components/sections/Founder";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import { Reveal } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      <div className="py-6 border-y border-border bg-background">
        <Marquee
          items={["EXCEED DESIGN", "ALL WORK, ALL RIGHTS", "HONIARA, SOLOMON ISLANDS"]}
          textClassName="text-lg font-bold uppercase tracking-widest text-foreground/50"
        />
      </div>

      <SelectedProjects />
      <Clients />
      <Services />
      <Recognition />
      <Process />
      <Founder />
      <Pricing />
      <FAQ />

      {/* Final CTA */}
      <section id="contact" className="relative py-24 bg-primary text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <Reveal className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl mb-6 text-white">Ready to Exceed your potential?</h2>
              <p className="text-white/80 text-lg">
                Join businesses who trust Exceed to deliver premium design, signage, and software solutions.
              </p>
            </div>
            <a
              href="mailto:simbi@exceed.com.sb"
              className="inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-widest text-sm transition-all bg-white text-primary hover:bg-white/90 px-10 py-5 shadow-xl active:scale-95 shrink-0"
            >
              Contact Strategy Team
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
