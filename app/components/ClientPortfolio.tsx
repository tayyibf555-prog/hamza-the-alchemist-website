"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { VideoFrame } from "./VideoFrame";
import { CTAButton } from "./CTAButton";

type Profile = {
  name: string;
  role: string;
  /** Portrait photo path under /public. */
  photo?: string;
  /** Self-hosted testimonial video under /public. */
  videoSrc?: string;
  /** OR a YouTube id, if the testimonial lives on YouTube. */
  videoYoutubeId?: string;
  /** OR a generic embed URL (Loom, Vimeo, etc.) — include autoplay params. */
  videoEmbedUrl?: string;
  /** Poster image shown before play (needed for embeds that block thumbnails). */
  videoPoster?: string;
  /** CSS aspect-ratio for the testimonial frame, e.g. "9 / 16". */
  videoAspect?: string;
  /** Short display-font pull quote. */
  pullQuote?: string;
  /** 2–4 sentences about the operator and the work. */
  bio?: string;
  /** Headline outcome, e.g. "$50K → $100K / month". Rendered as a stat chip. */
  result?: string;
  /**
   * A written testimonial in the client's own words, paragraphs separated by
   * blank lines. Shown as a preview that expands on click — these run long,
   * and dropping 400 words into the roster would bury the next case study.
   */
  written?: string;
};

const profiles: Profile[] = [
  {
    name: "JORDY MICHELS",
    role: "Day Trader",
    result: "$50K \u2192 $100K / month",
    photo: "/clients/jordy-michels.png",
    videoSrc: "/clients/jordy-michels-testimonial.mp4",
    videoAspect: "9 / 16",
    bio: "Michiels Jordy joined the program as a day trader looking to break through the internal ceiling affecting his performance and growth.\n\nThrough the process, he deepened his connection with God, transformed his identity, and gained the clarity to create his own program helping day traders master their identity and performance.",
  },
  {
    name: "NATHAN JONES",
    role: "Entrepreneur",
    result: "$0 \u2192 $10K / month",
    photo: "/clients/nathan-jones.jpg",
    videoEmbedUrl:
      "https://www.loom.com/embed/bba3a4897e60430a9914b1c85504893b?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    videoPoster: "/clients/nathan-jones-poster.gif",
    videoAspect: "16 / 9",
    bio: "Nathan Jones came to me as a 9–5 worker who wanted to become a full-time trader. Through identity recalibration, we removed the subconscious patterns keeping him tied to his old reality and installed the identity of a consistently profitable trader. As his identity changed, his results followed. Ultimately growing into a trader generating $5,000–$10,000 per month.",
  },
  {
    name: "FRANK",
    role: "Business Owner",
    result: "+25% revenue year on year",
    photo: "/clients/frank.jpg",
    videoSrc: "/clients/frank.mp4",
    videoAspect: "9 / 16",
    bio: "Entered the program as a business owner carrying significant subconscious limitations around money, growth, and receiving success. Through the extraction and removal of those subconscious blocks, Frank was able to shift from operating through scarcity and financial pressure to leading from certainty, clarity, and detachment.\n\nAs a result of the identity recalibration, the business is on track to generate 25% more profit than the previous year while creating a stronger foundation for long-term growth. Frank is now positioning the company for a seven-figure exit, with continued support focused on ensuring the business reaches its desired valuation and outcome.",
  },
  {
    name: "JENNY",
    role: "Influencer & Music Artist",
    result: "Stabilised $100K+ / month",
    photo: "/clients/jenny.jpg",
    videoSrc: "/clients/jenny.mp4",
    videoAspect: "9 / 16",
    bio: "Jenny came to me as an established influencer ready to become a music artist, but her current identity could not hold both worlds at once.\n\nWe built a new identity capable of leading her business, sustaining her influence, and fully stepping into music. She no longer feels divided between who she was and who she is becoming. She now has the internal structure to carry all of it.",
  },
  {
    name: "MARCO",
    role: "Entrepreneur",
    result: "$10K \u2192 $30K / month",
    written:
      "When I first came to Hamza I was still showing up as an entrepreneur who was fearful and unaware of his own potential, not fully breaking free of myself, and honestly I didn't realize how much that was holding me back until we got into it.\n\nUnderneath that were money ceilings and self sabotage I'd never really addressed before. It wasn't instant. There was a real delay on my end, deals sitting stuck, me doing the internal work but not seeing anything move for a while. The hardest part was staying with the program when nothing in my external world had caught up yet\u2026 Then recently, things started to align and big deals were coming into my orbit. The deals that had been stuck started closing, and it happened right alongside me stepping into my own identity, out from behind that partner role on my business venture. It started to feel like perfect synchronicity, like the money and the shift were simultaneously working in tandem to unblock my past inner ceilings that impeded my growth.\n\nHamza really helped me unlock parts of myself I was scared to address. From money ceilings to self sabotage, I've been able to learn, grow, and accept myself through this. I'm very grateful for how it's allowed me to unlock new parts of myself that have set me free and welcomed abundance, opportunity, and wealth. I'm looking forward to what more the future brings from everything I've learned working with Hamza. I have the greatest respect for him and am looking forward to friends and colleagues I know will work with Hamza in the future.",
  },
];

