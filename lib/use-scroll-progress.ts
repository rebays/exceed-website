"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks how far the viewport has scrolled through an element (0 → 1),
 * designed for tall sections with a `position: sticky` child.
 *
 * The value is written to the `--progress` CSS variable on the element (for
 * CSS-driven effects) and mirrored in `progress.current` (for WebGL), so
 * scrolling never triggers a React re-render.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const progress = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      const value = distance > 0 ? Math.min(1, Math.max(0, -rect.top / distance)) : rect.top < 0 ? 1 : 0;
      progress.current = value;
      el.style.setProperty("--progress", value.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return { ref, progress };
}
