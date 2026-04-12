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
import { h, render } from "vue";
import Dialog from "./dialog.js";
const defaults = {
  width: "50%",
  top: "15vh",
  closeOnClickModal: true,
  closeOnPressEscape: true,
  draggable: false,
  modal: true,
  showClose: true,
  zIndex: 2e3
};
const createDialog = (options, appContext) => {
  if (typeof window === "undefined") return Promise.reject("Dialog cannot be used on server side.");
  return new Promise((resolve) => {
    const container = document.createElement("div");
    const renderDialog = (visible) => {
      const props = __spreadProps(__spreadValues(__spreadValues({}, defaults), options), {
        modelValue: visible,
        // 动画结束清理
        onClosed: () => {
          var _a;
          (_a = options.onClosed) == null ? void 0 : _a.call(options);
          render(null, container);
          container.remove();
        },
        onConfirm: () => {
          var _a;
          (_a = options.onConfirm) == null ? void 0 : _a.call(options);
          resolve({ action: "confirm" });
          renderDialog(false);
        },
        onCancel: () => {
          var _a;
          (_a = options.onCancel) == null ? void 0 : _a.call(options);
          resolve({ action: "cancel" });
          renderDialog(false);
        },
        "onUpdate:modelValue": (val) => {
          if (!val) {
            resolve({ action: "close" });
            renderDialog(false);
          }
        }
      });
      const slots = {};
      if (options.header) {
        slots.header = typeof options.header === "function" ? options.header : () => [h(options.header)];
      }
      if (options.default) {
        slots.default = typeof options.default === "function" ? options.default : () => [h(options.default)];
      }
      if (options.footer) {
        slots.footer = typeof options.footer === "function" ? options.footer : () => [h(options.footer)];
      }
      const vnode = h(Dialog, props, slots);
      if (appContext || options.appContext) {
        vnode.appContext = options.appContext || appContext || null;
      }
      render(vnode, container);
    };
    renderDialog(true);
    document.body.appendChild(container);
  });
};
const DialogMethod = ((options) => createDialog(options));
DialogMethod.show = (options) => createDialog(options);
const createTypeMethod = (type) => {
  return (content, title) => {
    const options = typeof content === "string" ? { content, title, type } : __spreadProps(__spreadValues({}, content), { type });
    return createDialog(options);
  };
};
DialogMethod.success = createTypeMethod("success");
DialogMethod.warning = createTypeMethod("warning");
DialogMethod.error = createTypeMethod("error");
DialogMethod.info = createTypeMethod("info");
var stdin_default = DialogMethod;
export {
  stdin_default as default
};
