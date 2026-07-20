import { getProductsByCategory, products } from "@/data/mock";
import { ProductCard } from "@/components/product/ProductCard";
import { notFound } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const categoryProducts = slug === "all" 
    ? products 
    : getProductsByCategory(slug.charAt(0).toUpperCase() + slug.slice(1));

  if (!categoryProducts.length && slug !== "all") {
    notFound();
  }

  const categoryName = slug === "all" ? "All Products" : slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs placeholder */}
      <div className="text-sm text-muted-foreground mb-6">
        Home / {categoryName}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2">{categoryName}</h1>
          <p className="text-muted-foreground">
            Showing {categoryProducts.length} results
          </p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <div className="flex-1 md:flex-none md:w-48">
            <Select defaultValue="newest">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop) */}
        <div className="hidden md:block space-y-6">
          <div>
            <h3 className="font-semibold mb-4 text-lg">Price Range</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <span className="group-hover:text-primary transition-colors">Under $50</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <span className="group-hover:text-primary transition-colors">$50 to $100</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <span className="group-hover:text-primary transition-colors">$100 to $500</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <span className="group-hover:text-primary transition-colors">$500 & Above</span>
              </label>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-4 text-lg">Brands</h3>
            <div className="space-y-3">
              {Array.from(new Set(products.map(p => p.brand))).map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                  <span className="group-hover:text-primary transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-4 text-lg">Availability</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <span className="group-hover:text-primary transition-colors">In Stock</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4" />
                <span className="group-hover:text-primary transition-colors">Pre-order</span>
              </label>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="col-span-1 md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
