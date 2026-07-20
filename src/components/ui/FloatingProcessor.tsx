"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function FloatingProcessor() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track global scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();
  
  // ── CINEMATIC JOURNEY FOR CPU (Viewport-relative) ──
  // Starts on the left side, floats around mirroring the gamepad roughly.
  const xPath = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    ["-25vw", "20vw", "-30vw", "10vw", "-35vw", "-10vw"]
  );
  
  const yPath = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    ["10vh", "30vh", "-10vh", "25vh", "-20vh", "-10vh"]
  );

  const rotatePath = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [25, -15, 30, -25, 10, 45]
  );

  const scalePath = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0.6, 0.8, 0.5, 0.7, 0.4, 0.8]
  );

  const opacityPath = useTransform(
    scrollYProgress,
    [0, 0.8, 0.9, 1],
    [1, 1, 0, 0] // Fades out before the footer
  );

  // Apply spring physics for buttery smooth transitions
  const smoothY = useSpring(yPath, { stiffness: 25, damping: 25 });
  const smoothX = useSpring(xPath, { stiffness: 25, damping: 25 });
  const smoothRotate = useSpring(rotatePath, { stiffness: 35, damping: 30 });
  const smoothScale = useSpring(scalePath, { stiffness: 35, damping: 25 });
  const smoothOpacity = useSpring(opacityPath, { stiffness: 40, damping: 20 });

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

  const mouseXBase = mousePosition.x * -15; // moves opposite to gamepad
  const mouseYBase = mousePosition.y * -15;
  
  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none overflow-visible flex items-center justify-center"
      style={{ zIndex: -1, opacity: smoothOpacity }}
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
          rotateX: mousePosition.y * 20,
          rotateY: mousePosition.x * -20,
        }}
        className="relative w-[300px] h-[300px] transition-transform duration-200 ease-out"
      >
        <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-[60px] scale-110 mix-blend-screen animate-pulse" />

        <svg
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        >
          <defs>
            <linearGradient id="cpuBase" x1="0" y1="0" x2="300" y2="300">
              <stop stopColor="oklch(0.20 0.05 200)" />
              <stop offset="1" stopColor="oklch(0.12 0.03 200)" />
            </linearGradient>
            <linearGradient id="cpuDie" x1="50" y1="50" x2="250" y2="250">
              <stop stopColor="oklch(0.10 0.05 250)" />
              <stop offset="1" stopColor="oklch(0.15 0.08 270)" />
            </linearGradient>
            <filter id="goldGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="cpuInset">
              <feOffset dx="0" dy="4" />
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite operator="out" in="SourceGraphic" in2="blur" result="inv" />
              <feFlood floodColor="black" floodOpacity="0.8" result="color" />
              <feComposite operator="in" in="color" in2="inv" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>

          {/* BASE SUBSTRATE */}
          <g style={{ transform: `translate(${mouseXBase * 0.1}px, ${mouseYBase * 0.1}px)` }}>
            <rect x="20" y="20" width="260" height="260" rx="10" fill="url(#cpuBase)" stroke="oklch(0.35 0.15 150)" strokeWidth="2" filter="url(#cpuInset)" />
            {/* Gold Pins/Contacts */}
            <g opacity="0.8" fill="oklch(0.70 0.15 80)">
              {Array.from({ length: 12 }).map((_, i) => (
                <rect key={`t-${i}`} x={40 + i * 18} y="22" width="6" height="12" rx="1" />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <rect key={`b-${i}`} x={40 + i * 18} y="266" width="6" height="12" rx="1" />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <rect key={`l-${i}`} x="22" y={40 + i * 18} width="12" height="6" rx="1" />
              ))}
              {Array.from({ length: 12 }).map((_, i) => (
                <rect key={`r-${i}`} x="266" y={40 + i * 18} width="12" height="6" rx="1" />
              ))}
            </g>
          </g>

          {/* INNER DIE */}
          <g style={{ transform: `translate(${mouseXBase * 0.3}px, ${mouseYBase * 0.3}px)` }}>
            <rect x="60" y="60" width="180" height="180" rx="8" fill="url(#cpuDie)" stroke="oklch(0.25 0.1 250)" strokeWidth="4" filter="url(#cpuInset)" />
            {/* Circuits */}
            <path d="M 150 60 V 100 M 150 200 V 240 M 60 150 H 100 M 200 150 H 240" stroke="oklch(0.60 0.15 250)" strokeWidth="2" opacity="0.5" />
            <path d="M 120 60 L 120 80 L 100 100 V 120 M 180 60 L 180 80 L 200 100 V 120" stroke="oklch(0.60 0.15 250)" strokeWidth="2" opacity="0.4" />
          </g>

          {/* IHS (Integrated Heat Spreader) TEXT */}
          <g style={{ transform: `translate(${mouseXBase * 0.5}px, ${mouseYBase * 0.5}px)` }}>
            <rect x="100" y="100" width="100" height="100" rx="4" fill="oklch(0.15 0.05 250)" filter="url(#cpuInset)" />
            <text x="150" y="145" textAnchor="middle" fill="oklch(0.85 0.05 250)" fontSize="20" fontWeight="900" fontFamily="sans-serif" letterSpacing="2">NEXUS</text>
            <text x="150" y="165" textAnchor="middle" fill="oklch(0.65 0.05 250)" fontSize="12" fontWeight="bold" fontFamily="sans-serif">I9-XTREME</text>
            {/* Glowing nodes on top layer */}
            <circle cx="110" cy="110" r="3" fill="oklch(0.85 0.15 200)" filter="url(#goldGlow)" />
            <circle cx="190" cy="110" r="3" fill="oklch(0.85 0.15 200)" filter="url(#goldGlow)" />
            <circle cx="110" cy="190" r="3" fill="oklch(0.85 0.15 200)" filter="url(#goldGlow)" />
            <circle cx="190" cy="190" r="3" fill="oklch(0.85 0.15 200)" filter="url(#goldGlow)" />
          </g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
