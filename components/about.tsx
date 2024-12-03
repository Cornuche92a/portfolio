"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { useTranslations } from "next-intl";

export default function About() {
  const { ref } = useSectionInView("Moi");
  const t = useTranslations("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>{t("title")}</SectionHeading>
      <p className="mb-1 ">
        {t("body.text1")}{" "}
        <span className="font-medium">{t("body.text1b")}</span>
        {t("body.text1bis")}{" "}
        <span className="font-medium">{t("body.text2b")}</span>
        {t("body.text3")}{" "}
        <span className="font-medium">{t("body.text4b")}</span>
        {t("body.text5")}{" "}
        <span className="font-medium">{t("body.text6b")}</span>
        {t("body.text7")}{" "}
      </p>
    </motion.section>
  );
}
