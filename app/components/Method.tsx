"use client";

import { Reveal } from "./Reveal";
import { TYPEFORM_URL, SKOOL_URL } from "../lib/links";

const mayQualify = [
  "Generating minimum $30K–50K+/month",
  "Already successful, but internally capped",
  "You know your capacity is higher than your current results",
  "Growth feels heavier than it should",
  "Ready for identity-level recalibration",
];

const willNotQualify = [
  "You are below $30K/month",
  "You want step-by-step tactics",
  "You are looking for motivation",
  "You believe working harder will solve this",
  "You are unwilling to invest at a premium level",
];

const tried = [
  "New offers",
  "New funnels",
  "Better positioning",
  "New marketing strategies",
  "More content",
  "Hiring people",
  "Hiring coaches",
];

const regulatorDetermines = [
  "What level of success feels normal",
  "How much expansion you tolerate",
  "Where your revenue stabilizes",
];

const afterShift = [
  "Decisions become cleaner",
  "Risk tolerance expands",
  "Revenue stabilizes at higher levels",
  "Growth stops feeling forced",
];

const onlyApplyIf = [
  "You are earning minimum $30K–50K+/month",
  "You feel internally capped despite success",
  "You know strategy isn’t the real issue",
  "You want expansion without burnout",
  "You are ready to invest at a premium level",
];

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0"
    >
      <path
        d="M4 12.5 L9.5 18 L20 6"
        stroke="var(--color-gold)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cross() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-1 shrink-0"
    >
      <path
        d="M5 5 L19 19 M19 5 L5 19"
        stroke="var(--color-ivory-faint)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Section heading: gold eyebrow over a Fraunces headline. */
function Heading({
  eyebrow,
  children,
  center = true,
}: {
  eyebrow: string;
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-6">
        {eyebrow}
      </Reveal>
      <Reveal>
        <h2 className="font-display font-extrabold text-balance leading-[1.05] tracking-[-0.02em] text-[clamp(30px,4vw,58px)] text-[var(--color-ivory)]">
          {children}
        </h2>
      </Reveal>
    </div>
  );
}

