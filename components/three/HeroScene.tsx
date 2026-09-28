"use client";

import { RefObject, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { ExceedMark } from "./ExceedMark";

interface HeroSceneProps {
  /** Scroll progress through the hero, 0 → 1. */
  progress: RefObject<number>;
  /** Pauses rendering while the hero is offscreen. */
  active: boolean;
  reducedMotion: boolean;
  /** The headline block; the mark is fitted into the space above it. */
  headline: RefObject<HTMLElement | null>;
}

const NAV_HEIGHT = 56;

/** Window-level pointer position in −1…1, since UI overlays the canvas. */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return pointer;
}

function Rig({ progress, reducedMotion, headline }: Omit<HeroSceneProps, "active">) {
  const frame = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer();

  useFrame((state, delta) => {
    const g = group.current;
    const f = frame.current;
    if (!g || !f) return;

    // Fit the mark (2 units tall) into the gap between the nav and the
    // headline, whatever the screen shape. Units ↔ px via the z=0 viewport.
    const { viewport, size } = state;
    const unitsPerPx = viewport.height / size.height;
    const headlineTop = headline.current?.offsetTop ?? size.height * 0.55;
    const gap = Math.max(80, headlineTop - NAV_HEIGHT - 16);
    f.scale.setScalar(Math.min(0.62, gap * 0.42 * unitsPerPx, viewport.width * 0.4));
    f.position.y = (size.height / 2 - (NAV_HEIGHT + gap / 2)) * unitsPerPx;

    const p = progress.current ?? 0;
    const t = reducedMotion ? 0 : state.clock.elapsedTime;
    const px = reducedMotion ? 0 : pointer.current.x;
    const py = reducedMotion ? 0 : pointer.current.y;
    const d = Math.min(delta, 0.1);

    // Idle drift + pointer tilt, then scroll spins the mark and pushes it back.
    const targetRotY = -0.35 + Math.sin(t * 0.35) * 0.12 + px * 0.35 + p * Math.PI * 1.25;
    const targetRotX = 0.12 + Math.sin(t * 0.5) * 0.05 + py * 0.2 + p * 0.5;
    const targetY = Math.sin(t * 0.8) * 0.05 + p * 1.2;
    const targetZ = -p * 9;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3.5, d);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3.5, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, targetY, 4, d);
    g.position.z = THREE.MathUtils.damp(g.position.z, targetZ, 4, d);
  });

  return (
    <group ref={frame}>
      <ExceedMark ref={group} />
    </group>
  );
}

export default function HeroScene({ progress, active, reducedMotion, headline }: HeroSceneProps) {
  return (
    <Canvas
      frameloop={active ? (reducedMotion ? "demand" : "always") : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      {/* Teal rim light from behind — the brand glow */}
      <pointLight position={[-2.5, 1, -2.5]} intensity={30} color="#0cb0d0" distance={10} />
      <pointLight position={[3, -2, -2]} intensity={16} color="#5072e7" distance={10} />

      <Rig progress={progress} reducedMotion={reducedMotion} headline={headline} />

      {!reducedMotion && (
        <Sparkles count={70} scale={[12, 7, 5]} size={1.4} speed={0.15} opacity={0.35} color="#ffffff" />
      )}

      {/* Procedural studio lighting for reflections — no HDR download */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[10, 2, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={2} position={[-5, 1, 1]} scale={[2, 8, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={2} position={[5, 0, 1]} scale={[2, 8, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={4} color="#0cb0d0" position={[0, 0, -6]} scale={4} />
      </Environment>
    </Canvas>
  );
}
