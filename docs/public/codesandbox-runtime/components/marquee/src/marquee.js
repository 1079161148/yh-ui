import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, normalizeStyle as _normalizeStyle } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "containerRef",
      class: _normalizeClass([$setup.ns.b(), $setup.ns.m(_ctx.direction), {
        [$setup.ns.m("pause-on-hover")]: _ctx.pauseOnHover,
        [$setup.ns.m("pause-on-click")]: _ctx.pauseOnClick,
        [$setup.ns.m("gradient")]: _ctx.gradient
      }]),
      style: _normalizeStyle([$setup.themeStyle, $setup.marqueeStyle, $setup.overlayStyle])
    },
    [
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("content")),
          onAnimationiteration: $setup.handleAnimationIteration
        },
        [
          _createElementVNode(
            "div",
            {
              ref: "contentRef",
              class: _normalizeClass($setup.ns.e("item"))
            },
            [
              _renderSlot(_ctx.$slots, "default")
            ],
            2
            /* CLASS */
          ),
          _createCommentVNode(" \u514B\u9686\u5185\u5BB9\u4EE5\u5B9E\u73B0\u65E0\u7F1D\u6EDA\u52A8 "),
          (_openBlock(true), _createElementBlock(
            _Fragment,
            null,
            _renderList($setup.cloneCount, (i) => {
              return _openBlock(), _createElementBlock(
                "div",
                {
                  key: i,
                  class: _normalizeClass($setup.ns.e("item")),
                  "aria-hidden": "true"
                },
                [
                  _renderSlot(_ctx.$slots, "default")
                ],
                2
                /* CLASS */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        34
        /* CLASS, NEED_HYDRATION */
      ),
      _createCommentVNode(" \u6E10\u53D8\u8499\u5C42 "),
      _ctx.gradient ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("overlay"))
        },
        null,
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { marqueeProps, marqueeEmits } from "./marquee-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhMarquee"
}, {
  __name: "marquee",
  props: marqueeProps,
  emits: marqueeEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("marquee");
    const { themeStyle } = useComponentTheme("marquee", computed(() => props.themeOverrides));
    const containerRef = ref(null);
    const contentRef = ref(null);
    const cloneCount = ref(1);
    const isReady = ref(false);
    const isHidden = ref(false);
    const isLoopPaused = ref(false);
    const computedDuration = computed(() => {
      if (props.speed > 0 && contentRef.value) {
        const size = props.direction === "horizontal" ? contentRef.value.scrollWidth : contentRef.value.scrollHeight;
        return size / props.speed;
      }
      return props.duration;
    });
    const marqueeStyle = computed(() => {
      const gapValue = typeof props.gap === "number" ? `${props.gap}px` : props.gap;
      const durationValue = `${computedDuration.value}s`;
      const iterationCount = props.loop > 0 ? props.loop : "infinite";
      return {
        "--yh-marquee-gap": gapValue,
        "--yh-marquee-duration": durationValue,
        "--yh-marquee-iteration-count": iterationCount,
        "--yh-marquee-direction": props.reverse ? "reverse" : "normal",
        "--yh-marquee-play-state": props.play && !isHidden.value && !isLoopPaused.value ? "running" : "paused",
        "--yh-marquee-clone-count": cloneCount.value,
        "animation-delay": `${props.delay}s`
      };
    });
    const overlayStyle = computed(() => {
      const color = props.gradientColor;
      const width = typeof props.gradientWidth === "number" ? `${props.gradientWidth}px` : props.gradientWidth;
      return {
        "--yh-marquee-gradient-color": color,
        "--yh-marquee-gradient-width": width
      };
    });
    const calculateClones = async () => {
      if (!containerRef.value || !contentRef.value) return;
      await nextTick();
      const containerSize = props.direction === "horizontal" ? containerRef.value.offsetWidth : containerRef.value.offsetHeight;
      const contentSize = props.direction === "horizontal" ? contentRef.value.scrollWidth : contentRef.value.scrollHeight;
      if (contentSize === 0) return;
      if (props.autoFill) {
        const needed = Math.ceil(containerSize / contentSize);
        cloneCount.value = Math.max(1, needed);
      } else {
        cloneCount.value = 1;
      }
    };
    const handleAnimationIteration = () => {
      emit("cycleComplete");
      if (props.loopDelay > 0) {
        isLoopPaused.value = true;
        setTimeout(() => {
          isLoopPaused.value = false;
        }, props.loopDelay * 1e3);
      }
    };
    watch([() => props.autoFill, () => props.direction, () => props.gap], calculateClones);
    onMounted(() => {
      calculateClones();
      isReady.value = true;
      if (props.pauseOnHidden && typeof IntersectionObserver !== "undefined" && containerRef.value) {
        const observer = new IntersectionObserver((entries) => {
          isHidden.value = !entries[0].isIntersecting;
        }, { threshold: 0 });
        observer.observe(containerRef.value);
        onUnmounted(() => observer.disconnect());
      }
    });
    __expose({
      /** 手动重新计算克隆数量（通常在动态改变内容高度/宽度时调用） */
      calculateClones,
      /** 容器 DOM 引用 */
      containerRef,
      /** 内容 DOM 引用 */
      contentRef
    });
    const __returned__ = { props, emit, ns, themeStyle, containerRef, contentRef, cloneCount, isReady, isHidden, isLoopPaused, computedDuration, marqueeStyle, overlayStyle, calculateClones, handleAnimationIteration, ref, computed, onMounted, onUnmounted, watch, nextTick, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get marqueeProps() {
      return marqueeProps;
    }, get marqueeEmits() {
      return marqueeEmits;
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
