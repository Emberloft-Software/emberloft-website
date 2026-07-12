import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service - Emberloft Studio",
  description:
    "The terms that govern working with Emberloft Studio and using this website.",
  alternates: {
    canonical: "https://www.emberloft.studio/terms",
  },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "Agreement to terms",
    body: [
      "These terms govern your use of this website and any services provided by Emberloft Studio (\"Emberloft\", \"we\", \"us\"). By browsing this site or engaging us for work, you agree to these terms. Specific projects are also governed by their own signed proposal or contract, which takes priority over this page if the two conflict.",
      "Emberloft Studio is based in Sri Lanka and is operated by its co-founders, Sanuth Mandepa and Chanka Herath. Emberloft is not currently a registered business entity. Until registration is complete, any contract, invoice, or agreement made under the Emberloft name is entered into with Sanuth Mandepa and Chanka Herath individually, trading as Emberloft Studio.",
    ],
  },
  {
    heading: "Services",
    body: [
      "Emberloft provides web development, mobile development, UI/UX design, and AI integration services, to clients based in Sri Lanka and internationally. The exact scope, deliverables, timeline, and price for a given project are defined in a separate written proposal agreed with the client before work begins.",
    ],
  },
  {
    heading: "Engagement and payment",
    body: [
      "Project pricing, payment schedule, and milestones are set out in the proposal for that engagement. Work on a milestone typically begins once any associated payment for that milestone has been received, unless otherwise agreed in writing.",
    ],
  },
  {
    heading: "Revisions and scope",
    body: [
      "Each proposal defines how many rounds of revisions are included. Requests that go beyond the agreed scope, the agreed number of revision rounds, or fundamentally change project requirements may be billed separately, and we will always confirm this with you in writing before doing the work.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Once a project is paid in full, ownership of the final agreed deliverables transfers to the client, except for any third-party assets, libraries, or tools used under their own license. Emberloft retains the right to display completed work in its portfolio, case studies, and marketing, unless a confidentiality agreement says otherwise.",
    ],
  },
  {
    heading: "Confidentiality",
    body: [
      "We treat project details, business information, and unreleased work shared with us as confidential, and we do not disclose them outside what is needed to deliver the project, except where the client has agreed to a public case study.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "Emberloft delivers work to a professional standard but does not guarantee specific business outcomes such as traffic, conversions, or revenue resulting from a delivered product. To the extent permitted by law, our liability for any claim related to a project is limited to the amount paid for that project.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "Either party may end an engagement with written notice as described in the relevant proposal. The client remains responsible for paying for work completed up to the point of termination.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of Sri Lanka, without regard to conflict-of-law principles, regardless of where the client is based.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The effective date below reflects the most recent revision. Active project agreements are governed by the terms in place when that agreement was signed.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about these terms can be sent to emberloft.studio@gmail.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main>
      <PageHero
        label="Legal"
        title="Terms of"
        titleItalic="service."
        description="The terms that govern working with us and using this site."
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
