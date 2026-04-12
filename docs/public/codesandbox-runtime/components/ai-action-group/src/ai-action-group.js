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
import { renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, createVNode as _createVNode, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, withCtx as _withCtx, createBlock as _createBlock, renderSlot as _renderSlot, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.direction), $setup.ns.m(_ctx.size)]),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      (_openBlock(true), _createElementBlock(
        _Fragment,
        null,
        _renderList($setup.actionItems, (item, index) => {
          return _openBlock(), _createElementBlock("div", {
            key: index,
            class: _normalizeClass([$setup.ns.e("item"), $setup.ns.is("disabled", item.disabled)]),
            onClick: ($event) => $setup.handleClick(item)
          }, [
            _createCommentVNode(" \u4F7F\u7528 Tooltip \u88C5\u9970 "),
            item.tooltip ? (_openBlock(), _createBlock($setup["YhTooltip"], {
              key: 0,
              content: item.tooltip,
              placement: "top"
            }, {
              default: _withCtx(() => [
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass($setup.ns.e("item-inner"))
                  },
                  [
                    _createVNode($setup["YhIcon"], {
                      class: _normalizeClass($setup.ns.e("item-icon")),
                      name: item.icon
                    }, null, 8, ["class", "name"]),
                    item.label ? (_openBlock(), _createElementBlock(
                      "span",
                      {
                        key: 0,
                        class: _normalizeClass($setup.ns.e("item-label"))
                      },
                      _toDisplayString(item.label),
                      3
                      /* TEXT, CLASS */
                    )) : _createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )
              ]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["content"])) : (_openBlock(), _createElementBlock(
              _Fragment,
              { key: 1 },
              [
                _createVNode($setup["YhIcon"], {
                  class: _normalizeClass($setup.ns.e("item-icon")),
                  name: item.icon
                }, null, 8, ["class", "name"]),
                item.label ? (_openBlock(), _createElementBlock(
                  "span",
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.e("item-label"))
                  },
                  _toDisplayString(item.label),
                  3
                  /* TEXT, CLASS */
                )) : _createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            ))
          ], 10, _hoisted_1);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      _createCommentVNode(" \u4E3A\u63D2\u69FD\u9884\u7559\u5C3E\u90E8 "),
      _renderSlot(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { computed } from "vue";
import { aiActionGroupProps, aiActionGroupEmits } from "./ai-action-group-meta.js";
import { YhIcon } from "../../icon/index.js";
import { YhTooltip } from "../../tooltip/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAiActionGroup"
}, {
  __name: "ai-action-group",
  props: aiActionGroupProps,
  emits: aiActionGroupEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("ai-action-group");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme("ai-action-group", props.themeOverrides);
    const defaultIcons = {
      copy: "copy",
      refresh: "refresh",
      regenerate: "refresh",
      share: "share",
      "thumb-up": "thumb-up",
      "thumb-down": "thumb-down",
      edit: "edit",
      delete: "delete"
    };
    const defaultLabels = computed(() => ({
      copy: t("ai.action.copy"),
      refresh: t("ai.action.regenerate"),
      regenerate: t("ai.action.regenerate"),
      share: t("ai.action.share"),
      "thumb-up": t("ai.action.like"),
      "thumb-down": t("ai.action.dislike"),
      edit: t("ai.action.edit"),
      delete: t("ai.action.delete")
    }));
    const actionItems = computed(() => {
      return props.items.map((item) => {
        if (typeof item === "string") {
          return {
            key: item,
            icon: defaultIcons[item] || "more",
            label: "",
            // 通常泡泡底座不需要文字标签
            tooltip: defaultLabels.value[item] || item
          };
        }
        return __spreadProps(__spreadValues({}, item), {
          icon: item.icon || defaultIcons[item.key] || "more"
        });
      });
    });
    const handleClick = (item) => {
      if (typeof item === "object" && item.disabled) return;
      const key = typeof item === "string" ? item : item.key;
      emit("click", key, item);
    };
    const __returned__ = { props, emit, ns, t, themeStyle, defaultIcons, defaultLabels, actionItems, handleClick, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, computed, get aiActionGroupProps() {
      return aiActionGroupProps;
    }, get aiActionGroupEmits() {
      return aiActionGroupEmits;
    }, get YhIcon() {
      return YhIcon;
    }, get YhTooltip() {
      return YhTooltip;
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
