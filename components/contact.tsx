"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import Form from "next/form";
import { useTranslations } from "next-intl";
import { HiOutlineMail } from "react-icons/hi";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const t = useTranslations("Contact");

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="mb-20 w-full max-w-[44rem] scroll-mt-28 sm:mb-28"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <SectionHeading eyebrow="// contact">{t("title")}</SectionHeading>

      <motion.div
        className="relative overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white/60 p-6 backdrop-blur-md sm:p-10 dark:bg-white/[0.03]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-pink-500/10 blur-3xl" />

        <p className="relative text-center text-base leading-relaxed text-gray-700 dark:text-white/75">
          {t("desc")}
        </p>

        <div className="relative mt-3 flex items-center justify-center gap-2 text-sm">
          <HiOutlineMail className="text-indigo-500 dark:text-indigo-300" />
          <a
            className="font-mono text-gray-900 underline decoration-indigo-400/50 decoration-2 underline-offset-4 transition hover:decoration-indigo-500 dark:text-white/90"
            href="mailto:anas.dev@icloud.com"
          >
            anas.dev@icloud.com
          </a>
        </div>

        <Form
          className="relative mt-8 flex flex-col gap-3"
          action="/api/send"
          onSubmit={async (event) => {
            event.preventDefault();

            try {
              const formData = new FormData(event.currentTarget);

              const response = await fetch("/api/send", {
                method: "POST",
                body: formData,
              });

              let result;

              try {
                result = await response.json();
              } catch {
                result = { error: "Erreur lors du traitement de la réponse" };
              }

              if (response.ok) {
                toast.success("Bien reçu !");
              } else {
                toast.error(result.error || "Une erreur est survenue.");
              }
            } catch (error) {
              console.error("Erreur lors de l'envoi :", error);
              toast.error("Une erreur réseau est survenue. Veuillez réessayer.");
            }
          }}
        >
          <input
            className="h-14 rounded-xl border border-[color:var(--line)] bg-white/80 px-4 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-indigo-300"
            name="senderEmail"
            type="email"
            required
            maxLength={500}
            placeholder="Votre e-mail"
          />
          <textarea
            className="h-44 resize-none rounded-xl border border-[color:var(--line)] bg-white/80 p-4 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-indigo-300"
            name="message"
            placeholder="Votre message"
            required
            maxLength={5000}
          />
          <div className="mt-2 flex justify-end">
            <SubmitBtn />
          </div>
        </Form>
      </motion.div>
    </motion.section>
  );
}
