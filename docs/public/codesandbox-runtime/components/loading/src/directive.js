import { Loading } from "./service.js";
const INSTANCE_KEY = Symbol("LoadingInstance");
const vLoading = {
  mounted(el, binding) {
    const parseOptions = () => {
      var _a, _b;
      return {
        target: el,
        fullscreen: (_a = binding.modifiers.fullscreen) != null ? _a : false,
        lock: (_b = binding.modifiers.lock) != null ? _b : false,
        text: el.getAttribute("yh-loading-text") || void 0,
        background: el.getAttribute("yh-loading-background") || void 0,
        customClass: el.getAttribute("yh-loading-custom-class") || void 0,
        glass: el.hasAttribute("yh-loading-glass") || el.getAttribute("yh-loading-glass") !== "false" && el.getAttribute("yh-loading-glass") !== null || binding.modifiers.glass,
        dot: el.hasAttribute("yh-loading-dot") || el.getAttribute("yh-loading-dot") !== "false" && el.getAttribute("yh-loading-dot") !== null,
        color: el.getAttribute("yh-loading-color") || void 0,
        spinnerType: el.getAttribute("yh-loading-type") || void 0
      };
    };
    if (binding.value) {
      el[INSTANCE_KEY] = Loading.service(parseOptions());
    }
  },
  updated(el, binding) {
    var _a, _b, _c, _d;
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        if (el[INSTANCE_KEY]) (_a = el[INSTANCE_KEY]) == null ? void 0 : _a.close();
        const options = {
          target: el,
          fullscreen: (_b = binding.modifiers.fullscreen) != null ? _b : false,
          lock: (_c = binding.modifiers.lock) != null ? _c : false,
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
        (_d = el[INSTANCE_KEY]) == null ? void 0 : _d.close();
        el[INSTANCE_KEY] = void 0;
      }
    }
  },
  unmounted(el) {
    var _a;
    (_a = el[INSTANCE_KEY]) == null ? void 0 : _a.close();
    el[INSTANCE_KEY] = void 0;
  }
};
export {
  vLoading
};
