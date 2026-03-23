"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoaded(true);
          document.body.style.overflow = '';
        }
      });

      // Animate the counter from 0 to 100
      const counter = { value: 0 };
      tl.to(counter, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.innerText = Math.round(counter.value).toString().padStart(3, '0') + '%';
          }
        }
      });

      // Fade out the preloader elements
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        delay: 0.2,
        onComplete: () => {
          // Dispatch event for Hero to start its animation
          window.dispatchEvent(new Event('simulation-ready'));
        }
      });
      
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  if (isLoaded) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] bg-[length:128px_128px] opacity-[0.05] pointer-events-none"></div>
      
      <div className="flex flex-col items-center gap-6 z-10 w-full max-w-md px-12">
        <div className="w-full flex justify-between font-mono text-[10px] uppercase tracking-[0.5em] text-cyan/60 mb-2">
          <span className="animate-pulse">SYSTEM_BOOT_SEQUENCE</span>
          <span ref={percentRef} className="text-white font-bold">000%</span>
        </div>
        
        <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full bg-cyan origin-left animate-preloader-bar shadow-[0_0_15px_rgba(84,200,255,1)]"></div>
        </div>
        
        <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-silver/40 mt-2">
          Initializing Wave Optics Module // GOLUS_DEV_v2.0
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes preloader-bar {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-preloader-bar {
          animation: preloader-bar 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
      `}} />
    </div>
  );
}
