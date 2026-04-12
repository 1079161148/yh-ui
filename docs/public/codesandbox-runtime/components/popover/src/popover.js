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
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createVNode as _createVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, createTextVNode as _createTextVNode, Fragment as _Fragment, withCtx as _withCtx, createBlock as _createBlock } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock($setup["YhTooltip"], {
    ref: "tooltipRef",
    visible: $setup.visible,
    "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => $setup.visible = $event),
    class: _normalizeClass($setup.ns.b()),
    trigger: _ctx.trigger,
    placement: _ctx.placement,
    disabled: _ctx.disabled,
    "show-arrow": _ctx.showArrow,
    "show-after": _ctx.showAfter,
    "hide-after": _ctx.hideAfter,
    offset: _ctx.offset,
    "z-index": _ctx.zIndex,
    effect: _ctx.effect,
    teleported: _ctx.teleported,
    transition: _ctx.transition,
    persistent: _ctx.persistent,
    interactive: _ctx.interactive,
    "popper-class": `${$setup.ns.e("popper")} ${_ctx.popperClass}`,
    "popper-style": _ctx.popperStyle,
    onShow: $setup.handleShow,
    onHide: $setup.handleHide
  }, {
    content: _withCtx(() => [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("content")),
          style: _normalizeStyle($setup.contentStyle)
        },
        [
          _createCommentVNode(" \u6838\u5FC3\u5185\u5BB9\u533A (\u652F\u6301 Icon \u4FA7\u8FB9\u5BF9\u9F50) "),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass([$setup.ns.e("main"), $setup.ns.is("has-icon", !!_ctx.icon || !!_ctx.$slots.icon)])
            },
            [
              _createCommentVNode(" \u4FA7\u8FB9\u56FE\u6807\u680F "),
              _ctx.icon || _ctx.$slots.icon ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("icon")),
                  style: _normalizeStyle({
                    color: _ctx.iconColor
                  })
                },
                [
                  _renderSlot(_ctx.$slots, "icon", {}, () => [
                    _createVNode($setup["YhIcon"], { name: _ctx.icon }, null, 8, ["name"])
                  ])
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" \u6587\u672C\u5185\u5BB9\u533A (\u5F3A\u5236\u5BF9\u9F50) "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("inner"))
                },
                [
                  _createCommentVNode(" \u5934\u90E8/\u6807\u9898 "),
                  _ctx.title || _ctx.$slots.header ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("header"))
                    },
                    [
                      _renderSlot(_ctx.$slots, "header", {}, () => [
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass($setup.ns.e("title"))
                          },
                          _toDisplayString(_ctx.title),
                          3
                          /* TEXT, CLASS */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true),
                  _createCommentVNode(" \u4E3B\u4F53\u5185\u5BB9 "),
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("body"))
                    },
                    [
                      _renderSlot(_ctx.$slots, "content", {}, () => [
                        _ctx.description ? (_openBlock(), _createElementBlock(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e("description"))
                          },
                          _toDisplayString(_ctx.description),
                          3
                          /* TEXT, CLASS */
                        )) : _createCommentVNode("v-if", true),
                        _ctx.content ? (_openBlock(), _createElementBlock(
                          _Fragment,
                          { key: 1 },
                          [
                            _createTextVNode(
                              _toDisplayString(_ctx.content),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : _renderSlot(_ctx.$slots, "default", { key: 2 })
                      ])
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          _createCommentVNode(" \u5E95\u90E8\u63D2\u69FD "),
          _ctx.$slots.footer ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("footer"))
            },
            [
              _renderSlot(_ctx.$slots, "footer")
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )
    ]),
    default: _withCtx(() => [
      _renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["visible", "class", "trigger", "placement", "disabled", "show-arrow", "show-after", "hide-after", "offset", "z-index", "effect", "teleported", "transition", "persistent", "interactive", "popper-class", "popper-style"]);
}
import { ref, computed, watch } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { YhTooltip } from "../../tooltip/index.js";
import { YhIcon } from "../../icon/index.js";
import { popoverProps, popoverEmits } from "./popover-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhPopover"
}, {
  __name: "popover",
  props: popoverProps,
  emits: popoverEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("popover");
    const { themeStyle } = useComponentTheme(
      "popover",
      computed(() => props.themeOverrides)
    );
    const internalVisible = ref(false);
    const visible = computed({
      get: () => props.visible !== null ? props.visible : internalVisible.value,
      set: (val) => {
        internalVisible.value = val;
        emit("update:visible", val);
      }
    });
    const tooltipRef = ref(null);
    const triggerWidth = ref("auto");
    const contentStyle = computed(() => {
      const styles = __spreadValues({}, themeStyle.value);
      if (props.matchTriggerWidth) {
        styles.width = triggerWidth.value;
      } else if (props.width !== "auto") {
        styles.width = typeof props.width === "number" ? `${props.width}px` : props.width;
      }
      if (props.maxHeight !== "none") {
        styles.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight;
        styles.overflowY = props.scrollable ? "auto" : "hidden";
      }
      return styles;
    });
    const updateTriggerWidth = () => {
      var _a;
      if (props.matchTriggerWidth && ((_a = tooltipRef.value) == null ? void 0 : _a.triggerRef)) {
        const width = tooltipRef.value.triggerRef.offsetWidth;
        triggerWidth.value = `${width}px`;
      }
    };
    const handleShow = () => {
      updateTriggerWidth();
      emit("show");
      emit("update:visible", true);
    };
    const handleHide = () => {
      emit("hide");
      emit("update:visible", false);
    };
    watch(
      () => props.matchTriggerWidth,
      (val) => {
        if (val) updateTriggerWidth();
      }
    );
    __expose({
      /** 手动控制可见性 */
      toggle: (val) => visible.value = val,
      /** 弹出状态 */
      visible
    });
    const __returned__ = { props, emit, ns, themeStyle, internalVisible, visible, tooltipRef, triggerWidth, contentStyle, updateTriggerWidth, handleShow, handleHide, ref, computed, watch, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get YhTooltip() {
      return YhTooltip;
    }, get YhIcon() {
      return YhIcon;
    }, get popoverProps() {
      return popoverProps;
    }, get popoverEmits() {
      return popoverEmits;
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
