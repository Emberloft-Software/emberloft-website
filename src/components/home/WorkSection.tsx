"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  "take every project.",
  "outsource the thinking.",
  "disappear after launch.",
  "race to the cheapest price.",
  "do template work.",
];

// How many slots visible above and below center
const VISIBLE_ABOVE = 2;
const ITEM_HEIGHT_VH = 7; // vh per slot

export default function DontSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRef = useRef<HTMLImageElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Total visible slots = VISIBLE_ABOVE + center + VISIBLE_ABOVE
  const TOTAL_SLOTS = VISIBLE_ABOVE * 2 + 1;

  // Get the item index for each slot position relative to activeIndex
  const getSlotIndex = (slotPos: number) => {
    const offset = slotPos - VISIBLE_ABOVE;
    return ((activeIndex + offset) % items.length + items.length) % items.length;
  };

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
          delay: 300,
          ease: "outBack",
        });
      }
    };
    run();
  }, [started]);

  // Cycle on interval
  useEffect(() => {
    if (!started) return;

    const PAUSE = 1800;

    const cycle = async () => {
      if (isAnimating) return;
      setIsAnimating(true);

      const { animate, stagger } = await import("animejs");

      // Each slot animates: current content falls out, new content drops in
      // We animate all slots simultaneously — each moves "up" one position
      const slots = slotRefs.current.filter(Boolean) as HTMLDivElement[];

      // Step 1: all slots fall out downward (fast)
      await animate(slots, {
        translateY: [0, `${ITEM_HEIGHT_VH}vh`],
        opacity: [1, 0],
        rotateX: [0, -35],
        duration: 200,
        delay: stagger(30, { from: "last" }),
        ease: "inCubic",
      });

      // Step 2: update active index (React re-renders text)
      setActiveIndex((prev) => (prev + 1) % items.length);
      await new Promise((r) => setTimeout(r, 16));

      // Step 3: all slots drop in from above (with bounce)
      await animate(slots, {
        translateY: [`-${ITEM_HEIGHT_VH}vh`, "0vh"],
        opacity: [0, 1],
        rotateX: [35, 0],
        duration: 350,
        delay: stagger(40, { from: "first" }),
        ease: "outBack",
      });

      setIsAnimating(false);
    };

    // Initial drop-in on mount
    const init = async () => {
      const { animate, stagger } = await import("animejs");
      const slots = slotRefs.current.filter(Boolean) as HTMLDivElement[];
      animate(slots, {
        translateY: [`-${ITEM_HEIGHT_VH * 1.5}vh`, "0vh"],
        opacity: [0, 1],
        rotateX: [40, 0],
        duration: 500,
        delay: stagger(60, { from: "first" }),
        ease: "outBack",
      });
    };
    init();

    intervalRef.current = setInterval(cycle, PAUSE);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#ffffff] py-16 md:py-[30vh] px-5 md:px-[10vw] flex items-center justify-center overflow-hidden"
      style={{ minHeight: "50vh" }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-[3vw] w-full max-w-5xl mx-auto">

        {/* "We don't" heading */}
        <div className="relative shrink-0 flex items-center select-none">
          <span
            className="font-geist font-extrabold text-black"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", lineHeight: 1 }}
          >
            We{" "}
          </span>
          <span className="relative inline-block ml-3">
            <img
              ref={arrowRef}
              src="/arrow.png"
              alt=""
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none"
              style={{
                width: "clamp(42px, 4.5vw, 62px)",
                top: "-45%",
                right: "-20%",
              }}
            />
            <span
              className="font-instrument-serif italic font-normal"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                lineHeight: 1,
                color: "#FB4B54",
              }}
            >
              don't
            </span>
          </span>
        </div>

        {/* Rotating slot stack — full width on mobile, flex-1 on desktop */}
        <div
          className="relative flex flex-col w-full md:flex-1 overflow-hidden"
          style={{
            perspective: "600px",
            height: `${TOTAL_SLOTS * ITEM_HEIGHT_VH}vh`,
          }}
        >
          {Array.from({ length: TOTAL_SLOTS }).map((_, slotPos) => {
            const isCenter = slotPos === VISIBLE_ABOVE;
            const distFromCenter = Math.abs(slotPos - VISIBLE_ABOVE);
            const itemIdx = getSlotIndex(slotPos);

            const opacity =
              distFromCenter === 0 ? 1 :
              distFromCenter === 1 ? 0.25 :
              0.1;

            const fontSize =
              distFromCenter === 0
                ? "clamp(1.15rem, 4.5vw, 3.8rem)"
                : distFromCenter === 1
                ? "clamp(0.9rem, 3vw, 2.6rem)"
                : "clamp(0.7rem, 2.2vw, 1.9rem)";

            return (
              <div
                key={slotPos}
                ref={(el) => { slotRefs.current[slotPos] = el; }}
                className="flex items-center"
                style={{
                  height: `${ITEM_HEIGHT_VH}vh`,
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                }}
              >
                <span
                  className="font-geist font-extrabold text-black transition-all duration-300 whitespace-nowrap leading-none"
                  style={{
                    fontSize,
                    opacity,
                    borderLeft: isCenter ? "3px solid #FB4B54" : "3px solid transparent",
                    paddingLeft: "0.6em",
                  }}
                >
                  {items[itemIdx]}
                </span>
              </div>
            );
          })}

          {/* Center highlight rule */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: `${VISIBLE_ABOVE * ITEM_HEIGHT_VH}vh`,
              height: `${ITEM_HEIGHT_VH}vh`,
              borderTop: "1px solid rgba(0,0,0,0.08)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
            }}
          />
        </div>
      </div>
    </section>
  );
}