import { Loading } from "./service.mjs";
const INSTANCE_KEY = Symbol("LoadingInstance");
export const vLoading = {
  mounted(el, binding) {
    const parseOptions = () => ({
      target: el,
      fullscreen: binding.modifiers.fullscreen ?? false,
      lock: binding.modifiers.lock ?? false,
      text: el.getAttribute("yh-loading-text") || void 0,
      background: el.getAttribute("yh-loading-background") || void 0,
      customClass: el.getAttribute("yh-loading-custom-class") || void 0,
      glass: el.hasAttribute("yh-loading-glass") || el.getAttribute("yh-loading-glass") !== "false" && el.getAttribute("yh-loading-glass") !== null || binding.modifiers.glass,
      dot: el.hasAttribute("yh-loading-dot") || el.getAttribute("yh-loading-dot") !== "false" && el.getAttribute("yh-loading-dot") !== null,
      color: el.getAttribute("yh-loading-color") || void 0,
      spinnerType: el.getAttribute("yh-loading-type") || void 0
    });
    if (binding.value) {
      el[INSTANCE_KEY] = Loading.service(parseOptions());
    }
  },
  updated(el, binding) {
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        if (el[INSTANCE_KEY]) el[INSTANCE_KEY]?.close();
        const options = {
          target: el,
          fullscreen: binding.modifiers.fullscreen ?? false,
          lock: binding.modifiers.lock ?? false,
          text: el.getAttribute("yh-loading-text") || void 0,
          background: el.getAttribute("yh-loading-background") || void 0,
          customClass: el.getAttribute("yh-loading-custom-class") || void 0,
          glass: el.hasAttribute("yh-loading-glass") || el.getAttribute("yh-loading-glass") !== "false" && el.getAttribute("yh-loading-glass") !== null || binding.modifiers.glass,
          dot: el.hasAttribute("yh-loading-dot") || el.getAttribute("yh-loading-dot") !== "false" && el.getAttribute("yh-loading-dot") !== null,
          color: el.getAttribute("yh-loading-color") || void 0,
          spinnerType: el.getAttribute("yh-loading-type") || void 0
        };
        el[INSTANCE_KEY] = Loading.service(options);
      } else {
        el[INSTANCE_KEY]?.close();
        el[INSTANCE_KEY] = void 0;
      }
    }
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.close();
    el[INSTANCE_KEY] = void 0;
  }
};
