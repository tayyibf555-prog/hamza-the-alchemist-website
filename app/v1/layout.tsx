import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concept V1 · Private Screening | The Lion Alchemist",
  description:
    "Landing page concept: the video is the page. Private identity recalibration for 6-7 figure operators.",
  // Preview route for client selection — keep it out of search.
  robots: { index: false, follow: false },
};

export default function V1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
