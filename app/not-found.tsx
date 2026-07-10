import Link from "next/link";

/** 404 — de momento solo existe la home. */
export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1
          className="-rotate-1 text-4xl text-[var(--color-circus-yellow)] md:text-6xl"
          style={{ fontFamily: "var(--font-crayon)", filter: "url(#paint-wobble)" }}
        >
          no busques lo que no hay
        </h1>
        <Link
          href="/"
          className="mt-10 inline-block text-xl text-[var(--color-circus-yellow)] underline underline-offset-8 opacity-80 transition-opacity hover:opacity-100"
          style={{ fontFamily: "var(--font-crayon)" }}
        >
          volver
        </Link>
      </div>
    </div>
  );
}
