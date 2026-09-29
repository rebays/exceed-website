"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Reveal } from "@/components/ui";

type Step = { title: string; time: string; desc: string };
type Phase = "dwell" | "flow";

// Timings (ms): how long a step stays highlighted, how long the pulse takes to
// travel to the next step, and the pause on the final step before looping.
const DWELL = 2200;
const FLOW = 900;
const DWELL_LAST = 3000;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mql = window.matchMedia(REDUCED_MOTION);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
}

export default function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<Phase>("dwell");

  const lastIdx = steps.length - 1;
  const running = inView && !reducedMotion;

  // Only animate while the section is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Step loop: dwell on a step → pulse flows along the line → next step lights up.
  // After dwelling on the last step, rewind to the first.
  useEffect(() => {
    if (!running) return;
    const isLast = active === lastIdx;
    const timeout = setTimeout(
      () => {
        if (phase === "flow") {
          setActive(active + 1);
          setPhase("dwell");
        } else if (isLast) {
          setActive(0);
        } else {
          setPhase("flow");
        }
      },
      phase === "flow" ? FLOW : isLast ? DWELL_LAST : DWELL
    );
    return () => clearTimeout(timeout);
  }, [running, active, phase, lastIdx]);

  return (
    <ol ref={ref} className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6">
      {steps.map((step, idx) => {
        // With reduced motion, show the whole path as complete and static.
        const isActive = !reducedMotion && idx === active;
        const isDone = reducedMotion || idx < active;
        const segmentFilled = reducedMotion || idx < active || (idx === active && phase === "flow");
        const flowing = running && idx === active && phase === "flow";

        return (
          <li key={step.title} aria-current={isActive ? "step" : undefined}>
            <Reveal delay={idx * 90} className="relative flex flex-col pl-8 md:pl-0">
              {idx < lastIdx && (
                <div
                  aria-hidden
                  className="absolute left-[7px] top-[15px] w-px h-[calc(100%+2.5rem-15px)] md:left-[15px] md:top-[7px] md:h-px md:w-[calc(100%+1.5rem-15px)] bg-white/10"
                >
                  <div
                    className={`absolute inset-0 bg-primary/70 origin-top md:origin-left transition-transform ease-in-out ${
                      segmentFilled ? "scale-100" : "scale-y-0 md:scale-y-100 md:scale-x-0"
                    }`}
                    style={{ transitionDuration: `${FLOW}ms` }}
                  />
                  {flowing && (
                    <span
                      className="absolute rounded-full left-1/2 -translate-x-1/2 -translate-y-full w-[3px] h-12 bg-gradient-to-b from-transparent via-primary to-white shadow-[0_0_12px_2px_var(--primary)] animate-flow-y md:left-0 md:top-1/2 md:-translate-x-full md:-translate-y-1/2 md:w-16 md:h-[3px] md:bg-gradient-to-r md:animate-flow-x"
                      style={{ animationDuration: `${FLOW}ms` }}
                    />
                  )}
                </div>
              )}

              <span
                className={`absolute left-0 top-0 w-[15px] h-[15px] rounded-full border flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? "border-primary bg-primary shadow-[0_0_16px_3px_var(--primary)]"
                    : isDone
                      ? "border-primary bg-black"
                      : "border-white/25 bg-black"
                }`}
              >
                {isActive && (
                  <span key={active} className="absolute inset-0 rounded-full border border-primary animate-ping" />
                )}
                <span
                  className={`w-[5px] h-[5px] rounded-full transition-colors duration-500 ${
                    isActive ? "bg-white" : isDone ? "bg-primary" : "bg-white/30"
                  }`}
                />
              </span>

              <p className={`md:mt-10 eyebrow transition-colors duration-500 ${isActive ? "!text-primary" : ""}`}>
                {String(idx + 1).padStart(2, "0")} · {step.time}
              </p>
              <h3
                className={`mt-3 text-2xl transition-colors duration-500 ${
                  isActive || reducedMotion ? "text-foreground" : "text-foreground/55"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-3 leading-relaxed transition-colors duration-500 ${
                  isActive ? "text-foreground/80" : "text-muted-foreground"
                }`}
              >
                {step.desc}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
