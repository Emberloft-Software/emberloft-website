"use client";

import { useEffect, useRef } from "react";
import { isWebGLAvailable } from "@/lib/webgl";

interface PageHeroProps {
  label: string;
  title: string;
  titleItalic?: string;
  titleSuffix?: string;
  description?: string;
  accentColor?: string;
}

export default function PageHero({
  label,
  title,
  titleItalic,
  titleSuffix,
  description,
  accentColor = "#FB4B54",
}: PageHeroProps) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // ── Vanta background ──────────────────────────────────
  useEffect(() => {
    const initVanta = async () => {
      if (vantaEffect.current || !vantaRef.current) return;
      if (!isWebGLAvailable()) return;

      const THREE = await import("three");
      const threeNamespace = { ...THREE };
      (window as any).THREE = threeNamespace;

      await new Promise((r) => setTimeout(r, 50));

      const BIRDS = (await import("vanta/dist/vanta.birds.min")).default;

      if (!vantaRef.current) return;

      vantaEffect.current = BIRDS({
        el: vantaRef.current,
        backgroundColor: 0x080008,
        color1: 0xFB4B54,
        color2: 0x290052,
        colorMode: "lerpGradient",
        birdSize: 1.2,
        wingSpan: 28,
        speedLimit: 4,
        separation: 60,
        alignment: 40,
        cohesion: 30,
        quantity: 3,
        backgroundAlpha: 1,
      });
    };

    initVanta();

    return () => {
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  // ── Text entrance animation ───────────────────────────
  useEffect(() => {
    const run = async () => {
      const { animate, createTimeline } = await import("animejs");

      const tl = createTimeline({ defaults: { ease: "outExpo" } });

      tl.add(labelRef.current!, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 500,
      })
        .add(titleRef.current!, {
          opacity: [0, 1],
          translateY: [50, 0],
          duration: 800,
        }, "-=300")
        .add(lineRef.current!, {
          scaleX: [0, 1],
          duration: 700,
          ease: "outQuart",
        }, "-=400");

      if (descRef.current) {
        tl.add(descRef.current, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        }, "-=400");
      }
    };

    const t = setTimeout(run, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={vantaRef}
      className="relative w-full pt-[18vh] pb-[10vh] px-[5vw] overflow-hidden bg-[#080008]"
      style={{ minHeight: "45vh" }}
    >
      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(8,0,8,0.7))",
        }}
      />

      {/* Left vignette */}
      <div
        className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to right, rgba(8,0,8,0.5), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-20">

        {/* Label */}
        <span
          ref={labelRef}
          className="flex items-center gap-2 mb-[2.5vh]"
          style={{ opacity: 0 }}
        >
          <span className="text-sm shrink-0" style={{ color: accentColor }}>
            ✦
          </span>
          <span
            className="font-geist font-semibold text-xs tracking-[0.2em] uppercase"
            style={{ color: accentColor }}
          >
            {label}
          </span>
        </span>

        {/* Title */}
        <h1
          ref={titleRef}
          className="font-geist font-medium text-white leading-[0.95] mb-[3vh] max-w-4xl"
          style={{
            opacity: 0,
            fontSize: "clamp(2.75rem, 7vw, 6rem)",
          }}
        >
          {title}{" "}
          {titleItalic && (
            <span
              className="font-instrument-serif font-normal italic"
              style={{ color: accentColor }}
            >
              {titleItalic}
            </span>
          )}
          {titleSuffix && (
            <span className="font-geist font-medium text-white">
              {titleSuffix}
            </span>
          )}
        </h1>

        {/* Divider line */}
        <div
          ref={lineRef}
          className="h-px w-full mb-[3vh]"
          style={{
            backgroundColor: "rgba(251,75,84,0.2)",
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />

        {/* Description */}
        {description && (
          <p
            ref={descRef}
            className="font-geist text-white/40 max-w-xl leading-relaxed"
            style={{
              opacity: 0,
              fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
            }}
          >
            {description}
          </p>
        )}

      </div>
    </section>
  );
}