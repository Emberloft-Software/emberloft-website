import type { MetadataRoute } from "next";
import { blogPosts } from "@/components/home/blogData";

const baseUrl = "https://emberloft.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/home",
    "/about",
    "/services",
    "/pricing",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes];
}
