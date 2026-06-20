import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ArrowButton from "@/components/ArrowButton";
import { blogPosts } from "@/components/home/blogData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} - Emberloft Studio`,
    description: post.seoDescription,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.seoDescription,
      type: "article",
      images: [{ url: post.image }],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seoDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        label={post.category}
        title={post.title}
        accentColor={post.color}
        description={post.excerpt}
      />

      <article className="w-full bg-[#F5F5F5] py-[10vh] px-[5vw]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 font-geist text-black/40 text-xs tracking-wide uppercase mb-10">
            <span>{post.author}</span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span>{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span>{post.readTime}</span>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="flex flex-col gap-6">
            {post.content.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={i}
                    className="font-geist font-medium text-black text-2xl md:text-3xl mt-4 tracking-tight"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="flex flex-col gap-3 pl-1">
                    {block.items.map((item, j) => (
                      <li
                        key={j}
                        className="font-geist text-black/70 text-base leading-relaxed flex gap-3"
                      >
                        <span
                          className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: post.color }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p
                  key={i}
                  className="font-geist text-black/70 text-base md:text-lg leading-relaxed"
                >
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-16 pt-10 border-t border-black/10">
            <ArrowButton href="/blog" variant="outlineLight">
              Back to all posts
            </ArrowButton>
          </div>
        </div>
      </article>
    </main>
  );
}
