import React from "react";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-col items-center gap-3">
      <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">
        {children}
      </h2>
      <span className="block h-[2px] w-16 rounded-full bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-400 dark:from-indigo-300 dark:via-pink-300 dark:to-amber-200" />
    </div>
  );
}