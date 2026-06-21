"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#FB4B54";

const comparisons = [
  {
    them: "Agencies that add juniors to pad hours",
    us: "Senior hands on every task, every time",
  },
  {
    them: "Hourly rates that balloon without warning",
    us: "Fixed-price packages. No surprises.",
  },
  {
    them: "Offshore work you find out about later",
    us: "Everything built in-house, in Sri Lanka",
  },
  {
    them: "Disappear after launch",
    us: "Post-launch support included as standard",
  },
  {
    them: "Takes every project that comes through",
    us: "Maximum 5 active projects. By design.",
  },
  {
    them: "Revisions billed separately",
    us: "Revision rounds built into every package",
  },
];

export default function CompareSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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
      translateX: [40, 0],
      delay: stagger(70, { start: 300 }),
      duration: 600,
      ease: "outExpo",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F5F5F5] py-[10vh] px-[5vw]"
    >
      {/* Header */}
      <div
        ref={headingRef}
        className="mb-[7vh]"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-2 mb-[2vh]">
          <span className="text-sm" style={{ color: ACCENT }}>✦</span>
          <span className="font-geist text-xs font-medium tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
            The difference
          </span>
        </div>
        <h2
          className="font-geist text-[#0A0A0A] max-w-2xl"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: "-0.05em",
          }}
        >
          Most agencies.{" "}
          <span className="font-instrument-serif font-normal italic" style={{ color: ACCENT }}>
            Then there's us.
          </span>
        </h2>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-2 gap-4 mb-4 px-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1 1L7 7M7 1L1 7" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-geist font-semibold text-black/40 text-xs tracking-widest uppercase">
            The rest
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: ACCENT }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-geist font-semibold text-[#0A0A0A] text-xs tracking-widest uppercase">
            Emberloft
          </span>
        </div>
      </div>

      {/* Comparison rows */}
      <div className="flex flex-col gap-3">
        {comparisons.map((row, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            onMouseEnter={() => setHoveredRow(i)}
            onMouseLeave={() => setHoveredRow(null)}
            className="grid grid-cols-2 gap-4 rounded-2xl overflow-hidden cursor-default"
            style={{ opacity: 0 }}
          >
            {/* Them */}
            <div
              className="px-5 py-4 rounded-2xl transition-all duration-300"
              style={{
                backgroundColor:
                  hoveredRow === i
                    ? "rgba(0,0,0,0.07)"
                    : "rgba(0,0,0,0.045)",
              }}
            >
              <p
                className="font-geist text-sm leading-snug line-through"
                style={{ color: "rgba(0,0,0,0.4)" }}
              >
                {row.them}
              </p>
            </div>

            {/* Us */}
            <div
              className="px-5 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300"
              style={{
                backgroundColor:
                  hoveredRow === i
                    ? `${ACCENT}18`
                    : `${ACCENT}0C`,
                border: `1px solid ${hoveredRow === i ? ACCENT + "40" : "transparent"}`,
              }}
            >
              <span
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ backgroundColor: ACCENT }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke="white"
                    strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <p
                className="font-geist font-semibold text-sm leading-snug text-[#0A0A0A]"
              >
                {row.us}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-[6vh] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-[4vh] border-t border-black/10">
        <p
          className="font-geist text-black/50 max-w-sm leading-relaxed"
          style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}
        >
          Ready to work with a studio that actually gives a damn?
        </p>
        <a
          href="/contact"
          className="flex items-center gap-2 text-white font-geist font-semibold text-sm px-6 py-3.5 rounded-full hover:brightness-110 transition-all shrink-0"
          style={{ backgroundColor: ACCENT }}
        >
          Apply to work with us
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H3M8 2V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}