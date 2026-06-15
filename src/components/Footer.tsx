"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isWebGLAvailable } from "@/lib/webgl";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  // ── Vanta clouds ──────────────────────────────────────
  useEffect(() => {
    const initVanta = async () => {
      if (vantaEffect.current || !vantaRef.current) return;
      if (!isWebGLAvailable()) return;

      const THREE = await import("three");
      (window as any).THREE = { ...THREE };

      await new Promise((r) => setTimeout(r, 50));

      const CLOUDS = (await import("vanta/dist/vanta.clouds.min")).default;

      if (!vantaRef.current) return;

      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE: (window as any).THREE,
        // Deep near-black base
        backgroundColor: 0x080008,
        // Cloud colors pulled from emberloft palette
        skyColor: 0x0d000d,
        cloudColor: 0x290052,       // deep purple clouds
        cloudShadowColor: 0x100008, // very dark shadow
        sunColor: 0xFB4B54,         // red sun glow
        sunGlareColor: 0xFB4B54,
        sunlightColor: 0xFB4B54,
        speed: 0.8,
        backgroundAlpha: 1,
      });
    };

    initVanta();

    return () => {
      vantaEffect.current?.destroy();
      vantaEffect.current = null;
    };
  }, []);

  // ── Entrance animation ────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          runAnimation();
        }
      },
      { threshold: 0.08 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const runAnimation = async () => {
    const { animate, stagger } = await import("animejs");

    const ctaLines = ctaRef.current?.querySelectorAll(".cta-line");
    if (ctaLines) {
      animate(ctaLines, {
        opacity: [0, 1],
        translateY: [28, 0],
        delay: stagger(110),
        duration: 800,
        ease: "outExpo",
      });
    }

    const cols = gridRef.current?.querySelectorAll(".footer-col");
    if (cols) {
      animate(cols, {
        opacity: [0, 1],
        translateY: [18, 0],
        delay: stagger(70, { start: 350 }),
        duration: 600,
        ease: "outExpo",
      });
    }
  };

  return (
    <footer ref={footerRef} className="w-full bg-[#0D0D0D]">
      <div className="border-t border-white/10" />

      {/* ── CTA block with Vanta clouds ── */}
      <div
        ref={vantaRef}
        className="relative w-full overflow-hidden bg-[#080008]"
      >
        {/* Bottom fade so clouds blend into the dark footer grid */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #0D0D0D)",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, transparent, rgba(8,0,8,0.6))",
          }}
        />

        {/* Left + right vignettes */}
        <div
          className="absolute inset-y-0 left-0 w-24 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to right, rgba(8,0,8,0.5), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to left, rgba(8,0,8,0.5), transparent)",
          }}
        />

        {/* CTA content */}
        <div
          ref={ctaRef}
          className="relative z-20 px-[5vw] pt-[12vh] pb-[10vh] flex flex-col items-center text-center"
        >
          <div className="cta-line opacity-0 flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EEBA0B]" />
            <span className="font-geist text-[#EEBA0B] text-xs tracking-[0.2em] uppercase font-medium">
              A new beginning
            </span>
          </div>

          <h2
            className="cta-line opacity-0 font-geist font-extrabold text-white leading-none tracking-tight mb-2"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            From the quiet,
          </h2>
          <h2
            className="cta-line opacity-0 leading-none mb-12"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            <span className="font-instrument-serif font-normal italic text-[#EEBA0B]">
              something rises.
            </span>
          </h2>

          <div className="cta-line opacity-0 flex flex-wrap justify-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2 bg-[#EEBA0B] text-black font-medium text-sm px-6 py-3.5 rounded-full hover:brightness-110 transition-all"
            >
              Apply to Work With Us
              <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                <ArrowIcon color="white" />
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 border border-white/20 text-white/70 text-sm font-medium px-6 py-3.5 rounded-full hover:bg-white/10 hover:text-white transition-colors"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      <div className="mx-[5vw] border-t border-white/10" />

      {/* ── Navigation grid ── */}
      <div
        ref={gridRef}
        className="px-[5vw] py-[7vh] grid grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 md:gap-8"
      >
        {/* Brand column */}
        <div className="footer-col opacity-0 col-span-2 md:col-span-1 flex flex-col">
          <div className="flex items-center gap-2.5 mb-4">
            <Image
              src="/logo.webp"
              alt="Emberloft logo"
              width={500}
              height={397}
              className="h-9 w-auto"
            />
            <span className="font-geist font-extrabold text-xl tracking-tight">
              <span style={{ color: "#EEBA0B" }}>ember</span>
              <span className="text-white">loft</span>
            </span>
          </div>

          <p className="font-geist text-white/40 text-sm leading-relaxed">
            Where the work<br />never cools.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 border border-white/10 rounded-full px-3.5 py-1.5 w-fit">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#EEBA0B]"
              style={{ boxShadow: "0 0 5px #EEBA0B88" }}
            />
            <span className="font-geist text-white/50 text-[0.6rem] tracking-[0.14em] uppercase">
              Booking Q3 2026
            </span>
          </div>
        </div>

        {/* Services */}
        <div className="footer-col opacity-0">
          <p className="font-geist text-white/25 text-[0.6rem] tracking-[0.2em] uppercase mb-5">
            Services
          </p>
          <ul className="flex flex-col gap-3.5">
            {["Web Development", "Mobile", "UI / UX", "AI Integration"].map((s) => (
              <li key={s}>
                <a
                  href="#"
                  className="font-geist text-white/50 text-sm hover:text-white transition-colors duration-200"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio */}
        <div className="footer-col opacity-0">
          <p className="font-geist text-white/25 text-[0.6rem] tracking-[0.2em] uppercase mb-5">
            Studio
          </p>
          <ul className="flex flex-col gap-3.5">
            {["About", "Work", "Process", "FAQ"].map((s) => (
              <li key={s}>
                <a
                  href="#"
                  className="font-geist text-white/50 text-sm hover:text-white transition-colors duration-200"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="footer-col opacity-0">
          <p className="font-geist text-white/25 text-[0.6rem] tracking-[0.2em] uppercase mb-5">
            Connect
          </p>
          <ul className="flex flex-col gap-3.5">
            {[
              { label: "Twitter / X", href: "#" },
              { label: "LinkedIn", href: "#" },
              { label: "Dribbble", href: "#" },
              { label: "hello@emberloft.io", href: "mailto:hello@emberloft.io" },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="font-geist text-white/50 text-sm hover:text-white transition-colors duration-200"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-[5vw] border-t border-white/10" />

      {/* ── Bottom bar ── */}
      <div className="px-[5vw] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-geist text-white/20 text-xs">
          © 2026 Emberloft Studio. All rights reserved.
        </span>

        <RisingWisps />

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="font-geist text-white/20 text-xs hover:text-white/50 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="#"
            className="font-geist text-white/20 text-xs hover:text-white/50 transition-colors duration-200"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

function RisingWisps() {
  return (
    <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden="true">
      <path
        d="M6 18 C4.5 13 1 9 3 5 C3.6 3 5 1.5 5.5 1"
        stroke="white"
        strokeOpacity="0.15"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M13 18 C13 12 13 7.5 13 3.5 C13 2 13 1 13 0.5"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M20 18 C21.5 13 25 9 23 5 C22.4 3 21 1.5 20.5 1"
        stroke="white"
        strokeOpacity="0.15"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon({ color = "black" }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path
        d="M2 8L8 2M8 2H3M8 2V7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}