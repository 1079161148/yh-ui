"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDayjsMonths = exports.setDayjsLocaleSync = exports.setDayjsLocale = exports.getDayjsLocale = void 0;
var _dayjs = _interopRequireDefault(require("../dayjs.cjs"));
require("dayjs/locale/en");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const dayjsLocales = import.meta.glob(["../../../../node_modules/dayjs/locale/*.js", "!../../../../node_modules/dayjs/locale/en.js"], {
  eager: false
});
const loadedLocales = /* @__PURE__ */new Set(["en"]);
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
const loadDayjsLocale = async dayjsLocale => {
  const path = `../../../../node_modules/dayjs/locale/${dayjsLocale}.js`;
  const loader = dayjsLocales[path];
  if (loader) {
    await loader();
    return true;
  }
  try {
    await Promise.resolve(`dayjs/locale/${dayjsLocale}.js`).then(s => require(s));
    return true;
  } catch {
    return false;
  }
};
const getDayjsLocale = localeCode => {
  return localeMapping[localeCode.toLowerCase()] || "en";
};
exports.getDayjsLocale = getDayjsLocale;
const setDayjsLocale = async localeCode => {
  const dayjsLocale = getDayjsLocale(localeCode);
  if (loadedLocales.has(dayjsLocale)) {
    _dayjs.default.locale(dayjsLocale);
    return;
  }
  if (dayjsLocale === "en") {
    _dayjs.default.locale("en");
    return;
  }
  try {
    const loaded = await loadDayjsLocale(dayjsLocale);
    if (!loaded) {
      _dayjs.default.locale("en");
      return;
    }
    loadedLocales.add(dayjsLocale);
    _dayjs.default.locale(dayjsLocale);
  } catch {
    _dayjs.default.locale("en");
  }
};
exports.setDayjsLocale = setDayjsLocale;
const setDayjsLocaleSync = localeCode => {
  const dayjsLocale = getDayjsLocale(localeCode);
  if (loadedLocales.has(dayjsLocale)) {
    _dayjs.default.locale(dayjsLocale);
  } else {
    _dayjs.default.locale("en");
    void setDayjsLocale(localeCode);
  }
};
exports.setDayjsLocaleSync = setDayjsLocaleSync;
const updateDayjsMonths = (localeCode, months) => {
  const dayjsLocale = getDayjsLocale(localeCode);
  const monthsArray = [months.jan, months.feb, months.mar, months.apr, months.may, months.jun, months.jul, months.aug, months.sep, months.oct, months.nov, months.dec];
  try {
    const updateLocale = _dayjs.default.updateLocale;
    if (updateLocale) {
      updateLocale(dayjsLocale, {
        months: monthsArray,
        monthsShort: monthsArray
      });
    }
  } catch {}
};
exports.updateDayjsMonths = updateDayjsMonths;