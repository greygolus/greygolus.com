import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stack = [
  { name: "MATLAB", desc: "Self-taught since Fall '24 and further refined through advanced coursework. Now a daily-use tool for modeling physical systems, data analysis, and laboratory automation." },
  { name: "CodeV", desc: "Establishing a technical foundation in industry-standard lens design software. Actively developing ray-tracing and optimization skills for complex optical systems." },
  { name: "Zemax OpticStudio", desc: "Developing proficiency in sequential and non-sequential optical modeling. Leveraging professional tools to visualize wave propagation and system performance." },
  { name: "Excel", desc: "Expert user with deep experience in organizational logic and data modeling. Proficient in advanced functions, pivot tables, and lookups for both engineering and business applications." },
  { name: "Geometrical Optical Systems", desc: "Comprehensive study of optical properties and system deconstruction. Skilled in applying theoretical strategies to analyze and optimize physical light-paths." },
  { name: "OSHA Scissor Lift Certified", desc: "Professionally certified for high-access operations. Licensed to manage lighting fixtures and infrastructure for large-scale theatrical and architectural installations." }
];
const experience = [
  { role: "Cable Intern", company: "ITN Networks", year: "2025", desc: "Campaign adjustments, system updates, advanced Excel data processing" },
  { role: "Student Research Project", company: "U of R Quantum Lab", year: "2024", desc: "Studied Rabi oscillations in levitated particles for a class-led research project. Hands-on with vacuum systems and laser diagnostics, culminating in a technical poster presentation." },
  { role: "Intern", company: "B&S Accounting", year: "2024", desc: "Designed firm website, UI/UX structure, data entry" },
  { role: "Co-Founder", company: "York Prep Robotics", year: "2022 - 2024", desc: "Engineering leadership, project coordination, STEAM education" }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const resumeRef = useRef<HTMLDivElement>(null);
  const stackListRef = useRef<HTMLUListElement>(null);
  const expListRef = useRef<HTMLUListElement>(null);
  const stackHeadingRef = useRef<HTMLHeadingElement>(null);
  const expHeadingRef = useRef<HTMLHeadingElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' }
        }
      );

      // Bio text
      gsap.fromTo(bioRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: bioRef.current, start: 'top 85%' }
        }
      );

      // Resume button
      gsap.fromTo(resumeRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: resumeRef.current, start: 'top 90%' }
        }
      );

      // Stack heading
      gsap.fromTo(stackHeadingRef.current,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: stackHeadingRef.current, start: 'top 85%' }
        }
      );

      // Stack list items — staggered cascade
      if (stackListRef.current) {
        const stackItems = stackListRef.current.querySelectorAll('li');
        gsap.fromTo(stackItems,
          { opacity: 0, x: -30 },
          { 
            opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: stackListRef.current, start: 'top 80%' }
          }
        );
      }

      // Experience heading
      gsap.fromTo(expHeadingRef.current,
        { opacity: 0, x: -20 },
        { 
          opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: expHeadingRef.current, start: 'top 85%' }
        }
      );

      // Experience list items — staggered cascade
      if (expListRef.current) {
        const expItems = expListRef.current.querySelectorAll('li');
        gsap.fromTo(expItems,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: expListRef.current, start: 'top 80%' }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen w-full bg-black py-24 px-6 lg:px-12 flex flex-col justify-center border-t border-white/10 relative">
      <div className="absolute top-12 left-6 lg:left-12 font-mono text-xs uppercase tracking-widest text-silver/50">
        [ 02 About & Stack ]
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 mt-24">
        
        {/* About Text */}
        <div className="flex flex-col gap-8">
          <h2 ref={headingRef} className="font-display text-4xl lg:text-5xl uppercase tracking-tighter text-silver opacity-0">
             Merging Physics<br/><span className="text-cyan text-gradient">With Interactive Media.</span>
          </h2>
          <p ref={bioRef} className="font-mono text-sm leading-relaxed text-silver/60 uppercase tracking-widest max-w-md opacity-0">
            I am Grey Golus, an Optical Engineering student at the <a href="https://www.hajim.rochester.edu/optics/" target="_blank" rel="noreferrer" className="text-cyan hover:underline hover:text-white transition-colors">University of Rochester</a> (Class of 2028). I focus on the intersection of optomechanical design, computational imaging, stage and architectural lighting, and MATLAB-based simulation.
          </p>
          
          <div ref={resumeRef} className="mt-4 opacity-0">
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-4 border border-white/20 hover:border-cyan/50 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-mono text-xs uppercase tracking-[0.2em] text-silver group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyan/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan inline-block animate-pulse"></span>
                View Full Resume
              </span>
            </a>
          </div>
        </div>

        {/* Lists */}
        <div className="flex flex-col gap-16">
          {/* Stack */}
          <div>
            <h3 ref={stackHeadingRef} className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-8 border-b border-white/10 pb-4 opacity-0">
              {"// The Stack"}
            </h3>
            <ul ref={stackListRef} className="flex flex-col gap-6">
              {stack.map((item, idx) => (
                <li 
                  key={idx} 
                  className="flex flex-col gap-2 opacity-0"
                  onMouseEnter={() => setHoveredSkill(idx)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="font-display text-xl uppercase tracking-tighter text-silver/80 flex items-center gap-4 hover:translate-x-2 transition-transform cursor-help group">
                    <span className="text-cyan/30 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">►</span>
                    {item.name}
                  </div>
                  
                  <AnimatePresence>
                    {(hoveredSkill === idx) && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-mono text-[10px] md:text-xs text-silver/40 uppercase tracking-widest leading-relaxed border-l border-cyan/20 pl-4 ml-6">
                          {item.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h3 ref={expHeadingRef} className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-8 border-b border-white/10 pb-4 opacity-0">
              {"// Experience"}
            </h3>
            <ul ref={expListRef} className="flex flex-col gap-6">
              {experience.map((exp, idx) => (
                <li key={idx} className="flex flex-col gap-1 group hover:opacity-100 opacity-0 transition-opacity cursor-default">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-2">
                    <span className="font-display text-xl uppercase tracking-tighter text-silver group-hover:text-cyan transition-colors">
                      {exp.role}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-widest text-silver/40">
                      {exp.company} &middot; {exp.year}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-silver/50 tracking-wider uppercase lowercase-first">
                    {exp.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

