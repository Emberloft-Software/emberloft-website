"use client";

import { useEffect, useRef, useState } from "react";
import ArrowButton from "../ArrowButton";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Marketing sites and product surfaces built to look exceptional and perform like infrastructure.",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    image: "/services-1.mp4",
  },
  {
    number: "02",
    title: "Mobile",
    description:
      "Native-feeling mobile experiences that work seamlessly across every device and platform.",
    tags: ["React Native", "iOS", "Android", "Expo"],
    image: "/services-1.mp4",
  },
  {
    number: "03",
    title: "UI / UX",
    description:
      "Interfaces designed with intention: every interaction considered, every pixel deliberate.",
    tags: ["Figma", "Prototyping", "Design Systems", "User Research"],
    image: "/services-1.mp4",
  },
  {
    number: "04",
    title: "AI Integration",
    description:
      "Embedding intelligence into products without the gimmicks. Real utility, real results.",
    tags: ["LLM Integration", "Automation", "Claude", "OpenAI"],
    image: "/services-1.mp4",
  },
];

export default function ServicesSectionPixelBgV3() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animated, setAnimated] = useState(false);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const runEntrance = async () => {
    const { animate, stagger } = await import("animejs");

    if (headingRef.current) {
      animate(headingRef.current, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 900,
        ease: "easeOutExpo",
      });
    }

    const rows = rowRefs.current.filter(Boolean);
    animate(rows, {
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: stagger(100, { start: 300 }),
      duration: 700,
      ease: "easeOutExpo",
    });

    if (detailRef.current) {
      animate(detailRef.current, {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 800,
        delay: 500,
        ease: "easeOutExpo",
      });
    }
  };

  // Entrance animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          runEntrance();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  // Animate detail panel when active index changes
  useEffect(() => {
    if (prevIndex === null) return;
    const runSwitch = async () => {
      const { animate } = await import("animejs");
      if (detailRef.current) {
        await animate(detailRef.current, {
          opacity: [1, 0],
          translateY: [0, -12],
          duration: 180,
          ease: "easeInQuad",
        });
        animate(detailRef.current, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 300,
          ease: "easeOutExpo",
        });
      }
      if (imageRef.current) {
        await animate(imageRef.current, {
          opacity: [1, 0],
          scale: [1, 0.97],
          duration: 180,
          ease: "easeInQuad",
        });
        animate(imageRef.current, {
          opacity: [0, 1],
          scale: [1.03, 1],
          duration: 350,
          ease: "easeOutExpo",
        });
      }
    };
    runSwitch();
  }, [activeIndex, prevIndex]);

  const handleHover = (i: number) => {
    if (i === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(i);
  };

  const active = services[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-screen overflow-hidden py-[12vh] px-[5vw] bg-[#0A0A0A]"
    >
      <div className="relative z-10">

      {/* Label */}
      <div className="flex items-center gap-2 mb-[3vh]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EEBA0B]" />
        <span className="font-geist text-[#EEBA0B] text-xs font-medium tracking-[0.18em] uppercase">
          What We Do
        </span>
      </div>

      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-geist text-[clamp(2rem,5vw,4rem)] font-medium text-white leading-tight mb-[6vh] opacity-0"
        style={{ letterSpacing: "-0.05em" }}
      >
        Four disciplines.{" "}
        <span
          className="font-instrument-serif font-normal italic text-[#EEBA0B]"
          style={{ letterSpacing: "0" }}
        >
          One
        </span>{" "}
        standard.
      </h2>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4vw] items-start">

        {/* Left - service rows */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { rowRefs.current[i] = el; }}
              onMouseEnter={() => handleHover(i)}
              className="opacity-0 group relative flex items-center justify-between py-[2.5vh] cursor-pointer"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Active left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.75 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: activeIndex === i ? "#FB4B54" : "transparent",
                  opacity: activeIndex === i ? 1 : 0,
                }}
              />

              <h3
                className="font-geist font-medium transition-all duration-300 pl-4"
                style={{
                  fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
                  letterSpacing: "-0.05em",
                  color: activeIndex === i ? "white" : "rgba(255,255,255,0.25)",
                }}
              >
                {service.title}
                <sup
                  className="font-geist font-semibold text-[0.35em] ml-1 align-super tracking-wider transition-colors duration-300"
                  style={{
                    color: activeIndex === i ? "#FB4B54" : "rgba(255,255,255,0.2)",
                  }}
                >
                  [{service.number}]
                </sup>
              </h3>

              {/* Arrow */}
              <div
                className="transition-all duration-300"
                style={{
                  opacity: activeIndex === i ? 1 : 0.2,
                  transform: activeIndex === i ? "rotate(0deg)" : "rotate(0deg)",
                }}
              >
                <svg
                  width="clamp(28px, 3vw, 44px)"
                  height="clamp(28px, 3vw, 44px)"
                  viewBox="0 0 44 44"
                  fill="none"
                >
                  <path
                    d="M10 34L34 10M34 10H14M34 10V30"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Right - detail panel */}
        <div
          ref={detailRef}
          className="opacity-0 flex flex-col gap-[2vh] lg:sticky lg:top-[12vh]"
        >

          {/* Video */}
            <div
            ref={imageRef}
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ height: "clamp(180px, 25vh, 320px)" }}
            >
            <video
                key={active.image}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover object-center"
            >
                <source src={active.image} type="video/mp4" />
            </video>
            </div>

          {/* Text details */}
          <div>
            <h4 className="font-geist font-medium text-white text-lg mb-[1vh]">
              {active.title}
            </h4>
            <p className="font-geist text-white/50 text-sm leading-relaxed mb-[2vh]">
              {active.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {active.tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-geist text-xs text-white/70 border border-white/20 rounded-full px-3 py-1.5 hover:border-white/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CTA - direct to pricing */}
      <div className="mt-[6vh]">
        <ArrowButton href="/pricing" variant="solid">
          View Pricing
        </ArrowButton>
      </div>
      </div>
    </section>
  );
}
