import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { MethodHero } from "../components/MethodHero";
import { Method } from "../components/Method";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "The Transmutation · The Method | Hamza The Alchemist",
  description:
    "Three phases of private identity work: Dissolution, Reconstruction, Coagulation. The same protocol runs every engagement.",
};

export default function MethodPage() {
  return (
    <>
      <Nav />
      <main>
        <MethodHero />
        <Method />
      </main>
      <Footer />
    </>
  );
}
