import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black relative selection:bg-cyan selection:text-black flex flex-col justify-between">
      <Navbar />
      
      <section className="flex-grow flex flex-col items-center justify-center px-6 relative z-10 text-center mt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-cyan/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        
        <h1 className="font-display text-[15vw] sm:text-[10rem] leading-none text-white tracking-tighter mb-4 relative z-10">
          404
        </h1>
        
        <h2 className="font-mono text-xl md:text-2xl text-cyan uppercase tracking-widest mb-6 relative z-10">
          Total Internal Reflection
        </h2>
        
        <p className="font-sans text-silver/70 max-w-md text-lg leading-relaxed mb-12 relative z-10">
          Looks like the light didn't reach this page. The path you're looking for might have been moved or no longer exists.
        </p>
        
        <Link 
          href="/"
          data-cursor="pointer"
          className="relative inline-block px-8 py-4 border border-white/20 hover:border-cyan/50 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-mono text-xs uppercase tracking-[0.2em] text-silver group overflow-hidden z-10"
        >
          <div className="absolute inset-0 bg-cyan/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative z-10">Return to Source</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
