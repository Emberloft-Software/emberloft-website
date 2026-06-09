import PageHero from "@/components/PageHero";
import ServiceRowsSection from "@/components/services/ServiceRowsSection";
import ProcessSection from "@/components/services/ProcessSection";
import CompareSection from "@/components/services/CompareSection";
import PricingSection from "@/components/pricing/PricingSection";

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        label="Services & Pricing"
        title="Work worth"
        titleItalic="paying for."
        description="Fixed prices. Senior hands. No surprises — just work that performs."
      />
      <ServiceRowsSection />
      <ProcessSection />
      <CompareSection />
      <PricingSection />
    </main>
  );
}