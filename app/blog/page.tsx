import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { BlogHero } from "../components/BlogHero";
import { BlogArchive } from "../components/BlogArchive";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "Reality Architecture Training | Hamza The Alchemist",
  description:
    "Weekly frameworks on identity, leverage, and subconscious mechanics — without mysticism. Sundays, 7am UTC.",
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>
        <BlogHero />
        <BlogArchive />
      </main>
      <Footer />
    </>
  );
}
