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
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Anas | Portfolio Personnel",
  description: "Anas est un développeur full-stack avec 4 ans d'expérience.",
  keywords: [
    "Anas",
    "Portfolio",
    "Développeur",
    "Développeur Web",
    "Développeur Full-Stack",
    "Développeur Front-End",
    "Développeur Back-End",
    "Full-Stack",
    "Front-End",
    "Back-End",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Vercel",
    "React Email & Resend",
  ],
};

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

  return (
    <html lang={locale} className="!scroll-smooth">
      <body
        className={`${inter.variable} ${mono.variable} font-sans relative overflow-x-hidden pt-28 sm:pt-36 antialiased`}
        style={{ backgroundColor: "var(--bg)", color: "var(--ink)" }}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="aurora" />
          <div className="aurora-tertiary" />
          <div className="bg-grid-pattern fixed inset-0 -z-20"></div>
          <div className="noise-overlay" />

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
      </body>
    </html>
  );
}
