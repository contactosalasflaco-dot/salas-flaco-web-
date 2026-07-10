"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { formatMoney } from "@/lib/format";

/**
 * Carrito lateral con estética de pintura.
 * Construido 100% contra la abstracción de commerce: cuando se
 * active Shopify solo cambia de dónde vienen las líneas y el
 * checkoutUrl — este componente queda igual.
 */
export default function CartDrawer() {
  const { cartOpen, closeCart, lines, setQuantity, removeLine, getCart } = useStore();
  const cart = getCart();

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Velo oscuro sobre el cuadro */}
          <motion.div
            className="fixed inset-0 z-[95] bg-[var(--color-ink)]/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Carrito de compras"
            className="fixed inset-y-0 right-0 z-[96] flex w-full max-w-md flex-col bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-[var(--shadow-paint-lg)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
          >
            {/* Borde izquierdo: chorreado de pintura */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-4 h-full w-5"
              viewBox="0 0 20 800"
              preserveAspectRatio="none"
            >
              <path
                d="M20 0 Q 4 60 14 140 T 6 300 T 16 460 T 4 620 T 20 800 L 20 0 Z"
                fill="var(--color-canvas)"
              />
            </svg>

            <div className="flex items-center justify-between border-b-2 border-dashed border-[var(--color-ink)]/20 px-6 py-5">
              <h2 className="display text-2xl font-bold">Tu carrito</h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="display text-xl hover:rotate-90 hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <p className="mt-10 text-center italic opacity-70">
                  El lienzo está vacío… por ahora.
                </p>
              ) : (
                <ul className="flex flex-col gap-5">
                  {lines.map((line) => (
                    <li key={line.id} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 -rotate-2 overflow-hidden rounded-sm shadow-[var(--shadow-paint-sm)]">
                        <Image
                          src={line.product.image.src}
                          alt={line.product.image.alt}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <span className="display font-bold">{line.product.title}</span>
                        <span className="text-sm opacity-70">
                          {line.variant.title !== "Único" && `Talle ${line.variant.title} · `}
                          {formatMoney(line.variant.price)}
                        </span>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            type="button"
                            aria-label="Restar uno"
                            onClick={() => setQuantity(line.id, line.quantity - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-ink)]/10 font-bold hover:bg-[var(--color-ink)]/20"
                          >
                            −
                          </button>
                          <span className="w-5 text-center font-bold">{line.quantity}</span>
                          <button
                            type="button"
                            aria-label="Sumar uno"
                            onClick={() => setQuantity(line.id, line.quantity + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-ink)]/10 font-bold hover:bg-[var(--color-ink)]/20"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => removeLine(line.id)}
                            className="ml-auto text-sm underline opacity-60 hover:opacity-100"
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t-2 border-dashed border-[var(--color-ink)]/20 px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="display text-lg">Subtotal</span>
                <span className="display text-xl font-bold">{formatMoney(cart.subtotal)}</span>
              </div>
              {cart.checkoutUrl ? (
                <a
                  href={cart.checkoutUrl}
                  className="display block w-full rounded-sm bg-[var(--color-crimson)] py-3 text-center text-lg font-bold text-[var(--color-canvas)] shadow-[var(--shadow-paint)] transition-transform hover:-translate-y-0.5"
                >
                  Ir al checkout
                </a>
              ) : (
                <>
                  <button
                    type="button"
                    disabled
                    className="display block w-full cursor-not-allowed rounded-sm bg-[var(--color-ink)]/30 py-3 text-center text-lg font-bold text-[var(--color-canvas)]"
                  >
                    Ir al checkout
                  </button>
                  <p className="mt-2 text-center text-xs opacity-60">
                    El checkout se habilita al conectar Shopify (ver README).
                  </p>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
