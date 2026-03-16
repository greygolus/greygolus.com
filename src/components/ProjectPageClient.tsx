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
    if (project && heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, [project]);

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
      <section className="w-full h-[60vh] relative overflow-hidden mb-24">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40 mix-blend-screen`}></div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[15vw] text-white/5 whitespace-nowrap tracking-tighter pointer-events-none">
          {project.title.substring(0, 10)}...
        </div>
      </section>

      {/* Project Content */}
      <section className="px-6 lg:px-24 max-w-[1200px] mx-auto font-mono text-sm md:text-base text-silver/80 leading-loose flex flex-col gap-16">
        {/* Main Project Image */}
        {project.image && (
          <div className="w-full relative overflow-hidden border border-white/10 group cursor-crosshair">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-60"></div>
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
            />
          </div>
        )}

        <p className="max-w-3xl">
          {project.content}
        </p>

        {/* Additional Project Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            {project.images.map((img: string, i: number) => (
              <div key={i} className="w-full relative overflow-hidden border border-white/5 group bg-white/5">
                <img 
                  src={img} 
                  alt={`${project.title} galley ${i + 1}`} 
                  className="w-full h-auto object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" 
                />
              </div>
            ))}
          </div>
        )}

        {slug === 'blackbody-led' && (
          <div className="w-full my-8">
            <BlackbodySimulation />
          </div>
        )}

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
