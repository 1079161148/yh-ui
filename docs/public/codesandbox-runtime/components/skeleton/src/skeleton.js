import { renderSlot as _renderSlot, createCommentVNode as _createCommentVNode, createVNode as _createVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createBlock as _createBlock, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return $setup.uiLoading ? (_openBlock(), _createElementBlock(
    "div",
    {
      key: 0,
      ref: "skeletonRef",
      class: _normalizeClass($setup.containerClass),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _renderSlot(_ctx.$slots, "template", {}, () => [
        _createCommentVNode(" \u9ED8\u8BA4\u5E03\u5C40\uFF1AAvatar + Title + Rows "),
        _ctx.avatar ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            class: _normalizeClass($setup.ns.e("header"))
          },
          [
            _createVNode($setup["YhSkeletonItem"], {
              variant: "circle",
              width: 48,
              height: 48,
              animated: $setup.isIntersecting && _ctx.animated
            }, null, 8, ["animated"])
          ],
          2
          /* CLASS */
        )) : _createCommentVNode("v-if", true),
        _createElementVNode(
          "div",
          {
            class: _normalizeClass($setup.ns.e("content"))
          },
          [
            _ctx.title ? (_openBlock(), _createBlock($setup["YhSkeletonItem"], {
              key: 0,
              variant: "h3",
              style: { "width": "40%", "margin-bottom": "16px" },
              animated: $setup.isIntersecting && _ctx.animated
            }, null, 8, ["animated"])) : _createCommentVNode("v-if", true),
            (_openBlock(true), _createElementBlock(
              _Fragment,
              null,
              _renderList(_ctx.rows, (i) => {
                return _openBlock(), _createBlock($setup["YhSkeletonItem"], {
                  key: i,
                  variant: "text",
                  style: _normalizeStyle({
                    width: i === _ctx.rows && _ctx.rows > 1 ? "60%" : "100%",
                    marginBottom: i === _ctx.rows ? "0" : "12px"
                  }),
                  animated: $setup.isIntersecting && _ctx.animated
                }, null, 8, ["style", "animated"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ],
          2
          /* CLASS */
        )
      ])
    ],
    6
    /* CLASS, STYLE */
  )) : _renderSlot(_ctx.$slots, "default", { key: 1 });
}
import { ref, watch, onMounted, computed } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { skeletonProps } from "./skeleton-meta.js";
import YhSkeletonItem from "./skeleton-item.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhSkeleton"
}, {
  __name: "skeleton",
  props: skeletonProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("skeleton");
    const { themeStyle } = useComponentTheme(
      "skeleton",
      computed(() => props.themeOverrides)
    );
    const uiLoading = ref(props.loading && props.throttle <= 0);
    let timeout = null;
    watch(
      () => props.loading,
      (val) => {
        if (timeout) clearTimeout(timeout);
        if (val) {
          if (props.throttle <= 0) {
            uiLoading.value = true;
          } else {
            timeout = setTimeout(() => {
              uiLoading.value = true;
            }, props.throttle);
          }
        } else {
          uiLoading.value = false;
        }
      },
      { immediate: true }
    );
    const containerClass = computed(() => [ns.b(), ns.is("animated", props.animated)]);
    const isIntersecting = ref(false);
    const skeletonRef = ref(null);
    onMounted(() => {
      if (props.lazy && skeletonRef.value) {
        const observer = new IntersectionObserver(
          (entries) => {
            isIntersecting.value = entries[0].isIntersecting;
          },
          { threshold: 0.1 }
        );
        observer.observe(skeletonRef.value);
      } else {
        isIntersecting.value = true;
      }
    });
    const __returned__ = { props, ns, themeStyle, uiLoading, get timeout() {
      return timeout;
    }, set timeout(v) {
      timeout = v;
    }, containerClass, isIntersecting, skeletonRef, ref, watch, onMounted, computed, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get skeletonProps() {
      return skeletonProps;
    }, YhSkeletonItem };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default = __sfc__;
export {
  stdin_default as default
};
