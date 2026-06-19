export type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  image: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Why we cap ourselves at five active projects",
    excerpt:
      "Focus isn't a constraint we tolerate — it's the actual product. Here's the math behind staying small on purpose.",
    category: "Studio Notes",
    date: "May 14, 2026",
    readTime: "4 min read",
    color: "#FB4B54",
    image: "/about-1.png",
  },
  {
    title: "The case for senior-only teams",
    excerpt:
      "No juniors, no outsourcing, no exceptions. What that actually costs us, and why we still won't change it.",
    category: "Process",
    date: "Apr 29, 2026",
    readTime: "6 min read",
    color: "#EEBA0B",
    image: "/about-2.jpg",
  },
  {
    title: "Design systems that survive contact with reality",
    excerpt:
      "Most design systems rot within a year. The few that don't share three habits we steal from every time.",
    category: "Design",
    date: "Apr 8, 2026",
    readTime: "5 min read",
    color: "#5B4FCF",
    image: "/about-3.png",
  },
];
