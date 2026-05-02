import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anas — Full-Stack Developer & Cybersecurity Consultant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background:
            "radial-gradient(120% 80% at 10% 0%, rgba(99,102,241,0.55) 0%, transparent 60%)," +
            "radial-gradient(120% 80% at 100% 100%, rgba(236,72,153,0.5) 0%, transparent 60%)," +
            "linear-gradient(180deg, #07070b 0%, #0a0a12 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <div
            style={{
              width: 40,
              height: 2,
              background:
                "linear-gradient(90deg, #a5b4fc, #f9a8d4, #fde68a)",
            }}
          />
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Anas.</span>
            <span
              style={{
                fontSize: 54,
                fontWeight: 500,
                background:
                  "linear-gradient(120deg, #a5b4fc 0%, #f9a8d4 50%, #fde68a 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Full-Stack Dev & CyberSec Consultant
            </span>
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            React · Next.js · TypeScript · Node.js · Penetration Testing ·
            HackTheBox
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#10b981",
                boxShadow: "0 0 16px rgba(16,185,129,0.7)",
              }}
            />
            Available for freelance
          </div>
          <div style={{ fontFamily: "ui-monospace, monospace" }}>
            anas.dev
          </div>
        </div>
      </div>
    ),
    size
  );
}
