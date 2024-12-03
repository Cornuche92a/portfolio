import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import type { SectionName } from "./types";
// lib/hooks.ts
import { useTranslations } from "next-intl";

export function useSectionInView(sectionName: SectionName, threshold = 0.75) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}

export function useLinksTranslations() {
  const t = useTranslations();
  const linksObjects: { [key: string]: { hash: string; name: string } } =
    t.raw("Links");
  // Convert the object to an array
  return Object.values(linksObjects);
}
