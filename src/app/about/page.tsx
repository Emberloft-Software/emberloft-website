import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TeamSection from "@/components/about/TeamSection";

export const metadata: Metadata = {
  title: "About - Emberloft Studio",
  description:
    "A focused studio of three. We keep it small on purpose, fewer hands, more care.",
  alternates: {
    canonical: "https://www.emberloft.studio/about",
  },
  openGraph: {
    title: "About - Emberloft Studio",
    description:
      "A focused studio of three. We keep it small on purpose, fewer hands, more care.",
    url: "https://www.emberloft.studio/about",
    siteName: "Emberloft Studio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og?title=About+Emberloft&description=A+focused+studio+of+three.+We+keep+it+small+on+purpose%2C+fewer+hands%2C+more+care.",
        width: 1200,
        height: 630,
        alt: "About Emberloft Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About - Emberloft Studio",
    description:
      "A focused studio of three. We keep it small on purpose, fewer hands, more care.",
    images: [
      "/api/og?title=About+Emberloft&description=A+focused+studio+of+three.+We+keep+it+small+on+purpose%2C+fewer+hands%2C+more+care.",
    ],
  },
};

export default function AboutPage() {
  return (
    <main>
        <PageHero
        label="About Emberloft"
        title="Built by people who"
        titleItalic="give a damn."
        description="A focused studio of three. We keep it small on purpose, fewer hands, more care."
      />
        <TeamSection />
        
      
    </main>
  );
}