"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

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
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
      className="group mb-3 sm:mb-8 last:mb-0"
    >
      <section className="bg-white/70 max-w-[42rem] border border-black/5 rounded-2xl overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-white/90 backdrop-blur-md shadow-sm hover:shadow-lg transition sm:group-even:pl-8 dark:text-white dark:bg-white/[0.04] dark:border-white/10 dark:hover:bg-white/[0.08]">
        <Link href={link} target={"_blank"}>
          <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[50%] flex flex-col h-full sm:group-even:ml-[18rem]">
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
              {desc}
            </p>
            <ul className="flex flex-wrap mt-4 gap-2 sm:mt-auto">
              {tags.map((tag, index) => (
                <li
                  className="bg-gray-900/90 px-3 py-1 text-[0.7rem] uppercase tracking-wider text-white rounded-full shadow-sm dark:bg-white/10 dark:text-white/80"
                  key={index}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {imageUrl && (
            <Image
              src={imageUrl}
              width={400}
              height={300}
              alt="Project I worked on"
              quality={95}
              className="absolute hidden sm:block top-8 -right-40 w-[28.25rem] rounded-t-lg shadow-2xl
                transition
                group-hover:scale-[1.04]
                group-hover:-translate-x-3
                group-hover:translate-y-3
                group-hover:-rotate-2

                group-even:group-hover:translate-x-3
                group-even:group-hover:translate-y-3
                group-even:group-hover:rotate-2

                group-even:right-[initial] group-even:-left-40"
            />
          )}
        </Link>
      </section>
    </motion.div>
  );
}
