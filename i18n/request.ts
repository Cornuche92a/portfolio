import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

const AVAILABLE_LOCALES = ["ar", "de", "en", "fr", "lt", "nl", "sv", "es"];

export default getRequestConfig(async () => {
  let locale: string;
  const [headersList] = await Promise.all([headers()]);
  const acceptLanguageHeader = headersList.get("accept-language");
  locale = acceptLanguageHeader?.split(",")[0].split("-")[0] || "en"; // Par défaut en 'en'

  if (!AVAILABLE_LOCALES.includes(locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`/messages/${locale}.json`)).default,
  };
});
