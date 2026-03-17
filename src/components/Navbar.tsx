"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function Navbar() {
  const [time, setTime] = useState("");
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' [EST]');
    };
    updateTime();
    const int = setInterval(updateTime, 1000);
    return () => clearInterval(int);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const btn = buttonRef.current;
    if (!wrapper || !btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    
    // Slight separate movement for text for parallax
    const xTextTo = textRef.current ? gsap.quickTo(textRef.current, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" }) : null;
    const yTextTo = textRef.current ? gsap.quickTo(textRef.current, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = wrapper.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.4);
      yTo(y * 0.4);
      if(xTextTo && yTextTo) {
        xTextTo(x * 0.2);
        yTextTo(y * 0.2);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      if(xTextTo && yTextTo) {
        xTextTo(0);
        yTextTo(0);
      }
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full p-6 lg:px-12 lg:py-10 z-[500] flex justify-between items-center pointer-events-none mix-blend-difference">
      <ScrollReveal delay={100} direction="none">
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo.png" 
            alt="Grey Golus Logo" 
            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
          <div className="hidden sm:block font-display text-xl font-bold tracking-widest text-silver">
            GREYGOLUS
          </div>
        </div>
      </ScrollReveal>
      
      <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-6 font-mono text-xs text-silver/70 tracking-widest uppercase pointer-events-auto items-center">
        <ScrollReveal delay={200} direction="none">
          <a href="https://linkedin.com/in/grey-golus-632692353" target="_blank" rel="noreferrer" data-cursor="pointer" className="hover:text-cyan transition-colors">LinkedIn</a>
        </ScrollReveal>
        <ScrollReveal delay={300} direction="none">
          <span className="text-white/40">{time}</span>
        </ScrollReveal>
        <ScrollReveal delay={400} direction="none">
          <a href="https://github.com/greygolus" target="_blank" rel="noreferrer" data-cursor="pointer" className="hover:text-cyan transition-colors">GitHub</a>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={500} direction="none">
        <div className="pointer-events-auto flex items-center gap-4 relative z-[99]">
          <Link 
            href="/#contact"
            ref={wrapperRef}
            data-cursor="pointer"
            className="p-6 -m-6 block cursor-pointer"
            onClick={(e) => { 
              if (pathname === '/') {
                e.preventDefault(); 
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <div
              ref={buttonRef} 
              className="relative inline-block px-6 py-2 transition-[padding] duration-300 text-silver hover:text-white group pointer-events-none"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-t-[2px] border-l-[2px] border-[#FBFBFB80] rounded-tl-[10px]"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-[2px] border-r-[2px] border-[#FBFBFB80] rounded-tr-[10px]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[2px] border-l-[2px] border-[#FBFBFB80] rounded-bl-[10px]"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[2px] border-r-[2px] border-[#FBFBFB80] rounded-br-[10px]"></div>
            <span ref={textRef} className="text-sm font-mono tracking-widest uppercase inline-block font-bold pointer-events-none">Contact</span>
            </div>
          </Link>
        </div>
      </ScrollReveal>
    </nav>
  );
}
