"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";

type Step = "shipping" | "payment" | "review" | "confirmation";

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>("shipping");
  const [orderNumber] = useState(() => `NX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
  const { items, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const steps: { id: Step; label: string }[] = [
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ];

  const handlePlaceOrder = () => {
    clearCart();
    setStep("confirmation");
  };

  if (step === "confirmation") {
    return (
      <div className="container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6 max-w-2xl">
        <div className="p-5 rounded-full bg-green-500/10">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg">
          Thank you for your purchase. Your order <span className="font-bold text-foreground">{orderNumber}</span> has been placed and is being processed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <ButtonLink href="/account" size="lg" className="rounded-full px-8">View Order</ButtonLink>
          <ButtonLink href="/category/all" variant="outline" size="lg" className="rounded-full px-8">Continue Shopping</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-black tracking-tighter mb-10">Checkout</h1>

      {/* Step Indicator */}
      <div className="flex items-center gap-2 mb-12">
        {steps.map((s, idx) => (
          <div key={s.id} className="flex items-center gap-2">
            <button
              onClick={() => {
                if (steps.findIndex(x => x.id === step) > idx) setStep(s.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                step === s.id
                  ? "bg-primary text-primary-foreground"
                  : steps.findIndex(x => x.id === step) > idx
                  ? "text-primary hover:bg-primary/10"
                  : "text-muted-foreground"
              }`}
            >
              <span className={`flex items-center justify-center w-5 h-5 rounded-full text-xs ${
                step === s.id ? "bg-primary-foreground text-primary" : "bg-muted"
              }`}>{idx + 1}</span>
              {s.label}
            </button>
            {idx < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Area */}
        <div className="lg:col-span-2">
          {step === "shipping" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Jane" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Smith" className="h-12" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="jane@example.com" className="h-12" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" placeholder="123 Main Street" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="San Francisco" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="94102" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="California" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" className="h-12" />
                </div>
              </div>
              <Button onClick={() => setStep("payment")} size="lg" className="w-full sm:w-auto rounded-full px-8 font-bold h-12">
                Continue to Payment <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Payment Details</h2>
              <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 text-sm text-primary mb-4">
                🔒 Test Mode — No real charges will be made.
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="4242 4242 4242 4242" className="h-12" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM / YY" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" className="h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="Jane Smith" className="h-12" />
                </div>
              </div>
              <Button onClick={() => setStep("review")} size="lg" className="w-full sm:w-auto rounded-full px-8 font-bold h-12">
                Review Order <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Review Your Order</h2>
              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 p-4 rounded-xl border bg-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-lg bg-muted" />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                    </div>
                    <p className="font-bold">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Button onClick={handlePlaceOrder} size="lg" className="w-full rounded-full font-bold h-12">
                Place Order — ${total.toFixed(2)}
              </Button>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-lg font-black">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
