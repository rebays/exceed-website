import type { Metadata } from "next";
import FinalCTA from "@/components/sections/FinalCTA";
import Founder from "@/components/sections/Founder";
import { Stats } from "@/components/sections/Process";
import { Container, PageHero, Reveal, Section, SectionHeading, TiltCard } from "@/components/ui";
import { leaders } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Exceed Enterprise Limited",
  description: "Exceed Enterprise Limited: a Honiara studio that never settles for good enough.",
};

const PRINCIPLES = [
  { label: "Our vision", text: "To be trusted, innovative and profitable." },
  { label: "Our mission", text: "To deliver and exceed customer expectations." },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Never settle for good enough."
        lead="Exceed Enterprise Limited was founded on a simple idea: businesses deserve design, fabrication and software that push past what's expected."
      />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRINCIPLES.map((item, idx) => (
            <Reveal key={item.label} delay={idx * 100}>
              <TiltCard max={4} className="p-10 md:p-14 min-h-[280px] flex flex-col justify-between">
                <p className="eyebrow">{item.label}</p>
                <p className="mt-10 text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight text-foreground">
                  {item.text}
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>

      <Section>
        <Container>
          <Stats />
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <SectionHeading
            eyebrow="Leadership"
            title="The people you meet are the ones doing the work."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {leaders.map((leader, idx) => (
              <Reveal key={leader.name} delay={idx * 100}>
                <TiltCard max={5} className="p-8">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#1a1a1c] to-black border border-border flex items-center justify-center mb-8">
                    <span className="text-7xl font-semibold tracking-[-0.05em] text-metal">{initials(leader.name)}</span>
                  </div>
                  <h3 className="text-2xl text-foreground">{leader.name}</h3>
                  <p className="mt-1 text-sm text-primary">{leader.role}</p>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{leader.bio}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Founder />
      <FinalCTA />
    </>
  );
}
