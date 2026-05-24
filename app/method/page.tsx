import type { Metadata } from "next";
import Link from "next/link";
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

        {/* Closing CTA — sends visitors to the application form on the home page */}
        <section
          className="relative py-32 lg:py-44"
          style={{
            borderTop: "1px solid var(--color-hairline)",
          }}
        >
          <div className="mx-auto max-w-[920px] px-6 lg:px-10 text-center">
            <p className="eyebrow text-[var(--color-gold)] mb-8">
              The work is the same regardless
            </p>
            <h2 className="font-display font-extrabold text-balance leading-[1.02] tracking-[-0.025em] text-[clamp(36px,5vw,72px)] text-[var(--color-ivory)]">
              What changes is the{" "}
              <span className="accent text-[var(--color-gold)]">operator.</span>
            </h2>
            <p className="mt-8 max-w-[52ch] mx-auto text-[var(--color-ivory-dim)] text-[17px] leading-[1.65]">
              The protocol does not adapt to who you are. You adapt to it.
              That is the only way the outcome stabilises.
            </p>

            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/#inquiry"
                className="group relative inline-flex items-center gap-3 h-[60px] px-9 eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                  boxShadow:
                    "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
                }}
              >
                <span className="relative z-10 font-semibold tracking-[0.2em] text-[13px]">
                  Inquire About Admission
                </span>
                <span
                  aria-hidden
                  className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                >
                  →
                </span>
              </Link>

              <Link
                href="/"
                className="eyebrow text-[var(--color-ivory-faint)] hover:text-[var(--color-ivory)] transition-colors duration-200 inline-flex items-center gap-2"
              >
                <span aria-hidden>←</span>
                Return home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
