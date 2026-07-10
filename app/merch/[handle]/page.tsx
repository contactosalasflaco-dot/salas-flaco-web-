import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/ui/AddToCart";
import Reveal from "@/components/ui/Reveal";
import { commerce } from "@/lib/commerce";
import { formatMoney } from "@/lib/format";
import { SITE } from "@/lib/site";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await commerce.getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await commerce.getProduct(handle);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: [{ url: product.image.src }] },
  };
}

/** JSON-LD de producto para SEO. */
function ProductJsonLd({ product }: { product: NonNullable<Awaited<ReturnType<typeof commerce.getProduct>>> }) {
  const available = product.variants.some((v) => v.available);
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: `${SITE.url}${product.image.src}`,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: product.price.currencyCode,
      price: product.price.amount,
      availability: available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await commerce.getProduct(handle);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#6e1f18] via-[#1e1712] to-[#1e1712] px-6 pb-32 pt-36">
      <ProductJsonLd product={product} />

      <div className="mx-auto max-w-5xl">
        <Link
          href="/merch"
          className="display text-sm uppercase tracking-widest opacity-70 transition-opacity hover:opacity-100"
        >
          ← Volver a la galería
        </Link>

        <div className="mt-8 grid gap-12 md:grid-cols-2 md:items-start">
          <Reveal>
            <div className="relative -rotate-1 overflow-hidden rounded-sm border-[12px] border-[var(--color-canvas-deep)] shadow-[var(--shadow-paint-lg)]">
              <div className="relative aspect-square">
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="text-[var(--color-canvas)]">
              <h1 className="display text-4xl font-black md:text-5xl" style={{ filter: "url(#paint-wobble)" }}>
                {product.title}
              </h1>
              <p className="display mt-4 text-3xl font-bold text-[var(--color-gold)]">
                {formatMoney(product.price)}
              </p>
              <p className="mt-6 leading-relaxed opacity-85">{product.description}</p>

              <div className="mt-10 rounded-sm bg-[var(--color-canvas)] p-6 text-[var(--color-ink)] shadow-[var(--shadow-paint)]">
                <AddToCart product={product} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
