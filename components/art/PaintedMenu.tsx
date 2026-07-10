"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useId } from "react";
import PaintedButton from "@/components/art/PaintedButton";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { useStore } from "@/lib/store";
import { SITE } from "@/lib/site";

/**
 * Menú principal: pinceladas sobre el lienzo, la capa MÁS adelantada
 * de la pintura. Por eso cada ítem tiene su propio parallax de mouse
 * (factores mayores que las capas del fondo) y a distinta profundidad
 * entre sí, para que el menú también respire con el cuadro.
 */
export default function PaintedMenu() {
  const openCart = useStore((s) => s.openCart);
  const count = useStore((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  const id = useId();

  // Cada elemento del menú es una capa distinta de pintura:
  // el carrito es la pincelada más fresca (se mueve más).
  const logoRef = useMouseParallax<HTMLDivElement>(18);
  const showsRef = useMouseParallax<HTMLDivElement>(28);
  const merchRef = useMouseParallax<HTMLDivElement>(36);
  const cartRef = useMouseParallax<HTMLDivElement>(44);

  return (
    <header className="fixed inset-x-0 top-0 z-[90]">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10"
      >
        {/* Firma del artista, como firmada en la esquina del cuadro */}
        <div ref={logoRef} className="will-change-transform">
          <Link
            href="/"
            className="display inline-block -rotate-2 text-2xl font-bold tracking-tight text-[var(--color-ink)] transition-transform hover:rotate-0 md:text-3xl"
          >
            {SITE.name}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div ref={showsRef} className="will-change-transform">
            <PaintedButton href="/shows" color="var(--color-ultramarine)" size="sm">
              Shows
            </PaintedButton>
          </div>
          <div ref={merchRef} className="will-change-transform">
            <PaintedButton href="/merch" color="var(--color-crimson)" size="sm">
              Merch
            </PaintedButton>
          </div>

          {/* Carrito: mancha de pintura dorada */}
          <div ref={cartRef} className="will-change-transform">
            <motion.button
              type="button"
              onClick={openCart}
              aria-label={`Abrir carrito (${count} ${count === 1 ? "ítem" : "ítems"})`}
              className="relative grid h-12 w-12 place-items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
              whileHover={{ y: -3, rotate: 6, scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
            >
              <svg aria-hidden="true" viewBox="0 0 60 60" className="absolute inset-0 h-full w-full drop-shadow-[0_3px_6px_rgba(30,23,18,0.45)]">
                <defs>
                  <filter id={`splat-${id}`} x="-30%" y="-30%" width="160%" height="160%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="3" seed="14" result="n" />
                    <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
                  </filter>
                </defs>
                <circle cx="30" cy="30" r="22" fill="var(--color-gold)" filter={`url(#splat-${id})`} />
              </svg>
              <span className="display relative text-sm font-bold text-[var(--color-ink)]">
                {count > 0 ? count : "◈"}
              </span>
            </motion.button>
          </div>
        </div>
      </nav>
    </header>
  );
}
