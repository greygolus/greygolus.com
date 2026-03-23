"use client";
/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const BlackbodySimulation = dynamic(() => import('@/components/BlackbodySimulation'), { ssr: false });

export default function ProjectPageClient({ project, slug, nextProject }: { project: any, slug: string, nextProject: { slug: string, title: string } | null }) {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreenImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [fullscreenImage]);

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
      <section className="w-full h-[60vh] relative overflow-hidden mb-24">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40 mix-blend-screen`}></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15vw] text-white/5 whitespace-nowrap tracking-tighter pointer-events-none">
          {project.title.substring(0, 10)}...
        </div>
      </section>

      {/* Project Content - Media First */}
      <section className={`px-6 lg:px-24 mx-auto font-mono text-sm md:text-base text-silver/80 leading-loose flex flex-col gap-24 ${
        slug === 'stage-lighting' ? 'max-w-[1600px]' : 'max-w-[1200px]'
      }`}>
        
        {/* Main Project Image (AI Banners for Interferometer/Thin Lens) */}
        {project.image && !['quantum', 'stage-lighting', 'blackbody-led'].includes(slug) && (
          <div 
            className="w-full relative overflow-hidden border border-white/10 group cursor-pointer"
            onClick={() => setFullscreenImage(project.image)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60 pointer-events-none"></div>
            <Image 
              src={project.image} 
              alt={project.title} 
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" 
            />
          </div>
        )}

        {/* Quantum Specialized Grid Gallery */}
        {slug === 'quantum' && project.gallery && (
          <div className="w-full flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.gallery.map((item: any, i: number) => (
                <div key={i} className="flex flex-col gap-4 group">
                  <div 
                    className="w-full relative overflow-hidden border border-white/10 bg-white/5 cursor-pointer aspect-[16/9] md:h-80"
                    onClick={() => setFullscreenImage(item.src)}
                  >
                    <Image 
                      src={item.src} 
                      alt={item.caption} 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                    />
                  </div>
                  <div className="flex gap-4 items-start px-2">
                    <span className="font-mono text-[10px] text-cyan/40 mt-1 min-w-[1.5rem]">0{i+1}</span>
                    <p className="text-[11px] md:text-xs leading-relaxed text-silver/50 italic font-mono uppercase tracking-wider">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
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
          <div className="w-full">
            <div className={`grid gap-6 md:gap-12 ${
              slug === 'stage-lighting' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1 md:grid-cols-2'
            }`}>
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
                <div 
                  key={i} 
                  className="w-full relative overflow-hidden border border-white/5 group bg-white/5 cursor-pointer"
                  onClick={() => setFullscreenImage(img)}
                >
                  <div className="relative aspect-video w-full">
                    <Image 
                      src={img} 
                      alt={`${project.title} gallery ${i + 1}`} 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" 
                    />
                  </div>
                </div>
              );
            })}
          </div>
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

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 cursor-zoom-out backdrop-blur-md"
            onClick={() => setFullscreenImage(null)}
          >
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={fullscreenImage} 
              alt="Fullscreen view" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
