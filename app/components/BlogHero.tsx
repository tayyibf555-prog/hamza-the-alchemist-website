"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";
import { subscribeEmail } from "../lib/subscribe";
import { trackMeta } from "../lib/meta";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * The blog page hero. A centered editorial statement followed by an inline
 * signup form. The headline is the conversion engine; the subhead removes
 * the mysticism objection; the form is the only interactive element.
 */
export function BlogHero() {
  const reduced = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("err");
      return;
    }
    try {
      await subscribeEmail(email);
      trackMeta("CompleteRegistration");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section
      className="relative pt-[200px] lg:pt-[260px] pb-24 lg:pb-32 overflow-hidden bloom-bg"
    >
      <SectionMarker index="I" label="Reality Architecture Training" />

      {/* Decorative oversized opening quote drifting behind the headline */}
      <span
        aria-hidden
        className="pointer-events-none absolute font-display font-black select-none text-[var(--color-gold)]"
        style={{
          left: "50%",
          top: "8%",
          transform: "translateX(-50%)",
          fontSize: "clamp(220px, 28vw, 480px)",
          lineHeight: 1,
          opacity: 0.04,
          letterSpacing: "-0.1em",
        }}
      >
        &#x16C;
      </span>

      {/* Top-right folio marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
        className="hidden md:flex absolute top-[100px] right-10 z-20 flex-col items-end gap-2"
      >
        <span className="accent text-[var(--color-gold)] text-[15px]">Folio · Blog</span>
        <span aria-hidden className="block w-10 h-px bg-[var(--color-hairline)]" />
        <span className="eyebrow text-[var(--color-ivory-faint)]">
          Identity · Frameworks
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: easeOutExpo }}
          className="font-display font-extrabold text-center leading-[1.05] sm:leading-[1.0] tracking-[-0.025em] text-[clamp(34px,6.5vw,110px)] text-[var(--color-ivory)]"
        >
          <span className="block whitespace-normal sm:whitespace-nowrap">
            Control your{" "}
            <span
              className="accent text-[var(--color-gold)]"
              style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
            >
              identity.
            </span>
          </span>
          <span className="block whitespace-normal sm:whitespace-nowrap">
            Control your{" "}
            <span
              className="accent text-[var(--color-gold)]"
              style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
            >
              reality.
            </span>
          </span>
        </motion.h1>

        <Reveal delay={0.3} as="p" className="mt-10 max-w-[58ch] mx-auto text-center text-[var(--color-ivory-dim)] text-[18px] leading-[1.65]">
          Weekly frameworks on identity, leverage, and subconscious mechanics — without
          the mysticism. One letter every Sunday.
        </Reveal>

        {/* Inline signup form */}
        <Reveal delay={0.45}>
          <form
            onSubmit={submit}
            className="mt-16 max-w-[640px] mx-auto flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="bh-first"
                  className="eyebrow text-[var(--color-ivory-faint)]"
                >
                  First name
                </label>
                <input
                  id="bh-first"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Operator"
                  className="bg-transparent text-[var(--color-ivory)] text-[20px] font-medium py-3 outline-none transition-colors duration-200"
                  style={{ borderBottom: "1px solid var(--color-hairline)" }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottom =
                      "1px solid var(--color-gold)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottom =
                      "1px solid var(--color-hairline)")
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="bh-email"
                  className="eyebrow text-[var(--color-ivory-faint)]"
                >
                  Email address
                </label>
                <input
                  id="bh-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@frequency.com"
                  className="bg-transparent text-[var(--color-ivory)] text-[20px] font-medium py-3 outline-none transition-colors duration-200"
                  style={{ borderBottom: "1px solid var(--color-hairline)" }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderBottom =
                      "1px solid var(--color-gold)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderBottom =
                      "1px solid var(--color-hairline)")
                  }
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={reduced ? undefined : { scale: 1.01 }}
              whileTap={reduced ? undefined : { scale: 0.99 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="group relative inline-flex items-center justify-center gap-3 h-[64px] eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden mt-4"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                boxShadow:
                  "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
              }}
            >
              <span className="relative z-10 font-semibold tracking-[0.2em] text-[14px]">
                {status === "ok" ? "Welcome, Operator" : "Enter The Inner Circle"}
              </span>
              <span
                aria-hidden
                className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                →
              </span>
            </motion.button>

            {status === "err" && (
              <p className="text-[14px] text-[var(--color-gold)] text-center">
                Need a valid email to send the next letter to.
              </p>
            )}

            <div className="mt-2 flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <span
                  className="block w-2 h-2 rounded-full bg-[var(--color-gold)]"
                  style={{ boxShadow: "0 0 8px oklch(0.78 0.165 78 / 0.7)" }}
                />
                <span className="eyebrow text-[var(--color-ivory-dim)]">
                  10,000+ Readers
                </span>
              </div>
              <span aria-hidden className="block w-px h-4 bg-[var(--color-hairline)]" />
              <span className="eyebrow text-[var(--color-ivory-faint)]">
                Sundays · 7am UTC
              </span>
              <span aria-hidden className="block w-px h-4 bg-[var(--color-hairline)]" />
              <span className="eyebrow text-[var(--color-ivory-faint)]">
                Unsubscribe anytime
              </span>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
