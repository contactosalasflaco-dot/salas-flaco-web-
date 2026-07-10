import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/commerce/types";
import { formatMoney } from "@/lib/format";

/** Cuadro colgado en la galería: cada producto es una pequeña obra. */
export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const soldOut = product.variants.every((v) => !v.available);

  return (
    <Link
      href={`/merch/${product.handle}`}
      className={`group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)] ${
        index % 2 === 0 ? "rotate-[0.8deg]" : "-rotate-[0.8deg]"
      }`}
    >
      <div className="relative overflow-hidden rounded-sm border-8 border-[var(--color-canvas-deep)] bg-[var(--color-canvas)] shadow-[var(--shadow-paint)] transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-[var(--shadow-paint-lg)]">
        <div className="relative aspect-square">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {soldOut && (
            <span className="display absolute right-3 top-3 -rotate-6 bg-[var(--color-ink)] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[var(--color-canvas)]">
              Agotado
            </span>
          )}
        </div>
        <div className="flex items-center justify-between px-4 py-3 text-[var(--color-ink)]">
          <span className="display font-bold">{product.title}</span>
          <span className="font-semibold text-[var(--color-crimson)]">
            {formatMoney(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
}
