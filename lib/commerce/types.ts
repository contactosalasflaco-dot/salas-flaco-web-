/**
 * Contratos de la capa de commerce.
 * Los componentes SOLO conocen estas interfaces; nunca hablan
 * directo con Shopify ni con el mock. Cambiar de proveedor no
 * requiere tocar UI.
 */

export interface Money {
  amount: number;
  currencyCode: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  title: string; // ej: "S", "M", "L", "Único"
  available: boolean;
  price: Money;
}

export interface Product {
  id: string;
  handle: string; // slug para la URL
  title: string;
  description: string;
  image: ProductImage;
  price: Money;
  variants: ProductVariant[];
  tags?: string[];
}

export interface CartLine {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  lines: CartLine[];
  subtotal: Money;
  /** URL de checkout (con Shopify: cart.checkoutUrl). */
  checkoutUrl: string | null;
}

export interface CommerceProvider {
  getProducts(): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
}
