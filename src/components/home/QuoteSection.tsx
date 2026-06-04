"use client";

import { useEffect, useRef, useState } from "react";

// Words that are "faded" (light gray) in the reference
const fadedWords = new Set([
  "There", "Is", "No", "Longer", "Anything", "To", "Add,",
  "But", "When", "There", "Is", "No", "Longer", "Anything", "To",
]);

// Split into word segments with style info
const quoteSegments: { text: string; style: "bold" | "faded" | "italic" }[] = [
  { text: '"It Seems That Perfection Is Finally Attained Not When ', style: "bold" },
  { text: "There Is No Longer Anything To Add, But When There Is No Longer Anything To ", style: "faded" },
  { text: "take away.", style: "italic" },
  { text: '"', style: "bold" },
];

export default function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);

  // Build flat word list for individual animation
  const words = quoteSegments.flatMap((seg) =>
    seg.text.split(" ").filter(Boolean).map((word) => ({
      word: word + " ",
      style: seg.style,
    }))
  );

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
    const { animate, stagger } = await import("animejs");

    const wordEls = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

    // Words reveal one by one — fade + tiny upward drift
    animate(wordEls, {
      opacity: [0, 1],
      translateY: [10, 0],
      filter: ["blur(4px)", "blur(0px)"],
      delay: stagger(45, { start: 0 }),
      duration: 500,
      ease: "easeOutExpo",
    });

    // Attribution slides up after words finish
    if (attributionRef.current) {
      animate(attributionRef.current, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        delay: wordEls.length * 45 + 100,
        ease: "easeOutExpo",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#ffffff] py-[20vh] px-[6vw] flex flex-col items-center justify-center"
      style={{ minHeight: "40vh" }}
    >
      <div className="max-w-4xl w-full mx-auto text-center">

        {/* Quote */}
        <p
          ref={quoteRef}
          className="leading-[1.25] mb-[3vh]"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)" }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className="inline"
              style={{ opacity: 0 }}
            >
              {w.style === "bold" && (
                <span className="font-geist font-black text-black">
                  {w.word}
                </span>
              )}
              {w.style === "faded" && (
                <span
                  className="font-geist font-black"
                  style={{ color: "rgba(0,0,0,0.22)" }}
                >
                  {w.word}
                </span>
              )}
              {w.style === "italic" && (
                <span
                  className="font-instrument-serif font-normal italic"
                  style={{ color: "#5B4FCF" }}
                >
                  {w.word}
                </span>
              )}
            </span>
          ))}
        </p>

        {/* Attribution */}
        <p
          ref={attributionRef}
          className="font-geist text-black/40 tracking-[0.12em] uppercase opacity-0"
          style={{ fontSize: "clamp(0.6rem, 1vw, 0.75rem)" }}
        >
          — Antoine de Saint-Exupéry · Wind, Sand and Stars (1939)
        </p>

      </div>
    </section>
  );
}