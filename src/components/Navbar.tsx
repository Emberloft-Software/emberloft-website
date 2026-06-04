"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
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

      {/* Nav links pill */}
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

      {/* CTA button */}
      <Link
        href="/contact"
        className="flex items-center gap-2 bg-[#EEBA0B] text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-[#d4f55a] transition-colors"
      >
        Explore More
        <span className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
          <ArrowIcon color="white" />
        </span>
      </Link>
    </nav>
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