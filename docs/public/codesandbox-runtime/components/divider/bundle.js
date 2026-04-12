// public/codesandbox-runtime/components/divider/src/divider.js
import { renderSlot as _renderSlot, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle } from "vue";
import { computed as computed2 } from "vue";

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

// public/codesandbox-runtime/components/divider/src/divider-meta.js
var dividerProps = {
  /** 分割线方向 */
  direction: {
    type: String,
    default: "horizontal"
  },
  /** 文案位置 */
  contentPosition: {
    type: String,
    default: "center"
  },
  /** 分割线样式 */
  borderStyle: {
    type: String,
    default: "solid"
  },
  /** 分割线宽度 */
  borderWidth: {
    type: [String, Number],
    default: ""
  },
  /** 分割线颜色 */
  color: {
    type: String,
    default: ""
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};

// public/codesandbox-runtime/components/divider/src/divider.js
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
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.classes),
      style: _normalizeStyle($setup.dividerStyle),
      role: "separator"
    },
    [
      _ctx.$slots.default && _ctx.direction !== "vertical" ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass([$setup.ns.e("text"), $setup.ns.is(_ctx.contentPosition)])
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhDivider"
}, {
  __name: "divider",
  props: dividerProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("divider");
    const { themeStyle } = useComponentTheme("divider", computed2(() => props.themeOverrides));
    const dividerStyle = computed2(() => {
      const styles = {
        "--yh-divider-border-style": props.borderStyle
      };
      if (props.color) {
        styles["--yh-divider-border-color"] = props.color;
      }
      if (props.borderWidth) {
        styles["--yh-divider-border-width"] = typeof props.borderWidth === "number" ? `${props.borderWidth}px` : props.borderWidth;
      }
      return __spreadValues2(__spreadValues2({}, themeStyle.value), styles);
    });
    const classes = computed2(() => [
      ns.b(),
      ns.m(props.direction),
      props.contentPosition !== "center" ? ns.m(`content-${props.contentPosition}`) : ""
    ]);
    const __returned__ = { props, ns, themeStyle, dividerStyle, classes, computed: computed2, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get dividerProps() {
      return dividerProps;
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
