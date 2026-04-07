import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Iconik Agency — Agence de Jeunes Comédiens",
    template: "%s | Iconik Agency",
  },
  description:
    "Iconik Agency est une agence artistique parisienne dédiée aux jeunes comédiens. Nous révélons et accompagnons les talents de demain pour le cinéma, la télévision et le théâtre.",
  keywords: [
    "agence comédiens",
    "jeunes acteurs",
    "casting enfants",
    "agence artistique Paris",
    "comédiens adolescents",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <Script
        src={`https://tracker-production-9a75.up.railway.app/track.js?id=${process.env.NEXT_PUBLIC_BUSINESS_ID}`}
        strategy="afterInteractive"
      />
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
