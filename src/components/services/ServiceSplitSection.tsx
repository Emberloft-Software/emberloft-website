"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#FB4B54";

const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "From fast static sites to complex fullstack platforms. We build with Next.js, React, Node.js, and Firebase, whatever the project demands. Every line written in-house.",
    tags: ["Next.js", "React", "Node.js", "Firebase", "WordPress"],
    stat: "48+ sites shipped",
  },
  {
    number: "02",
    title: "Mobile Apps",
    description:
      "Native-feeling cross-platform apps built in Flutter. Authentication, real-time data, payments, push notifications: the full stack, not just the screens.",
    tags: ["Flutter", "iOS", "Android", "Firebase", "REST APIs"],
    stat: "Play Store + App Store ready",
  },
  {
    number: "03",
    title: "UI / UX Design",
    description:
      "Design that earns its place. We start with Figma, build component systems, and prototype every interaction before a single line of code gets written.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    stat: "Component-first always",
  },
  {
    number: "04",
    title: "AI Integration",
    description:
      "Embedding real intelligence into products, not gimmicks. LLM integration, automation pipelines, and AI-assisted workflows that actually move the needle.",
    tags: ["OpenAI", "Claude", "LangChain", "Automation"],
    stat: "Real utility, not demos",
  },
  {
    number: "05",
    title: "Social Media & Content",
    description:
      "AI-assisted content production at a fraction of agency rates. Designed posts, scripted reels, content calendars, and performance reports, monthly.",
    tags: ["Instagram", "Facebook", "TikTok", "AI Video", "Copywriting"],
    stat: "From Rs 7,000/month",
  },
];

export default function ServiceSplitSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
          runEntrance();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const runEntrance = async () => {
    const { animate, stagger } = await import("animejs");
    if (headingRef.current) {
      animate(headingRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        ease: "outExpo",
      });
    }
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    animate(rows, {
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: stagger(80, { start: 250 }),
      duration: 600,
      ease: "outExpo",
    });
    if (detailRef.current) {
      animate(detailRef.current, {
        opacity: [0, 1],
        translateX: [30, 0],
        duration: 700,
        delay: 400,
        ease: "outExpo",
      });
    }
  };

  useEffect(() => {
    if (prevIndex === null) return;
    const run = async () => {
      const { animate } = await import("animejs");
      if (detailRef.current) {
        await animate(detailRef.current, {
          opacity: [1, 0],
          translateY: [0, -10],
          duration: 160,
          ease: "inQuad",
        });
        animate(detailRef.current, {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 320,
          ease: "outExpo",
        });
      }
    };
    run();
  }, [activeIndex, prevIndex]);

  const handleSelect = (i: number) => {
    if (i === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(i);
  };

  const active = services[activeIndex];

  return (
    <section ref={sectionRef} className="w-full bg-[#F5F5F5] py-[10vh] px-[5vw]">
      {/* Header */}
      <div ref={headingRef} className="mb-[7vh]" style={{ opacity: 0 }}>
        <div className="flex items-center gap-2 mb-[2vh]">
          <span className="text-sm" style={{ color: ACCENT }}>✦</span>
          <span className="font-geist text-xs font-medium tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            What we do
          </span>
        </div>
        <h2
          className="font-geist text-[#0A0A0A] max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: "-0.05em",
          }}
        >
          Five disciplines.{" "}
          <span className="font-instrument-serif font-normal italic" style={{ color: ACCENT, letterSpacing: "0" }}>
            One standard.
          </span>
        </h2>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[4vw] items-start">

        {/* Left - service list */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { rowRefs.current[i] = el; }}
              onMouseEnter={() => handleSelect(i)}
              className="opacity-0 group relative flex items-center justify-between py-[2.5vh] cursor-pointer border-b"
              style={{ borderColor: "rgba(10,10,10,0.08)" }}
            >
              {/* Active left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.75 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: ACCENT,
                  opacity: activeIndex === i ? 1 : 0,
                }}
              />

              <div className="flex items-center gap-4 pl-4">
                <span
                  className="font-geist font-semibold text-xs tabular-nums shrink-0"
                  style={{ color: activeIndex === i ? ACCENT : "rgba(10,10,10,0.3)" }}
                >
                  [{service.number}]
                </span>
                <h3
                  className="font-geist transition-all duration-300"
                  style={{
                    fontSize: "clamp(1.6rem, 3.2vw, 2.8rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.03em",
                    color: activeIndex === i ? "#0A0A0A" : "rgba(10,10,10,0.3)",
                  }}
                >
                  {service.title}
                </h3>
              </div>

              {/* Arrow */}
              <div
                className="transition-all duration-300 shrink-0"
                style={{ opacity: activeIndex === i ? 1 : 0.2 }}
              >
                <svg width="clamp(22px, 2.4vw, 32px)" height="clamp(22px, 2.4vw, 32px)" viewBox="0 0 44 44" fill="none">
                  <path
                    d="M10 34L34 10M34 10H14M34 10V30"
                    stroke="#0A0A0A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Right - sticky detail panel */}
        <div
          ref={detailRef}
          className="opacity-0 flex flex-col gap-[3vh] lg:sticky lg:top-[12vh] rounded-3xl p-8 md:p-10"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          <span
            className="font-geist font-semibold text-xs tracking-[0.18em] uppercase"
            style={{ color: ACCENT }}
          >
            [{active.number}]
          </span>

          <h4 className="font-geist font-medium text-white text-2xl md:text-3xl leading-tight" style={{ letterSpacing: "-0.03em" }}>
            {active.title}
          </h4>

          <p className="font-geist text-white/55 leading-relaxed">
            {active.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {active.tags.map((tag, i) => (
              <span
                key={i}
                className="font-geist text-xs text-white/70 border border-white/15 rounded-full px-3 py-1.5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="rounded-2xl px-6 py-5 border mt-[1vh]"
            style={{ borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}14` }}
          >
            <p className="font-geist font-medium text-xl mb-1" style={{ color: ACCENT }}>
              {active.stat}
            </p>
            <p className="font-geist text-xs text-white/40">See pricing →</p>
          </div>

          <a
            href="/contact"
            className="flex items-center justify-center gap-2 font-geist font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 hover:brightness-110"
            style={{ backgroundColor: ACCENT, color: "white" }}
          >
            Start a project
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H3M8 2V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
