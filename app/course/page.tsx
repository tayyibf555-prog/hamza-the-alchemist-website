import type { Metadata } from "next";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CourseHero } from "../components/course/CourseHero";
import { CourseSlideshow } from "../components/course/CourseSlideshow";
import { CourseAbout } from "../components/course/CourseAbout";
import { CourseTestimonials } from "../components/course/CourseTestimonials";
import { CourseCurriculum } from "../components/course/CourseCurriculum";
import { CoursePricing } from "../components/course/CoursePricing";
import { CourseFaq } from "../components/course/CourseFaq";

export const metadata: Metadata = {
  title: "The 21st Century Alchemist | The Lion Alchemist",
  description:
    "An 8-week course in Identity Transmutation: dissolve the subconscious barriers behind your revenue ceiling and become the entrepreneur capable of 2–5x greater revenue.",
};

/**
 * The course page.
 *
 * Order follows Hamza's brief: VSL and ask, client slideshow, the course
 * and what it makes possible, the screenshot wall, the curriculum, the
 * stack with the price, then the FAQ.
 */
export default function CoursePage() {
  return (
    <>
      <Nav />
      <main>
        <CourseHero />
        <CourseSlideshow />
        <CourseAbout />
        <CourseTestimonials />
        <CourseCurriculum />
        <CoursePricing />
        <CourseFaq />
      </main>
      <Footer />
    </>
  );
}
