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
  },
  {
    name: "Operator Two",
    role: "Founder",
    // Drop assets in /public/clients and fill these in when ready.
  },
];

function isVertical(aspect?: string) {
  if (!aspect) return false;
  const [w, h] = aspect.split("/").map((s) => parseFloat(s.trim()));
  return Number.isFinite(w) && Number.isFinite(h) && h > w;
}

/**
 * One profile rendered as a self-contained card — identical visual
 * language to the ClientProfileModal: portrait flush on one side, padded
 * content (folio mark, name, role, pull quote, testimonial video, bio)
 * on the other. `flip` alternates the portrait side for the staggered row.
 */
function ProfileCard({ profile, index }: { profile: Profile; index: number }) {
  const flip = index % 2 === 1;
  const vertical = isVertical(profile.videoAspect);

  return (
    <Reveal delay={index * 0.12}>
      <article
        className="relative w-full rounded-[8px] overflow-hidden"
        style={{
          background: "oklch(0.07 0.008 70)",
          border: "1px solid var(--color-hairline)",
          boxShadow:
            "0 40px 80px -24px oklch(0.04 0.005 70 / 0.9), 0 0 0 1px oklch(0.78 0.165 78 / 0.08)",
        }}
      >
        <div
          className={`grid grid-cols-1 ${
            flip ? "md:grid-cols-[60%_40%]" : "md:grid-cols-[40%_60%]"
          }`}
        >
          {/* Portrait — full-bleed */}
          <div
            className={`relative aspect-[3/4] max-h-[60vh] md:max-h-none md:aspect-auto md:min-h-[600px] overflow-hidden bg-[var(--color-ink-deep)] ${
              flip ? "md:order-2" : "md:order-1"
            }`}
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

            {/* Vertical fade blending the portrait into the content column (desktop) */}
            <div
              aria-hidden
              className={`hidden md:block absolute inset-y-0 w-[18%] pointer-events-none ${
                flip ? "left-0" : "right-0"
              }`}
              style={{
                background: flip
                  ? "linear-gradient(270deg, transparent 0%, oklch(0.07 0.008 70 / 0.7) 100%)"
                  : "linear-gradient(90deg, transparent 0%, oklch(0.07 0.008 70 / 0.7) 100%)",
              }}
            />
          </div>

          {/* Content */}
          <div
            className={`relative px-7 md:px-12 lg:px-14 py-12 md:py-14 lg:py-16 ${
              flip ? "md:order-1" : "md:order-2"
            }`}
          >
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-8">
              Folio · Client Profile
            </p>

            <h3 className="font-display font-extrabold uppercase tracking-[-0.015em] leading-[1.0] text-[clamp(32px,3.6vw,52px)] text-[var(--color-ivory)]">
              {profile.name}
            </h3>
            <p className="eyebrow text-[var(--color-gold)] mt-4">
              {profile.role}
            </p>

            {profile.pullQuote && (
              <blockquote className="relative accent text-[var(--color-ivory)] text-[clamp(20px,1.8vw,26px)] leading-[1.3] mt-10 max-w-[40ch] pl-6">
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
            <div className="mt-12">
              <p className="eyebrow text-[var(--color-ivory-faint)] mb-4">
                I · Testimonial
              </p>
              <div
                className={
                  vertical ? "relative w-full max-w-[320px]" : "relative"
                }
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-[-10%]"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.35) 0%, oklch(0.30 0.10 75 / 0.15) 35%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
                <div className="relative">
                  <VideoFrame
                    videoSrc={profile.videoSrc}
                    youtubeId={profile.videoYoutubeId}
                    aspect={profile.videoAspect}
                    runtime="00:00"
                    progress={0.02}
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mt-12">
              <p className="eyebrow text-[var(--color-ivory-faint)] mb-4">
                II · The Work
              </p>
              {profile.bio ? (
                <p className="text-[var(--color-ivory-dim)] text-[16px] leading-[1.7] max-w-[56ch]">
                  {profile.bio}
                </p>
              ) : (
                <p className="text-[var(--color-ivory-faint)] italic text-[15px] leading-[1.65] max-w-[56ch]">
                  Paragraph coming soon. Drop in 2 to 4 sentences about the
                  operator, the work, and the named outcome.
                </p>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * "The Roster" — identity-driven operators shown as staggered profile
 * cards (each one styled like the client-profile modal: portrait + folio
 * mark, name, role, testimonial video, bio). Portrait side alternates per
 * card. A single "Become an Alchemist" CTA closes the section.
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

        {/* Staggered profile cards */}
        <div className="flex flex-col gap-16 lg:gap-24">
          {profiles.map((p, i) => (
            <ProfileCard key={p.name} profile={p} index={i} />
          ))}
        </div>

        {/* Closing CTA */}
        <Reveal delay={0.15}>
          <div className="mt-20 lg:mt-28 flex justify-center">
            <CTAButton size="large">Become an Alchemist</CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
