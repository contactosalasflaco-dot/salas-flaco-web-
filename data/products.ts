import type { Product } from "@/lib/commerce/types";

/**
 * Catálogo mock. Con Shopify activo este archivo desaparece:
 * los productos vienen de la Storefront API con la misma forma.
 */

const ars = (amount: number) => ({ amount, currencyCode: "ARS" });

const sizes = (base: string, price: number, soldOut: string[] = []) =>
  ["S", "M", "L", "XL"].map((t) => ({
    id: `${base}-${t.toLowerCase()}`,
    title: t,
    available: !soldOut.includes(t),
    price: ars(price),
  }));

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    handle: "remera-pincelada",
    title: "Remera Pincelada",
    description:
      "Remera negra de algodón 24/1 con la pincelada insignia del disco serigrafiada a mano. Cada unidad tiene variaciones únicas de tinta, como una obra irrepetible.",
    image: { src: "/art/merch/prod-1.svg", alt: "Remera Pincelada" },
    price: ars(28000),
    variants: sizes("prod-1", 28000),
    tags: ["textil"],
  },
  {
    id: "prod-2",
    handle: "vinilo-oleo-vivo",
    title: "Vinilo — Óleo Vivo",
    description:
      "Edición limitada en vinilo de 180g con arte de tapa pintado al óleo y gatefold texturado. Incluye lámina firmada.",
    image: { src: "/art/merch/prod-2.svg", alt: "Vinilo Óleo Vivo" },
    price: ars(52000),
    variants: [{ id: "prod-2-u", title: "Único", available: true, price: ars(52000) }],
    tags: ["música"],
  },
  {
    id: "prod-3",
    handle: "buzo-lienzo",
    title: "Buzo Lienzo",
    description:
      "Buzo crudo color lienzo con bordado de brochazos en el pecho. Frisa premium invisible, terminación artesanal.",
    image: { src: "/art/merch/prod-3.svg", alt: "Buzo Lienzo" },
    price: ars(46000),
    variants: sizes("prod-3", 46000, ["S"]),
    tags: ["textil"],
  },
  {
    id: "prod-4",
    handle: "poster-gira",
    title: "Póster de Gira",
    description:
      "Póster 50x70 impreso en papel de acuarela 300g, con la pintura completa de la gira 2026. Numerado a mano.",
    image: { src: "/art/merch/prod-4.svg", alt: "Póster de Gira" },
    price: ars(15000),
    variants: [{ id: "prod-4-u", title: "Único", available: true, price: ars(15000) }],
    tags: ["arte"],
  },
  {
    id: "prod-5",
    handle: "gorra-brochazo",
    title: "Gorra Brochazo",
    description:
      "Gorra gabardina con brochazo bordado en hilo dorado. Ajuste metálico, interior estampado con la paleta del disco.",
    image: { src: "/art/merch/prod-5.svg", alt: "Gorra Brochazo" },
    price: ars(22000),
    variants: [{ id: "prod-5-u", title: "Único", available: true, price: ars(22000) }],
    tags: ["accesorios"],
  },
  {
    id: "prod-6",
    handle: "tote-paleta",
    title: "Tote Paleta",
    description:
      "Bolso de lona cruda estampado con la paleta de colores del artista. Costuras reforzadas, tamaño vinilo.",
    image: { src: "/art/merch/prod-6.svg", alt: "Tote Paleta" },
    price: ars(18000),
    variants: [{ id: "prod-6-u", title: "Único", available: false, price: ars(18000) }],
    tags: ["accesorios"],
  },
];
