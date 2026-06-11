import { EntrySequence } from "./components/EntrySequence";
import { Nav } from "./components/Nav";
import { VSLHero } from "./components/VSLHero";
import { ClientPortfolio } from "./components/ClientPortfolio";
import { About } from "./components/About";
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
        <About />
        <HoldingBack />
        <Inquiry />
        <Signup />
      </main>
      <Footer />
    </EntrySequence>
  );
}
