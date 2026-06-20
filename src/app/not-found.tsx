import ArrowButton from "@/components/ArrowButton";

export default function NotFound() {
  return (
    <main className="relative w-full bg-[#080008] overflow-hidden flex items-center justify-center px-[5vw]" style={{ minHeight: "80vh" }}>
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <span className="font-geist font-semibold text-xs tracking-[0.2em] uppercase mb-[3vh] block text-[#FB4B54]">
          · 404
        </span>
        <h1
          className="font-geist font-black text-white leading-[0.95] mb-[3vh]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          Page not{" "}
          <span className="font-instrument-serif font-normal italic text-[#FB4B54]">
            found.
          </span>
        </h1>
        <p className="font-geist text-white/40 leading-relaxed mb-[5vh]" style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)" }}>
          The page you're looking for doesn't exist or has moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <ArrowButton href="/home" variant="solid">
            Back to Home
          </ArrowButton>
          <ArrowButton href="/contact" variant="outline">
            Contact Us
          </ArrowButton>
        </div>
      </div>
    </main>
  );
}
