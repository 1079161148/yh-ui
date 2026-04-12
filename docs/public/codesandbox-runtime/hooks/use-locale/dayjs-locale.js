import dayjs from "../dayjs.js";
import "dayjs/locale/en";
const dayjsLocales = {};
const loadedLocales = /* @__PURE__ */ new Set(["en"]);
const localeMapping = {
  "zh-cn": "zh-cn",
  "zh-tw": "zh-tw",
  "zh-hk": "zh-hk",
  "zh-mo": "zh-tw",
  en: "en",
  ja: "ja",
  ko: "ko",
  de: "de",
  fr: "fr",
  es: "es",
  pt: "pt",
  "pt-br": "pt-br",
  ru: "ru",
  ar: "ar",
  "ar-eg": "ar",
  tr: "tr",
  it: "it",
  nl: "nl",
  pl: "pl",
  th: "th",
  vi: "vi",
  id: "id",
  ms: "ms",
  da: "da",
  sv: "sv",
  fi: "fi",
  no: "nb",
  "nb-NO": "nb",
  cs: "cs",
  sk: "sk",
  uk: "uk",
  hu: "hu",
  ro: "ro",
  bg: "bg",
  az: "az",
  fa: "fa",
  hi: "hi",
  pa: "pa-in",
  el: "el",
  ca: "ca",
  tk: "tk",
  ta: "ta",
  lv: "lv",
  af: "af",
  et: "et",
  sl: "sl",
  he: "he",
  lo: "lo",
  lt: "lt",
  mn: "mn",
  kk: "kk",
  ku: "ku",
  ckb: "ku",
  "ug-cn": "ug-cn",
  km: "km",
  sr: "sr",
  eu: "eu",
  ky: "ky",
  "hy-am": "hy-am",
  hr: "hr",
  eo: "eo",
  bn: "bn",
  mg: "mg",
  sw: "sw",
  "uz-uz": "uz",
  my: "my",
  te: "te"
};
const loadDayjsLocale = async (dayjsLocale) => {
  const path = `../../../../node_modules/dayjs/locale/${dayjsLocale}.js`;
  const loader = dayjsLocales[path];
  if (loader) {
    await loader();
    return true;
  }
  try {
    await import(
      /* @vite-ignore */
      `dayjs/locale/${dayjsLocale}.js`
    );
    return true;
  } catch (e) {
    return false;
  }
};
const getDayjsLocale = (localeCode) => {
  return localeMapping[localeCode.toLowerCase()] || "en";
};
const setDayjsLocale = async (localeCode) => {
  const dayjsLocale = getDayjsLocale(localeCode);
  if (loadedLocales.has(dayjsLocale)) {
    dayjs.locale(dayjsLocale);
    return;
  }
  if (dayjsLocale === "en") {
    dayjs.locale("en");
    return;
  }
  try {
    const loaded = await loadDayjsLocale(dayjsLocale);
    if (!loaded) {
      dayjs.locale("en");
      return;
    }
    loadedLocales.add(dayjsLocale);
    dayjs.locale(dayjsLocale);
  } catch (e) {
    dayjs.locale("en");
  }
};
const setDayjsLocaleSync = (localeCode) => {
  const dayjsLocale = getDayjsLocale(localeCode);
  if (loadedLocales.has(dayjsLocale)) {
    dayjs.locale(dayjsLocale);
  } else {
    dayjs.locale("en");
    void setDayjsLocale(localeCode);
  }
};
const updateDayjsMonths = (localeCode, months) => {
  const dayjsLocale = getDayjsLocale(localeCode);
  const monthsArray = [
    months.jan,
    months.feb,
    months.mar,
    months.apr,
    months.may,
    months.jun,
    months.jul,
    months.aug,
    months.sep,
    months.oct,
    months.nov,
    months.dec
  ];
  try {
    const updateLocale = dayjs.updateLocale;
    if (updateLocale) {
      updateLocale(dayjsLocale, {
        months: monthsArray,
        monthsShort: monthsArray
      });
    }
  } catch (e) {
  }
};
export {
  getDayjsLocale,
  setDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths
};
