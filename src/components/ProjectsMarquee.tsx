"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

import ScrollReveal from './ScrollReveal';
import ProjectCardBackground from './ProjectCardBackground';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Quantum Optomechanics",
    description: "Lab Research / MATLAB",
    year: "2024",
    accent: "from-purple-500 to-indigo-900",
    slug: "quantum"
  },
  {
    title: "Thin Lens Guide",
    description: "Optics / Education",
    year: "2024",
    accent: "from-emerald-500 to-teal-900",
    slug: "thin-lens"
  },
  {
    title: "Interferometer Simulation",
    description: "Simulation / MATLAB",
    year: "2024",
    accent: "from-cyan-500 to-blue-900",
    slug: "interferometer"
  },
  {
    title: "Blackbody vs LED",
    description: "Color Science / Chart.js",
    year: "2024",
    accent: "from-orange-500 to-red-900",
    slug: "blackbody-led"
  },
  {
    title: "Stage Lighting",
    description: "Design / Color",
    year: "2024",
    accent: "from-pink-500 to-rose-900",
    slug: "stage-lighting"
  }
];

export default function ProjectsMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const totalScroll = container.scrollWidth - window.innerWidth;

      gsap.to(container, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-black overflow-hidden flex flex-col justify-center border-t border-white/10 relative">
      <div className="absolute top-32 left-6 lg:left-12 font-outfit text-[10px] sm:text-xs uppercase tracking-[0.4em] text-cyan/70 z-10 font-bold flex items-center gap-3">
        <span className="w-12 h-[1px] bg-cyan/30" />
        01 Selected Works
      </div>
      
      <div ref={containerRef} className="flex gap-12 px-6 lg:px-24 w-[350vw] lg:w-[250vw] items-center h-full">
        {projects.map((project, idx) => (
          <ScrollReveal delay={idx * 150} direction="up" key={idx} className="shrink-0 h-[65vh]">
            <Link 
              href={`/projects/${project.slug}`} 
              data-cursor="project"
              className="block group relative w-[80vw] lg:w-[45vw] h-full border border-white/5 p-10 flex flex-col justify-between hover:border-cyan/50 transition-all duration-700 bg-[#050505] backdrop-blur-md shrink-0 overflow-hidden cursor-pointer group/card"
            >
              
              {/* Massive Background Number */}
              <div className="absolute -top-10 -right-10 font-display text-[20rem] leading-none text-white/[0.01] group-hover/card:text-white/[0.03] transition-all duration-700 pointer-events-none select-none italic">
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Technical Scan Lines */}
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-10 transition-opacity duration-700 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
              </div>

              {/* Premium Light Sheen Effect */}
              <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              </div>

              {/* Project Image/Gradient Display */}
              <ProjectCardBackground accent={project.accent} />

              {/* Enhanced Physical Grain/Noise Texture Overlay */}
              <div className="absolute inset-0 bg-[#050505] opacity-20 pointer-events-none"></div>

              <div className="flex justify-between items-start relative z-10">
                <div className="font-mono text-[10px] text-silver/40 uppercase tracking-[0.2em] flex flex-col gap-1">
                  <span>REFR: GOLUS_DEV_{project.year}</span>
                </div>
                <div className="font-mono text-xs text-silver/60 uppercase tracking-widest flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-white/20" />
                  {project.year}
                </div>
              </div>
              
              <div className="mt-auto relative z-10 flex justify-between items-end">
                <div className="max-w-[80%]">
                  <h2 className="font-display text-5xl lg:text-6xl uppercase tracking-tighter text-silver group-hover/card:text-white transition-all duration-500 leading-[0.9]">
                    {project.title}
                  </h2>
                  <div className="overflow-hidden mt-6">
                    <p className="font-outfit text-sm font-light text-silver/60 max-w-sm uppercase tracking-[0.15em] translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-700">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-700 text-cyan">
                  <div className="w-12 h-12 border border-cyan/20 rounded-full flex items-center justify-center group-hover/card:bg-cyan group-hover/card:text-black transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
