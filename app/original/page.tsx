import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { AlchemistHero } from "../components/AlchemistHero";
import { About } from "../components/About";
import { VSLHero } from "../components/VSLHero";
import { HoldingBack } from "../components/HoldingBack";
import { Inquiry } from "../components/Inquiry";
import { Signup } from "../components/Signup";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Original Homepage | The Lion Alchemist",
  // Kept out of search so it cannot compete with the real homepage.
  robots: { index: false, follow: false },
};

/**
 * The previous multi-section homepage, parked here after the Transmutation
 * page took over "/". Nothing links to it — it exists so the brand hero,
 * About, VSL band, Inquiry and newsletter block can be compared against the
 * new structure, or restored, without digging through git history.
 */
export default function OriginalHomePage() {
  return (
    <>
      <Nav />
      <main>
        <AlchemistHero />
        <About />
        <VSLHero />
        <HoldingBack />
        <Inquiry />
        <Signup />
      </main>
      <Footer />
    </>
  );
}
