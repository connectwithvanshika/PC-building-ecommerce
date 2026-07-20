"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Camera } from "lucide-react";

// Collect a mix of Unsplash images to showcase our components
const galleryImages = [
  "1587202372634-32705e3bf49c", // Desktop
  "1518770660439-4636190af475", // Component
  "1603302576837-37561b2e2302", // Laptop
  "1527443224154-c4a3942d3acf", // Monitor
  "1615663245857-ac93bb7c39e7", // Peripheral
  "1593640408182-31c70c8268f5", // Desktop 2
  "1591488320449-011701bb6704", // Component 2
  "1551288049-bebda4e38f71", // Monitor 2
  "1628557044797-f21a177c37ec", // Storage
  "1595225476474-87563907a212", // Peripheral 2
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ── */}
      <section className="relative py-24 overflow-hidden bg-dashed-grid border-b">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background/90" />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <Badge className="mb-6 rounded-full bg-primary/10 text-primary border-primary/20 font-sans text-sm">
              <Camera className="w-4 h-4 mr-2 inline" /> Visual Showcase
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              <span className="gradient-text">GALLERY</span>
            </h1>
            <p className="text-lg text-muted-foreground font-sans max-w-2xl mx-auto">
              A curated collection of the premium hardware and custom builds available at NexusTech.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Masonry/Grid Gallery ── */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
          >
            {galleryImages.map((id, index) => {
              // Make some items span 2 rows or columns for a masonry feel
              const isLarge = index === 0 || index === 3;
              const isWide = index === 5;
              
              return (
                <motion.div 
                  key={id}
                  variants={fadeUp}
                  className={`relative group rounded-3xl overflow-hidden glass shadow-sm cursor-zoom-in ${
                    isLarge ? "lg:row-span-2 lg:col-span-2 sm:col-span-2 sm:row-span-2" : 
                    isWide ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://images.unsplash.com/photo-${id}?w=1200&q=80`}
                    alt="Gallery Showcase Item"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white font-bold font-sans">Premium Hardware</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
