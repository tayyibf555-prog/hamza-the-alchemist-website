import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CohortHero } from "../components/cohort/CohortHero";
import { CohortCurriculum } from "../components/cohort/CohortCurriculum";
import { CohortIncludes } from "../components/cohort/CohortIncludes";
import { CohortFit } from "../components/cohort/CohortFit";
import { CohortPricing } from "../components/cohort/CohortPricing";
import { CohortFaq } from "../components/cohort/CohortFaq";
import { ClientPortfolio } from "../components/ClientPortfolio";

export const metadata: Metadata = {
  title: "The Cohort | The Lion Alchemist",
  description:
    "Six weeks of identity recalibration for 6–7 figure operators. One live call a week, with the course content between them.",
};

/**
 * The cohort page.
 *
 * Order follows the sales logic: the offer, then exactly what happens each
 * week, then what you get, then proof, then fit, then price, then objections.
 * Proof sits before the price deliberately — the roster is the reason the
 * number is believable.
 */
export default function CohortPage() {
  return (
    <>
      <Nav />
      <main>
        <CohortHero />
        <CohortCurriculum />
        <CohortIncludes />
        <ClientPortfolio />
        <CohortFit />
        <CohortPricing />
        <CohortFaq />
      </main>
      <Footer />
    </>
  );
}
