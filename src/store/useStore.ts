import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, Order, Review, WishlistItem } from '../types';

interface AppState {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Recently Viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;

  // Reviews
  reviews: Review[];
  addReview: (review: Review) => void;
  getProductReviews: (productId: string) => Review[];

  // Auth
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;

  // Admin - Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // UI
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  clearToast: () => void;

  // DB Export/Import
  exportDatabase: () => string;
  importDatabase: (json: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.product.id === item.product.id && i.color === item.color);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.product.id === item.product.id && i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: quantity <= 0
            ? state.cart.filter((i) => i.product.id !== productId)
            : state.cart.map((i) =>
                i.product.id === productId ? { ...i, quantity } : i
              ),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () =>
        get().cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      getCartCount: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      // Wishlist
      wishlist: [],
      addToWishlist: (product) =>
        set((state) => {
          if (state.wishlist.find((w) => w.product.id === product.id)) return state;
          return { wishlist: [...state.wishlist, { product, addedAt: new Date().toISOString() }] };
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((w) => w.product.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().wishlist.some((w) => w.product.id === productId),

      // Recently Viewed
      recentlyViewed: [],
      addRecentlyViewed: (product) =>
        set((state) => {
          const filtered = state.recentlyViewed.filter((p) => p.id !== product.id);
          return { recentlyViewed: [product, ...filtered].slice(0, 8) };
        }),

      // Reviews
      reviews: [
        { id: 'r1', productId: '1', author: 'Marcus J.', rating: 5, text: 'Absolutely incredible sound quality. The noise cancellation is on par with brands that cost twice as much. Battery lasts forever too!', verified: true, date: '2025-05-15' },
        { id: 'r2', productId: '1', author: 'Sarah L.', rating: 4, text: 'Great headphones overall. Very comfortable for long listening sessions. The only downside is they get a bit warm after 3+ hours.', verified: true, date: '2025-05-10' },
        { id: 'r3', productId: '1', author: 'David K.', rating: 5, text: 'Best purchase I made this year. The bass is deep without being overwhelming. Highly recommend for electronic music fans.', verified: true, date: '2025-04-28' },
        { id: 'r4', productId: '3', author: 'Emily R.', rating: 5, text: 'Perfect for workouts! They never fall out and the sound is crystal clear. The charging case is compact and convenient.', verified: true, date: '2025-05-20' },
        { id: 'r5', productId: '5', author: 'James T.', rating: 4, text: 'Bought this for beach trips and it never disappoints. Loud enough for a group and the battery lasts all day.', verified: true, date: '2025-05-05' },
        { id: 'r6', productId: '8', author: 'Alex M.', rating: 5, text: 'The RGB lighting looks sick and the surround sound actually helps in competitive games. Mic quality is clear.', verified: true, date: '2025-05-18' },
        { id: 'r7', productId: '4', author: 'Nina P.', rating: 5, text: 'As a music producer, these are my go-to reference headphones. Flat response is exactly what I need for mixing.', verified: true, date: '2025-04-15' },
        { id: 'r8', productId: '6', author: 'Chris B.', rating: 4, text: 'Beautiful design and sounds amazing. The voice assistant integration works seamlessly with my smart home.', verified: true, date: '2025-05-12' },
        { id: 'r9', productId: '2', author: 'Lisa W.', rating: 5, text: 'If you love bass, get these. They rumble in the best way possible. Build quality is solid too.', verified: true, date: '2025-05-08' },
        { id: 'r10', productId: '7', author: 'Tom H.', rating: 4, text: 'Tiny but mighty. Surprising volume for such a small speaker. Great for hiking and camping.', verified: true, date: '2025-05-01' },
      ],
      addReview: (review) =>
        set((state) => ({ reviews: [...state.reviews, review] })),
      getProductReviews: (productId) =>
        get().reviews.filter((r) => r.productId === productId),

      // Auth
      isAdmin: false,
      login: (username, password) => {
        if (username === 'admin' && password === 'admin123') {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAdmin: false }),

      // Orders
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        })),

      // UI
      toast: null,
      showToast: (message, type = 'info') => set({ toast: { message, type } }),
      clearToast: () => set({ toast: null }),

      // DB Export/Import
      exportDatabase: () => {
        const state = get();
        const db = {
          orders: state.orders,
          reviews: state.reviews,
          wishlist: state.wishlist,
          cart: state.cart,
          recentlyViewed: state.recentlyViewed,
          exportedAt: new Date().toISOString(),
        };
        return JSON.stringify(db, null, 2);
      },
      importDatabase: (json) => {
        try {
          const db = JSON.parse(json);
          set({
            orders: db.orders || [],
            reviews: db.reviews || [],
            wishlist: db.wishlist || [],
            cart: db.cart || [],
            recentlyViewed: db.recentlyViewed || [],
          });
        } catch {
          get().showToast('Invalid database file', 'error');
        }
      },
    }),
    {
      name: 'nocta-store-v2',
      partialize: (state) => ({
        cart: state.cart,
        isAdmin: state.isAdmin,
        orders: state.orders,
        wishlist: state.wishlist,
        reviews: state.reviews,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);
