import HeroSection from "@/components/home/HeroSection";
import PositionSection from "@/components/home/PositionSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import ServicesSectionPixelBg from "@/components/home/ServicesSectionPixelBg";
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
        <ServicesSectionPixelBg />
        <WorkSection />
        <QuoteSection />
        {/* <StatsSection /> */}
        {/* <CapabilitiesSection /> */}
        <FAQSection />
        
      {/* Add more sections here later e.g. <AboutSnippet /> */}
    </main>
  );
}