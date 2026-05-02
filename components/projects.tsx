"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useTranslations } from "next-intl";
import Project from "./project";
import { useSectionInView } from "@/lib/hooks";

type ProjectProps = {
  title: string;
  desc: string;
  tags: string[];
  imageUrl: string;
  link: string;
};

export default function Projects() {
  const { ref } = useSectionInView("Projets", 0.5);
  const t = useTranslations("Projects");

  const projectsObject: Record<string, ProjectProps> = t.raw("dev"); // Get the raw translations object
  const projectsArray: ProjectProps[] = Object.values(projectsObject); // Convert the object to an array

  return (
    <section
      ref={ref}
      id="projects"
      className="mb-28 w-full max-w-[62rem] scroll-mt-28 sm:mb-40"
    >
      <SectionHeading eyebrow="// projects">{t("title")}</SectionHeading>
      <div>
        {projectsArray.map((project, index) => (
          <React.Fragment key={index}>
            <Project key={index} {...(project as ProjectProps)} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
