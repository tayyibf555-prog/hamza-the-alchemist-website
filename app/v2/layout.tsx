import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Concept V2 · The Mirror Line | The Lion Alchemist",
  description:
    "Landing page concept: recognition before claim. Private identity recalibration for 6-7 figure operators.",
  // Preview route for client selection — keep it out of search.
  robots: { index: false, follow: false },
};

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
