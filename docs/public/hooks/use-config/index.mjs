import { inject, computed, unref } from "vue";
export const configProviderContextKey = Symbol(
  "configProviderContextKey"
);
export const useConfig = () => {
  const configRef = inject(configProviderContextKey, null);
  const globalSize = computed(() => {
    const config = unref(configRef);
    return config?.size || "default";
  });
  const globalZIndex = computed(() => {
    const config = unref(configRef);
    return config?.zIndex || 2e3;
  });
  const globalLocale = computed(() => {
    const config = unref(configRef);
    return config?.locale;
  });
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  };
};
