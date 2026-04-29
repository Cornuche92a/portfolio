"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, { label: string; flag: string }> = {
  ar: { label: "العربية", flag: "🇸🇦" },
  de: { label: "Deutsch", flag: "🇩🇪" },
  en: { label: "English", flag: "🇬🇧" },
  es: { label: "Español", flag: "🇪🇸" },
  fr: { label: "Français", flag: "🇫🇷" },
  lt: { label: "Lietuvių", flag: "🇱🇹" },
  nl: { label: "Nederlands", flag: "🇳🇱" },
  sv: { label: "Svenska", flag: "🇸🇪" },
};

export default function LocaleSwitch() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LOCALE_LABELS[currentLocale] ?? LOCALE_LABELS.fr;

  return (
    <div ref={ref} className="fixed bottom-5 right-20 z-[998]">
      <button
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950 text-xl"
      >
        {current.flag}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute bottom-[3.5rem] right-0 min-w-[12rem] rounded-2xl bg-white bg-opacity-95 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl overflow-hidden dark:bg-gray-950 dark:border-black/40"
        >
          {routing.locales.map((locale) => {
            const { label, flag } = LOCALE_LABELS[locale];
            const isActive = locale === currentLocale;
            return (
              <li key={locale}>
                <button
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setOpen(false);
                    router.replace(pathname, { locale });
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-gray-100 dark:hover:bg-white/10 ${
                    isActive
                      ? "font-semibold text-gray-950 dark:text-white"
                      : "text-gray-700 dark:text-white/70"
                  }`}
                >
                  <span className="text-xl">{flag}</span>
                  <span>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
