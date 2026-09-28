import Link from "next/link";
import ContactButton from "@/components/ContactButton";
import { Reveal, buttonVariants } from "@/components/ui";

export default function FinalCTA() {
  return (
    // The glow is clipped sideways only, so its lower half spills into the footer
    // and the two read as one continuous surface.
    <section id="contact" className="relative overflow-x-clip py-40 md:py-56 border-t border-border">
      <div
        aria-hidden
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[1100px] h-[600px] rounded-full blur-[140px] opacity-40"
        style={{ background: "radial-gradient(closest-side, #0cb0d0, rgba(80,114,231,0.4), transparent)" }}
      />
      <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-5xl md:text-8xl text-metal">Let&apos;s build something unforgettable.</h2>
        <p className="mt-8 text-lg md:text-xl text-muted-foreground">
          Branding, signage and software for businesses that won&apos;t settle for good enough.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <ContactButton className={buttonVariants({ variant: "light", size: "lg" })}>Get in touch</ContactButton>
          <Link href="/#pricing" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Get a quote
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
