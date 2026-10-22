import { redirect } from "next/navigation";

/**
 * The cohort became a standalone course. This route stays alive so any link
 * already shared lands on the course rather than a 404. Temporary (307), not
 * permanent, so reverting would not leave it cached as redirected.
 */
export default function CohortPage() {
  redirect("/course");
}
