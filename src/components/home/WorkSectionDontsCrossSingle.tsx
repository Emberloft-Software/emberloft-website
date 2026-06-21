"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const items = [
  "take every project.",
  "outsource the thinking.",
  "disappear after launch.",
  "race to the cheapest price.",
  "do template work.",
];

export default function WorkSectionDontsCrossSingle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const wrap1Ref = useRef<HTMLDivElement>(null);
  const wrap2Ref = useRef<HTMLDivElement>(null);
  const bar1Ref = useRef<HTMLDivElement>(null);
  const bar2Ref = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const startedRef = useRef(false);
  const [displayIndex, setDisplayIndex] = useState(0);

  const fitCross = () => {
    const textEl = textRef.current;
    if (!textEl) return;
    const { width, height } = textEl.getBoundingClientRect();
    const diag = Math.hypot(width, height);
    const angle = (Math.atan2(height, width) * 180) / Math.PI;
    [wrap1Ref.current, wrap2Ref.current].forEach((wrap, i) => {
      if (!wrap) return;
      wrap.style.width = `${diag}px`;
      wrap.style.transform = `translate(-50%, -50%) rotate(${i === 0 ? angle : -angle}deg)`;
    });
  };

  // Longer phrases (e.g. "race to the cheapest price.") are wider than
  // shorter ones (e.g. "do template work.") at the same font-size, so they'd
  // wrap to a second line. Scale just the overflowing ones down to fit on
  // one line instead of changing the font-size for every item.
  const fitText = () => {
    const textEl = textRef.current;
    if (!textEl) return;
    textEl.style.transform = "scale(1)";
    const available = textEl.clientWidth;
    const actual = textEl.scrollWidth;
    const scale = actual > available ? available / actual : 1;
    textEl.style.transform = `scale(${scale})`;
  };

  useEffect(() => {
    fitText();
    window.addEventListener("resize", fitText);
    return () => window.removeEventListener("resize", fitText);
  }, []);

  useEffect(() => {
    if (!textRef.current) return;
    let currentSplit: SplitType | null = null;

    const cycle = async () => {
      if (isAnimatingRef.current || !textRef.current) return;
      isAnimatingRef.current = true;

      gsap.set([bar1Ref.current, bar2Ref.current], { scaleX: 0 });
      currentSplit?.revert();
      textRef.current.textContent = items[indexRef.current];
      setDisplayIndex(indexRef.current);
      fitText();
      currentSplit = new SplitType(textRef.current, { types: "chars" });
      const split = currentSplit;

      await new Promise<void>((resolve) => {
        gsap.set(split.chars, { willChange: "transform, opacity", yPercent: 60, opacity: 0 });
        gsap.to(split.chars, {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.02,
          ease: "power3.out",
          onComplete: resolve,
        });
      });

      fitCross();
      await new Promise((r) => setTimeout(r, 200));
      await new Promise<void>((resolve) => {
        gsap
          .timeline({ onComplete: resolve })
          .to(bar1Ref.current, { scaleX: 1, duration: 0.3, ease: "power2.out" })
          .to(bar2Ref.current, { scaleX: 1, duration: 0.3, ease: "power2.out" }, "-=0.12");
      });

      await new Promise((r) => setTimeout(r, 700));
      indexRef.current = (indexRef.current + 1) % items.length;
      isAnimatingRef.current = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          cycle();
          intervalId = setInterval(cycle, 3200);
        }
      },
      { threshold: 0.3 }
    );
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-screen bg-[#F5F5F5] py-[14vh] px-[5vw] flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ minHeight: "70vh" }}
    >
      <div className="flex items-center gap-2 mb-[5vh]">
        <span className="text-[#FB4B54] text-sm">✦</span>
        <span className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.18em] uppercase">
          What We Don&apos;t Do
        </span>
      </div>

      <span
        className="font-instrument-serif italic font-normal text-[#FB4B54] block"
        style={{ fontSize: "clamp(2.2rem, 5vw, 4.4rem)", lineHeight: 1 }}
      >
        We don&apos;t
      </span>

      <span className="relative inline-block mt-[2vh] max-w-[90vw]">
        <span
          ref={textRef}
          className="font-geist font-medium text-black block overflow-hidden whitespace-nowrap"
          style={{ fontSize: "clamp(2.4rem, 6.5vw, 5.6rem)", lineHeight: 1.2, letterSpacing: "-0.03em" }}
        >
          {items[0]}
        </span>

        <div ref={wrap1Ref} className="absolute left-1/2 top-1/2 h-0.75 pointer-events-none">
          <div ref={bar1Ref} className="w-full h-full bg-[#FB4B54] rounded-full origin-center" style={{ transform: "scaleX(0)" }} />
        </div>
        <div ref={wrap2Ref} className="absolute left-1/2 top-1/2 h-0.75 pointer-events-none">
          <div ref={bar2Ref} className="w-full h-full bg-[#FB4B54] rounded-full origin-center" style={{ transform: "scaleX(0)" }} />
        </div>
      </span>

      <div className="flex items-center gap-3 mt-[5vh] text-black/40 font-geist text-sm tracking-widest">
        <span>{String(displayIndex + 1).padStart(2, "0")}</span>
        <span className="w-10 h-px bg-black/20" />
        <span>{String(items.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
