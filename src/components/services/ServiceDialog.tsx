"use client";

import { useEffect, useState } from "react";

const ACCENT = "#FB4B54";

type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  stat: string;
};

type ServiceDialogProps = {
  service: Service | null;
  onClose: () => void;
};

export default function ServiceDialog({ service, onClose }: ServiceDialogProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setForm({ name: "", email: "", phone: "", message: "" });
      setSubmitted(false);
      setSending(false);
    }
  }, [service]);

  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [service, onClose]);

  if (!service) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "1a1b7fd2-8894-4ac4-a5ba-a5cb54455bfa",
          subject: `New "${service.title}" service enquiry`,
          service: service.title,
          name: form.name,
          email: form.email,
          phone: form.phone,
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
    borderColor: focused === name ? ACCENT : "rgba(255,255,255,0.1)",
    outline: "none",
    transition: "border-color 0.2s ease, background-color 0.2s ease",
    backgroundColor: focused === name ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{ backgroundColor: "#0A0A0A" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {/* Service header */}
          <span
            className="font-geist font-semibold text-xs tracking-[0.18em] uppercase"
            style={{ color: ACCENT }}
          >
            [{service.number}]
          </span>
          <h4
            className="font-geist font-medium text-white leading-tight mt-2 mb-4"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", letterSpacing: "-0.03em" }}
          >
            {service.title}
          </h4>

          <div
            className="rounded-2xl px-5 py-4 border mb-7"
            style={{ borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}14` }}
          >
            <p className="font-geist font-medium" style={{ color: ACCENT, fontSize: "1.05rem" }}>
              {service.stat}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-geist text-xs font-semibold text-white/40 uppercase tracking-widest">
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
                  className="font-geist text-sm text-white rounded-xl px-4 py-3.5 border w-full"
                  style={inputBase("name")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-geist text-xs font-semibold text-white/40 uppercase tracking-widest">
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
                  className="font-geist text-sm text-white rounded-xl px-4 py-3.5 border w-full"
                  style={inputBase("email")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-geist text-xs font-semibold text-white/40 uppercase tracking-widest">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+94 ..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  className="font-geist text-sm text-white rounded-xl px-4 py-3.5 border w-full"
                  style={inputBase("phone")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-geist text-xs font-semibold text-white/40 uppercase tracking-widest">
                  Tell us more
                </label>
                <textarea
                  rows={4}
                  placeholder={`What do you need for ${service.title}?`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="font-geist text-sm text-white rounded-xl px-4 py-3.5 border w-full resize-none"
                  style={inputBase("message")}
                />
              </div>

              <button
                type="submit"
                disabled={sending || !form.name || !form.email}
                className="flex items-center justify-center gap-3 font-geist font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed mt-2 hover:brightness-110"
                style={{ backgroundColor: ACCENT, color: "white" }}
              >
                {sending ? "Sending..." : "Start a project"}
                {!sending && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center py-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${ACCENT}15`, border: `2px solid ${ACCENT}` }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12L10 17L19 7"
                    stroke={ACCENT}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                className="font-geist font-medium text-white mb-3"
                style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}
              >
                Got it, {form.name.split(" ")[0]}.
              </h3>
              <p className="font-geist text-white/50 leading-relaxed max-w-sm">
                Your enquiry about {service.title} is with us. We'll get back to you within 48 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
