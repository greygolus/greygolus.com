"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function MetallicObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) meshRef.current.scale.set(0, 0, 0);
    
    gsap.to(meshRef.current!.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 2.5,
      ease: 'expo.out'
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.3, 128, 32]} />
        <MeshDistortMaterial 
          color="#F8FAFC"
          emissive="#020817"
          envMapIntensity={4.5}
          clearcoat={1.0}
          clearcoatRoughness={0.01} 
          metalness={1.0}
          roughness={0.05}
          distort={0.4}
          speed={3}
        />
      </mesh>
    </Float>
  );
}

export default function InteractiveScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        dpr={1}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
        
        {/* Static lights — no separate component needed */}
        <pointLight position={[5, 4, 5]} intensity={15} color="#ff00ff" distance={20} /> 
        <pointLight position={[-5, -4, 5]} intensity={18} color="#00ffff" distance={25} /> 
        <pointLight position={[0, -8, 2]} intensity={10} color="#ffff00" distance={20} /> 
        
        <Environment preset="night" />
        <MetallicObject />
      </Canvas>
    </div>
  );
}