function ProfileBlock({ profile, index }: { profile: Profile; index: number }) {
  const [expanded, setExpanded] = useState(false);
  // Stagger: alternate which side the portrait sits on.
  const flip = index % 2 === 1;
  const paras = profile.written?.split("\n\n") ?? [];
  const vertical =
    !!profile.videoAspect &&
    (() => {
      const [w, h] = profile.videoAspect!.split("/").map((s) => parseFloat(s));
      return h > w;
    })();

  return (
    <Reveal delay={index * 0.12}>
      <div
        className={`grid grid-cols-1 gap-10 lg:gap-16 items-start ${
          flip ? "lg:grid-cols-[1fr_320px]" : "lg:grid-cols-[320px_1fr]"
        }`}
      >
        {/* Portrait — fixed 320px column, identical on both sides */}
        <div className={flip ? "lg:order-2" : ""}>
          <div
            className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-[var(--color-ink-deep)] max-w-[260px] mx-auto lg:max-w-none lg:mx-0"
            style={{ border: "1px solid var(--color-hairline)" }}
          >
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.photo}
                alt={profile.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              // No photo on file — a monogram reads as a deliberate choice
              // where a "portrait slot" placeholder reads as unfinished.
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.14 0.02 70) 0%, oklch(0.07 0.010 70) 100%)",
                }}
              >
                <span
                  aria-hidden
                  className="accent text-[var(--color-gold)] leading-none text-[86px]"
                  style={{ textShadow: "0 0 40px oklch(0.78 0.165 78 / 0.45)" }}
                >
                  &ldquo;
                </span>
                <span className="font-display font-extrabold text-[var(--color-ivory)] text-[34px] leading-none">
                  {profile.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content — consistent rhythm: name, role, bio, then testimonial */}
        <div
          className={`text-center lg:text-left ${flip ? "lg:order-1" : ""}`}
        >
          <h3 className="font-display font-extrabold uppercase leading-[1.0] tracking-[-0.02em] text-[clamp(28px,3vw,44px)] text-[var(--color-ivory)]">
            {profile.name}
          </h3>
          <p className="eyebrow text-[var(--color-gold)] mt-3">{profile.role}</p>

          {profile.result && (
            <p
              className="mt-5 inline-flex items-center gap-2 rounded-[10px] px-4 py-2 font-display font-bold text-[clamp(15px,1.4vw,19px)] text-[var(--color-gold)]"
              style={{
                border: "1px solid var(--color-gold-deep)",
                background: "oklch(0.42 0.16 78 / 0.08)",
                textShadow: "0 0 26px oklch(0.78 0.165 78 / 0.35)",
              }}
            >
              {profile.result}
            </p>
          )}

          {profile.pullQuote && (
            <blockquote className="accent text-[var(--color-ivory)] text-[clamp(18px,1.6vw,22px)] leading-[1.35] mt-6 max-w-[46ch] mx-auto lg:mx-0">
              {profile.pullQuote}
            </blockquote>
          )}

          {/* Bio */}
          <div className="mt-6">
            {profile.bio ? (
              <div className="text-[var(--color-ivory-dim)] text-[16px] leading-[1.7] max-w-[58ch] mx-auto lg:mx-0 space-y-4">
                {profile.bio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : profile.written ? null : (
              <p className="text-[var(--color-ivory-faint)] italic text-[15px] leading-[1.65] max-w-[58ch] mx-auto lg:mx-0">
                Paragraph coming soon. Drop in 2 to 4 sentences about the
                operator, the work, and the named outcome.
              </p>
            )}
          </div>

          {/* Testimonial — written or filmed, anchored at the bottom */}
          <div className="mt-8">
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-4">
              Testimonial
            </p>

            {profile.written ? (
              <div className="max-w-[58ch] mx-auto lg:mx-0 text-left">
                <div
                  className="relative rounded-[10px] p-6 lg:p-7"
                  style={{
                    border: "1px solid var(--color-hairline)",
                    background: "oklch(0.08 0.008 70 / 0.6)",
                  }}
                >
                  <span
                    aria-hidden
                    className="accent text-[var(--color-gold)] leading-none text-[44px] block mb-1"
                  >
                    &ldquo;
                  </span>

                  <div className="text-[var(--color-ivory-dim)] text-[15px] lg:text-[16px] leading-[1.75] space-y-4">
                    {(expanded ? paras : paras.slice(0, 1)).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  {/* No fade overlay: the preview ends on a whole
                      paragraph, so there is nothing to feather. */}

                  {paras.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      aria-expanded={expanded}
                      className="group relative mt-5 inline-flex items-center gap-2 min-h-[44px] eyebrow text-[11px] text-[var(--color-gold)] hover:text-[var(--color-gold-soft)] transition-colors duration-200"
                    >
                      <span>{expanded ? "Show less" : "Read full testimonial"}</span>
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-300"
                        style={{
                          transform: expanded ? "rotate(180deg)" : "none",
                          transitionTimingFunction: "var(--ease-out-expo)",
                        }}
                      >
                        &darr;
                      </span>
                    </button>
                  )}

                  <p className="mt-4 eyebrow text-[11px] text-[var(--color-ivory-faint)]">
                    &mdash; {profile.name}
                  </p>
                </div>
              </div>
            ) : (
            <div
              className={`relative ${
                vertical ? "max-w-[230px]" : "max-w-[460px]"
              } mx-auto lg:mx-0`}
            >
              {/* Soft gold bloom behind the frame */}
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
                  videoSrc={profile.videoSrc}
                  youtubeId={profile.videoYoutubeId}
                  embedUrl={profile.videoEmbedUrl}
                  videoPoster={profile.videoPoster}
                  aspect={profile.videoAspect}
                  runtime="00:00"
                  progress={0.02}
                />
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Per-case-study apply CTA */}
      <div className="mt-8 lg:mt-10 flex justify-center">
        <CTAButton size="large">See If You Qualify</CTAButton>
      </div>
    </Reveal>
  );
}

/**
 * "The Roster" — identity-driven operators shown as staggered profile
 * blocks (portrait + name, role, testimonial video, and bio), alternating
 * which side the portrait sits on. Each case study closes with its own
 * apply CTA.
 */
export function ClientPortfolio() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1040px] px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-24">
          <Reveal delay={0.1}>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(32px,3.6vw,52px)] text-[var(--color-ivory)]">
              Identity-driven{" "}
              <span className="accent text-[var(--color-gold)]">operators.</span>
            </h2>
          </Reveal>
        </div>

        {/* Staggered profile blocks — each closes with its own apply CTA */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {profiles.map((p, i) => (
            <ProfileBlock key={p.name} profile={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
