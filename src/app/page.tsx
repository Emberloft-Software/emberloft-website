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
  title: "Emberloft Studio | Web, Mobile, UI/UX & AI",
  description:
    "A focused studio of three building web, mobile, UI/UX, and AI-integrated products. Fewer hands, more care.",
  alternates: {
    canonical: "https://www.emberloft.studio",
  },
  openGraph: {
    title: "Emberloft Studio | Web, Mobile, UI/UX & AI",
    description:
      "A focused studio of three building web, mobile, UI/UX, and AI-integrated products. Fewer hands, more care.",
    url: "https://www.emberloft.studio",
    siteName: "Emberloft Studio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og?title=Web%2C+Mobile%2C+UI%2FUX+%26+AI&description=A+focused+studio+of+three+building+web%2C+mobile%2C+UI%2FUX%2C+and+AI-integrated+products.",
        width: 1200,
        height: 630,
        alt: "Emberloft Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emberloft Studio | Web, Mobile, UI/UX & AI",
    description:
      "A focused studio of three building web, mobile, UI/UX, and AI-integrated products. Fewer hands, more care.",
    images: [
      "/api/og?title=Web%2C+Mobile%2C+UI%2FUX+%26+AI&description=A+focused+studio+of+three+building+web%2C+mobile%2C+UI%2FUX%2C+and+AI-integrated+products.",
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Emberloft Studio",
  url: "https://www.emberloft.studio",
  logo: "https://www.emberloft.studio/logo.webp",
  description:
    "A focused studio of three building web, mobile, UI/UX, and AI-integrated products. Fewer hands, more care.",
  email: "emberloft.studio@gmail.com",
  foundingLocation: { "@type": "Place", name: "Sri Lanka" },
  sameAs: [
    "https://www.instagram.com/emberloft.studio",
    "https://www.linkedin.com/company/emberloft",
    "https://www.facebook.com/profile.php?id=61589472851916",
  ],
  knowsAbout: [
    "Web Development",
    "Mobile App Development",
    "UI/UX Design",
    "AI Integration",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Emberloft Studio",
  url: "https://www.emberloft.studio",
};

export default function RootPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
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
      </main>
    </>
  );
}
