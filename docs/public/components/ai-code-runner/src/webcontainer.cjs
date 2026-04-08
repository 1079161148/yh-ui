"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWebContainerInstance = void 0;
const getWebContainerInstance = async () => {
  const globalThisAny = globalThis;
  if (!globalThisAny.__webcontainer_promise__) {
    const {
      WebContainer: WC
    } = await Promise.resolve().then(() => require("@webcontainer/api"));
    globalThisAny.__webcontainer_promise__ = WC.boot();
  }
  return globalThisAny.__webcontainer_promise__;
};
exports.getWebContainerInstance = getWebContainerInstance;