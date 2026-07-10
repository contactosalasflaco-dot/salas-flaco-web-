/**
 * Los mismos dientes, invertidos, mordiendo desde el borde inferior.
 * Actúa como footer visual de la página.
 */
export default function TeethBottom() {
  return (
    <div aria-hidden="true" className="animate-mouth-bottom pointer-events-none fixed inset-x-0 bottom-0 z-[80] select-none">
      {/* Mismo ancho que los dientes de arriba para que la mordida cierre alineada */}
      <div className="relative mx-auto" style={{ width: "min(100vw, 124vh)" }}>
        {/* Respaldo de piel/labio "infinito" (solo mobile): se extiende hacia
            abajo para que nunca se vea el corte del PNG */}
        <div
          className="absolute inset-x-0 -scale-y-100 md:hidden"
          style={{
            top: "70%",
            height: "150vh",
            backgroundImage: "url(/textura-tile.webp)",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat-y",
          }}
        />

        <img src="/abajo.webp" alt="" className="mouth-clamp relative block w-full" draggable={false} />
      </div>
    </div>
  );
}
