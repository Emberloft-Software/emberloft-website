"use client";

import { useState } from "react";

const pairs = [
  { dont: "take every project.", do: "say no when it's not the right fit." },
  { dont: "outsource the thinking.", do: "design and build in-house, senior hands only." },
  { dont: "disappear after launch.", do: "stay on as your team after we ship." },
  { dont: "race to the cheapest price.", do: "price for the quality you actually get." },
  { dont: "do template work.", do: "build custom, from scratch, for you." },
];

export default function WorkSectionFlipGrid() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <section className="relative w-screen bg-[#F5F5F5] py-[12vh] px-[5vw]">
      <div className="flex items-center gap-2 mb-[6vh]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FB4B54]" />
        <span className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.18em] uppercase">
          Concept 04 — Flip Cards
        </span>
      </div>

      <h2
        className="font-instrument-serif italic font-normal text-black mb-[6vh]"
        style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
      >
        We don&apos;t...
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {pairs.map((pair, i) => {
          const isFlipped = flipped === i;
          return (
            <button
              key={pair.dont}
              onClick={() => setFlipped(isFlipped ? null : i)}
              className="relative h-[200px] md:h-[240px] text-left [perspective:1000px]"
              aria-pressed={isFlipped}
            >
              <div
                className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]"
                style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
              >
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-white border border-black/10 rounded-2xl p-5 flex flex-col justify-between">
                  <span className="text-[#FB4B54] text-2xl font-geist font-semibold">✕</span>
                  <span
                    className="font-geist font-medium text-black"
                    style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.3rem)", letterSpacing: "-0.02em" }}
                  >
                    {pair.dont}
                  </span>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 [backface-visibility:hidden] bg-[#0D0D0D] rounded-2xl p-5 flex flex-col justify-between"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <span className="text-[#EEBA0B] text-2xl font-geist font-semibold">✓</span>
                  <span
                    className="font-geist font-medium text-white"
                    style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)", letterSpacing: "-0.02em" }}
                  >
                    {pair.do}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="font-geist text-black/40 text-xs mt-[3vh]">Tap a card to flip it.</p>
    </section>
  );
}
