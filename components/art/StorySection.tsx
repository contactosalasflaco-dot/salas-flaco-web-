"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

/**
 * LA HISTORIA DEL CIELO — un solo cuadro continuo
 * -----------------------------------------------
 * Este componente envuelve TODA la home (hero incluido). El cielo
 * queda fijo (sticky) detrás de todo y es el mismo desde el primer
 * píxel: el óleo del hero ES el cielo que después atardece.
 *
 *   Acto 0 · El cuadro     → hero de día: óleo, nubes y sol
 *   Acto 1 · La partida    → al bajar, cruza una bandada
 *   Acto 2 · Atardecer     → el sol cae, el óleo se apaga, otra
 *                            bandada vuelve a casa
 *   Acto 3 · Noche         → luna, estrellas y un pájaro solitario
 *
 * El relato está mapeado al scroll (timeline scrub). El aleteo, el
 * balanceo y la deriva de nubes corren por tiempo para que el cuadro
 * siga vivo aunque el scroll se detenga.
 */

/* Paleta del degradé base en cada acto (se interpola con el scroll) */
const SKY_DAY = { "--sky-top": "#16294a", "--sky-mid": "#3b6ba5", "--sky-bot": "#c8862a" };
const SKY_SUNSET = { "--sky-top": "#274b7a", "--sky-mid": "#c8862a", "--sky-bot": "#a23327" };
const SKY_NIGHT = { "--sky-top": "#0d1526", "--sky-mid": "#16294a", "--sky-bot": "#1e1712" };

/* Posiciones deterministas (nada de Math.random: evita errores de hidratación) */
const STARS = Array.from({ length: 54 }, (_, i) => ({
  left: (i * 37 + 13) % 100,
  top: (i * 53 + 7) % 55,
  size: 1 + ((i * 29) % 3),
}));

const FLOCK_A = [
  { left: 4, top: 0, size: 46 },
  { left: 12, top: 26, size: 34 },
  { left: 20, top: 8, size: 40 },
  { left: 30, top: 34, size: 28 },
  { left: 38, top: 14, size: 36 },
];

const FLOCK_B = [
  { left: 8, top: 20, size: 38 },
  { left: 18, top: 0, size: 46 },
  { left: 28, top: 30, size: 30 },
  { left: 36, top: 10, size: 42 },
];

/** Pájaro-pincelada: silueta pintada con alas que aletean. */
function Bird({ size, flip = false }: { size: number; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 60"
      width={size}
      height={size * 0.6}
      aria-hidden="true"
      className="bird overflow-visible"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g className="bird-wings" style={{ transformOrigin: "50% 62%", transformBox: "fill-box" }}>
        <path d="M50 38 Q 30 8 6 20 Q 32 24 48 42 Z" fill="var(--color-ink)" opacity="0.9" />
        <path d="M50 38 Q 70 8 94 20 Q 68 24 52 42 Z" fill="var(--color-ink)" opacity="0.9" />
      </g>
      <path d="M42 36 q 8 -7 16 0 q -8 10 -16 0 Z" fill="var(--color-ink)" />
    </svg>
  );
}

