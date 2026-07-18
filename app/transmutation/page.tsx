import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { MethodHero } from "../components/MethodHero";
import { ClientPortfolio } from "../components/ClientPortfolio";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "The Transmutation | Hamza The Alchemist",
  description:
    "Private identity recalibration for 7–9 figure operators. Remove the subconscious ceiling quietly capping your business.",
};

export default function TransmutationPage() {
  return (
    <>
      <Nav />
      <main>
        <MethodHero />
        <ClientPortfolio />
      </main>
      <Footer />
    </>
  );
}
