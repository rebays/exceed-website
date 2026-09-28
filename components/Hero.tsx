"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/ui";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// three.js only ever loads in the browser, in its own chunk.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), { ssr: false });

let webglSupport: boolean | undefined;
function detectWebGL() {
  if (webglSupport === undefined) {
    try {
      const canvas = document.createElement("canvas");
      webglSupport = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const noopSubscribe = () => () => {};

export default function Hero() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const reducedMotion = useReducedMotion();
  const hasWebGL = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  const [active, setActive] = useState(true);
  const headline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label="Introduction">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Glow sits behind the canvas and doubles as the no-WebGL fallback */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full blur-[100px] opacity-50"
          style={{ background: "radial-gradient(closest-side, rgba(12,176,208,0.55), rgba(80,114,231,0.2), transparent)" }}
        />
        {hasWebGL && (
          <div className="absolute inset-0 animate-fade-up" style={{ animationDuration: "1.2s" }}>
            <HeroScene progress={progress} active={active} reducedMotion={reducedMotion} headline={headline} />
          </div>
        )}

        {/* Phase 1 — headline, fades away as the mark spins back */}
        <div
          ref={headline}
          className="absolute inset-x-0 bottom-0 pb-16 md:pb-20 px-6 text-center"
          style={{
            opacity: "calc(1 - var(--progress, 0) * 3.2)",
            transform: "translateY(calc(var(--progress, 0) * -120px))",
          }}
        >
          <p className="eyebrow mb-5 animate-fade-up [animation-delay:200ms]">Exceed Enterprise · Honiara</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl [@media(max-height:720px)]:text-5xl text-metal animate-fade-up [animation-delay:350ms]">
            Work that refuses
            <br className="hidden sm:block" /> to blend in.
          </h1>
          <p className="mt-6 mx-auto max-w-xl text-lg md:text-xl text-muted-foreground animate-fade-up [animation-delay:500ms]">
            Branding, signage and software — designed, built and installed by one studio.
          </p>
          <div className="mt-10 [@media(max-height:720px)]:mt-6 flex flex-wrap items-center justify-center gap-4 animate-fade-up [animation-delay:650ms]">
            <a href="#pricing" className={buttonVariants({ size: "lg" })}>
              Get a quote
            </a>
            <Link href="/portfolio" className={buttonVariants({ variant: "secondary", size: "lg" })}>
              See the work
            </Link>
          </div>
        </div>

        {/* Phase 2 — the four disciplines, revealed mid-scroll */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
          style={{
            opacity: "clamp(0, calc((var(--progress, 0) - 0.4) * 4), 1)",
            transform: "scale(calc(0.92 + var(--progress, 0) * 0.08))",
          }}
        >
          <p className="text-center text-5xl md:text-8xl font-semibold tracking-[-0.04em] leading-[1.05] text-metal">
            Design. Signage.
            <br />
            Software. Print.
          </p>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden
          className="absolute bottom-6 left-1/2 -translate-x-1/2 h-10 w-px overflow-hidden bg-white/10 hidden md:block"
          style={{ opacity: "calc(1 - var(--progress, 0) * 8)" }}
        >
          <div className="h-1/2 w-full bg-white/60 animate-scroll-cue" />
        </div>
      </div>
    </section>
  );
}
