"use client";

import { useEffect, useRef } from "react";

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
  "Web Design /",
  "UI/UX /",
  "Product Design /",
  "App Development /",
  "AI Integration /",
  "WordPress /",
  "Design Systems /",
  "Web Design /",
  "UI/UX /",
  "Product Design /",
  "App Development /",
  "AI Integration /",
  "WordPress /",
  "Design Systems /",
];

export default function HeroSection() {
  const drumRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animeInstance: any;

    const initAnime = async () => {
      const { animate } = await import("animejs");
      const container = drumRef.current;
      if (!container) return;

      const itemHeight = 36;
      const totalItems = services.length / 2;

      animeInstance = animate(container, {
        translateY: [`0px`, `-${itemHeight * totalItems}px`],
        duration: 2500,
        ease: "cubicBezier(0.25, 0.46, 0.45, 0.94)",
        loop: true,
        delay: 1200,
      });
    };

    initAnime();
    return () => { animeInstance?.pause(); };
  }, []);

  return (
    <>
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />

      {/* ── Full height layout column ── */}
      <div className="relative z-10 flex flex-col h-full px-8 md:px-14">

        {/* Top spacer — pushes headline down from navbar */}
        <div className="pt-28 md:pt-32" />

        {/* Headline */}
        <div className="mb-8">
          <h1 className="font-geist text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tight text-white">
            Quiet Craft.
          </h1>
          <h1 className="font-instrument-serif text-5xl sm:text-6xl md:text-7xl font-normal leading-none tracking-tight text-white italic">
            Loud
          </h1>
          <h1 className="font-geist text-5xl sm:text-6xl md:text-7xl font-bold leading-none tracking-tight text-white">
            Results.
          </h1>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a
            href="#"
            className="flex items-center gap-2 bg-[#EEBA0B] text-black font-medium text-sm px-5 py-3 rounded-full hover:brightness-110 transition-all"
          >
            Apply To Work With Us
            <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
              <ArrowIcon color="white" />
            </span>
          </a>

          <a
            href="#"
            className="flex items-center gap-2 border border-white/40 text-white text-sm font-medium px-5 py-3 rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Let's Talk
            <span className="w-5 h-5 border border-white/40 rounded-full flex items-center justify-center">
              <ArrowIcon color="white" />
            </span>
          </a>
        </div>

        {/* ── Spacer that pushes watermark down ── */}
        <div className="flex-1" />

        {/* Watermark — anchored at the bottom of the hero */}
        <div
          className="mb-6 md:mb-10 pointer-events-none select-none overflow-hidden -mx-8 md:-mx-14"
        >
          <p
            className="font-geist text-[13vw] font-extrabold tracking-tighter px-6 md:px-8 leading-none whitespace-nowrap text-white"
            style={{ mixBlendMode: "exclusion" }}
          >
            emberloft
          </p>
        </div>

      </div>

      {/* Drumroll service list — right side (hidden on mobile) */}
      <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 z-20 overflow-hidden h-36">
        <div className="absolute top-0 left-0 right-0 h-8 bg-linear-to-b from-black/60 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-black/60 to-transparent z-10 pointer-events-none" />

        <div ref={drumRef} className="flex flex-col">
          {services.map((s, i) => (
            <div
              key={i}
              className="h-9 flex items-center text-white/80 text-sm font-medium whitespace-nowrap"
            >
              <span className="text-white/40 mr-2">–</span>
              {s}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Marquee strip — sits in the next viewport, below the hero */}
    <div className="relative z-20 w-full border-t border-white/10 bg-[#0D0D0D] py-3 overflow-hidden">

      {/* Services row */}
      <div className="flex whitespace-nowrap mb-1.5 overflow-hidden">
        <div className="flex animate-marquee shrink-0">
          {marqueeItems.map((item, i) => (
            <span key={i} className="text-white/60 text-sm font-medium mr-12">
              {item}
            </span>
          ))}
        </div>
        <div className="flex animate-marquee shrink-0" aria-hidden="true">
          {marqueeItems.map((item, i) => (
            <span key={i} className="text-white/60 text-sm font-medium mr-12">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Booking ticker */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee-slow shrink-0">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-xs mr-10">
              <span className="text-[#EEBA0B] font-medium">[CURRENTLY BOOKING Q3 2026]</span>
              <span className="text-white/50"> · Applications open · A few engagements at a time · </span>
            </span>
          ))}
        </div>
      </div>

    </div>
    </>
  );
}

function ArrowIcon({ color = "black" }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2 8L8 2M8 2H3M8 2V7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}