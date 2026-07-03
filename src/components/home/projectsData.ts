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
    title: "Art & Design Studio Concept",
    category: "UI/UX · Personal Project",
    year: "2023",
    tags: ["Figma", "UI/UX Design", "Web Design"],
    description:
      "A personal UI/UX concept for an exclusive art and design studio in Colombo, exploring curated collections, interior solutions, and a custom e-commerce experience. Designed end to end in Figma.",
    color: "#FB4B54",
    image: "/art-design-studio-concept-ui-ux-case-study.webp",
  },
  {
    number: "02",
    title: "ENOTH",
    category: "Fashion · E-commerce",
    year: "2026",
    tags: ["React", "Tailwind CSS", "Web Design"],
    description:
      "A bold fashion brand experience for ENOTH, built personally in React and Tailwind CSS. Unapologetic visuals, animated collection reveals, and a confident, trend-setting tone, carried from concept through to a working build.",
    color: "#EEBA0B",
    image: "/enoth-fashion-brand-react-web-design.webp",
  },
  {
    number: "03",
    title: "Chanka Herath Portfolio",
    category: "Portfolio · Web App",
    year: "2026",
    tags: ["Next.js", "React", "Framer Motion"],
    description:
      "An anime-inspired developer portfolio for Chanka Herath, a full-stack engineer on our team. Manga-style chapters walk through his background, skills, experience, and shipped projects, built with Next.js, React, and Framer Motion for smooth, game-like transitions.",
    color: "#5B4FCF",
    image: "/chanka-herath-developer-portfolio-nextjs.webp",
  },
  {
    number: "04",
    title: "Vertex Architecture",
    category: "UI/UX · Figma Design",
    year: "2024",
    tags: ["Figma", "UI/UX Design", "Web Design"],
    description:
      "A UI/UX concept for Vertex Architecture, a modern architecture and design studio. A minimal, image-led portfolio layout that lets the built projects carry the story, with a clean grid system designed and prototyped end to end in Figma.",
    color: "#FB4B54",
    image: "/vertex-architecture-web-design-case-study.webp",
  },
];
