"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require("vue");
var _dialog = _interopRequireDefault(require("./dialog.vue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
  return new Promise(resolve => {
    const container = document.createElement("div");
    const renderDialog = visible => {
      const props = {
        ...defaults,
        ...options,
        modelValue: visible,
        // 动画结束清理
        onClosed: () => {
          options.onClosed?.();
          (0, _vue.render)(null, container);
          container.remove();
        },
        onConfirm: () => {
          options.onConfirm?.();
          resolve({
            action: "confirm"
          });
          renderDialog(false);
        },
        onCancel: () => {
          options.onCancel?.();
          resolve({
            action: "cancel"
          });
          renderDialog(false);
        },
        "onUpdate:modelValue": val => {
          if (!val) {
            resolve({
              action: "close"
            });
            renderDialog(false);
          }
        }
      };
      const slots = {};
      if (options.header) {
        slots.header = typeof options.header === "function" ? options.header : () => [(0, _vue.h)(options.header)];
      }
      if (options.default) {
        slots.default = typeof options.default === "function" ? options.default : () => [(0, _vue.h)(options.default)];
      }
      if (options.footer) {
        slots.footer = typeof options.footer === "function" ? options.footer : () => [(0, _vue.h)(options.footer)];
      }
      const vnode = (0, _vue.h)(_dialog.default, props, slots);
      if (appContext || options.appContext) {
        vnode.appContext = options.appContext || appContext || null;
      }
      (0, _vue.render)(vnode, container);
    };
    renderDialog(true);
    document.body.appendChild(container);
  });
};
const DialogMethod = options => createDialog(options);
DialogMethod.show = options => createDialog(options);
const createTypeMethod = type => {
  return (content, title) => {
    const options = typeof content === "string" ? {
      content,
      title,
      type
    } : {
      ...content,
      type
    };
    return createDialog(options);
  };
};
DialogMethod.success = createTypeMethod("success");
DialogMethod.warning = createTypeMethod("warning");
DialogMethod.error = createTypeMethod("error");
DialogMethod.info = createTypeMethod("info");
module.exports = DialogMethod;