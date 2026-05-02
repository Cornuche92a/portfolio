import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "404 — Page not found",
  description: "Cette page n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#07070b",
          color: "#f5f5f7",
          fontFamily: "system-ui, sans-serif",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "4rem", margin: 0, letterSpacing: "-0.03em" }}>
          404
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: 480,
            lineHeight: 1.6,
          }}
        >
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          style={{
            marginTop: 24,
            padding: "0.75rem 1.5rem",
            borderRadius: 9999,
            background: "#fff",
            color: "#07070b",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Retour à l&apos;accueil
        </Link>
      </body>
    </html>
  );
}
