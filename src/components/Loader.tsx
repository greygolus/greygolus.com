"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader() {
  const loaderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        delay: 0.8,
      });
    }, loaderRef);
    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-silver will-change-transform"
    >
      <div className="font-display text-4xl md:text-6xl mb-4 tracking-tighter">GREYGOLUS</div>
      <div className="flex gap-2 items-center text-cyan opacity-80">
        <div className="w-2 h-2 rounded-full bg-cyan animate-pulse"></div>
        <div className="font-mono text-xs uppercase tracking-widest">Initializing</div>
      </div>
    </div>
  );
}
