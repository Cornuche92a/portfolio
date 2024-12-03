// lib/types.ts
import { useLinksTranslations } from "./hooks";

const linksArray = useLinksTranslations();
export type SectionName = (typeof linksArray)[number]["name"];
