import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactFormSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";

export const metadata: Metadata = {
  title: "Contact - Emberloft Studio",
  description:
    "We take on a small number of projects at a time. If you've got something worth building, tell us about it.",
  alternates: {
    canonical: "https://www.emberloft.studio/contact",
  },
  openGraph: {
    title: "Contact - Emberloft Studio",
    description:
      "We take on a small number of projects at a time. If you've got something worth building, tell us about it.",
    url: "https://www.emberloft.studio/contact",
    siteName: "Emberloft Studio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/api/og?title=Let%27s+Build+Something&description=We+take+on+a+small+number+of+projects+at+a+time.+Tell+us+about+yours.",
        width: 1200,
        height: 630,
        alt: "Contact Emberloft Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact - Emberloft Studio",
    description:
      "We take on a small number of projects at a time. If you've got something worth building, tell us about it.",
    images: [
      "/api/og?title=Let%27s+Build+Something&description=We+take+on+a+small+number+of+projects+at+a+time.+Tell+us+about+yours.",
    ],
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Contact"
        title="Let's build"
        titleItalic="something."
        description="We take on a small number of projects at a time. If you've got something worth building, tell us about it."
      />
      <ContactForm />
      <ContactInfoSection />
    </main>
  );
}