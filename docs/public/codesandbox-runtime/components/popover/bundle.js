// public/codesandbox-runtime/components/popover/src/popover.js
import { createCommentVNode as _createCommentVNode3, renderSlot as _renderSlot3, createVNode as _createVNode2, normalizeClass as _normalizeClass2, normalizeStyle as _normalizeStyle2, openBlock as _openBlock3, createElementBlock as _createElementBlock3, toDisplayString as _toDisplayString2, createElementVNode as _createElementVNode2, createTextVNode as _createTextVNode, Fragment as _Fragment2, withCtx as _withCtx2, createBlock as _createBlock3 } from "vue";
import { ref as ref13, computed as computed13, watch as watch5 } from "vue";

// public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject, ref, unref } from "vue";
var defaultNamespace = "yh";
var statePrefix = "is-";
var namespaceContextKey = Symbol("namespaceContextKey");
var useGlobalNamespace = () => {
  return inject(namespaceContextKey, ref(defaultNamespace));
};
var useNamespace = (block) => {
  const namespace = useGlobalNamespace();
  const b = (blockSuffix = "") => {
    const ns = unref(namespace);
    return blockSuffix ? `${ns}-${block}-${blockSuffix}` : `${ns}-${block}`;
  };
  const e = (element) => {
    return element ? `${b()}__${element}` : "";
  };
  const m = (modifier) => {
    return modifier ? `${b()}--${modifier}` : "";
  };
  const bem = (blockSuffix, element, modifier) => {
    let cls = b(blockSuffix);
    if (element) cls += `__${element}`;
    if (modifier) cls += `--${modifier}`;
    return cls;
  };
  const em = (element, modifier) => {
    return element && modifier ? `${b()}__${element}--${modifier}` : "";
  };
  function is(state, value) {
    if (arguments.length === 1) {
      return `${statePrefix}${state}`;
    }
    return value ? `${statePrefix}${state}` : "";
  }
  const cssVar = (name) => {
    return `--${unref(namespace)}-${block}-${name}`;
  };
  const cssVarObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVar(key)] = value;
    });
    return obj;
  };
  const cssVarBlock = (name) => {
    return `--${unref(namespace)}-${name}`;
  };
  const cssVarBlockObj = (vars) => {
    const obj = {};
    Object.entries(vars).forEach(([key, value]) => {
      obj[cssVarBlock(key)] = value;
    });
    return obj;
  };
  return {
    namespace,
    b,
    e,
    m,
    bem,
    em,
    is,
    cssVar,
    cssVarObj,
    cssVarBlock,
    cssVarBlockObj
  };
};

