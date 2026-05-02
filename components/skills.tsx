"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.03 * index,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");
  const t = useTranslations();
  const skillsObjects: Record<string, string> = t.raw("Skills");
  const skillsArray: (string | React.ReactNode)[] =
    Object.values(skillsObjects);

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 w-full max-w-[55rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading eyebrow="// skills">Mes compétences</SectionHeading>

      <ul className="flex flex-wrap justify-center gap-2.5">
        {skillsArray.map((skill, index) => (
          <motion.li
            className="group relative cursor-default overflow-hidden rounded-xl border border-[color:var(--line)] bg-white/60 px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-indigo-300/50 hover:bg-white hover:shadow-md sm:px-5 sm:py-3 sm:text-base dark:bg-white/[0.04] dark:text-white/85 dark:hover:border-white/20 dark:hover:bg-white/[0.08]"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            <span className="relative z-10">{skill}</span>
            <span className="pointer-events-none absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
