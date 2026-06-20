"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Web Development",
    subtitle: "Static · WordPress · Fullstack",
    description:
      "From fast static sites to complex fullstack platforms. We build with Next.js, React, Node.js, and Firebase, whatever the project demands. Every line written in-house.",
    tags: ["Next.js", "React", "Node.js", "Firebase", "WordPress"],
    stat: "48+ sites shipped",
    bg: "#F2F2F0",
    accent: "#FB4B54",
  },
  {
    number: "02",
    title: "Mobile Apps",
    subtitle: "Flutter · iOS · Android",
    description:
      "Native-feeling cross-platform apps built in Flutter. Authentication, real-time data, payments, push notifications: the full stack, not just the screens.",
    tags: ["Flutter", "iOS", "Android", "Firebase", "REST APIs"],
    stat: "Play Store + App Store ready",
    bg: "#0D0D0D",
    accent: "#EEBA0B",
  },
  {
    number: "03",
    title: "UI / UX Design",
    subtitle: "Figma · Systems · Prototypes",
    description:
      "Design that earns its place. We start with Figma, build component systems, and prototype every interaction before a single line of code gets written.",
    tags: ["Figma", "Design Systems", "Prototyping", "User Research"],
    stat: "Component-first always",
    bg: "#F2F2F0",
    accent: "#290052",
  },
  {
    number: "04",
    title: "AI Integration",
    subtitle: "LLMs · Automation · Pipelines",
    description:
      "Embedding real intelligence into products, not gimmicks. LLM integration, automation pipelines, and AI-assisted workflows that actually move the needle.",
    tags: ["OpenAI", "Claude", "LangChain", "Automation"],
    stat: "Real utility, not demos",
    bg: "#0D0D0D",
    accent: "#FB4B54",
  },
  {
    number: "05",
    title: "Social Media & Content",
    subtitle: "Posts · Reels · Strategy",
    description:
      "AI-assisted content production at a fraction of agency rates. Designed posts, scripted reels, content calendars, and performance reports, monthly.",
    tags: ["Instagram", "Facebook", "TikTok", "AI Video", "Copywriting"],
    stat: "From Rs 7,000/month",
    bg: "#F2F2F0",
    accent: "#FB4B54",
  },
];

export default function ServiceRowsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const runEntrance = async () => {
    const { animate, stagger } = await import("animejs");
    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    animate(rows, {
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: stagger(80),
      duration: 600,
      ease: "outExpo",
    });
  };

  const toggleRow = async (index: number) => {
    const { animate } = await import("animejs");
    const isOpening = openIndex !== index;

    // Close current
    if (openIndex !== null) {
      const prev = answerRefs.current[openIndex];
      if (prev) {
        animate(prev, {
          height: [prev.scrollHeight, 0],
          opacity: [1, 0],
          duration: 280,
          ease: "inQuad",
        });
      }
    }

    setOpenIndex(isOpening ? index : null);

    // Open new
    if (isOpening) {
      const next = answerRefs.current[index];
      if (next) {
        await new Promise((r) => setTimeout(r, 20));
        animate(next, {
          height: [0, next.scrollHeight],
          opacity: [0, 1],
          duration: 420,
          ease: "outExpo",
        });
      }
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#F2F2F0]">
      {services.map((service, i) => {
        const isDark = service.bg === "#0D0D0D";
        const isOpen = openIndex === i;

        return (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="w-full border-b"
            style={{
              backgroundColor: service.bg,
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
              opacity: 0,
            }}
          >
            {/* Row header - clickable */}
            <button
              onClick={() => toggleRow(i)}
              className="w-full flex items-center justify-between px-[5vw] group"
              style={{ paddingTop: "clamp(1.5rem, 3vh, 2.5rem)", paddingBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
            >
              <div className="flex items-center gap-6 md:gap-12 text-left">
                {/* Number */}
                <span
                  className="font-geist font-black shrink-0 tabular-nums"
                  style={{
                    fontSize: "clamp(0.7rem, 1vw, 0.875rem)",
                    color: service.accent,
                  }}
                >
                  [{service.number}]
                </span>

                {/* Title */}
                <span
                  className="font-geist font-black leading-none transition-colors duration-300"
                  style={{
                    fontSize: "clamp(1.8rem, 4.5vw, 4rem)",
                    color: isOpen
                      ? service.accent
                      : isDark
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(0,0,0,0.9)",
                  }}
                >
                  {service.title}
                </span>

                {/* Subtitle - hidden on small screens */}
                <span
                  className="font-geist hidden md:block"
                  style={{
                    fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
                    color: isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
                  }}
                >
                  {service.subtitle}
                </span>
              </div>

              {/* Arrow icon */}
              <div
                className="shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-400"
                style={{
                  borderColor: isOpen
                    ? service.accent
                    : isDark
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(0,0,0,0.12)",
                  backgroundColor: isOpen ? service.accent : "transparent",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path
                    d="M6.5 1V12M1 6.5H12"
                    stroke={isOpen ? (service.accent === "#EEBA0B" ? "black" : "white") : isDark ? "white" : "black"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </button>

            {/* Expandable content */}
            <div
              ref={(el) => { answerRefs.current[i] = el; }}
              style={{
                height: i === 0 ? "auto" : 0,
                opacity: i === 0 ? 1 : 0,
                overflow: "hidden",
              }}
            >
              <div className="px-[5vw] pb-[4vh]">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 max-w-5xl">

                  {/* Left - description */}
                  <div className="flex-1">
                    <p
                      className="font-geist leading-relaxed mb-6"
                      style={{
                        fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                        color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                      }}
                    >
                      {service.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, j) => (
                        <span
                          key={j}
                          className="font-geist text-xs font-medium px-3 py-1.5 rounded-full border"
                          style={{
                            borderColor: `${service.accent}40`,
                            color: service.accent,
                            backgroundColor: `${service.accent}0D`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right - stat + CTA */}
                  <div className="flex flex-col gap-4 shrink-0">
                    <div
                      className="rounded-2xl px-6 py-5 border"
                      style={{
                        borderColor: `${service.accent}25`,
                        backgroundColor: `${service.accent}0A`,
                      }}
                    >
                      <p
                        className="font-geist font-black text-2xl mb-1"
                        style={{ color: service.accent }}
                      >
                        {service.stat}
                      </p>
                      <p
                        className="font-geist text-xs"
                        style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}
                      >
                        See pricing →
                      </p>
                    </div>

                    <a
                      href="/contact"
                      className="flex items-center justify-center gap-2 font-geist font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:brightness-110"
                      style={{
                        backgroundColor: service.accent,
                        color: service.accent === "#EEBA0B" ? "black" : "white",
                      }}
                    >
                      Start a project
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M8 2H3M8 2V7"
                          stroke={service.accent === "#EEBA0B" ? "black" : "white"}
                          strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}