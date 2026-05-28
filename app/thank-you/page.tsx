import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ThankYouHero } from "../components/ThankYouHero";
import { Reveal } from "../components/Reveal";

export const metadata: Metadata = {
  title: "Confirmed · The call is yours | Hamza The Alchemist",
  description:
    "Your seat is held. Here's what to do before we speak, and what others have done after.",
  // Don't index a confirmation page
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  Steps — two of them, side by side on desktop, hairline between    */
/* ------------------------------------------------------------------ */

type Step = {
  index: string;
  meta: string;
  title: string;
  copy: string;
};

const steps: Step[] = [
  {
    index: "I",
    meta: "Within the hour",
    title: "Save the invite.",
    copy: "The Calendly invite hits your inbox. Accept it, add it to your calendar, and pin the time. If it doesn't land within the hour, check Updates and Promotions before reaching out.",
  },
  {
    index: "II",
    meta: "At the call",
    title: "Bring one thing.",
    copy: "Write down, for yourself, the version of you that exists on the other side of this work. Specific. The salary, the body, the day. Bring that page with you. We start there.",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials — bento grid: mixed video + screenshot tiles         */
/* ------------------------------------------------------------------ */

type Testimonial = {
  kind: "video" | "image";
  /** Path inside /public, e.g. "/testimonials/01.mp4". Empty string = placeholder. */
  src: string;
  /** For video: poster thumbnail path. */
  poster?: string;
  /** Alt text / aria-label. */
  alt?: string;
  /** Caption shown beneath the tile. */
  name?: string;
  outcome?: string;
  /** Grid column span on desktop. */
  span: 1 | 2;
  /** Tile aspect ratio. */
  aspect: "video" | "portrait" | "square";
};

const testimonials: Testimonial[] = [
  {
    kind: "video",
    src: "",
    poster: "",
    alt: "Founder testimonial — full interview",
    name: "Operator",
    outcome: "Replace with real name + outcome",
    span: 2,
    aspect: "video",
  },
  {
    kind: "image",
    src: "",
    alt: "Screenshot of result",
    name: "Operator",
    outcome: "DM / result screenshot",
    span: 1,
    aspect: "portrait",
  },
  {
    kind: "image",
    src: "",
    alt: "Screenshot of result",
    name: "Operator",
    outcome: "DM / result screenshot",
    span: 1,
    aspect: "portrait",
  },
  {
    kind: "video",
    src: "",
    poster: "",
    alt: "Operator testimonial",
    name: "Operator",
    outcome: "Replace with real name + outcome",
    span: 2,
    aspect: "video",
  },
  {
    kind: "image",
    src: "",
    alt: "Screenshot of result",
    name: "Operator",
    outcome: "Revenue / reach screenshot",
    span: 1,
    aspect: "square",
  },
  {
    kind: "image",
    src: "",
    alt: "Screenshot of result",
    name: "Operator",
    outcome: "Revenue / reach screenshot",
    span: 1,
    aspect: "square",
  },
  {
    kind: "image",
    src: "",
    alt: "Screenshot of result",
    name: "Operator",
    outcome: "Revenue / reach screenshot",
    span: 1,
    aspect: "square",
  },
];

const aspectClass = (a: Testimonial["aspect"]) =>
  a === "video"
    ? "aspect-video"
    : a === "portrait"
    ? "aspect-[3/4]"
    : "aspect-square";

function TestimonialTile({ t, i }: { t: Testimonial; i: number }) {
  const hasMedia = t.src && t.src.trim().length > 0;
  const spanClass = t.span === 2 ? "md:col-span-2" : "md:col-span-1";

  return (
    <Reveal delay={0.05 * i}>
      <figure
        className={`relative ${spanClass} flex flex-col gap-4`}
        aria-label={t.alt}
      >
        <div
          className={`relative ${aspectClass(
            t.aspect
          )} overflow-hidden rounded-[6px] bg-[var(--color-ink-raised)]`}
          style={{ border: "1px solid var(--color-hairline)" }}
        >
          {hasMedia && t.kind === "video" && (
            <video
              src={t.src}
              poster={t.poster || undefined}
              controls
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover bg-black"
            >
              <track kind="captions" />
            </video>
          )}

          {hasMedia && t.kind === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.src}
              alt={t.alt || ""}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {!hasMedia && <PlaceholderArt kind={t.kind} />}
        </div>

        {(t.name || t.outcome) && (
          <figcaption className="flex items-baseline justify-between gap-4 px-1">
            <span className="font-display font-semibold text-[15px] tracking-[-0.005em] text-[var(--color-ivory)]">
              {t.name}
            </span>
            <span className="eyebrow text-[var(--color-ivory-faint)] text-[11px]">
              {t.outcome}
            </span>
          </figcaption>
        )}
      </figure>
    </Reveal>
  );
}

function PlaceholderArt({ kind }: { kind: "video" | "image" }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, oklch(0.18 0.012 70) 0%, oklch(0.10 0.010 70) 70%)",
      }}
    >
      {/* Faint center mark */}
      <div className="flex flex-col items-center gap-3 opacity-50">
        {kind === "video" ? (
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            aria-hidden
            fill="none"
          >
            <circle
              cx="22"
              cy="22"
              r="21"
              stroke="var(--color-gold)"
              strokeWidth="1"
              opacity="0.6"
            />
            <path
              d="M18 14 L31 22 L18 30 Z"
              fill="var(--color-gold)"
              opacity="0.85"
            />
          </svg>
        ) : (
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            aria-hidden
            fill="none"
          >
            <rect
              x="3"
              y="6"
              width="38"
              height="32"
              rx="2"
              stroke="var(--color-gold)"
              strokeWidth="1"
              opacity="0.65"
            />
            <circle cx="14" cy="17" r="3" fill="var(--color-gold)" opacity="0.85" />
            <path
              d="M4 32 L17 22 L25 28 L31 22 L40 32"
              stroke="var(--color-gold)"
              strokeWidth="1.4"
              fill="none"
              opacity="0.7"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="eyebrow text-[var(--color-ivory-faint)] text-[10px]">
          {kind === "video" ? "Video slot" : "Screenshot slot"}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

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

        {/* Steps — two of them, side by side */}
        <section className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
            <Reveal
              as="p"
              className="eyebrow text-[var(--color-ivory-faint)] mb-4"
            >
              Two Steps
            </Reveal>
            <Reveal>
              <h2 className="font-display font-extrabold text-balance leading-[1.02] tracking-[-0.025em] text-[clamp(32px,4.6vw,62px)] text-[var(--color-ivory)] max-w-[14ch]">
                Before we{" "}
                <span className="accent text-[var(--color-gold)]">speak.</span>
              </h2>
            </Reveal>

            <div
              className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2"
              style={{
                border: "1px solid var(--color-hairline)",
                borderRadius: "6px",
                overflow: "hidden",
                background: "oklch(0.07 0.008 70)",
              }}
            >
              {steps.map((s, i) => (
                <Reveal key={s.index} delay={0.1 + i * 0.1}>
                  <div
                    className="relative h-full p-10 lg:p-14"
                    style={{
                      borderLeft:
                        i === 1 ? "1px solid var(--color-hairline)" : undefined,
                      borderTop:
                        // mobile-only top divider on the second step
                        undefined,
                    }}
                  >
                    {/* Mobile-only top divider for the 2nd step */}
                    {i === 1 && (
                      <div
                        aria-hidden
                        className="absolute left-6 right-6 -top-px h-px md:hidden"
                        style={{ background: "var(--color-hairline)" }}
                      />
                    )}

                    <div className="flex items-baseline justify-between gap-6 mb-8">
                      <span
                        className="accent text-[var(--color-gold)] font-display font-bold leading-none"
                        style={{
                          fontSize: "clamp(56px, 7vw, 96px)",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.index}
                      </span>
                      <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)] tabular-nums text-right">
                        {s.meta}
                      </span>
                    </div>

                    <h3 className="font-display font-bold leading-[1.1] tracking-[-0.015em] text-[clamp(24px,2.6vw,34px)] text-[var(--color-ivory)]">
                      {s.title}
                    </h3>
                    <p className="mt-5 max-w-[44ch] text-[var(--color-ivory-dim)] text-[16px] leading-[1.65]">
                      {s.copy}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials — bento grid of videos + screenshots */}
        <section className="relative py-24 lg:py-32">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 lg:mb-20">
              <div>
                <Reveal
                  as="p"
                  className="eyebrow text-[var(--color-gold)] mb-4"
                >
                  Voices
                </Reveal>
                <Reveal>
                  <h2 className="font-display font-extrabold text-balance leading-[1.02] tracking-[-0.025em] text-[clamp(32px,4.6vw,62px)] text-[var(--color-ivory)] max-w-[18ch]">
                    From inside the{" "}
                    <span className="accent text-[var(--color-gold)]">
                      work.
                    </span>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.15}>
                <p className="max-w-[44ch] text-[var(--color-ivory-dim)] text-[15px] leading-[1.65] md:text-right">
                  Operators who sat in this same seat. What changed for them,
                  in their own words and receipts.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
              {testimonials.map((t, i) => (
                <TestimonialTile key={i} t={t} i={i} />
              ))}
            </div>
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
