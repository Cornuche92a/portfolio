import Header from "@/components/header";
import "../globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import LocaleSwitch from "@/components/locale-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata, Viewport } from "next";
import {
  AUTHOR,
  SITE_NAME,
  SITE_URL,
  buildLanguageAlternates,
  pathForLocale,
} from "@/lib/seo";
import JsonLd from "@/components/json-ld";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
    { media: "(prefers-color-scheme: dark)", color: "#07070b" },
  ],
  colorScheme: "light dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const title = t("title");
  const description = t("description");
  const keywords = t("keywords")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  const ogTitle = t("ogTitle");
  const ogDescription = t("ogDescription");
  const ogLocale = t("locale");

  const canonical = pathForLocale(locale, "/");
  const languages = buildLanguageAlternates("/");
  languages["x-default"] = pathForLocale(routing.defaultLocale, "/");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: t("titleTemplate"),
    },
    description,
    keywords,
    applicationName: SITE_NAME,
    authors: [{ name: AUTHOR.name, url: SITE_URL }],
    creator: AUTHOR.name,
    publisher: AUTHOR.name,
    category: "technology",
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "profile",
      title: ogTitle,
      description: ogDescription,
      siteName: SITE_NAME,
      url: canonical,
      locale: ogLocale,
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => l.replace(/-/g, "_")),
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/opengraph-image"],
      creator: "@anas",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    manifest: "/manifest.webmanifest",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction} className="!scroll-smooth">
      <body
        className={`${inter.variable} ${mono.variable} font-sans relative overflow-x-hidden pt-28 sm:pt-36 antialiased`}
        style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:rounded-lg focus:bg-gray-950 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="aurora" aria-hidden="true" />
          <div className="aurora-tertiary" aria-hidden="true" />
          <div className="bg-grid-pattern fixed inset-0 -z-20" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />

          <ThemeContextProvider>
            <ActiveSectionContextProvider>
              <Header />
              {children}
              <Footer />

              <Toaster position="top-right" />
              <ThemeSwitch />
              <LocaleSwitch />
            </ActiveSectionContextProvider>
          </ThemeContextProvider>
        </NextIntlClientProvider>

        <JsonLd
          locale={locale}
          jobTitle={t("jobTitle")}
          description={t("description")}
        />
      </body>
    </html>
  );
}
