"use client";

import { useEffect, useRef } from "react";
import type { JSAnimation } from "animejs";
import Image from "next/image";
import ArrowButton from "../ArrowButton";

const services = [
  "Web Development",
  "Mobile",
  "UI / UX",
  "AI Integration",
  "Web Development",
  "Mobile",
  "UI / UX",
  "AI Integration",
];

const marqueeItems = [
  "Web Design ✦",
  "UI/UX ✦",
  "Product Design ✦",
  "App Development ✦",
  "AI Integration ✦",
  "WordPress ✦",
  "Design Systems ✦",
  "Web Design ✦",
  "UI/UX ✦",
  "Product Design ✦",
  "App Development ✦",
  "AI Integration ✦",
  "WordPress ✦",
  "Design Systems ✦",
];

export default function HeroSection() {
  const drumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animeInstance: JSAnimation | undefined;

    const initAnime = async () => {
      const { animate, cubicBezier } = await import("animejs");
      const container = drumRef.current;
      if (!container) return;

      const itemHeight = 36;
      const totalItems = services.length / 2;

      animeInstance = animate(container, {
        translateY: [`0px`, `-${itemHeight * totalItems}px`],
        duration: 8000,
        ease: cubicBezier(0.25, 0.46, 0.45, 0.94),
        loop: true,
        delay: 1200,
      });
    };

    initAnime();
    return () => {
      animeInstance?.pause();
    };
  }, []);

  return (
    <>
      <section className="relative w-screen h-screen overflow-hidden bg-[#0A0A0A]">
        {/* Background image */}
        <Image
          src="/emberloft-phoenix-logo-hero.webp"
          alt="Emberloft phoenix logo formed from glowing red particles"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0A0A0A]/70 via-[#0A0A0A]/30 to-transparent" />

        {/* ── Full height layout column ── */}
        <div className="relative z-10 flex flex-col h-full px-[5vw]">
          {/* Centered content block - sits at eye level, clears the navbar via pt floor */}
          <div className="flex-1 flex flex-col justify-center pt-28 md:pt-32">
            {/* Headline */}
            <div className="mb-8">
              <h1 className="font-geist text-[clamp(3rem,7vw,4.5rem)] font-bold leading-[1.08] sm:leading-[1.04] md:leading-none tracking-tighter text-[#F5F5F5]">
                Quiet Craft.
              </h1>
              <h1 className="font-instrument-serif text-[clamp(3rem,7vw,4.5rem)] font-normal leading-[1.08] sm:leading-[1.04] md:leading-none tracking-normal text-[#F5F5F5] italic">
                Loud
              </h1>
              <h1 className="font-geist text-[clamp(3rem,7vw,4.5rem)] font-bold leading-[1.08] sm:leading-[1.04] md:leading-none tracking-tighter text-[#F5F5F5]">
                Results.
              </h1>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <ArrowButton href="/contact" variant="solid">
                Start Your Project
              </ArrowButton>

              <ArrowButton href="/services" variant="outline">
                Explore Our Services
              </ArrowButton>
            </div>
          </div>

          {/* Watermark - anchored at the bottom of the hero, flush with content edges */}
          <div className="mb-6 md:mb-10 pointer-events-none select-none overflow-show">
            <p
              className="font-geist text-[18vw] font-medium tracking-tighter leading-none whitespace-nowrap text-[#F5F5F5] ml-[-0.02em]"
            >
              emberloft
            </p>
          </div>
        </div>

        {/* Drumroll service list - right side (hidden on mobile), aligned with navbar's right edge */}
        {/* <div className="hidden md:block absolute right-[5vw] top-1/2 -translate-y-1/2 z-20 overflow-hidden h-36">
          <div ref={drumRef} className="flex flex-col">
            {services.map((s, i) => (
              <div
                key={i}
                className="h-9 flex items-center text-white/80 text-[1vw] font-medium whitespace-nowrap"
              >
                <span className="text-white/40 mr-2">✦</span>
                {s}
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* Marquee strip - overlaps the hero's bottom edge, dissolving the watermark into it */}
      <div className="relative z-30 mt-[-8vw] w-full overflow-hidden">
        {/* Hero → marquee blend */}
        <div className="absolute inset-x-0 top-0 h-[8vw] bg-linear-to-b from-transparent to-[#0D0D0D] pointer-events-none" />

        <div className="relative bg-[#0D0D0D] mt-[8vw] pb-3 overflow-hidden">
          {/* Left / right cloud fade */}
          <div className="absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-linear-to-r from-[#0D0D0D] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-linear-to-l from-[#0D0D0D] to-transparent pointer-events-none" />

          {/* Services row */}
          <div className="flex whitespace-nowrap mb-2 overflow-hidden">
            <div className="flex animate-marquee shrink-0">
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className="text-[clamp(0.875rem,1.2vw,1.25rem)] text-white/60 font-medium mr-[3vw]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex animate-marquee shrink-0" aria-hidden="true">
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className="text-[clamp(0.875rem,1.2vw,1.25rem)] text-white/60 font-medium mr-[3vw]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Booking ticker */}
          <div className="flex whitespace-nowrap overflow-hidden">
            <div className="flex animate-marquee-slow shrink-0">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="text-[clamp(0.875rem,1.2vw,1.25rem)] mr-[2vw]"
                >
                  <span className="text-[#EEBA0B] font-medium">
                    [CURRENTLY BOOKING Q3 2026]
                  </span>
                  <span className="text-white/50">
                    {" "}
                    <span className="text-[1.6em] leading-none align-middle">
                      ·
                    </span>{" "}
                    Applications open{" "}
                    <span className="text-[1.6em] leading-none align-middle">
                      ·
                    </span>{" "}
                    A few engagements at a time{" "}
                    <span className="text-[1.6em] leading-none align-middle">
                      ·
                    </span>{" "}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
