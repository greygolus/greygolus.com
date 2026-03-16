"use client";
import React, { useState, useMemo, useEffect, useRef } from 'react';
import gsap from 'gsap';

// Visible spectrum bounds in nm
const MIN_WAVELENGTH = 380;
const MAX_WAVELENGTH = 780;
const CONSTANT_C2 = 1.438777e7; // nm * K

// Generate an approximate typical PC-LED spectrum (Blue pump + Phosphor)
const generateLEDCurve = (points: number) => {
  const curve = [];
  const step = (MAX_WAVELENGTH - MIN_WAVELENGTH) / (points - 1);
  for (let i = 0; i < points; i++) {
    const lambda = MIN_WAVELENGTH + i * step;
    
    // Blue pump peak ~ 450nm
    const bluePump = 1.0 * Math.exp(-Math.pow(lambda - 450, 2) / (2 * Math.pow(10, 2)));
    // Broad phosphor peak ~ 580nm
    const phosphor = 0.6 * Math.exp(-Math.pow(lambda - 580, 2) / (2 * Math.pow(60, 2))) + 
                     0.2 * Math.exp(-Math.pow(lambda - 630, 2) / (2 * Math.pow(40, 2)));
                     
    curve.push({ x: lambda, y: bluePump + phosphor });
  }
  // Normalize
  const maxY = Math.max(...curve.map(p => p.y));
  return curve.map(p => ({ x: p.x, y: p.y / maxY }));
};

export default function BlackbodySimulation() {
  const [temperature, setTemperature] = useState(3000);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Animate in
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  const RESOLUTION = 100;

  // Calculate Planck's Law curve
  const blackbodyCurve = useMemo(() => {
    const curve = [];
    const step = (MAX_WAVELENGTH - MIN_WAVELENGTH) / (RESOLUTION - 1);
    
    for (let i = 0; i < RESOLUTION; i++) {
      const lambda = MIN_WAVELENGTH + i * step;
      // Planck's relation (ignoring constants that cancel out in normalization)
      // I(lambda) proportional to (1 / lambda^5) / (exp(c2 / (lambda * T)) - 1)
      const exponent = CONSTANT_C2 / (lambda * temperature);
      
      let intensity = 0;
      if (exponent < 100) { // Avoid Infinity
        intensity = (1 / Math.pow(lambda, 5)) / (Math.exp(exponent) - 1);
      }
      curve.push({ x: lambda, y: intensity });
    }

    // Normalize against the peak within visible spectrum to fill the graph
    const maxY = Math.max(...curve.map(p => p.y)) || 1;
    return curve.map(p => ({ x: p.x, y: p.y / maxY }));
  }, [temperature]);

  const ledCurve = useMemo(() => generateLEDCurve(RESOLUTION), []);

  // SVG dimensions mapped from standard coordinates
  const scaleX = (x: number) => ((x - MIN_WAVELENGTH) / (MAX_WAVELENGTH - MIN_WAVELENGTH)) * 1000;
  const scaleY = (y: number) => 500 - (y * 450); // Leave padding at bottom and top

  const createPath = (curve: {x: number, y: number}[]) => {
    if (curve.length === 0) return "";
    const d = curve.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(" ");
    return d;
  };

  // Compute a rough visual color for the blackbody based on temp
  const bbColor = temperature < 3000 ? '#ff8a00' : 
                  temperature < 5000 ? '#ffd1a3' : 
                  temperature < 7000 ? '#ffffff' : '#ccddff';

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-8 bg-black/40 border border-white/10 backdrop-blur-md p-6 lg:p-12 mb-16 relative group overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10 opacity-50"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
        <div>
          <h3 className="font-display text-4xl uppercase tracking-tighter text-silver mb-2">Spectral Simulator</h3>
          <p className="font-mono text-sm text-silver/60 uppercase tracking-widest">Planck's Law vs PC-LED</p>
        </div>
        
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="flex justify-between font-mono text-xs text-silver tracking-widest uppercase">
            <span>Color Temp (CCT)</span>
            <span className="text-cyan font-bold">{temperature}K</span>
          </div>
          <input 
            type="range" 
            min="1500" 
            max="10000" 
            step="100"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="w-full h-1 bg-white/20 appearance-none cursor-ew-resize accent-cyan rounded-none"
          />
          <style dangerouslySetInnerHTML={{__html: `
            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 16px;
              width: 8px;
              background: #54C8FF;
              border-radius: 0;
              cursor: ew-resize;
              box-shadow: 0 0 10px rgba(84, 200, 255, 0.5);
            }
          `}} />
        </div>
      </div>

      <div className="relative w-full aspect-video md:aspect-[2.5/1] bg-black/80 border border-white/5 overflow-hidden">
        {/* Visible Spectrum Spectral Gradient Background */}
        <div className="absolute inset-x-0 bottom-[10%] h-[90%] opacity-20 pointer-events-none" style={{
          background: 'linear-gradient(90deg, #380082 0%, #0012ff 25%, #00ff00 50%, #ffff00 70%, #ff0000 85%, #4a0000 100%)'
        }}></div>

        <svg 
          ref={svgRef}
          viewBox="0 0 1000 500" 
          className="w-full h-full overflow-visible"
        >
          {/* Grid lines */}
          <line x1="0" y1="50" x2="1000" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="0" y1="275" x2="1000" y2="275" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5,5" />
          <line x1="0" y1="500" x2="1000" y2="500" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          {/* LED Curve */}
          <path 
            d={createPath(ledCurve)} 
            fill="none" 
            stroke="rgba(84, 200, 255, 0.6)" 
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke"
            className="drop-shadow-[0_0_8px_rgba(84,200,255,0.4)]"
          />
          
          {/* Blackbody Curve */}
          <path 
            d={createPath(blackbodyCurve)} 
            fill="none" 
            stroke={bbColor} 
            strokeWidth="4" 
            vectorEffect="non-scaling-stroke"
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-300"
          />

          {/* Axis Labels */}
          <g className="font-mono text-[16px] fill-silver/50" transform="translate(0, 480)">
            <text x="10" y="0">380nm (UV)</text>
            <text x="500" y="0" textAnchor="middle">WAVELENGTH</text>
            <text x="990" y="0" textAnchor="end">780nm (IR)</text>
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 font-mono text-xs uppercase tracking-widest bg-black/50 p-4 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-6 h-1 bg-cyan drop-shadow-[0_0_4px_rgba(84,200,255,0.8)]"></span>
            <span className="text-silver">Typical LED</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-1 transition-colors duration-300" style={{backgroundColor: bbColor, boxShadow: `0 0 8px ${bbColor}`}}></span>
            <span className="text-silver">Ideal Blackbody</span>
          </div>
        </div>
      </div>
    </div>
  );
}
