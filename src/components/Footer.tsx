"use client";

import Image from "next/image";
import ArrowButton from "./ArrowButton";
import { useCallback, useEffect, useRef, useState } from "react";
import { isWebGLAvailable } from "@/lib/webgl";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<{ destroy: () => void } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  const runAnimation = useCallback(async () => {
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
  }, []);

  // ── Vanta clouds ──────────────────────────────────────
  useEffect(() => {
    const initVanta = async () => {
      if (vantaEffect.current || !vantaRef.current) return;
      if (!isWebGLAvailable()) return;

      const THREE = await import("three");
      (window as unknown as Record<string, unknown>).THREE = { ...THREE };

      await new Promise((r) => setTimeout(r, 50));

      const CLOUDS = (await import("vanta/dist/vanta.clouds.min")).default;

      if (!vantaRef.current) return;

      vantaEffect.current = CLOUDS({
        el: vantaRef.current,
        THREE: (window as unknown as Record<string, unknown>).THREE,
        backgroundColor: 0x080008,
        skyColor: 0x0d000d,
        cloudColor: 0x290052,
        cloudShadowColor: 0x100008,
        sunColor: 0xfb4b54,
        sunGlareColor: 0xfb4b54,
        sunlightColor: 0xfb4b54,
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
      { threshold: 0.08 },
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [animated, runAnimation]);

  return (
    <footer ref={footerRef} className="w-full bg-[#0D0D0D]">
      <div className="border-t border-white/10" />

      {/* ── CTA block ── */}
      <div
        ref={vantaRef}
        className="relative w-full overflow-hidden bg-[#080008]"
      >
        {/* Bottom fade into the dark footer grid */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, transparent, #0D0D0D)",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to top, transparent, rgba(8,0,8,0.6))",
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
            <span className="text-[#EEBA0B] text-sm">✦</span>
            <span className="font-geist text-[#EEBA0B] text-xs tracking-[0.2em] uppercase font-medium">
              A new beginning
            </span>
          </div>

          <h2
            className="cta-line opacity-0 font-geist font-medium text-white leading-none tracking-tighter mb-2"
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
            <ArrowButton href="#" variant="solid">
              Apply to Work With Us
            </ArrowButton>
            <ArrowButton href="#" variant="outline">
              Let&apos;s Talk
            </ArrowButton>
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
              width={200}
              height={159}
              className="h-9 w-auto"
            />
            <span className="font-geist font-extrabold text-xl tracking-tight">
              <span style={{ color: "#EEBA0B" }}>ember</span>
              <span className="text-white">loft</span>
            </span>
          </div>

          <p className="font-geist text-white/40 text-[clamp(0.85rem,1.2vw,1rem)] leading-relaxed">
            Where the work
            <br />
            never cools.
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
          <p className="font-geist text-[#EEBA0B] text-[clamp(0.95rem,1.3vw,1.1rem)] font-semibold tracking-[0.15em] uppercase mb-5">
            Services
          </p>
          <ul className="flex flex-col gap-3.5">
            {["Web Development", "Mobile", "UI / UX", "AI Integration"].map(
              (s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="font-geist text-white/50 text-[clamp(0.8rem,1.1vw,0.9rem)] hover:text-white transition-colors duration-200"
                  >
                    {s}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Studio */}
        <div className="footer-col opacity-0">
          <p className="font-geist text-[#EEBA0B] text-[clamp(0.95rem,1.3vw,1.1rem)] font-semibold tracking-[0.15em] uppercase mb-5">
            Studio
          </p>
          <ul className="flex flex-col gap-3.5">
            {[
              { label: "About", href: "/about" },
              { label: "Work", href: "#" },
              { label: "Process", href: "#" },
              { label: "FAQ", href: "#" },
              { label: "Blog", href: "/blog" },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="font-geist text-white/50 text-[clamp(0.8rem,1.1vw,0.9rem)] hover:text-white transition-colors duration-200"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="footer-col opacity-0">
          <p className="font-geist text-[#EEBA0B] text-[clamp(0.95rem,1.3vw,1.1rem)] font-semibold tracking-[0.15em] uppercase mb-5">
            Connect
          </p>
          <ul className="flex flex-col gap-3.5">
            {[
              {
                label: "Instagram",
                href: "https://www.instagram.com/emberloft.studio?igsh=MTlldmpvajVueGNvbA==",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/emberloft",
              },
              {
                label: "Facebook",
                href: "https://www.facebook.com/profile.php?id=61589472851916",
              },
              {
                label: "emberloft.studio@gmail.com",
                href: "mailto:emberloft.studio@gmail.com",
              },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-geist text-white/50 text-[clamp(0.8rem,1.1vw,0.9rem)] hover:text-white transition-colors duration-200"
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
        <span className="font-geist text-white/40 text-xs">
          © 2026 Emberloft Studio. All rights reserved.
        </span>

        <RisingWisps />

        <div className="flex items-center gap-6">
          <a
            href="/privacy"
            className="font-geist text-white/40 text-xs hover:text-white/50 transition-colors duration-200"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="font-geist text-white/40 text-xs hover:text-white/50 transition-colors duration-200"
          >
            Terms
          </a>
        </div>
      </div>

      {/* Closing wordmark - bookend to the Hero watermark */}
      <div className="px-[5vw] pb-[2vh] overflow-hidden pointer-events-none select-none flex items-baseline justify-between">
        <p className="font-geist text-[17vw] font-medium tracking-tighter leading-none text-[#F5F5F5] ml-[-0.02em]">
          emberloft
        </p>
        <p className="font-geist text-[5.5vw] font-medium tracking-tighter leading-none text-[#F5F5F5]">
          studio
        </p>
      </div>
    </footer>
  );
}

function RisingWisps() {
  return (
    <svg
      width="26"
      height="20"
      viewBox="0 0 26 20"
      fill="none"
      aria-hidden="true"
    >
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
