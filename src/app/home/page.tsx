import HeroSection from "@/components/home/HeroSection";
import PositionSection from "@/components/home/PositionSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ServicesSectionPixelBgV3 from "@/components/home/ServicesSectionPixelBgV3";
import WorkSection from "@/components/home/WorkSection";
import QuoteSection from "@/components/home/QuoteSection";
import FAQSection from "@/components/home/FaqSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import StatsSection from "@/components/home/StatsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
        <PositionSection />
        <AboutSection />
        <ServicesSection />
        <ServicesSectionPixelBgV3 />
        <WorkSection />
        <QuoteSection />
        {/* <StatsSection /> */}
        {/* <CapabilitiesSection /> */}
        <FAQSection />
        
      {/* Add more sections here later e.g. <AboutSnippet /> */}
    </main>
  );
}