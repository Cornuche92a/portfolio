import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          fontFamily: "system-ui, -apple-system, sans-serif",
          borderRadius: 12,
        }}
      >
        A
      </div>
    ),
    size
  );
}