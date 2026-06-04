"use client";

import { useEffect, useRef, useState } from "react";

const lines: { text: string; italic?: string; suffix?: string }[] = [
  { text: "Most digital work is ", italic: "rushed." },
  { text: "We don't work that way." },
  { text: "Emberloft takes few projects" },
  { text: "and builds things that are quiet on the surface" },
  { text: "and ", italic: "relentless", suffix: " underneath." },
];

type Word = {
  text: string;
  style: "normal" | "italic";
  lineIndex: number;
};

function buildWords(): Word[] {
  const words: Word[] = [];
  lines.forEach((line, lineIndex) => {
    const segments: { text: string; style: "normal" | "italic" }[] = [];
    if (line.text) segments.push({ text: line.text, style: "normal" });
    if (line.italic) segments.push({ text: line.italic, style: "italic" });
    if (line.suffix) segments.push({ text: line.suffix, style: "normal" });

    segments.forEach((seg) => {
      // Keep trailing space as part of the word token
      const raw = seg.text;
      // split preserving spaces — each "word" includes its trailing space
      const tokens = raw.match(/\S+\s*/g) || [];
      tokens.forEach((token) => {
        words.push({ text: token, style: seg.style, lineIndex });
      });
    });
  });
  return words;
}

const ALL_WORDS = buildWords();

export default function PositionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
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
    const { animate, stagger } = await import("animejs");

    // Label
    if (labelRef.current) {
      animate(labelRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 500,
        ease: "outExpo",
      });
    }

    // Words — each clips up from below its own baseline
    const wordEls = wordRefs.current.filter(Boolean) as HTMLSpanElement[];
    animate(wordEls, {
      translateY: ["105%", "0%"],
      opacity: [0, 1],
      duration: 550,
      delay: stagger(35, { start: 150 }),
      ease: "outExpo",
    });

    // Subtitle
    if (subRef.current) {
      animate(subRef.current, {
        opacity: [0, 1],
        translateY: [12, 0],
        duration: 600,
        delay: 150 + wordEls.length * 35 + 100,
        ease: "outExpo",
      });
    }
  };

  // Group words back into lines for rendering
  const lineGroups = lines.map((_, li) =>
    ALL_WORDS
      .map((w, i) => ({ ...w, globalIndex: i }))
      .filter((w) => w.lineIndex === li)
  );

  let globalIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F2F2F0] py-[10vh] px-[6vw] flex flex-col items-center text-center"
      style={{ minHeight: "50vh", justifyContent: "center" }}
    >
      {/* Label */}
      <span
        ref={labelRef}
        className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.2em] uppercase mb-[4vh]"
        style={{ opacity: 0 }}
      >
        — Our Position
      </span>

      {/* Text block */}
      <div
        className="max-w-5xl w-full flex flex-col items-center"
        style={{ gap: "0.15em" }}
      >
        {lineGroups.map((lineWords, li) => (
          <div key={li} className="flex flex-wrap justify-center overflow-hidden"
            style={{ padding: "0.05em 0" }}
          >
            {lineWords.map((w) => {
              const idx = globalIndex++;
              return (
                // Outer clip container
                <span
                  key={idx}
                  className="inline-block overflow-hidden"
                  style={{ verticalAlign: "bottom" }}
                >
                  {/* Inner — this is what animates */}
                  <span
                    ref={(el) => { wordRefs.current[idx] = el; }}
                    className="inline-block"
                    style={{
                      opacity: 0,
                      transform: "translateY(105%)",
                      fontSize: "clamp(1.5rem, 3.2vw, 2.8rem)",
                      fontWeight: 900,
                      lineHeight: 1.15,
                      whiteSpace: "pre",
                    }}
                  >
                    {w.style === "italic" ? (
                      <span
                        className="font-instrument-serif font-normal italic"
                        style={{ color: "#FB4B54" }}
                      >
                        {w.text}
                      </span>
                    ) : (
                      <span className="font-geist font-black text-black">
                        {w.text}
                      </span>
                    )}
                  </span>
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Subtitle */}
      <p
        ref={subRef}
        className="font-geist text-sm text-black/40 max-w-md leading-relaxed"
        style={{
          opacity: 0,
          marginTop: "clamp(1.5rem, 3vh, 2.5rem)",
        }}
      >
        Quality is a decision made a thousand small times. We make it every time.
      </p>
    </section>
  );
}