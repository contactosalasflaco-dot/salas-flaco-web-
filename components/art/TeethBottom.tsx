/**
 * Los mismos dientes, invertidos, mordiendo desde el borde inferior.
 * Actúa como footer visual de la página.
 */
export default function TeethBottom() {
  return (
    <div aria-hidden="true" className="animate-mouth-bottom pointer-events-none fixed inset-x-0 bottom-0 z-[80] select-none">
      <div className="relative">
        {/* Respaldo de piel/labio "infinito": se extiende una pantalla entera
            hacia abajo para que al cerrar la boca nunca se vea el corte del PNG */}
        <div
          className="absolute inset-x-0 -scale-y-100"
          style={{
            top: "70%",
            height: "150vh",
            backgroundImage: "url(/textura-tile.webp)",
            backgroundSize: "100% auto",
            backgroundRepeat: "repeat",
          }}
        />

        <img src="/abajo.webp" alt="" className="relative block w-full" draggable={false} />
      </div>
    </div>
  );
}
