"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Gamepad2, ArrowRight, CheckCircle2 } from "lucide-react";

const perks = [
  "Exclusive member discounts up to 40% off",
  "Early access to new product launches",
  "Free priority shipping on every order",
  "24/7 dedicated build support",
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Account created! (Demo mode)");
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* ── Left Panel — Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-dashed-grid items-center justify-center p-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-primary/20 to-background" />
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-500/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-primary/15 rounded-full blur-[60px]" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500 to-primary flex items-center justify-center shadow-2xl float-anim"
              style={{ boxShadow: "0 20px 60px oklch(0.55 0.25 270 / 40%)" }}>
              <Gamepad2 className="w-12 h-12 text-white" />
            </div>
          </div>

          <Link href="/" className="font-black text-4xl tracking-tighter text-foreground block mb-2">
            NEXUS<span className="gradient-text">TECH</span>
          </Link>
          <p className="text-muted-foreground font-sans mb-10">Join the community of 50,000+ PC enthusiasts</p>

          <div className="space-y-3 text-left">
            {perks.map((perk) => (
              <div key={perk} className="flex items-start gap-3 glass rounded-2xl px-4 py-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-sans text-foreground/80">{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel — Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="font-black text-2xl tracking-tighter">
              NEXUS<span className="text-primary">TECH</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tighter mb-2">Create your account ⚡</h1>
            <p className="text-muted-foreground font-sans">It&apos;s free. No credit card required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="font-semibold text-sm">First Name</Label>
                <Input
                  id="firstName" placeholder="Alex"
                  value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })}
                  className="h-12 rounded-xl border-border bg-muted/40 font-sans focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="font-semibold text-sm">Last Name</Label>
                <Input
                  id="lastName" placeholder="Chen"
                  value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })}
                  className="h-12 rounded-xl border-border bg-muted/40 font-sans focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-sm">Email address</Label>
              <Input
                id="email" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                className="h-12 rounded-xl border-border bg-muted/40 font-sans focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold text-sm">Password</Label>
              <div className="relative">
                <Input
                  id="password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters"
                  value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="h-12 rounded-xl border-border bg-muted/40 font-sans focus:ring-2 focus:ring-primary pr-12"
                  required
                />
                <button
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="flex gap-1 mt-1">
                  {[8, 12, 16].map((len) => (
                    <div key={len} className={`h-1 flex-1 rounded-full transition-colors ${form.password.length >= len ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl font-bold text-base glow" size="lg">
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs text-muted-foreground"><span className="bg-background px-3 font-sans">or sign up with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 rounded-xl border-border font-sans font-semibold" onClick={() => alert("Google auth coming soon!")}>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-border font-sans font-semibold" onClick={() => alert("Apple auth coming soon!")}>
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Apple
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6 font-sans">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>

          <p className="text-center text-xs text-muted-foreground mt-4 font-sans">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline hover:text-primary">Terms of Service</Link> and{" "}
            <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
