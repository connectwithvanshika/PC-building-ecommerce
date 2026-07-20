export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  brand: string;
  category: string;
  images: string[];
  specs: Record<string, string>;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
