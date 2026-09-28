import { Container, Reveal, Section, SectionHeading } from "@/components/ui";
import { processSteps, stats } from "@/lib/content";

export function Stats({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 ${className}`}>
      {stats.map((stat, idx) => (
        <Reveal key={stat.label} delay={idx * 80} className="flex flex-col-reverse text-center">
          <dt className="mt-3 text-sm text-muted-foreground">{stat.label}</dt>
          <dd className="text-5xl md:text-7xl font-semibold tracking-[-0.04em] text-metal">{stat.value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

export default function Process() {
  return (
    <Section className="border-t border-border">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="We don't start with answers. We start with the right questions."
        />

        <div className="relative">
          {/* Connecting rail on desktop */}
          <div aria-hidden className="hidden md:block absolute top-[7px] left-0 right-0 h-px bg-gradient-to-r from-primary/60 via-white/15 to-transparent" />
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
            {processSteps.map((step, idx) => (
              <li key={step.title}>
                <Reveal delay={idx * 90} className="relative flex flex-col pl-8 md:pl-0 border-l border-border md:border-0">
                  <span className="absolute -left-[7px] md:left-0 top-0 w-[15px] h-[15px] rounded-full border border-primary bg-black flex items-center justify-center">
                    <span className="w-[5px] h-[5px] rounded-full bg-primary" />
                  </span>
                  <p className="md:mt-10 eyebrow">
                    {String(idx + 1).padStart(2, "0")} · {step.time}
                  </p>
                  <h3 className="mt-3 text-2xl text-foreground">{step.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{step.desc}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
