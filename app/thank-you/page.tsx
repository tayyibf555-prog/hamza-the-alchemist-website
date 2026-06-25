import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { ThankYouHero } from "../components/ThankYouHero";
import { Reveal } from "../components/Reveal";
import { VideoFrame } from "../components/VideoFrame";
import { ThankYouSteps, type Step } from "../components/ThankYouSteps";
import { MetaEvent } from "../components/MetaEvent";

export const metadata: Metadata = {
  title: "Confirmed · The call is yours | Hamza The Alchemist",
  description:
    "Your seat is held. Here's what to do before we speak, and what others have done after.",
  // Don't index a confirmation page
  robots: { index: false, follow: false },
};

/* ------------------------------------------------------------------ */
/*  Steps — two stacked full-width blocks with screenshot + checkbox  */
/* ------------------------------------------------------------------ */

const steps: Step[] = [
  {
    index: "I",
    meta: "Within the hour",
    title: "Save the invite.",
    copy: "The Calendly invite hits your inbox. Accept it, add it to your calendar, and pin the time. If it doesn't land within the hour, check Updates and Promotions before reaching out.",
    image: "/steps/01.png",
    imageAlt: "Screenshot showing how to accept the calendar invite",
    imageAspect: "1496 / 1051",
    confirmLabel: "I have accepted the calendar invite.",
  },
  {
    index: "II",
    meta: "At the call",
    title: "Bring one thing.",
    copy: "Write down, for yourself, the version of you that exists on the other side of this work. Specific. The salary, the body, the day. Bring that page with you. We start there.",
    image: "",
    imageAlt: "Screenshot or example showing what to bring to the call",
    confirmLabel: "I have written down my outcome.",
  },
];

/* ------------------------------------------------------------------ */
/*  Testimonials — the three client testimonial videos                */
/* ------------------------------------------------------------------ */

type VideoTestimonial = {
  name: string;
  role: string;
  /** Self-hosted video under /public. */
  videoSrc?: string;
  /** OR a generic embed URL (Loom, etc.) — include autoplay params. */
  videoEmbedUrl?: string;
  /** Poster shown before play (needed for embeds that block thumbnails). */
  videoPoster?: string;
  /** CSS aspect-ratio, e.g. "9 / 16" or "16 / 9". */
  aspect: string;
};

const videoTestimonials: VideoTestimonial[] = [
  {
    name: "Jordy Michels",
    role: "Day Trader",
    videoSrc: "/clients/jordy-michels-testimonial.mp4",
    aspect: "9 / 16",
  },
  {
    name: "Nathan Jones",
    role: "Entrepreneur",
    videoEmbedUrl:
      "https://www.loom.com/embed/bba3a4897e60430a9914b1c85504893b?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    videoPoster: "/clients/nathan-jones-poster.gif",
    aspect: "16 / 9",
  },
  {
    name: "Frank",
    role: "Business Owner",
    videoSrc: "/clients/frank.mp4",
    aspect: "9 / 16",
  },
];

function VideoTile({ t, i }: { t: VideoTestimonial; i: number }) {
  const vertical = t.aspect.trim().startsWith("9");

  return (
    <Reveal delay={0.08 * i}>
      <figure
        className={`flex flex-col gap-4 w-full ${
          vertical ? "max-w-[300px]" : "max-w-[540px]"
        }`}
      >
        {/* Gold bloom behind the frame */}
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-12%]"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.4) 0%, oklch(0.30 0.10 75 / 0.18) 35%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div className="relative">
            <VideoFrame
              videoSrc={t.videoSrc}
              embedUrl={t.videoEmbedUrl}
              videoPoster={t.videoPoster}
              aspect={t.aspect}
              runtime="00:00"
              progress={0.02}
            />
          </div>
        </div>

        <figcaption className="flex items-baseline justify-between gap-4 px-1">
          <span className="font-display font-semibold text-[15px] tracking-[-0.005em] text-[var(--color-ivory)]">
            {t.name}
          </span>
          <span className="eyebrow text-[var(--color-ivory-faint)] text-[11px]">
            {t.role}
          </span>
        </figcaption>
      </figure>
    </Reveal>
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
      {/* Booked-call conversion — this page is only reached after the Calendly booking. */}
      <MetaEvent name="Schedule" />
      <Nav />
      <main>
        <ThankYouHero name={name} />

        {/* Two stacked steps with screenshot + interactive checkbox each */}
        <ThankYouSteps steps={steps} />

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
                  in their own words.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-wrap items-start justify-center gap-8 lg:gap-12">
              {videoTestimonials.map((t, i) => (
                <VideoTile key={i} t={t} i={i} />
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
