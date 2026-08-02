/**
 * The YouTube proof wall under the case studies.
 *
 * To fill a slot, paste the video's ID — the part after `v=` in
 * https://www.youtube.com/watch?v=XXXXXXXXXXX — into `id`, and write the
 * caption in two pieces: `lead` renders in ivory, `gold` renders in gold.
 * A slot with an empty `id` renders as a labelled placeholder frame, so the
 * section can go live before every video is in.
 */
export type YouTubeFeature = {
  /** YouTube video ID, e.g. "X2ObLdwGbZI". Empty string = placeholder slot. */
  id: string;
  /** Ivory half of the caption, e.g. "Maya & Joey Scaled From". */
  lead: string;
  /** Gold half, e.g. "$20k To $224k/Mo". */
  gold: string;
};

export const YOUTUBE_FEATURES: YouTubeFeature[] = [
  { id: "", lead: "Client Name Scaled From", gold: "$Xk To $Xk/Mo" },
  { id: "", lead: "Client Name Scaled From", gold: "$Xk To $Xk/Mo" },
  { id: "", lead: "Client Name Scaled From", gold: "$Xk To $Xk/Mo" },
  { id: "", lead: "Client Name Scaled From", gold: "$Xk To $Xk/Mo" },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/@HamzaTheAlchemist";
