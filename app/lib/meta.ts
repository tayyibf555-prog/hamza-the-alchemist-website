/** Fire a Meta Pixel standard event (no-op if the pixel hasn't loaded). */
export function trackMeta(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (typeof w.fbq === "function") {
    w.fbq("track", event, params);
  }
}
