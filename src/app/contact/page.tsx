import PageHero from "@/components/PageHero";
import ContactForm from "@/components/contact/ContactFormSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";

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