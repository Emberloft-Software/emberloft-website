"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArrowButton from "../ArrowButton";
import { projects } from "./projectsData";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Each card shrinks and dims as the next panel scrolls in over it
      projects.forEach((_, i) => {
        if (i === projects.length - 1) return;
        const card = cardRefs.current[i];
        const nextPanel = panelRefs.current[i + 1];
        if (!card || !nextPanel) return;

        gsap.to(card, {
          scale: 0.88,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: nextPanel,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#0D0D0D]">
      {/* Header - scrolls normally, sits above the pinned stack */}
      <div className="px-[5vw] pt-[10vh] pb-[10vh] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-[2vh]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FB4B54]" />
            <span className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.18em] uppercase">
              Sample Work
            </span>
          </div>
          <h2
            ref={headingRef}
            className="font-geist font-medium text-white leading-tight opacity-0"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            Work we made{" "}
            <span className="font-instrument-serif font-normal italic text-[#FB4B54]">
              on our own.
            </span>
          </h2>
        </div>
        <ArrowButton href="#" variant="outline">
          See More Samples
        </ArrowButton>
      </div>

      {/* Pinned stack - each panel sticks to the top of the viewport; the
          card underneath shrinks and dims as the next one slides over it. */}
      {projects.map((project, i) => (
        <div
          key={project.number}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          className="sticky top-0 h-screen flex items-start justify-center px-[5vw] pt-[15vh]"
          style={{ zIndex: i + 1 }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="group relative w-full rounded-2xl overflow-hidden"
            style={{ height: "80vh", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)" }}
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="90vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10" />

            <span
              className="absolute top-6 right-6 font-geist font-medium text-white/10 leading-none select-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              {project.number}
            </span>

            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pt-6 md:pt-10 pb-[5vh] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span
                  className="font-geist text-xs font-semibold tracking-[0.18em] uppercase"
                  style={{ color: project.color }}
                >
                  {project.category}
                </span>
                <h3
                  className="font-geist font-medium text-white leading-tight mt-2"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", letterSpacing: "-0.03em" }}
                >
                  {project.title}
                </h3>
                <p className="font-geist text-white/50 text-sm leading-relaxed max-w-md mt-2">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end sm:max-w-xs">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-geist text-xs text-white/70 border border-white/15 rounded-full px-3 py-1 whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Closing spacer - mirrors the header's pt-[10vh] so the section
          has an intentional bottom margin instead of relying on the
          last card's incidental gap before the next section. */}
      <div className="h-[10vh] bg-[#0D0D0D]" />
    </section>
  );
}
