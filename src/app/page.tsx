import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts, getNewArrivals } from "@/data/mock";
import { ProductCard } from "@/components/product/ProductCard";
import { ShieldCheck, Truck, Clock, CreditCard, ArrowRight, Zap, Cpu, Monitor, HardDrive, Mouse, Wifi } from "lucide-react";

const categories = [
  { name: "Desktops", icon: Cpu, href: "/category/desktops", color: "from-blue-600/20 to-transparent", img: "https://images.unsplash.com/photo-1593640495253-23196b27a87f?q=80&w=600&auto=format&fit=crop" },
  { name: "Laptops", icon: Monitor, href: "/category/laptops", color: "from-purple-600/20 to-transparent", img: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop" },
  { name: "Components", icon: Cpu, href: "/category/components", color: "from-orange-600/20 to-transparent", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop" },
  { name: "Peripherals", icon: Mouse, href: "/category/peripherals", color: "from-green-600/20 to-transparent", img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop" },
  { name: "Monitors", icon: Monitor, href: "/category/monitors", color: "from-cyan-600/20 to-transparent", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop" },
  { name: "Storage", icon: HardDrive, href: "/category/storage", color: "from-red-600/20 to-transparent", img: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=600&auto=format&fit=crop" },
];

const brands = ["NVIDIA", "Intel", "AMD", "Samsung", "Corsair", "Razer", "ASUS", "Logitech"];

export default function Home() {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  return (
    <div className="flex flex-col overflow-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950">
        {/* Background gradient mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container relative z-10 px-4 text-center max-w-5xl mx-auto">
          <Badge className="mb-6 text-sm px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 font-medium">
            <Zap className="mr-1.5 h-3.5 w-3.5" /> New Arrivals Just Dropped
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white leading-[0.95]">
            BUILD YOUR{" "}
            <span className="gradient-text">ULTIMATE</span>{" "}
            MACHINE
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Premium hardware for creators, gamers, and professionals who refuse to compromise on performance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonLink href="/category/desktops" size="lg" className="text-base px-8 h-12 rounded-full font-bold glow">
              Shop Custom PCs
            </ButtonLink>
            <ButtonLink href="/category/all" variant="outline" size="lg" className="text-base px-8 h-12 rounded-full border-zinc-700 hover:bg-zinc-800">
              Explore All <ArrowRight className="ml-2 h-4 w-4 inline" />
            </ButtonLink>
          </div>
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[["50K+", "Happy Customers"], ["10K+", "Products Shipped"], ["9.8/10", "Satisfaction"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-white mb-1">{num}</div>
                <div className="text-xs text-zinc-500">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── Trust Badges ── */}
      <section className="py-10 border-b bg-card/50">
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
                  <div className="font-semibold text-sm">{title}</div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-3 text-primary border-primary/30 rounded-full">Editor&apos;s Choice</Badge>
              <h2 className="text-4xl font-black tracking-tighter">FEATURED <span className="gradient-text">HARDWARE</span></h2>
              <p className="text-muted-foreground mt-2">Handpicked for maximum performance.</p>
            </div>
            <Link href="/category/all" className="hidden sm:flex items-center gap-1 text-primary font-medium hover:underline text-sm">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category ── */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black tracking-tighter mb-3">SHOP BY <span className="gradient-text">CATEGORY</span></h2>
            <p className="text-muted-foreground">Everything you need, all in one place.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href={cat.href} className="group relative h-44 md:h-52 rounded-2xl overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${cat.img}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="absolute bottom-4 left-5">
                  <h3 className="text-xl font-black text-white mb-1">{cat.name}</h3>
                  <span className="text-xs text-white/70 group-hover:text-primary transition-colors">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Badge variant="outline" className="mb-3 text-blue-400 border-blue-400/30 rounded-full">Just Dropped</Badge>
              <h2 className="text-4xl font-black tracking-tighter">NEW <span className="gradient-text">ARRIVALS</span></h2>
              <p className="text-muted-foreground mt-2">The latest tech, fresh off the line.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Strip ── */}
      <section className="py-16 border-y bg-card/30">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-10">Trusted Brands</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {brands.map(brand => (
              <span key={brand} className="text-xl font-black text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-default tracking-tight">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-xl">
          <Badge className="mb-4 rounded-full bg-primary/10 text-primary border-primary/20">Get Early Access</Badge>
          <h2 className="text-4xl font-black tracking-tighter mb-4">JOIN THE NEXUS</h2>
          <p className="text-muted-foreground mb-8">Exclusive deals, early access to new drops, and expert build guides — delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full text-foreground bg-background/80 backdrop-blur outline-none focus:ring-2 focus:ring-primary border border-border text-sm"
              required
            />
            <Button type="submit" className="rounded-full px-6 font-bold">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
