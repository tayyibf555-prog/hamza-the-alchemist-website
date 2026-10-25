/**
 * Everything the course page says, in one place.
 *
 * Copy is Hamza's brief (WhatsApp, 8–9 Oct). Where the brief was cut off —
 * outcomes 2–8, weeks 4–8 and the third FAQ answer — the text was written
 * to match it. Setting `pending` on an entry renders it as a visibly
 * unfinished box, for any slot still waiting on copy.
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
export const CHECKOUT_URL: string | null =
  "https://portal.hamzathealchemist.com/onboarding";

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
  {
    title: "Stop Sabotaging Your Own Success",
    detail:
      "Identify the patterns that pull you back every time you get close to the next level, so new revenue stays with you instead of slipping away within a few months.",
  },
  {
    title: "Hold More Money Without Fear",
    detail:
      "Expand what you are internally able to receive and keep, so larger deals, bigger months and more wealth feel natural instead of threatening.",
  },
  {
    title: "Make Decisions From Certainty",
    detail:
      "Replace hesitation and second-guessing with the clarity to make the calls your next level demands, quickly and without needing outside validation.",
  },
  {
    title: "Lead From Detachment, Not Pressure",
    detail:
      "Stop chasing outcomes from scarcity and financial pressure, and start operating from a calm that draws clients, deals and opportunities towards you.",
  },
  {
    title: "Become The Identity Your Goals Require",
    detail:
      "Step into the identity of the entrepreneur who already lives at your target revenue, so success becomes the natural expression of who you are.",
  },
  {
    title: "Understand How Your Reality Is Created",
    detail:
      "See the principles shaping the opportunities, people and results showing up in your life, and learn to work with them instead of against them.",
  },
  {
    title: "Make The Change Permanent",
    detail:
      "Anchor the transformation so it holds under real-world pressure, giving you a new baseline that keeps rising long after the 8 weeks end.",
  },
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
  {
    n: 4,
    title: "The New Identity",
    detail:
      "Define the identity of the entrepreneur who already lives at your next level, and begin stepping into it instead of trying to force results from who you have been.",
  },
  {
    n: 5,
    title: "How To “Fight” Reality",
    detail:
      "Learn why pushing against your circumstances keeps you stuck, and how to meet resistance in a way that moves your reality instead of reinforcing it.",
  },
  {
    n: 6,
    title: "The Transmutation",
    detail:
      "The core of the program: dissolving the old identity and the subconscious limitations it carries, and transmuting them into the entrepreneur you are becoming.",
  },
  {
    n: 7,
    title: "What Detachment Really Is",
    detail:
      "Discover what detachment actually means, why it is not indifference, and how releasing your grip on outcomes is what allows bigger results to arrive.",
  },
  {
    n: 8,
    title: "Living As The New Identity",
    detail:
      "Integrate everything into how you think, decide and operate day to day, so the transformation holds long after the program ends and your new baseline keeps rising.",
  },
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
    a: "My free content shows you what is possible and why your identity sets your ceiling. This course is the full process, step by step over 8 weeks — the method I use to actually dissolve the old identity and install the new one, not just understand it.",
  },
];
