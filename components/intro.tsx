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

export default function Intro() {
  const { ref } = useSectionInView("Accueil", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const t = useTranslations("Intro");

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[50rem] text-center sm:mb-0 scroll-mt-[100rem]"
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "tween",
              duration: 0.2,
            }}
          >
            <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-indigo-400 via-pink-400 to-amber-300 blur-md opacity-70 dark:opacity-60" />
            <Image
              src="https://dam.malt.com/2d1cd16c-4508-4ad9-99cc-62c6898be89e?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp"
              alt="Anas"
              width="192"
              height="192"
              quality="95"
              priority={true}
              className="h-28 w-28 rounded-full object-cover border-[0.35rem] border-white shadow-xl dark:border-gray-900"
            />
          </motion.div>

          <motion.span
            className="absolute bottom-0 right-0 text-4xl"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 125,
              delay: 0.1,
              duration: 0.7,
            }}
          >
            👋
          </motion.span>
        </div>
      </div>

      <motion.h1
        className="mb-10 mt-6 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-bold">{t("title.text1")}</span> {t("title.text2")}{" "}
        <span className="text-gradient font-bold">{t("title.text3g")}</span>{" "}
        {t("title.text4")}{" "}
        <span className="text-gradient font-bold">{t("title.text5g")}</span>{" "}
        {t("title.text6")} <span className="italic">{t("title.text7g")}</span>{" "}
        {t("title.text8")}{" "}
        <span className="underline decoration-pink-400/70 underline-offset-4">
          {t("title.text9i")}
        </span>{" "}
        {t("title.text10")}{" "}
        <span className="underline decoration-indigo-400/70 underline-offset-4">
          {t("title.text11i")}
        </span>
        .
      </motion.h1>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <Link
          href="/#contact"
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 transition"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
        >
          {t("contact")}{" "}
          <BsArrowRight className="opacity-70 group-hover:translate-x-1 transition" />
        </Link>

        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href={`/CV.pdf`}
          download
        >
          {t("resume")}{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
        <a
          className="bg-white p-4 text-gray-700 hover:text-gray-950 flex items-center gap-2 rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://linkedin.com/in/anas922a/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <BsLinkedin />
        </a>

        <a
          className="bg-white p-4 text-gray-700 flex items-center gap-2 text-[1.35rem] rounded-full focus:scale-[1.15] hover:scale-[1.15] hover:text-gray-950 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10 dark:text-white/60"
          href="https://github.com/Cornuche92a"
          target="_blank"
          aria-label="GitHub"
        >
          <FaGithubSquare />
        </a>
      </motion.div>
    </section>
  );
}
