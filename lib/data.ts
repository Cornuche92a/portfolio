import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import corpcommentImg from "@/public/corpcomment.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Accueil",
    hash: "#home",
  },
  {
    name: "Moi",
    hash: "#about",
  },
  {
    name: "Projets",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Expérience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Lycée Paul Lapie",
    location: "Courbevoie",
    description:
      "Formation en Brevet de Technicien Supérieur en Développement Web.",
    icon: React.createElement(LuGraduationCap),
    date: "2020 - 2022",
  },
  {
    title: "Développeur Full-Stack",
    location: "Freelance",
    description:
      "Développement d'application, de fonctions et maintenance de code.",
    icon: React.createElement(FaReact),
    date: "2022 - Maintenant",
  },
  {
    title: "E-commerce",
    location: "Freelance",
    description:
      "Création et développement de boutiques Shopify, Wordpress et Prestashop.",
    icon: React.createElement(CgWorkAlt),
    date: "2022 - Maintenant",
  },
] as const;

export const projectsData = [
  {
    title: "Plateforme SaaS ",
    description:
        "Plateforme SaaS sur abonnement offrant un accès centralisé à une variété d'outils en ligne pour l'optimisation SEO, l'analyse de marché et le design.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux", "MongoDB"],
    imageUrl: rmtdevImg,
    githubUrl: "https://github.com/Cornuche92a/GeniusRanker/tree/master"
  },
    {
    title: "Crypto Marketplace",
    description:
      "Marketplace pour l'achat instantané de produits numériques via Bitcoin, avec support client intégré et gestion de wallet Bitcoin.",
    tags: ["PHP", "Laravel", "Bitcoin Core", "Blockchain", "MySQL"],
    imageUrl: corpcommentImg,
    githubUrl: "https://github.com/Cornuche92a/Bitcoin-Marketplace"
    },
  {
    title: "Plateforme SaaS",
    description:
      "Un service permettant de souscrire et de regrouper tous vos abonnements préférés à un prix avantageux, tout en offrant une gestion centralisée.",
    tags: ["React", "Next.js", "NoSQL", "API", "OpenUI"],
    imageUrl: wordanalyticsImg,
    githubUrl: "https://github.com/Cornuche92a/prelaunch-saas"
  },
] as const;

export const skillsData = [
  "Node.js",
  "Next.js",
  "PHP",
  "HTML",
  "API",
  "Laravel",
  "E-commerce",
  "React.js",
  "noSQL",
  "SQL",
  "Docker",
  "MongoDB",
  "Typescript",
  "JavaScript",
  "AWS",
  "Google Cloud",
  "Azure",
  "Shopify",
  "Liquid",
  "React",
  "Shopify",
  "Prestashop",
  "Mongoose",
  "Stripe",
  "Git",
  "Wordpress",
  "AGILE"
] as const;
