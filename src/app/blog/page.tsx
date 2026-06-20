import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { blogPosts } from "@/components/home/blogData";

export const metadata: Metadata = {
  title: "Blog - Emberloft Studio",
  description:
    "Notes on the work: Emberloft's take on AI-assisted development, design systems, and how we run a focused studio.",
  openGraph: {
    title: "Blog - Emberloft Studio",
    description:
      "Notes on the work: Emberloft's take on AI-assisted development, design systems, and how we run a focused studio.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main>
      <PageHero
        label="The Blog"
        title="Notes on the"
        titleItalic="work."
        description="What we're learning, building, and arguing about, straight from the studio floor."
      />

      <section className="w-full bg-[#F5F5F5] py-[10vh] px-[5vw]">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-4/3 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-4 left-4 font-geist text-xs font-semibold tracking-widest uppercase text-black rounded-full px-3 py-1"
                  style={{ backgroundColor: post.color }}
                >
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-geist font-medium text-black text-lg mb-2 leading-tight transition-colors duration-200 group-hover:text-[#FB4B54]">
                  {post.title}
                </h2>
                <p className="font-geist text-black/50 text-sm leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 font-geist text-black/40 text-xs tracking-wide uppercase">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-black/20" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
