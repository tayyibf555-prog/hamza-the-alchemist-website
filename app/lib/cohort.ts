/**
 * Everything the cohort page says, in one place.
 *
 * The commercial facts — price, start date, seat count — are deliberately
 * null until someone sets them. Every component degrades to a neutral state
 * when they are ("By application", no date line, no scarcity counter) rather
 * than rendering a placeholder number a visitor would read as real.
 */

/** Cohort number, shown in the banner and hero. */
export const COHORT_NUMBER = 1;

/** Currency symbol used by every price on the page. */
export const CURRENCY = "$";

/**
 * Cohort price. Set to a number to show it, e.g. 1997.
 * While null the cohort card reads "By application".
 */
export const PRICE: number | null = null;

/**
 * Private 1-on-1 price. Unlike the cohort this is a straight purchase —
 * no audit, no application. Paid up front and booked after.
 */
export const PRIVATE_PRICE: number | null = 997;

/**
 * Direct checkout link for the private option.
 *
 * While null the button falls back to the normal apply flow, so it always
 * goes somewhere real rather than to a dead href — swap in the payment link
 * and the card becomes a straight buy.
 */
export const PRIVATE_CHECKOUT_URL: string | null = null;

/** Optional strike-through price for a launch offer. */
export const PRICE_WAS: number | null = null;

/**
 * Start date as an ISO string, e.g. "2026-10-06".
 * While null every "starts …" line is hidden.
 */
export const START_DATE: string | null = null;

/** Total seats. While null the scarcity line is hidden entirely. */
export const SEATS: number | null = null;

/** Seats already taken. Only used when SEATS is set. */
export const SEATS_TAKEN: number | null = null;

/** Weekly live call — day and time, e.g. "Tuesdays · 7pm UK". */
export const CALL_SLOT: string | null = null;

/** How many weeks the cohort runs. */
export const WEEKS = 6;

export const formatPrice = (v: number) =>
  `${CURRENCY}${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

export const formatStart = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });

/* ------------------------------------------------------------------ */

export type Week = {
  n: number;
  /** The live call's subject. */
  call: string;
  /** What the course content covers between calls. */
  work: string;
  /** One line on what changes by the end of the week. */
  outcome: string;
};

/**
 * Draft curriculum, written from the language already on the site — the
 * ceiling, subconscious patterning, money ceilings, self-sabotage. Hamza
 * should rewrite these in his own words before launch.
 */
export const WEEKS_PLAN: Week[] = [
  {
    n: 1,
    call: "The Ceiling Audit",
    work: "Map where the number actually stops, and what you do every time it gets close.",
    outcome: "You can name the ceiling instead of working around it.",
  },
  {
    n: 2,
    call: "The Identity Underneath The Number",
    work: "Trace the self that was calibrated for a smaller business, and where it was set.",
    outcome: "The pattern stops looking like circumstance.",
  },
  {
    n: 3,
    call: "Money Ceilings",
    work: "The specific limits on what you will let yourself receive, hold and be seen holding.",
    outcome: "The revenue block is separated from the strategy question.",
  },
  {
    n: 4,
    call: "Self-Sabotage At The Threshold",
    work: "Why the level breaks ninety days in, and what is actually protecting you.",
    outcome: "You stop treating the collapse as a discipline problem.",
  },
  {
    n: 5,
    call: "Installing The New Structure",
    work: "Recalibrating the identity to hold the number you say you want.",
    outcome: "The new level stops feeling borrowed.",
  },
  {
    n: 6,
    call: "Holding It",
    work: "Making the shift survive contact with a real week, and what to do when it is tested.",
    outcome: "You leave with the structure, not just the insight.",
  },
];

export const INCLUDES: { title: string; detail: string }[] = [
  {
    title: `${WEEKS} live calls`,
    detail:
      "One a week with Hamza, working on your business rather than lecturing at it. Bring the actual problem.",
  },
  {
    title: "The course content",
    detail:
      "Released week by week so you do the work between calls and arrive with something to move, not notes to review.",
  },
  {
    title: "Recordings of every call",
    detail: "Yours to keep. Miss one and nothing is lost.",
  },
  {
    title: "The cohort room",
    detail:
      "A private room with the other operators in your cohort for the duration.",
  },
  {
    title: "Direct access between calls",
    detail:
      "When something breaks mid-week you do not wait seven days to ask about it.",
  },
];

export const FIT_FOR: string[] = [
  "You run a real business with real revenue, and the number has stopped moving.",
  "You have already tried the strategy answer — more leads, more hours, another hire — and it did not hold.",
  "You can attend a call a week and do the work between them.",
  "You are willing to look at the part of this that is you.",
];

export const FIT_NOT_FOR: string[] = [
  "You are looking for tactics, funnels or a marketing fix.",
  "You want someone else to do it for you.",
  "You are pre-revenue and need customers before you need this.",
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "How much time does it take?",
    a: `One live call a week for ${WEEKS} weeks, plus the course content between them. Most people spend two to three hours a week in total.`,
  },
  {
    q: "What if I miss a call?",
    a: "Every call is recorded and posted the same day, and you can bring the question to the next one. Nobody falls behind for missing a week.",
  },
  {
    q: "Is this coaching or a course?",
    a: "Both, deliberately. The course content carries the teaching so the live calls are not spent lecturing — they are spent on your actual situation.",
  },
  {
    q: "How is this different from the private work?",
    a: "The private work is one-to-one and paced entirely to you, and you can start it the moment you pay. The cohort covers the same material in a group, on a fixed six-week schedule, with less individual time.",
  },
  {
    q: "Do I have to apply?",
    a: "For the private work, no — you pay and we book you in. The cohort has limited seats, so that one goes through the form.",
  },
  {
    q: "What if it does not work for me?",
    a: "Come to the calls and do the work. If you have done both and nothing has moved, speak to us — we are not interested in holding money from someone we did not help.",
  },
];
