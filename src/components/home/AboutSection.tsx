"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
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

      const cardEls = gridRef.current?.querySelectorAll(".about-card");
      if (cardEls?.length) {
        gsap.fromTo(
          cardEls,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
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
      className="w-full bg-[#F2F2F0] py-20 px-[5vw]"
    >
      {/* Top row — label + heading */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-16 mb-12">
        {/* Label */}
        <div className="flex items-center gap-2 md:pt-2 shrink-0">
          <span className="font-geist text-[#FB4B54] text-xs font-medium tracking-[0.18em] uppercase whitespace-nowrap">
            ✦ About the Studio
          </span>
        </div>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-geist text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium text-black text-left opacity-0"
          style={{ lineHeight: 1.15, letterSpacing: "-0.05em" }}
        >
          A studio of a focused few. We keep our circle small on purpose —
          fewer hands, more care. Names stay quiet. The work stays loud.
        </h2>
      </div>

      {/* Card grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {/* ── Col 1: Large card with image below text ── */}
        <div className="about-card opacity-0 bg-white rounded-2xl overflow-hidden flex flex-col sm:row-span-2">
          <div className="p-6">
            <h3 className="font-geist font-semibold text-black text-xl sm:text-2xl mb-2">
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
        <div className="flex flex-col gap-4 md:gap-6">
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
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Image with text overlay */}
          <div className="about-card opacity-0 rounded-2xl overflow-hidden relative min-h-[35vh] flex-1">
            <Image
              src="/about-3.png"
              alt="Accountable"
              fill
              className="object-cover object-center"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-geist font-semibold text-white text-xl sm:text-2xl mb-1.5 leading-tight">
                Accountable to the work.
              </h3>
              <p className="font-geist text-white/70 text-sm leading-relaxed">
                We don&apos;t ship anything we wouldn&apos;t sign.
              </p>
            </div>
          </div>

          {/* Text card 3 */}
          <div className="about-card opacity-0 bg-white rounded-2xl p-6">
            <h3 className="font-geist font-semibold text-black text-lg mb-2">
              One team, start to finish.
            </h3>
            <p className="font-geist text-black/50 text-sm leading-relaxed">
              Web, mobile, UI/UX and AI — the same hands carry it from first
              sketch to shipped product.
            </p>
          </div>

          {/* Text card 4 */}
          <div className="about-card opacity-0 bg-white rounded-2xl p-6">
            <h3 className="font-geist font-semibold text-black text-lg mb-2">
              Built to last.
            </h3>
            <p className="font-geist text-black/50 text-sm leading-relaxed">
              Clean code and clear documentation — systems we&apos;re proud
              to hand over.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}