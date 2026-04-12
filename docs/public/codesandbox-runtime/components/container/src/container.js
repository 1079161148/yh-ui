import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "section",
    {
      class: _normalizeClass([$setup.ns.b(), $setup.ns.is("vertical", $setup.isVertical)]),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _renderSlot(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
import { computed, useSlots } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhContainer" }, {
  __name: "container",
  props: {
    direction: { type: String, required: false },
    themeOverrides: { type: null, required: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("container");
    const { themeStyle } = useComponentTheme("container", computed(() => props.themeOverrides));
    const isVertical = computed(() => {
      var _a;
      if (props.direction) return props.direction === "vertical";
      const defaultSlot = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (!defaultSlot) return false;
      return defaultSlot.some((vnode) => {
        var _a2;
        const tag = (_a2 = vnode.type) == null ? void 0 : _a2.name;
        return tag === "YhHeader" || tag === "YhFooter";
      });
    });
    const __returned__ = { props, slots, ns, themeStyle, isVertical, computed, useSlots, get useNamespace() {
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
