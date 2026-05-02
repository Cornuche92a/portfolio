"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { label: "Années d'exp.", value: "2+" },
  { label: "Machines HTB", value: "20+" },
  { label: "Stack", value: "JS/TS" },
  { label: "Dispo", value: "Freelance" },
];

export default function About() {
  const { ref } = useSectionInView("Moi");
  const t = useTranslations("About");

  return (
    <section
      ref={ref}
      className="mb-28 w-full max-w-[52rem] scroll-mt-28 text-center sm:mb-40"
      id="about"
    >
      <SectionHeading eyebrow="// about">{t("title")}</SectionHeading>

      <motion.p
        className="mx-auto max-w-[42rem] text-base leading-[1.8] text-gray-700 sm:text-lg dark:text-white/75"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        {t("body.text1")}{" "}
        <span className="font-semibold text-gray-950 dark:text-white">
          {t("body.text1b")}
        </span>
        {t("body.text1bis")}{" "}
        <span className="font-semibold text-gray-950 dark:text-white">
          {t("body.text2b")}
        </span>
        {t("body.text3")}{" "}
        <span className="font-semibold text-gray-950 dark:text-white">
          {t("body.text4b")}
        </span>
        {t("body.text5")}{" "}
        <span className="font-semibold text-gray-950 dark:text-white">
          {t("body.text6b")}
        </span>
        {t("body.text7")}
      </motion.p>

      <motion.div
        className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
        }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
            className="group relative overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white/60 px-4 py-5 backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/[0.035]"
          >
            <div className="text-gradient text-2xl font-bold tracking-tight sm:text-3xl">
              {stat.value}
            </div>
            <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-gray-500 dark:text-white/50">
              {stat.label}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
