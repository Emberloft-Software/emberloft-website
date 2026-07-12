import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PricingSection from "@/components/pricing/PricingSection";

export const metadata: Metadata = {
  title: "Pricing - Emberloft Studio",
  description:
    "Simple, transparent pricing with no hidden fees, plans that fit startups and established businesses alike.",
  alternates: {
    canonical: "https://www.emberloft.studio/pricing",
  },
  openGraph: {
    title: "Pricing - Emberloft Studio",
    description:
      "Simple, transparent pricing with no hidden fees, plans that fit startups and established businesses alike.",
    url: "https://www.emberloft.studio/pricing",
    siteName: "Emberloft Studio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og?title=Pricing&description=Simple%2C+transparent+pricing+with+no+hidden+fees.",
        width: 1200,
        height: 630,
        alt: "Emberloft Studio Pricing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing - Emberloft Studio",
    description:
      "Simple, transparent pricing with no hidden fees, plans that fit startups and established businesses alike.",
    images: [
      "/api/og?title=Pricing&description=Simple%2C+transparent+pricing+with+no+hidden+fees.",
    ],
  },
};

export default function PricingPage() {
  return (
    <main>
        <PageHero
        label="Pricing"
        title="Simple, transparent pricing."
        titleItalic="No hidden fees."
        description="Our pricing is designed to be straightforward and flexible, ensuring you get the best value for your investment. Whether you're a startup or an established enterprise, we have a plan that fits your needs."
        />
        <PricingSection />
      {/* Add more sections here later e.g. <AboutSnippet /> */}
    </main>
  );
}