"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getDayjsLocale", {
  enumerable: true,
  get: function () {
    return _dayjsLocale.getDayjsLocale;
  }
});
Object.defineProperty(exports, "setDayjsLocale", {
  enumerable: true,
  get: function () {
    return _dayjsLocale.setDayjsLocale;
  }
});
Object.defineProperty(exports, "setDayjsLocaleSync", {
  enumerable: true,
  get: function () {
    return _dayjsLocale.setDayjsLocaleSync;
  }
});
Object.defineProperty(exports, "updateDayjsMonths", {
  enumerable: true,
  get: function () {
    return _dayjsLocale.updateDayjsMonths;
  }
});
exports.useLocale = void 0;
var _vue = require("vue");
var _locale = require("@yh-ui/locale");
var _useConfig = require("../use-config/index.cjs");
var _dayjsLocale = require("./dayjs-locale.cjs");
const useLocale = localeOverrides => {
  const {
    globalLocale
  } = (0, _useConfig.useConfig)();
  const locale = (0, _vue.computed)(() => {
    return (0, _vue.unref)(localeOverrides) ?? (0, _vue.unref)(globalLocale) ?? _locale.zhCn;
  });
  const lang = (0, _vue.computed)(() => locale.value.name);
  (0, _vue.watch)(lang, newLang => {
    (0, _dayjsLocale.setDayjsLocale)(newLang);
  }, {
    immediate: true
  });
  const resolveLocaleValue = path => {
    const keys = path.split(".");
    const sources = [locale.value.yh, _locale.zhCn.yh, _locale.en.yh];
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
  const tRaw = path => {
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
exports.useLocale = useLocale;