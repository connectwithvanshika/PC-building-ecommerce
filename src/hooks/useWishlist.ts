import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';
import { toast } from 'sonner';

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        if (!items.find(item => item.id === product.id)) {
          set({ items: [...items, product] });
          toast.success(`${product.name} added to wishlist`);
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.id !== productId) });
      },
      hasItem: (productId) => {
        return get().items.some(item => item.id === productId);
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
