"use client";

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
};

const profiles: Profile[] = [
  {
    name: "JORDY MICHELS",
    role: "Day Trader",
    photo: "/clients/jordy-michels.png",
    videoSrc: "/clients/jordy-michels-testimonial.mp4",
    videoAspect: "9 / 16",
    bio: "Michiels Jordy joined the program looking to break through an internal ceiling, but what he discovered went far beyond external success. Through the process, he deepened his connection with God, uncovered a greater truth about himself, and found his true calling. By the end of the program, he had not only transformed his identity but created his own unique approach to identity work, stepping into the world as the Frequency Architect.",
  },
  {
    name: "NATHAN JONES",
    role: "Entrepreneur",
    photo: "/clients/nathan-jones.png",
    videoEmbedUrl:
      "https://www.loom.com/embed/bba3a4897e60430a9914b1c85504893b?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    videoPoster: "/clients/nathan-jones-poster.gif",
    videoAspect: "16 / 9",
    bio: "Nathan Jones came to me as a 9–5 worker who wanted to become a full-time trader. Through identity recalibration, we removed the subconscious patterns keeping him tied to his old reality and installed the identity of a consistently profitable trader. As his identity changed, his results followed. Ultimately growing into a trader generating $5,000–$10,000 per month.",
  },
  {
    name: "FRANK",
    role: "Business Owner",
    photo: "/clients/frank.jpg",
    videoSrc: "/clients/frank.mp4",
    videoAspect: "9 / 16",
    bio: "Entered the program as a business owner carrying significant subconscious limitations around money, growth, and receiving success. Through the extraction and removal of those subconscious blocks, Frank was able to shift from operating through scarcity and financial pressure to leading from certainty, clarity, and detachment.\n\nAs a result of the identity recalibration, the business is on track to generate 25% more profit than the previous year while creating a stronger foundation for long-term growth. Frank is now positioning the company for a seven-figure exit, with continued support focused on ensuring the business reaches its desired valuation and outcome.",
  },
];

function ProfileBlock({ profile, index }: { profile: Profile; index: number }) {
  // Stagger: alternate which side the portrait sits on.
  const flip = index % 2 === 1;
  const vertical =
    !!profile.videoAspect &&
    (() => {
      const [w, h] = profile.videoAspect!.split("/").map((s) => parseFloat(s));
      return h > w;
    })();

  return (
    <Reveal delay={index * 0.12}>
      <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 lg:gap-16 items-center">
        {/* Portrait */}
        <div className={flip ? "lg:order-2" : ""}>
          <div
            className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-[var(--color-ink-deep)]"
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
              <div
                className="absolute inset-0 flex items-end p-6"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.20 0.04 70) 0%, oklch(0.08 0.010 70) 100%)",
                }}
              >
                <span className="eyebrow text-[var(--color-ivory-faint)] text-[11px]">
                  Portrait slot
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={flip ? "lg:order-1" : ""}>
          <h3 className="font-display font-extrabold uppercase leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.4vw,52px)] text-[var(--color-ivory)]">
            {profile.name}
          </h3>
          <p className="eyebrow text-[var(--color-gold)] mt-3">{profile.role}</p>

          {profile.pullQuote && (
            <blockquote className="relative accent text-[var(--color-ivory)] text-[clamp(19px,1.7vw,24px)] leading-[1.3] mt-7 max-w-[40ch] pl-6">
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-px"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-gold) 0%, transparent 100%)",
                }}
              />
              {profile.pullQuote}
            </blockquote>
          )}

          {/* Testimonial video */}
          <div className="mt-8">
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-4">
              I · Testimonial
            </p>
            <div
              className={
                vertical ? "relative w-full max-w-[320px]" : "relative"
              }
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
          </div>

          {/* Bio */}
          <div className="mt-10">
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-4">
              II · The Work
            </p>
            {profile.bio ? (
              <div className="text-[var(--color-ivory-dim)] text-[16px] leading-[1.7] max-w-[56ch] space-y-4">
                {profile.bio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : (
              <p className="text-[var(--color-ivory-faint)] italic text-[15px] leading-[1.65] max-w-[56ch]">
                Paragraph coming soon. Drop in 2 to 4 sentences about the
                operator, the work, and the named outcome.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Per-case-study apply CTA */}
      <div className="mt-10 lg:mt-14 flex justify-center">
        <CTAButton size="large">Become an Alchemist</CTAButton>
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
    <section className="relative py-24 lg:py-36">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-24">
          <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-6">
            The Roster
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(32px,3.6vw,52px)] text-[var(--color-ivory)]">
              Identity-driven{" "}
              <span className="accent text-[var(--color-gold)]">operators.</span>
            </h2>
          </Reveal>
        </div>

        {/* Staggered profile blocks — each closes with its own apply CTA */}
        <div className="flex flex-col gap-24 lg:gap-36">
          {profiles.map((p, i) => (
            <ProfileBlock key={p.name} profile={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
