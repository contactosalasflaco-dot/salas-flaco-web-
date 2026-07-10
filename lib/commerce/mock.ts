import type { CommerceProvider, Product } from "./types";
import { MOCK_PRODUCTS } from "@/data/products";

/**
 * Proveedor mock: sirve el catálogo desde data/products.ts.
 * Mantiene la misma interfaz async que tendrá Shopify para que
 * el swap sea transparente.
 */
export const mockProvider: CommerceProvider = {
  async getProducts(): Promise<Product[]> {
    return MOCK_PRODUCTS;
  },

  async getProduct(handle: string): Promise<Product | null> {
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  },
};
