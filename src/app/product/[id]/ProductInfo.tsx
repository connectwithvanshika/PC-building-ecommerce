"use client";

import { useState } from "react";
import { Product } from "@/types";
import { RatingStars } from "@/components/product/RatingStars";
import { PriceTag } from "@/components/product/PriceTag";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Shield, Truck, RotateCcw } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem: addToCart } = useCart();
  const { addItem: addToWishlist, hasItem, removeItem: removeFromWishlist } = useWishlist();

  const isWishlisted = hasItem(product.id);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        <span className="font-semibold">{product.brand}</span>
        <span>•</span>
        <span>{product.category}</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{product.name}</h1>
      
      <div className="flex items-center gap-4 mb-6">
        <RatingStars rating={product.rating} reviews={product.reviews} />
        {product.inStock ? (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">In Stock</Badge>
        ) : (
          <Badge variant="destructive">Out of Stock</Badge>
        )}
      </div>

      <div className="mb-8">
        <PriceTag price={product.price} originalPrice={product.originalPrice} />
      </div>

      <p className="text-muted-foreground mb-8 text-lg">
        {product.description}
      </p>

      <Separator className="mb-8" />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex items-center border rounded-md w-32">
          <button 
            className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <div className="flex-1 text-center font-medium">{quantity}</div>
          <button 
            className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        
        <Button 
          size="lg" 
          className="flex-1 font-bold h-12"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>
        
        <Button 
          size="lg" 
          variant="outline"
          className="h-12 w-12 p-0 shrink-0"
          onClick={toggleWishlist}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
        <div className="flex flex-col items-center text-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          <span>Free Express Shipping</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>3-Year Warranty</span>
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <RotateCcw className="h-5 w-5 text-primary" />
          <span>30-Day Returns</span>
        </div>
      </div>
    </div>
  );
}
