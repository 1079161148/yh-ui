import { computed, unref, watch } from "vue";
import { zhCn } from "@yh-ui/locale";
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
  const t = (path, options) => {
    const keys = path.split(".");
    let result = locale.value.yh;
    for (const key of keys) {
      if (result && typeof result === "object") {
        result = result[key];
      } else {
        result = void 0;
      }
      if (result === void 0) return path;
    }
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
    const keys = path.split(".");
    let result = locale.value.yh;
    for (const key of keys) {
      if (result && typeof result === "object") {
        result = result[key];
      } else {
        result = void 0;
      }
      if (result === void 0) return path;
    }
    return result;
  };
  return {
    locale,
    lang,
    t,
    tRaw
  };
};
