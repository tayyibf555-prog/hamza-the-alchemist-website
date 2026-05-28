import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ThankYouHero } from "../components/ThankYouHero";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Confirmed · The call is yours | Hamza The Alchemist",
  description:
    "Your seat is held. Calendar invite is on its way. Here's what happens between now and the call.",
  // Don't index a confirmation page
  robots: { index: false, follow: false },
};

type Step = {
  index: string;
  title: string;
  copy: string;
  meta: string;
};

const steps: Step[] = [
  {
    index: "I",
    title: "Within the hour",
    copy: "A calendar invite from Calendly hits your inbox. Confirm it lands — gmail occasionally hides it under Updates.",
    meta: "From: bookings",
  },
  {
    index: "II",
    title: "Twenty-four hours before",
    copy: "A short prep note arrives. One question to think through, no homework, no forms.",
    meta: "From: hamza",
  },
  {
    index: "III",
    title: "The call itself",
    copy: "Forty-five minutes, video on. No slides, no script — a direct read on whether the work is right.",
    meta: "45 min · Video",
  },
];

type Props = {
  searchParams: Promise<{ name?: string }>;
};

export default async function ThankYouPage({ searchParams }: Props) {
  const { name } = await searchParams;

  return (
    <>
      <Nav />
      <main>
        <ThankYouHero name={name} />

        {/* What happens next — three-step timeline */}
        <section className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
            <Reveal
              as="p"
              className="eyebrow text-[var(--color-ivory-faint)] text-center mb-4"
            >
              What happens next
            </Reveal>
            <Reveal>
              <h2 className="font-display font-extrabold text-balance text-center leading-[1.02] tracking-[-0.025em] text-[clamp(32px,4.4vw,58px)] text-[var(--color-ivory)]">
                Three quiet steps before we{" "}
                <span className="accent text-[var(--color-gold)]">speak.</span>
              </h2>
            </Reveal>

            <div className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-hairline)] rounded-[6px] overflow-hidden">
              {steps.map((s, i) => (
                <Reveal key={s.index} delay={0.1 + i * 0.1}>
                  <div
                    className="relative h-full p-8 lg:p-10 flex flex-col gap-6"
                    style={{
                      background: "oklch(0.07 0.008 70)",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="accent text-[var(--color-gold)] text-[28px] leading-none">
                        {s.index}
                      </span>
                      <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)] tabular-nums">
                        {s.meta}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-[22px] leading-[1.15] tracking-[-0.01em] text-[var(--color-ivory)]">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-ivory-dim)]">
                        {s.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Small housekeeping line */}
            <Reveal delay={0.5}>
              <p className="mt-12 max-w-[64ch] mx-auto text-center text-[14px] leading-[1.65] text-[var(--color-ivory-faint)]">
                If something shifts, reschedule from the calendar invite —
                no message required. Two reschedules without a call forfeits
                the slot.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Closing — while you wait */}
        <section
          className="relative py-24 lg:py-32"
          style={{ borderTop: "1px solid var(--color-hairline)" }}
        >
          <div className="mx-auto max-w-[920px] px-6 lg:px-10 text-center">
            <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-8">
              While you wait
            </Reveal>
            <Reveal>
              <h2 className="font-display font-extrabold text-balance leading-[1.02] tracking-[-0.025em] text-[clamp(32px,4.6vw,64px)] text-[var(--color-ivory)]">
                The reading room is{" "}
                <span className="accent text-[var(--color-gold)]">open.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-[52ch] mx-auto text-[var(--color-ivory-dim)] text-[17px] leading-[1.65]">
                Weekly dispatches on identity, leverage, and subconscious
                mechanics. The clients on the call have read most of them.
                It will save us time.
              </p>
            </Reveal>

            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/blog"
                className="group relative inline-flex items-center gap-3 h-[60px] px-9 eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                  boxShadow:
                    "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
                }}
              >
                <span className="relative z-10 font-semibold tracking-[0.2em] text-[13px]">
                  Enter The Reading Room
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
