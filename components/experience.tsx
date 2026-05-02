"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { useTranslations } from "next-intl";

type ExperienceProps = {
  title: string;
  location: string;
  date: string;
  description: string;
  icon: React.ReactNode;
};

export default function Experience() {
  const { ref } = useSectionInView("Expérience");
  const { theme } = useTheme();
  const t = useTranslations();

  const iconMapping: Record<string, React.ReactNode> = {
    LuGraduationCap: <LuGraduationCap />,
    FaReact: <FaReact />,
    CgWorkAlt: <CgWorkAlt />,
  };

  const experienceObject: Record<string, ExperienceProps> = t.raw("Experience");
  const experienceArray: ExperienceProps[] = Object.values(
    experienceObject
  ).map((experience) => ({
    ...experience,
    icon: iconMapping[experience.icon as string],
  }));

  return (
    <section
      id="experience"
      ref={ref}
      className="mb-28 w-full max-w-[62rem] scroll-mt-28 sm:mb-40"
    >
      <SectionHeading eyebrow="// experience">Mon expérience</SectionHeading>
      <VerticalTimeline lineColor="">
        {experienceArray.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light"
                    ? "rgba(255, 255, 255, 0.7)"
                    : "rgba(255, 255, 255, 0.035)",
                boxShadow:
                  theme === "light"
                    ? "0 10px 30px -10px rgba(15,15,25,0.08)"
                    : "0 10px 30px -10px rgba(0,0,0,0.5)",
                border:
                  theme === "light"
                    ? "1px solid rgba(15, 15, 25, 0.08)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                textAlign: "left",
                padding: "1.4rem 2rem",
                borderRadius: "1rem",
                backdropFilter: "blur(10px)",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid rgba(255, 255, 255, 0.8)"
                    : "0.4rem solid rgba(255, 255, 255, 0.08)",
              }}
              date={item.date}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === "light"
                    ? "white"
                    : "rgba(255, 255, 255, 0.08)",
                border:
                  theme === "light"
                    ? "1px solid rgba(15, 15, 25, 0.08)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow:
                  theme === "light"
                    ? "0 4px 12px -4px rgba(99, 102, 241, 0.25)"
                    : "0 4px 12px -4px rgba(0, 0, 0, 0.5)",
                fontSize: "1.4rem",
              }}
            >
              <h3 className="font-semibold capitalize">{item.title}</h3>
              <p className="font-normal !mt-0">{item.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                {item.description}
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
