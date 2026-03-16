"use client";
import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
}

export default function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0,
  direction = 'up'
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    const { current } = domRef;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  const getTranslation = () => {
    if (direction === 'up') return 'translate-y-8';
    if (direction === 'down') return '-translate-y-8';
    return '';
  };

  return (
    <div
      ref={domRef}
      className={`${className} transition-all duration-1000 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getTranslation()}`}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
