"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const items = [
  "take every project.",
  "outsource the thinking.",
  "disappear after launch.",
  "race to the cheapest price.",
  "do template work.",
];

export default function WorkSectionCrossedList() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const strikeRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      strikeRefs.current.forEach((strike, i) => {
        if (!strike) return;
        gsap.fromTo(
          strike,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "expo.out",
            duration: 0.6,
            scrollTrigger: {
              trigger: strike,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: i * 0.05,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen bg-[#F2F2F0] py-[12vh] px-[5vw]"
    >
      <div className="flex items-center gap-2 mb-[6vh]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FB4B54]" />
        <span className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.18em] uppercase">
          Concept 03 — Crossed-out List
        </span>
      </div>

      <h2
        className="font-instrument-serif italic font-normal text-black mb-[6vh]"
        style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
      >
        We don&apos;t...
      </h2>

      <div className="flex flex-col divide-y divide-black/10 max-w-4xl">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-4 md:gap-8 py-[3vh]">
            <span className="font-geist text-black/30 text-sm shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="relative inline-block">
              <span
                className="font-geist font-medium text-black"
                style={{ fontSize: "clamp(1.4rem, 3.4vw, 2.6rem)", letterSpacing: "-0.03em" }}
              >
                {item}
              </span>
              <span
                ref={(el) => {
                  strikeRefs.current[i] = el;
                }}
                className="absolute left-0 right-0 top-1/2 h-[2px] md:h-[3px] bg-[#FB4B54] origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
