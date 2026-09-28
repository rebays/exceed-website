"use client";

import { forwardRef, useMemo } from "react";
import * as THREE from "three";

/**
 * The four facets of the "x" in the Exceed wordmark, traced from logo.png
 * (pixel coordinates, y down). Each becomes its own extruded prism so the
 * mark keeps the logo's folded, two-tone look in 3D.
 */
const FACETS: { points: [number, number][]; color: string; z: number }[] = [
  // Top-left arm
  { points: [[390, 115], [443, 115], [519, 210], [519, 260], [478, 260]], color: "#3d85e2", z: 0 },
  // Top-right arm
  { points: [[519, 210], [597, 115], [649, 115], [560, 260], [519, 260]], color: "#2a9bdc", z: 0 },
  // Bottom-left leg
  { points: [[478, 260], [519, 260], [519, 313], [443, 408], [390, 408]], color: "#10b0d4", z: 0 },
  // Bottom-right leg — the shaded "fold", set slightly back
  { points: [[519, 260], [560, 260], [649, 408], [597, 408], [519, 313]], color: "#0a7896", z: -0.08 },
];

const CENTER_X = 519;
const CENTER_Y = 261;
const UNIT = 146; // half the mark's pixel height → mark spans roughly −1…1

const DEPTH = 0.32;

const EXTRUDE: THREE.ExtrudeGeometryOptions = {
  depth: DEPTH,
  bevelEnabled: true,
  bevelThickness: 0.04,
  bevelSize: 0.025,
  bevelSegments: 5,
  curveSegments: 1,
};

function buildGeometry(points: [number, number][]) {
  const shape = new THREE.Shape(
    points.map(([x, y]) => new THREE.Vector2((x - CENTER_X) / UNIT, -(y - CENTER_Y) / UNIT))
  );
  const geometry = new THREE.ExtrudeGeometry(shape, EXTRUDE);
  geometry.translate(0, 0, -DEPTH / 2);
  return geometry;
}

export const ExceedMark = forwardRef<THREE.Group>(function ExceedMark(_, ref) {
  const facets = useMemo(
    () => FACETS.map((facet) => ({ ...facet, geometry: buildGeometry(facet.points) })),
    []
  );

  return (
    <group ref={ref}>
      {facets.map((facet, idx) => (
        <mesh key={idx} geometry={facet.geometry} position-z={facet.z}>
          <meshPhysicalMaterial
            color={facet.color}
            metalness={0.3}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.8}
          />
        </mesh>
      ))}
    </group>
  );
});
