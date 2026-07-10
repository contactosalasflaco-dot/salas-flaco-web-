import GrainGradient from "@/components/art/GrainGradient";
import Hero from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      {/* Base visual: gradiente cyan granulado. Sobre esto construimos. */}
      <GrainGradient />
      <Hero />
    </>
  );
}
