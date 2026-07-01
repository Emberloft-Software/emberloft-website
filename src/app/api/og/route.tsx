import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") ?? "Web, Mobile, UI/UX & AI";
  const description =
    searchParams.get("description") ??
    "A focused studio of three building web, mobile, UI/UX, and AI-integrated products. Fewer hands, more care.";

  const fontSize = title.length > 35 ? 52 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0A0A0A",
          padding: "0",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Purple glow — top-right corner */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, #290052 0%, transparent 70%)",
            opacity: 0.7,
          }}
        />

        {/* Red glow — bottom-left corner */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, #FB4B54 0%, transparent 70%)",
            opacity: 0.18,
          }}
        />

        {/* Content layer */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "60px 80px",
            position: "relative",
          }}
        >
          {/* Top: logo + gold accent bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: "auto" }}>
            {/* Logo wordmark */}
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#EEBA0B",
                  letterSpacing: "-1px",
                }}
              >
                ember
              </span>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#F5F5F5",
                  letterSpacing: "-1px",
                }}
              >
                loft
              </span>
            </div>

            {/* Divider dot */}
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: "#FB4B54",
              }}
            />

            {/* Studio label */}
            <span
              style={{
                fontSize: 11,
                color: "#EEBA0B",
                letterSpacing: "5px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              studio
            </span>
          </div>

          {/* Gold rule */}
          <div
            style={{
              width: 48,
              height: 3,
              backgroundColor: "#EEBA0B",
              marginBottom: 28,
            }}
          />

          {/* Page title */}
          <div
            style={{
              fontSize,
              fontWeight: 700,
              color: "#F5F5F5",
              lineHeight: 1.15,
              letterSpacing: "-2px",
              marginBottom: 22,
              maxWidth: 960,
            }}
          >
            {title}
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 21,
              color: "rgba(245,245,245,0.5)",
              lineHeight: 1.65,
              maxWidth: 820,
              marginBottom: "auto",
            }}
          >
            {description}
          </div>

          {/* Bottom URL bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingTop: 32,
              borderTop: "1px solid rgba(245,245,245,0.08)",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#EEBA0B",
                boxShadow: "0 0 6px #EEBA0B",
              }}
            />
            <span
              style={{
                fontSize: 16,
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
    {
      width: 1200,
      height: 630,
    },
  );
}
