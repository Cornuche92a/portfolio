"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";

type ProjectProps = {
  title: string;
  desc: string;
  tags?: string[];
  imageUrl?: string;
  link: string;
};

export default function Project({
  title,
  desc,
  tags = [],
  imageUrl,
  link,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-6 sm:mb-10 last:mb-0"
    >
      <Link href={link} target="_blank" className="block">
        <section className="shine relative flex flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/60 shadow-sm backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 sm:h-[22rem] sm:flex-row sm:group-even:flex-row-reverse dark:bg-white/[0.035]">
          <div className="flex flex-1 flex-col justify-center px-6 pb-6 pt-6 sm:px-10 sm:py-10">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gray-500 dark:text-white/50">
                Case study
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[color:var(--line)] to-transparent" />
            </div>

            <h3 className="flex items-start gap-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              <span className="flex-1">{title}</span>
              <BsArrowUpRight className="mt-1 shrink-0 text-base text-gray-400 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:text-white/40" />
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base dark:text-white/70">
              {desc}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <li
                  className="rounded-full border border-[color:var(--line)] bg-white/70 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-gray-700 backdrop-blur-sm transition group-hover:border-indigo-300/50 dark:bg-white/[0.03] dark:text-white/70"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {imageUrl && (
            <div className="relative hidden w-[46%] shrink-0 overflow-hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-pink-500/5 to-amber-500/10" />
              <Image
                src={imageUrl}
                width={560}
                height={420}
                alt={title}
                quality={95}
                className="absolute left-6 top-1/2 w-[120%] max-w-none -translate-y-1/2 rounded-xl shadow-2xl transition duration-500
                  group-hover:scale-[1.04]
                  group-hover:-translate-y-[52%]
                  group-hover:-rotate-1
                  group-even:left-[initial]
                  group-even:right-6
                  group-even:group-hover:rotate-1"
              />
            </div>
          )}

          {imageUrl && (
            <div className="relative h-48 w-full overflow-hidden sm:hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-pink-500/5 to-amber-500/10" />
              <Image
                src={imageUrl}
                width={560}
                height={420}
                alt={title}
                quality={95}
                className="absolute inset-x-6 top-4 w-[calc(100%-3rem)] rounded-lg shadow-xl"
              />
            </div>
          )}
        </section>
      </Link>
    </motion.div>
  );
}
