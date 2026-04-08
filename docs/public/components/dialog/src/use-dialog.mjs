import {
  h,
  render,
  getCurrentInstance
} from "vue";
import Dialog from "./dialog.vue";
export function useDialog() {
  const instance = getCurrentInstance();
  const appContext = instance?.appContext || (instance?.proxy?.$root?._context ?? null);
  const showDialog = (options) => {
    return new Promise((resolve) => {
      const container = document.createElement("div");
      const renderDialog = (visible) => {
        const props = {
          ...options,
          modelValue: visible,
          // 核心：监听彻底销毁事件，清理 DOM
          onClosed: () => {
            options.onClosed?.();
            render(null, container);
            container.remove();
          },
          // 确定
          onConfirm: () => {
            options.onConfirm?.();
            resolve({ action: "confirm" });
            renderDialog(false);
          },
          // 取消
          onCancel: () => {
            options.onCancel?.();
            resolve({ action: "cancel" });
            renderDialog(false);
          },
          // 监听 v-model 变化 (处理 ESC、点击遮罩等导致的关闭)
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
          vnode.appContext = options.appContext || appContext;
        }
        render(vnode, container);
      };
      renderDialog(true);
      document.body.appendChild(container);
    });
  };
  return {
    showDialog
  };
}
