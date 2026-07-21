"use client";

import Link from "next/link";
import { useState } from "react";
import { Package, Heart, User, MapPin, CreditCard, ChevronRight, Truck, Mail, Lock, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const mockOrders = [
  {
    id: "NX-A1B2C3",
    date: "July 15, 2026",
    status: "Delivered",
    total: 3499.99,
    items: [{ name: "Nebula X9 Gaming Desktop", qty: 1 }],
  },
  {
    id: "NX-D4E5F6",
    date: "July 10, 2026",
    status: "Shipped",
    total: 169.99,
    items: [{ name: "Samsung 990 PRO 2TB", qty: 1 }],
  },
];

const statusColor: Record<string, string> = {
  Delivered: "bg-green-500/10 text-green-500",
  Shipped: "bg-blue-500/10 text-blue-500",
  Processing: "bg-yellow-500/10 text-yellow-500",
  Cancelled: "bg-red-500/10 text-red-500",
};

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-20 flex items-center justify-center min-h-[75vh]">
        <div className="w-full max-w-md p-8 glass rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden transform-gpu transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-3 text-center tracking-tighter">
              {isLoginView ? "WELCOME BACK" : "CREATE ACCOUNT"}
            </h1>
            <p className="text-muted-foreground text-center mb-8 font-sans font-light">
              {isLoginView ? "Enter your credentials to access your account." : "Join the ultimate tech community today."}
            </p>
            
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
              {!isLoginView && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold ml-1 text-foreground/80">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input type="text" required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background/60 border border-border focus:ring-2 focus:ring-primary outline-none transition-all shadow-inner backdrop-blur-sm" placeholder="John Doe" />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 text-foreground/80">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input type="email" required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background/60 border border-border focus:ring-2 focus:ring-primary outline-none transition-all shadow-inner backdrop-blur-sm" placeholder="name@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 text-foreground/80">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input type="password" required className="w-full pl-12 pr-4 py-4 rounded-2xl bg-background/60 border border-border focus:ring-2 focus:ring-primary outline-none transition-all shadow-inner backdrop-blur-sm" placeholder="••••••••" />
                </div>
              </div>
              
              <Button type="submit" className="w-full h-14 rounded-2xl font-bold mt-8 text-lg glow bg-primary text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_30px_rgba(var(--primary),0.3)]">
                {isLoginView ? "Sign In" : "Sign Up"}
              </Button>
            </form>
            
            <div className="mt-8 text-center text-sm font-sans">
              <span className="text-muted-foreground">
                {isLoginView ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button 
                onClick={() => setIsLoginView(!isLoginView)} 
                className="text-primary font-bold hover:underline transition-all"
              >
                {isLoginView ? "Create one" : "Sign in instead"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-[75vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h1 className="text-4xl font-black tracking-tighter drop-shadow-md">My Account</h1>
        <Button variant="outline" onClick={() => setIsLoggedIn(false)} className="self-start md:self-auto rounded-full font-semibold border-primary/20 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors gap-2">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar */}
        <aside className="space-y-2">
          <Link href="/account" className="flex items-center gap-3 px-5 py-4 rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-transform hover:scale-[1.02]">
            <Package className="h-5 w-5" /> Orders
          </Link>
          <Link href="/wishlist" className="flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-muted transition-all font-medium text-muted-foreground hover:text-foreground">
            <Heart className="h-5 w-5" /> Wishlist
          </Link>
          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-muted transition-all font-medium text-muted-foreground hover:text-foreground">
            <User className="h-5 w-5" /> Profile
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-muted transition-all font-medium text-muted-foreground hover:text-foreground">
            <MapPin className="h-5 w-5" /> Addresses
          </button>
          <button className="w-full flex items-center gap-3 px-5 py-4 rounded-xl hover:bg-muted transition-all font-medium text-muted-foreground hover:text-foreground">
            <CreditCard className="h-5 w-5" /> Payment Methods
          </button>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold tracking-tight">Order History</h2>
          </div>
          
          {mockOrders.map(order => (
            <div key={order.id} className="bg-card/40 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4 bg-background/20 border-b border-white/5">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 font-sans uppercase tracking-wider">Order Number</div>
                    <div className="font-bold font-mono">{order.id}</div>
                  </div>
                  <Separator orientation="vertical" className="h-10 hidden sm:block bg-border/50" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 font-sans uppercase tracking-wider">Date</div>
                    <div className="font-medium">{order.date}</div>
                  </div>
                  <Separator orientation="vertical" className="h-10 hidden sm:block bg-border/50" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-1 font-sans uppercase tracking-wider">Total Amount</div>
                    <div className="font-bold text-primary">${order.total.toFixed(2)}</div>
                  </div>
                </div>
                <Badge className={`${statusColor[order.status]} self-start sm:self-auto px-4 py-1.5 rounded-full text-sm font-semibold border-none backdrop-blur-sm`}>{order.status}</Badge>
              </div>
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-base font-medium text-foreground/90 flex items-center gap-2">
                      <span className="text-primary font-black">{item.qty}×</span> {item.name}
                    </p>
                  ))}
                </div>
                <div className="flex gap-3">
                  {order.status === "Shipped" && (
                    <Button variant="outline" className="rounded-full gap-2 h-10 px-5 border-primary/20 hover:bg-primary/10 transition-colors">
                      <Truck className="h-4 w-4" /> Track Package
                    </Button>
                  )}
                  <Button variant="ghost" className="rounded-full gap-2 h-10 px-5 hover:bg-primary/10 hover:text-primary transition-colors">
                    View Details <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
