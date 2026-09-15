import { Reveal } from "@/components/ui";

const stats = [
  { label: "Founded", value: "2015" },
  { label: "Regional Offices", value: "8" },
  { label: "Enterprise Clients", value: "150+" },
  { label: "Industry Awards", value: "24" },
];

export default function Recognition() {
  return (
    <section className="py-32 relative bg-accent/20 border-y border-border">
      <div className="container mx-auto px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8 text-center">
            Recognition
          </p>
          <h2 className="text-4xl md:text-7xl text-center text-foreground mb-24 max-w-4xl mx-auto">
            We didn&apos;t chase the recognition. The work did that for us.
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <Reveal key={stat.label} delay={idx * 80} className="text-center">
              <p className="text-primary text-5xl md:text-7xl mb-3">{stat.value}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/50">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
