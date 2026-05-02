"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations();
  const linksObjects: { [key: string]: { hash: string; name: string } } =
    t.raw("Links");
  const linksArray = Object.values(linksObjects);

  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed top-0 left-1/2 h-[4.5rem] w-full -translate-x-1/2 border-b border-[color:var(--line)] bg-white/70 backdrop-blur-xl sm:top-6 sm:h-auto sm:w-auto sm:max-w-[min(48rem,calc(100%-2rem))] sm:rounded-full sm:border sm:px-1.5 sm:py-1.5 sm:shadow-[0_10px_40px_-10px_rgba(15,15,25,0.2)] dark:bg-white/[0.04] dark:sm:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
        initial={{ y: -100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="relative flex h-full items-center justify-center">
          <ul className="flex w-full flex-wrap items-center justify-center gap-x-1 gap-y-0.5 px-2 py-2 text-[0.82rem] font-medium text-gray-600 sm:w-auto sm:flex-nowrap sm:gap-1 sm:px-0 sm:py-0 sm:text-[0.85rem] dark:text-gray-400">
            {linksArray.map((link, i) => (
              <motion.li
                key={link.hash}
                className="relative"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 0.04 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  className={clsx(
                    "relative flex items-center justify-center whitespace-nowrap rounded-full px-3 py-2 transition-colors duration-200 sm:px-4 sm:py-2",
                    {
                      "text-gray-950 dark:text-white":
                        activeSection === link.name,
                      "hover:text-gray-900 dark:hover:text-white/90":
                        activeSection !== link.name,
                    }
                  )}
                  href={link.hash}
                  onClick={() => {
                    setActiveSection(link.name);
                    setTimeOfLastClick(Date.now());
                  }}
                >
                  <span className="relative z-10">{link.name}</span>

                  {link.name === activeSection && (
                    <motion.span
                      className="absolute inset-0 -z-0 rounded-full bg-gray-900/[0.06] dark:bg-white/10"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}
