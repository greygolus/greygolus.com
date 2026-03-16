"use client";
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

const BlackbodySimulation = dynamic(() => import('@/components/BlackbodySimulation'), { ssr: false });

export default function ProjectPageClient({ project, slug, nextProject }: { project: any, slug: string, nextProject: { slug: string, title: string } | null }) {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll to top on navigation
    window.scrollTo(0, 0);

    if (project && heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [project, slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-silver font-mono">
        Project not found.
        <button onClick={() => router.push('/')} className="ml-4 text-cyan hover:underline hover:text-white">Return Home</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden selection:bg-cyan selection:text-black pt-32 pb-24">
      {/* Background stipple */}
      <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-30 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.5\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E')]"></div>

      {/* Hero Header */}
      <section className="px-6 lg:px-24 mb-24 max-w-[1600px] mx-auto" ref={heroRef}>
        <button 
          onClick={() => router.push('/')} 
          className="font-mono text-xs uppercase tracking-[0.2em] text-silver/60 hover:text-cyan transition-colors flex items-center gap-2 mb-16"
        >
          <span className="text-lg leading-none">&larr;</span> Back to Portfolio
        </button>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <div className="flex-1">
            <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-silver mb-8 leading-[0.9]">
              {project.title}
            </h1>
            <p className="font-mono text-sm leading-relaxed text-silver/60 uppercase tracking-widest max-w-xl">
              {project.description}
            </p>
          </div>

          <div className="w-full md:w-1/3 flex flex-col gap-8 font-mono text-xs uppercase tracking-widest text-silver/40">
            <div>
              <span className="block text-cyan/70 mb-2">Role</span>
              <span className="text-silver">{project.role}</span>
            </div>
            <div>
              <span className="block text-cyan/70 mb-2">Year</span>
              <span className="text-silver">{project.year}</span>
            </div>
            <div>
              <span className="block text-cyan/70 mb-2">Technologies</span>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {project.tech.map((t: string, i: number) => (
                  <span key={i} className="text-silver">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Gradient Banner representing the project */}
      {/* Hide for projects where we have real photos or requested removal */}
      {!['quantum', 'stage-lighting', 'blackbody-led'].includes(slug) && (
        <section className="w-full h-[60vh] relative overflow-hidden mb-24">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40 mix-blend-screen`}></div>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15vw] text-white/5 whitespace-nowrap tracking-tighter pointer-events-none">
            {project.title.substring(0, 10)}...
          </div>
        </section>
      )}

      {/* Project Content - Media First */}
      <section className="px-6 lg:px-24 max-w-[1200px] mx-auto font-mono text-sm md:text-base text-silver/80 leading-loose flex flex-col gap-24">
        
        {/* Quantum Specialized Slideshow */}
        {slug === 'quantum' && project.gallery && (
          <div className="w-full flex flex-col gap-8">
            <div className="relative group/carousel">
              <div 
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4"
                style={{ scrollbarWidth: 'none' }}
              >
                {project.gallery.map((item: any, i: number) => (
                  <div key={i} className="min-w-[80%] md:min-w-[60%] lg:min-w-[50%] snap-center flex flex-col gap-6">
                    <div className="w-full aspect-[4/3] relative overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                      <img 
                        src={item.src} 
                        alt={item.caption} 
                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-all duration-700" 
                      />
                    </div>
                    <div className="flex gap-4 items-start px-2">
                      <span className="font-mono text-[10px] text-cyan/40 mt-1">0{i+1}</span>
                      <p className="text-xs md:text-sm leading-relaxed text-silver/60 italic font-mono uppercase tracking-wider">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Layout Hint */}
              <div className="flex justify-between items-center mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-silver/20">
                <span>&larr; Swipe to view experiments</span>
                <span>{project.gallery.length} Images</span>
              </div>
            </div>
          </div>
        )}

        {/* Blackbody Simulation (Above Text) */}
        {slug === 'blackbody-led' && (
          <div className="w-full">
            <BlackbodySimulation />
          </div>
        )}

        {/* Standard Gallery (Above Text) */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.images.map((img: string, i: number) => {
              const isPdf = img.toLowerCase().endsWith('.pdf');
              
              if (isPdf) {
                return (
                  <a 
                    key={i}
                    href={img}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full aspect-[4/3] flex flex-col items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 mb-4 flex items-center justify-center border border-cyan/30 rounded-full group-hover:scale-110 transition-transform">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver/60 group-hover:text-cyan transition-colors text-center px-4">
                      View Project PDF<br/>
                      <span className="text-[8px] opacity-40 lowercase">{img.split('/').pop()}</span>
                    </span>
                  </a>
                );
              }

              return (
                <div key={i} className="w-full relative overflow-hidden border border-white/5 group bg-white/5">
                  <img 
                    src={img} 
                    alt={`${project.title} gallery ${i + 1}`} 
                    className="w-full h-auto object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" 
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Project Description (Now at bottom) */}
        <div className="flex flex-col gap-8">
          <p className="max-w-3xl text-lg text-silver/90">
            {project.content}
          </p>

          {project.link && (
            <div>
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-block px-8 py-4 border border-white/20 hover:border-cyan/50 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-mono text-xs uppercase tracking-[0.2em] text-cyan hover:text-white group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-cyan/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative z-10">{project.linkText || 'Launch Application →'}</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Next Project Footer Block */}
      {nextProject && (
        <section className="w-full mt-32 border-t border-white/10">
          <Link 
            href={`/projects/${nextProject.slug}`}
            className="group block w-full py-24 px-6 lg:px-24 hover:bg-white/5 transition-colors relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <p className="font-mono text-sm text-silver/50 uppercase tracking-[0.3em] mb-4">Next Project &rarr;</p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-8xl text-silver group-hover:text-white transition-colors uppercase tracking-tighter">
              {nextProject.title}
            </h2>
          </Link>
        </section>
      )}
    </main>
  );
}
