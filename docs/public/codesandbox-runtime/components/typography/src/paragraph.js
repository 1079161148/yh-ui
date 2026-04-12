var __defProp = Object.defineProperty;
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
import { renderSlot as _renderSlot, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = { key: 0 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "p",
    {
      class: _normalizeClass($setup.paragraphClasses),
      style: _normalizeStyle($setup.paragraphStyle)
    },
    [
      $props.mark ? (_openBlock(), _createElementBlock("mark", _hoisted_1, [
        _renderSlot(_ctx.$slots, "default")
      ])) : _renderSlot(_ctx.$slots, "default", { key: 1 })
    ],
    6
    /* CLASS, STYLE */
  );
}
import { computed } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhTypographyParagraph" }, {
  __name: "paragraph",
  props: {
    type: { type: String, required: false },
    bold: { type: Boolean, required: false, default: false },
    delete: { type: Boolean, required: false, default: false },
    italic: { type: Boolean, required: false, default: false },
    mark: { type: Boolean, required: false, default: false },
    align: { type: String, required: false },
    ellipsis: { type: [Boolean, Number], required: false, default: false },
    spacing: { type: String, required: false, default: "default" },
    themeOverrides: { type: null, required: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("typography");
    const { themeStyle } = useComponentTheme(
      "typography",
      computed(() => props.themeOverrides)
    );
    const paragraphClasses = computed(() => [
      ns.e("paragraph"),
      props.type && ns.em("paragraph", props.type),
      props.align && ns.em("paragraph", props.align),
      props.spacing && ns.em("paragraph", props.spacing),
      props.bold && ns.is("bold"),
      props.delete && ns.is("delete"),
      props.italic && ns.is("italic"),
      props.ellipsis && ns.is("ellipsis")
    ]);
    const ellipsisStyle = computed(() => {
      if (typeof props.ellipsis === "number" && props.ellipsis > 1) {
        return {
          display: "-webkit-box",
          WebkitLineClamp: props.ellipsis,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        };
      }
      return {};
    });
    const paragraphStyle = computed(() => __spreadValues(__spreadValues({}, themeStyle.value || {}), ellipsisStyle.value));
    const __returned__ = { props, ns, themeStyle, paragraphClasses, ellipsisStyle, paragraphStyle, computed, get useNamespace() {
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
