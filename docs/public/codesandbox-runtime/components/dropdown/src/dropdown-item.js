import { normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, createBlock as _createBlock, renderSlot as _renderSlot, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, Fragment as _Fragment } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return _openBlock(), _createElementBlock(
    _Fragment,
    null,
    [
      _ctx.divided ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("divider"))
        },
        null,
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.classes),
          style: _normalizeStyle($setup.themeStyle),
          onClick: $setup.handleClick
        },
        [
          ((_a = $setup.dropdown) == null ? void 0 : _a.checkable.value) ? (_openBlock(), _createBlock($setup["YhIcon"], {
            key: 0,
            name: _ctx.checked ? "check" : "",
            class: _normalizeClass($setup.ns.e("check-icon"))
          }, null, 8, ["name", "class"])) : _createCommentVNode("v-if", true),
          _ctx.icon ? (_openBlock(), _createBlock($setup["YhIcon"], {
            key: 1,
            name: _ctx.icon,
            class: _normalizeClass($setup.ns.e("item-icon"))
          }, null, 8, ["name", "class"])) : _createCommentVNode("v-if", true),
          _renderSlot(_ctx.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      )
    ],
    64
    /* STABLE_FRAGMENT */
  );
}
import { inject, computed } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { YhIcon } from "../../icon/index.js";
import { dropdownItemProps, DROPDOWN_INJECTION_KEY } from "./dropdown-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhDropdownItem"
}, {
  __name: "dropdown-item",
  props: dropdownItemProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("dropdown");
    const { themeStyle } = useComponentTheme("dropdown-item", computed(() => props.themeOverrides));
    const dropdown = inject(DROPDOWN_INJECTION_KEY, null);
    const classes = computed(() => [
      ns.e("item"),
      {
        [ns.is("disabled")]: props.disabled,
        [ns.is("divided")]: props.divided,
        [ns.is("danger")]: props.danger,
        [ns.is("checked")]: (dropdown == null ? void 0 : dropdown.checkable.value) && props.checked
      }
    ]);
    const handleClick = () => {
      if (props.disabled) return;
      dropdown == null ? void 0 : dropdown.handleItemClick(props.command);
    };
    const __returned__ = { props, ns, themeStyle, dropdown, classes, handleClick, inject, computed, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get YhIcon() {
      return YhIcon;
    }, get dropdownItemProps() {
      return dropdownItemProps;
    }, get DROPDOWN_INJECTION_KEY() {
      return DROPDOWN_INJECTION_KEY;
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
