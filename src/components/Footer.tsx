"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export default function Footer() {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const btn = buttonRef.current;
    if (!wrapper || !btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
    const xTextTo = textRef.current ? gsap.quickTo(textRef.current, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" }) : null;
    const yTextTo = textRef.current ? gsap.quickTo(textRef.current, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" }) : null;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = wrapper.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      // More movement scale since it's a huge button
      xTo(x * 0.2);
      yTo(y * 0.2);
      if(xTextTo && yTextTo) {
        xTextTo(x * 0.1);
        yTextTo(y * 0.1);
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
    <footer id="contact" className="h-screen w-full bg-black relative flex flex-col items-center justify-center overflow-hidden border-t border-white/10">
      
      {/* Background stippled massive graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] rounded-full bg-gradient-to-t from-cyan-900 via-transparent to-black blur-[50px] mix-blend-screen" />
      </div>

      <div className="z-10 flex flex-col items-center justify-center px-6 w-full max-w-7xl">
        <h2 className="font-display text-[12vw] sm:text-[10vw] leading-[0.8] tracking-tighter text-center uppercase text-gradient mb-12 pointer-events-none">
          LET&apos;S WORK<br/>TOGETHER
        </h2>

        <a 
          href="https://linkedin.com/in/grey-golus-632692353"
          target="_blank"
          rel="noreferrer"
          ref={wrapperRef}
          className="p-8 -m-8 block cursor-pointer z-[99] pointer-events-auto"
        >
          <div
            ref={buttonRef} 
            className="relative px-12 py-6 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-cyan/50 backdrop-blur-md transition-colors duration-500 group overflow-hidden pointer-events-none inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/10 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
          <span ref={textRef} className="relative z-10 font-mono text-sm uppercase tracking-[0.5em] text-silver group-hover:text-white transition-colors pointer-events-none inline-block">
            Initiate Contact
          </span>
          </div>
        </a>

        <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 mt-12 mb-4 font-mono text-xs uppercase tracking-widest text-silver/60">
          <a href="https://github.com/greygolus" target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors z-20 relative">GitHub</a>
          <a href="https://linkedin.com/in/grey-golus-632692353" target="_blank" rel="noreferrer" className="hover:text-cyan transition-colors z-20 relative">LinkedIn</a>
          <Link href="/unpublished" className="hover:text-cyan transition-colors z-20 relative">Vault</Link>
          <a href="mailto:ggolus@u.rochester.edu" className="hover:text-cyan transition-colors z-20 relative">Uni Email</a>
          <a href="mailto:golusgrey@gmail.com" className="hover:text-cyan transition-colors z-20 relative">Personal Email</a>
        </div>
      </div>

      <div className="absolute bottom-6 w-full flex justify-between px-6 lg:px-12 font-mono text-xs uppercase tracking-widest text-silver/40 pointer-events-none">
        <span>© {new Date().getFullYear()} GREY GOLUS</span>
        <span>OPTICAL ENGINEERING</span>
      </div>
    </footer>
  );
}
