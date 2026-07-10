/**
 * Fondo base del sitio: rojo circo pleno, MUY granulado y ruidoso.
 * Cuatro pasadas de ruido a distinta escala + chispas claras.
 * Ajustar acá: el color base y la opacidad de cada pasada de grano.
 */
export default function GrainGradient() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      {/* Rojo circo pleno, sin gradiente */}
      <div className="absolute inset-0 bg-[var(--color-circus)]" />

      {/* Grano fino y denso (el principal) */}
      <svg className="absolute inset-0 h-full w-full opacity-100 mix-blend-overlay">
        <filter id="bg-grain-fine">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="5" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1.6 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-grain-fine)" />
      </svg>

      {/* Sal y pimienta: puntos duros, muy contrastados */}
      <svg className="absolute inset-0 h-full w-full opacity-60 mix-blend-overlay">
        <filter id="bg-grain-salt">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2" seed="41" stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0 0 1 0 0 0 0 1 0" />
          </feComponentTransfer>
          <feColorMatrix type="matrix" values="0 0 0 0 0.9  0 0 0 0 0.85  0 0 0 0 0.8  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-grain-salt)" />
      </svg>

      {/* Grano medio, manchitas oscuras irregulares */}
      <svg className="absolute inset-0 h-full w-full opacity-80 mix-blend-multiply">
        <filter id="bg-grain-mid">
          <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="5" seed="11" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.6  0 0 0 0 0.6  0 0 0 0 0.6  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-grain-mid)" />
      </svg>

      {/* Grano grueso, textura de lienzo/papel por debajo */}
      <svg className="absolute inset-0 h-full w-full opacity-60 mix-blend-multiply">
        <filter id="bg-grain-coarse">
          <feTurbulence type="fractalNoise" baseFrequency="0.08 0.12" numOctaves="5" seed="23" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0 0.7  0 0 0 0.8 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-grain-coarse)" />
      </svg>
    </div>
  );
}
