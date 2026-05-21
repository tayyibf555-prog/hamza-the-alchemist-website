import { EntrySequence } from "./components/EntrySequence";
import { Nav } from "./components/Nav";
import { VSLHero } from "./components/VSLHero";
import { Practice } from "./components/Practice";
import { About } from "./components/About";
import { Method } from "./components/Method";
import { Proof } from "./components/Proof";
import { Testimonial } from "./components/Testimonial";
import { TermsOfEntry } from "./components/TermsOfEntry";
import { HoldingBack } from "./components/HoldingBack";
import { Inquiry } from "./components/Inquiry";
import { Signup } from "./components/Signup";
import { Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <EntrySequence>
      <Nav />
      <main>
        <VSLHero />
        <Practice />
        <About />
        <Method />
        <Proof />
        <Testimonial
          quote="I came in chasing a five-million-dollar year. Six months later I wasn't chasing anything; the year happened on its own."
          name="J.K."
          role="Founder · DTC consumer brand"
          metric="$4.2M → $11.6M ARR · 11 months"
        />
        <TermsOfEntry />
        <HoldingBack />
        <Inquiry />
        <Signup />
      </main>
      <Footer />
    </EntrySequence>
  );
}
