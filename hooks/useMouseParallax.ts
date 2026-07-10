"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * Parallax de mouse para elementos sueltos (menú, títulos...).
 * `factor` = desplazamiento máximo en px: mayor factor = capa más
 * adelantada de la pintura. Respeta prefers-reduced-motion.
 */
export function useMouseParallax<T extends HTMLElement>(factor: number) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!ref.current) return;

      const x = gsap.quickTo(ref.current, "x", { duration: 1, ease: "power3.out" });
      const y = gsap.quickTo(ref.current, "y", { duration: 1, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5; // -0.5 .. 0.5
        const ny = e.clientY / window.innerHeight - 0.5;
        x(nx * factor * -1); // sentido opuesto al mouse, como las capas de la escena
        y(ny * factor * -0.6);
      };

      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { dependencies: [factor] },
  );

  return ref;
}
