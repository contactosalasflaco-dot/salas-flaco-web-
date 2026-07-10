"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Controles de reproductor dibujados como con crayón:
 * anterior, play/pausa y siguiente.
 *
 * ROTACIÓN SEMANAL: suena UN solo track por semana real.
 * Una semana track1, la siguiente track2, y así en loop.
 * No se puede escuchar el otro hasta que cambie la semana.
 */

/* Lunes 2026-01-05 00:00 UTC como inicio del calendario de rotación */
const EPOCH = Date.UTC(2026, 0, 5);
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function trackOfTheWeek(): string {
  const weeks = Math.floor((Date.now() - EPOCH) / WEEK_MS);
  const idx = ((weeks % 2) + 2) % 2; // módulo seguro
  return idx === 0 ? "/track1.mp4" : "/track2.mp4";
}

export default function PlayerControls({ className = "" }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  /* El track se resuelve en el cliente para evitar desfasajes de hidratación */
  useEffect(() => {
    setSrc(trackOfTheWeek());
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    /* Por si la semana cambió con la página abierta */
    const current = trackOfTheWeek();
    if (src !== current) {
      setSrc(current);
      audio.src = current;
    }
    if (audio.paused) {
      void audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  /* Solo hay un track por semana: adelante/atrás reinician la canción */
  const restart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    if (playing) void audio.play();
  };

  const stroke = {
    stroke: "currentColor",
    strokeWidth: 3.5,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    fill: "currentColor",
    fillOpacity: 0.35,
  };

  return (
    <span
      className={`flex items-center justify-center gap-9 text-[var(--color-circus-yellow)] ${className}`}
      style={{ filter: "url(#paint-wobble)" }}
    >
      {src && <audio ref={audioRef} src={src} loop preload="none" />}

      {/* Anterior */}
      <button
        type="button"
        aria-label="Reiniciar canción"
        onClick={restart}
        className="transition-transform active:scale-90"
      >
        <svg viewBox="0 0 40 36" className="h-10 w-10" fill="none">
          <path d="M19 6 L6 17.5 L19 30 Z" {...stroke} />
          <path d="M34 7 L21 18.5 L34 29 Z" {...stroke} />
        </svg>
      </button>

      {/* Play / Pausa */}
      <button
        type="button"
        aria-label={playing ? "Pausar" : "Reproducir"}
        onClick={togglePlay}
        className="transition-transform active:scale-90"
      >
        {playing ? (
          <svg viewBox="0 0 36 40" className="h-12 w-12" fill="none">
            <path d="M10 7 L11 33" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M25 6 L26 33" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 40 40" className="h-12 w-12" fill="none">
            <path d="M9 6 C 10 16, 10 26, 9 34 L 33 20.5 Z" {...stroke} />
          </svg>
        )}
      </button>

      {/* Siguiente */}
      <button
        type="button"
        aria-label="Reiniciar canción"
        onClick={restart}
        className="transition-transform active:scale-90"
      >
        <svg viewBox="0 0 40 36" className="h-10 w-10" fill="none">
          <path d="M6 7 L19 18.5 L6 29 Z" {...stroke} />
          <path d="M21 6 L34 17.5 L21 30 Z" {...stroke} />
        </svg>
      </button>
    </span>
  );
}
