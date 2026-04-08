"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require("vue");
var _messageBox = _interopRequireDefault(require("./message-box.vue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
    const vnode = (0, _vue.createVNode)(_messageBox.default);
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
    (0, _vue.render)(vnode, container);
    const vm = vnode.component.exposed;
    vm.setCallback(res => {
      if (options.callback) {
        options.callback(res.action, vm);
      }
      if (res.action === "confirm") {
        resolve({
          action: "confirm",
          value: res.value
        });
      } else {
        reject(res.action);
      }
      setTimeout(() => {
        (0, _vue.render)(null, container);
        container.remove();
      }, 500);
    });
    vm.open({
      ...defaults,
      ...options
    });
  });
};
const MessageBox = (options, appContext) => {
  const opts = typeof options === "string" || (0, _vue.isVNode)(options) ? {
    message: options
  } : options;
  return showMessage(opts, appContext);
};
MessageBox.alert = (message, title, options, appContext) => {
  if (typeof title === "object") {
    appContext = options;
    options = title;
    title = "";
  } else if (typeof options === "object" && "app" in options && options.app) {
    appContext = options;
    options = void 0;
  }
  return showMessage({
    ...options,
    message,
    title,
    type: "alert",
    showCancelButton: false
  }, appContext);
};
MessageBox.confirm = (message, title, options, appContext) => {
  if (typeof title === "object") {
    appContext = options;
    options = title;
    title = "";
  }
  return showMessage({
    ...options,
    message,
    title,
    type: "confirm",
    showCancelButton: true
  }, appContext);
};
MessageBox.prompt = (message, title, options, appContext) => {
  if (typeof title === "object") {
    appContext = options;
    options = title;
    title = "";
  }
  return showMessage({
    ...options,
    message,
    title,
    type: "prompt",
    showCancelButton: true
  }, appContext);
};
MessageBox.setDefaults = newDefaults => {
  defaults = {
    ...defaults,
    ...newDefaults
  };
};
module.exports = MessageBox;