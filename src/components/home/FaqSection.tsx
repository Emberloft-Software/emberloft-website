"use client";

import { useEffect, useRef, useState } from "react";

const faqs = [
  {
    question: "How do you ensure quality on every project?",
    answer:
      "Every project goes through a rigorous internal review process. We keep our team small on purpose — senior eyes on every deliverable, every time. Nothing ships without being stress-tested against the brief.",
  },
  {
    question: "How many projects do you take on at once?",
    answer:
      "We intentionally limit ourselves to a small number of active engagements. This isn't a constraint — it's the model. Fewer projects means more focus, better work, and a team that's actually present.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes, but selectively. We work best with founders who have clarity on what they're building and why. We can help sharpen the vision, but we're not the right fit if the product direction is still undefined.",
  },
  {
    question: "What does your process look like?",
    answer:
      "We start with a discovery phase to understand your goals, users, and constraints. From there we move into design, then build — with tight feedback loops throughout. No big reveal at the end.",
  },
  {
    question: "Do you offer ongoing retainers?",
    answer:
      "Yes. A number of our clients stay on after launch for iterative work, performance optimisation, and continued design. Retainers are scoped individually based on what makes sense.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Depends entirely on scope. A focused marketing site can be four to six weeks. A full product build is typically three to five months. We'll give you a realistic timeline after the discovery call.",
  },
  {
    question: "What's the best way to get started?",
    answer:
      "Fill out the application form. We review every submission and respond within a few days. If it feels like a fit we'll set up a call to go deeper.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [animated, setAnimated] = useState(false);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const runEntrance = async () => {
    const { animate, stagger } = await import("animejs");

    if (headingRef.current) {
      animate(headingRef.current, {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 800,
        ease: "easeOutExpo",
      });
    }

    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    animate(items, {
      opacity: [0, 1],
      translateY: [24, 0],
      delay: stagger(70, { start: 200 }),
      duration: 600,
      ease: "easeOutExpo",
    });
  };

  // Entrance animation
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

  // Animate accordion open/close
  const toggleItem = async (index: number) => {
    const { animate } = await import("animejs");
    const isOpening = openIndex !== index;

    // Close currently open one
    if (openIndex !== null && openIndex !== index) {
      const prevAnswer = answerRefs.current[openIndex];
      if (prevAnswer) {
        animate(prevAnswer, {
          height: [prevAnswer.scrollHeight, 0],
          opacity: [1, 0],
          duration: 300,
          ease: "easeInOutQuad",
        });
      }
    }

    setOpenIndex(isOpening ? index : null);

    // Open new one
    const answer = answerRefs.current[index];
    if (answer) {
      if (isOpening) {
        const targetHeight = answer.scrollHeight;
        animate(answer, {
          height: [0, targetHeight],
          opacity: [0, 1],
          duration: 400,
          ease: "easeOutExpo",
        });
      } else {
        animate(answer, {
          height: [answer.scrollHeight, 0],
          opacity: [1, 0],
          duration: 300,
          ease: "easeInOutQuad",
        });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="w-screen bg-[#ffffff] py-[12vh] px-[5vw]"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-[6vw]">

        {/* ── Left: heading ── */}
        <div
          ref={headingRef}
          className="opacity-0 shrink-0 lg:w-[28%] flex flex-col justify-start"
        >
          {/* Label */}
          <div className="flex items-center gap-2 mb-[3vh]">
            <span className="font-geist text-[#FB4B54] text-xs font-medium tracking-[0.18em] uppercase">
              ✦ FAQ&apos;s
            </span>
          </div>

          <h2
            className="font-geist font-medium text-black leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", letterSpacing: "-0.05em" }}
          >
            Things
            <br />
            worth
            <br />
            <span
              className="font-instrument-serif font-normal italic"
              style={{ color: "#FB4B54", letterSpacing: "0" }}
            >
              knowing
            </span>
            <span className="font-geist font-medium text-black">.</span>
          </h2>
        </div>

        {/* ── Right: accordion ── */}
        <div className="flex-1 flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="opacity-0 bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              {/* Question row */}
              <button
                onClick={() => toggleItem(i)}
                className="w-full flex items-center justify-between px-6 py-[2.2vh] text-left group"
              >
                <span
                  className="font-geist font-medium text-black transition-colors duration-200 group-hover:text-[#FB4B54] pr-4"
                  style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}
                >
                  {faq.question}
                </span>

                {/* +/× icon */}
                <span
                  className="shrink-0 w-7 h-7 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300"
                  style={{
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    borderColor: openIndex === i ? "#FB4B54" : "rgba(0,0,0,0.1)",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1V11M1 6H11"
                      stroke={openIndex === i ? "#FB4B54" : "black"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>

              {/* Answer — animated height */}
              <div
                ref={(el) => { answerRefs.current[i] = el; }}
                style={{
                  height: 0,
                  opacity: 0,
                  overflow: "hidden",
                }}
              >
                <p
                  className="font-geist text-black/50 leading-relaxed px-6 pb-[2.2vh]"
                  style={{ fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)" }}
                >
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}