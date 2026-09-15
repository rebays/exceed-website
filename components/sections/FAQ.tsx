"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui";

const faqs = [
  {
    q: "How do we start working together?",
    a: "We begin with a short call to understand scope, timeline, and priorities. If there's a fit, we define the engagement and start with a clear plan.",
  },
  {
    q: "Who will I work with day to day?",
    a: "The same person who scopes the work stays involved throughout — from design through fabrication or development.",
  },
  {
    q: "Do you handle both digital and physical work?",
    a: "Yes. Branding, signage, fabrication, and software are all handled in-house, so nothing gets lost between vendors.",
  },
  {
    q: "What happens if the scope changes?",
    a: "We adjust the scope together before continuing. No silent overages, no unclear extensions.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Clarity on goals, access to existing materials, and a single point of contact. Everything else is structured together at the start.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 relative bg-accent/20 border-y border-border">
      <div className="container mx-auto px-6 max-w-3xl">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8 text-center">
            FAQ
          </p>
          <h2 className="text-4xl md:text-7xl text-center text-foreground mb-20">
            What you need to know before we start.
          </h2>
        </Reveal>

        <div className="flex flex-col">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <Reveal key={faq.q} delay={idx * 60} className="border-t border-border last:border-b">
                <button
                  className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <span className="text-lg md:text-xl text-foreground font-bold">{faq.q}</span>
                  <Plus
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="text-foreground/60 leading-relaxed pb-6 pr-10 overflow-hidden">{faq.a}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
