"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Animate open / close
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const run = async () => {
      const { animate, stagger } = await import("animejs");
      const menu = menuRef.current;
      if (!menu) return;

      const items = [
        ...linkItemsRef.current,
        ctaRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (menuOpen) {
        menu.style.pointerEvents = "auto";
        animate(menu, {
          clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
          duration: 650,
          ease: "cubicBezier(0.76, 0, 0.24, 1)",
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
          ease: "cubicBezier(0.76, 0, 0.24, 1)",
        });
        menu.style.pointerEvents = "none";
      }
    };
    run();
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#290052]/50 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
            : "bg-white/5 backdrop-blur-md border-white/5"
        }`}
      >
        {/* Logo */}
        <Link href="/home" className="text-white font-semibold text-lg tracking-tight">
          emberloft
        </Link>

        {/* Nav links pill — desktop only */}
        <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-2 py-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA button — desktop only */}
        <Link
          href="/contact"
          className="hidden md:flex items-center gap-2 bg-[#EEBA0B] text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#d4f55a] transition-colors"
        >
          Explore More
          <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
            <ArrowIcon color="white" />
          </span>
        </Link>

        {/* Hamburger button — mobile only */}
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
              ref={(el) => { linkItemsRef.current[i] = el; }}
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
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 bg-[#EEBA0B] text-black font-semibold text-sm px-6 py-3 rounded-full hover:brightness-110 transition-all"
            >
              Explore More
              <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                <ArrowIcon color="white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
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
