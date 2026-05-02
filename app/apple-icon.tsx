import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #6366f1 0%, #ec4899 60%, #f59e0b 100%)",
          color: "#fff",
          fontSize: 120,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: 36,
        }}
      >
        A
      </div>
    ),
    size
  );
}
