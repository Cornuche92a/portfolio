"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
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
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>Mes Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
        {skillsArray.map((skill, index) => (
          <motion.li
            className="bg-white/70 backdrop-blur-sm borderBlack rounded-xl px-5 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition dark:bg-white/[0.06] dark:text-white/80 dark:border-white/10"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
