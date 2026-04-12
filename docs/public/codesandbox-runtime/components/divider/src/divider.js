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
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.classes),
      style: _normalizeStyle($setup.dividerStyle),
      role: "separator"
    },
    [
      _ctx.$slots.default && _ctx.direction !== "vertical" ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass([$setup.ns.e("text"), $setup.ns.is(_ctx.contentPosition)])
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
import { computed } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { dividerProps } from "./divider-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhDivider"
}, {
  __name: "divider",
  props: dividerProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("divider");
    const { themeStyle } = useComponentTheme("divider", computed(() => props.themeOverrides));
    const dividerStyle = computed(() => {
      const styles = {
        "--yh-divider-border-style": props.borderStyle
      };
      if (props.color) {
        styles["--yh-divider-border-color"] = props.color;
      }
      if (props.borderWidth) {
        styles["--yh-divider-border-width"] = typeof props.borderWidth === "number" ? `${props.borderWidth}px` : props.borderWidth;
      }
      return __spreadValues(__spreadValues({}, themeStyle.value), styles);
    });
    const classes = computed(() => [
      ns.b(),
      ns.m(props.direction),
      props.contentPosition !== "center" ? ns.m(`content-${props.contentPosition}`) : ""
    ]);
    const __returned__ = { props, ns, themeStyle, dividerStyle, classes, computed, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get dividerProps() {
      return dividerProps;
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
