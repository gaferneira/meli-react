import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";

const fallbackLng = ["en"];
const supportedLngs = ["en", "es"];

i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    supportedLngs,
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;
