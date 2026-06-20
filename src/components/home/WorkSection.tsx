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
const ITEM_HEIGHT_VH = 10; // vh per slot

export default function DontSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const isAnimatingRef = useRef(false);
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const arrowRef = useRef<SVGSVGElement>(null);
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
      if (isAnimatingRef.current) return;
      isAnimatingRef.current = true;

      const { animate, stagger } = await import("animejs");

      // Each slot animates: current content falls out, new content drops in
      // We animate all slots simultaneously - each moves "up" one position
      const slots = slotRefs.current.filter(Boolean) as HTMLDivElement[];

      // Step 1: all slots fall out downward (smooth)
      await animate(slots, {
        translateY: [0, `${ITEM_HEIGHT_VH}vh`],
        opacity: [1, 0],
        rotateX: [0, -18],
        duration: 260,
        delay: stagger(40, { from: "last" }),
        ease: "inOutQuad",
      });

      // Step 2: update active index (React re-renders text)
      setActiveIndex((prev) => (prev + 1) % items.length);
      await new Promise((r) => setTimeout(r, 16));

      // Step 3: all slots drop in from above (smooth)
      await animate(slots, {
        translateY: [`-${ITEM_HEIGHT_VH}vh`, "0vh"],
        opacity: [0, 1],
        rotateX: [18, 0],
        duration: 450,
        delay: stagger(50, { from: "first" }),
        ease: "outQuad",
      });

      isAnimatingRef.current = false;
    };

    // Initial drop-in on mount
    const init = async () => {
      const { animate, stagger } = await import("animejs");
      const slots = slotRefs.current.filter(Boolean) as HTMLDivElement[];
      animate(slots, {
        translateY: [`-${ITEM_HEIGHT_VH * 1.5}vh`, "0vh"],
        opacity: [0, 1],
        rotateX: [20, 0],
        duration: 550,
        delay: stagger(70, { from: "first" }),
        ease: "outQuad",
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
      className="w-screen bg-[#F5F5F5] py-[12vh] px-[5vw] flex items-center justify-center overflow-hidden"
      style={{ minHeight: "80vh" }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-[4vw] w-full max-w-6xl mx-auto">

        {/* "We don't" heading */}
        <div className="relative shrink-0 flex items-center select-none">
          <span
            className="font-geist font-medium text-black"
            style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)", lineHeight: 1, letterSpacing: "-0.05em" }}
          >
            We{" "}
          </span>
          <span className="relative inline-block ml-3">
            <svg
              ref={arrowRef}
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none"
              style={{
                width: "clamp(46px, 5.5vw, 76px)",
                height: "auto",
                top: "-3vw",
                right: "-3vw",
              }}
            >
              <path
                d="M8 6 C 30 2, 54 14, 48 38"
                stroke="#FB4B54"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M40 32 L48 38 L42 48"
                stroke="#FB4B54"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span
              className="font-instrument-serif italic font-normal"
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)",
                lineHeight: 1,
                letterSpacing: "0",
                color: "#FB4B54",
              }}
            >
              don&apos;t
            </span>
          </span>
        </div>

        {/* Rotating slot stack - full width on mobile, flex-1 on desktop */}
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
                ? "clamp(2.2rem, 5.5vw, 4.4rem)"
                : distFromCenter === 1
                ? "clamp(1.1rem, 3vw, 2.6rem)"
                : "clamp(0.85rem, 2.2vw, 1.9rem)";

            return (
              <div
                key={slotPos}
                ref={(el) => { slotRefs.current[slotPos] = el; }}
                className="flex items-center"
                style={{
                  height: `${ITEM_HEIGHT_VH}vh`,
                  minWidth: 0,
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                }}
              >
                <span
                  className="font-geist font-medium text-black transition-all duration-300 whitespace-nowrap"
                  style={{
                    fontSize,
                    opacity,
                    letterSpacing: "-0.05em",
                    lineHeight: isCenter ? 1.3 : 1,
                    borderLeft: isCenter ? "3px solid #FB4B54" : "3px solid transparent",
                    paddingLeft: "0.6em",
                    display: "block",
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
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