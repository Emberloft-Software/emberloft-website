import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import TeamSection from "@/components/about/TeamSection";

export const metadata: Metadata = {
  title: "About - Emberloft Studio",
  description:
    "A focused studio of three. We keep it small on purpose, fewer hands, more care.",
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