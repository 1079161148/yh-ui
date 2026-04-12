import { createCommentVNode as _createCommentVNode, renderList as _renderList, Fragment as _Fragment, openBlock as _openBlock, createElementBlock as _createElementBlock, renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, normalizeStyle as _normalizeStyle, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "containerRef",
      class: _normalizeClass([$setup.ns.b(), $setup.ns.is("loading", $props.loading), $setup.ns.is("refreshing", $setup.isRefreshing)]),
      style: _normalizeStyle([$setup.themeStyle, {
        gap: `${$props.gap}px`,
        minHeight: $setup.minContainerHeight
      }]),
      onLoadCapture: $setup.handleImageLoad
    },
    [
      _createCommentVNode(" \u5185\u5BB9\u533A\u57DF\uFF1A\u4E0D\u7BA1\u662F\u6570\u636E\u8FD8\u662F\u9AA8\u67B6\u5C4F\uFF0C\u90FD\u4FDD\u6301 DOM \u7ED3\u6784\u4E00\u81F4\u6027 "),
      $props.loading && $props.items.length === 0 || $props.items.length > 0 ? (_openBlock(true), _createElementBlock(
        _Fragment,
        { key: 0 },
        _renderList($setup.columnsData, (col, colIdx) => {
          return _openBlock(), _createElementBlock(
            "div",
            {
              key: colIdx,
              class: _normalizeClass($setup.ns.e("column")),
              style: _normalizeStyle({
                gap: `${$props.gap}px`
              })
            },
            [
              _createCommentVNode(" \u9AA8\u67B6\u5C4F\u5206\u652F "),
              $props.loading && $props.items.length === 0 ? _renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass([$setup.ns.e("item"), $setup.ns.em("item", "skeleton")]),
                    style: {
                      height: "220px"
                    }
                  },
                  null,
                  2
                  /* CLASS */
                ),
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass([$setup.ns.e("item"), $setup.ns.em("item", "skeleton")]),
                    style: {
                      height: "160px"
                    }
                  },
                  null,
                  2
                  /* CLASS */
                ),
                _createElementVNode(
                  "div",
                  {
                    class: _normalizeClass([$setup.ns.e("item"), $setup.ns.em("item", "skeleton")]),
                    style: {
                      height: "200px"
                    }
                  },
                  null,
                  2
                  /* CLASS */
                )
              ]) : (_openBlock(), _createElementBlock(
                _Fragment,
                { key: 1 },
                [
                  _createCommentVNode(" \u5B9E\u9645\u6570\u636E\u5206\u652F "),
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList(col, (item, itemIdx) => {
                      return _openBlock(), _createElementBlock(
                        "div",
                        {
                          key: item[$props.rowKey] || `${colIdx}-${itemIdx}`,
                          class: _normalizeClass([$setup.ns.e("item"), $setup.ns.em("item", $props.animation ? "animated" : "")]),
                          style: _normalizeStyle($props.animation ? {
                            transitionDelay: `${itemIdx * $props.delay % 600}ms`
                          } : {})
                        },
                        [
                          _renderSlot(_ctx.$slots, "default", {
                            item,
                            index: itemIdx,
                            column: colIdx
                          })
                        ],
                        6
                        /* CLASS, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                64
                /* STABLE_FRAGMENT */
              ))
            ],
            6
            /* CLASS, STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )) : (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 1 },
        [
          _createCommentVNode(" \u7A7A\u72B6\u6001 "),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("empty"))
            },
            [
              _renderSlot(_ctx.$slots, "empty", {}, () => [
                _createTextVNode(
                  _toDisplayString($setup.t("table.emptyText")),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          )
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )),
      _createCommentVNode(" \u5237\u65B0\u6001\u8499\u5C42\uFF1A\u5F53\u6709\u6570\u636E\u4E14\u6B63\u5728\u52A0\u8F7D\u65F6\u663E\u793A "),
      $setup.isRefreshing ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 2,
          class: _normalizeClass($setup.ns.e("refresh-overlay"))
        },
        [
          _renderSlot(_ctx.$slots, "loading-overlay", {}, () => [
            _createElementVNode(
              "div",
              {
                class: _normalizeClass($setup.ns.e("loading-spinner"))
              },
              null,
              2
              /* CLASS */
            )
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhWaterfall"
}, {
  __name: "waterfall",
  props: {
    items: { type: Array, required: false, default: () => [] },
    cols: { type: [Number, Object], required: false, default: 2 },
    gap: { type: Number, required: false, default: 16 },
    animation: { type: Boolean, required: false, default: true },
    delay: { type: Number, required: false, default: 100 },
    rowKey: { type: String, required: false, default: "id" },
    responsive: { type: Boolean, required: false, default: true },
    loading: { type: Boolean, required: false, default: false },
    heightProperty: { type: String, required: false, default: "height" },
    imgSelector: { type: String, required: false, default: "img" },
    themeOverrides: { type: null, required: false, default: void 0 }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("waterfall");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "waterfall",
      computed(() => props.themeOverrides)
    );
    const containerRef = ref();
    const containerWidth = ref(0);
    const BREAKPOINTS = {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    };
    const currentCols = computed(() => {
      if (typeof props.cols === "number") return props.cols;
      const width = containerWidth.value;
      const { xs, sm, md, lg, xl } = props.cols || {};
      if (width >= BREAKPOINTS.xl && xl !== void 0) return xl;
      if (width >= BREAKPOINTS.lg && lg !== void 0) return lg;
      if (width >= BREAKPOINTS.md && md !== void 0) return md;
      if (width >= BREAKPOINTS.sm && sm !== void 0) return sm;
      return xs != null ? xs : 1;
    });
    const columnsData = computed(() => {
      const count = currentCols.value;
      const result = Array.from({ length: count }, () => []);
      const columnHeights = new Array(count).fill(0);
      if (!props.items) return result;
      props.items.forEach((item) => {
        const itemHeight = Number(item[props.heightProperty]);
        if (!isNaN(itemHeight) && count > 1) {
          let minHeight = columnHeights[0];
          let minIdx = 0;
          for (let i = 1; i < count; i++) {
            if (columnHeights[i] < minHeight) {
              minHeight = columnHeights[i];
              minIdx = i;
            }
          }
          result[minIdx].push(item);
          columnHeights[minIdx] += itemHeight + props.gap;
        } else {
          const idx = props.items.indexOf(item) % count;
          result[idx].push(item);
        }
      });
      return result;
    });
    let resizeObserver = null;
    const updateWidth = () => {
      if (containerRef.value) {
        containerWidth.value = containerRef.value.offsetWidth;
      }
    };
    const handleImageLoad = (e) => {
      const target = e.target;
      if (props.imgSelector && target.matches(props.imgSelector)) {
        nextTick(updateWidth);
      }
    };
    onMounted(() => {
      updateWidth();
      if (props.responsive && typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          requestAnimationFrame(updateWidth);
        });
        if (containerRef.value) {
          resizeObserver.observe(containerRef.value);
        }
      }
    });
    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    });
    const isRefreshing = computed(() => props.loading && props.items && props.items.length > 0);
    const minContainerHeight = ref("auto");
    watch(
      () => props.loading,
      (val) => {
        if (val && containerRef.value) {
          const height = containerRef.value.offsetHeight;
          if (height > 0) {
            minContainerHeight.value = `${height}px`;
          }
        } else {
          nextTick(() => {
            setTimeout(() => {
              minContainerHeight.value = "auto";
            }, 300);
          });
        }
      }
    );
    __expose({
      layout: updateWidth
    });
    const __returned__ = { props, ns, t, themeStyle, containerRef, containerWidth, BREAKPOINTS, currentCols, columnsData, get resizeObserver() {
      return resizeObserver;
    }, set resizeObserver(v) {
      resizeObserver = v;
    }, updateWidth, handleImageLoad, isRefreshing, minContainerHeight, ref, computed, onMounted, onBeforeUnmount, nextTick, watch, get useNamespace() {
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
