import { Reveal } from "@/components/ui";

export default function Hero() {
  const tags = ["Brand", "Signage", "Software", "Print"];

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-background pt-32 pb-16">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src="/videos/print-1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
      <div className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay" />

      {/* Top info row */}
      <Reveal className="container mx-auto px-6 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div>
            <div className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-[0.3em] text-secondary">
              <span className="w-3 h-3 rounded-full bg-primary inline-block" />
              Design &amp; Build Studio
            </div>
            <h1 className="text-4xl md:text-6xl text-foreground mb-6">Design Agency</h1>
            <div className="text-xs font-bold uppercase tracking-widest text-foreground/50 leading-relaxed">
              ROOM 19 LEVEL 1<br />
              CAPITAL PARK<br />
              HONIARA, SOLOMON ISLANDS
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-4">EST. 2015</p>
            <div className="flex flex-col gap-1">
              {tags.map((tag) => (
                <span key={tag} className="text-xl md:text-2xl text-foreground/80 font-display">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Giant headline */}
      <div className="relative z-10 px-6">
        <Reveal delay={100}>
          <h2 className="text-primary text-[13vw] leading-[0.85] md:text-[8.5vw]">
            OUR WORK
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <h2 className="text-foreground/90 text-[13vw] leading-[0.85] md:text-[8.5vw]">
            REFUSES TO
          </h2>
        </Reveal>
        <Reveal delay={300}>
          <h2 className="text-foreground/40 text-[13vw] leading-[0.85] md:text-[8.5vw]">
            BLEND IN
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
