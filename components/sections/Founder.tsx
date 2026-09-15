import { Reveal } from "@/components/ui";

export default function Founder() {
  return (
    <section className="py-32 relative bg-accent/20 border-y border-border">
      <div className="container mx-auto px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-8 text-center">
            From the Founder
          </p>
          <h2 className="text-4xl md:text-7xl text-center text-foreground mb-16 max-w-4xl mx-auto">
            Every project deserves thought, care, and attention.
          </h2>
        </Reveal>

        <Reveal delay={120} className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed">
            &ldquo;Exceed is built around the work, not the workload. Every project — brand,
            signage, or software — gets direct oversight from the first sketch to the
            final install. That standard doesn&apos;t change with the size of the client.&rdquo;
          </p>
          <div>
            <p className="text-foreground font-bold">Simbi Jama</p>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary">
              Founder &amp; Chief Executive Officer
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
