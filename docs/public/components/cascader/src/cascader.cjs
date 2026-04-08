"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultCascaderConfig = exports.CascaderContextKey = void 0;
const CascaderContextKey = exports.CascaderContextKey = Symbol("CascaderContextKey");
const defaultCascaderConfig = exports.defaultCascaderConfig = {
  expandTrigger: "click",
  multiple: false,
  checkStrictly: false,
  emitPath: true,
  lazy: false,
  lazyLoad: void 0,
  value: "value",
  label: "label",
  children: "children",
  disabled: "disabled",
  leaf: "leaf"
};