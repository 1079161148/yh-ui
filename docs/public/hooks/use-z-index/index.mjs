import { computed, inject, unref } from "vue";
const defaultInitialZIndex = 2e3;
export const zIndexContextKey = Symbol("zIndexContextKey");
export const zIndexCounterKey = Symbol("zIndexCounterKey");
export const getNextZIndex = () => {
  if (typeof window !== "undefined") {
    const windowContext = window;
    if (windowContext.__YH_Z_INDEX__ === void 0) {
      windowContext.__YH_Z_INDEX__ = defaultInitialZIndex;
    }
    return ++windowContext.__YH_Z_INDEX__;
  }
  return defaultInitialZIndex;
};
export const resetZIndex = (value = defaultInitialZIndex) => {
  if (typeof window !== "undefined") {
    ;
    window.__YH_Z_INDEX__ = value;
  }
};
export const createZIndexCounter = (initialValue = defaultInitialZIndex) => {
  return { current: initialValue };
};
export const useZIndex = (zIndexOverrides) => {
  const injectedZIndex = inject(zIndexContextKey, void 0);
  const appCounter = inject(zIndexCounterKey, null);
  const initialZIndex = computed(() => {
    const override = unref(zIndexOverrides);
    return override ?? unref(injectedZIndex) ?? defaultInitialZIndex;
  });
  const currentZIndex = computed(() => initialZIndex.value);
  const nextZIndex = () => {
    const override = unref(zIndexOverrides);
    if (override !== void 0) return override;
    if (appCounter) {
      return ++appCounter.current;
    }
    return getNextZIndex();
  };
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};
