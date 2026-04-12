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
import { createVNode, render, isVNode } from "vue";
import MessageBoxConstructor from "./message-box.js";
const isServer = typeof window === "undefined";
let defaults = {
  title: "\u63D0\u793A",
  confirmButtonText: "\u786E\u5B9A",
  cancelButtonText: "\u53D6\u6D88",
  closeOnClickModal: true,
  closeOnPressEscape: true,
  lockScroll: true,
  showClose: true,
  draggableBoundary: true
};
const showMessage = (options, appContext) => {
  if (isServer) return Promise.reject("MessageBox cannot be used on server side.");
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    const vnode = createVNode(MessageBoxConstructor);
    vnode.appContext = appContext || options.appContext || null;
    let appendTo = document.body;
    if (options.appendTo) {
      if (typeof options.appendTo === "string") {
        appendTo = document.querySelector(options.appendTo);
      } else {
        appendTo = options.appendTo;
      }
    }
    if (appendTo) {
      appendTo.appendChild(container);
    } else {
      document.body.appendChild(container);
    }
    render(vnode, container);
    const vm = vnode.component.exposed;
    vm.setCallback((res) => {
      if (options.callback) {
        options.callback(res.action, vm);
      }
      if (res.action === "confirm") {
        resolve({ action: "confirm", value: res.value });
      } else {
        reject(res.action);
      }
      setTimeout(() => {
        render(null, container);
        container.remove();
      }, 500);
    });
    vm.open(__spreadValues(__spreadValues({}, defaults), options));
  });
};
const MessageBox = ((options, appContext) => {
  const opts = typeof options === "string" || isVNode(options) ? { message: options } : options;
  return showMessage(opts, appContext);
});
MessageBox.alert = (message, title, options, appContext) => {
  if (typeof title === "object") {
    appContext = options;
    options = title;
    title = "";
  } else if (typeof options === "object" && "app" in options && options.app) {
    appContext = options;
    options = void 0;
  }
  return showMessage(
    __spreadProps(__spreadValues({}, options), { message, title, type: "alert", showCancelButton: false }),
    appContext
  );
};
MessageBox.confirm = (message, title, options, appContext) => {
  if (typeof title === "object") {
    appContext = options;
    options = title;
    title = "";
  }
  return showMessage(
    __spreadProps(__spreadValues({}, options), { message, title, type: "confirm", showCancelButton: true }),
    appContext
  );
};
MessageBox.prompt = (message, title, options, appContext) => {
  if (typeof title === "object") {
    appContext = options;
    options = title;
    title = "";
  }
  return showMessage(
    __spreadProps(__spreadValues({}, options), { message, title, type: "prompt", showCancelButton: true }),
    appContext
  );
};
MessageBox.setDefaults = (newDefaults) => {
  defaults = __spreadValues(__spreadValues({}, defaults), newDefaults);
};
var stdin_default = MessageBox;
export {
  stdin_default as default
};
