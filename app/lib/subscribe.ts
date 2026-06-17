/**
 * Posts an email to the Google Apps Script web app, which appends it as a
 * single-column row in the connected Google Sheet.
 *
 * The Apps Script web app does not return CORS headers, so we fire the
 * request with `mode: "no-cors"` (the row still gets written; we just can't
 * read the response). Treated as success unless the network call throws.
 */
const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxCjP93bP3gS8lY8gK5XOoX5PUObKJ2b0uMR_AavueGu9PqhjX7GK3vYuqm_fu-UNUJhw/exec";

export async function subscribeEmail(email: string): Promise<void> {
  await fetch(SHEET_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ email }),
  });
}
