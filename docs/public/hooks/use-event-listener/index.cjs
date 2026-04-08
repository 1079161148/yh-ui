"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEventListener = useEventListener;
var _vue = require("vue");
function useEventListener(target, event, handler, options) {
  if (typeof window === "undefined") return;
  const getTarget = () => {
    if (typeof target === "function") {
      return target();
    }
    return (0, _vue.unref)(target);
  };
  const add = () => {
    const el = getTarget();
    if (el) {
      el.addEventListener(event, handler, options);
    }
  };
  const remove = () => {
    const el = getTarget();
    if (el) {
      el.removeEventListener(event, handler, options);
    }
  };
  (0, _vue.onMounted)(add);
  (0, _vue.onBeforeUnmount)(remove);
  if ((0, _vue.isRef)(target)) {
    (0, _vue.watch)(target, (newVal, oldVal) => {
      if (oldVal) {
        oldVal.removeEventListener(event, handler, options);
      }
      if (newVal) {
        newVal.addEventListener(event, handler, options);
      }
    });
  }
}