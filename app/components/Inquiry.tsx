"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type OperatorType =
  | "Founder"
  | "CEO"
  | "Day Trader"
  | "Creator"
  | "Music Artist"
  | "Other";

type FormState = {
  name: string;
  operator: OperatorType | "";
  outcome: string;
  availability: string;
  timezone: string;
};

const STEPS = ["Name", "Operator", "Outcome", "Availability"] as const;

const operatorTypes: OperatorType[] = [
  "Founder",
  "CEO",
  "Day Trader",
  "Creator",
  "Music Artist",
  "Other",
];

/**
 * Folio VIII · Inquiry — the on-page application form.
 *
 * Four questions revealed one at a time. Progress dots above.
 * Each step validates before advancing. Submit lands a quiet
 * confirmation. Capacity line below.
 *
 * The form IS the close. No popup, no modal, no button-then-form chain.
 */
export function Inquiry() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FormState>({
    name: "",
    operator: "",
    outcome: "",
    availability: "",
    timezone: "",
  });

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Focus the active input each step for keyboard flow
  useEffect(() => {
    if (submitted) return;
    const id = setTimeout(() => inputRef.current?.focus(), 350);
    return () => clearTimeout(id);
  }, [step, submitted]);

  const advance = () => {
    setError(null);
    if (step === 0 && !data.name.trim()) {
      setError("A name to call you by.");
      return;
    }
    if (step === 1 && !data.operator) {
      setError("Pick the closest match.");
      return;
    }
    if (step === 2 && data.outcome.trim().length < 12) {
      setError("Give it a sentence at least.");
      return;
    }
    if (step === STEPS.length - 1) {
      if (!data.availability) {
        setError("Yes, no, or pick a window.");
        return;
      }
      setSubmitted(true);
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      advance();
    }
  };

  return (
    <section
      id="inquiry"
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <SectionMarker index="VI" label="Inquiry" />

      {/* Decorative faint trident behind the form */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 1.8, ease: easeOutExpo }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        style={{
          fontSize: "clamp(360px, 50vw, 720px)",
          lineHeight: 1,
        }}
      >
        <span className="accent text-[var(--color-gold)]">VIII</span>
      </motion.div>

      <div className="relative mx-auto max-w-[920px] px-6 lg:px-10">
        {/* Section heading */}
        <Reveal as="p" className="eyebrow text-[var(--color-gold)] text-center mb-8">
          Inquiry
        </Reveal>

        <Reveal>
          <h2 className="font-display font-extrabold text-balance text-center leading-[0.98] tracking-[-0.025em] text-[clamp(48px,7vw,120px)] text-[var(--color-ivory)]">
            Submit an{" "}
            <span className="accent text-[var(--color-gold)]">application.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} as="p" className="mt-8 max-w-[52ch] mx-auto text-center text-[var(--color-ivory-dim)] text-[17px] leading-[1.65]">
          Four questions, ninety seconds. Reviewed personally. If the work is
          a match, the conversation continues privately.
        </Reveal>

        {/* Form / submitted state */}
        <div className="mt-16 lg:mt-20">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: easeOutExpo }}
              >
                {/* Progress dots */}
                <div className="flex items-center justify-center gap-3 mb-12">
                  {STEPS.map((label, i) => (
                    <div key={label} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => i < step && setStep(i)}
                        disabled={i > step}
                        className="group flex flex-col items-center gap-2"
                        aria-label={`Step ${i + 1}: ${label}`}
                      >
                        <span
                          className="block w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            background:
                              i === step
                                ? "var(--color-gold)"
                                : i < step
                                ? "var(--color-gold-deep)"
                                : "var(--color-hairline)",
                            boxShadow:
                              i === step
                                ? "0 0 12px oklch(0.78 0.165 78 / 0.7)"
                                : "none",
                            transitionTimingFunction: "var(--ease-out-expo)",
                          }}
                        />
                        <span
                          className="eyebrow text-[10px] tracking-[0.16em] transition-colors"
                          style={{
                            color:
                              i === step
                                ? "var(--color-gold)"
                                : "var(--color-ivory-faint)",
                          }}
                        >
                          {label}
                        </span>
                      </button>
                      {i < STEPS.length - 1 && (
                        <span
                          aria-hidden
                          className="block w-8 h-px"
                          style={{ background: "var(--color-hairline)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Active step */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: reduced ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                    className="min-h-[180px]"
                  >
                    {step === 0 && (
                      <StepField
                        label="01 · Name"
                        helper="What we should call you in the next message."
                      >
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                          onKeyDown={onKey}
                          placeholder="Your name"
                          className="w-full bg-transparent text-[var(--color-ivory)] text-[28px] md:text-[36px] font-medium py-4 outline-none transition-colors duration-200 placeholder:text-[var(--color-ivory-faint)] placeholder:font-normal"
                          style={{
                            borderBottom: "1px solid var(--color-hairline)",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderBottom =
                              "1px solid var(--color-gold)")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderBottom =
                              "1px solid var(--color-hairline)")
                          }
                        />
                      </StepField>
                    )}

                    {step === 1 && (
                      <StepField
                        label="02 · Operator"
                        helper="Which best describes the work you currently do."
                      >
                        <div className="flex flex-wrap gap-3 pt-2">
                          {operatorTypes.map((opt) => (
                            <button
                              type="button"
                              key={opt}
                              onClick={() =>
                                setData({ ...data, operator: opt })
                              }
                              className={`h-[52px] px-6 rounded-[3px] eyebrow transition-all duration-300 ${
                                data.operator === opt
                                  ? "text-[var(--color-ink-deep)]"
                                  : "text-[var(--color-ivory)] hover:text-[var(--color-gold)]"
                              }`}
                              style={{
                                background:
                                  data.operator === opt
                                    ? "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)"
                                    : "transparent",
                                border:
                                  data.operator === opt
                                    ? "1px solid var(--color-gold-deep)"
                                    : "1px solid var(--color-hairline)",
                                boxShadow:
                                  data.operator === opt
                                    ? "0 0 24px -6px oklch(0.78 0.165 78 / 0.5)"
                                    : "none",
                                transitionTimingFunction:
                                  "var(--ease-out-expo)",
                              }}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </StepField>
                    )}

                    {step === 2 && (
                      <StepField
                        label="03 · Outcome"
                        helper="Be specific. What does the next twelve months actually look like if this works."
                      >
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          value={data.outcome}
                          onChange={(e) =>
                            setData({ ...data, outcome: e.target.value })
                          }
                          onKeyDown={(e) => {
                            // Allow shift+enter for newline, plain enter advances
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              advance();
                            }
                          }}
                          placeholder="The outcome you're here for"
                          rows={3}
                          className="w-full bg-transparent text-[var(--color-ivory)] text-[20px] md:text-[22px] leading-[1.5] font-medium py-3 outline-none transition-colors duration-200 placeholder:text-[var(--color-ivory-faint)] placeholder:font-normal resize-none"
                          style={{
                            borderBottom: "1px solid var(--color-hairline)",
                          }}
                          onFocus={(e) =>
                            (e.currentTarget.style.borderBottom =
                              "1px solid var(--color-gold)")
                          }
                          onBlur={(e) =>
                            (e.currentTarget.style.borderBottom =
                              "1px solid var(--color-hairline)")
                          }
                        />
                        <div className="mt-3 flex items-center justify-between text-[12px]">
                          <span className="eyebrow text-[var(--color-ivory-faint)]">
                            Shift + Enter for a new line
                          </span>
                          <span
                            className="tabular-nums text-[var(--color-ivory-faint)]"
                            aria-live="polite"
                          >
                            {data.outcome.length} / 600
                          </span>
                        </div>
                      </StepField>
                    )}

                    {step === 3 && (
                      <StepField
                        label="04 · Availability"
                        helper="If we're a match, when can we talk."
                      >
                        <div className="flex flex-col gap-6">
                          <div className="flex flex-wrap gap-3">
                            {[
                              "This week",
                              "Next week",
                              "Within the month",
                              "Open",
                            ].map((opt) => (
                              <button
                                type="button"
                                key={opt}
                                onClick={() =>
                                  setData({ ...data, availability: opt })
                                }
                                className={`h-[52px] px-6 rounded-[3px] eyebrow transition-all duration-300 ${
                                  data.availability === opt
                                    ? "text-[var(--color-ink-deep)]"
                                    : "text-[var(--color-ivory)] hover:text-[var(--color-gold)]"
                                }`}
                                style={{
                                  background:
                                    data.availability === opt
                                      ? "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)"
                                      : "transparent",
                                  border:
                                    data.availability === opt
                                      ? "1px solid var(--color-gold-deep)"
                                      : "1px solid var(--color-hairline)",
                                  boxShadow:
                                    data.availability === opt
                                      ? "0 0 24px -6px oklch(0.78 0.165 78 / 0.5)"
                                      : "none",
                                  transitionTimingFunction:
                                    "var(--ease-out-expo)",
                                }}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          <div>
                            <label
                              htmlFor="tz"
                              className="eyebrow text-[var(--color-ivory-faint)]"
                            >
                              Timezone (optional)
                            </label>
                            <input
                              id="tz"
                              type="text"
                              value={data.timezone}
                              onChange={(e) =>
                                setData({ ...data, timezone: e.target.value })
                              }
                              onKeyDown={onKey}
                              placeholder="e.g. GMT, EST, +4 GST"
                              className="mt-2 w-full md:w-[300px] bg-transparent text-[var(--color-ivory)] text-[17px] font-medium py-2 outline-none transition-colors duration-200 placeholder:text-[var(--color-ivory-faint)] placeholder:font-normal"
                              style={{
                                borderBottom: "1px solid var(--color-hairline)",
                              }}
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
                      </StepField>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 text-[14px] text-[var(--color-gold)]"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Nav row */}
                <div className="mt-12 flex items-center justify-between gap-6">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="eyebrow text-[var(--color-ivory-faint)] hover:text-[var(--color-ivory)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 inline-flex items-center gap-3"
                  >
                    <span aria-hidden>←</span>
                    Back
                  </button>

                  <motion.button
                    type="button"
                    onClick={advance}
                    whileHover={reduced ? undefined : { scale: 1.01 }}
                    whileTap={reduced ? undefined : { scale: 0.99 }}
                    transition={{ duration: 0.25, ease: easeOutExpo }}
                    className="group relative inline-flex items-center gap-3 h-[60px] px-10 eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                      boxShadow:
                        "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
                    }}
                  >
                    <span className="relative z-10 font-semibold tracking-[0.18em] text-[13px]">
                      {step === STEPS.length - 1
                        ? "Submit Application"
                        : "Continue"}
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
              </motion.div>
            ) : (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: reduced ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: easeOutExpo }}
                className="text-center py-16"
              >
                {/* A wax-seal style mark */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 1.1, delay: 0.2, ease: easeOutExpo }}
                  className="mx-auto mb-12 w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.62 0.14 70) 0%, oklch(0.42 0.10 72) 100%)",
                    boxShadow:
                      "0 0 0 1px oklch(0.78 0.165 78 / 0.5), 0 0 32px -4px oklch(0.78 0.165 78 / 0.5)",
                  }}
                >
                  <svg viewBox="0 0 32 32" className="w-9 h-9 text-[var(--color-ink-deep)]" fill="none" aria-hidden>
                    <path d="M7 17 L13 22 L25 10" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>

                <h3 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(36px,4.6vw,68px)] text-[var(--color-ivory)]">
                  Application received,{" "}
                  <span className="accent text-[var(--color-gold)]">
                    {data.name || "operator"}.
                  </span>
                </h3>
                <p className="mt-8 max-w-[44ch] mx-auto text-[var(--color-ivory-dim)] text-[17px] leading-[1.65]">
                  Reviewed within seventy-two hours. If the work is a match,
                  you&apos;ll hear directly. If it isn&apos;t, you&apos;ll hear
                  that too.
                </p>
                <p className="mt-12 eyebrow text-[var(--color-ivory-faint)]">
                  In the meantime, the reading room is open below.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Capacity line at the very bottom */}
        {!submitted && (
          <Reveal delay={0.5}>
            <div
              className="mt-20 pt-10"
              style={{ borderTop: "1px solid var(--color-hairline)" }}
            >
              <p className="text-[var(--color-ivory-dim)] text-[15px] leading-[1.65] max-w-[58ch]">
                I read every application myself. Most get a thoughtful no.
                The work I do is too specific for everyone and that&apos;s
                deliberate.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function StepField({
  label,
  helper,
  children,
}: {
  label: string;
  helper: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline gap-4 mb-3">
        <span className="accent text-[var(--color-gold)] text-[18px] leading-none">
          {label}
        </span>
      </div>
      <p className="text-[var(--color-ivory-dim)] text-[15px] leading-[1.55] mb-7 max-w-[52ch]">
        {helper}
      </p>
      {children}
    </div>
  );
}
