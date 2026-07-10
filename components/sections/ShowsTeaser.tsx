import Reveal from "@/components/ui/Reveal";
import PaintedButton from "@/components/art/PaintedButton";
import { SHOWS } from "@/data/shows";
import { formatShowDate } from "@/lib/format";

/** Próximas 3 fechas, como anotaciones sobre el lienzo. */
export default function ShowsTeaser() {
  const next = SHOWS.filter((s) => new Date(s.date) >= new Date()).slice(0, 3);

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-28 md:py-40">
      <Reveal>
        <h2 className="display -rotate-1 text-4xl font-black text-[var(--color-gold)] drop-shadow-[0_3px_10px_rgba(30,23,18,0.65)] md:text-6xl">
          Próximos shows
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-6">
        {next.map((show, i) => {
          const d = formatShowDate(show.date);
          return (
            <Reveal key={show.id} delay={i * 0.12}>
              <div
                className={`flex items-center gap-6 rounded-sm bg-[var(--color-canvas)] px-6 py-5 text-[var(--color-ink)] shadow-[var(--shadow-paint)] ${
                  i % 2 === 0 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"
                }`}
              >
                <div className="display text-center leading-none">
                  <div className="text-4xl font-black text-[var(--color-crimson)]">{d.day}</div>
                  <div className="text-sm uppercase tracking-widest">{d.month}</div>
                </div>
                <div className="flex-1">
                  <div className="display text-xl font-bold md:text-2xl">
                    {show.city}, {show.country}
                  </div>
                  <div className="text-sm opacity-70">{show.venue}</div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.3} className="mt-12 text-center">
        <PaintedButton href="/shows" color="var(--color-ultramarine)">
          Ver todas las fechas
        </PaintedButton>
      </Reveal>
    </section>
  );
}