export default function StorySection({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // ----- Vida por TIEMPO (independiente del scroll) -----
      gsap.to(".bird-wings", {
        scaleY: 0.5,
        duration: 0.28,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.07,
      });
      gsap.to(".bird", {
        y: "+=9",
        duration: 1.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.25,
      });
      gsap.to(".story-cloud", {
        xPercent: 28,
        duration: 70,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 8,
      });

      // ----- El RELATO, mapeado al scroll de TODA la home -----
      // Acto 0 (el hero, ~primer tercio del scroll) deja el cielo de día;
      // la historia empieza a moverse cuando el visitante deja el cuadro.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Acto 1: la partida — la bandada cruza mientras se deja el hero
      tl.fromTo(".flock-a", { xPercent: -30 }, { xPercent: 125, duration: 0.9, ease: "none" }, 0.3)

        // Acto 2: atardecer — el degradé vira, el óleo del día se apaga,
        // el sol baja hasta esconderse tras el horizonte
        .to(".story-sky", { ...SKY_SUNSET, duration: 0.7, ease: "none" }, 0.55)
        .to(".story-oleo", { opacity: 0.45, duration: 0.7, ease: "none" }, 0.55)
        .fromTo(".story-sun", { yPercent: 0 }, { yPercent: 380, duration: 0.75, ease: "none" }, 0.55)
        .to(".story-cloud", { yPercent: -35, opacity: 0.5, duration: 1.4, ease: "none" }, 0.55)
        // la bandada vuelve a casa, más baja, en sentido contrario
        .fromTo(".flock-b", { xPercent: 125 }, { xPercent: -30, duration: 0.8, ease: "none" }, 1.0)

        // Acto 3: noche — el óleo casi desaparece, luna y estrellas
        .to(".story-sky", { ...SKY_NIGHT, duration: 0.6, ease: "none" }, 1.3)
        .to(".story-oleo", { opacity: 0.12, duration: 0.6, ease: "none" }, 1.3)
        .fromTo(
          ".story-moon",
          { yPercent: 380, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.55, ease: "none" },
          1.45,
        )
        .to(".story-stars", { opacity: 1, duration: 0.45, ease: "none" }, 1.6)
        .fromTo(".bird-lone", { xPercent: -20 }, { xPercent: 130, duration: 0.4, ease: "none" }, 1.6);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative">
      {/* ===== EL CIELO: un solo fondo continuo para toda la home ===== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" aria-hidden="true">
        {/* Degradé base: GSAP interpola estas variables por acto */}
        <div
          className="story-sky absolute inset-0"
          style={{
            ...(SKY_DAY as React.CSSProperties),
            background:
              "linear-gradient(to bottom, var(--sky-top), var(--sky-mid) 55%, var(--sky-bot))",
          }}
        />

        {/* El óleo del hero: el mismo cielo pintado, que se apaga al caer la tarde */}
        <div className="story-oleo absolute inset-0">
          <Image
            src="/art/layers/layer-0-fondo.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Nubes de óleo que derivan */}
        <div className="story-cloud absolute left-[6%] top-[16%] h-28 w-[38%] rounded-full bg-[#f2e8d5]/35 blur-2xl" />
        <div className="story-cloud absolute left-[48%] top-[9%] h-24 w-[30%] rounded-full bg-[#f2e8d5]/25 blur-2xl" />
        <div className="story-cloud absolute left-[26%] top-[30%] h-20 w-[26%] rounded-full bg-[#f2e8d5]/20 blur-xl" />

        {/* El sol del cuadro (en el hero está arriba; con el scroll se pone) */}
        <div
          className="story-sun absolute left-[66%] top-[20%] h-28 w-28 rounded-full md:h-40 md:w-40"
          style={{
            background: "radial-gradient(circle at 38% 35%, #f6e7b8, var(--color-gold) 55%, #c8862a)",
            boxShadow: "0 0 70px 24px rgba(224,179,76,0.4)",
            filter: "url(#paint-wobble)",
          }}
        />

        {/* Luna (escondida hasta el acto 3) */}
        <div
          className="story-moon absolute left-[16%] top-[12%] h-24 w-24 rounded-full opacity-0 md:h-32 md:w-32"
          style={{
            background: "radial-gradient(circle at 40% 35%, #ffffff, #e8e2d2 55%, #b9b2a0)",
            boxShadow: "0 0 60px 18px rgba(242,232,213,0.28)",
            filter: "url(#paint-wobble)",
          }}
        />

        {/* Estrellas (se encienden en el acto 3) */}
        <div className="story-stars absolute inset-0 opacity-0">
          {STARS.map((s, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-[#f2e8d5]"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                opacity: 0.4 + (s.size - 1) * 0.3,
              }}
            />
          ))}
        </div>

        {/* Bandada A: la partida */}
        <div className="flock-a absolute left-0 top-[16%] w-full will-change-transform">
          {FLOCK_A.map((b, i) => (
            <span key={i} className="absolute" style={{ left: `${b.left}%`, top: b.top }}>
              <Bird size={b.size} />
            </span>
          ))}
        </div>

        {/* Bandada B: la vuelta a casa */}
        <div className="flock-b absolute left-0 top-[34%] w-full will-change-transform">
          {FLOCK_B.map((b, i) => (
            <span key={i} className="absolute" style={{ left: `${b.left}%`, top: b.top }}>
              <Bird size={b.size} flip />
            </span>
          ))}
        </div>

        {/* El pájaro solitario del final */}
        <div className="bird-lone absolute left-0 top-[24%] w-full will-change-transform">
          <span className="absolute left-[10%]">
            <Bird size={52} />
          </span>
        </div>
      </div>

      {/* ===== CONTENIDO: hero + secciones pasan por delante del cielo ===== */}
      <div className="relative z-10 -mt-[100vh]">{children}</div>
    </section>
  );
}
