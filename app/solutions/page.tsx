import type { Metadata } from "next";
import { Check } from "lucide-react";
import FinalCTA from "@/components/sections/FinalCTA";
import Services from "@/components/sections/Services";
import { Container, PageHero, Reveal, Section, TiltCard } from "@/components/ui";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions | Exceed Enterprise Limited",
  description: "Design & brand services, premium physical products and custom software from one studio.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Everything your brand touches."
        lead="Three practices, one team — so what you see on screen is exactly what gets built, printed and installed."
      />

      <Section className="pt-0! md:pt-0!">
        <Container className="flex flex-col gap-24 md:gap-40">
          {solutions.map((solution, idx) => (
            <div key={solution.title} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <Reveal className={idx % 2 ? "md:order-2" : ""}>
                <p className="eyebrow mb-5">{String(idx + 1).padStart(2, "0")}</p>
                <h2 className="text-4xl md:text-6xl text-metal">{solution.title}</h2>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">{solution.desc}</p>
              </Reveal>
              <Reveal delay={120}>
                <TiltCard max={5} className="p-8 md:p-10">
                  <ul className="flex flex-col divide-y divide-border">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-4 py-4 text-foreground/90">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </Reveal>
            </div>
          ))}
        </Container>
      </Section>

      <Services />
      <FinalCTA />
    </>
  );
}
