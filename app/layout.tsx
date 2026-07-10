import type { Metadata, Viewport } from "next";
import { Rock_Salt } from "next/font/google";
import "@/styles/globals.css";

/* Fuente estilo crayón para los titulares */
const crayon = Rock_Salt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-crayon",
  display: "swap",
});
import SmoothScroll from "@/components/art/SmoothScroll";
import TeethTop from "@/components/art/TeethTop";
import TeethBottom from "@/components/art/TeethBottom";
import MouthGate from "@/components/art/MouthGate";
import CartDrawer from "@/components/ui/CartDrawer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Sitio oficial`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    SITE.name,
    "música",
    "artista",
    "shows",
    "recitales",
    "entradas",
    "merch",
    "Buenos Aires",
    "Argentina",
  ],
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: `${SITE.name} — Sitio oficial`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `La dentadura de ${SITE.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Sitio oficial`,
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1e1712",
};

/** JSON-LD del artista para buscadores. */
function ArtistJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    image: `${SITE.url}/og.png`,
    logo: `${SITE.url}/icon-512.png`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${crayon.variable} canvas-grain antialiased`}>
        <ArtistJsonLd />
        {/* Filtro global: ondulación de pintura para titulares (uso: filter: url(#paint-wobble)) */}
        <svg aria-hidden="true" className="absolute h-0 w-0">
          <defs>
            <filter id="paint-wobble">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="2" seed="3" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
            </filter>
          </defs>
        </svg>

        <SmoothScroll />
        <MouthGate />
        {/* Telón con loader: oculta todo hasta que carguen las texturas */}
        <div aria-hidden="true" className="mouth-curtain">
          <div className="mouth-loader">
            <div className="mouth-loader-ring" />
            <span className="text-sm" style={{ fontFamily: "var(--font-crayon)" }}>
              cargando…
            </span>
          </div>
        </div>
        <TeethTop />
        <TeethBottom />
        <main>{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
