import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  cartCount: () => number;
  cartTotal: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((c) => c.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((c) =>
                c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
              ),
            };
          }
          return { cart: [...state.cart, { ...item, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((w) => w !== id)
            : [...state.wishlist, id],
        })),

      isInWishlist: (id) => get().wishlist.includes(id),

      cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),

      cartTotal: () =>
        get().cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: "ag-store",
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
);
