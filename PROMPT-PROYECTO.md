# PROMPT — Web artística inmersiva para artista musical

Copiá todo lo que sigue y dáselo a la IA:

---

Actuá como un arquitecto de software senior y creative developer experto en experiencias web inmersivas (nivel Awwwards). Vas a construir de punta a punta la web oficial de un artista musical. Leé todo el brief antes de escribir código.

## 1. Visión del proyecto

Una web-experiencia artística: visitarla debe sentirse como entrar en una pintura viva. No es una web corporativa con animaciones; es una obra interactiva. Todo el diseño gira alrededor de un fondo tipo pintura (óleo/acrílico) con **parallax multicapa**: el fondo, los elementos intermedios y la UI son capas de pintura separadas que se mueven a distintas profundidades con el scroll y el mouse.

Concepto clave del menú: el fondo es una pintura, y los botones de navegación **son parte de esa misma pintura** pero pintados en una capa más adelantada — como pinceladas frescas sobre el lienzo. Al hacer hover deben reaccionar como pintura (leve relieve, sombra, desplazamiento parallax mayor que el fondo), nunca como botones planos de UI genérica.

## 2. Alcance actual (v1)

- **Home inmersiva**: hero fullscreen con la pintura de fondo en capas parallax (mínimo 3-4 capas: fondo lejano, capa media, elementos flotantes, UI). Parallax por scroll (GSAP ScrollTrigger) y por movimiento de mouse (sutil, con easing).
- **Menú** con 2 ítems: **Shows** y **Merch**, integrados visualmente a la pintura como capa superior.
- **/shows**: listado de fechas (fecha, ciudad, venue, link a entradas, estado agotado/disponible). Datos desde un archivo local tipado (`data/shows.ts`) por ahora, con la interfaz preparada para venir de un CMS a futuro.
- **/merch**: catálogo de productos con la misma estética pictórica. En v1 puede ser vitrina (grilla de productos + página de detalle), pero **la arquitectura debe quedar lista para ecommerce completo** (ver sección 4).

## 3. Stack obligatorio

- **Next.js 15+ (App Router, TypeScript estricto)** — SSR/SSG/ISR, escalable, SEO.
- **Tailwind CSS v4** + design tokens propios (paleta, tipografías, espaciados) definidos como CSS variables para máxima personalización del sistema visual.
- **GSAP + ScrollTrigger** para parallax y animaciones de scroll. **Framer Motion** para microinteracciones de componentes (hover, transiciones de página con View Transitions o AnimatePresence).
- **Lenis** para smooth scrolling.
- Assets de la pintura: PNG/WebP con transparencia por capa, servidos con `next/image`, con versiones responsive. Preparar la estructura para que el diseñador pueda reemplazar las capas sin tocar código (carpeta `public/art/layers/` + config de capas en un archivo `layers.config.ts` con profundidad/velocidad parallax por capa).
- **Zustand** para estado global liviano (menú, futuro carrito).
- Deploy en **Vercel**.

## 4. Preparado para ecommerce (Shopify headless)

El merch será a futuro un ecommerce real con **Shopify como backend headless** (Storefront API GraphQL): Shopify maneja productos, stock, checkout y pagos; la web mantiene el 100% del diseño artístico.

Para v1:
- Definí una capa de abstracción `lib/commerce/` con interfaces (`Product`, `Cart`, `getProducts()`, `getProduct(handle)`, `createCart()`, `addToCart()`...) e implementación mock local. Cuando llegue Shopify, solo se cambia la implementación, no los componentes.
- Dejá el carrito (drawer lateral con estética de pintura) ya construido contra esa abstracción.
- Checkout: redirección al checkout de Shopify (no custom).
- Variables de entorno ya previstas: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

## 5. Calidad de código y arquitectura

- TypeScript estricto, ESLint + Prettier configurados.
- Estructura clara: `app/` (rutas), `components/ui/`, `components/art/` (capas, parallax, canvas), `components/sections/`, `lib/`, `data/`, `hooks/`, `styles/`.
- Componentes de parallax reutilizables: `<ParallaxLayer depth={n}>`, `<PaintedButton>`, `<PaintedMenu>` — todo configurable por props/tokens.
- Server Components por defecto; Client Components solo donde hay interacción/animación.
- Accesibilidad: respetar `prefers-reduced-motion` (desactivar parallax), navegación por teclado, contraste AA, HTML semántico.
- Performance: LCP < 2.5s, imágenes de capas optimizadas (WebP/AVIF), lazy loading fuera del hero, animaciones solo con `transform`/`opacity`.
- SEO: metadata API de Next, Open Graph, JSON-LD de eventos (`MusicEvent`) en /shows y de productos en /merch.
- README con setup, arquitectura, cómo reemplazar las capas de la pintura y roadmap de activación de Shopify.

## 6. Cómo trabajar

1. Primero presentá la arquitectura de carpetas y el plan de componentes.
2. Después implementá en este orden: setup del proyecto → sistema de capas parallax + home → menú pintado → /shows → /merch (vitrina + abstracción commerce + carrito mock).
3. Usá placeholders artísticos (gradientes/SVG con textura de pintura generados por código) para las capas hasta que existan los assets reales, respetando la estructura de `layers.config.ts`.
4. Comentá el código donde haya lógica de animación no obvia.

Si algo del brief es ambiguo, preguntame antes de asumir.

---
