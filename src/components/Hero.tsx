"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import InteractiveScene from './InteractiveScene';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Idle floating animation for glow
    const idleCtx = gsap.context(() => {
      gsap.to(glowRef.current, {
        y: 30,
        x: -20,
        rotation: 5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, containerRef);

    return () => {
      idleCtx.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <InteractiveScene />

      {/* Glow Graphic */}
      <div className="absolute inset-0 flex items-center justify-center mix-blend-screen pointer-events-none">
        <div 
          ref={glowRef}
          className="w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] rounded-full bg-gradient-to-tr from-[rgba(10,31,46,0.3)] via-[rgba(84,200,255,0.05)] to-transparent blur-[100px] opacity-60" 
        />
      </div>

      {/* Optical Background Leaks */}
      <div className="optical-leak" style={{ top: '20%', left: '10%' }} />
      <div className="optical-leak" style={{ bottom: '10%', right: '5%', animationDelay: '-7s' }} />

      <div ref={textRef} className="z-10 w-full px-6 flex flex-col items-center justify-center pointer-events-none relative">
        
        {/* Text Readability Backplate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-5xl h-[80vh] bg-black/60 blur-[100px] -z-10 rounded-full pointer-events-none mix-blend-multiply"></div>

        <ScrollReveal delay={100}>
          <p className="font-mono text-xs md:text-sm text-silver/50 uppercase tracking-[0.4em] mb-4 text-center">
            Lighting &middot; Optics &middot; Functional Design
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={300} direction="up">
          <h1 className="font-display text-[12vw] sm:text-7xl md:text-8xl lg:text-[11rem] leading-[0.8] tracking-tighter mb-8 text-center uppercase text-gradient">
            OPTICAL<br/>
            <span className="text-silver font-outfit font-light tracking-[-0.05em]">ENGINEERING</span>
          </h1>
        </ScrollReveal>
        
        <div className="w-full max-w-2xl px-4 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-xs uppercase tracking-widest text-silver/70 border-t border-white/10 pt-8 mt-12">
          <ScrollReveal delay={500}>
            <div className="text-center md:text-left">
              <span className="block text-cyan mb-1">Institution</span>
              University of Rochester &apos;28
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={600}>
            <div className="text-center md:text-right">
              <span className="block text-cyan mb-1">Current Status</span>
              <a 
                href="https://linkedin.com/in/grey-golus-632692353" 
                target="_blank" 
                rel="noreferrer" 
                data-cursor="pointer"
                className="hover:text-cyan hover:underline transition-all pointer-events-auto"
              >
                Student / Available for Internships
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
