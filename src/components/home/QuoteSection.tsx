"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quoteSegments: { text: string; style: "normal" | "italic" }[] = [
  {
    text: '"It Seems That Perfection Is Finally Attained Not When There Is No Longer Anything To Add, But When There Is No Longer Anything To ',
    style: "normal",
  },
  { text: "take away.", style: "italic" },
  { text: '"', style: "normal" },
];

const words = quoteSegments.flatMap((seg) =>
  seg.text
    .split(" ")
    .filter(Boolean)
    .map((word) => ({ word: word + " ", style: seg.style })),
);

export default function QuoteSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wordEls = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        })
        .to(
          wordEls,
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: 0.6 / wordEls.length,
            ease: "none",
          },
          0,
        );

      if (attributionRef.current) {
        gsap.fromTo(
          attributionRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen bg-[#F5F5F5] py-[12vh] px-[5vw] flex flex-col items-center justify-center"
      style={{ minHeight: "40vh" }}
    >
      <div className="max-w-4xl w-full mx-auto text-center">
        <p
          className="leading-tight mb-[3vh]"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 5.6rem)" }}
        >
          {words.map((w, i) => (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className="inline"
              style={{ opacity: 0, filter: "blur(4px)", transform: "translateY(10px)" }}
            >
              {w.style === "normal" && (
                <span
                  className="font-geist font-medium"
                  style={{ color: "#0A0A0A", letterSpacing: "-0.05em" }}
                >
                  {w.word}
                </span>
              )}
              {w.style === "italic" && (
                <span
                  className="font-instrument-serif font-normal italic"
                  style={{ color: "#290052", letterSpacing: "0" }}
                >
                  {w.word}
                </span>
              )}
            </span>
          ))}
        </p>

        <p
          ref={attributionRef}
          className="font-geist text-black/40 tracking-[0.12em] uppercase opacity-0"
          style={{ fontSize: "clamp(0.6rem, 1vw, 0.75rem)" }}
        >
          - Antoine de Saint-Exupéry · Wind, Sand and Stars (1939)
        </p>
      </div>
    </section>
  );
}
