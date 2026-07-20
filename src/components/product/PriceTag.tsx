export function PriceTag({ price, originalPrice }: { price: number; originalPrice?: number }) {
  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(p);

  return (
    <div className="flex items-end gap-2">
      <span className="text-xl font-bold text-foreground">
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-muted-foreground line-through mb-0.5">
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}
