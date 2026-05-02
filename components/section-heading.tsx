"use client";

import React from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
  eyebrow?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  children,
  eyebrow,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 flex flex-col gap-3 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      {eyebrow && (
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        className="text-3xl font-semibold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        {children}
      </motion.h2>
      <motion.span
        className="block h-[2px] w-16 origin-left rounded-full bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 dark:from-indigo-300 dark:via-pink-300 dark:to-amber-200"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </div>
  );
}
