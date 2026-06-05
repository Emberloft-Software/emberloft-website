"use client";

import { useEffect, useRef, useState } from "react";

type Category = "web-static" | "web-wp" | "web-fullstack" | "mobile" | "social";

const categories: { id: Category; label: string }[] = [
  { id: "web-static", label: "Static Web" },
  { id: "web-wp", label: "WordPress" },
  { id: "web-fullstack", label: "Fullstack" },
  { id: "mobile", label: "Mobile App" },
  { id: "social", label: "Social Media" },
];

type Plan = {
  name: string;
  price: string;
  unit: string;
  tag?: string;
  description: string;
  features: string[];
  highlight: boolean;
  cta: string;
};

const plans: Record<Category, Plan[]> = {
  "web-static": [
    {
      name: "Spark",
      price: "Rs 25,000",
      unit: "one-time",
      description: "Personal portfolios, freelancers, or small local businesses.",
      highlight: false,
      cta: "Get started",
      features: [
        "Up to 5 pages",
        "Fully responsive",
        "Basic UI/UX design",
        "Contact form",
        "Google Maps integration",
        "Social media links",
        "SSL setup",
        "Basic on-page SEO",
        "1 revision round",
        "Delivery: 7 days",
      ],
    },
    {
      name: "Ember",
      price: "Rs 40,000",
      unit: "one-time",
      tag: "Most popular",
      description: "Small businesses that need a polished, professional site.",
      highlight: true,
      cta: "Apply now",
      features: [
        "Up to 10 pages",
        "Everything in Spark",
        "Animated hero banner",
        "Testimonials section",
        "WhatsApp chat button",
        "QR code for business",
        "Premium stock photos",
        "Google Analytics",
        "2 revision rounds",
        "Delivery: 12–18 days",
      ],
    },
    {
      name: "Forge",
      price: "Rs 60,000",
      unit: "one-time",
      description: "High-impact sites ready for the international market.",
      highlight: false,
      cta: "Get started",
      features: [
        "Up to 20 pages",
        "Everything in Ember",
        "Advanced animations",
        "Parallax sections",
        "Video backgrounds",
        "Mega menu navigation",
        "Blog / news section",
        "Google Search Console",
        "3 revision rounds",
        "Delivery: 20–28 days",
      ],
    },
  ],
  "web-wp": [
    {
      name: "Kindle",
      price: "Rs 28,000",
      unit: "one-time",
      description: "Bloggers, coaches, or anyone managing their own content.",
      highlight: false,
      cta: "Get started",
      features: [
        "Up to 6 pages",
        "Premium WordPress theme",
        "Mobile responsive",
        "Basic blog functionality",
        "Contact form setup",
        "SEO plugin (Yoast)",
        "Social sharing",
        "1 revision round",
        "Delivery: 7–10 days",
      ],
    },
    {
      name: "Blaze",
      price: "Rs 42,000",
      unit: "one-time",
      tag: "Most popular",
      description: "Feature-rich WordPress with more pages and functionality.",
      highlight: true,
      cta: "Apply now",
      features: [
        "Up to 15 pages",
        "Everything in Kindle",
        "Custom homepage (Elementor)",
        "Portfolio / gallery section",
        "Newsletter integration",
        "WhatsApp chat plugin",
        "Analytics + Search Console",
        "Security plugin (Wordfence)",
        "2 revision rounds",
        "Delivery: 14–20 days",
      ],
    },
    {
      name: "Inferno",
      price: "Rs 58,000",
      unit: "one-time",
      description: "Fully-loaded WordPress for growing businesses.",
      highlight: false,
      cta: "Get started",
      features: [
        "Up to 25 pages",
        "Everything in Blaze",
        "Events / booking section",
        "Multi-level navigation",
        "Full speed optimization",
        "Image lazy loading",
        "Custom 404 page",
        "Cookie consent page",
        "3 revision rounds",
        "Delivery: 22–30 days",
      ],
    },
  ],
  "web-fullstack": [
    {
      name: "Core",
      price: "Rs 80,000",
      unit: "one-time",
      description: "Dynamic, data-driven sites beyond what WordPress can offer.",
      highlight: false,
      cta: "Get started",
      features: [
        "Up to 8 frontend pages",
        "Custom UI/UX (Figma)",
        "User authentication",
        "Admin panel (basic)",
        "Database-stored forms",
        "REST API backend",
        "Cloud hosting setup",
        "Basic SEO",
        "2 revision rounds",
        "Delivery: 3–5 weeks",
      ],
    },
    {
      name: "Pro",
      price: "Rs 130,000",
      unit: "one-time",
      tag: "Most popular",
      description: "Real functionality — booking, dashboards, user features.",
      highlight: true,
      cta: "Apply now",
      features: [
        "Up to 15 frontend pages",
        "Everything in Core",
        "Role-based access",
        "Client dashboard",
        "File upload functionality",
        "Search and filter",
        "Email notifications",
        "Third-party API integration",
        "3 revision rounds",
        "Delivery: 5–8 weeks",
      ],
    },
    {
      name: "Scale",
      price: "Rs 200,000+",
      unit: "custom scope",
      description: "Marketplaces, platforms, or SaaS-style web apps.",
      highlight: false,
      cta: "Let's talk",
      features: [
        "Everything in Pro",
        "Multi-role user system",
        "Real-time features (WS)",
        "Advanced analytics",
        "Payment integration",
        "Automated email flows",
        "API documentation",
        "Staging environment",
        "4 revision rounds",
        "Delivery: 8–14 weeks",
      ],
    },
  ],
  "mobile": [
    {
      name: "Lite",
      price: "Rs 60,000",
      unit: "one-time",
      description: "Simple Flutter apps with clean UI and basic functionality.",
      highlight: false,
      cta: "Get started",
      features: [
        "Up to 8 screens",
        "Custom Flutter UI",
        "Firebase backend",
        "User login / signup",
        "Push notifications",
        "Android build (APK)",
        "Play Store ready",
        "Play Store submission",
        "2 revision rounds",
        "Delivery: 4–6 weeks",
      ],
    },
    {
      name: "Standard",
      price: "Rs 120,000",
      unit: "one-time",
      tag: "Most popular",
      description: "Booking, feeds, profiles, or service listing apps.",
      highlight: true,
      cta: "Apply now",
      features: [
        "Up to 18 screens",
        "Everything in Lite",
        "REST API integration",
        "Editable user profiles",
        "Image upload",
        "Search and filter",
        "In-app notifications",
        "Android + iOS builds",
        "3 revision rounds",
        "Delivery: 8–12 weeks",
      ],
    },
    {
      name: "Premium",
      price: "Rs 200,000+",
      unit: "custom scope",
      description: "Real-time, payments, or multi-role app systems.",
      highlight: false,
      cta: "Let's talk",
      features: [
        "20+ screens",
        "Everything in Standard",
        "Real-time chat / live data",
        "Payment integration",
        "Multi-role system",
        "Admin web panel",
        "Analytics integration",
        "App Store + Play Store",
        "30-day post-launch fixes",
        "Delivery: 12–18 weeks",
      ],
    },
  ],
  "social": [
    {
      name: "Starter",
      price: "Rs 7,000",
      unit: "/ month",
      description: "Clean, consistent social presence for one platform.",
      highlight: false,
      cta: "Get started",
      features: [
        "12 static posts/month",
        "Graphics + captions",
        "Facebook + Instagram",
        "Content calendar",
        "1 platform",
      ],
    },
    {
      name: "Growth",
      price: "Rs 13,000",
      unit: "/ month",
      tag: "Most popular",
      description: "Multi-platform content with performance tracking.",
      highlight: true,
      cta: "Apply now",
      features: [
        "20 posts/month",
        "Static + carousel mix",
        "2 platforms",
        "Hashtag research",
        "Content calendar",
        "Monthly performance report",
      ],
    },
    {
      name: "Reel Add-on",
      price: "Rs 9,000",
      unit: "/ month",
      description: "AI-assisted short reels for Instagram, Facebook, or TikTok.",
      highlight: false,
      cta: "Add on",
      features: [
        "4 reels/month (15–30s)",
        "Script writing included",
        "Instagram / Facebook / TikTok",
        "Add to any post package",
        "One-off: Rs 2,500–6,000",
      ],
    },
  ],
};

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("web-static");
  const [animated, setAnimated] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

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
    if (headingRef.current) {
      animate(headingRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        ease: "outExpo",
      });
    }
  };

  const switchCategory = async (cat: Category) => {
    if (cat === activeCategory) return;
    const { animate } = await import("animejs");

    if (cardsRef.current) {
      await animate(cardsRef.current, {
        opacity: [1, 0],
        translateY: [0, 16],
        duration: 200,
        ease: "inQuad",
      }).finished;
    }

    setActiveCategory(cat);

    if (cardsRef.current) {
      animate(cardsRef.current, {
        opacity: [0, 1],
        translateY: [-16, 0],
        duration: 400,
        ease: "outExpo",
      });
    }
  };

  const currentPlans = plans[activeCategory];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F2F2F0] py-[10vh] px-[5vw]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headingRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-[6vh]"
          style={{ opacity: 0 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-[2vh]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FB4B54]" />
              <span className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.18em] uppercase">
                Pricing
              </span>
            </div>
            <h2
              className="font-geist font-black text-black leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            >
              Transparent pricing.{" "}
              <span className="font-instrument-serif font-normal italic text-[#FB4B54]">
                No surprises.
              </span>
            </h2>
          </div>

          <p
            className="font-geist text-black/40 max-w-sm leading-relaxed lg:text-right"
            style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}
          >
            Every package is a fixed price. You know what you're paying before we start.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-[5vh]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => switchCategory(cat.id)}
              className="font-geist font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  activeCategory === cat.id ? "#0D0D0D" : "rgba(0,0,0,0.06)",
                color: activeCategory === cat.id ? "white" : "rgba(0,0,0,0.5)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch"
        >
          {currentPlans.map((plan, i) => (
            <div
              key={`${activeCategory}-${i}`}
              className="relative flex flex-col rounded-2xl overflow-hidden"
              style={{
                backgroundColor: plan.highlight ? "#0D0D0D" : "white",
                boxShadow: plan.highlight
                  ? "0 0 0 1px rgba(238,186,11,0.3), 0 24px 48px rgba(0,0,0,0.15)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              {/* Popular badge */}
              {plan.tag && (
                <div className="absolute top-5 right-5">
                  <span
                    className="font-geist font-semibold text-xs px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(238,186,11,0.15)",
                      color: "#EEBA0B",
                      border: "1px solid rgba(238,186,11,0.3)",
                    }}
                  >
                    {plan.tag}
                  </span>
                </div>
              )}

              <div className="p-7 flex flex-col flex-1">

                {/* Plan name */}
                <h3
                  className="font-geist font-black mb-1"
                  style={{
                    fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                    color: plan.highlight ? "white" : "black",
                  }}
                >
                  {plan.name}
                </h3>

                {/* Description */}
                <p
                  className="font-geist leading-relaxed mb-6"
                  style={{
                    fontSize: "clamp(0.78rem, 1vw, 0.875rem)",
                    color: plan.highlight
                      ? "rgba(255,255,255,0.4)"
                      : "rgba(0,0,0,0.4)",
                  }}
                >
                  {plan.description}
                </p>

                {/* Divider */}
                <div
                  className="h-px w-full mb-6"
                  style={{
                    backgroundColor: plan.highlight
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                  }}
                />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span className="mt-[3px] shrink-0">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle
                            cx="7" cy="7" r="7"
                            fill={plan.highlight ? "rgba(238,186,11,0.15)" : "rgba(0,0,0,0.06)"}
                          />
                          <path
                            d="M4.5 7L6.5 9L9.5 5"
                            stroke={plan.highlight ? "#EEBA0B" : "#FB4B54"}
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        className="font-geist leading-snug"
                        style={{
                          fontSize: "clamp(0.78rem, 1vw, 0.875rem)",
                          color: plan.highlight
                            ? "rgba(255,255,255,0.6)"
                            : "rgba(0,0,0,0.6)",
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Divider */}
                <div
                  className="h-px w-full mb-6"
                  style={{
                    backgroundColor: plan.highlight
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.06)",
                  }}
                />

                {/* Price + CTA row */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span
                      className="font-geist font-black leading-none"
                      style={{
                        fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                        color: plan.highlight ? "white" : "black",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="font-geist ml-1.5"
                      style={{
                        fontSize: "0.75rem",
                        color: plan.highlight
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(0,0,0,0.3)",
                      }}
                    >
                      {plan.unit}
                    </span>
                  </div>

                  <a
                    href="/contact"
                    className="flex items-center gap-2 font-geist font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:brightness-110 shrink-0"
                    style={{
                      backgroundColor: plan.highlight ? "#EEBA0B" : "#0D0D0D",
                      color: plan.highlight ? "black" : "white",
                    }}
                  >
                    {plan.cta}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 8L8 2M8 2H3M8 2V7"
                        stroke={plan.highlight ? "black" : "white"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="font-geist text-black/30 text-sm text-center mt-[4vh]"
        >
          All prices are in Sri Lankan Rupees. Need something custom?{" "}
          <a href="/contact" className="text-black/60 underline underline-offset-2 hover:text-black transition-colors">
            Let's talk.
          </a>
        </p>

      </div>
    </section>
  );
}