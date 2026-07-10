/**
 * Fechas de shows. Hoy: archivo local tipado.
 * Mañana: la misma interfaz `Show` puede alimentarse de un CMS
 * (Sanity, Payload...) sin tocar los componentes.
 */
export type ShowStatus = "available" | "few_left" | "sold_out";

export interface Show {
  id: string;
  date: string; // ISO 8601
  city: string;
  country: string;
  venue: string;
  ticketsUrl: string;
  status: ShowStatus;
}

export const SHOWS: Show[] = [
  {
    id: "ba-0825",
    date: "2026-08-14T21:00:00-03:00",
    city: "Buenos Aires",
    country: "Argentina",
    venue: "Teatro Vorterix",
    ticketsUrl: "https://entradas.example.com/salas-flaco-vorterix",
    status: "available",
  },
  {
    id: "cba-0826",
    date: "2026-08-22T21:30:00-03:00",
    city: "Córdoba",
    country: "Argentina",
    venue: "Quality Espacio",
    ticketsUrl: "https://entradas.example.com/salas-flaco-quality",
    status: "few_left",
  },
  {
    id: "ros-0926",
    date: "2026-09-05T21:00:00-03:00",
    city: "Rosario",
    country: "Argentina",
    venue: "Sala Lavardén",
    ticketsUrl: "https://entradas.example.com/salas-flaco-lavarden",
    status: "available",
  },
  {
    id: "mdz-0926",
    date: "2026-09-19T21:00:00-03:00",
    city: "Mendoza",
    country: "Argentina",
    venue: "Auditorio Ángel Bustelo",
    ticketsUrl: "https://entradas.example.com/salas-flaco-bustelo",
    status: "sold_out",
  },
  {
    id: "mvd-1026",
    date: "2026-10-03T21:00:00-03:00",
    city: "Montevideo",
    country: "Uruguay",
    venue: "La Trastienda",
    ticketsUrl: "https://entradas.example.com/salas-flaco-trastienda",
    status: "available",
  },
  {
    id: "scl-1026",
    date: "2026-10-17T21:00:00-03:00",
    city: "Santiago",
    country: "Chile",
    venue: "Teatro Cariola",
    ticketsUrl: "https://entradas.example.com/salas-flaco-cariola",
    status: "available",
  },
];
