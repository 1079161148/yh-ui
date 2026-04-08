"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCache = useCache;
var _vue = require("vue");
function useCache(key, fetcher) {
  const data = (0, _vue.shallowRef)(null);
  const execute = async () => {
    try {
      data.value = await fetcher();
    } catch (err) {
      console.error(`[YH-UI] Cache fetcher error for key ${key}:`, err);
    }
  };
  return {
    data,
    execute
  };
}