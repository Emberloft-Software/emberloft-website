"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ArrowButton from "./ArrowButton";

const navLinks = [
  { label: "Home", href: "/home" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linkItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Animate open / close
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const run = async () => {
      const { animate, stagger, cubicBezier } = await import("animejs");
      const menu = menuRef.current;
      if (!menu) return;

      const items = [...linkItemsRef.current, ctaRef.current].filter(
        Boolean,
      ) as HTMLElement[];

      if (menuOpen) {
        menu.style.pointerEvents = "auto";
        animate(menu, {
          clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
          duration: 650,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        });
        animate(items, {
          opacity: [0, 1],
          translateY: [48, 0],
          duration: 520,
          delay: stagger(70, { start: 260 }),
          ease: "outExpo",
        });
      } else {
        await animate(items, {
          opacity: [1, 0],
          translateY: [0, -20],
          duration: 200,
          delay: stagger(25, { from: "last" }),
          ease: "inCubic",
        });
        await animate(menu, {
          clipPath: ["inset(0 0 0% 0)", "inset(0 0 100% 0)"],
          duration: 500,
          ease: cubicBezier(0.76, 0, 0.24, 1),
        });
        menu.style.pointerEvents = "none";
      }
    };
    run();
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-2 left-[5vw] z-50 w-[90vw] flex items-center justify-between px-2 py-2 rounded-full transition-all duration-500 border ${
          scrolled
            ? "bg-[#290052]/50 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
            : "bg-white/5 backdrop-blur-md border-white/5"
        }`}
      >
        {/* Logo */}
        <Link
          href="/home"
          className="flex h-12 items-center gap-3 pl-2 text-white font-semibold text-2xl tracking-tight"
        >
          <Image
            src="/logo.webp"
            alt="Emberloft logo"
            width={500}
            height={397}
            className="h-9 md:h-12 w-auto"
          />
          emberloft
        </Link>

        {/* Nav links pill - desktop only */}
        <div className="hidden md:flex h-12 items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex h-full items-center justify-center px-4 rounded-full text-[clamp(0.8rem,1vw,1.125rem)] font-medium transition-colors duration-800 ease-out ${
                pathname === link.href
                  ? "bg-[#F5F5F5] text-[#0A0A0A]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA button - desktop only */}
        <ArrowButton href="/contact" className="hidden md:inline-flex">
          Let&apos;s Build Together
        </ArrowButton>

        {/* Hamburger button - mobile only */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white rounded-full transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#080808] flex flex-col md:hidden"
        style={{ clipPath: "inset(0 0 100% 0)", pointerEvents: "none" }}
      >
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#EEBA0B]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-24 left-0 w-60 h-60 bg-[#FB4B54]/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="pt-24 px-6 flex flex-col flex-1">
          {navLinks.map((link, i) => (
            <div
              key={link.href}
              ref={(el) => {
                linkItemsRef.current[i] = el;
              }}
              className="border-b border-white/10 opacity-0"
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between py-5 transition-colors group ${
                  pathname === link.href ? "text-[#EEBA0B]" : "text-white"
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-white/25 text-xs font-mono tabular-nums w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-4xl font-geist font-black group-hover:translate-x-2 transition-transform duration-200">
                    {link.label}
                  </span>
                </div>
                <span className="text-white/30 text-lg">↗</span>
              </Link>
            </div>
          ))}

          {/* CTA */}
          <div ref={ctaRef} className="mt-auto pb-12 pt-8 opacity-0">
            <ArrowButton href="/contact" onClick={() => setMenuOpen(false)}>
              Let&apos;s Build Together
            </ArrowButton>
          </div>
        </div>
      </div>
    </>
  );
}
