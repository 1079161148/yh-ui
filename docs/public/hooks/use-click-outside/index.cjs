"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useClickOutside = useClickOutside;
var _vue = require("vue");
var _useEventListener = require("../use-event-listener/index.cjs");
function useClickOutside(target, handler) {
  if (typeof window === "undefined") return;
  const listener = event => {
    const el = (0, _vue.unref)(target);
    if (!el) return;
    const path = event.composedPath();
    if (path.includes(el)) return;
    handler(event);
  };
  (0, _useEventListener.useEventListener)(window, "mousedown", listener, true);
  (0, _useEventListener.useEventListener)(window, "touchstart", listener, true);
}