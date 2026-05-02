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
        className="inline-flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-[color:var(--line)] bg-white/80 text-xl shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-xl dark:bg-white/[0.06] dark:hover:border-white/20"
      >
        {current.flag}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute bottom-[3.5rem] right-0 min-w-[12rem] overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white/95 shadow-2xl backdrop-blur dark:bg-[#111]/95"
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
