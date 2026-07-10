import { SITE } from "@/lib/site";
import PlayerControls from "@/components/ui/PlayerControls";

/**
 * Solo el nombre, centrado sobre el fondo granulado.
 * En mobile el nombre se parte en dos líneas y entre medio
 * van los controles de reproductor estilo crayón.
 */
export default function Hero() {
  const [first, ...rest] = SITE.name.split(" ");
  const second = rest.join(" ");

  return (
    <section className="relative flex h-[100svh] flex-col items-center justify-center px-6 text-center">
      <h1
        className="flex -rotate-1 flex-col items-center gap-5 text-5xl text-[var(--color-circus-yellow)] md:block md:text-7xl lg:text-8xl"
        style={{ fontFamily: "var(--font-crayon)", filter: "url(#paint-wobble)" }}
      >
        {/* Desktop: nombre entero en una línea */}
        <span className="hidden md:inline">{SITE.name}</span>

        {/* Mobile: Salas / controles / Flaco */}
        <span className="md:hidden">{first}</span>
        <PlayerControls className="md:hidden" />
        <span className="md:hidden">{second}</span>
      </h1>

      {/* Desktop: controles debajo del nombre */}
      <div className="mt-10 hidden md:block">
        <PlayerControls />
      </div>
    </section>
  );
}
