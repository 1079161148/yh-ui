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
import { renderSlot as _renderSlot, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, withModifiers as _withModifiers, Transition as _Transition, withCtx as _withCtx, createBlock as _createBlock } from "vue";
const _hoisted_1 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_Transition, {
    name: `${$setup.ns.namespace.value}-fade-in`
  }, {
    default: _withCtx(() => [
      $setup.visible ? (_openBlock(), _createElementBlock("div", {
        key: 0,
        ref: "elRef",
        class: _normalizeClass($setup.ns.b()),
        style: _normalizeStyle($setup.containerStyle),
        "aria-label": $setup.t("backtop.text"),
        onClick: _withModifiers($setup.handleClick, ["stop"])
      }, [
        _renderSlot(_ctx.$slots, "default", {}, () => [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("content"))
            },
            [..._cache[0] || (_cache[0] = [
              _createElementVNode(
                "svg",
                {
                  viewBox: "0 0 1024 1024",
                  width: "20",
                  height: "20"
                },
                [
                  _createElementVNode("path", {
                    fill: "currentColor",
                    d: "M512 320L192 640h640z"
                  })
                ],
                -1
                /* CACHED */
              )
            ])],
            2
            /* CLASS */
          )
        ]),
        _createCommentVNode(" \u8FDB\u5EA6\u73AF "),
        _ctx.showProgress ? (_openBlock(), _createElementBlock(
          "svg",
          {
            key: 0,
            class: _normalizeClass($setup.ns.e("progress")),
            viewBox: "0 0 36 36"
          },
          [
            _createElementVNode(
              "circle",
              {
                class: _normalizeClass($setup.ns.e("progress-bg")),
                cx: "18",
                cy: "18",
                r: "16"
              },
              null,
              2
              /* CLASS */
            ),
            _createElementVNode(
              "circle",
              {
                class: _normalizeClass($setup.ns.e("progress-bar")),
                cx: "18",
                cy: "18",
                r: "16",
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
      ], 14, _hoisted_1)) : _createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["name"]);
}
import { ref, computed, onMounted, onBeforeUnmount, shallowRef } from "vue";
import { useZIndex, useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { backTopProps, backTopEmits } from "./back-top-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhBackTop"
}, {
  __name: "back-top",
  props: backTopProps,
  emits: backTopEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("back-top");
    const { t } = useLocale();
    const { nextZIndex } = useZIndex();
    const { themeStyle } = useComponentTheme(
      "back-top",
      computed(() => props.themeOverrides)
    );
    const visible = ref(false);
    const progress = ref(0);
    const scrollContainer = shallowRef();
    const elRef = ref();
    const containerStyle = computed(() => __spreadProps(__spreadValues({}, themeStyle.value), {
      right: `${props.right}px`,
      bottom: `${props.bottom}px`,
      zIndex: nextZIndex()
    }));
    const progressStyle = computed(() => ({
      strokeDashoffset: (1 - progress.value / 100) * 100,
      color: props.progressColor || "var(--yh-color-primary)"
    }));
    const getScrollInfo = (el) => {
      if (el instanceof Window) {
        const top = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        return { top, totalHeight };
      } else {
        const top = el.scrollTop;
        const totalHeight = el.scrollHeight - el.clientHeight;
        return { top, totalHeight };
      }
    };
    let scheduled = false;
    const handleScroll = () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
          if (!scrollContainer.value) return;
          const { top, totalHeight } = getScrollInfo(scrollContainer.value);
          visible.value = top >= props.visibilityHeight;
          progress.value = totalHeight > 0 ? Math.min(top / totalHeight * 100, 100) : 0;
          scheduled = false;
        });
      }
    };
    const scrollToTop = () => {
      const container = scrollContainer.value;
      if (!container) return;
      const beginTime = Date.now();
      const { top: beginValue } = getScrollInfo(container);
      const rAF = window.requestAnimationFrame;
      const frameFunc = () => {
        const progress2 = (Date.now() - beginTime) / props.duration;
        if (progress2 < 1) {
          const el = container instanceof Window ? document.documentElement : container;
          el.scrollTo(0, beginValue * (1 - easeInOutCubic(progress2)));
          rAF(frameFunc);
        } else {
          const el = container instanceof Window ? document.documentElement : container;
          el.scrollTo(0, 0);
        }
      };
      rAF(frameFunc);
    };
    const easeInOutCubic = (t2) => t2 < 0.5 ? 4 * t2 * t2 * t2 : (t2 - 1) * (2 * t2 - 2) * (2 * t2 - 2) + 1;
    const handleClick = (event) => {
      scrollToTop();
      emit("click", event);
    };
    onMounted(() => {
      if (props.target) {
        scrollContainer.value = document.querySelector(props.target);
      } else {
        scrollContainer.value = window;
      }
      if (scrollContainer.value) {
        scrollContainer.value.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
      }
    });
    onBeforeUnmount(() => {
      if (scrollContainer.value) {
        scrollContainer.value.removeEventListener("scroll", handleScroll);
      }
    });
    const __returned__ = { props, emit, ns, t, nextZIndex, themeStyle, visible, progress, scrollContainer, elRef, containerStyle, progressStyle, getScrollInfo, get scheduled() {
      return scheduled;
    }, set scheduled(v) {
      scheduled = v;
    }, handleScroll, scrollToTop, easeInOutCubic, handleClick, ref, computed, onMounted, onBeforeUnmount, shallowRef, get useNamespace() {
      return useNamespace;
    }, get useZIndex() {
      return useZIndex;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get backTopProps() {
      return backTopProps;
    }, get backTopEmits() {
      return backTopEmits;
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
