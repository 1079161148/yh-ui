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
import { createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, Fragment as _Fragment, renderSlot as _renderSlot, createElementVNode as _createElementVNode } from "vue";
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["src", "srcset", "alt", "crossorigin"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock("span", {
    class: _normalizeClass($setup.avatarClasses),
    style: _normalizeStyle($setup.avatarStyle),
    role: "img",
    "aria-label": $props.alt
  }, [
    _createCommentVNode(" \u56FE\u7247\u6A21\u5F0F "),
    $setup.showImg ? (_openBlock(), _createElementBlock("img", {
      key: 0,
      src: $props.src,
      srcset: $props.srcSet,
      alt: $props.alt,
      style: _normalizeStyle({ objectFit: $props.fit }),
      class: _normalizeClass($setup.ns.e("img")),
      crossorigin: $setup.props.crossorigin,
      onError: $setup.handleError
    }, null, 46, _hoisted_2)) : $props.icon && !_ctx.$slots.default ? (_openBlock(), _createElementBlock(
      _Fragment,
      { key: 1 },
      [
        _createCommentVNode(" \u56FE\u6807\u6A21\u5F0F "),
        (_openBlock(), _createBlock(_resolveDynamicComponent($props.icon), {
          class: _normalizeClass($setup.ns.e("icon"))
        }, null, 8, ["class"]))
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    )) : (_openBlock(), _createElementBlock(
      _Fragment,
      { key: 2 },
      [
        _createCommentVNode(" \u9ED8\u8BA4\u63D2\u69FD\uFF08\u6587\u5B57/\u81EA\u5B9A\u4E49\uFF09 "),
        _renderSlot(_ctx.$slots, "default", {}, () => [
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("text"))
            },
            "?",
            2
            /* CLASS */
          )
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    ))
  ], 14, _hoisted_1);
}
import { computed, ref } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhAvatar" }, {
  __name: "avatar",
  props: {
    shape: { type: String, required: false, default: "circle" },
    size: { type: [String, Number], required: false, default: "default" },
    src: { type: String, required: false },
    srcSet: { type: String, required: false },
    alt: { type: String, required: false },
    fit: { type: String, required: false, default: "cover" },
    icon: { type: null, required: false },
    color: { type: String, required: false },
    backgroundColor: { type: String, required: false },
    style: { type: Object, required: false },
    crossorigin: { type: String, required: false, default: "anonymous" },
    themeOverrides: { type: null, required: false }
  },
  emits: ["error"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("avatar");
    const { themeStyle } = useComponentTheme(
      "avatar",
      computed(() => props.themeOverrides)
    );
    const imgError = ref(false);
    const sizeMap = {
      large: 56,
      default: 40,
      small: 28
    };
    const avatarSize = computed(() => {
      var _a;
      if (typeof props.size === "number") return `${props.size}px`;
      return `${(_a = sizeMap[props.size]) != null ? _a : 40}px`;
    });
    const avatarStyle = computed(() => {
      const style = __spreadProps(__spreadValues({}, themeStyle.value), {
        width: avatarSize.value,
        height: avatarSize.value,
        lineHeight: avatarSize.value,
        fontSize: `calc(${avatarSize.value} / 2.5)`
      });
      if (props.backgroundColor || props.color) {
        style.backgroundColor = props.backgroundColor || props.color || "";
      }
      return __spreadValues(__spreadValues({}, style), typeof props.style === "object" ? props.style : {});
    });
    const avatarClasses = computed(() => [
      ns.b(),
      ns.m(props.shape),
      typeof props.size === "string" && ns.m(props.size),
      ns.is("image", !!props.src && !imgError.value)
    ]);
    const showImg = computed(() => props.src && !imgError.value);
    const handleError = (event) => {
      imgError.value = true;
      emit("error", event);
    };
    const __returned__ = { props, emit, ns, themeStyle, imgError, sizeMap, avatarSize, avatarStyle, avatarClasses, showImg, handleError, computed, ref, get useNamespace() {
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
