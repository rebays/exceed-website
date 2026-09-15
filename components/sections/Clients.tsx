import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/ui";

const partners = ["ORG CLINIC", "REBAYS","OVO"];

export default function Clients() {
  return (
    <section className="py-16 border-y border-border bg-accent/20">
      <Reveal>
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-10">
          Brands That Trust The Work
        </p>
      </Reveal>
      <Marquee
        items={partners}
        textClassName="text-3xl md:text-5xl font-display text-foreground/50 hover:text-foreground transition-colors"
      />
    </section>
  );
}
