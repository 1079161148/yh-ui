"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.componentThemeProps = exports.COMPONENT_THEME_KEY = void 0;
exports.createComponentThemes = createComponentThemes;
exports.mergeComponentThemes = mergeComponentThemes;
exports.provideComponentThemes = provideComponentThemes;
exports.useComponentTheme = useComponentTheme;
var _vue = require("vue");
const COMPONENT_THEME_KEY = exports.COMPONENT_THEME_KEY = Symbol("component-theme");
const componentThemeProps = exports.componentThemeProps = {
  /** 组件主题变量覆盖 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = (0, _vue.inject)(COMPONENT_THEME_KEY, {});
  const mergedVars = (0, _vue.computed)(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = (0, _vue.unref)(localOverrides) || {};
    return {
      ...globalVars,
      ...local
    };
  });
  const themeStyle = (0, _vue.computed)(() => {
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
  const hasCustomTheme = (0, _vue.computed)(() => {
    return Object.keys(mergedVars.value).length > 0;
  });
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  };
}
function provideComponentThemes(themes) {
  (0, _vue.provide)(COMPONENT_THEME_KEY, themes);
}
function createComponentThemes(themes) {
  return themes;
}
function mergeComponentThemes(base, overrides) {
  const result = {
    ...base
  };
  Object.keys(overrides).forEach(key => {
    const baseVars = result[key] || {};
    const overrideVars = overrides[key] || {};
    result[key] = {
      ...baseVars,
      ...overrideVars
    };
  });
  return result;
}