import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import ProductCard from "@/components/ui/ProductCard";
import { commerce } from "@/lib/commerce";
import { ONLY_HOME, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merch",
  description: `La galería de merch oficial de ${SITE.name}: remeras, vinilos, pósters y más, con arte pintado a mano.`,
};

export default async function MerchPage() {
  // De momento solo está habilitada la home (ver ONLY_HOME en lib/site.ts).
  if (ONLY_HOME) notFound();

  const products = await commerce.getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6e1f18] via-[#1e1712] to-[#1e1712] px-6 pb-32 pt-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1
            className="display rotate-1 text-5xl font-black text-[var(--color-canvas)] md:text-7xl"
            style={{ filter: "url(#paint-wobble)" }}
          >
            La galería
          </h1>
          <p className="mt-4 italic opacity-80">
            Cada pieza es parte de la obra. Elegí la tuya.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={Math.min((i % 3) * 0.1, 0.3)}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
