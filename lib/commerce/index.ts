import type { CommerceProvider } from "./types";
import { mockProvider } from "./mock";
import { shopifyProvider } from "./shopify";

/**
 * Punto único de acceso al commerce.
 * Cambiar de proveedor = cambiar una env var, cero cambios en UI.
 */
const provider: CommerceProvider =
  process.env.NEXT_PUBLIC_COMMERCE_PROVIDER === "shopify" ? shopifyProvider : mockProvider;

export const commerce = provider;
export type * from "./types";
