"use client";
import React from 'react';

interface ProjectCardBackgroundProps {
  accent: string;
}

export default function ProjectCardBackground({ accent }: ProjectCardBackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 bg-black overflow-hidden">
      {/* Animated CSS orbs that mimic the old glass refraction look */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute w-[60%] h-[60%] rounded-full blur-[60px]"
          style={{
            top: '20%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(84,200,255,0.4) 0%, transparent 70%)',
            animation: 'cardOrb1 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[50%] h-[50%] rounded-full blur-[50px]"
          style={{
            top: '40%',
            left: '40%',
            background: 'radial-gradient(circle, rgba(255,0,255,0.3) 0%, transparent 70%)',
            animation: 'cardOrb2 10s ease-in-out infinite',
          }}
        />
      </div>

      {/* Tailwind Accent Gradient Overlay (Faded) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-10 mix-blend-screen`}></div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cardOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10%, -10%) scale(1.1); }
        }
        @keyframes cardOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-15%, 10%) scale(1.15); }
        }
      `}} />
    </div>
  );
}
