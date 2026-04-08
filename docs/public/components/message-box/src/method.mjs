import { createVNode, render, isVNode } from "vue";
import MessageBoxConstructor from "./message-box.vue";
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
    vm.open({ ...defaults, ...options });
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
    { ...options, message, title, type: "alert", showCancelButton: false },
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
    { ...options, message, title, type: "confirm", showCancelButton: true },
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
    { ...options, message, title, type: "prompt", showCancelButton: true },
    appContext
  );
};
MessageBox.setDefaults = (newDefaults) => {
  defaults = { ...defaults, ...newDefaults };
};
export default MessageBox;
