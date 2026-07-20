import { Separator } from "@/components/ui/separator";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black tracking-tighter mb-4">About NexusTech</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          We are passionate engineers and gamers who believe everyone deserves access to the world&apos;s best computer hardware.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { stat: "50K+", label: "Happy Customers" },
          { stat: "10K+", label: "Products Shipped" },
          { stat: "9.8/10", label: "Customer Satisfaction" },
        ].map((item) => (
          <div key={item.label} className="text-center p-8 rounded-2xl border bg-card">
            <div className="text-4xl font-black text-primary mb-2">{item.stat}</div>
            <div className="text-muted-foreground">{item.label}</div>
          </div>
        ))}
      </div>

      <Separator className="mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-black tracking-tight mb-6">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Founded in 2020, NexusTech was built on a simple principle: great technology should be accessible, transparent, and backed by people who actually care.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We source directly from the world&apos;s top manufacturers — NVIDIA, AMD, Intel, Samsung, and more — to bring you authentic products at competitive prices, with zero compromise on quality.
          </p>
        </div>
        <div className="relative h-64 rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}
