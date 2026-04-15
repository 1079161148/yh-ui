import { computed, unref, watch } from "vue";
import { en, zhCn } from "@yh-ui/locale";
import { useConfig } from "../use-config/index.mjs";
import { setDayjsLocale } from "./dayjs-locale.mjs";
export {
  setDayjsLocale,
  getDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths
} from "./dayjs-locale.mjs";
export const useLocale = (localeOverrides) => {
  const { globalLocale } = useConfig();
  const locale = computed(() => {
    return unref(localeOverrides) ?? unref(globalLocale) ?? zhCn;
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
