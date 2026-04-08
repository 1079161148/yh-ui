"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAiRequest = useAiRequest;
var _vue = require("vue");
function useAiRequest(options) {
  const loading = (0, _vue.ref)(false);
  const data = (0, _vue.ref)("");
  const error = (0, _vue.ref)(null);
  const send = async (query, ...args) => {
    loading.value = true;
    error.value = null;
    try {
      const result = await options.request(query, ...args);
      data.value = result;
      options.onSuccess?.(result);
      return result;
    } catch (e) {
      const err = e instanceof Error ? e : new Error(String(e));
      error.value = err;
      options.onError?.(err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  return {
    loading,
    data,
    error,
    send
  };
}