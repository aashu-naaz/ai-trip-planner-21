"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Globe() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.35; // 🔥 clearly visible rotation
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -1]}>
      <sphereGeometry args={[1.8, 96, 96]} />
      <meshStandardMaterial
        color="#6d28d9"
        roughness={0.25}
        metalness={0.2}
        emissive="#8b5cf6"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      {/* Deep space background */}
      <color attach="background" args={["#070014"]} />

      {/* Lighting — THIS is what makes it 3D */}
      <ambientLight intensity={0.15} />

      {/* Key light */}
      <directionalLight
        position={[4, 2, 3]}
        intensity={1.4}
        color="#c4b5fd"
      />

      {/* Rim / glow light */}
      <pointLight
        position={[-6, 0, 4]}
        intensity={2.5}
        color="#a855f7"
      />

      {/* Globe */}
      <Globe />
    </Canvas>
  );
}
