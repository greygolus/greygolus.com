"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [pathname]);

  return (
    <>
      {/* Layer 1: Cinematic black wipe overlay */}
      <motion.div
        key={pathname + "-overlay"}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ 
          duration: 0.7, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.05 
        }}
        style={{ transformOrigin: "top" }}
        className="fixed inset-0 z-[9000] bg-black pointer-events-none"
        onAnimationComplete={() => {
          if (typeof window !== "undefined") {
            ScrollTrigger.refresh();
          }
        }}
      />

      {/* Layer 2: Subtle cyan accent line that sweeps across */}
      <motion.div
        key={pathname + "-accent"}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ 
          scaleX: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.4, delay: 0.5 }
        }}
        style={{ transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-[2px] z-[9001] bg-gradient-to-r from-transparent via-cyan to-transparent pointer-events-none"
      />

      {/* Layer 3: Content fade-in */}
      <motion.div
        key={pathname + "-content"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.3
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

