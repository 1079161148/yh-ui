var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { Loading } from "./src/service.js";
import { vLoading } from "./src/directive.js";
const YhLoading = __spreadProps(__spreadValues({}, Loading), {
  directive: vLoading,
  install(app) {
    app.config.globalProperties.$loading = Loading.service;
    app.directive("yh-loading", vLoading);
  }
});
const vYhLoading = vLoading;
var stdin_default = YhLoading;
export * from "./src/service.js";
export * from "./src/directive.js";
import "./src/loading.css";
export {
  YhLoading,
  stdin_default as default,
  vYhLoading
};
