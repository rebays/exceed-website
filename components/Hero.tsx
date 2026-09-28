"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { heroClients } from "@/lib/content";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Media feeding through a UV printer, advancing as the visitor scrolls.
// Seeking is only smooth with frequent keyframes, so encode it with e.g.
//   ffmpeg -i in.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 24 -g 6 -pix_fmt yuv420p -movflags +faststart hero-print.mp4
const VIDEO_SRC = "/videos/hero-print.mp4";
const POSTER_SRC = "/videos/hero-print.jpg";

// Scroll progress (0 → 1) at which the headline has fully faded out.
const HEADLINE_OUT = 0.15;
// Words shown in turn as the video plays, each visible between `from` and `to`.
const FADE = 0.05;
const BEATS = [
  { word: "Design.", from: 0.18, to: 0.38 },
  { word: "Signage.", from: 0.38, to: 0.58 },
  { word: "Software.", from: 0.58, to: 0.78 },
  { word: "Print.", from: 0.78, to: 1.2 },
];

export default function Hero() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const reducedMotion = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  // Scrub the video to match scroll progress, easing toward the target so
  // coarse scroll steps still read as continuous motion.
  useEffect(() => {
    const el = ref.current;
    const v = video.current;
    if (!el || !v || videoFailed) return;

    if (reducedMotion) {
      const showEnd = () => {
        if (v.duration) v.currentTime = v.duration;
      };
      showEnd();
      v.addEventListener("loadedmetadata", showEnd);
      return () => v.removeEventListener("loadedmetadata", showEnd);
    }

    let frame = 0;
    let current = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!v.duration || v.seeking) return;
      const target = (progress.current ?? 0) * v.duration;
      current += (target - current) * 0.15;
      if (Math.abs(v.currentTime - current) > 1 / 60) v.currentTime = current;
    };

    // iOS Safari won't render seeks until the video has played once.
    const prime = () => v.play().then(() => v.pause()).catch(() => {});
    v.addEventListener("loadedmetadata", prime, { once: true });

    const observer = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame);
      if (entry.isIntersecting) frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      v.removeEventListener("loadedmetadata", prime);
    };
  }, [ref, progress, reducedMotion, videoFailed]);

  return (
    <section ref={ref} className="relative h-[320vh]" aria-label="Introduction">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Glow sits behind the video and doubles as its fallback */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full blur-[100px] opacity-50"
          style={{ background: "radial-gradient(closest-side, rgba(12,176,208,0.55), rgba(80,114,231,0.2), transparent)" }}
        />
        {!videoFailed && (
          <video
            ref={video}
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover animate-fade-up"
            style={{ animationDuration: "1.2s" }}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
          />
        )}
        {/* Recolour the footage in the brand teal → blue, keeping its light and shade */}
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-color opacity-80"
          style={{ background: "linear-gradient(135deg, #0cb0d0, #5072e7)" }}
        />
        {/* Dim the frame so centred text stays legible, fading into the page below */}
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />

        {/* Headline fades away as the print advances */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
          style={{
            opacity: `calc(1 - var(--progress, 0) / ${HEADLINE_OUT})`,
            transform: "translateY(calc(var(--progress, 0) * -160px))",
          }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl text-metal animate-fade-up [animation-delay:350ms]">
            Refuse to blend in.
          </h1>
          <p className="mt-6 max-w-xl text-lg md:text-xl text-foreground/75 animate-fade-up [animation-delay:500ms]">
            Branding, signage, software and print for businesses in Honiara, all under one roof.
          </p>

          <div className="absolute inset-x-0 bottom-20 [@media(max-height:720px)]:bottom-12 px-6 flex flex-col items-center gap-5 animate-fade-up [animation-delay:650ms]">
            <p className="eyebrow text-foreground/50">Trusted by</p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:gap-x-12">
              {heroClients.map(({ name, src, width, height, displayHeight }) => (
                <li key={name} className="opacity-70">
                  <Image
                    src={src}
                    alt={name}
                    width={width}
                    height={height}
                    className="w-auto"
                    style={{ height: displayHeight }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* One discipline at a time while the video plays; the last one stays */}
        <p className="sr-only">Design, signage, software and print.</p>
        {BEATS.map(({ word, from, to }) => (
          <p
            key={word}
            aria-hidden
            className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none text-center text-6xl sm:text-7xl md:text-9xl font-semibold tracking-[-0.04em] text-metal"
            style={{
              opacity: `clamp(0, min((var(--progress, 0) - ${from}) / ${FADE}, (${to} - var(--progress, 0)) / ${FADE}), 1)`,
              transform: `translateY(calc(clamp(-1, (var(--progress, 0) - ${(from + to) / 2}) / ${to - from}, 1) * -40px))`,
            }}
          >
            {word}
          </p>
        ))}

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
