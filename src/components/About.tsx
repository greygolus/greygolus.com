"use client";
import React from 'react';

const stack = ["MATLAB", "CodeV", "Zemax OpticStudio", "Excel", "Geometrical Optical Systems", "OSHA Scissor Lift Certified"];
const experience = [
  { role: "Cable Intern", company: "ITN Networks", year: "2025", desc: "Campaign adjustments, system updates, advanced Excel data processing" },
  { role: "Student Researcher", company: "U of R Quantum Lab", year: "2024", desc: "Vacuum systems, EOMs, photodiode detection, MATLAB conversion" },
  { role: "Intern", company: "B&S Accounting", year: "2024", desc: "Designed firm website, UI/UX structure, data entry" },
  { role: "Co-Founder", company: "York Prep Robotics", year: "2022 - 2024", desc: "Engineering leadership, project coordination, STEAM education" }
];

export default function About() {
  return (
    <section className="min-h-screen w-full bg-black py-24 px-6 lg:px-12 flex flex-col justify-center border-t border-white/10 relative">
      <div className="absolute top-12 left-6 lg:left-12 font-mono text-xs uppercase tracking-widest text-silver/50">
        [ 02 About & Stack ]
      </div>

      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 mt-24">
        
        {/* About Text */}
        <div className="flex flex-col gap-8">
          <h2 className="font-display text-4xl lg:text-5xl uppercase tracking-tighter text-silver">
             Merging Physics<br/><span className="text-cyan text-gradient">With Interactive Media.</span>
          </h2>
          <p className="font-mono text-sm leading-relaxed text-silver/60 uppercase tracking-widest max-w-md">
            I am Grey Golus, an Optical Engineering student at the <a href="https://www.hajim.rochester.edu/optics/" target="_blank" rel="noreferrer" className="text-cyan hover:underline hover:text-white transition-colors">University of Rochester</a> (Class of 2028). I focus on the intersection of optomechanical design, computational imaging, stage and architectural lighting, and MATLAB-based simulation.
          </p>
          
          <div className="mt-4">
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
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-8 border-b border-white/10 pb-4">
              {"// The Stack"}
            </h3>
            <ul className="flex flex-col gap-4">
              {stack.map((item, idx) => (
                <li key={idx} className="font-display text-xl uppercase tracking-tighter text-silver/80 flex items-center gap-4 hover:translate-x-2 transition-transform cursor-default group">
                  <span className="text-cyan/30 text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">►</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-cyan mb-8 border-b border-white/10 pb-4">
              {"// Experience"}
            </h3>
            <ul className="flex flex-col gap-6">
              {experience.map((exp, idx) => (
                <li key={idx} className="flex flex-col gap-1 group hover:opacity-100 opacity-70 transition-opacity cursor-default">
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
