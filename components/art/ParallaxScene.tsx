"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import type { ArtLayerConfig } from "@/layers.config";

interface ParallaxSceneProps {
  layers: ArtLayerConfig[];
  className?: string;
  priority?: boolean;
  children?: React.ReactNode;
}

/**
 * Escena de pintura multicapa.
 * Cada capa se mueve a distinta profundidad con el scroll (ScrollTrigger)
 * y con el mouse (quickTo con easing), según su config en layers.config.ts.
 */
export default function ParallaxScene({
  layers,
  className,
  priority = false,
  children,
}: ParallaxSceneProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Accesibilidad: sin parallax si el usuario prefiere movimiento reducido.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const layerEls = gsap.utils.toArray<HTMLElement>(".parallax-layer", root.current);

      // --- Parallax de SCROLL: cada capa sube a su propia velocidad ---
      layerEls.forEach((el) => {
        const speed = Number(el.dataset.scrollSpeed ?? 0);
        gsap.to(el, {
          yPercent: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // --- Parallax de MOUSE: sutil, con inercia (quickTo) ---
      const setters = layerEls.map((el) => ({
        x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
        factor: Number(el.dataset.mouseFactor ?? 0),
      }));

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5; // -0.5 .. 0.5
        const ny = e.clientY / window.innerHeight - 0.5;
        setters.forEach((s) => {
          s.x(nx * s.factor * -1); // las capas se corren en sentido opuesto al mouse
          s.y(ny * s.factor * -0.6);
        });
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative overflow-hidden ${className ?? ""}`}>
      {layers.map((layer) => (
        <div
          key={layer.id}
          // La capa es más grande que el viewport para que al moverse nunca
          // muestre bordes vacíos. Abajo el margen es doble (-16%): así la
          // pintura cubre de sobra al inicio del scroll y su borde disuelto
          // recién aparece cuando el parallax ya levantó la capa.
          className="parallax-layer absolute -inset-x-[8%] -top-[8%] -bottom-[16%] will-change-transform"
          style={{ zIndex: layer.zIndex }}
          data-scroll-speed={layer.scrollSpeed}
          data-mouse-factor={layer.mouseFactor}
          aria-hidden="true"
        >
          <Image
            src={layer.src}
            alt={layer.alt}
            fill
            priority={priority}
            sizes="110vw"
            // object-fill (y NO object-cover): la pintura se estira al
            // lienzo completo sin recortar, así el borde inferior irregular
            // de cada capa nunca se pierde y no aparecen cortes rectos.
            className="object-fill"
          />
        </div>
      ))}
      <div className="relative z-50 h-full">{children}</div>
    </div>
  );
}
