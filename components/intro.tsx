"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaGithubSquare } from "react-icons/fa";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTranslations } from "next-intl";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Intro() {
  const { ref } = useSectionInView("Accueil", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const t = useTranslations("Intro");

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 w-full max-w-[54rem] scroll-mt-[100rem] text-center sm:mb-12"
    >
      <motion.div
        className="flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="relative animate-float">
          <div className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-br from-indigo-400 via-pink-400 to-amber-300 opacity-60 blur-xl dark:opacity-45" />
          <div className="absolute -inset-px -z-10 rounded-full bg-gradient-to-br from-indigo-500/50 via-pink-500/50 to-amber-400/50" />
          <Image
            src="https://dam.malt.com/2d1cd16c-4508-4ad9-99cc-62c6898be89e?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp"
            alt="Anas"
            width={192}
            height={192}
            quality={95}
            priority
            className="relative h-32 w-32 rounded-full border-[0.3rem] border-white object-cover shadow-2xl sm:h-36 sm:w-36 dark:border-[#111]"
          />
          <motion.span
            className="absolute -bottom-1 -right-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white text-2xl shadow-lg dark:border-white/20 dark:bg-[#18181f]"
            initial={{ opacity: 0, scale: 0, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
              delay: 0.35,
            }}
          >
            👋
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        className="mt-8 flex items-center justify-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.15 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-700 backdrop-blur dark:text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Disponible pour de nouveaux projets
        </span>
      </motion.div>

      <motion.h1
        className="mb-6 mt-6 px-4 text-[1.75rem] font-semibold !leading-[1.2] tracking-tight sm:text-[3rem]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.2 }}
      >
        <span className="block">{t("title.text1")}</span>
        <span className="mt-2 block text-gray-700 dark:text-white/75">
          {t("title.text2")}{" "}
          <span className="text-gradient-sweep font-semibold">
            {t("title.text3g")}
          </span>{" "}
          {t("title.text4")}{" "}
          <span className="text-gradient-sweep font-semibold">
            {t("title.text5g")}
          </span>
          .
        </span>
      </motion.h1>

      <motion.p
        className="mx-auto mb-10 max-w-[38rem] px-4 text-base leading-relaxed text-gray-600 sm:text-lg dark:text-white/70"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
      >
        {t("title.text6")} <span className="font-medium text-gray-900 dark:text-white/90">{t("title.text7g")}</span>{" "}
        {t("title.text8")}{" "}
        <span className="underline decoration-pink-400/60 decoration-2 underline-offset-4">
          {t("title.text9i")}
        </span>{" "}
        {t("title.text10")}{" "}
        <span className="underline decoration-indigo-400/60 decoration-2 underline-offset-4">
          {t("title.text11i")}
        </span>
        .
      </motion.p>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 px-4 text-base font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
      >
        <Link
          href="/#contact"
          className="shine group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gray-950 px-6 py-3 text-white shadow-lg shadow-gray-950/20 outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0 dark:bg-white dark:text-gray-950 dark:shadow-white/10"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          <span className="relative z-10">{t("contact")}</span>
          <BsArrowRight className="relative z-10 opacity-80 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>

        <a
          className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--line)] bg-white/70 px-6 py-3 text-gray-900 backdrop-blur outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-white hover:shadow-lg dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
          href="/CV.pdf"
          download
        >
          {t("resume")}
          <HiDownload className="opacity-70 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>

        <a
          className="inline-flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full border border-[color:var(--line)] bg-white/70 text-gray-800 backdrop-blur outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-lg dark:bg-white/[0.04] dark:text-white/80 dark:hover:text-white"
          href="https://linkedin.com/in/anas922a/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <BsLinkedin />
        </a>

        <a
          className="inline-flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full border border-[color:var(--line)] bg-white/70 text-[1.35rem] text-gray-800 backdrop-blur outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-400 hover:text-gray-950 hover:shadow-lg dark:bg-white/[0.04] dark:text-white/80 dark:hover:text-white"
          href="https://github.com/Cornuche92a"
          target="_blank"
          aria-label="GitHub"
        >
          <FaGithubSquare />
        </a>
      </motion.div>

      <motion.div
        className="mt-14 hidden items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gray-400 sm:flex dark:text-white/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="h-px w-8 bg-current opacity-40" />
        Scroll
        <span className="h-px w-8 bg-current opacity-40" />
      </motion.div>
    </section>
  );
}
