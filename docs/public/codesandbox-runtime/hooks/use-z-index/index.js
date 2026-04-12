import { computed, inject, unref } from "vue";
const defaultInitialZIndex = 2e3;
const zIndexContextKey = Symbol("zIndexContextKey");
const zIndexCounterKey = Symbol("zIndexCounterKey");
const getNextZIndex = () => {
  if (typeof window !== "undefined") {
    const windowContext = window;
    if (windowContext.__YH_Z_INDEX__ === void 0) {
      windowContext.__YH_Z_INDEX__ = defaultInitialZIndex;
    }
    return ++windowContext.__YH_Z_INDEX__;
  }
  return defaultInitialZIndex;
};
const resetZIndex = (value = defaultInitialZIndex) => {
  if (typeof window !== "undefined") {
    ;
    window.__YH_Z_INDEX__ = value;
  }
};
const createZIndexCounter = (initialValue = defaultInitialZIndex) => {
  return { current: initialValue };
};
const useZIndex = (zIndexOverrides) => {
  const injectedZIndex = inject(zIndexContextKey, void 0);
  const appCounter = inject(zIndexCounterKey, null);
  const initialZIndex = computed(() => {
    var _a;
    const override = unref(zIndexOverrides);
    return (_a = override != null ? override : unref(injectedZIndex)) != null ? _a : defaultInitialZIndex;
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
export {
  createZIndexCounter,
  getNextZIndex,
  resetZIndex,
  useZIndex,
  zIndexContextKey,
  zIndexCounterKey
};
