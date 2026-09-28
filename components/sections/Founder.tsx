import { Container, Reveal, Section } from "@/components/ui";

export default function Founder() {
  return (
    <Section className="overflow-hidden">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-25"
        style={{ background: "radial-gradient(closest-side, #0cb0d0, transparent)" }}
      />
      <Container narrow className="relative text-center">
        <Reveal>
          <p className="eyebrow mb-10">From the founder</p>
          <blockquote>
            <p className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.15] text-metal">
              &ldquo;Exceed is built around the work, not the workload. Every project gets direct oversight
              from the first sketch to the final install.&rdquo;
            </p>
            <footer className="mt-10">
              <p className="text-foreground font-medium">Simbi Jama</p>
              <p className="text-sm text-muted-foreground">Founder &amp; Chief Executive Officer</p>
            </footer>
          </blockquote>
        </Reveal>
      </Container>
    </Section>
  );
}
