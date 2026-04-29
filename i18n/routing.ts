import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ar", "de", "en", "es", "fr", "lt", "nl", "sv"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});
