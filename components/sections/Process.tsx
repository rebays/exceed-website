import { Container, Reveal, Section, SectionHeading } from "@/components/ui";
import { processSteps, stats } from "@/lib/content";
import ProcessSteps from "./ProcessSteps";

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

        <ProcessSteps steps={processSteps} />
      </Container>
    </Section>
  );
}
