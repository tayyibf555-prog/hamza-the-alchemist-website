import { EntrySequence } from "./components/EntrySequence";
import { Nav } from "./components/Nav";
import { VSLHero } from "./components/VSLHero";
import { ClientPortfolio } from "./components/ClientPortfolio";
import { Practice } from "./components/Practice";
import { About } from "./components/About";
import { Proof } from "./components/Proof";
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
        <ClientPortfolio />
        <Practice />
        <About />
        <Proof />
        <HoldingBack />
        <Inquiry />
        <Signup />
      </main>
      <Footer />
    </EntrySequence>
  );
}
