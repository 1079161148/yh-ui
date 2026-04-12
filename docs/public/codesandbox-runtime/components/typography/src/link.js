import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["href", "target", "aria-disabled", "tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock("a", {
    class: _normalizeClass($setup.linkClasses),
    style: _normalizeStyle($setup.themeStyle),
    href: $props.disabled ? void 0 : $props.href,
    target: $props.target,
    "aria-disabled": $props.disabled,
    tabindex: $props.disabled ? -1 : 0,
    onClick: $setup.handleClick
  }, [
    _renderSlot(_ctx.$slots, "default")
  ], 14, _hoisted_1);
}
import { computed } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhTypographyLink" }, {
  __name: "link",
  props: {
    href: { type: String, required: false },
    target: { type: String, required: false, default: "_self" },
    type: { type: String, required: false },
    underline: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("typography");
    const { themeStyle } = useComponentTheme("typography", computed(() => props.themeOverrides));
    const linkClasses = computed(() => [
      ns.e("link"),
      props.type && ns.em("link", props.type),
      props.underline && ns.is("underline"),
      props.disabled && ns.is("disabled")
    ]);
    const handleClick = (event) => {
      if (props.disabled) {
        event.preventDefault();
        return;
      }
      emit("click", event);
    };
    const __returned__ = { props, emit, ns, themeStyle, linkClasses, handleClick, computed, get useNamespace() {
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
