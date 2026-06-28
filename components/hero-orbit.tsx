"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function HeroKnot() {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.06;
    mesh.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1.35, 0.012, 170, 10, 2, 5]} />
      <meshBasicMaterial color="#7ce7c8" transparent opacity={0.28} />
    </mesh>
  );
}

export function HeroOrbit() {
  return (
    <div className="absolute inset-0 -z-10 opacity-70" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <HeroKnot />
      </Canvas>
    </div>
  );
}
