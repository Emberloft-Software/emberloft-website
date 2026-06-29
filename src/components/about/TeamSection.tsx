"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const team = [
  {
    name: "Chanka Herath",
    role: "Co-Founder & Lead Engineer",
    description:
      "Architects and builds the technical foundation. Full-stack development, system design, and making sure everything actually works.",
    tags: ["Full-Stack Dev", "Mobile", "AI Integration"],
    image: "/team-chanka-herath.webp",
    accent: "#FB4B54",
    linkedin: "https://www.linkedin.com/in/chanka-herath/",
  },
  {
    name: "Sanuth Mandepa",
    role: "Co-Founder & Creative Director",
    description:
      "Owns the visual language. UI/UX design, brand direction, WordPress builds, and making sure everything looks as good as it performs.",
    tags: ["UI / UX", "WordPress", "Brand"],
    image: "/team-sanuth-mandepa.webp",
    accent: "#290052",
    linkedin: "https://www.linkedin.com/in/sanuthmandepa/",
  },
  {
    name: "Ranan Hewawasam",
    role: "Behavioural Design Consultant",
    description:
      "Brings the psychology. Ensures every product is built around how people actually think, feel, and behave, not just how they're assumed to.",
    tags: ["User Psychology", "Behavioural UX", "Research"],
    image: "/team-ranan-hewawasam.webp",
    accent: "#FB4B54",
    linkedin: "https://www.linkedin.com/in/ranan-hewawasam-3b3402243/",
  },
  {
    name: "Dinaga Nethusahan",
    role: "Videography & Visual Content Lead",
    description:
      "Tells the story in motion. Handles videography, social media content, and the graphic work that gives every release its visual edge.",
    tags: ["Videography", "Social Media", "Graphic Design"],
    image: "/dinaga-nethusahan-team.webp",
    accent: "#290052",
    linkedin: "https://www.linkedin.com/in/dinaga-nethusahan-8aa992396/",
  },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animated, setAnimated] = useState(false);

  const runAnimation = async () => {
    const { animate, stagger } = await import("animejs");

    if (headingRef.current) {
      animate(headingRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        ease: "outExpo",
      });
    }

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    animate(cards, {
      opacity: [0, 1],
      translateY: [50, 0],
      scale: [0.97, 1],
      delay: stagger(120, { start: 250 }),
      duration: 700,
      ease: "outExpo",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);
          observer.disconnect();
          runAnimation();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F2F2F0] py-[10vh] px-[5vw]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div
          ref={headingRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-[7vh]"
          style={{ opacity: 0 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-[2vh]">
              <span className="text-[#FB4B54] text-sm">✦</span>
              <span className="font-geist text-[#FB4B54] text-xs font-semibold tracking-[0.18em] uppercase">
                The People
              </span>
            </div>
            <h2
              className="font-geist font-black text-black leading-[0.95]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Small team.{" "}
              <span className="font-instrument-serif font-normal italic text-[#FB4B54]">
                Serious
              </span>{" "}
              people.
            </h2>
          </div>

          <p
            className="font-geist text-black/40 max-w-sm leading-relaxed lg:text-right"
            style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}
          >
            A small crew who care deeply about what gets shipped. No filler.
            No bench.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group relative flex flex-col rounded-2xl overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Photo area */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: "clamp(480px, 58vh, 620px)",
                  backgroundColor:
                    member.accent === "#290052" ? "#EDE8F5" : "#FFE8E9",
                }}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Fallback placeholder if image missing
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Placeholder initials shown when no image */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ zIndex: -1 }}
                >
                  <span
                    className="font-geist font-black text-7xl select-none"
                    style={{
                      color:
                        member.accent === "#290052"
                          ? "rgba(41,0,82,0.12)"
                          : "rgba(251,75,84,0.12)",
                    }}
                  >
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                {/* Accent bar at bottom of photo */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
                  style={{ backgroundColor: member.accent }}
                />
              </div>

              {/* Info area */}
              <div
                className="flex flex-col flex-1 p-6"
                style={{ backgroundColor: "white" }}
              >
                {/* Name + LinkedIn */}
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-geist font-black text-black text-lg leading-tight">
                    {member.name}
                  </h3>

                  {member.linkedin && member.linkedin !== "#" && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border border-black/10 hover:border-[#FB4B54] hover:bg-[#FB4B54] transition-all duration-200 group/link mt-0.5"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="transition-colors duration-200 group-hover/link:fill-white"
                        style={{ fill: "rgba(0,0,0,0.4)" }}
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Role */}
                <p
                  className="font-geist font-semibold mb-3 text-sm"
                  style={{ color: member.accent }}
                >
                  {member.role}
                </p>

                {/* Description */}
                <p className="font-geist text-black/50 text-sm leading-relaxed mb-5 flex-1">
                  {member.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {member.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="font-geist text-xs font-medium px-3 py-1 rounded-full border"
                      style={{
                        borderColor:
                          member.accent === "#290052"
                            ? "rgba(41,0,82,0.15)"
                            : "rgba(251,75,84,0.15)",
                        color:
                          member.accent === "#290052"
                            ? "rgba(41,0,82,0.6)"
                            : "rgba(251,75,84,0.7)",
                        backgroundColor:
                          member.accent === "#290052"
                            ? "rgba(41,0,82,0.04)"
                            : "rgba(251,75,84,0.04)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-[4vh] flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-black/10" />
          <p className="font-geist text-black/25 text-xs tracking-widest uppercase">
            Based in Sri Lanka · Working globally
          </p>
          <div className="h-px w-12 bg-black/10" />
        </div>
      </div>
    </section>
  );
}
