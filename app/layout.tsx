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
  description: SITE.tagline,
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1e1712",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${crayon.variable} canvas-grain antialiased`}>
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
        {/* Telón que oculta el contenido hasta que carguen las texturas */}
        <div aria-hidden="true" className="mouth-curtain" />
        <TeethTop />
        <TeethBottom />
        <main>{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
