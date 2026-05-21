import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import { MotionRoot } from "./components/MotionRoot";
import { Cursor } from "./components/Cursor";
import { Grain } from "./components/Grain";
import { ScrollManager } from "./components/ScrollManager";

/**
 * Inline script that runs BEFORE React hydrates. Disables the
 * browser's automatic scroll-restoration and forces scroll-to-top on
 * refresh (unless the URL carries a hash anchor). Hardcoded literal,
 * no user input, no XSS surface.
 */
const SCROLL_GUARD = `(function(){try{if('scrollRestoration' in history){history.scrollRestoration='manual';}var hasHash=window.location.hash && window.location.hash.length>1;if(!hasHash){window.scrollTo(0,0);window.addEventListener('load',function(){window.scrollTo(0,0);});}}catch(e){}})();`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["italic", "normal"],
  axes: ["opsz", "SOFT"],
});

export const metadata: Metadata = {
  title: "Hamza The Alchemist | The 21st Century Alchemist",
  description:
    "Identity work for high-level operators. Shift identity at the subconscious level. Manifestation becomes inevitable.",
};

export const viewport: Viewport = {
  themeColor: "#1a1612",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${fraunces.variable}`}>
      <body>
        <Script id="scroll-guard" strategy="beforeInteractive">
          {SCROLL_GUARD}
        </Script>
        <ScrollManager />
        <MotionRoot>{children}</MotionRoot>
        <Grain />
        <Cursor />
      </body>
    </html>
  );
}
