"use client";

import { useTheme } from "@/context/theme-context";
import React from "react";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      className="fixed bottom-5 right-5 z-[998] inline-flex h-[3rem] w-[3rem] items-center justify-center rounded-full border border-[color:var(--line)] bg-white/80 text-gray-800 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-xl dark:bg-white/[0.06] dark:text-white/90 dark:hover:border-white/20 dark:hover:text-white"
      onClick={toggleTheme}
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}