import { Reveal } from "@/components/ui";

const tiers = [
  {
    name: "Project",
    desc: "For defined work with a clear scope.",
    features: ["Brand or signage", "Defined scope", "One active workstream", "Milestone-based delivery"],
  },
  {
    name: "Advanced",
    desc: "For larger projects with broader scope and deeper involvement.",
    features: ["Brand, signage, or software", "Defined scope", "Direct senior access", "Priority scheduling"],
    featured: true,
  },
  {
    name: "Signature",
    desc: "For complex projects requiring end-to-end execution.",
    features: ["Full-scope design & fabrication", "Multiple workstreams", "Senior-led team access", "Priority scheduling"],
  },
];

export default function Pricing() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8 text-center">
            Pricing
          </p>
          <h2 className="text-4xl md:text-7xl text-center text-foreground mb-6 max-w-4xl mx-auto">
            The right scope builds the right work.
          </h2>
          <p className="text-center text-foreground/60 max-w-xl mx-auto mb-20">
            Every quote is scoped to the project before anything moves. No hidden overages.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <Reveal
              key={tier.name}
              delay={idx * 100}
              className={`rounded-[2rem] p-10 flex flex-col gap-8 border ${
                tier.featured ? "border-primary bg-accent/60" : "border-border bg-accent/20"
              }`}
            >
              <div>
                <h3 className="text-3xl text-foreground mb-3">{tier.name}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{tier.desc}</p>
              </div>
              <ul className="flex flex-col gap-3 flex-1 border-t border-border/60 pt-6">
                {tier.features.map((f) => (
                  <li key={f} className="text-sm text-foreground/80 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:simbi@exceed.com.sb"
                className={`inline-flex items-center justify-center rounded-full font-bold uppercase tracking-widest text-xs py-4 transition-all ${
                  tier.featured
                    ? "bg-primary hover:bg-primary-hover text-white"
                    : "bg-transparent border border-border text-foreground hover:border-primary"
                }`}
              >
                Get a Quote
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
