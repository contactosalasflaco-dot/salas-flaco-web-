"use client";

import { useState } from "react";
import PaintedButton from "@/components/art/PaintedButton";
import { useStore } from "@/lib/store";
import type { Product } from "@/lib/commerce/types";

/** Selector de variante + agregar al carrito (abre el drawer). */
export default function AddToCart({ product }: { product: Product }) {
  const addLine = useStore((s) => s.addLine);
  const openCart = useStore((s) => s.openCart);

  const firstAvailable = product.variants.find((v) => v.available);
  const [variantId, setVariantId] = useState(firstAvailable?.id ?? "");
  const variant = product.variants.find((v) => v.id === variantId);
  const soldOut = !firstAvailable;

  return (
    <div className="flex flex-col gap-6">
      {product.variants.length > 1 && (
        <fieldset>
          <legend className="display mb-3 text-sm font-bold uppercase tracking-widest opacity-70">
            Talle
          </legend>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                disabled={!v.available}
                onClick={() => setVariantId(v.id)}
                aria-pressed={variantId === v.id}
                className={`display h-11 w-11 rounded-full border-2 font-bold transition-all ${
                  variantId === v.id
                    ? "-rotate-6 border-[var(--color-crimson)] bg-[var(--color-crimson)] text-[var(--color-canvas)] shadow-[var(--shadow-paint-sm)]"
                    : "border-[var(--color-ink)]/30 hover:border-[var(--color-ink)]"
                } ${!v.available ? "cursor-not-allowed opacity-30 line-through" : ""}`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <PaintedButton
        onClick={() => {
          if (!variant) return;
          addLine(product, variant);
          openCart();
        }}
        color="var(--color-crimson)"
        size="lg"
        disabled={soldOut || !variant}
      >
        {soldOut ? "Agotado" : "Agregar al carrito"}
      </PaintedButton>
    </div>
  );
}
