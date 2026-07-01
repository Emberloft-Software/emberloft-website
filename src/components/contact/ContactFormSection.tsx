"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

type FormData = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

const services = [
  "Web Development",
  "Mobile App",
  "UI / UX Design",
  "AI Integration",
  "Social Media",
  "Not sure yet",
];

const budgets = [
  "Under Rs 30,000",
  "Rs 30,000 – 80,000",
  "Rs 80,000 – 200,000",
  "Rs 200,000+",
  "Let's discuss",
];

export default function ContactForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
          runEntrance();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  const runEntrance = async () => {
    const { createTimeline } = await import("animejs");
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(leftRef.current!, {
      opacity: [0, 1],
      translateX: [-40, 0],
      duration: 800,
    }).add(rightRef.current!, {
      opacity: [0, 1],
      translateX: [40, 0],
      duration: 800,
    }, "-=600");
  };

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      if (siteKey && window.grecaptcha) {
        const token = await new Promise<string>((resolve, reject) => {
          window.grecaptcha!.ready(() => {
            window
              .grecaptcha!.execute(siteKey, { action: "contact_form" })
              .then(resolve)
              .catch(reject);
          });
        });

        const verifyRes = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
          alert("We couldn't verify this submission as human. Please try again.");
          setSending(false);
          return;
        }
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "1a1b7fd2-8894-4ac4-a5ba-a5cb54455bfa",
          name: form.name,
          email: form.email,
          company: form.company,
          service: form.service,
          budget: form.budget,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      alert("Network error. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  const inputBase = (name: string) => ({
    borderColor: focused === name ? "#FB4B54" : "rgba(0,0,0,0.1)",
    outline: "none",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    backgroundColor: focused === name ? "white" : "rgba(0,0,0,0.02)",
  });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F2F2F0] py-[10vh] px-[5vw]"
    >
      {siteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
          strategy="afterInteractive"
        />
      )}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[6vw] items-start">

          {/* ── Left: info panel ── */}
          <div
            ref={leftRef}
            className="flex flex-col gap-8 lg:sticky lg:top-[12vh]"
            style={{ opacity: 0 }}
          >
            {/* Label */}
            <div>
              <div className="flex items-center gap-2 mb-[2vh]">
                <span className="text-[#FB4B54] text-sm">✦</span>
                <span className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.18em] uppercase">
                  Get in touch
                </span>
              </div>
              <h2
                className="font-geist font-black text-black leading-[0.95]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
              >
                Tell us what
                you're{" "}
                <span className="font-instrument-serif font-normal italic text-[#FB4B54]">
                  building.
                </span>
              </h2>
            </div>

            <p
              className="font-geist text-black/40 leading-relaxed"
              style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
            >
              We read every application ourselves. If it feels like a fit,
              you'll hear back within 48 hours, from the people who will
              actually work on it.
            </p>

            {/* Info rows */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "◎",
                  label: "Response time",
                  value: "Within 48 hours",
                  accent: "#FB4B54",
                },
                {
                  icon: "▲",
                  label: "Current availability",
                  value: "Booking Q3 2026",
                  accent: "#EEBA0B",
                },
                {
                  icon: "✦",
                  label: "Based in",
                  value: "Sri Lanka · Working globally",
                  accent: "#290052",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-black/5"
                >
                  <span
                    className="text-lg w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      color: item.accent,
                      backgroundColor: `${item.accent}12`,
                    }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="font-geist text-xs text-black/30 mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-geist font-semibold text-black text-sm">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct email */}
            <div className="pt-4 border-t border-black/8">
              <p className="font-geist text-xs text-black/30 mb-1 uppercase tracking-widest">
                Or email directly
              </p>
              <a
                href="mailto:emberloft.studio@gmail.com"
                className="font-geist font-semibold text-black hover:text-[#FB4B54] transition-colors duration-200"
                style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)" }}
              >
                emberloft.studio@gmail.com
              </a>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            ref={rightRef}
            style={{ opacity: 0 }}
          >
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-xs font-semibold text-black/40 uppercase tracking-widest">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className="font-geist text-sm text-black rounded-xl px-4 py-3.5 border w-full"
                      style={inputBase("name")}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-geist text-xs font-semibold text-black/40 uppercase tracking-widest">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className="font-geist text-sm text-black rounded-xl px-4 py-3.5 border w-full"
                      style={inputBase("email")}
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-geist text-xs font-semibold text-black/40 uppercase tracking-widest">
                    Company / Project name
                  </label>
                  <input
                    type="text"
                    placeholder="What are you building?"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    onFocus={() => setFocused("company")}
                    onBlur={() => setFocused(null)}
                    className="font-geist text-sm text-black rounded-xl px-4 py-3.5 border w-full"
                    style={inputBase("company")}
                  />
                </div>

                {/* Service selector */}
                <div className="flex flex-col gap-2">
                  <label className="font-geist text-xs font-semibold text-black/40 uppercase tracking-widest">
                    Service needed *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, service: s })}
                        className="font-geist text-sm px-4 py-2 rounded-full border transition-all duration-200"
                        style={{
                          borderColor:
                            form.service === s
                              ? "#FB4B54"
                              : "rgba(0,0,0,0.1)",
                          backgroundColor:
                            form.service === s
                              ? "#FB4B54"
                              : "transparent",
                          color:
                            form.service === s
                              ? "white"
                              : "rgba(0,0,0,0.5)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget selector */}
                <div className="flex flex-col gap-2">
                  <label className="font-geist text-xs font-semibold text-black/40 uppercase tracking-widest">
                    Budget range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        className="font-geist text-sm px-4 py-2 rounded-full border transition-all duration-200"
                        style={{
                          borderColor:
                            form.budget === b
                              ? "#290052"
                              : "rgba(0,0,0,0.1)",
                          backgroundColor:
                            form.budget === b
                              ? "#290052"
                              : "transparent",
                          color:
                            form.budget === b
                              ? "white"
                              : "rgba(0,0,0,0.5)",
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-geist text-xs font-semibold text-black/40 uppercase tracking-widest">
                    Tell us more *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="What's the project? What problem are you solving? What does success look like?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    className="font-geist text-sm text-black rounded-xl px-4 py-3.5 border w-full resize-none"
                    style={inputBase("message")}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending || !form.name || !form.email || !form.service || !form.message}
                  className="flex items-center justify-center gap-3 font-geist font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: sending ? "#290052" : "#FB4B54",
                    color: "white",
                  }}
                >
                  {sending ? (
                    <>
                      <SpinnerIcon />
                      Sending your application...
                    </>
                  ) : (
                    <>
                      Send application
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M8 2H3M8 2V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="font-geist text-xs text-black/25 text-center">
                  No commitment required. We'll reach out only if it's a fit.
                </p>
              </form>
            ) : (
              <SuccessState name={form.name} />
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Success state ── */
function SuccessState({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const run = async () => {
      const { animate, createTimeline } = await import("animejs");
      const tl = createTimeline({ defaults: { ease: "outExpo" } });
      const children = ref.current?.querySelectorAll(".success-item");
      if (children) {
        animate(children, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: (_: unknown, i: number) => i * 100,
          duration: 600,
        });
      }
    };
    run();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center py-[8vh] px-[4vw] rounded-2xl bg-white border border-black/5"
    >
      <div
        className="success-item opacity-0 w-16 h-16 rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: "#FB4B5415", border: "2px solid #FB4B54" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 12L10 17L19 7"
            stroke="#FB4B54"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h3
        className="success-item opacity-0 font-geist font-black text-black mb-3"
        style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
      >
        Got it, {name.split(" ")[0]}.
      </h3>

      <p className="success-item opacity-0 font-geist text-black/40 leading-relaxed max-w-sm mb-8">
        Your application is with us. We'll read it properly and get back to
        you within 48 hours, no automated replies.
      </p>

      <div
        className="success-item opacity-0 flex items-center gap-2 border border-black/8 rounded-full px-4 py-2"
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#EEBA0B]"
          style={{ boxShadow: "0 0 5px #EEBA0B88" }}
        />
        <span className="font-geist text-xs text-black/40 tracking-widest uppercase">
          Currently booking Q3 2026
        </span>
      </div>
    </div>
  );
}

/* ── Spinner ── */
function SpinnerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <circle
        cx="8" cy="8" r="6"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="2"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}