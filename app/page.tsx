import { EntrySequence } from "./components/EntrySequence";
import { Nav } from "./components/Nav";
import { VSLHero } from "./components/VSLHero";
import { Practice } from "./components/Practice";
import { About } from "./components/About";
import { Proof } from "./components/Proof";
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
        <Proof />
        <TermsOfEntry />
        <HoldingBack />
        <Inquiry />
        <Signup />
      </main>
      <Footer />
    </EntrySequence>
  );
}
