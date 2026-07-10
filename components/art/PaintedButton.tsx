"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useId } from "react";

interface PaintedButtonProps {
  href?: string;
  onClick?: () => void;
  color?: string; // color de la pincelada
  textColor?: string;
  size?: "sm" | "md" | "lg";
  external?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

const SIZES = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-3 text-lg",
  lg: "px-10 py-4 text-2xl",
};

/**
 * Botón-pincelada: una mancha de pintura sobre el lienzo.
 * El borde irregular se genera con feTurbulence + feDisplacementMap,
 * así cada botón parece pintado a mano. En hover se "despega" del
 * lienzo (capa más adelantada: se eleva, rota y proyecta sombra).
 */
export default function PaintedButton({
  href,
  onClick,
  color = "var(--color-crimson)",
  textColor = "var(--color-canvas)",
  size = "md",
  external = false,
  disabled = false,
  children,
}: PaintedButtonProps) {
  const id = useId(); // ids de filtro únicos por instancia

  const inner = (
    <motion.span
      className={`relative inline-block ${SIZES[size]} ${disabled ? "opacity-50" : ""}`}
      whileHover={disabled ? undefined : { y: -4, rotate: -1.4, scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.96, rotate: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 240 88"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full drop-shadow-[0_3px_6px_rgba(30,23,18,0.4)] transition-[filter] duration-300 group-hover:drop-shadow-[0_14px_22px_rgba(30,23,18,0.55)]"
      >
        <defs>
          <filter id={`brush-${id}`} x="-15%" y="-25%" width="130%" height="150%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045 0.11"
              numOctaves="3"
              seed="8"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" />
          </filter>
        </defs>
        {/* pincelada base */}
        <path
          d="M14 44 Q 58 12 122 16 T 228 34 Q 226 62 166 70 T 14 60 Z"
          fill={color}
          filter={`url(#brush-${id})`}
        />
        {/* brillo de óleo fresco */}
        <path
          d="M30 36 Q 80 22 150 26 T 214 38 Q 180 32 120 32 T 30 36 Z"
          fill="#ffffff"
          opacity="0.18"
          filter={`url(#brush-${id})`}
        />
      </svg>
      <span className="display relative font-bold tracking-wide" style={{ color: textColor }}>
        {children}
      </span>
    </motion.span>
  );

  const cls =
    "group relative inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]";

  if (href && !disabled) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
