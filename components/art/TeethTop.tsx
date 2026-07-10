/**
 * Dientes mordiendo desde el borde superior de la página.
 * Los dos frontales son capas separadas: al pasar el mouse se
 * agrandan con una animación elástica.
 *
 * En mobile, dos flechitas dibujadas a mano señalan cada diente:
 * "Shows" al izquierdo y "Merch" al derecho.
 *
 * Posiciones calculadas sobre el lienzo original (2816x1536),
 * recortado a (30,420)-(2720,1070) => arriba.png de 2690x650.
 */
const TOOTH_TRANSITION = "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)";

export default function TeethTop() {
  return (
    <div aria-hidden="true" className="animate-mouth-top pointer-events-none fixed inset-x-0 top-0 z-[80] select-none">
      {/* En desktop la boca se limita por alto de pantalla (≈30vh) para no
          comerse la página; en mobile sigue ocupando todo el ancho */}
      <div className="relative mx-auto" style={{ width: "min(100vw, 124vh)" }}>
        {/* Respaldo de encía "infinita" (solo mobile): se extiende hacia
            arriba para que nunca se vea el corte del PNG */}
        <div
          className="absolute inset-x-0 md:hidden"
          style={{
            bottom: "55%",
            height: "150vh",
            backgroundImage: "url(/textura-tile.webp)",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat-y",
          }}
        />

        <img src="/arriba.webp" alt="" className="mouth-clamp relative block w-full" draggable={false} />

        {/* Diente frontal izquierdo → Shows (entradas) */}
        <a
          href="https://venti.live/evento/salas-flaco-en-vivo-en-niceto-club"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Shows — entradas en Venti"
          className="tooth-pulse pointer-events-auto absolute"
          style={{ left: "35.465%", top: "15.077%", width: "15.762%" }}
        >
          <img
            src="/diente-izq.webp"
            alt=""
            draggable={false}
            className="block w-full hover:-rotate-3 hover:scale-110 active:-rotate-6 active:scale-125"
            style={{
              transformOrigin: "bottom center",
              transition: TOOTH_TRANSITION,
            }}
          />
        </a>

        {/* Diente frontal derecho → Merch */}
        <a
          href="https://lafamilia.ar/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Merch — La Familia"
          className="tooth-pulse pointer-events-auto absolute"
          style={{ left: "51.264%", top: "16.615%", width: "15.688%" }}
        >
          <img
            src="/diente-der.webp"
            alt=""
            draggable={false}
            className="block w-full hover:rotate-3 hover:scale-110 active:rotate-6 active:scale-125"
            style={{
              transformOrigin: "bottom center",
              transition: TOOTH_TRANSITION,
            }}
          />
        </a>

        {/* Flechitas artísticas — solo mobile */}
        <div className="md:hidden">
          {/* Señala el diente izquierdo */}
          <a
            href="https://venti.live/evento/salas-flaco-en-vivo-en-niceto-club"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto absolute flex flex-col items-start"
            style={{ left: "43.3%", top: "85%", transform: "translateX(-108%)" }}
          >
            <svg
              viewBox="0 0 80 70"
              className="h-14 w-16 text-[var(--color-circus-yellow)]"
              style={{ filter: "url(#paint-wobble)" }}
              fill="none"
            >
              <path
                d="M10 64 C 22 52, 44 40, 66 10"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M53 12 L 66 10 L 65 24"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="-rotate-6 text-xl text-[var(--color-circus-yellow)]"
              style={{ fontFamily: "var(--font-crayon)" }}
            >
              Shows
            </span>
          </a>

          {/* Señala el diente derecho */}
          <a
            href="https://lafamilia.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto absolute flex flex-col items-end"
            style={{ left: "59.1%", top: "85%", transform: "translateX(8%)" }}
          >
            <svg
              viewBox="0 0 80 70"
              className="h-14 w-16 text-[var(--color-circus-yellow)]"
              style={{ filter: "url(#paint-wobble)" }}
              fill="none"
            >
              <path
                d="M70 64 C 58 52, 36 40, 14 10"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M27 12 L 14 10 L 15 24"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="rotate-6 text-xl text-[var(--color-circus-yellow)]"
              style={{ fontFamily: "var(--font-crayon)" }}
            >
              Merch
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
