"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Container, Reveal, Section, SectionHeading } from "@/components/ui";
import { faqs } from "@/lib/content";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <Section>
      <Container narrow>
        <SectionHeading eyebrow="FAQ" title="Before we start." />

        <Reveal className="border-t border-border">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            const panelId = `${baseId}-${idx}`;
            return (
              <div key={faq.q} className="border-b border-border">
                <h3>
                  <button
                    className="w-full flex items-center justify-between gap-6 py-7 text-left text-lg md:text-xl font-medium tracking-tight text-foreground hover:text-primary transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : idx)}
                  >
                    {faq.q}
                    <Plus
                      aria-hidden
                      className={`w-5 h-5 shrink-0 text-muted-foreground transition-transform duration-500 ease-out-expo ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  className={`grid transition-all duration-500 ease-out-expo ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-7 pr-10 text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
