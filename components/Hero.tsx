"use client";

import { ArrowRight, ChevronRight } from "lucide-react";

// ─── Tweak these to adjust the hero look ─────────────────────────────────────

// Video overlay — increase the number for a darker background (0–100)
const OVERLAY = "bg-black/85";

// Highlighted word styling
const HIGHLIGHT_BG     = "bg-primary/30";   // highlight background colour & opacity
const HIGHLIGHT_TEXT   = "text-cyan-300";   // highlighted word colour
const HIGHLIGHT_PAD    = "px-3 py-1";       // space inside the highlight box
const HIGHLIGHT_RADIUS = "rounded-md";      // corner rounding of highlight box

// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

      {/* ── Background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/print-1.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay over video ── */}
      <div className={`absolute inset-0 pointer-events-none ${OVERLAY}`} />

      {/* ── Brand colour tints ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 10% 20%, rgba(19,181,211,0.28) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 90% 80%, rgba(99,102,241,0.28) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 50% 0%,  rgba(19,181,211,0.14) 0%, transparent 50%)
          `,
        }}
      />

      {/* ── Cyan bloom (top-left) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%", left: "-5%",
          width: 700, height: 700,
          background: "radial-gradient(ellipse at center, rgba(19,181,211,0.22) 0%, transparent 65%)",
          filter: "blur(70px)",
          animation: "pulse-slow 14s ease-in-out infinite",
        }}
      />

      {/* ── Purple bloom (bottom-right) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%", right: "-5%",
          width: 800, height: 800,
          background: "radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, transparent 65%)",
          filter: "blur(90px)",
          animation: "pulse-slow 16s ease-in-out infinite 2s",
        }}
      />

      {/* ── Main content ── */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl flex flex-col gap-8 animate-in fade-in slide-in-from-bottom duration-1000 text-white">

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Designed to Impress.
            <br />
            <span className={`${HIGHLIGHT_BG} ${HIGHLIGHT_TEXT} ${HIGHLIGHT_PAD} ${HIGHLIGHT_RADIUS}`}>
              Built to Last.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            From concept to print — we craft bold graphic design and deliver
            flawless commercial printing that makes your brand impossible to ignore.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group relative inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all bg-primary hover:bg-primary-hover text-white px-8 py-4 shadow-xl shadow-primary/20 active:scale-95 overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button className="group inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 backdrop-blur-sm text-white">
              Our Solutions
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}
