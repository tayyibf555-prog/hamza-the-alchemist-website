import { Nav } from "./components/Nav";
import { AlchemistHero } from "./components/AlchemistHero";
import { About } from "./components/About";
import { VSLHero } from "./components/VSLHero";
import { HoldingBack } from "./components/HoldingBack";
import { Inquiry } from "./components/Inquiry";
import { Signup } from "./components/Signup";
import { Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <AlchemistHero />
        <About />
        <VSLHero />
        <HoldingBack />
        <Inquiry />
        <Signup />
      </main>
      <Footer />
    </>
  );
}
