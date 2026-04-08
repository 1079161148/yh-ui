import { inject, provide, computed, unref } from "vue";
export const COMPONENT_THEME_KEY = Symbol("component-theme");
export const componentThemeProps = {
  /** 组件主题变量覆盖 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject(COMPONENT_THEME_KEY, {});
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = unref(localOverrides) || {};
    return {
      ...globalVars,
      ...local
    };
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
export function provideComponentThemes(themes) {
  provide(COMPONENT_THEME_KEY, themes);
}
export function createComponentThemes(themes) {
  return themes;
}
export function mergeComponentThemes(base, overrides) {
  const result = { ...base };
  Object.keys(overrides).forEach((key) => {
    const baseVars = result[key] || {};
    const overrideVars = overrides[key] || {};
    result[key] = { ...baseVars, ...overrideVars };
  });
  return result;
}
