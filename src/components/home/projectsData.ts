export type Project = {
  number: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  description: string;
  color: string;
  image: string;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "Gandhara Art & Design Studio",
    category: "UI/UX · Figma Design",
    year: "2023",
    tags: ["Figma", "UI/UX Design", "Web Design"],
    description:
      "A complete UI/UX redesign for Gandhara, an exclusive art and design studio in Colombo. Curated collections, interior solutions, and a custom e-commerce experience, designed end to end in Figma.",
    color: "#FB4B54",
    image: "/gandhara-case-study.webp",
  },
  {
    number: "02",
    title: "Forge Commerce",
    category: "E-commerce · Web",
    year: "2025",
    tags: ["Shopify", "React", "Performance"],
    description:
      "A storefront tuned for conversion — sub-second loads and checkout friction cut in half.",
    color: "#EEBA0B",
    image: "/mockup-25.png",
  },
  {
    number: "03",
    title: "Lumen Analytics",
    category: "SaaS · Dashboard",
    year: "2024",
    tags: ["Data Viz", "React", "AI Integration"],
    description:
      "Real-time analytics for ops teams, with AI-surfaced anomalies instead of buried charts.",
    color: "#5B4FCF",
    image: "/about-3.png",
  },
  {
    number: "04",
    title: "Drift Travel",
    category: "Travel · Mobile",
    year: "2024",
    tags: ["React Native", "iOS", "Android"],
    description:
      "A trip-planning app that feels native on both platforms, built by one small senior team.",
    color: "#FB4B54",
    image: "/about-1.png",
  },
];
