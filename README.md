# Salas Flaco — Web artística inmersiva

Sitio oficial del artista: una pintura viva con parallax multicapa. Construido con Next.js 15 (App Router, TypeScript estricto), Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion, Lenis y Zustand.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint     # ESLint
npm run format   # Prettier
```

Copiá `.env.example` a `.env.local`. Con el valor por defecto (`mock`) todo funciona sin configurar nada.

## Arquitectura

```
app/                  Rutas (App Router): /, /shows, /merch, /merch/[handle]
components/
  art/                Sistema visual: ParallaxScene, PaintedButton, PaintedMenu, SmoothScroll
  sections/           Secciones de página: Hero, ShowsTeaser, MerchTeaser
  ui/                 UI: ProductCard, AddToCart, CartDrawer, Reveal
lib/
  commerce/           Abstracción de ecommerce (types + mock + stub Shopify)
  gsap.ts             Registro único de plugins GSAP
  store.ts            Estado global (Zustand): carrito + UI
  site.ts             Nombre del artista, tagline, URL
data/                 shows.ts y products.ts (mock, tipados)
public/art/layers/    Capas de la pintura del hero (SVG placeholder)
layers.config.ts      Profundidad/velocidad de cada capa
styles/globals.css    Design tokens (@theme) — paleta, tipografías, sombras
```

Server Components por defecto; solo llevan `"use client"` los componentes con animación o interacción. Parallax respeta `prefers-reduced-motion`.

## Cómo reemplazar la pintura (para el diseñador)

1. Exportar cada capa del arte real como PNG/WebP **con fondo transparente** (menos la capa 0, que es el fondo) a `public/art/layers/`. Tamaño sugerido: 1920×1200 o mayor.
2. En `layers.config.ts` actualizar `src` y ajustar por capa:
   - `scrollSpeed`: cuánto sube con el scroll (más = más adelante).
   - `mouseFactor`: cuánto responde al mouse, en px.
   - `zIndex`: orden de apilado (la UI del hero usa z-50).
3. No hay que tocar ningún componente. Se pueden agregar o quitar capas libremente.

La paleta completa del sitio vive en `styles/globals.css` (`@theme`) — cambiar esos tokens repinta todo.

## Roadmap: activar Shopify (ecommerce real)

El carrito y el catálogo ya consumen la abstracción `lib/commerce/` — la UI no cambia.

1. Crear la tienda en Shopify y cargar los productos (los `handle` se vuelven las URLs).
2. Generar un token de **Storefront API** y completar en `.env.local`:
   `SHOPIFY_STORE_DOMAIN` y `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.
3. Implementar los métodos marcados con `TODO` en `lib/commerce/shopify.ts` (queries `products` y `productByHandle` de la Storefront API, mapeadas a los tipos de `lib/commerce/types.ts`).
4. Migrar las acciones del carrito en `lib/store.ts` a `cartCreate` / `cartLinesAdd` / `cartLinesUpdate` (la forma del estado ya coincide).
5. Setear `NEXT_PUBLIC_COMMERCE_PROVIDER=shopify`. El checkout redirige a `cart.checkoutUrl` de Shopify — no hay checkout custom.
6. Borrar `data/products.ts` cuando el catálogo real esté andando.

## Deploy

Pensado para Vercel: importar el repo, setear las variables de entorno y listo. `/merch/[handle]` se pre-renderiza con `generateStaticParams`.
