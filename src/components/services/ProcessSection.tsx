"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#EEBA0B";

const steps = [
  {
    number: "01",
    title: "Application",
    body: "You fill out the project form. We read every word: no automated filters, no sales team. Within 48 hours you hear back from the people who will actually build it.",
    detail: "Takes about 5 minutes.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Discovery Call",
    body: "A focused 45-minute call. We ask hard questions about your users, your goals, and your constraints. You leave with clarity, and so do we.",
    detail: "No pitch. Just conversation.",
    icon: "◎",
  },
  {
    number: "03",
    title: "Proposal",
    body: "A fixed-price proposal: scope, timeline, deliverables. No hourly rates, no scope creep. You know exactly what you're getting before you sign anything.",
    detail: "Delivered within 3 days.",
    icon: "▲",
  },
  {
    number: "04",
    title: "Design Sprint",
    body: "Figma first, always. We design the full experience before writing code. You get to see, feel, and approve every screen before we build it.",
    detail: "Your feedback shapes everything.",
    icon: "◈",
  },
  {
    number: "05",
    title: "Build",
    body: "Senior hands on every component. Weekly check-ins, a shared Notion board, and a staging environment you can access any time.",
    detail: "No surprises. No disappearing acts.",
    icon: "⬡",
  },
  {
    number: "06",
    title: "Launch & Beyond",
    body: "We don't ship and vanish. Launch support is included. Post-launch retainers are available. The relationship doesn't end at go-live.",
    detail: "We stay accountable.",
    icon: "✺",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
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

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    animate(cards, {
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.96, 1],
      delay: stagger(90, { start: 250 }),
      duration: 700,
      ease: "outExpo",
    });
  };

  const handleHover = async (index: number | null) => {
    setActiveStep(index);
    if (index === null) return;

    const { animate } = await import("animejs");
    const card = cardRefs.current[index];
    if (!card) return;

    animate(card, {
      scale: [1, 1.02, 1],
      duration: 300,
      ease: "outBack",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0A0A0A] py-[10vh] px-[5vw]"
    >
      {/* Header */}
      <div
        ref={headingRef}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[7vh]"
        style={{ opacity: 0 }}
      >
        <div>
          <div className="flex items-center gap-2 mb-[2vh]">
            <span className="text-sm" style={{ color: ACCENT }}>✦</span>
            <span className="font-geist text-xs font-semibold tracking-[0.18em] uppercase" style={{ color: ACCENT }}>
              How it works
            </span>
          </div>
          <h2
            className="font-geist font-medium text-white leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Six steps.{" "}
            <span className="font-instrument-serif font-normal italic text-[#FB4B54]">
              Zero guesswork.
            </span>
          </h2>
        </div>
        <p
          className="font-geist text-white/45 max-w-xs leading-relaxed md:text-right"
          style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}
        >
          A process built around clarity, not comfort.
        </p>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            onMouseEnter={() => handleHover(i)}
            onMouseLeave={() => handleHover(null)}
            className="relative rounded-2xl p-6 border cursor-default transition-all duration-300"
            style={{
              opacity: 0,
              backgroundColor:
                activeStep === i ? `${ACCENT}12` : "#151515",
              borderColor:
                activeStep === i
                  ? `${ACCENT}55`
                  : "rgba(255,255,255,0.08)",
            }}
          >
            {/* Number + icon row */}
            <div className="flex items-center justify-between mb-[3vh]">
              <span
                className="font-geist font-bold text-xs"
                style={{ color: ACCENT }}
              >
                {step.number}
              </span>
              <span
                className="text-2xl transition-transform duration-300"
                style={{
                  color: ACCENT,
                  opacity: activeStep === i ? 1 : 0.45,
                  transform: activeStep === i ? "scale(1.2)" : "scale(1)",
                }}
              >
                {step.icon}
              </span>
            </div>

            {/* Title */}
            <h3
              className="font-geist font-medium text-white mb-3 leading-tight"
              style={{ fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)" }}
            >
              {step.title}
            </h3>

            {/* Body */}
            <p
              className="font-geist text-white/55 leading-relaxed mb-4 text-sm"
            >
              {step.body}
            </p>

            {/* Bottom detail */}
            <div
              className="flex items-center gap-2 pt-4 border-t"
              style={{
                borderColor: activeStep === i
                  ? `${ACCENT}35`
                  : "rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="font-geist text-xs"
                style={{ color: activeStep === i ? ACCENT : "rgba(255,255,255,0.35)" }}
              >
                {step.detail}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}