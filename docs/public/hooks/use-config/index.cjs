"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useConfig = exports.configProviderContextKey = void 0;
var _vue = require("vue");
const configProviderContextKey = exports.configProviderContextKey = Symbol("configProviderContextKey");
const useConfig = () => {
  const configRef = (0, _vue.inject)(configProviderContextKey, null);
  const globalSize = (0, _vue.computed)(() => {
    const config = (0, _vue.unref)(configRef);
    return config?.size || "default";
  });
  const globalZIndex = (0, _vue.computed)(() => {
    const config = (0, _vue.unref)(configRef);
    return config?.zIndex || 2e3;
  });
  const globalLocale = (0, _vue.computed)(() => {
    const config = (0, _vue.unref)(configRef);
    return config?.locale;
  });
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  };
};
exports.useConfig = useConfig;