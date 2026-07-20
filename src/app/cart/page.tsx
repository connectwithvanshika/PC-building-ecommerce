"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PriceTag } from "@/components/product/PriceTag";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 99 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6">
        <ShoppingBag className="h-20 w-20 text-muted-foreground" />
        <h1 className="text-3xl font-black tracking-tighter">Your Cart is Empty</h1>
        <p className="text-muted-foreground max-w-md text-lg">
          Looks like you haven&apos;t added anything to your cart yet. Explore our products and find something you love.
        </p>
        <ButtonLink href="/category/all" size="lg" className="px-8 rounded-full text-base">
          Start Shopping
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black tracking-tighter mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-4 rounded-xl border bg-card group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-lg shrink-0 bg-muted"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground mb-1">{product.brand}</div>
                <Link href={`/product/${product.id}`} className="font-semibold text-base hover:text-primary transition-colors line-clamp-2">
                  {product.name}
                </Link>
                <div className="mt-2">
                  <PriceTag price={product.price} originalPrice={product.originalPrice} />
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-2 shrink-0">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  aria-label="Remove item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="flex items-center border rounded-md">
                  <button
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <div className="w-8 text-center text-sm font-medium">{quantity}</div>
                  <button
                    className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <div className="font-bold text-sm">
                  ${(product.price * quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            </div>

            {/* Discount Code */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Promo code"
                className="flex-1 px-3 py-2 text-sm rounded-md border bg-background outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="outline" size="sm" className="shrink-0">Apply</Button>
            </div>

            <Separator className="mb-6" />

            <div className="flex justify-between text-lg font-black mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <ButtonLink href="/checkout" size="lg" className="w-full rounded-full font-bold text-base h-12 flex items-center justify-center gap-2">
              Checkout <ArrowRight className="h-4 w-4" />
            </ButtonLink>

            <ButtonLink href="/category/all" variant="ghost" className="w-full mt-3 rounded-full flex items-center justify-center">
              Continue Shopping
            </ButtonLink>

            {shipping > 0 && (
              <p className="text-xs text-center text-muted-foreground mt-4">
                Add ${(99 - subtotal).toFixed(2)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
