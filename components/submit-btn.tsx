"use client";

import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const status = useFormStatus();
  return (
    <button
      type="submit"
      className={`shine group relative inline-flex h-[3.25rem] w-full items-center justify-center gap-2 self-end overflow-hidden rounded-full
        bg-gray-950 text-white shadow-lg shadow-gray-950/20 outline-none transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25 active:translate-y-0
        sm:w-[10rem]
        disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg
        dark:bg-white dark:text-gray-950 dark:shadow-white/10`}
      disabled={status.pending}
    >
      {status.pending ? (
        <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          <span className="relative z-10">Envoyer</span>
          <FaPaperPlane className="relative z-10 text-xs opacity-70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}
