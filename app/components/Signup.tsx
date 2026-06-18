"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { subscribeEmail } from "../lib/subscribe";

/**
 * "Reality Architecture Training" signup block.
 * Inline form, hairline-only treatment — no card, no panel.
 * Lives between the Final CTA and the Footer.
 */
export function Signup() {
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
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  };

  return (
    <section
      className="relative py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left rail — credential */}
        <div className="lg:col-span-4">
          <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-6">
            Reality Architecture Training
          </Reveal>

          <Reveal>
            <h3 className="font-display font-extrabold leading-[1.02] tracking-[-0.02em] text-[clamp(32px,3.6vw,52px)] text-[var(--color-ivory)]">
              Weekly identity
              <br />
              <span className="text-[var(--color-gold)]">frameworks.</span>
            </h3>
          </Reveal>

          <Reveal delay={0.15} as="p" className="mt-6 text-[var(--color-ivory-dim)] text-[16px] leading-[1.6] max-w-[38ch]">
            One letter every Sunday. Identity, leverage, and subconscious mechanics
            for operators — without the mysticism.
          </Reveal>

          <Reveal delay={0.25}>
            <div
              className="mt-10 pt-6 flex items-center gap-6"
              style={{ borderTop: "1px solid var(--color-hairline)" }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="block w-2 h-2 rounded-full bg-[var(--color-gold)]"
                  style={{ boxShadow: "0 0 8px oklch(0.78 0.165 78 / 0.7)" }}
                />
                <span className="eyebrow text-[var(--color-ivory-dim)]">
                  10,000+ operators
                </span>
              </div>
              <span aria-hidden className="block w-px h-5 bg-[var(--color-hairline)]" />
              <span className="eyebrow text-[var(--color-ivory-faint)]">
                Sundays · 7am UTC
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right — form */}
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.1}>
            <form onSubmit={submit} className="flex flex-col gap-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="su-first"
                    className="eyebrow text-[var(--color-ivory-faint)]"
                  >
                    First name
                  </label>
                  <input
                    id="su-first"
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
                    htmlFor="su-email"
                    className="eyebrow text-[var(--color-ivory-faint)]"
                  >
                    Email address
                  </label>
                  <input
                    id="su-email"
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

              <div className="flex items-center justify-between gap-6 mt-4 flex-wrap">
                <p className="eyebrow text-[var(--color-ivory-faint)] max-w-[40ch]">
                  No promotions. No noise. Unsubscribe at any time.
                </p>

                <motion.button
                  type="submit"
                  whileHover={reduced ? undefined : { scale: 1.02 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative inline-flex items-center gap-3 h-[60px] px-9 eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                    boxShadow:
                      "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 12px 32px -12px oklch(0.78 0.165 78 / 0.5)",
                  }}
                >
                  <span className="relative z-10 font-semibold tracking-[0.18em]">
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
              </div>

              {status === "err" && (
                <p className="text-[14px] text-[var(--color-gold)]">
                  Need a valid email to send the next letter to.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