export function Method() {
  return (
    <div id="method">
      {/* ── Qualification ─────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <div className="mx-auto max-w-[1040px] px-6 lg:px-10">
          <Reveal as="p" className="eyebrow text-[var(--color-gold)] text-center mb-12 lg:mb-16">
            Read Carefully Before Applying
          </Reveal>

          <div
            className="grid grid-cols-1 md:grid-cols-2 rounded-[8px] overflow-hidden"
            style={{
              border: "1px solid var(--color-hairline)",
              background: "oklch(0.07 0.008 70)",
            }}
          >
            {/* May qualify */}
            <Reveal className="p-8 lg:p-12">
              <p className="font-display font-bold text-[clamp(20px,2vw,26px)] text-[var(--color-ivory)] mb-8">
                You May Qualify If
              </p>
              <ul className="flex flex-col gap-5">
                {mayQualify.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--color-ivory-dim)] text-[16px] leading-[1.5]">
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Will not qualify */}
            <Reveal
              delay={0.1}
              className="p-8 lg:p-12 border-t md:border-t-0 md:border-l border-[var(--color-hairline)]"
            >
              <p className="font-display font-bold text-[clamp(20px,2vw,26px)] text-[var(--color-ivory-faint)] mb-8">
                You Will Not Qualify If
              </p>
              <ul className="flex flex-col gap-5">
                {willNotQualify.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[var(--color-ivory-faint)] text-[16px] leading-[1.5]">
                    <Cross />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── The Problem ───────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <div className="mx-auto max-w-[880px] px-6 lg:px-10">
          <Heading eyebrow="The Problem">
            You&rsquo;re Not Failing. You&rsquo;re Being{" "}
            <span className="accent text-[var(--color-gold)]">Regulated.</span>
          </Heading>

          <Reveal delay={0.15} as="p" className="mt-12 text-center text-[var(--color-ivory-dim)] text-[18px] leading-[1.7] max-w-[60ch] mx-auto">
            There is one thing standing between you and the level of success you
            know you should already be operating at.
          </Reveal>

          {/* Not effort / etc. stacked emphasis */}
          <Reveal delay={0.2}>
            <div className="mt-12 flex flex-col items-center gap-2 font-display font-bold text-[clamp(22px,2.4vw,34px)] leading-[1.25]">
              <span className="text-[var(--color-ivory-faint)]">Not effort.</span>
              <span className="text-[var(--color-ivory-faint)]">Not intelligence.</span>
              <span className="text-[var(--color-ivory-faint)]">Not discipline.</span>
              <span className="text-[var(--color-ivory-faint)]">Not strategy.</span>
              <span className="accent text-[var(--color-gold)] mt-2">
                A subconscious ceiling.
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.25} as="p" className="mt-14 text-center text-[var(--color-ivory-dim)] text-[16px] leading-[1.65]">
            An internal regulator that determines:
          </Reveal>
          <Reveal delay={0.3}>
            <ul className="mt-6 flex flex-col items-center gap-3">
              {regulatorDetermines.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--color-ivory)] text-[17px]">
                  <span aria-hidden className="block w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.35} as="p" className="mt-14 text-center text-[var(--color-ivory-dim)] text-[18px] leading-[1.8] max-w-[52ch] mx-auto">
            You execute. You produce. You win. But deep down you know something
            uncomfortable:
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-8 text-center font-display font-extrabold text-[clamp(26px,3vw,44px)] leading-[1.15] text-[var(--color-ivory)]">
              You should be further by now.
              <br />
              <span className="accent text-[var(--color-gold)]">
                Not slightly further. Years further.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Why nothing worked ────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <div className="mx-auto max-w-[880px] px-6 lg:px-10">
          <Heading eyebrow="Why Nothing You&rsquo;ve Tried Fixed It">
            You Can&rsquo;t Outwork a{" "}
            <span className="accent text-[var(--color-gold)]">
              Subconscious Ceiling.
            </span>
          </Heading>

          <Reveal delay={0.15} as="p" className="mt-12 text-center text-[var(--color-ivory-dim)] text-[16px]">
            You&rsquo;ve tried:
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-3 gap-y-3 max-w-[640px] mx-auto">
              {tried.map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 rounded-full text-[14px] text-[var(--color-ivory-dim)]"
                  style={{ border: "1px solid var(--color-hairline)" }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3} as="p" className="mt-14 text-center text-[var(--color-ivory-dim)] text-[18px] leading-[1.8] max-w-[56ch] mx-auto">
            None of those were wrong. They just never reached the real cause.
            Revenue does not expand to the level of your strategy. It expands to
            the level your nervous system feels safe sustaining.
          </Reveal>
          <Reveal delay={0.35} as="p" className="mt-6 text-center text-[var(--color-ivory)] text-[18px] leading-[1.7] max-w-[56ch] mx-auto">
            If that calibration hasn&rsquo;t changed, your results will keep
            repeating. Different tactics. Same ceiling.
          </Reveal>
        </div>
      </section>

      {/* ── What this work is ─────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <div className="mx-auto max-w-[880px] px-6 lg:px-10">
          <Heading eyebrow="What This Work Is">
            Private Identity{" "}
            <span className="accent text-[var(--color-gold)]">Recalibration.</span>
          </Heading>

          <Reveal delay={0.15} as="p" className="mt-12 text-center text-[var(--color-ivory)] text-[20px] leading-[1.6] max-w-[44ch] mx-auto">
            I locate the internal block you cannot see. And remove it.
          </Reveal>
          <Reveal delay={0.2} as="p" className="mt-6 text-center text-[var(--color-ivory-dim)] text-[16px] leading-[1.7] max-w-[52ch] mx-auto">
            Not through motivation. Not through mindset tricks. Not through
            surface strategy. Through subconscious correction and identity
            restructuring.
          </Reveal>

          <Reveal delay={0.3} as="p" className="mt-14 text-center text-[var(--color-ivory-dim)] text-[16px]">
            When the internal regulator shifts:
          </Reveal>
          <Reveal delay={0.35}>
            <ul className="mt-6 flex flex-col items-center gap-3">
              {afterShift.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[var(--color-ivory)] text-[17px]">
                  <span aria-hidden className="block w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="mt-12 text-center font-display font-extrabold text-[clamp(24px,2.8vw,40px)] leading-[1.2] text-[var(--color-ivory)]">
              You stop fighting yourself.
            </p>
          </Reveal>
          <Reveal delay={0.45} as="p" className="mt-5 text-center text-[var(--color-ivory-dim)] text-[17px] leading-[1.7] max-w-[50ch] mx-auto">
            You operate as the version of you who was always capable of more.
          </Reveal>
        </div>
      </section>

      {/* ── Only apply if + apply CTA ─────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <div className="mx-auto max-w-[720px] px-6 lg:px-10 text-center">
          <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-10">
            Only Apply If
          </Reveal>

          <Reveal>
            <ul className="flex flex-col gap-5 text-left max-w-[520px] mx-auto">
              {onlyApplyIf.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[var(--color-ivory)] text-[17px] leading-[1.5]">
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} as="p" className="mt-12 text-[var(--color-ivory-dim)] text-[16px] leading-[1.6]">
            This is private work. Not mass-market coaching.
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <a
                href={TYPEFORM_URL}
                className="group relative inline-flex items-center gap-3 h-[64px] px-10 eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                  boxShadow:
                    "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
                }}
              >
                <span className="relative z-10 font-semibold tracking-[0.2em] text-[14px]">
                  Apply For The Transmutation
                </span>
                <span
                  aria-hidden
                  className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Not qualified yet → community ─────────────────────────── */}
      <section
        className="relative py-20 lg:py-28"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <div className="mx-auto max-w-[760px] px-6 lg:px-10 text-center">
          <Reveal as="p" className="eyebrow text-[var(--color-ivory-faint)] mb-6">
            Not Qualified For Private Access Yet?
          </Reveal>
          <Reveal>
            <h2 className="font-display font-extrabold text-balance leading-[1.08] tracking-[-0.02em] text-[clamp(28px,3.4vw,46px)] text-[var(--color-ivory)]">
              Start where many future clients{" "}
              <span className="accent text-[var(--color-gold)]">begin.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} as="p" className="mt-8 text-[var(--color-ivory-dim)] text-[17px] leading-[1.7] max-w-[58ch] mx-auto">
            The Transmutation is reserved for operators already producing at a
            high level. Inside the 21st Century Alchemist&trade; you&rsquo;ll
            develop the identity, internal structure, and subconscious
            calibration required to eventually qualify for private work.
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <a
                href={SKOOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 h-[60px] px-9 eyebrow rounded-[3px] text-[var(--color-ivory)] overflow-hidden transition-colors duration-200 hover:text-[var(--color-gold)]"
                style={{ border: "1px solid var(--color-gold-deep)" }}
              >
                <span className="relative z-10 font-semibold tracking-[0.2em] text-[13px]">
                  Join The Community
                </span>
                <span
                  aria-hidden
                  className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
