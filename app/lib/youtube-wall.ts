/**
 * The YouTube wall under the case studies.
 *
 * To add or swap a video, paste its URL straight from the address bar into
 * `url` — any YouTube form works (youtu.be/…, watch?v=…, /shorts/…, and any
 * ?si= tracking suffix is ignored) — then write the caption in up to three
 * pieces: `lead` and `tail` render in ivory, `gold` renders in gold between
 * them. A slot with an empty `url` renders as a labelled placeholder.
 */
export type YouTubeFeature = {
  /** Full YouTube URL, or a bare 11-character ID. Empty = placeholder slot. */
  url: string;
  /** Ivory text before the highlight. */
  lead: string;
  /** The gold highlight. */
  gold: string;
  /** Ivory text after the highlight. Optional. */
  tail?: string;
};

/**
 * Pull the video ID out of any YouTube URL shape, so links can be pasted
 * without trimming tracking params or worrying which form they came in.
 */
export function youTubeId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(
    /(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

export const YOUTUBE_FEATURES: YouTubeFeature[] = [
  {
    url: "https://youtu.be/RMSu7kW8f7c",
    lead: "Your",
    gold: "“Old Identity”",
    tail: "Is Trapping You In The Same Reality",
  },
  {
    url: "https://youtu.be/awnyBG3GL5I",
    lead: "You Must",
    gold: "“Alchemize”",
    tail: "Your Old Identity To 10x Your Income",
  },
  {
    url: "https://youtu.be/kQc-LOLbNUc",
    lead: "Use",
    gold: "“Alchemy”",
    tail: "To Fully Have Reality Under Your Control",
  },
  {
    url: "https://youtu.be/pTDH3BOp7dU",
    lead: "The Universe Knows",
    gold: "You Are Ready",
    tail: "To Beat It",
  },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@HamzaTheAlchemist";
