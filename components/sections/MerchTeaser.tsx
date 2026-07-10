import Reveal from "@/components/ui/Reveal";
import PaintedButton from "@/components/art/PaintedButton";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/lib/commerce/types";

/** Adelanto de la galería de merch en la home. */
export default function MerchTeaser({ products }: { products: Product[] }) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-32 md:pb-44">
      <Reveal>
        <h2 className="display rotate-1 text-right text-4xl font-black text-[var(--color-gold)] drop-shadow-[0_3px_10px_rgba(30,23,18,0.65)] md:text-6xl">
          La galería
        </h2>
        <p className="mt-3 text-right italic opacity-80 drop-shadow-[0_2px_6px_rgba(30,23,18,0.6)]">
          Merch pintado, numerado y hecho para durar.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {products.slice(0, 3).map((p, i) => (
          <Reveal key={p.id} delay={i * 0.12}>
            <ProductCard product={p} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3} className="mt-14 text-center">
        <PaintedButton href="/merch" color="var(--color-crimson)">
          Entrar a la galería
        </PaintedButton>
      </Reveal>
    </section>
  );
}
