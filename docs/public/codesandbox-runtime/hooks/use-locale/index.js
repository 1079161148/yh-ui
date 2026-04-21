import { computed, unref, watch } from "vue";
import { en, zhCn } from "../../locale/index.js";
import { useConfig } from "../use-config/index.js";
import { setDayjsLocale } from "./dayjs-locale.js";
import {
  setDayjsLocale as setDayjsLocale2,
  getDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths
} from "./dayjs-locale.js";
const useLocale = (localeOverrides) => {
  const { globalLocale } = useConfig();
  const locale = computed(() => {
    var _a, _b;
    return (_b = (_a = unref(localeOverrides)) != null ? _a : unref(globalLocale)) != null ? _b : zhCn;
  });
  const lang = computed(() => locale.value.name);
  watch(
    lang,
    (newLang) => {
      setDayjsLocale(newLang);
    },
    { immediate: true }
  );
  const resolveLocaleValue = (path) => {
    const keys = path.split(".");
    const sources = [locale.value.yh, zhCn.yh, en.yh];
    for (const source of sources) {
      let result = source;
      for (const key of keys) {
        if (result && typeof result === "object") {
          result = result[key];
        } else {
          result = void 0;
          break;
        }
      }
      if (result !== void 0) return result;
    }
    return void 0;
  };
  const t = (path, options) => {
    const result = resolveLocaleValue(path);
    if (typeof result !== "string") return path;
    if (options) {
      return result.replace(/\{(\w+)\}/g, (_match, key) => {
        const val = options[key];
        return val !== void 0 ? String(val) : `{${key}}`;
      });
    }
    return result;
  };
  const tRaw = (path) => {
    const result = resolveLocaleValue(path);
    if (result === void 0) return path;
    return result;
  };
  return {
    locale,
    lang,
    t,
    tRaw
  };
};
export {
  getDayjsLocale,
  setDayjsLocale2 as setDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths,
  useLocale
};
