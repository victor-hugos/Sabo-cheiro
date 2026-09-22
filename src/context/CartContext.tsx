"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProductById, type Product } from "@/data/products";
import { shippingFor } from "@/lib/format";

export type CartLine = { id: string; quantity: number };
export type CartItem = CartLine & { product: Product };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (id: string, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sabo-cheiro-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, loaded]);

  const add = useCallback((id: string, quantity = 1) => {
    setLines((prev) => {
      const product = getProductById(id);
      if (!product) return prev;
      const existing = prev.find((l) => l.id === id);
      if (existing) {
        return prev.map((l) =>
          l.id === id ? { ...l, quantity: Math.min(product.stock, l.quantity + quantity) } : l,
        );
      }
      return [...prev, { id, quantity: Math.min(product.stock, quantity) }];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.id !== id)
        : prev.map((l) => {
            if (l.id !== id) return l;
            const stock = getProductById(id)?.stock ?? quantity;
            return { ...l, quantity: Math.min(stock, quantity) };
          }),
    );
  }, []);

  const remove = useCallback((id: string) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => ({ ...l, product: getProductById(l.id) }))
      .filter((l): l is CartItem => Boolean(l.product));
    const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const shipping = shippingFor(subtotal);
    return {
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [lines, isOpen, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
