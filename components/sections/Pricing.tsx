"use client";

import { useCallback, useState } from "react";
import { Check } from "lucide-react";
import { Button, Container, Reveal, Section, SectionHeading, TiltCard } from "@/components/ui";
import { QuoteWizard } from "@/components/sections/QuoteWizard";
import { tiers } from "@/lib/content";

export default function Pricing() {
  const [openTier, setOpenTier] = useState<string | null>(null);
  const close = useCallback(() => setOpenTier(null), []);

  return (
    <Section id="pricing" className="scroll-mt-12">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="The right scope builds the right work."
          lead="Every quote is scoped to the project before anything moves. No hidden overages."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tiers.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 100}>
              <TiltCard
                max={4}
                className={`p-8 md:p-10 flex flex-col ${tier.featured ? "ring-1 ring-primary/60 shadow-[0_0_80px_-20px_rgba(12,176,208,0.45)]" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl text-foreground">{tier.name}</h3>
                  {tier.featured && <span className="eyebrow text-primary">Popular</span>}
                </div>
                <p className="mt-3 text-muted-foreground md:min-h-12">{tier.desc}</p>
                <ul className="mt-8 flex flex-col gap-4 flex-1 border-t border-border pt-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground/90">
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setOpenTier(tier.name)}
                  variant={tier.featured ? "primary" : "secondary"}
                  className="mt-10 w-full relative"
                >
                  Get a quote
                </Button>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Container>

      {openTier && <QuoteWizard key={openTier} onClose={close} initialTier={openTier} />}
    </Section>
  );
}
