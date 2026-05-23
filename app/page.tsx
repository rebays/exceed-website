import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Section, Container, Card, GradientText } from "@/components/ui";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Services/Features Section */}
      <Features />

      {/* Trust/Social Proof Section */}
      <Section padding="md" className="bg-accent/20 border-y border-border/50">
        <Container className="text-center">
          <p className="text-secondary/60 text-sm font-bold uppercase tracking-[0.2em] mb-12">
            Strategic Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            {["ORG CLINIC", "REBAYS", "SIG", "GOLS"].map((partner) => (
              <span key={partner} className="text-2xl font-black tracking-tighter">
                {partner}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section id="about">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] -z-10" />
        <Container narrow className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 leading-tight">
            We&apos;re on a mission to redefine <br />
            <GradientText from="secondary" to="primary">Enterprise Excellence</GradientText>
          </h2>
          <p className="text-xl text-foreground/60 leading-relaxed mb-12">
            Exceed Enterprise Limited was founded on the principle that
            businesses should never have to settle for &ldquo;good enough.&rdquo;
            We push the boundaries of what&apos;s possible in design, fabrication, and technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              { label: "Vision", value: "To be trusted, innovative and profitable." },
              { label: "Mission", value: "To deliver and exceed customers expectation." },
              { label: "Impact", value: "Delivering measurable results for our clients." }
            ].map((item, i) => (
              <Card key={i} className="p-8">
                <p className="text-primary font-bold text-sm uppercase mb-2">{item.label}</p>
                <p className="text-foreground/70">{item.value}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section id="contact" padding="md" className="bg-primary text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />
        <Container className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center lg:text-left">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Exceed your potential?</h2>
              <p className="text-cyan-50 text-lg opacity-90">
                Join businesses who trust Exceed to deliver premium design, signage, and software solutions.
              </p>
            </div>
            <a
              href="mailto:simbi@exceed.com.sb"
              className="inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all bg-white text-primary hover:bg-cyan-50 px-10 py-5 text-lg shadow-xl active:scale-95"
            >
              Contact Strategy Team
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
