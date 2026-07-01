import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "Web, Mobile, UI/UX & AI";
  const description =
    searchParams.get("description") ??
    "One studio. Four disciplines. Web, mobile, UI/UX and AI all under one roof. No outsourcing. No surprises.";

  const fontSize = title.length > 35 ? 50 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple glow — top-right */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(41,0,82,0.38) 0%, transparent 70%)",
          }}
        />

        {/* Red glow — bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,75,84,0.28) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "56px 80px",
            position: "relative",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "baseline", marginBottom: "auto" }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#EEBA0B",
                letterSpacing: "-1.5px",
              }}
            >
              ember
            </span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#F5F5F5",
                letterSpacing: "-1.5px",
              }}
            >
              loft
            </span>
          </div>

          {/* Page title */}
          <div
            style={{
              fontSize,
              fontWeight: 800,
              color: "#F5F5F5",
              lineHeight: 1.12,
              letterSpacing: "-2.5px",
              marginBottom: 18,
              maxWidth: 980,
            }}
          >
            {title}
          </div>

          {/* Gold rule */}
          <div
            style={{
              width: 44,
              height: 3,
              backgroundColor: "#EEBA0B",
              marginBottom: 22,
            }}
          />

          {/* Description */}
          <div
            style={{
              fontSize: 22,
              color: "rgba(245,245,245,0.5)",
              lineHeight: 1.6,
              maxWidth: 800,
              marginBottom: 36,
            }}
          >
            {description}
          </div>

          {/* CTA pill */}
          <div style={{ display: "flex", marginBottom: "auto" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#EEBA0B",
                color: "#0A0A0A",
                fontSize: 17,
                fontWeight: 700,
                padding: "13px 30px",
                borderRadius: 100,
                letterSpacing: "0.2px",
              }}
            >
              Start a project with us →
            </div>
          </div>

          {/* Bottom URL bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingTop: 26,
              borderTop: "1px solid rgba(245,245,245,0.08)",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#EEBA0B",
                boxShadow: "0 0 5px #EEBA0B",
              }}
            />
            <span
              style={{
                fontSize: 15,
                color: "rgba(245,245,245,0.35)",
                letterSpacing: "1.5px",
              }}
            >
              emberloft.studio
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
