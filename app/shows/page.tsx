import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import PaintedButton from "@/components/art/PaintedButton";
import { SHOWS, type ShowStatus } from "@/data/shows";
import { formatShowDate } from "@/lib/format";
import { ONLY_HOME, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shows",
  description: `Todas las fechas de la gira de ${SITE.name}. Entradas, ciudades y venues.`,
};

const STATUS_LABEL: Record<ShowStatus, string> = {
  available: "Entradas disponibles",
  few_left: "Últimas entradas",
  sold_out: "Agotado",
};

const STATUS_COLOR: Record<ShowStatus, string> = {
  available: "var(--color-verdigris)",
  few_left: "var(--color-ochre)",
  sold_out: "var(--color-crimson-deep)",
};

/** JSON-LD de eventos musicales para SEO. */
function ShowsJsonLd() {
  const data = SHOWS.map((show) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${SITE.name} en ${show.city}`,
    startDate: show.date,
    location: {
      "@type": "MusicVenue",
      name: show.venue,
      address: { "@type": "PostalAddress", addressLocality: show.city, addressCountry: show.country },
    },
    performer: { "@type": "MusicGroup", name: SITE.name },
    offers: {
      "@type": "Offer",
      url: show.ticketsUrl,
      availability:
        show.status === "sold_out"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
    },
    eventStatus: "https://schema.org/EventScheduled",
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function ShowsPage() {
  // De momento solo está habilitada la home (ver ONLY_HOME en lib/site.ts).
  if (ONLY_HOME) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#16294a] via-[#1e1712] to-[#1e1712] px-6 pb-32 pt-36">
      <ShowsJsonLd />

      <div className="mx-auto max-w-4xl">
        <Reveal>
          <h1
            className="display -rotate-1 text-5xl font-black text-[var(--color-canvas)] md:text-7xl"
            style={{ filter: "url(#paint-wobble)" }}
          >
            Shows
          </h1>
          <p className="mt-4 italic opacity-80">La gira, fecha por fecha.</p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-7">
          {SHOWS.map((show, i) => {
            const d = formatShowDate(show.date);
            const soldOut = show.status === "sold_out";
            return (
              <Reveal key={show.id} delay={Math.min(i * 0.08, 0.4)}>
                <article
                  className={`flex flex-col gap-5 rounded-sm bg-[var(--color-canvas)] p-6 text-[var(--color-ink)] shadow-[var(--shadow-paint)] sm:flex-row sm:items-center ${
                    i % 2 === 0 ? "rotate-[0.5deg]" : "-rotate-[0.5deg]"
                  } ${soldOut ? "opacity-75 saturate-50" : ""}`}
                >
                  <div className="display shrink-0 text-center leading-none sm:w-24">
                    <div className="text-5xl font-black text-[var(--color-crimson)]">{d.day}</div>
                    <div className="mt-1 text-sm uppercase tracking-widest">
                      {d.month} {d.year}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="display text-2xl font-bold">
                      {show.city}, {show.country}
                    </h2>
                    <p className="opacity-70">{show.venue}</p>
                    <span
                      className="display mt-2 inline-block -rotate-1 px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-[var(--color-canvas)]"
                      style={{ backgroundColor: STATUS_COLOR[show.status] }}
                    >
                      {STATUS_LABEL[show.status]}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <PaintedButton
                      href={soldOut ? undefined : show.ticketsUrl}
                      external
                      disabled={soldOut}
                      color="var(--color-ultramarine)"
                      size="sm"
                    >
                      {soldOut ? "Agotado" : "Entradas"}
                    </PaintedButton>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
