"use client";

import { useEffect } from "react";

/**
 * La boca arranca cerrada y NO se abre hasta que el 100% de las
 * texturas esté cargado y decodificado. Cuando termina, agrega
 * la clase `mouth-ready` al <html>, que dispara la animación CSS.
 * Red de seguridad: si algo falla, abre a los 8 segundos igual.
 */
const ASSETS = [
  "/arriba.webp",
  "/abajo.webp",
  "/textura-tile.webp",
  "/diente-izq.webp",
  "/diente-der.webp",
];

export default function MouthGate() {
  useEffect(() => {
    let done = false;
    const open = () => {
      if (done) return;
      done = true;
      document.documentElement.classList.add("mouth-ready");
    };

    Promise.all(
      ASSETS.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              if (img.decode) img.decode().then(resolve, () => resolve());
              else resolve();
            };
            img.onerror = () => resolve();
            img.src = src;
          }),
      ),
    ).then(open);

    const failsafe = setTimeout(open, 8000);
    return () => clearTimeout(failsafe);
  }, []);

  return null;
}
