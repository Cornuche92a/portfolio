import { useTranslations } from "next-intl";
const t = useTranslations();
const linksObjects: { [key: string]: { hash: string; name: string } } =
  t.raw("Links");
const linksArray = Object.values(linksObjects); // Convert the object to an array
export type SectionName = (typeof linksArray)[number]["name"];
