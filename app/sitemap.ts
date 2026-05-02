import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { buildLanguageAlternates, pathForLocale } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = buildLanguageAlternates("/");

  return routing.locales.map((locale) => ({
    url: pathForLocale(locale, "/"),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
