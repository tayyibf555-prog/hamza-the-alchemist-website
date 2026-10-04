/**
 * Sends an email to our own /api/subscribe route, which writes it to
 * Mailchimp and to the Google Sheet.
 *
 * Previously this posted straight to the Apps Script with `mode: "no-cors"`,
 * which made the response unreadable — so the form showed its success state
 * even when the endpoint was dead. Going through a same-origin route means
 * CORS is not in play and a genuine failure can be surfaced.
 */
export async function subscribeEmail(
  email: string,
  /** Where the signup came from; becomes a Mailchimp tag, e.g. "homepage". */
  source?: string
): Promise<void> {
  const res = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });

  if (!res.ok) {
    throw new Error(`subscribe failed: ${res.status}`);
  }
}
