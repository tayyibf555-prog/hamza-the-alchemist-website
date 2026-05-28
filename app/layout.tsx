import type { Metadata, Viewport } from "next";
import { Inter, Outfit, Fraunces } from "next/font/google";
import "./globals.css";
import { MotionRoot } from "./components/MotionRoot";
import { Cursor } from "./components/Cursor";
import { ScrollManager } from "./components/ScrollManager";
import { AuraBackground } from "./components/AuraBackground";

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
      <head>
        {/* Brute-force scroll-restoration guard. Runs synchronously
            in <head> before anything else, then hammers scrollY=0
            every 50ms for 5s. See /public/scroll-guard.js. */}
        <script src="/scroll-guard.js" />
      </head>
      <body>
        <AuraBackground />
        <ScrollManager />
        <MotionRoot>{children}</MotionRoot>
        <Cursor />
      </body>
    </html>
  );
}
