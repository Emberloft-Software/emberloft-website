"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  "take every project.",
  "outsource the thinking.",
  "disappear after launch.",
  "race to the cheapest price.",
  "do template work.",
];

export default function DontSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const arrowRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [started]);

  // Arrow entrance
  useEffect(() => {
    if (!started) return;
    const run = async () => {
      const { animate } = await import("animejs");
      if (arrowRef.current) {
        animate(arrowRef.current, {
          opacity: [0, 1],
          rotate: [-20, 0],
          translateY: [-10, 0],
          duration: 600,
          delay: 200,
          ease: "outBack",
        });
      }
    };
    run();
  }, [started]);

  // Cycle active item
  useEffect(() => {
    if (!started) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 1800);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F2F2F0] py-12 md:py-[5vh] px-6 sm:px-[5vw] flex items-center justify-center"
      style={{ minHeight: "40vh" }}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 w-full max-w-5xl mx-auto">

        {/* "We don't" heading */}
        <div className="relative flex items-center shrink-0 select-none">
          <span
            className="font-geist font-black text-black text-5xl md:text-[clamp(2.4rem,5vw,4.2rem)]"
            style={{ lineHeight: 1 }}
          >
            We{" "}
          </span>

          <span className="relative inline-block ml-2">
            <img
              ref={arrowRef}
              src="/arrow.png"
              alt=""
              aria-hidden="true"
              className="absolute pointer-events-none"
              style={{
                opacity: 0,
                width: "clamp(36px, 4vw, 56px)",
                top: "-42%",
                right: "-18%",
              }}
            />
            <span
              className="font-instrument-serif italic font-normal text-5xl md:text-[clamp(2.4rem,5vw,4.2rem)]"
              style={{ lineHeight: 1, color: "#FB4B54" }}
            >
              don&apos;t
            </span>
          </span>
        </div>

        {/* Vertical carousel - below heading on mobile, beside it on desktop */}
        <div className="flex flex-col gap-1 w-full">
          {items.map((item, i) => (
            <span
              key={item}
              className="font-geist font-black transition-all duration-500 text-2xl sm:text-3xl md:text-[clamp(1.6rem,2.8vw,2.6rem)]"
              style={{
                lineHeight: 1.25,
                color:
                  activeIndex === i
                    ? "rgba(0,0,0,0.9)"
                    : "rgba(0,0,0,0.18)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
