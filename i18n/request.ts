import { getRequestConfig } from "next-intl/server";

const AVAILABLE_LOCALES = ["ar", "de", "en", "fr", "lt", "nl", "sv", "es"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  if (!AVAILABLE_LOCALES.includes(locale)) {
    locale = "en";
  }

  return {
    locale,
    messages: (await import(`/messages/${locale}.json`)).default,
  };
});
