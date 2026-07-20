"use client";

import { useWishlist } from "@/hooks/useWishlist";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/button-link";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center flex flex-col items-center gap-6">
        <Heart className="h-20 w-20 text-muted-foreground" />
        <h1 className="text-3xl font-black tracking-tighter">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground max-w-md text-lg">
          Save your favorite products to your wishlist and come back to them anytime.
        </p>
        <ButtonLink href="/category/all" size="lg" className="px-8 rounded-full">
          Explore Products
        </ButtonLink>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-black tracking-tighter mb-2">My Wishlist</h1>
      <p className="text-muted-foreground mb-10">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
