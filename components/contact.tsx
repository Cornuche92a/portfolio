"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import SubmitBtn from "./submit-btn";
import toast from "react-hot-toast";
import Form from "next/form";
import { useTranslations } from "next-intl";

export default function Contact() {
  const { ref } = useSectionInView("Contact");
  const t = useTranslations("Contact");

  return (
    <motion.section
      id={"contact"}
      ref={ref}
      className="mb-20 sm:mb-28 w-[min(100%,38rem)] text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      <SectionHeading>{t("title")}</SectionHeading>

      <p className="text-gray-700 -mt-4 dark:text-white/80">
        {t("desc")}
        {" @ "}
        <a className="underline" href="mailto:anas.dev@icloud.com">
          anas.dev@icloud.com
        </a>{" "}
        <p className={"items-center mt-10 text-5xl"}>👇</p>
      </p>

      <Form
        className="mt-10 flex flex-col dark:text-black"
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
              // Gestion d'un éventuel problème avec le format JSON
              result = { error: "Erreur lors du traitement de la réponse" };
            }

            if (response.ok) {
              toast.success("Bien reçu !");
            } else {
              toast.error(result.error || "Une erreur est survenue.");
            }
          } catch (error) {
            // Gestion des erreurs réseau ou exceptions inattendues
            console.error("Erreur lors de l'envoi :", error);
            toast.error("Une erreur réseau est survenue. Veuillez réessayer.");
          }
        }}
      >
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Votre e-mail"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          placeholder="Votre message"
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </Form>
    </motion.section>
  );
}
