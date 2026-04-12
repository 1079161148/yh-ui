import { renderSlot as _renderSlot, resolveDynamicComponent as _resolveDynamicComponent, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock, createElementVNode as _createElementVNode, createVNode as _createVNode, Fragment as _Fragment, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "scrollbar",
      class: _normalizeClass($setup.ns.b()),
      style: _normalizeStyle($setup.themeStyle),
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave
    },
    [
      _createElementVNode(
        "div",
        {
          ref: "wrap",
          class: _normalizeClass([$setup.ns.e("wrap"), _ctx.native ? "" : $setup.ns.em("wrap", "hidden-native")]),
          style: _normalizeStyle($setup.wrapStyle),
          onScroll: $setup.handleScroll
        },
        [
          (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.tag), {
            ref: "resize",
            class: _normalizeClass([$setup.ns.e("view"), _ctx.viewClass]),
            style: _normalizeStyle(_ctx.viewStyle)
          }, {
            default: _withCtx(() => [
              _renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["class", "style"]))
        ],
        38
        /* CLASS, STYLE, NEED_HYDRATION */
      ),
      !_ctx.native ? (_openBlock(), _createElementBlock(
        _Fragment,
        { key: 0 },
        [
          _createVNode($setup["Thumb"], {
            ref: "horizontalThumb",
            move: $setup.moveX,
            ratio: $setup.ratioX,
            size: $setup.sizeWidth,
            always: _ctx.always
          }, null, 8, ["move", "ratio", "size", "always"]),
          _createVNode($setup["Thumb"], {
            ref: "verticalThumb",
            move: $setup.moveY,
            ratio: $setup.ratioY,
            size: $setup.sizeHeight,
            always: _ctx.always,
            vertical: ""
          }, null, 8, ["move", "ratio", "size", "always"])
        ],
        64
        /* STABLE_FRAGMENT */
      )) : _createCommentVNode("v-if", true)
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { computed, onMounted, onBeforeUnmount, provide, ref, watch, nextTick } from "vue";
import { scrollbarProps, scrollbarEmits, SCROLLBAR_INJECTION_KEY } from "./scrollbar-meta.js";
import Thumb from "./thumb.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhScrollbar"
}, {
  __name: "scrollbar",
  props: scrollbarProps,
  emits: scrollbarEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("scrollbar");
    const { themeStyle } = useComponentTheme("scrollbar", props.themeOverrides);
    const scrollbar = ref();
    const wrap = ref();
    const resize = ref();
    const sizeWidth = ref("0");
    const sizeHeight = ref("0");
    const moveX = ref(0);
    const moveY = ref(0);
    const ratioY = ref(1);
    const ratioX = ref(1);
    const horizontalThumb = ref();
    const verticalThumb = ref();
    const wrapStyle = computed(() => {
      const style = {};
      if (props.height)
        style.height = typeof props.height === "number" ? `${props.height}px` : props.height;
      if (props.maxHeight)
        style.maxHeight = typeof props.maxHeight === "number" ? `${props.maxHeight}px` : props.maxHeight;
      return style;
    });
    const handleScroll = () => {
      var _a, _b;
      if (wrap.value) {
        const offsetHeight = wrap.value.offsetHeight - 4;
        const offsetWidth = wrap.value.offsetWidth - 4;
        moveY.value = wrap.value.scrollTop * 100 / offsetHeight * ratioY.value;
        moveX.value = wrap.value.scrollLeft * 100 / offsetWidth * ratioX.value;
        emit("scroll", {
          scrollTop: wrap.value.scrollTop,
          scrollLeft: wrap.value.scrollLeft
        });
        if (!props.native) {
          (_a = horizontalThumb.value) == null ? void 0 : _a.handleScrollbarAppearance();
          (_b = verticalThumb.value) == null ? void 0 : _b.handleScrollbarAppearance();
        }
      }
    };
    const handleMouseEnter = () => {
      var _a, _b;
      if (!props.native) {
        (_a = horizontalThumb.value) == null ? void 0 : _a.handleScrollbarAppearance();
        (_b = verticalThumb.value) == null ? void 0 : _b.handleScrollbarAppearance();
      }
    };
    const handleMouseLeave = () => {
    };
    const update = () => {
      if (!wrap.value) return;
      const offsetHeight = wrap.value.offsetHeight;
      const offsetWidth = wrap.value.offsetWidth;
      if (offsetHeight === 0 || offsetWidth === 0) return;
      const originalHeight = offsetHeight ** 2 / wrap.value.scrollHeight;
      const originalWidth = offsetWidth ** 2 / wrap.value.scrollWidth;
      const height = originalHeight < offsetHeight ? Math.max(originalHeight, props.minSize) : 0;
      const width = originalWidth < offsetWidth ? Math.max(originalWidth, props.minSize) : 0;
      ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
      ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
      sizeHeight.value = height > 0 ? `${height}px` : "";
      sizeWidth.value = width > 0 ? `${width}px` : "";
    };
    provide(SCROLLBAR_INJECTION_KEY, {
      wrapElement: wrap
    });
    let resizeObserver = null;
    onMounted(() => {
      if (!props.native) {
        nextTick(update);
      }
      if (!props.noresize && resize.value) {
        resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(resize.value);
      }
    });
    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
    });
    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          resizeObserver == null ? void 0 : resizeObserver.disconnect();
        } else if (resize.value) {
          resizeObserver = new ResizeObserver(update);
          resizeObserver.observe(resize.value);
        }
      }
    );
    __expose({
      wrap,
      update,
      scrollTo(options, y) {
        var _a, _b;
        if (typeof options === "object") {
          (_a = wrap.value) == null ? void 0 : _a.scrollTo(options);
        } else if (typeof options === "number" && typeof y === "number") {
          (_b = wrap.value) == null ? void 0 : _b.scrollTo(options, y);
        }
      },
      setScrollTop(value) {
        if (wrap.value) wrap.value.scrollTop = value;
      },
      setScrollLeft(value) {
        if (wrap.value) wrap.value.scrollLeft = value;
      }
    });
    const __returned__ = { props, emit, ns, themeStyle, scrollbar, wrap, resize, sizeWidth, sizeHeight, moveX, moveY, ratioY, ratioX, horizontalThumb, verticalThumb, wrapStyle, handleScroll, handleMouseEnter, handleMouseLeave, update, get resizeObserver() {
      return resizeObserver;
    }, set resizeObserver(v) {
      resizeObserver = v;
    }, computed, onMounted, onBeforeUnmount, provide, ref, watch, nextTick, get scrollbarProps() {
      return scrollbarProps;
    }, get scrollbarEmits() {
      return scrollbarEmits;
    }, get SCROLLBAR_INJECTION_KEY() {
      return SCROLLBAR_INJECTION_KEY;
    }, Thumb, get useNamespace() {
      return useNamespace;
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
