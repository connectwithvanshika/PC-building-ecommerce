"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts, getNewArrivals } from "@/data/mock";
import { ProductCard } from "@/components/product/ProductCard";
import { ShieldCheck, Truck, Clock, CreditCard, ArrowRight, Zap, Cpu, Monitor, HardDrive, Mouse, Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FallingStars } from "@/components/ui/FallingStars";
import { FloatingGamepad } from "@/components/ui/FloatingGamepad";

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

// The 6 portrait clip filenames (copied to /public as clip0.mp4 … clip5.mp4)
const portraitClips = [
  "/clip0.mp4",
  "/clip1.mp4",
  "/clip2.mp4",
  "/clip3.mp4",
  "/clip4.mp4",
  "/clip5.mp4",
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
};

export default function Home() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="flex flex-col overflow-hidden bg-background relative">
      {/* Global falling stars + floating gamepad (behind everything) */}
      <FallingStars count={25} />
      <FloatingGamepad />

      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-dashed-grid bg-background">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105"
            src="https://cdn.pixabay.com/video/2021/08/04/83864-584705353_large.mp4"
          />
        </div>

        {/* Background blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[120px] -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/2" />
          <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px] -translate-x-1/2" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-0" />

        <motion.div
          initial="hidden" animate="show" variants={staggerContainer}
          className="container relative z-10 px-4 text-center max-w-5xl mx-auto pt-20"
        >
          <motion.div variants={fadeUp}>
            <Badge className="mb-6 text-sm px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 font-medium">
              <Zap className="mr-1.5 h-3.5 w-3.5" /> New Arrivals Just Dropped
            </Badge>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.95]">
            BUILD YOUR{" "}
            <span className="gradient-text">ULTIMATE</span>{" "}
            MACHINE
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-sans">
            Premium hardware for creators, gamers, and professionals who refuse to compromise on performance.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/category/desktops" size="lg" className="text-base px-8 h-12 rounded-full font-bold glow">
              Shop Custom PCs
            </ButtonLink>
            <ButtonLink href="/category/all" variant="outline" size="lg" className="text-base px-8 h-12 rounded-full border-primary/30 hover:bg-primary/5">
              Explore All <ArrowRight className="ml-2 h-4 w-4 inline" />
            </ButtonLink>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto glass rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-dashed-grid opacity-20" />
            {[["50K+", "Happy Customers"], ["10K+", "Products Shipped"], ["9.8/10", "Satisfaction"]].map(([num, label]) => (
              <div key={label} className="text-center relative z-10">
                <div className="text-2xl font-black gradient-text mb-1">{num}</div>
                <div className="text-xs text-muted-foreground font-medium">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-10 border-b bg-card/50 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", sub: "On orders over $99" },
              { icon: ShieldCheck, title: "3-Year Warranty", sub: "On all custom pre-builds" },
              { icon: Clock, title: "24/7 Support", sub: "Expert help, always on" },
              { icon: CreditCard, title: "Secure Checkout", sub: "Encrypted & protected" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm font-heading">{title}</div>
                  <div className="text-xs text-muted-foreground font-sans">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex items-end justify-between mb-12"
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-3 text-primary border-primary/30 rounded-full bg-primary/5 font-sans">Editor&apos;s Choice</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">FEATURED <span className="gradient-text">HARDWARE</span></h2>
              <p className="text-muted-foreground mt-2 font-sans text-lg">Handpicked for maximum performance.</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link href="/category/all" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline text-sm font-sans">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <div key={product.id} className="perspective-card">
                <div className="card-3d">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engineered for Perfection — Coding Video ── */}
      <section className="py-24 relative bg-dashed-grid border-y">
        <div className="absolute inset-0 bg-background/88" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:w-1/2"
            >
              <Badge className="mb-4 rounded-full bg-primary/10 text-primary border-primary/20 font-sans text-sm">Behind the Build</Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                ENGINEERED FOR <span className="gradient-text">PERFECTION</span>
              </h2>
              <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">
                Watch our expert builders assemble the most powerful rigs on the planet. From custom water loops to impeccable cable management, we treat every build as a masterpiece.
              </p>
              <ButtonLink href="/gallery" className="rounded-full px-8 h-12 glow font-bold text-base">
                Explore the Gallery
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:w-1/2 w-full rounded-3xl overflow-hidden glass shadow-2xl relative group"
              style={{ aspectRatio: "9/16", maxHeight: "600px" }}
            >
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
              <video
                autoPlay loop muted playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="/coding.mp4"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="py-24 bg-card/30 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">SHOP BY <span className="gradient-text">CATEGORY</span></h2>
            <p className="text-muted-foreground text-lg font-sans">Everything you need, all in one place.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
            {categories.map((cat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} key={cat.name}
              >
                <Link href={cat.href} className="group relative h-48 md:h-64 rounded-3xl overflow-hidden block">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${cat.img}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight drop-shadow-md">{cat.name}</h3>
                    <span className="text-sm font-sans font-semibold text-white/80 group-hover:text-white transition-colors flex items-center gap-1">
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-3 text-indigo-500 border-indigo-400/30 rounded-full bg-indigo-500/5 font-sans">Just Dropped</Badge>
              <h2 className="text-4xl font-black tracking-tighter">NEW <span className="gradient-text">ARRIVALS</span></h2>
              <p className="text-muted-foreground mt-2 font-sans">The latest tech, fresh off the line.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <div key={product.id} className="perspective-card">
                <div className="card-3d">
                  <ProductCard product={product} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Arrow Video Divider ── */}
      <section className="relative w-full overflow-hidden" style={{ height: "260px" }}>
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          src="/arrow.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
      </section>

      {/* ── Google Reviews ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-dashed-grid opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">WHAT <span className="gradient-text">GAMERS</span> SAY</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl font-black text-foreground font-sans">4.9</span>
              <div className="flex">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
            </div>
            <p className="text-muted-foreground font-sans">Based on 10,000+ Google Reviews</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.map((review, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-3xl border shadow-sm relative card-3d"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground font-sans flex items-center gap-1">
                      {review.name}
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </h4>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Strip ── */}
      <section className="py-16 border-y bg-card/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-bold mb-10 font-sans">Trusted Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {brands.map(brand => (
              <span key={brand} className="text-xl md:text-2xl font-black text-muted-foreground/30 hover:text-primary transition-colors cursor-default tracking-tight">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Crazy PC Builds Carousel — Local Portrait Videos ── */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-dashed-grid opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <Badge className="mb-4 rounded-full bg-primary/10 text-primary border-primary/20 font-sans text-sm">#MasterBuilds</Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              CRAZY <span className="gradient-text">PC BUILDS</span>
            </h2>
            <p className="text-muted-foreground text-lg font-sans">Get inspired by the most insane custom water-cooled and modded rigs.</p>
          </div>

          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {portraitClips.map((filename, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex justify-center">
                  <div className="glass rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: "9/16", width: "220px" }}>
                    <video
                      autoPlay loop muted playsInline
                      className="w-full h-full object-cover"
                      src={`/${encodeURIComponent(filename)}`}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-14 bg-background border-primary/20 text-primary hover:bg-primary hover:text-white transition-all" />
            <CarouselNext className="hidden md:flex -right-14 bg-background border-primary/20 text-primary hover:bg-primary hover:text-white transition-all" />
          </Carousel>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-28 relative overflow-hidden bg-dashed-grid">
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="container relative z-10 mx-auto px-4 text-center max-w-xl glass p-12 rounded-3xl"
        >
          <Badge className="mb-6 rounded-full bg-primary/10 text-primary border-primary/20 font-sans text-sm">Join the Community</Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">UNLOCK <span className="gradient-text">REWARDS</span></h2>
          <p className="text-muted-foreground mb-8 font-sans text-lg">Exclusive deals, early access to new drops, and expert build guides — delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email" placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full text-foreground bg-background/80 outline-none focus:ring-2 focus:ring-primary border border-border text-sm font-sans shadow-inner"
              required
            />
            <Button type="submit" className="rounded-full px-8 h-[54px] font-bold text-base glow">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 font-sans">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </section>
    </div>
  );
}
