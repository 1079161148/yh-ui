import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, toDisplayString as _toDisplayString, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, Fragment as _Fragment, withModifiers as _withModifiers, vShow as _vShow, normalizeStyle as _normalizeStyle, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx } from "vue";
const _hoisted_1 = {
  key: 0,
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_2 = {
  key: 1,
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_3 = {
  key: 2,
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_4 = {
  key: 3,
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
};
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_Transition, {
    name: `${$setup.ns.b()}-${$setup.positionClass}`,
    onAfterLeave: $setup.onDestroy,
    persisted: ""
  }, {
    default: _withCtx(() => [
      _withDirectives(_createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.notificationClasses),
          style: _normalizeStyle([$setup.themeStyle, $setup.notificationStyles]),
          role: "alert",
          onClick: $setup.handleClick,
          onMouseenter: $setup.handleMouseEnter,
          onMouseleave: $setup.handleMouseLeave
        },
        [
          _createCommentVNode(" \u56FE\u6807 "),
          $props.type || $props.icon || _ctx.$slots.icon ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("icon"))
            },
            [
              _renderSlot(_ctx.$slots, "icon", {}, () => [
                $setup.iconName ? (_openBlock(), _createElementBlock(
                  "span",
                  {
                    key: 0,
                    class: _normalizeClass($setup.ns.em("icon", $props.type || "default"))
                  },
                  [
                    $props.type === "success" ? (_openBlock(), _createElementBlock("svg", _hoisted_1, [..._cache[0] || (_cache[0] = [
                      _createElementVNode(
                        "path",
                        {
                          fill: "currentColor",
                          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
                        },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])])) : $props.type === "warning" ? (_openBlock(), _createElementBlock("svg", _hoisted_2, [..._cache[1] || (_cache[1] = [
                      _createElementVNode(
                        "path",
                        {
                          fill: "currentColor",
                          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
                        },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])])) : $props.type === "info" ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [..._cache[2] || (_cache[2] = [
                      _createElementVNode(
                        "path",
                        {
                          fill: "currentColor",
                          d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c0-23.232-8.832-44.8-23.68-59.648-14.976-14.848-36.48-23.68-59.648-23.68-23.168 0-44.672 8.832-59.648 23.68-14.848 14.848-23.68 36.416-23.68 59.648 0 23.168 8.832 44.672 23.68 59.648 14.976 14.976 36.48 23.808 59.648 23.808 23.168 0 44.672-8.832 59.648-23.808 14.848-14.976 23.68-36.48 23.68-59.648zm-12.8 166.4h-128a32 32 0 0 0-32 32v256a32 32 0 0 0 32 32h128a32 32 0 0 0 32-32v-256a32 32 0 0 0-32-32z"
                        },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])])) : $props.type === "error" ? (_openBlock(), _createElementBlock("svg", _hoisted_4, [..._cache[3] || (_cache[3] = [
                      _createElementVNode(
                        "path",
                        {
                          fill: "currentColor",
                          d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                        },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])])) : _createCommentVNode("v-if", true)
                  ],
                  2
                  /* CLASS */
                )) : _createCommentVNode("v-if", true)
              ])
            ],
            2
            /* CLASS */
          )) : _createCommentVNode("v-if", true),
          _createCommentVNode(" \u5185\u5BB9\u533A\u57DF "),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("content"))
            },
            [
              _createCommentVNode(" \u6807\u9898 "),
              $props.title ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("title"))
                },
                _toDisplayString($props.title),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" \u6D88\u606F\u5185\u5BB9 "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("message"))
                },
                [
                  _renderSlot(_ctx.$slots, "default", {}, () => [
                    _createCommentVNode(" VNode \u7C7B\u578B\uFF08\u5305\u62EC\u51FD\u6570\u8FD4\u56DE\u7684 VNode\uFF09 "),
                    $setup.isMessageVNode ? (_openBlock(), _createBlock(_resolveDynamicComponent($setup.renderMessage), {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("text"))
                    }, null, 8, ["class"])) : $props.dangerouslyUseHTMLString ? (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 1 },
                      [
                        _createCommentVNode(" HTML \u5B57\u7B26\u4E32 "),
                        _createCommentVNode(" eslint-disable vue/no-v-html "),
                        _createElementVNode("p", {
                          class: _normalizeClass($setup.ns.e("text")),
                          innerHTML: $setup.renderMessage
                        }, null, 10, _hoisted_5)
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    )) : (_openBlock(), _createElementBlock(
                      _Fragment,
                      { key: 2 },
                      [
                        _createCommentVNode(" eslint-enable vue/no-v-html "),
                        _createCommentVNode(" \u666E\u901A\u5B57\u7B26\u4E32 "),
                        _createElementVNode(
                          "p",
                          {
                            class: _normalizeClass($setup.ns.e("text"))
                          },
                          _toDisplayString($setup.renderMessage),
                          3
                          /* TEXT, CLASS */
                        )
                      ],
                      2112
                      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                    ))
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          ),
          _createCommentVNode(" \u5173\u95ED\u6309\u94AE "),
          $props.showClose ? (_openBlock(), _createElementBlock("div", {
            key: 1,
            class: _normalizeClass($setup.ns.e("close")),
            "aria-label": $setup.t("message.close"),
            onClick: _withModifiers($setup.close, ["stop"])
          }, [..._cache[4] || (_cache[4] = [
            _createElementVNode(
              "svg",
              {
                viewBox: "0 0 1024 1024",
                xmlns: "http://www.w3.org/2000/svg"
              },
              [
                _createElementVNode("path", {
                  fill: "currentColor",
                  d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                })
              ],
              -1
              /* CACHED */
            )
          ])], 10, _hoisted_6)) : _createCommentVNode("v-if", true)
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      ), [
        [_vShow, $setup.visible]
      ])
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
import { computed, onMounted, ref, watch, isVNode } from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhNotification"
}, {
  __name: "notification",
  props: {
    title: { type: String, required: false },
    message: { type: [String, Object, Function], required: false },
    type: { type: null, required: false },
    icon: { type: [String, Object], required: false },
    showClose: { type: Boolean, required: false, default: true },
    duration: { type: Number, required: false, default: 4500 },
    offset: { type: Number, required: false, default: 16 },
    position: { type: null, required: false, default: "top-right" },
    id: { type: String, required: false },
    dangerouslyUseHTMLString: { type: Boolean, required: false, default: false },
    onClose: { type: Function, required: false },
    onClick: { type: Function, required: false },
    zIndex: { type: Number, required: false },
    customClass: { type: String, required: false },
    max: { type: Number, required: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["destroy", "click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("notification");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "notification",
      computed(() => props.themeOverrides)
    );
    const visible = ref(false);
    let timer = null;
    const notificationClasses = computed(() => [
      ns.b(),
      ns.m(props.position),
      props.type && ns.m(props.type),
      props.customClass
    ]);
    const notificationStyles = computed(() => {
      const styles = {};
      if (props.position.startsWith("top")) {
        styles.top = `${props.offset}px`;
      } else {
        styles.bottom = `${props.offset}px`;
      }
      if (props.position.endsWith("center")) {
        styles.left = "50%";
        styles.transform = "translateX(-50%)";
      }
      if (props.zIndex) {
        styles.zIndex = String(props.zIndex);
      }
      return styles;
    });
    const positionClass = computed(() => {
      return props.position;
    });
    const iconName = computed(() => {
      if (props.icon) return props.icon;
      if (!props.type) return void 0;
      const iconMap = {
        success: "check-circle",
        warning: "warning",
        info: "info-circle",
        error: "close-circle"
      };
      return iconMap[props.type];
    });
    const renderMessage = computed(() => {
      const msg = props.message;
      if (typeof msg === "function") {
        return msg();
      }
      return msg;
    });
    const isMessageVNode = computed(() => {
      return isVNode(renderMessage.value);
    });
    const startTimer = () => {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          close();
        }, props.duration);
      }
    };
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
    const close = () => {
      var _a;
      visible.value = false;
      (_a = props.onClose) == null ? void 0 : _a.call(props);
    };
    const handleClick = () => {
      var _a;
      (_a = props.onClick) == null ? void 0 : _a.call(props);
      emit("click");
    };
    const handleMouseEnter = () => {
      clearTimer();
    };
    const handleMouseLeave = () => {
      startTimer();
    };
    const onDestroy = () => {
      emit("destroy");
    };
    watch(
      () => props.duration,
      () => {
        clearTimer();
        startTimer();
      }
    );
    onMounted(() => {
      visible.value = true;
      startTimer();
    });
    __expose({
      visible,
      close
    });
    const __returned__ = { props, emit, ns, t, themeStyle, visible, get timer() {
      return timer;
    }, set timer(v) {
      timer = v;
    }, notificationClasses, notificationStyles, positionClass, iconName, renderMessage, isMessageVNode, startTimer, clearTimer, close, handleClick, handleMouseEnter, handleMouseLeave, onDestroy, computed, onMounted, ref, watch, isVNode, get useNamespace() {
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
