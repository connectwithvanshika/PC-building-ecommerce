"use client";

import { motion } from "framer-motion";

export function LightBeams() {
  return (
    <div className="relative w-full h-[40vh] min-h-[300px] overflow-hidden bg-background">
      {/* Deep Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/10 via-transparent to-transparent" />
      <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-[50%] h-[150%] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen opacity-50" />
      <div className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[60%] h-[150%] bg-cyan-400/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-60" />

      {/* Glowing Paths / Beams */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="beamGradient1" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="oklch(0.7 0.15 250)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <linearGradient id="beamGradient2" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor="oklch(0.8 0.15 200)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <filter id="superGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Beam 1 */}
        <motion.path
          d="M-100,250 C200,250 600,200 1100,-50"
          fill="none"
          stroke="url(#beamGradient1)"
          strokeWidth="6"
          filter="url(#superGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Beam 2 */}
        <motion.path
          d="M-100,260 C300,260 500,180 1100,0"
          fill="none"
          stroke="url(#beamGradient2)"
          strokeWidth="4"
          filter="url(#superGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
        />
        {/* Beam 3 */}
        <motion.path
          d="M-100,270 C250,270 550,220 1100,50"
          fill="none"
          stroke="url(#beamGradient1)"
          strokeWidth="2"
          filter="url(#superGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
        />
      </svg>

      {/* Floating Light Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-300 pointer-events-none"
          style={{
            width: Math.random() * 4 + 2 + "px",
            height: Math.random() * 4 + 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            boxShadow: "0 0 10px 2px rgba(103,232,249,0.8)",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Vignette overlays to blend into background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-20 pointer-events-none" />
    </div>
  );
}
