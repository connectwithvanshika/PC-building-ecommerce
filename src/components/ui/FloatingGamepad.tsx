"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function FloatingGamepad() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track global scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();
  
  // ── CINEMATIC JOURNEY (Viewport-relative) ──
  // Container is perfectly centered. We move it using vw/vh.
  const xPath = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.75, 0.92, 1], 
    ["30vw", "-35vw", "25vw", "-25vw", "30vw", "0vw", "0vw"]
  );
  
  const yPath = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.35, 0.55, 0.75, 0.92, 1], 
    ["-25vh", "10vh", "30vh", "-30vh", "5vh", "50vh", "0vh"]
  );

  // Rotate smoothly as it floats, then "roll in" aggressively at the end, settling to 0.
  const rotatePath = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.92, 1],
    [-15, 25, -10, 30, -15, -180, 0]
  );

  // Scale down when flying around, then MASSIVE scale up at the footer.
  const scalePath = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.92, 1],
    [0.7, 0.5, 0.8, 0.6, 0.7, 0.3, 1.4]
  );

  // Z-Index: Stays behind content (z-0) until the footer, then jumps to foreground (z-50)
  const zIndexPath = useTransform(
    scrollYProgress,
    [0, 0.95, 0.96, 1],
    [0, 0, 50, 50]
  );
  
  // Apply spring physics for buttery smooth transitions
  const smoothY = useSpring(yPath, { stiffness: 30, damping: 20 });
  const smoothX = useSpring(xPath, { stiffness: 30, damping: 20 });
  const smoothRotate = useSpring(rotatePath, { stiffness: 40, damping: 25 });
  const smoothScale = useSpring(scalePath, { stiffness: 40, damping: 20 });
  const smoothZIndex = useSpring(zIndexPath, { stiffness: 1000, damping: 100 }); // Fast jump

  // Mouse-based 3D Parallax effect (idle breathing)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const mouseXBase = mousePosition.x * 20;
  const mouseYBase = mousePosition.y * 20;
  
  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none overflow-visible flex items-center justify-center"
      style={{ zIndex: smoothZIndex }}
      aria-hidden="true"
    >
      <motion.div
        ref={containerRef}
        style={{
          y: smoothY,
          x: smoothX,
          rotate: smoothRotate,
          scale: smoothScale,
          transformPerspective: 1200,
          rotateX: mousePosition.y * -15,
          rotateY: mousePosition.x * 15,
        }}
        className="relative w-[500px] h-[350px] transition-transform duration-200 ease-out"
      >
        {/* Dynamic glow that gets intensely brighter at the footer */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.9, 1], [0.5, 0.5, 1]) }}
          className="absolute inset-0 bg-primary/40 rounded-full blur-[80px] scale-90 mix-blend-screen animate-pulse" 
        />
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.9, 1], [0.3, 0.3, 0.8]) }}
          className="absolute inset-0 bg-indigo-500/50 rounded-full blur-[100px] scale-110 mix-blend-screen" 
        />

        <svg
          viewBox="0 0 400 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
        >
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="400" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="oklch(0.20 0.05 270)" />
              <stop offset="1" stopColor="oklch(0.12 0.03 270)" />
            </linearGradient>
            <linearGradient id="accentGrad" x1="0" y1="0" x2="400" y2="280" gradientUnits="userSpaceOnUse">
              <stop stopColor="oklch(0.55 0.25 270)" />
              <stop offset="1" stopColor="oklch(0.40 0.15 270)" />
            </linearGradient>
            <filter id="insetShadow">
              <feOffset dx="0" dy="8" />
              <feGaussianBlur stdDeviation="6" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.7" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* BASE LAYER: Main Chassis */}
          <g style={{ transform: `translate(${mouseXBase * 0.1}px, ${mouseYBase * 0.1}px)` }}>
            <path
              d="M70 80 Q30 80 20 130 L10 210 Q5 250 40 250 Q75 250 90 210 L100 180 H300 L310 210 Q325 250 360 250 Q395 250 390 210 L380 130 Q370 80 330 80 Z"
              fill="url(#bodyGrad)"
              stroke="oklch(0.35 0.10 270)"
              strokeWidth="3"
              filter="url(#insetShadow)"
            />
            {/* Grip Textures */}
            <path d="M40 220 Q20 200 30 160" stroke="oklch(0.15 0.02 270)" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
            <path d="M55 230 Q35 210 45 170" stroke="oklch(0.15 0.02 270)" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
            <path d="M360 220 Q380 200 370 160" stroke="oklch(0.15 0.02 270)" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
            <path d="M345 230 Q365 210 355 170" stroke="oklch(0.15 0.02 270)" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
          </g>

          {/* MID LAYER: Buttons, D-Pad, Center Panel */}
          <g style={{ transform: `translate(${mouseXBase * 0.3}px, ${mouseYBase * 0.3}px)` }}>
            {/* Center Panel */}
            <rect x="160" y="100" width="80" height="100" rx="15" fill="oklch(0.10 0.02 270)" stroke="oklch(0.25 0.05 270)" strokeWidth="2" filter="url(#insetShadow)" />
            <ellipse cx="200" cy="120" rx="20" ry="6" fill="url(#accentGrad)" opacity="0.8" filter="url(#glow)" />
            
            {/* Menu Buttons */}
            <circle cx="175" cy="150" r="6" fill="oklch(0.30 0.10 270)" />
            <circle cx="225" cy="150" r="6" fill="oklch(0.30 0.10 270)" />

            {/* D-Pad */}
            <g transform="translate(80, 130)">
              <rect x="-10" y="-30" width="20" height="60" rx="4" fill="oklch(0.15 0.03 270)" filter="url(#insetShadow)" />
              <rect x="-30" y="-10" width="60" height="20" rx="4" fill="oklch(0.15 0.03 270)" filter="url(#insetShadow)" />
              <path d="M0 -22 L-4 -16 H4 Z" fill="oklch(0.55 0.25 270)" opacity="0.7" />
              <path d="M0 22 L-4 16 H4 Z" fill="oklch(0.55 0.25 270)" opacity="0.7" />
              <path d="M-22 0 L-16 -4 V4 Z" fill="oklch(0.55 0.25 270)" opacity="0.7" />
              <path d="M22 0 L16 -4 V4 Z" fill="oklch(0.55 0.25 270)" opacity="0.7" />
            </g>

            {/* Action Buttons */}
            <g transform="translate(320, 130)">
              <circle cx="0" cy="-25" r="12" fill="oklch(0.15 0.03 270)" filter="url(#insetShadow)" />
              <text x="0" y="-20" textAnchor="middle" fill="oklch(0.85 0.15 250)" fontSize="14" fontWeight="bold" fontFamily="sans-serif">Y</text>
              <circle cx="0" cy="25" r="12" fill="oklch(0.15 0.03 270)" filter="url(#insetShadow)" />
              <text x="0" y="30" textAnchor="middle" fill="oklch(0.75 0.25 150)" fontSize="14" fontWeight="bold" fontFamily="sans-serif">A</text>
              <circle cx="-25" cy="0" r="12" fill="oklch(0.15 0.03 270)" filter="url(#insetShadow)" />
              <text x="-25" y="5" textAnchor="middle" fill="oklch(0.60 0.25 250)" fontSize="14" fontWeight="bold" fontFamily="sans-serif">X</text>
              <circle cx="25" cy="0" r="12" fill="oklch(0.15 0.03 270)" filter="url(#insetShadow)" />
              <text x="25" y="5" textAnchor="middle" fill="oklch(0.65 0.25 20)" fontSize="14" fontWeight="bold" fontFamily="sans-serif">B</text>
            </g>
          </g>

          {/* TOP LAYER: 3D Joysticks */}
          <g style={{ transform: `translate(${mouseXBase * 0.7}px, ${mouseYBase * 0.7}px)` }}>
            <g transform="translate(130, 200)">
              <circle cx="0" cy="0" r="28" fill="oklch(0.08 0.02 270)" filter="url(#insetShadow)" />
              <circle cx="-4" cy="-4" r="24" fill="oklch(0.20 0.05 270)" />
              <circle cx="-8" cy="-8" r="15" fill="oklch(0.25 0.05 270)" />
              <path d="M-15 -15 A 12 12 0 0 1 -5 -20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" fill="none" />
            </g>
            <g transform="translate(270, 200)">
              <circle cx="0" cy="0" r="28" fill="oklch(0.08 0.02 270)" filter="url(#insetShadow)" />
              <circle cx="-4" cy="-4" r="24" fill="oklch(0.20 0.05 270)" />
              <circle cx="-8" cy="-8" r="15" fill="oklch(0.25 0.05 270)" />
              <path d="M-15 -15 A 12 12 0 0 1 -5 -20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" fill="none" />
            </g>
          </g>

          {/* TRIGGERS LAYER */}
          <g style={{ transform: `translate(${mouseXBase * 0.05}px, ${mouseYBase * 0.05}px)` }}>
            <path d="M60 80 Q70 50 110 50 H130 V80 Z" fill="url(#accentGrad)" opacity="0.9" />
            <path d="M340 80 Q330 50 290 50 H270 V80 Z" fill="url(#accentGrad)" opacity="0.9" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
