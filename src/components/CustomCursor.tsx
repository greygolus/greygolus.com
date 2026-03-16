"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      });

      // Simple detection for hover states
      const target = e.target as HTMLElement;
      const isProject = target.closest('[data-cursor="project"]');
      const isInteractive = target.closest('a, button, [data-cursor="pointer"]');

      if (isProject) {
        gsap.to(cursor, { 
          width: 80, 
          height: 80, 
          backgroundColor: '#54C8FF', 
          mixBlendMode: 'normal',
          duration: 0.4 
        });
        setCursorText("VIEW");
      } else if (isInteractive) {
        gsap.to(cursor, { 
          width: 40, 
          height: 40, 
          backgroundColor: '#ffffff', 
          mixBlendMode: 'difference',
          duration: 0.3 
        });
        setCursorText("");
      } else {
        gsap.to(cursor, { 
          width: 12, 
          height: 12, 
          backgroundColor: '#ffffff', 
          mixBlendMode: 'difference',
          duration: 0.3 
        });
        setCursorText("");
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center font-mono text-[10px] text-black font-bold tracking-tighter"
      >
        <span ref={textRef}>{cursorText}</span>
      </div>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
}
