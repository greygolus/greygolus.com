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
      {/* Cinematic wipe transition overlay */}
      <motion.div
        key={pathname + "-overlay"}
        initial={{ y: 0 }}
        animate={{ y: "-100vh" }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1 
        }}
        className="fixed inset-0 z-[9000] bg-black pointer-events-none border-b border-cyan/20 drop-shadow-[0_10px_30px_rgba(84,200,255,0.1)]"
        onAnimationComplete={() => {
          if (typeof window !== "undefined") {
            ScrollTrigger.refresh();
          }
        }}
      />
      {children}
    </>
  );
}
