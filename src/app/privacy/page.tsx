import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy - Emberloft Studio",
  description:
    "How Emberloft Studio collects, uses, and protects your personal information.",
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "Who we are",
    body: [
      "Emberloft Studio (\"Emberloft\", \"we\", \"us\") is a design and development studio based in Sri Lanka, operated by its co-founders, Sanuth Mandepa and Chanka Herath. Emberloft is not currently a registered business entity. Until registration is complete, you are entering into any agreement with Sanuth Mandepa and Chanka Herath individually, trading as Emberloft Studio.",
      "We work with clients both in Sri Lanka and internationally. This policy applies to visitors and clients regardless of location, and explains what information we collect when you visit this website or contact us, why we collect it, and how we handle it. By using this site, you agree to the practices described here.",
    ],
  },
  {
    heading: "Information we collect",
    body: [
      "Information you give us directly: when you submit our contact form, you may share your name, email address, company name, project details, and budget range.",
      "Information collected automatically: like most websites, we collect basic technical data such as your browser type, device type, pages visited, and approximate location, through Google Analytics, once you have given consent via the cookie banner on this site.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "We use the information you submit to respond to your inquiry, scope and propose work, and communicate about an active or potential project. We use automatically collected technical data to understand how the site is used and to improve it.",
      "We do not sell your personal information to third parties.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "When you first visit this site, you'll see a cookie banner asking for consent before any non-essential cookies are set. If you accept, we use Google Analytics to understand site traffic and usage patterns. If you decline, no analytics cookies are set, and you can change your choice at any time by clearing your browser's site data and revisiting the page.",
      "We also use Google reCAPTCHA on our contact form to filter out automated spam submissions. reCAPTCHA may set its own cookies and process technical data such as your IP address and browser behavior, governed by Google's own privacy policy.",
    ],
  },
  {
    heading: "Third-party services",
    body: [
      "We rely on the following third-party services, each of which only receives the information needed to perform its function: Web3Forms, to receive and forward contact form submissions; Google Analytics, for site traffic analytics, only after cookie consent; Google reCAPTCHA, to detect spam on our contact form; and our website hosting provider, to serve this site.",
      "These providers may process data outside Sri Lanka as part of their normal global infrastructure. By using this site or submitting the contact form, you consent to this international transfer.",
    ],
  },
  {
    heading: "Data retention",
    body: [
      "We keep contact form submissions and related project information for as long as reasonably necessary to respond to your inquiry or deliver a contracted project, and may retain records afterward for accounting and legal purposes.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us at any time to access, correct, or delete the personal information we hold about you. To make a request, email us at the address below.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy from time to time. The effective date below reflects the most recent revision.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about this policy can be sent to emberloft.studio@gmail.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        label="Legal"
        title="Privacy"
        titleItalic="policy."
        description="How we collect, use, and protect your information."
      />

      <article className="w-full bg-[#F5F5F5] py-[10vh] px-[5vw]">
        <div className="max-w-3xl mx-auto">
          <p className="font-geist text-black/40 text-xs tracking-wide uppercase mb-10">
            Effective date: June 20, 2026
          </p>

          <div className="flex flex-col gap-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-geist font-medium text-black text-xl md:text-2xl mb-3 tracking-tight">
                  {section.heading}
                </h2>
                <div className="flex flex-col gap-3">
                  {section.body.map((p, i) => (
                    <p
                      key={i}
                      className="font-geist text-black/70 text-base leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
