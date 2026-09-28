"use client";

import { useScrollProgress } from "@/lib/use-scroll-progress";

const STATEMENT =
  "We design it. We build it. We install it. One studio, from the first sketch to the final install — so nothing gets lost in between.";

/** Pinned manifesto whose words light up one by one as you scroll. */
export default function Statement() {
  const { ref } = useScrollProgress<HTMLElement>();
  const words = STATEMENT.split(" ");
  // Leave headroom so the last words finish lighting before the pin releases.
  const span = words.length + 4;

  return (
    <section ref={ref} className="relative h-[240vh]" aria-label={STATEMENT}>
      <div className="sticky top-0 h-svh flex items-center justify-center px-6">
        <p aria-hidden className="max-w-5xl text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] leading-[1.1]">
          {words.map((word, i) => (
            <span
              key={i}
              className="transition-opacity duration-200"
              style={{ opacity: `clamp(0.14, calc(var(--progress, 0) * ${span} - ${i}), 1)` }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
