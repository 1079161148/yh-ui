import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock, createBlock as _createBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, createElementBlock as _createElementBlock, normalizeStyle as _normalizeStyle } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d;
  return _openBlock(), _createElementBlock(
    "span",
    {
      class: _normalizeClass($setup.ns.b()),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _createCommentVNode(" \u6587\u5B57/\u94FE\u63A5\u5185\u5BB9 "),
      _createElementVNode(
        "span",
        {
          ref: "linkRef",
          role: "link",
          class: _normalizeClass($setup.linkClass),
          onClick: $setup.handleLinkClick
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u5206\u9694\u7B26 "),
      _createElementVNode(
        "span",
        {
          class: _normalizeClass($setup.ns.e("separator")),
          role: "presentation"
        },
        [
          ((_b = (_a = $setup.breadcrumbContext) == null ? void 0 : _a.separatorIcon) == null ? void 0 : _b.value) ? (_openBlock(), _createBlock(_resolveDynamicComponent($setup.breadcrumbContext.separatorIcon.value), { key: 0 })) : (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _createTextVNode(
                _toDisplayString((_d = (_c = $setup.breadcrumbContext) == null ? void 0 : _c.separator) == null ? void 0 : _d.value),
                1
                /* TEXT */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          ))
        ],
        2
        /* CLASS */
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
import { inject, ref, computed, getCurrentInstance } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { breadcrumbItemProps } from "./breadcrumb-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhBreadcrumbItem"
}, {
  __name: "breadcrumb-item",
  props: breadcrumbItemProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("breadcrumb-item");
    const breadcrumbContext = inject(
      "breadcrumbProps"
    );
    const { themeStyle } = useComponentTheme(
      "breadcrumb-item",
      computed(() => {
        var _a;
        return props.themeOverrides || ((_a = breadcrumbContext == null ? void 0 : breadcrumbContext.themeOverrides) == null ? void 0 : _a.value);
      })
    );
    const instance = getCurrentInstance();
    const router = computed(() => {
      var _a;
      const globalRouter = (_a = instance == null ? void 0 : instance.appContext.config.globalProperties) == null ? void 0 : _a.$router;
      return globalRouter != null ? globalRouter : null;
    });
    const linkRef = ref();
    const linkClass = computed(() => [ns.e("link"), ns.is("link", !!props.to)]);
    const handleLinkClick = (e) => {
      const activeRouter = router.value;
      if (!props.to || !activeRouter) return;
      e.preventDefault();
      if (props.replace) {
        activeRouter.replace(props.to);
      } else {
        activeRouter.push(props.to);
      }
    };
    const __returned__ = { props, ns, breadcrumbContext, themeStyle, instance, router, linkRef, linkClass, handleLinkClick, inject, ref, computed, getCurrentInstance, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get breadcrumbItemProps() {
      return breadcrumbItemProps;
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
