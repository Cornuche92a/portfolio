"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("Moi");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>À propos de moi</SectionHeading>
      <p className="mb-1 ">
        <span className="font-medium">Passionné de développement web</span> depuis l'enfance,
        j'ai formalisé mon intérêt à travers un <span className="font-medium">BTS SIO (SLAM),</span>{" "}
        enrichi par une exploration autodidacte continue. Ma pratique s'est affinée{" "}
        sur des projets personnels et freelance, principalement autour de technologies{" "}
        comme <span className="font-medium">React, Next.js, et Node.js.</span> Mon portfolio
        reflétant mon parcours d'apprentissage, présente des solutions créatives à des problèmes
        variés. Doté d'une <span className="underline">grande autonomie</span> et d'un{" "}
        <span className="font-medium">esprit de collaboration.</span>  En dehors du code,
        je m'investis dans des <span className="underline">communautés de développeurs en ligne,</span>
        partageant des connaissances et restant à jour sur les dernières tendances technologiques.
      </p>

    </motion.section>
  );
}
