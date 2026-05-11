import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import StickyMobileCTA from "@/components/sticky-cta";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aureline Clinic — Aesthetic Treatments, London",
  description:
    "Premium aesthetic clinic in London. Expert-led treatments including Botox, lip enhancement, skin rejuvenation, and PRP therapy. Book a private consultation.",
  keywords: [
    "aesthetic clinic London",
    "botox London",
    "lip fillers London",
    "skin rejuvenation",
    "PRP therapy London",
    "private aesthetic consultation",
  ],
  openGraph: {
    title: "Aureline Clinic — Aesthetic Treatments, London",
    description:
      "Premium aesthetic clinic in London. Natural results, expert care.",
    type: "website",
    locale: "en_GB",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-[#FAF8F5] text-stone-800 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyMobileCTA />
      </body>
    </html>
  );
}
