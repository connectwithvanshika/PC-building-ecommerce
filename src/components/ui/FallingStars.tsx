"use client";

import { useEffect, useRef } from "react";

interface Star {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export function FallingStars({ count = 30 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate stable star data (avoid hydration issues)
  const stars: Star[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: ((i * 37 + 13) % 100),
    delay: (i * 0.37) % 6,
    duration: 4 + (i * 0.23) % 5,
    size: 1 + (i % 3),
    opacity: 0.4 + (i % 4) * 0.15,
  }));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full star-fall"
          style={{
            left: `${star.left}%`,
            top: `-${star.size * 2}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: `oklch(0.70 0.22 ${260 + (star.id % 40)} / ${star.opacity})`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 ${star.size * 3}px oklch(0.65 0.27 270 / 60%)`,
          }}
        />
      ))}
    </div>
  );
}
