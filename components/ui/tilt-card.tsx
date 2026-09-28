"use client";

import { HTMLAttributes, PointerEvent, useRef } from "react";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Maximum rotation in degrees. */
  max?: number;
}

/**
 * A card that tilts toward the pointer in 3D and tracks a soft spotlight.
 * Writes straight to CSS custom properties so it never re-renders.
 */
export function TiltCard({ max = 6, className = "", children, style, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - y) * max}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * max}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const handleLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="h-full" style={{ perspective: "1200px" }}>
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`group/tilt relative h-full overflow-hidden rounded-3xl surface transition-transform duration-500 ease-out-expo will-change-transform ${className}`}
        style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))", ...style }}
        {...props}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(12, 176, 208, 0.12), transparent 45%)",
          }}
        />
        {children}
      </div>
    </div>
  );
}
