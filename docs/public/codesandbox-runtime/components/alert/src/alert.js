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
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock, createBlock as _createBlock, createElementBlock as _createElementBlock, Fragment as _Fragment, normalizeClass as _normalizeClass, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, Transition as _Transition, withCtx as _withCtx } from "vue";
const _hoisted_1 = {
  viewBox: "0 0 1024 1024",
  width: "20",
  height: "20"
};
const _hoisted_2 = {
  key: 0,
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z"
};
const _hoisted_3 = {
  key: 1,
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm0 160a32 32 0 0 0-32 32v320a32 32 0 0 0 64 0V448a32 32 0 0 0-32-32z"
};
const _hoisted_4 = {
  key: 2,
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a48 48 0 1 0 0 96 48 48 0 0 0 0-96zm0 160a32 32 0 0 0-32 32v320a32 32 0 0 0 64 0V448a32 32 0 0 0-32-32z"
};
const _hoisted_5 = {
  key: 3,
  fill: "currentColor",
  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm170.3 535.1a32 32 0 0 0 0-45.2L557.3 512l125-125a32 32 0 0 0-45.2-45.2L512 466.7l-125-125a32 32 0 0 0-45.2 45.2l125 125-125 125a32 32 0 0 0 45.2 45.2l125-125 125 125a32 32 0 0 0 45.2 0z"
};
const _hoisted_6 = ["aria-label"];
const _hoisted_7 = { key: 0 };
const _hoisted_8 = {
  key: 2,
  viewBox: "0 0 1024 1024",
  width: "16",
  height: "16"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_Transition, {
    name: `${$setup.ns.namespace.value}-fade`
  }, {
    default: _withCtx(() => [
      $setup.visible ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.alertClass),
          style: _normalizeStyle($setup.alertStyle),
          role: "alert",
          onMouseenter: $setup.handleMouseEnter,
          onMouseleave: $setup.handleMouseLeave
        },
        [
          _createCommentVNode(" \u56FE\u6807\u90E8\u5206 "),
          _ctx.showIcon ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("icon"))
            },
            [
              _renderSlot(_ctx.$slots, "icon", {}, () => [
                _ctx.icon ? (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.icon), { key: 0 })) : (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    _createCommentVNode(" \u9ED8\u8BA4\u7C7B\u578B\u56FE\u6807 (\u8FD9\u91CC\u53EF\u4EE5\u9884\u7F6E\u51E0\u4E2A SVG) "),
                    (_openBlock(), _createElementBlock("svg", _hoisted_1, [
                      _ctx.type === "success" ? (_openBlock(), _createElementBlock("path", _hoisted_2)) : _createCommentVNode("v-if", true),
                      _ctx.type === "info" ? (_openBlock(), _createElementBlock("path", _hoisted_3)) : _createCommentVNode("v-if", true),
                      _ctx.type === "warning" ? (_openBlock(), _createElementBlock("path", _hoisted_4)) : _createCommentVNode("v-if", true),
                      _ctx.type === "error" ? (_openBlock(), _createElementBlock("path", _hoisted_5)) : _createCommentVNode("v-if", true)
                    ]))
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ])
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u5185\u5BB9\u90E8\u5206 "),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass([$setup.ns.e("content")])
            },
            [
              _ctx.title || $setup.slots.title ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("title"))
                },
                [
                  _renderSlot(_ctx.$slots, "title", {}, () => [
                    _createTextVNode(
                      _toDisplayString(_ctx.title),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("description-wrapper"))
                },
                [
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("description-content"))
                    },
                    [
                      _ctx.description || $setup.slots.default ? (_openBlock(), _createElementBlock(
                        "p",
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e("description"))
                        },
                        [
                          _renderSlot(_ctx.$slots, "default", {}, () => [
                            _createTextVNode(
                              _toDisplayString(_ctx.description),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true),
                      _createCommentVNode(" \u6781\u81F4\u4E1D\u6ED1\uFF1A\u5F53\u5F00\u542F\u6EDA\u52A8\u65F6\uFF0C\u81EA\u52A8\u590D\u5236\u4E00\u4EFD\u5185\u5BB9\u5B9E\u73B0\u65E0\u7F1D\u8854\u63A5 "),
                      _ctx.scrollable && (_ctx.description || $setup.slots.default) ? (_openBlock(), _createElementBlock(
                        "p",
                        {
                          key: 1,
                          class: _normalizeClass($setup.ns.e("description"))
                        },
                        [
                          _renderSlot(_ctx.$slots, "default", {}, () => [
                            _createTextVNode(
                              _toDisplayString(_ctx.description),
                              1
                              /* TEXT */
                            )
                          ])
                        ],
                        2
                        /* CLASS */
                      )) : _createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  )
                ],
                2
                /* CLASS */
              ),
              _createCommentVNode(" Action \u6269\u5C55\u69FD "),
              $setup.slots.action ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 1,
                  class: _normalizeClass($setup.ns.e("action"))
                },
                [
                  _renderSlot(_ctx.$slots, "action")
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ),
          _createCommentVNode(" \u5173\u95ED\u6309\u94AE "),
          _ctx.closable ? (_openBlock(), _createElementBlock("div", {
            key: 1,
            class: _normalizeClass($setup.ns.e("close")),
            "aria-label": $setup.t("dialog.close"),
            onClick: $setup.handleClose
          }, [
            _renderSlot(_ctx.$slots, "close", {}, () => [
              _ctx.closeText ? (_openBlock(), _createElementBlock(
                "span",
                _hoisted_7,
                _toDisplayString(_ctx.closeText),
                1
                /* TEXT */
              )) : _ctx.closeIcon ? (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.closeIcon), {
                key: 1,
                style: { "width": "16px", "height": "16px" }
              })) : (_openBlock(), _createElementBlock("svg", _hoisted_8, [..._cache[0] || (_cache[0] = [
                _createElementVNode(
                  "path",
                  {
                    fill: "currentColor",
                    d: "M810.7 274.7L749.3 213.3 512 450.7 274.7 213.3 213.3 274.7 450.7 512 213.3 749.3 274.7 810.7 512 573.3 749.3 810.7 810.7 749.3 573.3 512z"
                  },
                  null,
                  -1
                  /* CACHED */
                )
              ])]))
            ])
          ], 10, _hoisted_6)) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u5012\u8BA1\u65F6\u8FDB\u5EA6\u6761 "),
          _ctx.showProgress && _ctx.duration > 0 ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 2,
              class: _normalizeClass($setup.ns.e("progress-track"))
            },
            [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("progress-bar")),
                  style: _normalizeStyle($setup.progressStyle)
                },
                null,
                6
                /* CLASS, STYLE */
              )
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true)
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      )) : _createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
import { ref, computed, onMounted, onBeforeUnmount, useSlots } from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { alertProps, alertEmits } from "./alert-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhAlert"
}, {
  __name: "alert",
  props: alertProps,
  emits: alertEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("alert");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "alert",
      computed(() => props.themeOverrides)
    );
    const slots = useSlots();
    const visible = ref(true);
    const progress = ref(100);
    const remainingTime = ref(props.duration);
    const lastUpdate = ref(0);
    const isPaused = ref(false);
    let timer = null;
    let rafId = null;
    const updateProgress = () => {
      if (isPaused.value || !visible.value) return;
      const now = Date.now();
      const elapsed = now - lastUpdate.value;
      lastUpdate.value = now;
      remainingTime.value = Math.max(0, remainingTime.value - elapsed);
      progress.value = remainingTime.value / props.duration * 100;
      if (remainingTime.value > 0) {
        rafId = requestAnimationFrame(updateProgress);
      } else {
        visible.value = false;
      }
    };
    const alertClass = computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.m(props.effect),
      ns.is("center", props.center),
      ns.is("scrollable", props.scrollable),
      ns.is("pause-on-hover", props.pauseOnHover),
      ns.is("with-description", !!props.description || !!slots.default)
    ]);
    const alertStyle = computed(() => __spreadProps(__spreadValues({}, themeStyle.value), {
      "--yh-alert-scroll-speed": `${props.scrollSpeed}s`
    }));
    const progressStyle = computed(() => ({
      width: `${progress.value}%`,
      transition: "none"
    }));
    const handleClose = (evt) => {
      visible.value = false;
      emit("close", evt);
      clearAutoClose();
    };
    const clearAutoClose = () => {
      if (timer) clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
    };
    const handleMouseEnter = () => {
      if (props.pauseOnHover && props.duration > 0) {
        isPaused.value = true;
        if (timer) clearTimeout(timer);
      }
    };
    const handleMouseLeave = () => {
      if (props.pauseOnHover && props.duration > 0 && visible.value) {
        isPaused.value = false;
        lastUpdate.value = Date.now();
        if (props.showProgress) {
          rafId = requestAnimationFrame(updateProgress);
        }
        timer = setTimeout(() => {
          visible.value = false;
        }, remainingTime.value);
      }
    };
    onMounted(() => {
      if (props.duration > 0) {
        remainingTime.value = props.duration;
        lastUpdate.value = Date.now();
        if (props.showProgress) {
          rafId = requestAnimationFrame(updateProgress);
        }
        timer = setTimeout(() => {
          visible.value = false;
        }, props.duration);
      }
    });
    onBeforeUnmount(() => {
      clearAutoClose();
    });
    const __returned__ = { props, emit, ns, t, themeStyle, slots, visible, progress, remainingTime, lastUpdate, isPaused, get timer() {
      return timer;
    }, set timer(v) {
      timer = v;
    }, get rafId() {
      return rafId;
    }, set rafId(v) {
      rafId = v;
    }, updateProgress, alertClass, alertStyle, progressStyle, handleClose, clearAutoClose, handleMouseEnter, handleMouseLeave, ref, computed, onMounted, onBeforeUnmount, useSlots, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get alertProps() {
      return alertProps;
    }, get alertEmits() {
      return alertEmits;
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
