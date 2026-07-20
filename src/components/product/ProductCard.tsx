"use client";

import Link from "next/link";
import { Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { RatingStars } from "./RatingStars";
import { PriceTag } from "./PriceTag";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export function ProductCard({ product }: { product: Product }) {
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, hasItem, removeItem: removeFromWishlist } = useWishlist();
  const isWishlisted = hasItem(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/product/${product.id}`} className="group outline-none">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card border-border hover:border-primary/50 relative">
        <div className="relative aspect-square overflow-hidden bg-muted/20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.newArrival && <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>}
            {discountPercent && <Badge variant="destructive">-{discountPercent}%</Badge>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleWishlist}
            className="absolute top-2 right-2 bg-background/50 backdrop-blur-sm hover:bg-background/80 rounded-full h-8 w-8 transition-colors"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
          </Button>
        </div>
        <CardContent className="flex-1 p-4 flex flex-col">
          <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="mt-auto pt-2">
            <RatingStars rating={product.rating} reviews={product.reviews} />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-end justify-between gap-2">
          <PriceTag price={product.price} originalPrice={product.originalPrice} />
          <Button size="icon" onClick={handleAddToCart} disabled={!product.inStock} className="shrink-0">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
