import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import PositionSection from "@/components/home/PositionSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSectionPixelBgV3 from "@/components/home/ServicesSectionPixelBgV3";
import WorkSectionDontsCrossSingle from "@/components/home/WorkSectionDontsCrossSingle";
import QuoteSection from "@/components/home/QuoteSection";
import FAQSection from "@/components/home/FaqSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import StatsSection from "@/components/home/StatsSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import BlogSection from "@/components/home/BlogSection";

export const metadata: Metadata = {
  title: "Emberloft Studio - Web Development, Mobile, UI/UX, AI Integration",
  description:
    "A focused studio of three building web, mobile, UI/UX, and AI-integrated products. Fewer hands, more care.",
};

export default function RootPage() {
  return (
    <main>
      <HeroSection />
        <PositionSection />
        <AboutSection />
        <ServicesSectionPixelBgV3 />
        <WorkSectionDontsCrossSingle />
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
