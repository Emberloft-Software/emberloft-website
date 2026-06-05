import PageHero from "@/components/PageHero";
import PricingSection from "@/components/pricing/PricingSection";

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