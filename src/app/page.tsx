"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts, getNewArrivals } from "@/data/mock";
import { ProductCard } from "@/components/product/ProductCard";
import { ShieldCheck, Truck, Clock, CreditCard, ArrowRight, Zap, Cpu, Monitor, HardDrive, Mouse, Star, CheckCircle2, Camera } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FallingStars } from "@/components/ui/FallingStars";
import { FloatingGamepad } from "@/components/ui/FloatingGamepad";
import { useRef } from "react";

const categories = [
  { name: "Desktops", href: "/category/desktops", color: "from-indigo-600/30 to-transparent", img: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=600&auto=format&fit=crop" },
  { name: "Laptops", href: "/category/laptops", color: "from-violet-600/30 to-transparent", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop" },
  { name: "Components", href: "/category/components", color: "from-blue-600/30 to-transparent", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" },
  { name: "Peripherals", href: "/category/peripherals", color: "from-purple-600/30 to-transparent", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop" },
  { name: "Monitors", href: "/category/monitors", color: "from-sky-600/30 to-transparent", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop" },
  { name: "Storage", href: "/category/storage", color: "from-violet-800/30 to-transparent", img: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=600&auto=format&fit=crop" },
];

const brands = ["NVIDIA", "Intel", "AMD", "Samsung", "Corsair", "Razer", "ASUS", "Logitech"];

const reviews = [
  { name: "Alex Johnson", text: "Insane build quality. The PC arrived faster than expected and handles 4K gaming like a breeze. Highly recommended!", rating: 5, date: "2 weeks ago" },
  { name: "Sarah Miller", text: "Customer service is top-notch. They helped me pick the perfect components for my rendering rig. Aesthetic and powerful.", rating: 5, date: "1 month ago" },
  { name: "David Chen", text: "Best tech store hands down. Prices are competitive and the shipping was incredibly secure. Will buy again.", rating: 5, date: "3 weeks ago" },
];

const portraitClips = [
  "/clip0.mp4", "/clip1.mp4", "/clip2.mp4", "/clip3.mp4", "/clip4.mp4", "/clip5.mp4",
];

const galleryImages = [
  "1587202372634-32705e3bf49c", "1518770660439-4636190af475", "1603302576837-37561b2e2302", 
  "1527443224154-c4a3942d3acf", "1615663245857-ac93bb7c39e7", "1593640408182-31c70c8268f5", 
  "1591488320449-011701bb6704", "1551288049-bebda4e38f71", "1628557044797-f21a177c37ec", 
  "1595225476474-87563907a212",
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
};

export default function Home() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  
  // Parallax hooks for background
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="flex flex-col overflow-hidden bg-background relative selection:bg-primary/20">
      {/* Global Ambient Background Effects */}
      <FallingStars count={40} />
      <FloatingGamepad />
      
      {/* Fixed Ambient Orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen pointer-events-none z-[-1]" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-indigo-600/5 blur-[150px] mix-blend-screen pointer-events-none z-[-1]" />

      {/* ── Hero ── */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background Video */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 overflow-hidden opacity-20 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-110"
            src="https://cdn.pixabay.com/video/2021/08/04/83864-584705353_large.mp4"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-0" />

        <motion.div
          initial="hidden" animate="show" variants={staggerContainer}
          className="container relative z-10 px-4 text-center max-w-6xl mx-auto pt-24"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-8 text-sm px-5 py-2 rounded-full bg-primary/10 text-primary border-primary/20 font-medium backdrop-blur-md">
              <Zap className="mr-2 h-4 w-4" /> The Next Generation of Performance
            </Badge>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-7xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter drop-shadow-2xl">
            BUILD YOUR <br/>
            <span className="gradient-text glow text-transparent bg-clip-text">ULTIMATE</span> <br/>
            MACHINE
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            Award-winning hardware for creators, gamers, and professionals who demand nothing but absolute perfection.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <ButtonLink href="/category/desktops" size="lg" className="text-lg px-10 h-16 rounded-full font-bold glow bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_40px_rgba(var(--primary),0.5)] transition-all hover:scale-105 active:scale-95">
              Shop Custom PCs
            </ButtonLink>
            <ButtonLink href="/category/all" variant="outline" size="lg" className="text-lg px-10 h-16 rounded-full border-primary/30 hover:bg-primary/10 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 group">
              Explore Catalog <ArrowRight className="ml-2 h-5 w-5 inline group-hover:translate-x-1 transition-transform" />
            </ButtonLink>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Products (Magnetic Hover Cards) ── */}
      <section className="py-32 relative overflow-visible">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex items-end justify-between mb-16"
          >
            <motion.div variants={fadeUp}>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter drop-shadow-lg">FEATURED <span className="gradient-text">GEAR</span></h2>
              <p className="text-muted-foreground mt-4 font-sans text-xl font-light">Handpicked components for maximum performance.</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/category/all" className="hidden sm:flex items-center gap-2 text-primary font-bold hover:underline text-lg font-sans group">
                View All <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <div key={product.id} className="perspective-card group">
                <div className="card-3d h-full">
                  <ProductCard product={product} />
                  {/* Hover reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500 pointer-events-none rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cinematic Video Section (Engineered for Perfection) ── */}
      <section className="py-32 relative bg-dashed-grid border-y border-white/5">
        <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <Badge className="mb-6 rounded-full bg-primary/10 text-primary border-primary/20 font-sans text-sm px-4 py-1.5 backdrop-blur-sm">Behind the Build</Badge>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
                ENGINEERED FOR <span className="gradient-text">PERFECTION</span>
              </h2>
              <p className="text-xl text-muted-foreground font-sans mb-10 leading-relaxed font-light">
                Watch our expert builders assemble the most powerful rigs on the planet. From custom water loops to impeccable cable management, we treat every build as a masterpiece of modern engineering.
              </p>
              <ButtonLink href="/category/desktops" className="rounded-full px-10 h-16 glow font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-[0_0_30px_rgba(var(--primary),0.4)]">
                Shop Premium Builds
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotateY: 15 }} whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }}
              className="lg:w-1/2 w-full perspective-card"
            >
              <div className="rounded-[2.5rem] overflow-hidden glass shadow-[0_30px_100px_rgba(var(--primary),0.2)] relative group transform-gpu transition-transform duration-700 hover:rotate-y-[-2deg] hover:rotate-x-[2deg] border border-white/10" style={{ aspectRatio: "9/16", maxHeight: "700px" }}>
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 transition-opacity duration-700 group-hover:opacity-0" />
                <video
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  src="/coding.mp4"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Immersive Video Divider ── */}
      <section className="relative w-full h-[40vh] min-h-[300px] overflow-hidden group">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-700" />
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
          src="/arrow.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-20 pointer-events-none" />
      </section>

      {/* ── Massive Carousel (Crazy PC Builds) ── */}
      <section className="py-32 relative overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 drop-shadow-xl">
              CRAZY <span className="gradient-text">PC BUILDS</span>
            </h2>
            <p className="text-muted-foreground text-xl font-sans font-light">Get inspired by the most insane custom water-cooled and modded rigs.</p>
          </motion.div>

          <Carousel opts={{ align: "start", loop: true, dragFree: true }} className="w-full max-w-[1400px] mx-auto cursor-grab active:cursor-grabbing">
            <CarouselContent className="-ml-4 md:-ml-8">
              {portraitClips.map((filename, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-8 basis-[70%] sm:basis-[45%] md:basis-[30%] lg:basis-[22%]">
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(var(--primary),0.15)] group relative border border-white/10" 
                    style={{ aspectRatio: "9/16" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                    <video
                      autoPlay loop muted playsInline
                      className="w-full h-full object-cover transition-transform duration-700"
                      src={filename}
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* ── Integrated Gallery (Awwwards Style Masonry) ── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-dashed-grid opacity-20 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 drop-shadow-xl">
              VISUAL <span className="gradient-text">SHOWCASE</span>
            </h2>
            <p className="text-xl text-muted-foreground font-sans font-light">A curated collection of premium hardware.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
            {galleryImages.map((id, index) => {
              const isLarge = index === 0 || index === 3;
              const isWide = index === 5;
              return (
                <motion.div 
                  key={id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative group rounded-[2rem] overflow-hidden glass shadow-2xl cursor-crosshair border border-white/5 ${
                    isLarge ? "md:row-span-2 md:col-span-2" : isWide ? "md:col-span-2" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://images.unsplash.com/photo-${id}?w=1200&q=80`}
                    alt="Hardware showcase"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                    <p className="text-white text-2xl font-black font-heading tracking-tight drop-shadow-md">NexusTech Aesthetics</p>
                    <p className="text-white/70 font-sans mt-1">Premium Hardware Collection</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-32 relative bg-card/20 border-t border-white/5">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 drop-shadow-xl">WHAT <span className="gradient-text">GAMERS</span> SAY</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-5xl font-black text-foreground font-heading">4.9</span>
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />)}
              </div>
            </div>
            <p className="text-xl text-muted-foreground font-sans font-light">Based on 10,000+ Verified Reviews</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                className="bg-card/40 backdrop-blur-md p-10 rounded-[2rem] border border-white/10 shadow-2xl relative card-3d group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] pointer-events-none" />
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary text-2xl shadow-inner border border-primary/30">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg font-sans flex items-center gap-2">
                      {review.name}
                      <CheckCircle2 className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.6)]" />
                    </h4>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                </div>
                <div className="flex mb-5 gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground font-sans text-lg leading-relaxed font-light">&ldquo;{review.text}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-40 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-dashed-grid opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 60 }}
          className="container relative z-10 mx-auto px-4 text-center max-w-3xl glass p-16 md:p-20 rounded-[3rem] shadow-[0_40px_100px_rgba(var(--primary),0.15)] border border-white/10"
        >
          <Badge className="mb-8 rounded-full bg-primary/15 text-primary border-primary/30 font-sans text-sm px-5 py-2 backdrop-blur-md">Join the Elite</Badge>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 drop-shadow-xl">UNLOCK <span className="gradient-text">REWARDS</span></h2>
          <p className="text-muted-foreground mb-10 font-sans text-xl font-light leading-relaxed">Exclusive deals, early access to new drops, and expert build guides — delivered straight to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email" placeholder="Enter your email address"
              className="flex-1 px-8 py-5 rounded-full text-foreground bg-background/90 outline-none focus:ring-2 focus:ring-primary border border-border text-lg font-sans shadow-inner backdrop-blur-md transition-all hover:bg-background"
              required
            />
            <Button type="submit" className="rounded-full px-12 h-[68px] font-bold text-lg glow hover:scale-105 active:scale-95 transition-transform shadow-[0_0_30px_rgba(var(--primary),0.4)]">Subscribe</Button>
          </form>
          <p className="text-sm text-muted-foreground mt-6 font-sans">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </section>
    </div>
  );
}
