"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowButton from "../ArrowButton";
import { blogPosts } from "./blogData";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [featured, ...rest] = blogPosts;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      const cardEls = gridRef.current?.querySelectorAll(".blog-card");
      if (cardEls?.length) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen bg-[#F5F5F5] py-[12vh] px-[5vw]"
    >
      {/* Top row - label + heading + CTA */}
      <div className="flex flex-col items-start sm:flex-row sm:items-end justify-between gap-6 mb-[7vh]">
        <div>
          <div className="flex items-center gap-2 mb-[2vh]">
            <span className="font-geist text-[#FB4B54] text-xs font-medium tracking-[0.18em] uppercase">
              ✦ From the Studio
            </span>
          </div>
          <h2
            ref={headingRef}
            className="font-geist font-medium text-black leading-tight opacity-0"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.05em" }}
          >
            Notes on the{" "}
            <span className="font-instrument-serif font-normal italic text-[#FB4B54]">
              work.
            </span>
          </h2>
        </div>
        <ArrowButton href="/blog" variant="solid">
          View All Posts
        </ArrowButton>
      </div>

      {/* Large featured post + 2 small posts, all in one row */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-start">
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="blog-card opacity-0 group bg-white rounded-2xl overflow-hidden flex flex-col sm:col-span-2"
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="50vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <span className="font-geist text-black/40 text-xs font-semibold tracking-widest uppercase">
                {featured.category}
              </span>
              <h3 className="font-geist font-medium text-black text-xl md:text-2xl mt-2 mb-3 leading-tight transition-colors duration-200 group-hover:text-[#FB4B54]">
                {featured.title}
              </h3>
              <p className="font-geist text-black/50 text-sm leading-relaxed mb-4 flex-1">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2 font-geist text-black/40 text-xs tracking-wide uppercase">
                <span>{featured.date}</span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <span>{featured.readTime}</span>
              </div>
            </div>
          </Link>
        )}

        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="blog-card opacity-0 group bg-white rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="25vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5 md:p-6 flex flex-col min-w-0">
              <span className="font-geist text-black/40 text-xs font-semibold tracking-widest uppercase">
                {post.category}
              </span>
              <h3 className="font-geist font-medium text-black text-base md:text-lg mt-1 mb-2 leading-tight line-clamp-2 min-h-10 md:min-h-11 transition-colors duration-200 group-hover:text-[#FB4B54]">
                {post.title}
              </h3>
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
  );
}
