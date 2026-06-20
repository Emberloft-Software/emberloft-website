"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines: { text: string; italic?: string; suffix?: string }[] = [
  { text: "Most digital work is ", italic: "rushed." },
  { text: "We don't work that way." },
  { text: "Emberloft takes few projects" },
  { text: "and builds things that are quiet on the surface" },
  { text: "and ", italic: "relentless ", suffix: " underneath." },
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
      // split preserving spaces - each "word" includes its trailing space
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
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label - simple fade-in on enter
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Lines - scroll-scrubbed reveal: each line slides in from the
      // left while its color fades from 50% transparent to full, in
      // sequence as the section scrolls through view.
      const lineEls = lineRefs.current.filter(Boolean) as HTMLDivElement[];
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: true,
          },
        })
        .to(
          lineEls,
          {
            opacity: 1,
            xPercent: 0,
            stagger: 0.25,
            ease: "none",
          },
          0,
        );

      // Subtitle - fade-in on enter
      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "expo.out",
            scrollTrigger: {
              trigger: subRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Group words back into lines for rendering
  const lineGroups = lines.map((_, li) =>
    ALL_WORDS.filter((w) => w.lineIndex === li),
  );

  return (
    <section
      ref={sectionRef}
      className="w-screen bg-[#F2F2F0] py-[12vh] px-[5vw] flex flex-col items-center text-center"
      style={{ minHeight: "50vh", justifyContent: "center" }}
    >
      {/* Label */}
      <span
        ref={labelRef}
        className="font-geist text-[#FB4B54] text-xs font-medium tracking-[0.2em] uppercase mb-[4vh]"
        style={{ opacity: 0 }}
      >
        ✦ Our Position
      </span>

      {/* Text block */}
      <div
        className="max-w-5xl w-full flex flex-col items-center"
        style={{ gap: "0.15em" }}
      >
        {lineGroups.map((lineWords, li) => (
          <div
            key={li}
            ref={(el) => {
              lineRefs.current[li] = el;
            }}
            style={{
              opacity: 0.5,
              transform: "translateX(-3%)",
              padding: "0.05em 0",
              fontSize: "clamp(2rem, 3.5vw, 4.5rem)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.05em",
            }}
          >
            {lineWords.map((w, wi) =>
              w.style === "italic" ? (
                <span
                  key={wi}
                  className="font-instrument-serif font-normal italic"
                  style={{ color: "#FB4B54", letterSpacing: "0" }}
                >
                  {w.text}
                </span>
              ) : (
                <span key={wi} className="font-geist text-black">
                  {w.text}
                </span>
              ),
            )}
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
        Quality is a decision made a thousand small times. We make it every
        time.
      </p>
    </section>
  );
}
