import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const availableLanguages = ['en', 'ru'];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
  
      caches: ['localStorage'],
      excludeCacheFor: ['cimode'],
      cookieMinutes: 10,
      cookieDomain: 'myDomain',
      cookieOptions: { path: '/', sameSite: 'strict' },
      cache: ["cookie"]
      // checkWhitelist: true, // options for language detection
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false
    },
  });

export default i18n;