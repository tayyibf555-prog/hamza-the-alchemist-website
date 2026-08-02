/**
 * Shared content for the two landing-page concepts (/v1 and /v2).
 *
 * Every client result figure here is lifted verbatim from Hamza's own
 * existing page. Nothing is invented: no figure appears that the client
 * has not already published himself.
 */

export type Operator = {
  name: string;
  role: string;
  /** Result sentence. `gold` marks the phrase set in gold Fraunces italic. */
  result: { before: string; gold: string; after: string };
  /** Self-hosted mp4 under /public, or an embed URL. */
  videoSrc?: string;
  embedUrl?: string;
  poster?: string;
  photo?: string;
  /** CSS aspect-ratio for the player, e.g. "9 / 16". */
  aspect: string;
};

export const OPERATORS: Operator[] = [
  {
    name: "Jordy Michels",
    role: "Day Trader",
    result: {
      before: "Came in as a day trader swinging between ",
      gold: "$10–15K per month",
      after:
        ". Now runs his own six figure coaching program, built in under a year.",
    },
    videoSrc: "/clients/jordy-michels-testimonial.mp4",
    photo: "/clients/jordy-michels.png",
    aspect: "9 / 16",
  },
  {
    name: "Nathan Jones",
    role: "Trader",
    result: {
      before: "From a 9 to 5 and inconsistent trading to ",
      gold: "$5,000–$10,000 per month",
      after:
        " after removing the patterns tying him to his old reality.",
    },
    embedUrl:
      "https://www.loom.com/embed/bba3a4897e60430a9914b1c85504893b?autoplay=1&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    poster: "/clients/nathan-jones-poster.gif",
    photo: "/clients/nathan-jones.jpg",
    aspect: "16 / 9",
  },
  {
    name: "Frank",
    role: "Business Owner",
    result: {
      before:
        "Shifted from scarcity and financial pressure to leading from certainty. ",
      gold: "Profits up 25% within six weeks",
      after: " of working together.",
    },
    videoSrc: "/clients/frank.mp4",
    photo: "/clients/frank.jpg",
    aspect: "9 / 16",
  },
];

/** The main VSL. 1080p H.264, 10:35, web-optimised for progressive playback. */
export const VSL_SRC = "/homepageVSL/lion-vsl.mp4";

/**
 * Client message screenshots for the proof wall.
 *
 * Hamza's live page ships ten of these (receipt-1..10). They have not been
 * handed over yet, so this stays empty and both pages render labelled
 * placeholder cells at the correct proportions. Drop files into
 * /public/receipts and list them here to light the section up.
 */
export const RECEIPTS: string[] = [];

/** Placeholder count so the wall keeps its composition before assets land. */
export const RECEIPT_SLOTS = 10;

export const META_DISCLAIMER =
  "This site is not a part of the Facebook website or Meta Platforms Inc. Additionally, this site is not endorsed by Meta in any way. FACEBOOK is a trademark of Meta Platforms, Inc. Results shown are individual experiences and are not a guarantee of your results.";