// public/codesandbox-runtime/theme/component-theme.js
import { inject as inject2, provide, computed, unref as unref2 } from "vue";
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
var COMPONENT_THEME_KEY = Symbol("component-theme");
function useComponentTheme(componentName, localOverrides) {
  const globalThemes = inject2(COMPONENT_THEME_KEY, {});
  const mergedVars = computed(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = unref2(localOverrides) || {};
    return __spreadValues(__spreadValues({}, globalVars), local);
  });
  const themeStyle = computed(() => {
    const vars = mergedVars.value;
    const style = {};
    Object.entries(vars).forEach(([key, value]) => {
      if (value !== void 0) {
        const cssVarName = `--yh-${componentName}-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
        style[cssVarName] = value;
      }
    });
    return style;
  });
  const hasCustomTheme = computed(() => {
    return Object.keys(mergedVars.value).length > 0;
  });
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  };
}

// public/codesandbox-runtime/utils/vue.js
var withInstall = (main, extra) => {
  ;
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      const name = comp.name || comp.__name;
      if (name) {
        app.component(name, comp);
      }
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;
      main[key] = comp;
    }
  }
  return main;
};

// public/codesandbox-runtime/components/tooltip/src/tooltip.js
import { renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, vShow as _vShow, withDirectives as _withDirectives, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode, Teleport as _Teleport, createBlock as _createBlock } from "vue";
import { ref as ref12, computed as computed11, watch as watch4, onMounted as onMounted3, onUnmounted as onUnmounted4, nextTick } from "vue";
import { computePosition, offset, flip, shift, arrow, autoUpdate } from "@floating-ui/dom";

// public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed as computed2, inject as inject3, unref as unref3 } from "vue";
var zIndexContextKey = Symbol("zIndexContextKey");
var zIndexCounterKey = Symbol("zIndexCounterKey");

// public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed3 } from "vue";

// public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed4, onUnmounted } from "vue";

// public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed6, unref as unref5, watch } from "vue";

// public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject4, computed as computed5, unref as unref4 } from "vue";
var configProviderContextKey = Symbol(
  "configProviderContextKey"
);

// public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from "dayjs";
var _a;
var dayjs = "default" in dayjsModule ? (_a = dayjsModule.default) != null ? _a : dayjsModule : dayjsModule;

// public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
import "dayjs/locale/en";

// public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed7, inject as inject5, unref as unref6, useId as useVueId } from "vue";
var idInjectionKey = Symbol("idInjectionKey");
var useId = (idOverrides) => {
  const injectedId = inject5(idInjectionKey, void 0);
  const nativeId = useVueId();
  const id = computed7(() => {
    const override = unref6(idOverrides);
    if (override) return override;
    const injected = unref6(injectedId);
    if (injected) return injected;
    return nativeId;
  });
  return id;
};

// public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject6 } from "vue";
var FormContextKey = Symbol("FormContextKey");
var FormItemContextKey = Symbol("FormItemContextKey");

// public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed8, unref as unref7 } from "vue";

// public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from "vue";

// public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref8 } from "vue";
function useEventListener(target, event, handler, options) {
  if (typeof window === "undefined") return;
  const getTarget = () => {
    if (typeof target === "function") {
      return target();
    }
    return unref8(target);
  };
  const add = () => {
    const el = getTarget();
    if (el) {
      el.addEventListener(event, handler, options);
    }
  };
  const remove = () => {
    const el = getTarget();
    if (el) {
      el.removeEventListener(event, handler, options);
    }
  };
  onMounted(add);
  onBeforeUnmount(remove);
  if (isRef(target)) {
    watch2(target, (newVal, oldVal) => {
      if (oldVal) {
        oldVal.removeEventListener(event, handler, options);
      }
      if (newVal) {
        newVal.addEventListener(event, handler, options);
      }
    });
  }
}

// public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from "vue";

// public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed10 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from "vue";

// public/codesandbox-runtime/components/tooltip/src/tooltip-meta.js
var tooltipProps = {
  /** 显示内容 */
  content: {
    type: String,
    default: ""
  },
  /** 出现位置 */
  placement: {
    type: String,
    default: "top"
  },
  /** 触发方式 */
  trigger: {
    type: [String, Array],
    default: "hover"
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 出现延迟 (ms) */
  showAfter: {
    type: Number,
    default: 0
  },
  /** 消失延迟 (ms) */
  hideAfter: {
    type: Number,
    default: 200
  },
  /** 偏移量 [skidding, distance] */
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 是否允许鼠标进入提示框 */
  interactive: {
    type: Boolean,
    default: true
  },
  /** 手动控制显示隐藏 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 提示框的主题：dark / light 或自定义名称 */
  effect: {
    type: String,
    default: "dark"
  },
  /** 是否跟随鼠标移动 (高级功能) */
  followCursor: {
    type: Boolean,
    default: false
  },
  /** 弹出层的自定义类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 挂载节点 */
  teleported: {
    type: Boolean,
    default: true
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 2e3
  },
  /** 手动控制动画名称 */
  transition: {
    type: String,
    default: "yh-tooltip-fade"
  },
  /** 是否在隐藏时销毁 DOM 节点 */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 是否作为 HTML 字符串渲染 content 属性 */
  rawContent: {
    type: Boolean,
    default: false
  },
  /** 弹出层宽度 */
  width: {
    type: [String, Number],
    default: "auto"
  },
  /** 弹出层最大高度 */
  maxHeight: {
    type: [String, Number],
    default: "none"
  },
  /** 内容是否可滚动 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 弹出内容自定义类名 */
  contentClass: {
    type: String,
    default: ""
  },
  /** 弹出内容自定义样式 */
  contentStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头自定义类名 */
  arrowClass: {
    type: String,
    default: ""
  },
  /** 箭头自定义样式 */
  arrowStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 箭头容器自定义类名 */
  arrowWrapperClass: {
    type: String,
    default: ""
  },
  /** 箭头容器自定义样式 */
  arrowWrapperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var tooltipEmits = {
  "update:visible": (visible) => typeof visible === "boolean",
  show: () => true,
  hide: () => true
};

// public/codesandbox-runtime/components/tooltip/src/tooltip.js
var __defProp2 = Object.defineProperty;
var __getOwnPropSymbols2 = Object.getOwnPropertySymbols;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __propIsEnum2 = Object.prototype.propertyIsEnumerable;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues2 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp2.call(b, prop))
      __defNormalProp2(a, prop, b[prop]);
  if (__getOwnPropSymbols2)
    for (var prop of __getOwnPropSymbols2(b)) {
      if (__propIsEnum2.call(b, prop))
        __defNormalProp2(a, prop, b[prop]);
    }
  return a;
};
var _hoisted_1 = ["id", "data-placement"];
var _hoisted_2 = ["innerHTML"];
var _hoisted_3 = { key: 1 };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.ns.b()),
      ref: "triggerRef",
      onMouseenter: _cache[2] || (_cache[2] = ($event) => $setup.handleTrigger($event, "hover")),
      onMouseleave: _cache[3] || (_cache[3] = ($event) => $setup.triggers.has("hover") && $setup.toggleVisible(false)),
      onClick: _cache[4] || (_cache[4] = ($event) => $setup.handleTrigger($event, "click")),
      onContextmenu: _cache[5] || (_cache[5] = ($event) => $setup.handleTrigger($event, "contextmenu")),
      onFocusin: _cache[6] || (_cache[6] = ($event) => $setup.handleTrigger($event, "focus")),
      onFocusout: _cache[7] || (_cache[7] = ($event) => $setup.triggers.has("focus") && $setup.toggleVisible(false))
    },
    [
      _renderSlot(_ctx.$slots, "default"),
      (_openBlock(), _createBlock(_Teleport, {
        to: "body",
        disabled: !_ctx.teleported
      }, [
        _createVNode(_Transition, { name: _ctx.transition }, {
          default: _withCtx(() => [
            $setup.shouldRender ? _withDirectives((_openBlock(), _createElementBlock("div", {
              key: 0,
              id: $setup.tooltipId,
              ref: "popperRef",
              class: _normalizeClass($setup.popperClasses),
              style: _normalizeStyle($setup.computedPopperStyle),
              "data-placement": $setup.actualPlacement,
              onMouseenter: _cache[0] || (_cache[0] = ($event) => _ctx.interactive && $setup.toggleVisible(true)),
              onMouseleave: _cache[1] || (_cache[1] = ($event) => _ctx.interactive && $setup.triggers.has("hover") && $setup.toggleVisible(false))
            }, [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass([$setup.ns.e("content"), $setup.props.contentClass]),
                  style: _normalizeStyle($setup.computedContentStyle)
                },
                [
                  _renderSlot(_ctx.$slots, "content", {}, () => [
                    _createCommentVNode(" eslint-disable-next-line vue/no-v-html "),
                    _ctx.rawContent ? (_openBlock(), _createElementBlock("span", {
                      key: 0,
                      innerHTML: _ctx.content
                    }, null, 8, _hoisted_2)) : (_openBlock(), _createElementBlock(
                      "span",
                      _hoisted_3,
                      _toDisplayString(_ctx.content),
                      1
                      /* TEXT */
                    ))
                  ])
                ],
                6
                /* CLASS, STYLE */
              ),
              _createCommentVNode(" \u5C0F\u4E09\u89D2 - \u4F7F\u7528 Floating UI \u5B98\u65B9\u63A8\u8350\u7684 SVG \u8DEF\u5F84\u65B9\u6848 "),
              _ctx.showArrow ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  ref: "arrowRef",
                  class: _normalizeClass($setup.ns.e("arrow-wrapper")),
                  style: _normalizeStyle($setup.arrowStyle)
                },
                [
                  (_openBlock(), _createElementBlock(
                    "svg",
                    {
                      class: _normalizeClass($setup.ns.e("arrow")),
                      width: "12",
                      height: "12",
                      viewBox: "0 0 12 12",
                      xmlns: "http://www.w3.org/2000/svg"
                    },
                    [..._cache[8] || (_cache[8] = [
                      _createElementVNode(
                        "path",
                        { d: "M0,0 L6,6 L12,0" },
                        null,
                        -1
                        /* CACHED */
                      )
                    ])],
                    2
                    /* CLASS */
                  ))
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode("v-if", true)
            ], 46, _hoisted_1)), [
              [_vShow, $setup.showPopper]
            ]) : _createCommentVNode("v-if", true)
          ]),
          _: 3
          /* FORWARDED */
        }, 8, ["name"])
      ], 8, ["disabled"]))
    ],
    34
    /* CLASS, NEED_HYDRATION */
  );
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhTooltip"
}, {
  __name: "tooltip",
  props: tooltipProps,
  emits: tooltipEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("tooltip");
    const tooltipId = useId();
    const { themeStyle } = useComponentTheme(
      "tooltip",
      computed11(() => props.themeOverrides)
    );
    const triggerRef = ref12(null);
    const popperRef = ref12(null);
    const arrowRef = ref12(null);
    const visible = ref12(false);
    const popperStyle = ref12({});
    const arrowStyle = ref12({});
    const computedPopperStyle = computed11(() => {
      const styles = __spreadValues2(__spreadValues2({}, themeStyle.value), popperStyle.value);
      if (typeof props.popperStyle === "object") {
        Object.assign(styles, props.popperStyle);
      }
      return styles;
    });
    const computedContentStyle = computed11(() => {
      const styles = {
        width: typeof props.width === "number" ? `${props.width}px` : props.width,
        maxHeight: typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight,
        overflowY: props.scrollable ? "auto" : "visible"
      };
      if (typeof props.contentStyle === "object") {
        Object.assign(styles, props.contentStyle);
      }
      return styles;
    });
    const actualPlacement = ref12(props.placement);
    let cleanup = null;
    let showTimer = null;
    let hideTimer = null;
    const showPopper = computed11(() => {
      if (props.disabled) return false;
      return props.visible !== null ? props.visible : visible.value;
    });
    const shouldRender = computed11(() => props.persistent || showPopper.value);
    const popperClasses = computed11(() => [
      ns.e("popper"),
      ns.is(props.effect, true),
      // 使用 is-dark / is-light 更加稳定
      ns.em("popper", props.effect),
      ns.is("interactive", props.interactive),
      props.popperClass
    ]);
    const updatePosition = async () => {
      if (!triggerRef.value || !popperRef.value || typeof window === "undefined") return;
      const { x, y, placement, middlewareData } = await computePosition(
        triggerRef.value,
        popperRef.value,
        {
          placement: props.placement,
          middleware: [
            offset(props.offset[1]),
            flip(),
            shift({ padding: 5 }),
            props.showArrow ? arrow({ element: arrowRef.value }) : null
          ].filter((item) => item !== null)
        }
      );
      popperStyle.value = {
        left: `${x}px`,
        top: `${y}px`,
        zIndex: String(props.zIndex)
      };
      actualPlacement.value = placement;
      if (middlewareData.arrow && arrowRef.value) {
        const { x: ax, y: ay } = middlewareData.arrow;
        const side = placement.split("-")[0];
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[side];
        arrowStyle.value = {
          left: ax != null ? `${ax}px` : "",
          top: ay != null ? `${ay}px` : "",
          [staticSide]: "-12px"
        };
      }
    };
    const handleMouseMove = async (e) => {
      if (!props.followCursor || !visible.value || typeof window === "undefined") return;
      const virtualElement = {
        getBoundingClientRect: () => {
          const rect = {
            width: 0,
            height: 0,
            x: e.clientX,
            y: e.clientY,
            top: e.clientY,
            left: e.clientX,
            right: e.clientX,
            bottom: e.clientY,
            toJSON: () => ({})
          };
          return rect;
        }
      };
      const { x, y } = await computePosition(virtualElement, popperRef.value, {
        placement: props.placement,
        middleware: [offset(10), flip(), shift()]
      });
      popperStyle.value = {
        left: `${x}px`,
        top: `${y}px`,
        zIndex: String(props.zIndex)
      };
    };
    const toggleVisible = (value) => {
      if (props.disabled) return;
      if (showTimer) {
        clearTimeout(showTimer);
        showTimer = null;
      }
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      if (value) {
        const delay = props.showAfter;
        if (delay <= 0) {
          visible.value = true;
          emit("update:visible", true);
          emit("show");
          nextTick(startAutoUpdate);
        } else {
          showTimer = setTimeout(() => {
            visible.value = true;
            emit("update:visible", true);
            emit("show");
            nextTick(startAutoUpdate);
          }, delay);
        }
      } else {
        const delay = props.hideAfter;
        if (delay <= 0) {
          visible.value = false;
          emit("update:visible", false);
          emit("hide");
          stopAutoUpdate();
        } else {
          hideTimer = setTimeout(() => {
            visible.value = false;
            emit("update:visible", false);
            emit("hide");
            stopAutoUpdate();
          }, delay);
        }
      }
    };
    const startAutoUpdate = async () => {
      if (cleanup) cleanup();
      if (triggerRef.value && popperRef.value && !props.followCursor && typeof window !== "undefined") {
        cleanup = autoUpdate(triggerRef.value, popperRef.value, updatePosition);
      }
    };
    const stopAutoUpdate = () => {
      if (cleanup) {
        cleanup();
        cleanup = null;
      }
    };
    const triggers = computed11(() => {
      const t = Array.isArray(props.trigger) ? props.trigger : [props.trigger];
      return new Set(t);
    });
    const handleTrigger = (e, type) => {
      if (!triggers.value.has(type)) return;
      if (type === "hover") {
        toggleVisible(true);
      } else if (type === "click") {
        const isShowing = visible.value && !hideTimer || showTimer;
        toggleVisible(!isShowing);
      } else if (type === "contextmenu") {
        e.preventDefault();
        toggleVisible(true);
      } else if (type === "focus") {
        toggleVisible(true);
      }
    };
    useEventListener(
      () => window,
      "click",
      (e) => {
        var _a2, _b;
        const me = e;
        if (!visible.value) return;
        const needsClose = triggers.value.has("click") || triggers.value.has("contextmenu");
        if (!needsClose) return;
        const target = me.target;
        if (!((_a2 = triggerRef.value) == null ? void 0 : _a2.contains(target)) && !((_b = popperRef.value) == null ? void 0 : _b.contains(target))) {
          toggleVisible(false);
        }
      }
    );
    watch4(
      () => props.visible,
      (val) => {
        if (val !== null && val !== visible.value) {
          visible.value = val;
          if (val) nextTick(startAutoUpdate);
          else stopAutoUpdate();
        }
      },
      { immediate: true }
    );
    watch4(
      () => props.followCursor,
      (val) => {
        if (typeof window === "undefined") return;
        if (val) {
          window.addEventListener("mousemove", handleMouseMove);
        } else {
          window.removeEventListener("mousemove", handleMouseMove);
        }
      }
    );
    onMounted3(() => {
      if (props.followCursor && typeof window !== "undefined") {
        window.addEventListener("mousemove", handleMouseMove);
      }
    });
    onUnmounted4(() => {
      stopAutoUpdate();
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    });
    __expose({
      updatePosition,
      visible,
      triggerRef,
      popperRef
    });
    const __returned__ = { props, emit, ns, tooltipId, themeStyle, triggerRef, popperRef, arrowRef, visible, popperStyle, arrowStyle, computedPopperStyle, computedContentStyle, actualPlacement, get cleanup() {
      return cleanup;
    }, set cleanup(v) {
      cleanup = v;
    }, get showTimer() {
      return showTimer;
    }, set showTimer(v) {
      showTimer = v;
    }, get hideTimer() {
      return hideTimer;
    }, set hideTimer(v) {
      hideTimer = v;
    }, showPopper, shouldRender, popperClasses, updatePosition, handleMouseMove, toggleVisible, startAutoUpdate, stopAutoUpdate, triggers, handleTrigger, ref: ref12, computed: computed11, watch: watch4, onMounted: onMounted3, onUnmounted: onUnmounted4, nextTick, get computePosition() {
      return computePosition;
    }, get offset() {
      return offset;
    }, get flip() {
      return flip;
    }, get shift() {
      return shift;
    }, get arrow() {
      return arrow;
    }, get autoUpdate() {
      return autoUpdate;
    }, get useNamespace() {
      return useNamespace;
    }, get useId() {
      return useId;
    }, get useEventListener() {
      return useEventListener;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get tooltipProps() {
      return tooltipProps;
    }, get tooltipEmits() {
      return tooltipEmits;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default2 = __sfc__;

// public/codesandbox-runtime/components/tooltip/index.js
var YhTooltip = withInstall(stdin_default2);

// public/codesandbox-runtime/components/icon/src/icon.js
import { createCommentVNode as _createCommentVNode2, resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock2, createBlock as _createBlock2, createElementBlock as _createElementBlock2, Fragment as _Fragment, renderSlot as _renderSlot2, mergeProps as _mergeProps } from "vue";
import { computed as computed12, useSlots } from "vue";

// public/codesandbox-runtime/components/icon/src/icon-meta.js
var iconProps = {
  /**
   * 图标名称（使用内置图标时）
   */
  name: {
    type: String,
    default: ""
  },
  /**
   * SVG 字符串（直接渲染 SVG）
   */
  svg: {
    type: String,
    default: ""
  },
  /**
   * 图标组件（传入 Vue 组件）
   */
  icon: {
    type: Object,
    default: void 0
  },
  /**
   * 图标尺寸
   * - number: 像素值
   * - string: CSS 尺寸值（如 '1em', '24px'）
   */
  size: {
    type: [Number, String],
    default: void 0
  },
  /**
   * 图标颜色
   * - 默认继承父元素的 color
   */
  color: {
    type: String,
    default: void 0
  },
  /**
   * 是否启用旋转动画
   */
  spin: {
    type: Boolean,
    default: false
  },
  /**
   * 旋转角度（度数）
   */
  rotate: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var iconRegistry = /* @__PURE__ */ new Map();
function registerIcon(icon) {
  iconRegistry.set(icon.name, icon);
}
function registerIcons(icons) {
  icons.forEach((icon) => registerIcon(icon));
}
function getIcon(name) {
  return iconRegistry.get(name);
}

// public/codesandbox-runtime/components/icon/src/icon.js
var __defProp3 = Object.defineProperty;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
var _hoisted_12 = ["viewBox", "innerHTML"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock2(), _createElementBlock2(
    "i",
    _mergeProps({
      class: $setup.iconClass,
      style: $setup.iconStyle
    }, _ctx.$attrs),
    [
      _createCommentVNode2(" \u4F7F\u7528\u4F20\u5165\u7684\u56FE\u6807\u7EC4\u4EF6 "),
      $setup.useIconComponent ? (_openBlock2(), _createBlock2(_resolveDynamicComponent(_ctx.icon), {
        key: 0,
        class: "yh-icon__inner"
      })) : $setup.svgContent && !$setup.hasSlot ? (_openBlock2(), _createElementBlock2(
        _Fragment,
        { key: 1 },
        [
          _createCommentVNode2(" \u4F7F\u7528 SVG \u5B57\u7B26\u4E32\u6E32\u67D3 "),
          _createCommentVNode2(" eslint-disable vue/no-v-html "),
          (_openBlock2(), _createElementBlock2("svg", {
            class: "yh-icon__svg",
            viewBox: $setup.viewBox,
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            innerHTML: $setup.svgContent
          }, null, 8, _hoisted_12))
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )) : $setup.hasSlot ? (_openBlock2(), _createElementBlock2(
        _Fragment,
        { key: 2 },
        [
          _createCommentVNode2(" eslint-enable vue/no-v-html "),
          _createCommentVNode2(" \u4F7F\u7528\u63D2\u69FD\u81EA\u5B9A\u4E49\u5185\u5BB9 "),
          _renderSlot2(_ctx.$slots, "default")
        ],
        64
        /* STABLE_FRAGMENT */
      )) : _createCommentVNode2("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var __sfc__2 = /* @__PURE__ */ Object.assign({
  name: "YhIcon",
  inheritAttrs: false
}, {
  __name: "icon",
  props: iconProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("icon");
    const { themeStyle } = useComponentTheme(
      "icon",
      computed12(() => props.themeOverrides)
    );
    const iconStyle = computed12(() => {
      const style = __spreadValues3({}, themeStyle.value);
      if (props.size) {
        const size = typeof props.size === "number" ? `${props.size}px` : props.size;
        style.fontSize = size;
        style.width = size;
        style.height = size;
      }
      if (props.color) {
        style.color = props.color;
      }
      if (props.rotate) {
        style.transform = `rotate(${props.rotate}deg)`;
      }
      return style;
    });
    const iconClass = computed12(() => [
      ns.b(),
      {
        [ns.m("spin")]: props.spin
      }
    ]);
    const svgContent = computed12(() => {
      if (props.svg) {
        return props.svg;
      }
      if (props.name) {
        const icon = getIcon(props.name);
        if (icon) {
          return icon.svg;
        }
      }
      if (props.icon && "__svg" in props.icon) {
        return props.icon.__svg;
      }
      return "";
    });
    const viewBox = computed12(() => {
      if (props.name) {
        const icon = getIcon(props.name);
        if (icon == null ? void 0 : icon.viewBox) {
          return icon.viewBox;
        }
      }
      if (props.icon && "__viewBox" in props.icon) {
        return props.icon.__viewBox;
      }
      return "0 0 24 24";
    });
    const hasSlot = computed12(() => !!slots.default);
    const useIconComponent = computed12(() => {
      return props.icon && !("__svg" in props.icon);
    });
    const __returned__ = { props, slots, ns, themeStyle, iconStyle, iconClass, svgContent, viewBox, hasSlot, useIconComponent, computed: computed12, useSlots, get iconProps() {
      return iconProps;
    }, get getIcon() {
      return getIcon;
    }, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__2.render = render2;
var stdin_default3 = __sfc__2;

// public/codesandbox-runtime/components/icon/src/icons/index.js
var IconClose = {
  name: "close",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>'
};
var IconCheck = {
  name: "check",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>'
};
var IconArrowUp = {
  name: "arrow-up",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>'
};
var IconArrowDown = {
  name: "arrow-down",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>'
};
var IconArrowLeft = {
  name: "arrow-left",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>'
};
var IconArrowRight = {
  name: "arrow-right",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>'
};
var IconLoading = {
  name: "loading",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/>'
};
var IconSearch = {
  name: "search",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>'
};
var IconPlus = {
  name: "plus",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>'
};
var IconMinus = {
  name: "minus",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 13H5v-2h14v2z"/>'
};
var IconInfo = {
  name: "info",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
};
var IconWarning = {
  name: "warning",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>'
};
var IconError = {
  name: "error",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'
};
var IconSuccess = {
  name: "success",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
};
var IconEye = {
  name: "eye",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>'
};
var IconEyeOff = {
  name: "eye-off",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>'
};
var IconCalendar = {
  name: "calendar",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>'
};
var IconTime = {
  name: "time",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>'
};
var IconUser = {
  name: "user",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
};
var IconSettings = {
  name: "settings",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>'
};
var IconSetting = {
  name: "setting",
  viewBox: "0 0 24 24",
  svg: IconSettings.svg
};
var IconHome = {
  name: "home",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'
};
var IconImage = {
  name: "image",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>'
};
var IconDocument = {
  name: "document",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconRefresh = {
  name: "refresh",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>'
};
var IconZoomIn = {
  name: "zoom-in",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" fill-rule="evenodd" d="M17.414 16l4.293 4.293-1.414 1.414L16 17.414A8.96 8.96 0 0111 19c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.586 5zM11 17c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm-1-8V7h2v2h2v2h-2v2h-2v-2H8v-2h2z" clip-rule="evenodd" />'
};
var IconZoomOut = {
  name: "zoom-out",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" fill-rule="evenodd" d="M17.414 16l4.293 4.293-1.414 1.414L16 17.414A8.96 8.96 0 0111 19c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 01-1.586 5zM11 17c3.86 0 7-3.14 7-7s-3.14-7-7-7-7 3.14-7 7 3.14 7 7 7zm-3-8h6v2H8v-2z" clip-rule="evenodd" />'
};
var IconDelete = {
  name: "delete",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>'
};
var IconUpload = {
  name: "upload",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96M14 13v4h-4v-4H7l5-5 5 5h-3z"/>'
};
var IconDownload = {
  name: "download",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>'
};
var IconFilePdf = {
  name: "file-pdf",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3.5h-1.5v1.5h-1V7h2.5v1zm-6.5 3.5h1v-3h-1v3zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/>'
};
var IconFileExcel = {
  name: "file-excel",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25H21.17M7 13.06L8.18 15.28L10.14 15.28L8.59 12.19L10.11 9.22L8.12 9.22L7 11.24L5.87 9.22L3.89 9.22L5.41 12.19L3.86 15.28L5.82 15.28L7 13.06M20.5 19.25V4.75H8.5V7H9.17Q9.5 7 9.76 7.24 10 7.5 10 7.83V16.17Q10 16.5 9.76 16.76 9.5 17 9.17 17H8.5V19.25H20.5Z"/>'
};
var IconFileWord = {
  name: "file-word",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25H21.17M7 13.06L8.18 15.28L10.14 15.28L8.59 12.19L10.11 9.22L8.12 9.22L7 11.24L5.87 9.22L3.89 9.22L5.41 12.19L3.86 15.28L5.82 15.28L7 13.06M20.5 19.25V4.75H8.5V7H9.17Q9.5 7 9.76 7.24 10 7.5 10 7.83V16.17Q10 16.5 9.76 16.76 9.5 17 9.17 17H8.5V19.25H20.5Z"/>'
};
var IconFileVideo = {
  name: "file-video",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>'
};
var IconFileAudio = {
  name: "file-audio",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z"/>'
};
var IconFileTxt = {
  name: "file-txt",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconAttachment = {
  name: "attachment",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.34 9.84 2 11.5 2C13.16 2 14.5 3.34 14.5 5V15.5C14.5 16.05 14.05 16.5 13.5 16.5C12.95 16.5 12.5 16.05 12.5 15.5V6H11V15.5C11 16.88 12.12 18 13.5 18C14.88 18 16 16.88 16 15.5V5C16 2.51 13.99 0.5 11.5 0.5C9.01 0.5 7 2.51 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z"/>'
};
var IconEdit = {
  name: "edit",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>'
};
var IconCopy = {
  name: "copy",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>'
};
var IconStar = {
  name: "star",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>'
};
var IconFolder = {
  name: "folder",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>'
};
var IconFolderOpened = {
  name: "folder-opened",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/>'
};
var IconRobot = {
  name: "robot",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M22,10h-2V7c0-1.66-1.34-3-3-3H7C5.34,4,4,5.34,4,7v3H2C1.45,10,1,10.45,1,11v4c0,0.55,0.45,1,1,1h2v3c0,1.66,1.34,3,3,3h10c1.66,0,3-1.34,3-3v-3h2c0.55,0,1-0.45,1-1v-4C23,10.45,22.55,10,22,10z M8,11c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1S7,12.55,7,12C7,11.45,7.45,11,8,11z M16,11c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1s-1-0.45-1-1C15,11.45,15.45,11,16,11z M16,18H8v-2h8V18z"/>'
};
var IconCloseCircle = {
  name: "close-circle",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>'
};
var IconCheckCircle = {
  name: "check-circle",
  viewBox: "0 0 24 24",
  svg: IconSuccess.svg
};
var IconSend = {
  name: "send",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>'
};
var IconSendArrow = {
  name: "send-arrow",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11 4.586V20h2V4.586l6.29 6.294 1.414-1.414L12 0.758 3.293 9.466l1.414 1.414z"/>'
};
var IconClean = {
  name: "clean",
  viewBox: "0 0 1024 1024",
  svg: '<path fill="currentColor" d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V342c0-14.4-11.6-26-26-26H611.8l-4.8-27.4c-9.6-55.6-58.4-96.6-114.7-96.6s-105.1 41-114.7 96.6l-4.8 27.4H160c-14.4 0-26 11.6-26 26v196c0 14.4 11.6 26 26 26h17.9l-53 305.6c-.3 1.5-.4 3-.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-.1 4.4-.4 14.2-2.4 23.7-15.9 21.2-30.4zM492.2 263.3c3.2-18.4 19.2-31.3 37.8-31.3s34.6 12.9 37.8 31.3l2.8 52.7h-81.2l2.8-52.7zm321 563.3H210.7l41.5-238h519.5l41.5 238zM206 518v-84h612v84H206z"></path>'
};
var IconPaperclip = {
  name: "paperclip",
  viewBox: "0 0 24 24",
  svg: IconAttachment.svg
};
var IconMicrophone = {
  name: "microphone",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>'
};
var IconThumbUp = {
  name: "thumb-up",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>'
};
var IconThumbDown = {
  name: "thumb-down",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.37-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>'
};
var IconSparkles = {
  name: "sparkles",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M11,1L12.5,4L15.5,5.5L12.5,7L11,10L9.5,7L6.5,5.5L9.5,4L11,1M5,10L6.5,13L9.5,14.5L6.5,16L5,19L3.5,16L0.5,14.5L3.5,13L5,10M17.5,12L19,15L22,16.5L19,18L17.5,21L16,18L13,16.5L16,15L17.5,12Z"/>'
};
var IconShare = {
  name: "share",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>'
};
var IconChat = {
  name: "chat",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>'
};
var IconVideoPlay = {
  name: "video-play",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M8 5v14l11-7L8 5z"/>'
};
var IconGlobe = {
  name: "globe",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>'
};
var IconTable = {
  name: "table",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 10.02h5V21h-5V10.02zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9zm12-11H9V3h6v5zm2 0h5V3h-5v5zM7 3H4c-1.1 0-2 .9-2 2v3h5V3z"/>'
};
var IconChartBar = {
  name: "chart-bar",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8h2.8v6h-2.8v-6z"/>'
};
var IconLaunch = {
  name: "launch",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>'
};
var IconCode = {
  name: "code",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>'
};
var IconStarFilled = {
  name: "star-filled",
  viewBox: "0 0 24 24",
  svg: IconStar.svg
};
var IconCheckmarkCircle = {
  name: "checkmark-circle",
  viewBox: "0 0 24 24",
  svg: IconCheckCircle.svg
};
var IconPresentation = {
  name: "presentation",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM21 17H3V5h18v12zM10 7l6 4-6 4V7z"/>'
};
var IconDocumentText = {
  name: "document-text",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>'
};
var IconVideoPause = {
  name: "video-pause",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'
};
var IconBook = {
  name: "book",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM10 9h8v2h-8V9zm0 3h4v2h-4v-2zm0-6h8v2h-8V6z"/>'
};
var IconLink = {
  name: "link",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>'
};
var IconBold = {
  name: "bold",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"/>'
};
var IconItalic = {
  name: "italic",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z"/>'
};
var IconHeading = {
  name: "heading",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4z"/>'
};
var IconFormat = {
  name: "format",
  viewBox: "0 0 24 24",
  svg: '<path fill="currentColor" d="M3 10h11v2H3v-2zm0-4h11v2H3V6zm0 8h7v2H3v-2zm13-1v8l-4-4 4-4z"/>'
};
var builtInIcons = [
  IconClose,
  IconCheck,
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconLoading,
  IconSearch,
  IconPlus,
  IconMinus,
  IconInfo,
  IconWarning,
  IconError,
  IconSuccess,
  IconEye,
  IconEyeOff,
  IconCalendar,
  IconTime,
  IconUser,
  IconSettings,
  IconSetting,
  IconHome,
  IconImage,
  IconDocument,
  IconRefresh,
  IconDelete,
  IconUpload,
  IconDownload,
  IconFilePdf,
  IconFileExcel,
  IconFileWord,
  IconFileVideo,
  IconFileAudio,
  IconFileTxt,
  IconAttachment,
  IconEdit,
  IconCopy,
  IconStar,
  IconFolder,
  IconFolderOpened,
  IconRobot,
  IconCloseCircle,
  IconCheckCircle,
  IconSend,
  IconSendArrow,
  IconClean,
  IconPaperclip,
  IconMicrophone,
  IconThumbUp,
  IconThumbDown,
  IconSparkles,
  IconShare,
  IconChat,
  IconVideoPlay,
  IconVideoPause,
  IconGlobe,
  IconTable,
  IconChartBar,
  IconLaunch,
  IconCode,
  IconZoomIn,
  IconZoomOut,
  IconStarFilled,
  IconCheckmarkCircle,
  IconPresentation,
  IconDocumentText,
  IconBook,
  // 命令菜单相关图标
  IconLink,
  IconBold,
  IconItalic,
  IconHeading,
  IconFormat
];
registerIcons(builtInIcons);

// public/codesandbox-runtime/components/icon/index.js
var YhIcon = withInstall(stdin_default3);

// public/codesandbox-runtime/components/popover/src/popover-meta.js
var popoverProps = {
  /** 标题 */
  title: String,
  /** 描述文字 (对齐 Popconfirm) */
  description: String,
  /** 图标名称 (对齐 Popconfirm) */
  icon: String,
  /** 图标颜色 */
  iconColor: String,
  /** 内容文字 (也可通过默认插槽设置复杂内容) */
  content: String,
  /** 弹出位置 */
  placement: {
    type: String,
    default: "bottom"
  },
  /** 触发方式，支持数组 */
  trigger: {
    type: [String, Array],
    default: "click"
  },
  /** 手动控制可见性 */
  visible: {
    type: Boolean,
    default: null
  },
  /** 提示框的主题：light / dark */
  effect: {
    type: String,
    default: "light"
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否显示小三角 */
  showArrow: {
    type: Boolean,
    default: true
  },
  /** 出现延迟 (ms) */
  showAfter: {
    type: Number,
    default: 0
  },
  /** 隐藏延迟 (ms) */
  hideAfter: {
    type: Number,
    default: 100
  },
  /** 偏移量 [横向, 纵向] */
  offset: {
    type: Array,
    default: () => [0, 12]
  },
  /** 弹出层宽度 */
  width: {
    type: [String, Number],
    default: "auto"
  },
  /** 最大高度 (配合 scrollable 使用) */
  maxHeight: {
    type: [String, Number],
    default: "none"
  },
  /** 内容是否可滚动 */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 是否允许鼠标进入提示框 */
  interactive: {
    type: Boolean,
    default: true
  },
  /** 是否跟随触发器宽度 */
  matchTriggerWidth: {
    type: Boolean,
    default: false
  },
  /** z-index 层级 */
  zIndex: {
    type: Number,
    default: 2003
  },
  /** 是否挂载至 body */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 弹出层自定义类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 弹出层自定义样式 */
  popperStyle: {
    type: [Object, String, Array],
    default: () => ({})
  },
  /** 动画名称 */
  transition: {
    type: String,
    default: "yh-popover-fade"
  },
  /** 是否持久化 DOM (隐藏时是否销毁) */
  persistent: {
    type: Boolean,
    default: true
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var popoverEmits = {
  "update:visible": (visible) => typeof visible === "boolean",
  show: () => true,
  hide: () => true
};

// public/codesandbox-runtime/components/popover/src/popover.js
var __defProp4 = Object.defineProperty;
var __getOwnPropSymbols4 = Object.getOwnPropertySymbols;
var __hasOwnProp4 = Object.prototype.hasOwnProperty;
var __propIsEnum4 = Object.prototype.propertyIsEnumerable;
var __defNormalProp4 = (obj, key, value) => key in obj ? __defProp4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues4 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp4.call(b, prop))
      __defNormalProp4(a, prop, b[prop]);
  if (__getOwnPropSymbols4)
    for (var prop of __getOwnPropSymbols4(b)) {
      if (__propIsEnum4.call(b, prop))
        __defNormalProp4(a, prop, b[prop]);
    }
  return a;
};
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock3(), _createBlock3($setup["YhTooltip"], {
    ref: "tooltipRef",
    visible: $setup.visible,
    "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => $setup.visible = $event),
    class: _normalizeClass2($setup.ns.b()),
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
    content: _withCtx2(() => [
      _createElementVNode2(
        "div",
        {
          class: _normalizeClass2($setup.ns.e("content")),
          style: _normalizeStyle2($setup.contentStyle)
        },
        [
          _createCommentVNode3(" \u6838\u5FC3\u5185\u5BB9\u533A (\u652F\u6301 Icon \u4FA7\u8FB9\u5BF9\u9F50) "),
          _createElementVNode2(
            "div",
            {
              class: _normalizeClass2([$setup.ns.e("main"), $setup.ns.is("has-icon", !!_ctx.icon || !!_ctx.$slots.icon)])
            },
            [
              _createCommentVNode3(" \u4FA7\u8FB9\u56FE\u6807\u680F "),
              _ctx.icon || _ctx.$slots.icon ? (_openBlock3(), _createElementBlock3(
                "div",
                {
                  key: 0,
                  class: _normalizeClass2($setup.ns.e("icon")),
                  style: _normalizeStyle2({
                    color: _ctx.iconColor
                  })
                },
                [
                  _renderSlot3(_ctx.$slots, "icon", {}, () => [
                    _createVNode2($setup["YhIcon"], { name: _ctx.icon }, null, 8, ["name"])
                  ])
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode3("v-if", true),
              _createCommentVNode3(" \u6587\u672C\u5185\u5BB9\u533A (\u5F3A\u5236\u5BF9\u9F50) "),
              _createElementVNode2(
                "div",
                {
                  class: _normalizeClass2($setup.ns.e("inner"))
                },
                [
                  _createCommentVNode3(" \u5934\u90E8/\u6807\u9898 "),
                  _ctx.title || _ctx.$slots.header ? (_openBlock3(), _createElementBlock3(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass2($setup.ns.e("header"))
                    },
                    [
                      _renderSlot3(_ctx.$slots, "header", {}, () => [
                        _createElementVNode2(
                          "div",
                          {
                            class: _normalizeClass2($setup.ns.e("title"))
                          },
                          _toDisplayString2(_ctx.title),
                          3
                          /* TEXT, CLASS */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode3("v-if", true),
                  _createCommentVNode3(" \u4E3B\u4F53\u5185\u5BB9 "),
                  _createElementVNode2(
                    "div",
                    {
                      class: _normalizeClass2($setup.ns.e("body"))
                    },
                    [
                      _renderSlot3(_ctx.$slots, "content", {}, () => [
                        _ctx.description ? (_openBlock3(), _createElementBlock3(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass2($setup.ns.e("description"))
                          },
                          _toDisplayString2(_ctx.description),
                          3
                          /* TEXT, CLASS */
                        )) : _createCommentVNode3("v-if", true),
                        _ctx.content ? (_openBlock3(), _createElementBlock3(
                          _Fragment2,
                          { key: 1 },
                          [
                            _createTextVNode(
                              _toDisplayString2(_ctx.content),
                              1
                              /* TEXT */
                            )
                          ],
                          64
                          /* STABLE_FRAGMENT */
                        )) : _renderSlot3(_ctx.$slots, "default", { key: 2 })
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
          _createCommentVNode3(" \u5E95\u90E8\u63D2\u69FD "),
          _ctx.$slots.footer ? (_openBlock3(), _createElementBlock3(
            "div",
            {
              key: 0,
              class: _normalizeClass2($setup.ns.e("footer"))
            },
            [
              _renderSlot3(_ctx.$slots, "footer")
            ],
            2
            /* CLASS */
          )) : _createCommentVNode3("v-if", true)
        ],
        6
        /* CLASS, STYLE */
      )
    ]),
    default: _withCtx2(() => [
      _renderSlot3(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["visible", "class", "trigger", "placement", "disabled", "show-arrow", "show-after", "hide-after", "offset", "z-index", "effect", "teleported", "transition", "persistent", "interactive", "popper-class", "popper-style"]);
}
var __sfc__3 = /* @__PURE__ */ Object.assign({
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
      computed13(() => props.themeOverrides)
    );
    const internalVisible = ref13(false);
    const visible = computed13({
      get: () => props.visible !== null ? props.visible : internalVisible.value,
      set: (val) => {
        internalVisible.value = val;
        emit("update:visible", val);
      }
    });
    const tooltipRef = ref13(null);
    const triggerWidth = ref13("auto");
    const contentStyle = computed13(() => {
      const styles = __spreadValues4({}, themeStyle.value);
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
      var _a2;
      if (props.matchTriggerWidth && ((_a2 = tooltipRef.value) == null ? void 0 : _a2.triggerRef)) {
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
    watch5(
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
    const __returned__ = { props, emit, ns, themeStyle, internalVisible, visible, tooltipRef, triggerWidth, contentStyle, updateTriggerWidth, handleShow, handleHide, ref: ref13, computed: computed13, watch: watch5, get useNamespace() {
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
__sfc__3.render = render3;
var stdin_default4 = __sfc__3;
export {
  stdin_default4 as default
};
