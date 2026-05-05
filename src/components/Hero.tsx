"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import InteractiveScene from './InteractiveScene';

// Splits a string into individually animated character spans
function SplitText({ 
  children, 
  className = "", 
  charClass = "",
  delay = 0,
  stagger = 0.03,
  duration = 0.8
}: { 
  children: string; 
  className?: string; 
  charClass?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll('.split-char');
    
    gsap.fromTo(chars, 
      { 
        y: 80, 
        opacity: 0,
        rotateX: -40,
      },
      { 
        y: 0, 
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      }
    );
  }, [delay, stagger, duration]);

  return (
    <span ref={containerRef} className={className} style={{ perspective: '600px' }}>
      {children.split('').map((char, i) => (
        <span 
          key={i} 
          className={`split-char inline-block opacity-0 ${charClass}`}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const glowWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Idle floating animation for glow
      gsap.to(glowRef.current, {
        y: 30,
        x: -20,
        rotation: 5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Subtitle fade in
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' }
      );

      // Meta section slide up
      gsap.fromTo(metaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 1.4, ease: 'power3.out' }
      );

      // Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 150; 
        const y = (e.clientY / window.innerHeight - 0.5) * 150;
        gsap.to(glowWrapperRef.current, {
          x,
          y,
          duration: 3,
          ease: 'power2.out'
        });
      };
      window.addEventListener('mousemove', handleMouseMove);

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
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
        <div ref={glowWrapperRef} className="absolute inset-0 flex items-center justify-center">
          <div 
            ref={glowRef}
            className="w-[80vw] max-w-[800px] h-[80vw] max-h-[800px] rounded-full bg-gradient-to-tr from-[rgba(10,31,46,0.3)] via-[rgba(84,200,255,0.05)] to-transparent blur-[100px] opacity-60" 
          />
        </div>
      </div>

      {/* Optical Background Leaks */}
      <div className="optical-leak" style={{ top: '20%', left: '10%' }} />
      <div className="optical-leak" style={{ bottom: '10%', right: '5%', animationDelay: '-7s' }} />

      <div className="z-10 w-full px-6 flex flex-col items-center justify-center pointer-events-none relative">
        
        {/* Text Readability Backplate */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] max-w-5xl h-[80vh] bg-black/60 blur-[100px] -z-10 rounded-full pointer-events-none mix-blend-multiply"></div>

        <p ref={subtitleRef} className="font-mono text-xs md:text-sm text-silver/50 uppercase tracking-[0.4em] mb-4 text-center opacity-0">
          Lighting &middot; Optics &middot; Functional Design
        </p>
        
        <h1 className="font-display text-[12vw] sm:text-7xl md:text-8xl lg:text-[11rem] leading-[0.8] tracking-tighter mb-8 text-center uppercase">
          <SplitText delay={0.5} stagger={0.04} duration={0.9} charClass="text-gradient">
            OPTICAL
          </SplitText>
          <br/>
          <SplitText 
            delay={0.8} 
            stagger={0.03} 
            duration={0.9}
            charClass="text-silver font-outfit font-light tracking-[-0.05em]"
          >
            ENGINEERING
          </SplitText>
        </h1>
        
        <div ref={metaRef} className="w-full max-w-2xl px-4 flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-xs uppercase tracking-widest text-silver/70 border-t border-white/10 pt-8 mt-12 opacity-0">
          <div className="text-center md:text-left">
            <span className="block text-cyan mb-1">Institution</span>
            University of Rochester &apos;28
          </div>
          
          <div className="text-center md:text-right">
            <span className="block text-cyan mb-1">Current Status</span>
            <a 
              href="https://linkedin.com/in/grey-golus-632692353" 
              target="_blank" 
              rel="noreferrer" 
              data-cursor="pointer"
              className="hover:text-cyan hover:underline transition-all pointer-events-auto"
            >
              Spectrum Reach Summer 2026 intern
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

