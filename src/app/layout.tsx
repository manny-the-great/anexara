import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Montserrat,
  Inter,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import CartProvider from "@/components/CartProvider";

/* ── Luxury Font Stack ── */
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "AnexaraWorld — Defy Gravity. Embrace Elegance.",
    template: "%s — AnexaraWorld",
  },
  description:
    "An avant-garde luxury fashion house where futuristic design meets timeless craftsmanship. Defy gravity, embrace elegance.",
  keywords: ["luxury fashion", "haute couture", "avant-garde", "bespoke", "luxury designer"],
  openGraph: {
    title: "AnexaraWorld — Defy Gravity. Embrace Elegance.",
    description: "An avant-garde luxury fashion house where futuristic design meets timeless craftsmanship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${montserrat.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <body>
        <CartProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
