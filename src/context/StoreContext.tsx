'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ── Types ── */
export interface CartItem {
  slug: string;
  name: string;
  price: string;
  image: string;
  finish: string;
  fabric: string;
  quantity: number;
}

export interface FavoriteItem {
  slug: string;
  name: string;
  price: string;
  image: string;
}

interface StoreContextValue {
  /* Cart */
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  /* Favorites */
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (slug: string) => void;
  toggleFavorite: (item: FavoriteItem) => void;
  isFavorite: (slug: string) => boolean;
  favoritesCount: number;
}

const StoreContext = createContext<StoreContextValue | null>(null);

/* ── localStorage helpers ── */
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full – silent fail */
  }
}

/* ══════════════════════════════════════════════
   STORE PROVIDER
   ══════════════════════════════════════════════ */
export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /* Load from localStorage on mount */
  useEffect(() => {
    setCart(loadFromStorage<CartItem[]>('resin-cart', []));
    setFavorites(loadFromStorage<FavoriteItem[]>('resin-favorites', []));
    setHydrated(true);
  }, []);

  /* Persist to localStorage on change (skip initial mount) */
  useEffect(() => {
    if (hydrated) saveToStorage('resin-cart', cart);
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) saveToStorage('resin-favorites', favorites);
  }, [favorites, hydrated]);

  /* ── Cart actions ── */
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existing = prev.find(c => c.slug === item.slug && c.finish === item.finish && c.fabric === item.fabric);
      if (existing) {
        return prev.map(c =>
          c.slug === item.slug && c.finish === item.finish && c.fabric === item.fabric
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setCart(prev => prev.filter(c => c.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(c => c.slug !== slug));
    } else {
      setCart(prev => prev.map(c => c.slug === slug ? { ...c, quantity } : c));
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  /* ── Favorites actions ── */
  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.some(f => f.slug === item.slug)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeFavorite = useCallback((slug: string) => {
    setFavorites(prev => prev.filter(f => f.slug !== slug));
  }, []);

  const toggleFavorite = useCallback((item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.some(f => f.slug === item.slug)) {
        return prev.filter(f => f.slug !== item.slug);
      }
      return [...prev, item];
    });
  }, []);

  const isFavorite = useCallback((slug: string) => {
    return favorites.some(f => f.slug === slug);
  }, [favorites]);

  const favoritesCount = favorites.length;

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount,
      favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, favoritesCount,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

/* ── Hook ── */
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
