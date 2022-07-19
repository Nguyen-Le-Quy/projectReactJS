import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_TRANSLATION from "./locales/en/translations";
import EN_MESSAGE from "./locales/en/message";
import VI_TRANSLATION from "./locales/vi/translations";
import VI_MESSAGE from "./locales/vi/message";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: { translation: EN_TRANSLATION, message: EN_MESSAGE },
  vi: { translation: VI_TRANSLATION, message: VI_MESSAGE },
};

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    //   lng: "en", //use test manual
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      lookupQuerystring: "lng",
      lookupCookie: "lang",
      lookupLocalStorage: "lang",
      caches: ["localStorage", "cookie"],
    },
    debug: false, // should FALSE is PRODUCTION environment
    interpolation: {
      escapeValue: false, // not needed for react
    },
  });
export default i18n;
