import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, createVNode as _createVNode, toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock, Fragment as _Fragment, normalizeStyle as _normalizeStyle } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "rootRef",
      class: _normalizeClass([$setup.ns.b(), $setup.ns.is(_ctx.direction)]),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _createCommentVNode(" \u5185\u5BB9\u533A\u57DF "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("content"))
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u72B6\u6001\u5360\u4F4D\u533A\u57DF "),
      _createElementVNode(
        "div",
        {
          ref: "placeholderRef",
          class: _normalizeClass($setup.ns.e("placeholder"))
        },
        [
          _createCommentVNode(" \u52A0\u8F7D\u4E2D "),
          _ctx.loading ? (_openBlock(), _createElementBlock(
            "div",
            {
              key: 0,
              class: _normalizeClass($setup.ns.e("loading"))
            },
            [
              _renderSlot(_ctx.$slots, "loading", {}, () => [
                _createVNode($setup["YhSpin"], { size: "small" }),
                _createElementVNode(
                  "span",
                  {
                    class: _normalizeClass($setup.ns.e("text"))
                  },
                  _toDisplayString(_ctx.loadingText || $setup.t("infinitescroll.loading")),
                  3
                  /* TEXT, CLASS */
                )
              ])
            ],
            2
            /* CLASS */
          )) : _ctx.finished ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _createCommentVNode(" \u52A0\u8F7D\u5B8C\u6210 "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("finished"))
                },
                [
                  _renderSlot(_ctx.$slots, "finished", {}, () => [
                    _createElementVNode(
                      "span",
                      {
                        class: _normalizeClass($setup.ns.e("text"))
                      },
                      _toDisplayString(_ctx.finishedText || $setup.t("infinitescroll.finished")),
                      3
                      /* TEXT, CLASS */
                    )
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )) : _ctx.error ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 2 },
            [
              _createCommentVNode(" \u52A0\u8F7D\u5931\u8D25 "),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("error")),
                  onClick: $setup.handleRetry
                },
                [
                  _renderSlot(_ctx.$slots, "error", {}, () => [
                    _createElementVNode(
                      "span",
                      {
                        class: _normalizeClass($setup.ns.e("text"))
                      },
                      _toDisplayString(_ctx.errorText || $setup.t("infinitescroll.error")),
                      3
                      /* TEXT, CLASS */
                    )
                  ])
                ],
                2
                /* CLASS */
              )
            ],
            2112
            /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
          )) : _createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
import { ref, computed, watch, onMounted, onBeforeUnmount, shallowRef, nextTick } from "vue";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { YhSpin } from "../../spin/index.js";
import {
  infiniteScrollProps,
  infiniteScrollEmits
} from "./infinite-scroll-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhInfiniteScroll"
}, {
  __name: "infinite-scroll",
  props: infiniteScrollProps,
  emits: infiniteScrollEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("infinite-scroll");
    const { t } = useLocale();
    const { themeStyle } = useComponentTheme(
      "infinite-scroll",
      computed(() => props.themeOverrides)
    );
    const rootRef = ref();
    const placeholderRef = ref();
    const scrollContainer = shallowRef();
    const isLoading = computed(() => props.loading);
    let observer = null;
    const checkLoad = () => {
      if (props.disabled || isLoading.value || props.finished || props.error) {
        return;
      }
      if (props.useObserver && observer) {
        return;
      }
      if (!scrollContainer.value || !placeholderRef.value) return;
      const container = scrollContainer.value;
      let shouldLoad = false;
      if (props.direction === "vertical") {
        if (container instanceof Window) {
          const { scrollHeight, clientHeight } = document.documentElement;
          const scrollTop = window.scrollY;
          shouldLoad = scrollHeight - scrollTop - clientHeight <= props.threshold;
        } else {
          shouldLoad = container.scrollHeight - container.scrollTop - container.clientHeight <= props.threshold;
        }
      } else {
        if (container instanceof Window) {
          const { scrollWidth, clientWidth } = document.documentElement;
          const scrollLeft = window.scrollX;
          shouldLoad = scrollWidth - scrollLeft - clientWidth <= props.threshold;
        } else {
          shouldLoad = container.scrollWidth - container.scrollLeft - container.clientWidth <= props.threshold;
        }
      }
      if (shouldLoad) {
        emit("load");
      }
    };
    let rafId = null;
    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkLoad();
      });
    };
    const handleRetry = () => {
      emit("update:error", false);
      emit("load");
    };
    const setupObserver = () => {
      if (!props.useObserver || typeof IntersectionObserver === "undefined") {
        return;
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      const root = props.target ? document.querySelector(props.target) : null;
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !props.disabled && !isLoading.value && !props.finished && !props.error) {
            emit("load");
          }
        },
        {
          root,
          rootMargin: props.rootMargin || `${props.threshold}px`
        }
      );
      if (placeholderRef.value) {
        observer.observe(placeholderRef.value);
      }
    };
    const setupScrollListener = () => {
      if (props.useObserver) return;
      if (props.target) {
        const el = document.querySelector(props.target);
        scrollContainer.value = el || window;
      } else {
        scrollContainer.value = window;
      }
      if (scrollContainer.value) {
        scrollContainer.value.addEventListener("scroll", handleScroll, { passive: true });
      }
    };
    onMounted(() => {
      nextTick(() => {
        if (props.useObserver) {
          setupObserver();
        } else {
          setupScrollListener();
        }
        if (props.immediateCheck) {
          checkLoad();
        }
      });
    });
    onBeforeUnmount(() => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (scrollContainer.value && !props.useObserver) {
        scrollContainer.value.removeEventListener("scroll", handleScroll);
      }
    });
    watch(
      () => props.loading,
      (val, oldVal) => {
        if (oldVal && !val && props.immediateCheck) {
          nextTick(() => {
            if (props.useObserver && observer && placeholderRef.value) {
              observer.unobserve(placeholderRef.value);
              observer.observe(placeholderRef.value);
            } else {
              checkLoad();
            }
          });
        }
      }
    );
    watch(
      () => props.useObserver,
      () => {
        if (props.useObserver) {
          if (scrollContainer.value) {
            scrollContainer.value.removeEventListener("scroll", handleScroll);
          }
          setupObserver();
        } else {
          if (observer) {
            observer.disconnect();
            observer = null;
          }
          setupScrollListener();
        }
      }
    );
    __expose({
      /** 手动检查是否需要加载 */
      check: checkLoad,
      /** 重试加载 */
      retry: handleRetry
    });
    const __returned__ = { props, emit, ns, t, themeStyle, rootRef, placeholderRef, scrollContainer, isLoading, get observer() {
      return observer;
    }, set observer(v) {
      observer = v;
    }, checkLoad, get rafId() {
      return rafId;
    }, set rafId(v) {
      rafId = v;
    }, handleScroll, handleRetry, setupObserver, setupScrollListener, ref, computed, watch, onMounted, onBeforeUnmount, shallowRef, nextTick, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get YhSpin() {
      return YhSpin;
    }, get infiniteScrollProps() {
      return infiniteScrollProps;
    }, get infiniteScrollEmits() {
      return infiniteScrollEmits;
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
