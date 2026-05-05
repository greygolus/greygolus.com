import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { unpublishedData } from "@/lib/unpublished";

export default function UnpublishedProjects() {
  return (
    <main className="min-h-screen bg-black relative selection:bg-cyan selection:text-black">
      <Navbar />
      
      <section className="pt-40 pb-20 px-6 lg:px-12 max-w-7xl mx-auto min-h-[60vh] flex flex-col justify-center relative">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-cyan/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
        
        <ScrollReveal delay={200}>
          <div className="font-mono text-sm tracking-[0.3em] uppercase text-silver/60 mb-6 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-silver/30" />
            The Vault
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={300}>
          <h1 className="font-display text-[8vw] sm:text-[6vw] lg:text-[5vw] leading-[0.9] tracking-tighter uppercase text-white mb-8">
            Unpublished <br />
            <span className="text-silver/40">Projects</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <p className="font-mono text-sm md:text-base text-silver/70 max-w-2xl leading-relaxed">
            A collection of functional software, hardware hacks, and tools that are actively used but haven&apos;t been polished for an official release.
          </p>
        </ScrollReveal>
      </section>

      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-40">
        <div className="flex flex-col gap-24 lg:gap-40">
          {Object.entries(unpublishedData).map(([key, project], index) => (
            <div key={key} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}>
              
              <div className="w-full lg:w-1/2">
                <ScrollReveal delay={200} direction="up" className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-tr opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40 rounded-3xl z-0" style={{ backgroundImage: `linear-gradient(to top right, var(--tw-gradient-stops))` }} >
                    {/* The gradient classes are in project.accent, we will apply them by rendering a wrapper with those classes */}
                  </div>
                  <div className={`relative z-10 w-full aspect-[4/3] rounded-sm overflow-hidden border border-white/10 bg-white/5`}>
                    <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${project.accent} mix-blend-overlay`} />
                    {project.image && (
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        fill 
                        className="object-cover scale-150 transition-transform duration-700 group-hover:scale-[1.6] group-hover:rotate-2"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                </ScrollReveal>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <ScrollReveal delay={300} direction="up">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-xs tracking-widest uppercase text-cyan border border-cyan/30 px-3 py-1 rounded-full bg-cyan/5">
                      {project.year}
                    </span>
                    <span className="font-mono text-xs tracking-widest uppercase text-silver/50">
                      {project.role}
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={400} direction="up">
                  <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-white mb-6">
                    {project.title}
                  </h2>
                </ScrollReveal>

                <ScrollReveal delay={500} direction="up">
                  <p className="font-sans text-silver/80 text-lg leading-relaxed mb-8">
                    {project.content}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={600} direction="up">
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((techItem: string) => (
                      <span key={techItem} className="font-mono text-xs text-silver/40 px-4 py-2 border border-white/10 rounded-sm bg-white/5">
                        {techItem}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              </div>

            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
