import type { Metadata } from "next";
import { Nav } from "./components/Nav";
import { MethodHero } from "./components/MethodHero";
import { ClientPortfolio } from "./components/ClientPortfolio";
import { YouTubeWall } from "./components/YouTubeWall";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "The Lion Alchemist | Remove The Ceiling On Your Business",
  description:
    "Private identity recalibration for 7–9 figure operators. Remove the subconscious ceiling quietly capping your business.",
};

/**
 * Home — the Transmutation page.
 *
 * Traffic lands straight on the VSL rather than on a brand hero, so the
 * video is the first thing a visitor meets and the roster is the only
 * thing standing between it and the application form.
 *
 * The previous multi-section homepage is parked at /original.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <MethodHero />
        <ClientPortfolio />
        <YouTubeWall />
      </main>
      <Footer />
    </>
  );
}
