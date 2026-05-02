import { routing } from "@/i18n/routing";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://anas.dev"
).replace(/\/$/, "");

export const SITE_NAME = "Anas — Full-Stack & CyberSec";

export const AUTHOR = {
  name: "Anas",
  email: "anas.dev@icloud.com",
  github: "https://github.com/Cornuche92a",
  linkedin: "https://linkedin.com/in/anas922a/",
};

export const IMAGE_PATH = "/opengraph-image";

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pathForLocale(locale: string, path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) {
    return `${SITE_URL}${clean === "/" ? "" : clean}` || SITE_URL;
  }
  return `${SITE_URL}/${locale}${clean === "/" ? "" : clean}`;
}

export function buildLanguageAlternates(path = ""): Record<string, string> {
  const entries = routing.locales.map((locale) => [
    locale,
    pathForLocale(locale, path),
  ]);
  return Object.fromEntries(entries);
}
