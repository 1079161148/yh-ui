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
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "header",
    {
      class: _normalizeClass($setup.ns.b()),
      style: _normalizeStyle($setup.headerStyle)
    },
    [
      _renderSlot(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
import { computed } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhHeader" }, {
  __name: "header",
  props: {
    height: { type: String, required: false, default: "60px" },
    themeOverrides: { type: null, required: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("header");
    const { themeStyle } = useComponentTheme("header", computed(() => props.themeOverrides));
    const headerStyle = computed(() => __spreadProps(__spreadValues({}, themeStyle.value), {
      height: props.height
    }));
    const __returned__ = { props, ns, themeStyle, headerStyle, computed, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default = __sfc__;
export {
  stdin_default as default
};
