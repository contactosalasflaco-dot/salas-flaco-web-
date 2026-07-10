/**
 * CONFIGURACIÓN DE CAPAS DE LA PINTURA
 * ------------------------------------
 * El diseñador puede reemplazar los archivos en /public/art/layers/
 * y ajustar acá la profundidad de cada capa SIN tocar componentes.
 *
 * - scrollSpeed: cuánto se desplaza la capa con el scroll (yPercent).
 *   Mayor valor = capa más "adelante" (se mueve más rápido).
 * - mouseFactor: desplazamiento máximo en px al mover el mouse.
 * - zIndex: orden de apilado (el contenido UI del hero usa z-50).
 */
export interface ArtLayerConfig {
  id: string;
  src: string;
  alt: string;
  scrollSpeed: number;
  mouseFactor: number;
  zIndex: number;
}

/**
 * OJO: el cielo (layer-0-fondo.svg) ya no es una capa del hero.
 * Es el fondo narrativo de TODA la home (StorySection): un solo
 * cielo continuo que va del día a la noche con el scroll.
 * Acá quedan solo las capas que se alejan al scrollear.
 */
export const HERO_LAYERS: ArtLayerConfig[] = [
  {
    id: "media",
    src: "/art/layers/layer-1-media.svg",
    alt: "Colinas de pintura",
    scrollSpeed: 16,
    mouseFactor: 18,
    zIndex: 20,
  },
  {
    id: "flotantes",
    src: "/art/layers/layer-2-flotantes.svg",
    alt: "Pinceladas flotantes",
    scrollSpeed: 30,
    mouseFactor: 32,
    zIndex: 30,
  },
  {
    id: "primer-plano",
    src: "/art/layers/layer-3-primer-plano.svg",
    alt: "Brochazos en primer plano",
    scrollSpeed: 46,
    mouseFactor: 48,
    zIndex: 40,
  },
];
