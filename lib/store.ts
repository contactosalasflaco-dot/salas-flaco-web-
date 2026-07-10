"use client";

import { create } from "zustand";
import type { Cart, CartLine, Money, Product, ProductVariant } from "@/lib/commerce/types";

/**
 * Estado global (Zustand): UI + carrito.
 * El carrito mock vive en memoria del cliente. Cuando se active
 * Shopify, estas acciones pasarán a llamar cartCreate/cartLinesAdd
 * de la Storefront API manteniendo la misma forma de estado.
 */

interface StoreState {
  // UI
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Carrito
  lines: CartLine[];
  addLine: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  getCart: () => Cart;
}

function subtotal(lines: CartLine[]): Money {
  const amount = lines.reduce((sum, l) => sum + l.variant.price.amount * l.quantity, 0);
  return { amount, currencyCode: lines[0]?.variant.price.currencyCode ?? "ARS" };
}

export const useStore = create<StoreState>((set, get) => ({
  cartOpen: false,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),

  lines: [],

  addLine: (product, variant, quantity = 1) =>
    set((state) => {
      const id = `${product.id}:${variant.id}`;
      const existing = state.lines.find((l) => l.id === id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.id === id ? { ...l, quantity: l.quantity + quantity } : l,
          ),
        };
      }
      return { lines: [...state.lines, { id, product, variant, quantity }] };
    }),

  removeLine: (lineId) =>
    set((state) => ({ lines: state.lines.filter((l) => l.id !== lineId) })),

  setQuantity: (lineId, quantity) =>
    set((state) => ({
      lines:
        quantity <= 0
          ? state.lines.filter((l) => l.id !== lineId)
          : state.lines.map((l) => (l.id === lineId ? { ...l, quantity } : l)),
    })),

  getCart: () => ({
    lines: get().lines,
    subtotal: subtotal(get().lines),
    checkoutUrl: null, // con Shopify: cart.checkoutUrl
  }),
}));
