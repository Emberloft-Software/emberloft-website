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