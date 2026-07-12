import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceSplitSection from "@/components/services/ServiceSplitSection";
import ProcessSection from "@/components/services/ProcessSection";
import CompareSection from "@/components/services/CompareSection";
import PricingSection from "@/components/pricing/PricingSection";

export const metadata: Metadata = {
  title: "Services & Pricing - Emberloft Studio",
  description:
    "Fixed prices. Senior hands. No surprises, just work that performs.",
  alternates: {
    canonical: "https://www.emberloft.studio/services",
  },
  openGraph: {
    title: "Services & Pricing - Emberloft Studio",
    description:
      "Fixed prices. Senior hands. No surprises, just work that performs.",
    url: "https://www.emberloft.studio/services",
    siteName: "Emberloft Studio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og?title=Services+%26+Pricing&description=Fixed+prices.+Senior+hands.+No+surprises%2C+just+work+that+performs.",
        width: 1200,
        height: 630,
        alt: "Emberloft Studio Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Pricing - Emberloft Studio",
    description:
      "Fixed prices. Senior hands. No surprises, just work that performs.",
    images: [
      "/api/og?title=Services+%26+Pricing&description=Fixed+prices.+Senior+hands.+No+surprises%2C+just+work+that+performs.",
    ],
  },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        label="Services & Pricing"
        title="Work worth"
        titleItalic="paying for."
        description="Fixed prices. Senior hands. No surprises, just work that performs."
      />
      <ServiceSplitSection />
      <ProcessSection />
      <CompareSection />
      <PricingSection />
    </main>
  );
}