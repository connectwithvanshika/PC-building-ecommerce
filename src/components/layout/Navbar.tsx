"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { ShoppingCart, Heart, Menu, Search, User, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { products } from "@/data/mock";
import { Product } from "@/types";
import { ThemeToggle } from "@/components/theme-toggle";

const categories = [
  { name: "Desktops", href: "/category/desktops" },
  { name: "Laptops", href: "/category/laptops" },
  { name: "Components", href: "/category/components" },
  { name: "Peripherals", href: "/category/peripherals" },
  { name: "Monitors", href: "/category/monitors" },
  { name: "Storage", href: "/category/storage" },
];

export function Navbar() {
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-xl border-b shadow-sm" : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}>
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="font-black text-xl tracking-tighter shrink-0 flex items-center gap-1">
            NEXUS<span className="text-primary">TECH</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/gallery"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="/category/all"
              className="px-3 py-2 text-sm font-medium text-primary hover:text-primary/80 rounded-md hover:bg-primary/10 transition-colors"
            >
              All Products
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsSearchOpen(true)} aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 rounded-full text-[10px]">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 rounded-full text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Account */}
            <Link href="/account" className="hidden sm:block">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger className="md:hidden inline-flex items-center justify-center rounded-full w-9 h-9 hover:bg-muted transition-colors" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-1 mt-8">
                  <div className="font-black text-xl tracking-tighter mb-6 px-4">
                    NEXUS<span className="text-primary">TECH</span>
                  </div>
                  <Link href="/" className="px-4 py-3 font-medium hover:bg-muted rounded-lg transition-colors">Home</Link>
                  {categories.map((cat) => (
                    <Link key={cat.name} href={cat.href} className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                      {cat.name}
                    </Link>
                  ))}
                  <Link href="/gallery" className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    Gallery
                  </Link>
                  <div className="border-t my-4" />
                  <Link href="/account" className="px-4 py-3 font-medium hover:bg-muted rounded-lg transition-colors">My Account</Link>
                  <Link href="/wishlist" className="px-4 py-3 font-medium hover:bg-muted rounded-lg transition-colors">Wishlist</Link>
                  <Link href="/admin" className="px-4 py-3 font-medium hover:bg-muted rounded-lg transition-colors text-primary">Admin Panel</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex flex-col" role="dialog" aria-modal="true" aria-label="Search">
          <div className="container mx-auto px-4 pt-6">
            <div className="flex items-center gap-3 mb-6">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                autoFocus
                type="search"
                placeholder="Search for products, brands, categories..."
                className="border-0 bg-transparent text-xl font-medium placeholder:text-muted-foreground focus-visible:ring-0 shadow-none p-0 h-auto"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Button variant="ghost" size="icon" className="rounded-full shrink-0" onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }} aria-label="Close search">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {searchResults.length > 0 ? (
              <div className="border rounded-2xl bg-card overflow-hidden shadow-2xl">
                {searchResults.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    className={`flex items-center gap-4 p-4 hover:bg-muted transition-colors ${i < searchResults.length - 1 ? "border-b" : ""}`}
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm line-clamp-1">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.brand} · {p.category}</div>
                    </div>
                    <div className="font-bold text-sm shrink-0">${p.price.toFixed(2)}</div>
                  </Link>
                ))}
              </div>
            ) : searchQuery.length >= 2 ? (
              <div className="text-center py-12 text-muted-foreground">
                No products found for &quot;<strong>{searchQuery}</strong>&quot;
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold col-span-full mb-1">Popular Searches</p>
                {["Gaming PC", "RTX 4090", "Mechanical Keyboard", "4K Monitor", "NVMe SSD", "Gaming Laptop"].map(term => (
                  <button
                    key={term}
                    className="px-4 py-2 rounded-full border text-sm hover:border-primary hover:text-primary transition-colors text-left"
                    onClick={() => setSearchQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
