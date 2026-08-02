import { redirect } from "next/navigation";

/**
 * The Transmutation page is now the homepage.
 *
 * This route stays alive purely so links already in circulation — the URL
 * Hamza has shared, anything in ad copy or bios — land on the page rather
 * than a 404. Deliberately a temporary (307) redirect rather than a
 * permanent one, so reverting the structure does not leave the old URL
 * cached as redirected in visitors' browsers.
 */
export default function TransmutationPage() {
  redirect("/");
}
