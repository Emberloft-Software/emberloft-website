import HeroSection from "@/components/home/HeroSection";
import PositionSection from "@/components/home/PositionSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSectionPixelBgV3 from "@/components/home/ServicesSectionPixelBgV3";
import WorkSection from "@/components/home/WorkSection";
import QuoteSection from "@/components/home/QuoteSection";
import FAQSection from "@/components/home/FaqSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import StatsSection from "@/components/home/StatsSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import BlogSection from "@/components/home/BlogSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
        <PositionSection />
        <AboutSection />
        <ServicesSectionPixelBgV3 />
        <WorkSection />
        <ProjectsSection />
        <QuoteSection />
        {/* <StatsSection /> */}
        {/* <CapabilitiesSection /> */}
        <BlogSection />
        <FAQSection />

      {/* Add more sections here later e.g. <AboutSnippet /> */}
    </main>
  );
}