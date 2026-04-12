import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["onClick", "onMouseenter"];
const _hoisted_2 = ["aria-label"];
const _hoisted_3 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "containerRef",
      class: _normalizeClass([$setup.ns.b(), $setup.ns.m($setup.props.direction), $setup.ns.m($setup.props.effect), {
        "has-arrow": $setup.props.showArrow !== "never" && $setup.itemCount > 1
      }, $setup.dotsAtClass]),
      style: _normalizeStyle($setup.themeStyle),
      onMouseenter: _cache[0] || (_cache[0] = ($event) => $setup.isHovering = true),
      onMouseleave: _cache[1] || (_cache[1] = ($event) => $setup.isHovering = false),
      onWheel: $setup.handleWheel
    },
    [
      _createCommentVNode(" \u8F6E\u64AD\u4E3B\u8F68\u9053 "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass([$setup.ns.e("slides"), $setup.ns.is("vertical", $setup.props.direction === "vertical")]),
          style: _normalizeStyle($setup.trackStyle)
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        6
        /* CLASS, STYLE */
      ),
      _createCommentVNode(" \u6307\u793A\u70B9 "),
      $setup.props.showDots && $setup.itemCount > 0 ? _renderSlot(_ctx.$slots, "dots", {
        key: 0,
        total: $setup.itemCount,
        currentIndex: $setup.internalIndex,
        to: $setup.jump
      }, () => [
        _createElementVNode(
          "div",
          {
            class: _normalizeClass([$setup.ns.e("dots"), $setup.ns.em("dots", $setup.effectiveDotPlacement), $setup.ns.em("dots", $setup.props.dotType)])
          },
          [
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList($setup.itemCount, (i) => {
                return _openBlock(), _createElementBlock("div", {
                  key: i,
                  class: _normalizeClass([$setup.ns.e("dots-item"), $setup.ns.is("active", $setup.internalIndex === i - 1)]),
                  onClick: ($event) => $setup.handleDotTrigger(i - 1, "click"),
                  onMouseenter: ($event) => $setup.handleDotTrigger(i - 1, "hover")
                }, null, 42, _hoisted_1);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )
      ]) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u5DE6\u53F3\u7BAD\u5934 "),
      $setup.props.showArrow !== "never" && $setup.itemCount > 1 ? _renderSlot(_ctx.$slots, "arrow", {
        key: 1,
        total: $setup.itemCount,
        currentIndex: $setup.internalIndex,
        to: $setup.jump,
        prev: $setup.prev,
        next: $setup.next
      }, () => [
        _createElementVNode("div", {
          class: _normalizeClass([$setup.ns.e("arrow"), $setup.ns.em("arrow", "prev"), $setup.ns.is("visible", $setup.props.showArrow === "always" || $setup.props.showArrow === "hover" && $setup.isHovering), $setup.ns.is("vertical", $setup.props.direction === "vertical")]),
          "aria-label": $setup.t("carousel.prev"),
          onClick: $setup.prev
        }, [
          _renderSlot(_ctx.$slots, "prev-arrow", {}, () => [
            (_openBlock(), _createElementBlock(
              "svg",
              {
                viewBox: "0 0 1024 1024",
                width: 20,
                height: 20,
                fill: "currentColor",
                class: _normalizeClass($setup.ns.e("arrow-icon"))
              },
              [..._cache[2] || (_cache[2] = [
                _createElementVNode(
                  "path",
                  { d: "M603.3 172.7c11-10.4 28.5-9.9 38.9 1.1s9.9 28.5-1.1 38.9L322.6 512l318.5 299.3c11 10.4 11.5 27.9 1.1 38.9s-27.9 11.5-38.9 1.1L256 512l347.3-339.3z" },
                  null,
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            ))
          ])
        ], 10, _hoisted_2),
        _createElementVNode("div", {
          class: _normalizeClass([$setup.ns.e("arrow"), $setup.ns.em("arrow", "next"), $setup.ns.is("visible", $setup.props.showArrow === "always" || $setup.props.showArrow === "hover" && $setup.isHovering), $setup.ns.is("vertical", $setup.props.direction === "vertical")]),
          "aria-label": $setup.t("carousel.next"),
          onClick: $setup.next
        }, [
          _renderSlot(_ctx.$slots, "next-arrow", {}, () => [
            (_openBlock(), _createElementBlock(
              "svg",
              {
                viewBox: "0 0 1024 1024",
                width: 20,
                height: 20,
                fill: "currentColor",
                class: _normalizeClass($setup.ns.e("arrow-icon"))
              },
              [..._cache[3] || (_cache[3] = [
                _createElementVNode(
                  "path",
                  { d: "M420.7 851.3c-11 10.4-28.5 9.9-38.9-1.1s-9.9-28.5 1.1-38.9L701.4 512 382.9 212.7c-11-10.4-11.5-27.9-1.1-38.9s27.9-11.5 38.9-1.1L768 512l-347.3 339.3z" },
                  null,
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            ))
          ])
        ], 10, _hoisted_3)
      ]) : _createCommentVNode("v-if", true)
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import {
  ref,
  computed,
  onMounted,
  onUnmounted,
  watch,
  provide,
  useSlots,
  shallowRef,
  markRaw
} from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { carouselProps, carouselEmits, CAROUSEL_INJECTION_KEY } from "./carousel-meta.js";
const renderBuffer = 2;
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhCarousel"
}, {
  __name: "carousel",
  props: carouselProps,
  emits: carouselEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const _slots = useSlots();
    const ns = useNamespace("carousel");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "carousel",
      computed(() => props.themeOverrides)
    );
    const internalIndex = shallowRef(props.defaultIndex);
    const prevIndex = shallowRef(-1);
    const isHovering = shallowRef(false);
    let itemIdCounter = 0;
    const _getStableId = () => `yh-carousel-item-${itemIdCounter++}`;
    const itemMap = /* @__PURE__ */ new Map();
    const itemIds = ref([]);
    const itemCount = computed(() => itemIds.value.length);
    let rafId = null;
    const timer = shallowRef(null);
    const containerRef = shallowRef(null);
    const visibleRange = computed(() => {
      const total = itemCount.value;
      if (total === 0) return { start: 0, end: 0 };
      const cur = internalIndex.value;
      const start = Math.max(0, cur - renderBuffer);
      const end = Math.min(total, cur + renderBuffer + 1);
      return { start, end };
    });
    const shouldRenderItem = (index) => {
      const { start, end } = visibleRange.value;
      return index >= start && index < end;
    };
    const currentIndex = computed({
      get: () => internalIndex.value,
      set: (val) => {
        const total = itemCount.value;
        if (total === 0) return;
        let next2 = val;
        if (val < 0) {
          next2 = props.loop ? total - 1 : 0;
        } else if (val >= total) {
          next2 = props.loop ? 0 : total - 1;
        }
        if (next2 !== internalIndex.value) {
          const prev2 = internalIndex.value;
          prevIndex.value = prev2;
          internalIndex.value = next2;
          emit("update:currentIndex", next2);
          emit("change", next2, prev2);
        }
      }
    });
    const trackStyle = computed(() => {
      if (props.effect !== "slide") {
        return {
          position: "relative",
          width: "100%",
          height: "100%",
          perspective: "1200px",
          transformStyle: "preserve-3d"
        };
      }
      const isVertical = props.direction === "vertical";
      const translateP = internalIndex.value * 100;
      const space = internalIndex.value * props.spaceBetween;
      const transform = isVertical ? `translate3d(0, calc(-${translateP}% - ${space}px), 0)` : `translate3d(calc(-${translateP}% - ${space}px), 0, 0)`;
      return {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        willChange: "transform",
        // GPU 提示
        transition: `transform ${props.duration}ms var(--yh-carousel-transition-timing)`,
        transform,
        flexDirection: isVertical ? "column" : "row",
        gap: `${props.spaceBetween}px`
      };
    });
    const startAutoplay = () => {
      if (!props.autoplay || props.interval <= 0) return;
      stopAutoplay();
      const isTest = typeof globalThis !== "undefined" && "vi" in globalThis;
      if (isTest) {
        timer.value = setInterval(() => {
          if (props.pauseOnHover && isHovering.value) return;
          internalIndex.value++;
          const total = itemCount.value;
          if (internalIndex.value >= total) {
            internalIndex.value = props.loop ? 0 : total - 1;
          }
        }, props.interval);
      } else {
        let lastTime = performance.now();
        const tick = (currentTime) => {
          if (timer.value === null) return;
          if (currentTime - lastTime >= props.interval) {
            if (!(props.pauseOnHover && isHovering.value)) {
              internalIndex.value++;
              const total = itemCount.value;
              if (internalIndex.value >= total) {
                internalIndex.value = props.loop ? 0 : total - 1;
              }
            }
            lastTime = currentTime;
          }
          rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      }
    };
    const stopAutoplay = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      timer.value = null;
    };
    const prev = () => currentIndex.value--;
    const next = () => currentIndex.value++;
    const jump = (index) => {
      currentIndex.value = index;
    };
    let keydownRaf = null;
    const handleKeyDown = (e) => {
      if (!props.keyboard) return;
      if (keydownRaf !== null) return;
      keydownRaf = requestAnimationFrame(() => {
        keydownRaf = null;
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      });
    };
    let wheelRaf = null;
    const handleWheel = (e) => {
      if (!props.mousewheel) return;
      e.preventDefault();
      if (wheelRaf !== null) return;
      wheelRaf = requestAnimationFrame(() => {
        wheelRaf = null;
        if (e.deltaY > 0) next();
        else if (e.deltaY < 0) prev();
      });
    };
    const handleDotTrigger = (index, type) => {
      if (props.dotTrigger === type) jump(index);
    };
    const getCurrentIndex = () => internalIndex.value;
    const effectiveDotPlacement = computed(() => props.dotPlacement);
    const dotsAtClass = computed(() => {
      const p = props.dotPlacement;
      const side = p.replace(/^inner-/, "");
      return side === "left" || side === "right" || side === "top" || side === "bottom" ? `dots-at-${side}` : "";
    });
    __expose({
      prev,
      next,
      jump,
      to: jump,
      getCurrentIndex,
      currentIndex: internalIndex
    });
    provide(
      CAROUSEL_INJECTION_KEY,
      markRaw({
        props,
        itemCount: shallowRef(itemCount.value),
        // 保持响应但浅层
        currentIndex: internalIndex,
        prevIndex,
        direction: computed(() => props.direction),
        effect: computed(() => props.effect),
        shouldRenderItem,
        // 新增：判断是否渲染
        addItem: (id) => {
          if (!itemIds.value.includes(id)) {
            itemIds.value.push(id);
            itemMap.set(id, { index: itemIds.value.length - 1 });
          }
        },
        removeItem: (id) => {
          const idx = itemIds.value.indexOf(id);
          if (idx !== -1) {
            itemIds.value.splice(idx, 1);
            itemMap.delete(id);
            itemIds.value.forEach((itemId, i) => {
              const item = itemMap.get(itemId);
              if (item) item.index = i;
            });
          }
        },
        getItemIndex: (id) => {
          const item = itemMap.get(id);
          return item ? item.index : -1;
        },
        jump
      })
    );
    onMounted(() => {
      startAutoplay();
      if (props.keyboard) {
        window.addEventListener("keydown", handleKeyDown);
      }
    });
    onUnmounted(() => {
      stopAutoplay();
      if (keydownRaf !== null) cancelAnimationFrame(keydownRaf);
      if (wheelRaf !== null) cancelAnimationFrame(wheelRaf);
      window.removeEventListener("keydown", handleKeyDown);
    });
    watch(
      () => props.autoplay,
      (val) => {
        if (val) {
          startAutoplay();
        } else {
          stopAutoplay();
        }
      }
    );
    const __returned__ = { props, emit, _slots, ns, t, themeStyle, internalIndex, prevIndex, isHovering, get itemIdCounter() {
      return itemIdCounter;
    }, set itemIdCounter(v) {
      itemIdCounter = v;
    }, _getStableId, itemMap, itemIds, itemCount, get rafId() {
      return rafId;
    }, set rafId(v) {
      rafId = v;
    }, timer, containerRef, renderBuffer, visibleRange, shouldRenderItem, currentIndex, trackStyle, startAutoplay, stopAutoplay, prev, next, jump, get keydownRaf() {
      return keydownRaf;
    }, set keydownRaf(v) {
      keydownRaf = v;
    }, handleKeyDown, get wheelRaf() {
      return wheelRaf;
    }, set wheelRaf(v) {
      wheelRaf = v;
    }, handleWheel, handleDotTrigger, getCurrentIndex, effectiveDotPlacement, dotsAtClass, ref, computed, onMounted, onUnmounted, watch, provide, useSlots, shallowRef, markRaw, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get carouselProps() {
      return carouselProps;
    }, get carouselEmits() {
      return carouselEmits;
    }, get CAROUSEL_INJECTION_KEY() {
      return CAROUSEL_INJECTION_KEY;
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
