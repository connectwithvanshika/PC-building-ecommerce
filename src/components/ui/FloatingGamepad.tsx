"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FloatingGamepad() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // As user scrolls 0→2000px, gamepad drifts right, rotates, fades
  const x = useTransform(scrollY, [0, 2000], [0, 180]);
  const y = useTransform(scrollY, [0, 2000], [0, -120]);
  const rotate = useTransform(scrollY, [0, 2000], [-8, 40]);
  const opacity = useTransform(scrollY, [0, 400, 1400, 2000], [0.18, 0.28, 0.18, 0]);

  return (
    <div ref={ref} className="fixed pointer-events-none z-0 top-1/3 right-8 hidden lg:block" aria-hidden="true">
      <motion.div
        style={{ x, y, rotate, opacity }}
        className="float-anim"
      >
        {/* Gamepad SVG */}
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Body */}
          <path
            d="M20 20 Q10 20 8 35 L5 60 Q4 72 15 72 Q25 72 30 62 L35 55 H85 L90 62 Q95 72 105 72 Q116 72 115 60 L112 35 Q110 20 100 20 Z"
            fill="oklch(0.55 0.25 270 / 80%)"
            stroke="oklch(0.65 0.27 270)"
            strokeWidth="1.5"
          />
          {/* Left D-pad */}
          <rect x="22" y="36" width="6" height="16" rx="2" fill="oklch(0.75 0.20 270 / 90%)" />
          <rect x="16" y="42" width="18" height="6" rx="2" fill="oklch(0.75 0.20 270 / 90%)" />
          {/* Right buttons */}
          <circle cx="90" cy="38" r="4" fill="oklch(0.70 0.18 230 / 90%)" />
          <circle cx="82" cy="44" r="4" fill="oklch(0.72 0.22 290 / 90%)" />
          <circle cx="98" cy="44" r="4" fill="oklch(0.72 0.22 250 / 90%)" />
          <circle cx="90" cy="50" r="4" fill="oklch(0.68 0.20 210 / 90%)" />
          {/* Center logo area */}
          <rect x="52" y="36" width="16" height="10" rx="5" fill="oklch(0.65 0.27 270 / 60%)" />
          {/* Joysticks */}
          <circle cx="38" cy="52" r="8" fill="oklch(0.20 0.05 270 / 90%)" stroke="oklch(0.60 0.22 270)" strokeWidth="1.5" />
          <circle cx="74" cy="52" r="8" fill="oklch(0.20 0.05 270 / 90%)" stroke="oklch(0.60 0.22 270)" strokeWidth="1.5" />
          {/* Shoulder buttons */}
          <rect x="18" y="18" width="22" height="8" rx="4" fill="oklch(0.50 0.22 270 / 80%)" />
          <rect x="80" y="18" width="22" height="8" rx="4" fill="oklch(0.50 0.22 270 / 80%)" />
          {/* Glow effect */}
          <ellipse cx="60" cy="65" rx="30" ry="4" fill="oklch(0.65 0.27 270 / 20%)" />
        </svg>
      </motion.div>
    </div>
  );
}
