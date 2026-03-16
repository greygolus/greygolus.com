"use client";
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCardBackgroundProps {
  accent: string; // Tailwind gradient classes like "from-cyan-500 to-blue-900"
}

function GlassBackground({ accent }: { accent: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a simple plane or torus knot for distortion
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Subtle liquid distortion
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={[1.5, 1.5, 1.5]}>
        <torusKnotGeometry args={[1, 0.3, 128, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={1.5}
          chromaticAberration={0.15}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.2}
          clearcoat={1}
          attenuationDistance={0.5}
          attenuationColor="#ffffff"
          color="#ffffff"
          ior={1.2}
          transmission={1}
        />
      </mesh>
    </Float>
  );
}

export default function ProjectCardBackground({ accent }: ProjectCardBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
      {/* Dynamic Background Mesh */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, stencil: false, depth: false }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#54C8FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF00FF" />
        <GlassBackground accent={accent} />
      </Canvas>

      {/* Tailwind Accent Gradient Overlay (Faded) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-10 mix-blend-screen`}></div>
    </div>
  );
}
