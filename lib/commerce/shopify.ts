import type { CommerceProvider, Product } from "./types";

/**
 * PROVEEDOR SHOPIFY (Storefront API) — STUB
 * ------------------------------------------
 * Roadmap de activación:
 * 1. Crear la tienda y un app token de Storefront API.
 * 2. Completar SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN en .env.
 * 3. Implementar los métodos de abajo con queries GraphQL
 *    (products, productByHandle, cartCreate, cartLinesAdd...).
 * 4. Setear NEXT_PUBLIC_COMMERCE_PROVIDER=shopify.
 * 5. El checkout redirige a cart.checkoutUrl de Shopify (no custom).
 *
 * Los componentes no cambian: consumen CommerceProvider.
 */

const SHOPIFY_ENDPOINT = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-04/graphql.json`
  : null;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>) {
  if (!SHOPIFY_ENDPOINT || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error(
      "Shopify no está configurado. Completá SHOPIFY_STORE_DOMAIN y SHOPIFY_STOREFRONT_ACCESS_TOKEN en .env",
    );
  }
  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data: T };
  return json.data;
}

export const shopifyProvider: CommerceProvider = {
  async getProducts(): Promise<Product[]> {
    // TODO: query `products(first: 50)` + mapear al tipo Product
    void shopifyFetch;
    throw new Error("shopifyProvider.getProducts: pendiente de implementación");
  },

  async getProduct(): Promise<Product | null> {
    // TODO: query `productByHandle` + mapear al tipo Product
    throw new Error("shopifyProvider.getProduct: pendiente de implementación");
  },
};
