import { Reveal } from "@/components/ui";

const steps = [
  {
    step: "01",
    title: "Discovery",
    timeframe: "2-3 days",
    desc: "We study the brand, the market, and the constraints before proposing anything.",
  },
  {
    step: "02",
    title: "Strategy",
    timeframe: "3-5 days",
    desc: "We decide what matters — messaging, materials, and priorities — before making anything.",
  },
  {
    step: "03",
    title: "Concept",
    timeframe: "4-5 days",
    desc: "Directions are explored and pressure-tested before they become final designs.",
  },
  {
    step: "04",
    title: "Design & Fabrication",
    timeframe: "1-4 weeks",
    desc: "From design files to physical signage, prints, and builds — produced to spec.",
  },
  {
    step: "05",
    title: "Delivery",
    timeframe: "Ongoing",
    desc: "Installed, tested, and supported. We launch when it's ready — not before.",
  },
];

export default function Process() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8 text-center">
            Process
          </p>
          <h2 className="text-4xl md:text-7xl text-center text-foreground mb-24 max-w-4xl mx-auto">
            We don&apos;t start with answers. We start with the right questions.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {steps.map((s, idx) => (
            <Reveal key={s.step} delay={idx * 90} className="border-t-2 border-primary pt-6 flex flex-col gap-4">
              <span className="text-secondary text-sm font-bold">{s.step}</span>
              <h3 className="text-2xl text-foreground">{s.title}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                {s.timeframe}
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
