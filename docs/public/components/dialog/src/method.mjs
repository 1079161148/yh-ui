import { h, render } from "vue";
import Dialog from "./dialog.vue";
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
      const props = {
        ...defaults,
        ...options,
        modelValue: visible,
        // 动画结束清理
        onClosed: () => {
          options.onClosed?.();
          render(null, container);
          container.remove();
        },
        onConfirm: () => {
          options.onConfirm?.();
          resolve({ action: "confirm" });
          renderDialog(false);
        },
        onCancel: () => {
          options.onCancel?.();
          resolve({ action: "cancel" });
          renderDialog(false);
        },
        "onUpdate:modelValue": (val) => {
          if (!val) {
            resolve({ action: "close" });
            renderDialog(false);
          }
        }
      };
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
    const options = typeof content === "string" ? { content, title, type } : { ...content, type };
    return createDialog(options);
  };
};
DialogMethod.success = createTypeMethod("success");
DialogMethod.warning = createTypeMethod("warning");
DialogMethod.error = createTypeMethod("error");
DialogMethod.info = createTypeMethod("info");
export default DialogMethod;
