// public/codesandbox-runtime/components/avatar/src/avatar.js
import { createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, Fragment as _Fragment, renderSlot as _renderSlot, createElementVNode as _createElementVNode } from "vue";
import { computed as computed2, ref as ref2 } from "vue";

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

// public/codesandbox-runtime/components/avatar/src/avatar.js
var __defProp2 = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var _hoisted_1 = ["aria-label"];
var _hoisted_2 = ["src", "srcset", "alt", "crossorigin"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock("span", {
    class: _normalizeClass($setup.avatarClasses),
    style: _normalizeStyle($setup.avatarStyle),
    role: "img",
    "aria-label": $props.alt
  }, [
    _createCommentVNode(" \u56FE\u7247\u6A21\u5F0F "),
    $setup.showImg ? (_openBlock(), _createElementBlock("img", {
      key: 0,
      src: $props.src,
      srcset: $props.srcSet,
      alt: $props.alt,
      style: _normalizeStyle({ objectFit: $props.fit }),
      class: _normalizeClass($setup.ns.e("img")),
      crossorigin: $setup.props.crossorigin,
      onError: $setup.handleError
    }, null, 46, _hoisted_2)) : $props.icon && !_ctx.$slots.default ? (_openBlock(), _createElementBlock(
      _Fragment,
      { key: 1 },
      [
        _createCommentVNode(" \u56FE\u6807\u6A21\u5F0F "),
        (_openBlock(), _createBlock(_resolveDynamicComponent($props.icon), {
          class: _normalizeClass($setup.ns.e("icon"))
        }, null, 8, ["class"]))
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    )) : (_openBlock(), _createElementBlock(
      _Fragment,
      { key: 2 },
      [
        _createCommentVNode(" \u9ED8\u8BA4\u63D2\u69FD\uFF08\u6587\u5B57/\u81EA\u5B9A\u4E49\uFF09 "),
        _renderSlot(_ctx.$slots, "default", {}, () => [
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("text"))
            },
            "?",
            2
            /* CLASS */
          )
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    ))
  ], 14, _hoisted_1);
}
var __sfc__ = /* @__PURE__ */ Object.assign({ name: "YhAvatar" }, {
  __name: "avatar",
  props: {
    shape: { type: String, required: false, default: "circle" },
    size: { type: [String, Number], required: false, default: "default" },
    src: { type: String, required: false },
    srcSet: { type: String, required: false },
    alt: { type: String, required: false },
    fit: { type: String, required: false, default: "cover" },
    icon: { type: null, required: false },
    color: { type: String, required: false },
    backgroundColor: { type: String, required: false },
    style: { type: Object, required: false },
    crossorigin: { type: String, required: false, default: "anonymous" },
    themeOverrides: { type: null, required: false }
  },
  emits: ["error"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("avatar");
    const { themeStyle } = useComponentTheme(
      "avatar",
      computed2(() => props.themeOverrides)
    );
    const imgError = ref2(false);
    const sizeMap = {
      large: 56,
      default: 40,
      small: 28
    };
    const avatarSize = computed2(() => {
      var _a;
      if (typeof props.size === "number") return `${props.size}px`;
      return `${(_a = sizeMap[props.size]) != null ? _a : 40}px`;
    });
    const avatarStyle = computed2(() => {
      const style = __spreadProps(__spreadValues2({}, themeStyle.value), {
        width: avatarSize.value,
        height: avatarSize.value,
        lineHeight: avatarSize.value,
        fontSize: `calc(${avatarSize.value} / 2.5)`
      });
      if (props.backgroundColor || props.color) {
        style.backgroundColor = props.backgroundColor || props.color || "";
      }
      return __spreadValues2(__spreadValues2({}, style), typeof props.style === "object" ? props.style : {});
    });
    const avatarClasses = computed2(() => [
      ns.b(),
      ns.m(props.shape),
      typeof props.size === "string" && ns.m(props.size),
      ns.is("image", !!props.src && !imgError.value)
    ]);
    const showImg = computed2(() => props.src && !imgError.value);
    const handleError = (event) => {
      imgError.value = true;
      emit("error", event);
    };
    const __returned__ = { props, emit, ns, themeStyle, imgError, sizeMap, avatarSize, avatarStyle, avatarClasses, showImg, handleError, computed: computed2, ref: ref2, get useNamespace() {
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
