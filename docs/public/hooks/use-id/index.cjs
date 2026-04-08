"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIdInjection = exports.useId = exports.idInjectionKey = void 0;
var _vue = require("vue");
const idInjectionKey = exports.idInjectionKey = Symbol("idInjectionKey");
const useId = idOverrides => {
  const injectedId = (0, _vue.inject)(idInjectionKey, void 0);
  const nativeId = (0, _vue.useId)();
  const id = (0, _vue.computed)(() => {
    const override = (0, _vue.unref)(idOverrides);
    if (override) return override;
    const injected = (0, _vue.unref)(injectedId);
    if (injected) return injected;
    return nativeId;
  });
  return id;
};
exports.useId = useId;
const useIdInjection = () => {
  return {
    prefix: (0, _vue.computed)(() => `yh-${Date.now()}`),
    current: 0
    // No longer using counter
  };
};
exports.useIdInjection = useIdInjection;