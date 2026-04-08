"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zIndexCounterKey = exports.zIndexContextKey = exports.useZIndex = exports.resetZIndex = exports.getNextZIndex = exports.createZIndexCounter = void 0;
var _vue = require("vue");
const defaultInitialZIndex = 2e3;
const zIndexContextKey = exports.zIndexContextKey = Symbol("zIndexContextKey");
const zIndexCounterKey = exports.zIndexCounterKey = Symbol("zIndexCounterKey");
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
exports.getNextZIndex = getNextZIndex;
const resetZIndex = (value = defaultInitialZIndex) => {
  if (typeof window !== "undefined") {
    ;
    window.__YH_Z_INDEX__ = value;
  }
};
exports.resetZIndex = resetZIndex;
const createZIndexCounter = (initialValue = defaultInitialZIndex) => {
  return {
    current: initialValue
  };
};
exports.createZIndexCounter = createZIndexCounter;
const useZIndex = zIndexOverrides => {
  const injectedZIndex = (0, _vue.inject)(zIndexContextKey, void 0);
  const appCounter = (0, _vue.inject)(zIndexCounterKey, null);
  const initialZIndex = (0, _vue.computed)(() => {
    const override = (0, _vue.unref)(zIndexOverrides);
    return override ?? (0, _vue.unref)(injectedZIndex) ?? defaultInitialZIndex;
  });
  const currentZIndex = (0, _vue.computed)(() => initialZIndex.value);
  const nextZIndex = () => {
    const override = (0, _vue.unref)(zIndexOverrides);
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
exports.useZIndex = useZIndex;