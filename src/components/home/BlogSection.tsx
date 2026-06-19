"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowButton from "../ArrowButton";
import { blogPosts } from "./blogData";

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
      {/* Top row — label + heading + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-[7vh]">
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
        <ArrowButton href="#" variant="solid">
          View All Posts
        </ArrowButton>
      </div>

      {/* Card grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {blogPosts.map((post) => (
          <a
            key={post.title}
            href="#"
            className="blog-card opacity-0 group bg-white rounded-2xl overflow-hidden flex flex-col"
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
              <h3 className="font-geist font-medium text-black text-lg mb-2 leading-tight transition-colors duration-200 group-hover:text-[#FB4B54]">
                {post.title}
              </h3>
              <p className="font-geist text-black/50 text-sm leading-relaxed mb-4 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 font-geist text-black/40 text-xs tracking-wide uppercase">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-black/20" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
