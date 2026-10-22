/**
 * Everything the course page says, in one place.
 *
 * Copy is Hamza's brief (WhatsApp, 8–9 Oct). Entries marked `pending` are
 * slots whose text was cut off in the brief — they render as a visibly
 * unfinished box so they cannot ship by accident unnoticed.
 *
 * Commercial facts stay null until set. Every component degrades to a
 * neutral state rather than rendering a number a visitor would read as real.
 */

export const COURSE_NAME = "The 21st Century Alchemist";

/** Currency symbol used by every price on the page. */
export const CURRENCY = "$";

/** Course price. Set to a number to show it, e.g. 497. */
export const PRICE: number | null = null;

/** Optional strike-through price for a launch offer. */
export const PRICE_WAS: number | null = null;

/**
 * Direct checkout link (Hamza's portal purchase URL). While null the button
 * falls back to the normal apply flow, so it never points at a dead href.
 */
export const CHECKOUT_URL: string | null = null;

/** The course VSL. Null renders a labelled placeholder frame. */
export const COURSE_VSL_SRC: string | null = "/courseVSL/course-vsl.mp4";

export const formatPrice = (v: number) =>
  `${CURRENCY}${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

/* ------------------------------------------------------------------ */

export const HERO = {
  lead: "Discover Why The Wealth You’ve Been Chasing Has Always Been On The Other Side Of",
  accent: "An Identity You Haven’t Become Yet.",
  sub: "Unlock the hidden principles of alchemy to dissolve the subconscious barriers between you and your next financial breakthrough, embody the entrepreneur capable of 2–5x greater revenue, and begin creating a new reality in 8 weeks. Without another business strategy.",
};

export const ABOUT = [
  "For the past 2 years, I’ve worked with entrepreneurs, founders, and business owners to uncover the subconscious patterns keeping them from their next level of wealth and success.",
  "Through my method of Identity Transmutation, I’ve helped entrepreneurs identify the internal limitations behind their revenue ceilings and begin operating from an entirely new identity — without having to rebuild the businesses they’ve spent years creating.",
];

export type Outcome = { title: string; detail: string; pending?: boolean };

/** "Here's what becomes possible" — eight boxes, unnumbered on the page. */
export const OUTCOMES: Outcome[] = [
  {
    title: "Break Through Your Revenue Ceiling",
    detail:
      "Finally move beyond the $10K, $30K, or $100K months you’ve been circling for years and begin pursuing 2–5x greater revenue — without having to tear apart your business strategy or work twice as hard to get there.",
  },
  ...Array.from({ length: 7 }, () => ({
    title: "Copy pending",
    detail: "Awaiting the full text of this outcome from Hamza’s brief.",
    pending: true,
  })),
];

export const INTRODUCING =
  "In just 8 weeks, discover the hidden art of Identity Transmutation to break free from the subconscious limitations keeping you at your current level, become the entrepreneur capable of 2–5x greater monthly revenue, and begin creating an entirely new financial reality.";

/** Screenshots of client messages, shown as the proof wall. */
export const TESTIMONIAL_SHOTS: { src: string; alt: string }[] = [
  { src: "/testimonials/course/identity.jpg", alt: "Client message: the old identity came back and I observed it instead of reacting" },
  { src: "/testimonials/course/anxiety.jpg", alt: "Client message: my anxiety is practically gone, and it is only my first week" },
  { src: "/testimonials/course/new-generation.jpg", alt: "Client message: I wake up feeling alive, and I am seeing it financially too" },
  { src: "/testimonials/course/marlene.jpg", alt: "Client message from Marlene: waking up with more clarity and conviction" },
];

export type Week = { n: number; title: string; detail?: string; pending?: boolean };

/** The curriculum dropdown — each week opens to its description. */
export const WEEKS: Week[] = [
  {
    n: 1,
    title: "Why Your Business Is Stuck",
    detail:
      "Discover the real reason you’ve been unable to break through your current revenue ceiling, and why everything you’ve tried up until now may have been addressing the wrong problem.",
  },
  {
    n: 2,
    title: "The Three Planes Of Existence",
    detail:
      "Understand the three planes of existence and how they influence your financial success, the opportunities you experience, and the reality you live in.",
  },
  {
    n: 3,
    title: "The Fundamentals Of Reality",
    detail:
      "Learn the underlying principles of reality that most entrepreneurs never consider, and how understanding them can completely change the way you approach business, wealth, and success.",
  },
  { n: 4, title: "The New Identity", pending: true },
  { n: 5, title: "How To “Fight” Reality", pending: true },
  { n: 6, title: "The Transmutation", pending: true },
  { n: 7, title: "What Detachment Really Is", pending: true },
  { n: 8, title: "Copy pending", pending: true },
];

export const FAQS: { q: string; a: string; pending?: boolean }[] = [
  {
    q: "Can I really break through my revenue ceiling without changing my business strategy?",
    a: "You don’t always need another strategy to reach your next level. Sometimes the limitation is in how you think, decide, and operate. This course helps you identify those patterns and change them without rebuilding your business.",
  },
  {
    q: "What if I’ve already tried everything to break through my revenue ceiling?",
    a: "That’s exactly why I created this program. You’ve spent years working on your business. Now it’s time to examine the person behind it and uncover the limitations another strategy won’t necessarily solve.",
  },
  {
    q: "How is this different from everything you teach for free?",
    a: "Answer pending from Hamza’s brief.",
    pending: true,
  },
];
