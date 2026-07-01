import type { MetadataRoute } from "next";
import { blogPosts } from "@/components/home/blogData";

const baseUrl = "https://www.emberloft.studio";

const staticRoutes: { route: string; date: string }[] = [
  { route: "", date: "2026-07-01" },
  { route: "/about", date: "2026-06-20" },
  { route: "/services", date: "2026-06-20" },
  { route: "/pricing", date: "2026-06-20" },
  { route: "/contact", date: "2026-06-20" },
  { route: "/blog", date: "2026-06-26" },
  { route: "/privacy", date: "2026-06-20" },
  { route: "/terms", date: "2026-06-20" },
];

const blogDateMap: Record<string, string> = {
  "Jun 20, 2026": "2026-06-20",
  "Jun 23, 2026": "2026-06-23",
  "Jun 26, 2026": "2026-06-26",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticRoutes.map(({ route, date }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(date),
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(blogDateMap[post.date] ?? "2026-06-20"),
  }));

  return [...pages, ...blogPages];
}
