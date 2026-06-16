"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "We listen first.",
    body: "Every engagement starts with deep discovery. We don't pitch until we understand.",
    color: "#EEBA0B",
  },
  {
    number: "02",
    title: "We design with intent.",
    body: "No decoration for its own sake. Every decision has a reason behind it.",
    color: "#FB4B54",
  },
  {
    number: "03",
    title: "We build it ourselves.",
    body: "Senior hands only. The people who designed it are the people who built it.",
    color: "#EEBA0B",
  },
  {
    number: "04",
    title: "We stay accountable.",
    body: "We don't disappear after launch. The work is ours to stand behind.",
    color: "#FB4B54",
  },
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);

  const runAnimation = useCallback(async () => {
    const { createTimeline } = await import("animejs");

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    // Heading slides in
    tl.add(headingRef.current!, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 700,
    });

    // Each step: dot pops in, then card slides in from left
    steps.forEach((_, i) => {
      const dot = dotRefs.current[i];
      const step = stepRefs.current[i];

      tl.add(dot!, {
        scale: [0, 1.3, 1],
        opacity: [0, 1],
        duration: 400,
        ease: "outBack",
      }, i === 0 ? "-=200" : "-=100");

      tl.add(step!, {
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 500,
      }, "-=300");
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated, runAnimation]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0D0D0D] py-[10vh] px-[5vw] overflow-hidden"
    >
      {/* Label */}
      <div className="flex items-center gap-2 mb-[2.5vh]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#EEBA0B]" />
        <span className="font-geist text-[#EEBA0B] text-xs font-semibold tracking-[0.18em] uppercase">
          How We Work
        </span>
      </div>

      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-geist font-black text-white leading-tight mb-[7vh] opacity-0"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
      >
        A process built for{" "}
        <span className="font-instrument-serif font-normal italic text-[#EEBA0B]">
          craft.
        </span>
      </h2>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0 max-w-2xl">

        {/* Vertical line track */}
        <div
          className="absolute left-4.75 top-5 bottom-5 w-px"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />

        {steps.map((step, i) => (
          <div key={i} className="relative flex gap-6 pb-[5vh] last:pb-0">

            {/* Dot */}
            <div className="relative z-10 shrink-0 flex flex-col items-center">
              <div
                ref={(el) => { dotRefs.current[i] = el; }}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: step.color,
                  opacity: 0,
                  transform: "scale(0)",
                  boxShadow: `0 0 20px ${step.color}55`,
                }}
              >
                <span className="font-geist font-black text-black text-xs">
                  {step.number}
                </span>
              </div>

              {/* Connecting line segment — filled after dot appears */}
              {i < steps.length - 1 && (
                <div
                  className="w-px flex-1 mt-2"
                  style={{ backgroundColor: step.color, opacity: 0.2, minHeight: "4vh" }}
                />
              )}
            </div>

            {/* Card */}
            <div
              ref={(el) => { stepRefs.current[i] = el; }}
              className="flex-1 pb-2"
              style={{ opacity: 0 }}
            >
              <h3
                className="font-geist font-black text-white mb-2 leading-tight"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
              >
                {step.title}
              </h3>
              <p
                className="font-geist leading-relaxed"
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                }}
              >
                {step.body}
              </p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}