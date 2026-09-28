"use client";

import { CSSProperties, HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
}

export function Reveal({
  children,
  delay = 0,
  y = 32,
  duration = 1000,
  className = "",
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealStyle: CSSProperties = {
    ...style,
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "var(--ease-out-expo)",
    transitionDelay: `${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : `translateY(${y}px)`,
    filter: visible ? "blur(0)" : "blur(6px)",
  };

  return (
    <div ref={ref} className={className} style={revealStyle} {...props}>
      {children}
    </div>
  );
}
