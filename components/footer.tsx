import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[color:var(--line)] px-6 pb-10 pt-12">
      <div className="mx-auto flex w-full max-w-[62rem] flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-gray-500 dark:text-white/50">
            Anas — Full-Stack & CyberSec
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-white/50">
            &copy; {new Date().getFullYear()} — Built with Next.js, Tailwind,
            Framer Motion & Resend. Deployed on Vercel.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:anas.dev@icloud.com"
            aria-label="Email"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/60 text-gray-700 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:bg-white/[0.04] dark:text-white/70 dark:hover:text-white"
          >
            <HiOutlineMail />
          </a>
          <a
            href="https://linkedin.com/in/anas922a/"
            target="_blank"
            aria-label="LinkedIn"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/60 text-gray-700 transition hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-600 dark:bg-white/[0.04] dark:text-white/70 dark:hover:text-white"
          >
            <BsLinkedin />
          </a>
          <a
            href="https://github.com/Cornuche92a"
            target="_blank"
            aria-label="GitHub"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--line)] bg-white/60 text-gray-700 transition hover:-translate-y-0.5 hover:border-gray-400 hover:text-gray-950 dark:bg-white/[0.04] dark:text-white/70 dark:hover:text-white"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
