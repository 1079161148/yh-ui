import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["fill"];
const _hoisted_2 = ["d"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.ns.b()),
      style: _normalizeStyle($setup.themeStyle),
      role: "status"
    },
    [
      _createCommentVNode(" \u56FE\u6807\u533A "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass([$setup.ns.e("icon"), $setup.ns.em("icon", $props.icon)])
        },
        [
          _renderSlot(_ctx.$slots, "icon", {}, () => [
            (_openBlock(), _createElementBlock("svg", {
              viewBox: "0 0 1024 1024",
              width: "72",
              height: "72",
              fill: $setup.iconColor,
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              _createElementVNode("path", {
                d: $setup.iconPaths[$props.icon]
              }, null, 8, _hoisted_2)
            ], 8, _hoisted_1))
          ])
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u6807\u9898\u533A "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("title"))
        },
        [
          _renderSlot(_ctx.$slots, "title", {}, () => [
            _createTextVNode(
              _toDisplayString($setup.resultTitle),
              1
              /* TEXT */
            )
          ])
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u526F\u6807\u9898\u533A "),
      $props.subTitle || _ctx.$slots["sub-title"] ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("subtitle"))
        },
        [
          _renderSlot(_ctx.$slots, "sub-title", {}, () => [
            _createTextVNode(
              _toDisplayString($props.subTitle),
              1
              /* TEXT */
            )
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u989D\u5916\u5185\u5BB9 "),
      _ctx.$slots.extra ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 1,
          class: _normalizeClass($setup.ns.e("extra"))
        },
        [
          _renderSlot(_ctx.$slots, "extra")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u9ED8\u8BA4\u63D2\u69FD\uFF08\u64CD\u4F5C\u533A\uFF09 "),
      _ctx.$slots.default ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 2,
          class: _normalizeClass($setup.ns.e("actions"))
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
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhResult" }, {
  __name: "result",
  props: {
    title: { type: String, required: false },
    subTitle: { type: String, required: false },
    icon: { type: String, required: false, default: "info" },
    themeOverrides: { type: null, required: false }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const { t } = useLocale();
    const ns = useNamespace("result");
    const { themeStyle } = useComponentTheme("result", computed(() => props.themeOverrides));
    const resultTitle = computed(() => props.title || t(`result.${props.icon}`));
    const iconColorMap = {
      success: "var(--yh-color-success, #67c23a)",
      warning: "var(--yh-color-warning, #e6a23c)",
      error: "var(--yh-color-danger, #f56c6c)",
      info: "var(--yh-color-info, #909399)"
    };
    const iconColor = computed(() => iconColorMap[props.icon] || iconColorMap.info);
    const iconPaths = {
      success: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 451.2a8 8 0 016.5-12.6h46.9a32 32 0 0125.7 12.8L454 533.3l171.3-237.6c6-8.3 15.6-13.3 25.7-13.3h46.9a8 8 0 016.5 12.6z",
      warning: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48 48 0 110-96 48 48 0 010 96z",
      error: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z",
      info: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-360a48 48 0 110-96 48 48 0 010 96z"
    };
    const __returned__ = { props, t, ns, themeStyle, resultTitle, iconColorMap, iconColor, iconPaths, computed, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
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
