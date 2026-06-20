"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 48,
    suffix: "+",
    label: "Projects shipped",
    description: "Across SaaS, fintech, healthcare, and consumer.",
  },
  {
    value: 6,
    suffix: "yrs",
    label: "In practice",
    description: "Not a new studio. A refined one.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Senior team",
    description: "No juniors. No outsourcing. Ever.",
  },
  {
    value: 3,
    suffix: "–5",
    label: "Active projects max",
    description: "By design. Focus is the product.",
  },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const runAnimation = async () => {
    const { animate, createTimeline, stagger } = await import("animejs");

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    // Heading block slides up
    tl.add(headingRef.current!, {
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 700,
    });

    // Dividers draw left to right - staggered
    const dividers = dividerRefs.current.filter(Boolean) as HTMLDivElement[];
    tl.add(dividers, {
      scaleX: [0, 1],
      duration: 600,
      delay: stagger(80),
      ease: "outQuart",
    }, "-=400");

    // Stat cards fade + rise staggered
    const statEls = statRefs.current.filter(Boolean) as HTMLDivElement[];
    tl.add(statEls, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 600,
      delay: stagger(100),
    }, "-=500");

    // Numbers count up - each one individually
    stats.forEach((stat, i) => {
      const el = numRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      tl.add(obj, {
        val: stat.value,
        duration: 1400,
        ease: "outExpo",
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toString();
        },
      }, `-=${i === 0 ? 400 : 1300}`);
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0D0D0D] py-[10vh] px-[5vw] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">

        {/* Top row - label + heading */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-[7vh]"
          style={{ opacity: 0 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-[2vh]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EEBA0B]" />
              <span className="font-geist text-[#EEBA0B] text-xs font-semibold tracking-[0.18em] uppercase">
                By the numbers
              </span>
            </div>
            <h2
              className="font-geist font-black text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Small studio.{" "}
              <span className="font-instrument-serif font-normal italic text-[#EEBA0B]">
                Serious
              </span>{" "}
              output.
            </h2>
          </div>

          <p
            className="font-geist text-white/30 max-w-xs leading-relaxed text-right hidden sm:block"
            style={{ fontSize: "clamp(0.8rem, 1vw, 0.95rem)" }}
          >
            Numbers don't tell the whole story. But ours are worth knowing.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div key={i} className="relative">

              {/* Top divider - animates scaleX from 0 */}
              <div
                ref={(el) => { dividerRefs.current[i] = el; }}
                className="h-px w-full mb-[3vh]"
                style={{
                  backgroundColor:
                    i % 2 === 0
                      ? "rgba(238,186,11,0.4)"
                      : "rgba(251,75,84,0.4)",
                  transformOrigin: "left center",
                  transform: "scaleX(0)",
                }}
              />

              {/* Stat content */}
              <div
                ref={(el) => { statRefs.current[i] = el; }}
                className="pr-8 pb-[4vh]"
                style={{ opacity: 0 }}
              >
                {/* Number */}
                <div
                  className="font-geist font-black text-white leading-none mb-[2vh] flex items-end gap-1"
                  style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
                >
                  <span ref={(el) => { numRefs.current[i] = el; }}>
                    0
                  </span>
                  <span
                    className="font-instrument-serif font-normal italic"
                    style={{
                      fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                      color: i % 2 === 0 ? "#EEBA0B" : "#FB4B54",
                      paddingBottom: "0.1em",
                    }}
                  >
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <p
                  className="font-geist font-bold text-white mb-2"
                  style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
                >
                  {stat.label}
                </p>

                {/* Description */}
                <p
                  className="font-geist text-white/30 leading-relaxed"
                  style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)" }}
                >
                  {stat.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom rule + closing line */}
        <div className="border-t border-white/5 pt-[4vh] mt-[2vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p
            className="font-geist text-white/20 text-xs tracking-widest uppercase"
          >
            Est. in craft. Not in hype.
          </p>
          <div className="flex items-center gap-3">
            <span
              className="w-8 h-px"
              style={{ backgroundColor: "#EEBA0B", display: "inline-block" }}
            />
            <span className="font-geist text-white/20 text-xs tracking-widest uppercase">
              Emberloft Studio
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}