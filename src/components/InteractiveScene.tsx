"use client";
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function MetallicObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Restoration of the entry animation
    if (meshRef.current) meshRef.current.scale.set(0, 0, 0);
    
    gsap.to(meshRef.current!.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 2.5,
      ease: 'expo.out'
    });

    const handleMouseMove = (e: MouseEvent) => {
      // Relative mouse position from -1 to 1
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      // Base rotation + mouse influence
      const targetRotationX = state.clock.elapsedTime * 0.15 + (mouse.current.y * 0.2);
      const targetRotationY = state.clock.elapsedTime * 0.2 + (mouse.current.x * 0.3);
      
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
      
      // Slight parallax position shift
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 0.2, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current.y * 0.2, 0.05);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
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

function ReactiveLights() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Lights follow mouse slightly for dynamic reflections
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, mouse.current.x * 0.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, mouse.current.y * 0.5, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[5, 4, 5]} intensity={15} color="#ff00ff" distance={20} /> 
      <pointLight position={[-5, -4, 5]} intensity={18} color="#00ffff" distance={25} /> 
      <pointLight position={[0, -8, 2]} intensity={10} color="#ffff00" distance={20} /> 
    </group>
  );
}

export default function InteractiveScene() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.2} color="#ffffff" />
        <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
        
        <ReactiveLights />
        
        <Environment preset="night" />
        <MetallicObject />
      </Canvas>
    </div>
  );
}
