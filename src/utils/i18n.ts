import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
export default i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      // 優先級，querystring的層級比navigator高，表示如果有在querystring設定語言，瀏覽器設定語言就會被忽略
      order: ['querystring', 'navigator'],
      caches: []
    },
    interpolation: {
      escapeValue: false
    },
    fallbackLng: "en",
    supportedLngs: ["en", "zh-TW", "zh", "ja", "en-US"]
  })
// mapping local lang to html lang
const htmlLang: { [key: string]: string } = {
  en: 'en',
  'en-US': 'en',
  'zh-TW': 'zh-Hant',
  zh: 'zh-Hans',
  ja: 'ja',
};

i18n.on("languageChanged", (lng) => {
  console.log(`current lang ${lng}`)
  if (htmlLang[lng]) {
    document.documentElement.lang = htmlLang[lng]
  }
})