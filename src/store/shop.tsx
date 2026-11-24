import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import { productsById } from '@/data/catalog';

export type CartItem = {
  productId: string;
  qty: number;
  variant?: string;
};

type ShopContextValue = {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  savings: number;
  addToCart: (productId: string, qty?: number, variant?: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  wishlist: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
};

const ShopContext = createContext<ShopContextValue | null>(null);

const INITIAL_CART: CartItem[] = [
  { productId: 'airpods-max', qty: 1, variant: 'Silver' },
  { productId: 'mascara', qty: 2, variant: 'Black' },
];

const INITIAL_WISHLIST = ['macbook-pro-14', 'nike-air-jordan'];

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [wishlist, setWishlist] = useState<string[]>(INITIAL_WISHLIST);

  const addToCart = useCallback((productId: string, qty = 1, variant?: string) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + qty } : item,
        );
      }
      return [...current, { productId, qty, variant }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, qty: number) => {
    setCart((current) =>
      current
        .map((item) => (item.productId === productId ? { ...item, qty: Math.max(0, qty) } : item))
        .filter((item) => item.qty > 0),
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  );

  const { cartCount, subtotal, savings } = useMemo(() => {
    let count = 0;
    let subtotalValue = 0;
    let savingsValue = 0;
    for (const item of cart) {
      const product = productsById[item.productId];
      if (!product) continue;
      count += item.qty;
      subtotalValue += product.price * item.qty;
      savingsValue += Math.max(0, product.originalPrice - product.price) * item.qty;
    }
    return { cartCount: count, subtotal: subtotalValue, savings: savingsValue };
  }, [cart]);

  const value = useMemo<ShopContextValue>(
    () => ({
      cart,
      cartCount,
      subtotal,
      savings,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      isWishlisted,
      toggleWishlist,
    }),
    [
      cart,
      cartCount,
      subtotal,
      savings,
      addToCart,
      setQuantity,
      removeFromCart,
      clearCart,
      wishlist,
      isWishlisted,
      toggleWishlist,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop(): ShopContextValue {
  const value = useContext(ShopContext);
  if (!value) {
    throw new Error('useShop must be used inside <ShopProvider>');
  }
  return value;
}
