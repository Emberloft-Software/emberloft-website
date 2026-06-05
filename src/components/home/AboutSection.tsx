"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cards = [
  {
    type: "text-large",
    title: "Craft over volume.",
    body: "A studio of a focused few. We keep our circle small on purpose — fewer hands, more care. Names stay quiet. The work stays loud.",
    image: "/about-1.png", // tall portrait image
  },
  {
    type: "text-only",
    title: "Strategy before surface.",
    body: "Beauty without reasoning is decoration. We start with the why.",
  },
  {
    type: "text-only",
    title: "Senior hands only.",
    body: "The people who pitch are the people who build.",
  },
  {
    type: "image-only",
    image: "/about-2.jpg", // person selfie / mid image
  },
  {
    type: "text-only",
    title: "Strategy before surface.",
    body: "Beauty without reasoning is decoration. We start with the why.",
  },
  {
    type: "image-overlay",
    title: "Accountable to the work.",
    body: "We don't ship anything we wouldn't sign.",
    image: "/about-3.png", // dark portrait image
  },
  {
    type: "text-only",
    title: "Senior hands only.",
    body: "The people who pitch are the people who build.",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          runAnimation();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const runAnimation = async () => {
    const { animate, stagger } = await import("animejs");

    if (headingRef.current) {
      animate(headingRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        ease: "easeOutExpo",
      });
    }

    const cards = gridRef.current?.querySelectorAll(".about-card");
    if (cards) {
      animate(cards, {
        opacity: [0, 1],
        translateY: [40, 0],
        delay: stagger(80, { start: 200 }),
        duration: 700,
        ease: "easeOutExpo",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F2F2F0] py-20 px-6 md:px-12 lg:px-20"
    >
      {/* Top row — label + heading */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 mb-12">
        {/* Label */}
        <div className="flex items-center gap-2 md:pt-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FB4B54]" />
          <span className="font-geist text-[#FB4B54] text-xs font-medium tracking-[0.18em] uppercase whitespace-nowrap">
            About the Studio
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-geist text-[clamp(1.6rem,3.2vw,2.6rem)] font-extrabold text-black leading-tight opacity-0"
        >
          A studio of a focused few. We keep our circle small on purpose —
          fewer hands, more care. Names stay quiet. The work stays loud.
        </h2>
      </div>

      {/* Card grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {/* ── Col 1: Large card with image below text ── */}
        <div className="about-card opacity-0 bg-white rounded-2xl overflow-hidden flex flex-col sm:row-span-2">
          <div className="p-6">
            <h3 className="font-geist font-semibold text-black text-lg mb-2">
              Craft over volume.
            </h3>
            <p className="font-geist text-black/50 text-sm leading-relaxed">
              A studio of a focused few. We keep our circle small on purpose —
              fewer hands, more care. Names stay quiet. The work stays loud.
            </p>
          </div>
          <div className="relative flex-1 min-h-[30vh]">
            <Image
              src="/about-1.png"
              alt="Craft"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* ── Col 2: Two text cards + one image card ── */}
        <div className="flex flex-col gap-4">
          {/* Text card 1 */}
          <div className="about-card opacity-0 bg-white rounded-2xl p-6">
            <h3 className="font-geist font-semibold text-black text-lg mb-2">
              Strategy before surface.
            </h3>
            <p className="font-geist text-black/50 text-sm leading-relaxed">
              Beauty without reasoning is decoration. We start with the why.
            </p>
          </div>

          {/* Text card 2 */}
          <div className="about-card opacity-0 bg-white rounded-2xl p-6">
            <h3 className="font-geist font-semibold text-black text-lg mb-2">
              Senior hands only.
            </h3>
            <p className="font-geist text-black/50 text-sm leading-relaxed">
              The people who pitch are the people who build.
            </p>
          </div>

          {/* Image card */}
          <div className="about-card opacity-0 rounded-2xl overflow-hidden relative min-h-[70vh]">
            <Image
              src="/about-2.jpg"
              alt="Team"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* ── Col 3: Image with overlay + two text cards ── */}
        <div className="flex flex-col gap-4">
          {/* Image with text overlay */}
          <div className="about-card opacity-0 rounded-2xl overflow-hidden relative min-h-[35vh] flex-1">
            <Image
              src="/about-3.png"
              alt="Accountable"
              fill
              className="object-cover object-center"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-geist font-semibold text-white text-xl mb-1.5 leading-tight">
                Accountable to the work.
              </h3>
              <p className="font-geist text-white/70 text-sm leading-relaxed">
                We don't ship anything we wouldn't sign.
              </p>
            </div>
          </div>

          {/* Text card 3 */}
          <div className="about-card opacity-0 bg-white rounded-2xl p-6">
            <h3 className="font-geist font-semibold text-black text-lg mb-2">
              Strategy before surface.
            </h3>
            <p className="font-geist text-black/50 text-sm leading-relaxed">
              Beauty without reasoning is decoration. We start with the why.
            </p>
          </div>

          {/* Text card 4 */}
          <div className="about-card opacity-0 bg-white rounded-2xl p-6">
            <h3 className="font-geist font-semibold text-black text-lg mb-2">
              Senior hands only.
            </h3>
            <p className="font-geist text-black/50 text-sm leading-relaxed">
              The people who pitch are the people who build.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}