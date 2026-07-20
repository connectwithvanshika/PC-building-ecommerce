import { Product } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ProductTabs({ product }: { product: Product }) {
  return (
    <Tabs defaultValue="specifications" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
        <TabsTrigger 
          value="specifications"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-semibold text-base"
        >
          Specifications
        </TabsTrigger>
        <TabsTrigger 
          value="description"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-semibold text-base"
        >
          Description
        </TabsTrigger>
        <TabsTrigger 
          value="reviews"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-semibold text-base"
        >
          Reviews ({product.reviews})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="specifications" className="animate-in fade-in-50 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between py-3 border-b border-border/50">
              <span className="text-muted-foreground font-medium">{key}</span>
              <span className="font-semibold text-right">{value}</span>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="description" className="animate-in fade-in-50 duration-500 max-w-4xl">
        <div className="prose prose-invert">
          <p className="text-lg leading-relaxed text-muted-foreground">
            {product.description}
          </p>
          <p className="mt-4 text-muted-foreground">
            Experience unparalleled performance and reliability. Engineered with premium materials 
            and state-of-the-art technology, this {product.category.toLowerCase()} represents the pinnacle 
            of modern hardware design.
          </p>
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="animate-in fade-in-50 duration-500">
        <div className="flex flex-col gap-8 max-w-4xl">
          <div className="flex items-center gap-6 p-6 bg-muted/20 rounded-xl border">
            <div className="text-center">
              <div className="text-5xl font-black text-primary">{product.rating}</div>
              <div className="text-sm text-muted-foreground mt-2">out of 5 stars</div>
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground mb-4">Based on {product.reviews} reviews from verified buyers.</p>
              {/* Fake progress bars for rating distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center gap-3 text-sm">
                    <div className="w-12 text-right">{stars} star</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ width: stars === 5 ? '75%' : stars === 4 ? '15%' : '5%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground italic">Detailed reviews are currently unavailable in this preview.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
