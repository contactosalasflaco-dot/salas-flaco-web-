import PaintedButton from "@/components/art/PaintedButton";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-b from-[#16294a] to-[#1e1712] px-6 text-center">
      <div>
        <h1
          className="display text-7xl font-black text-[var(--color-canvas)]"
          style={{ filter: "url(#paint-wobble)" }}
        >
          404
        </h1>
        <p className="mt-4 italic opacity-80">Esta parte del cuadro todavía no fue pintada.</p>
        <div className="mt-8">
          <PaintedButton href="/" color="var(--color-ultramarine)">
            Volver al lienzo
          </PaintedButton>
        </div>
      </div>
    </div>
  );
}
