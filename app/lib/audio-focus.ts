/**
 * Audio focus — only one thing on the page should be audible at a time.
 *
 * The VSL autoplays and keeps running as the visitor scrolls, so starting a
 * testimonial further down the page would otherwise put two voices on top of
 * each other. Anything that is about to make sound announces itself here and
 * the VSL ducks to muted.
 *
 * Native <video> elements are detected automatically by listening for `play`
 * in the capture phase (media events do not bubble, but they are observable
 * on the way down). Cross-origin iframes — YouTube, Loom — give us no such
 * signal, so those call claimAudioFocus() from the click that mounts them.
 */
export const AUDIO_FOCUS_EVENT = "lion:audio-focus";

/** Announce that this player is taking over the page's audio. */
export function claimAudioFocus() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AUDIO_FOCUS_EVENT));
}
