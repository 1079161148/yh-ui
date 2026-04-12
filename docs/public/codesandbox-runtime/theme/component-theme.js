var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { inject, provide, computed, unref } from "vue";
const COMPONENT_THEME_KEY = Symbol("component-theme");
const componentThemeProps = {
  /** 组件主题变量覆盖 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject(COMPONENT_THEME_KEY, {});
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = unref(localOverrides) || {};
    return __spreadValues(__spreadValues({}, globalVars), local);
  });
  const themeStyle = computed(() => {
    const vars = mergedVars.value;
    const style = {};
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        style[cssVarName] = value;
      }
    });
    return style;
  });
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0;
  });
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  };
}
function provideComponentThemes(themes) {
  provide(COMPONENT_THEME_KEY, themes);
}
function createComponentThemes(themes) {
  return themes;
}
function mergeComponentThemes(base, overrides) {
  const result = __spreadValues({}, base);
  Object.keys(overrides).forEach((key) => {
    const baseVars = result[key] || {};
    const overrideVars = overrides[key] || {};
    result[key] = __spreadValues(__spreadValues({}, baseVars), overrideVars);
  });
  return result;
}
export {
  COMPONENT_THEME_KEY,
  componentThemeProps,
  createComponentThemes,
  mergeComponentThemes,
  provideComponentThemes,
  useComponentTheme
};
