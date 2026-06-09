"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    q: "How quickly do you respond?",
    a: "Within 48 hours. Every application is read by the people who will work on it — not a sales team.",
  },
  {
    q: "Do you take on small projects?",
    a: "We take on projects that fit. Budget isn't the only filter — we care more about the problem being solved and whether we're the right people to solve it.",
  },
  {
    q: "Can we start a conversation before committing?",
    a: "Yes. Fill out the form and we'll jump on a no-obligation discovery call to see if there's a fit.",
  },
  {
    q: "Are your prices negotiable?",
    a: "Our packages are fixed-price for a reason — it protects you as much as us. Custom scopes get custom quotes.",
  },
];

export default function ContactInfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
          runEntrance();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const runEntrance = async () => {
    const { animate, stagger } = await import("animejs");

    if (leftRef.current) {
      animate(leftRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        ease: "outExpo",
      });
    }

    const items = rightRef.current?.querySelectorAll(".faq-item");
    if (items) {
      animate(items, {
        opacity: [0, 1],
        translateX: [30, 0],
        delay: stagger(80, { start: 200 }),
        duration: 600,
        ease: "outExpo",
      });
    }
  };

  const toggleFaq = async (i: number) => {
    const { animate } = await import("animejs");
    const isOpening = openFaq !== i;

    if (openFaq !== null) {
      const prev = answerRefs.current[openFaq];
      if (prev) {
        animate(prev, {
          height: [prev.scrollHeight, 0],
          opacity: [1, 0],
          duration: 250,
          ease: "inQuad",
        });
      }
    }

    setOpenFaq(isOpening ? i : null);

    if (isOpening) {
      await new Promise((r) => setTimeout(r, 20));
      const next = answerRefs.current[i];
      if (next) {
        animate(next, {
          height: [0, next.scrollHeight],
          opacity: [0, 1],
          duration: 380,
          ease: "outExpo",
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0D0D0D] py-[10vh] px-[5vw]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[6vw]">

        {/* ── Left: social + location ── */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <div className="flex items-center gap-2 mb-[3vh]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EEBA0B]" />
            <span className="font-geist text-[#EEBA0B] text-xs font-semibold tracking-[0.18em] uppercase">
              Find us
            </span>
          </div>

          <h3
            className="font-geist font-black text-white leading-tight mb-[4vh]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            We're a small team.{" "}
            <span className="font-instrument-serif font-normal italic text-[#EEBA0B]">
              Easy to reach.
            </span>
          </h3>

          {/* Social links */}
          <div className="flex flex-col gap-3 mb-[5vh]">
            {[
              { label: "LinkedIn", handle: "@emberloft", href: "#", color: "#EEBA0B" },
              { label: "Twitter / X", handle: "@emberloft", href: "#", color: "#FB4B54" },
              { label: "Dribbble", handle: "@emberloft", href: "#", color: "#EEBA0B" },
              { label: "Email", handle: "hello@emberloft.io", href: "mailto:hello@emberloft.io", color: "#FB4B54" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="group flex items-center justify-between px-5 py-4 rounded-xl border border-white/5 hover:border-white/15 transition-all duration-200"
                style={{ backgroundColor: "#161616" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: link.color }}
                  />
                  <span className="font-geist font-semibold text-white/60 text-sm group-hover:text-white transition-colors duration-200">
                    {link.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-geist text-white/30 text-sm">
                    {link.handle}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 12 12" fill="none"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ transform: "rotate(-45deg)" }}
                  >
                    <path d="M2 10L10 2M10 2H4M10 2V8"
                      stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
              </a>
            ))}
          </div>

          {/* Location card */}
          <div
            className="rounded-2xl p-6 border border-white/5"
            style={{ backgroundColor: "#161616" }}
          >
            <p className="font-geist text-white/25 text-xs tracking-widest uppercase mb-3">
              Location
            </p>
            <p className="font-geist font-black text-white text-lg mb-1">
              Sri Lanka
            </p>
            <p className="font-geist text-white/40 text-sm leading-relaxed">
              Remote-first. We work with clients globally across
              Europe, the Middle East, Southeast Asia, and beyond.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-[#EEBA0B]"
                style={{ boxShadow: "0 0 6px #EEBA0B99" }}
              />
              <span className="font-geist text-[#EEBA0B] text-xs">
                GMT+5:30 · Available for async across all time zones
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: quick FAQs ── */}
        <div ref={rightRef}>
          <div className="flex items-center gap-2 mb-[3vh]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FB4B54]" />
            <span className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.18em] uppercase">
              Before you reach out
            </span>
          </div>

          <h3
            className="font-geist font-black text-white leading-tight mb-[4vh]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
          >
            Quick{" "}
            <span className="font-instrument-serif font-normal italic text-[#FB4B54]">
              answers.
            </span>
          </h3>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item opacity-0 rounded-xl border border-white/5 overflow-hidden"
                style={{ backgroundColor: "#161616" }}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group"
                >
                  <span className="font-geist font-semibold text-white/70 text-sm group-hover:text-white transition-colors duration-200 pr-4">
                    {faq.q}
                  </span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300"
                    style={{
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      borderColor: openFaq === i ? "#FB4B54" : "rgba(255,255,255,0.1)",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1V9M1 5H9"
                        stroke={openFaq === i ? "#FB4B54" : "rgba(255,255,255,0.4)"}
                        strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div
                  ref={(el) => { answerRefs.current[i] = el; }}
                  style={{ height: 0, opacity: 0, overflow: "hidden" }}
                >
                  <p className="font-geist text-white/40 text-sm leading-relaxed px-5 pb-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}