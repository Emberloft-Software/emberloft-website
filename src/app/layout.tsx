import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata = {
  metadataBase: new URL("https://www.emberloft.studio"),
  title: "Emberloft",
  description: "Web Development, Mobile, UI/UX, AI Integration",
  openGraph: {
    siteName: "Emberloft Studio",
    type: "website" as const,
    locale: "en_US",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Emberloft Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image" as const,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${instrumentSerif.variable} font-sans bg-black text-white antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}