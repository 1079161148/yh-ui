// public/codesandbox-runtime/components/col/src/col.js
import { renderSlot as _renderSlot, resolveDynamicComponent as _resolveDynamicComponent, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, withCtx as _withCtx, openBlock as _openBlock, createBlock as _createBlock } from "vue";
import { computed as computed3, inject as inject3 } from "vue";

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

// public/codesandbox-runtime/components/col/src/col-meta.js
var colProps = {
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  xs: {
    type: [Number, Object],
    default: () => ({})
  },
  sm: {
    type: [Number, Object],
    default: () => ({})
  },
  md: {
    type: [Number, Object],
    default: () => ({})
  },
  lg: {
    type: [Number, Object],
    default: () => ({})
  },
  xl: {
    type: [Number, Object],
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};

// public/codesandbox-runtime/components/row/src/row-meta.js
import { defineComponent, h, computed as computed2, provide as provide2 } from "vue";
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
var rowProps = {
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: "start"
  },
  align: {
    type: String,
    default: "top"
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
var rowContextKey = Symbol("rowContextKey");
var stdin_default = defineComponent({
  name: "YhRow",
  props: rowProps,
  setup(props, { slots }) {
    const ns = useNamespace("row");
    const gutter = computed2(() => props.gutter);
    const { themeStyle } = useComponentTheme(
      "row",
      computed2(() => props.themeOverrides)
    );
    provide2(rowContextKey, {
      gutter
    });
    const style = computed2(() => {
      const styles = __spreadValues2({}, themeStyle.value);
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    const classes = computed2(() => [
      ns.b(),
      ns.is(`justify-${props.justify}`, props.justify !== "start"),
      ns.is(`align-${props.align}`, props.align !== "top")
    ]);
    return () => {
      var _a;
      return h(
        props.tag,
        {
          class: classes.value,
          style: style.value
        },
        (_a = slots.default) == null ? void 0 : _a.call(slots)
      );
    };
  }
});

// public/codesandbox-runtime/components/col/src/col.js
var __defProp3 = Object.defineProperty;
var __getOwnPropSymbols3 = Object.getOwnPropertySymbols;
var __hasOwnProp3 = Object.prototype.hasOwnProperty;
var __propIsEnum3 = Object.prototype.propertyIsEnumerable;
var __defNormalProp3 = (obj, key, value) => key in obj ? __defProp3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues3 = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp3.call(b, prop))
      __defNormalProp3(a, prop, b[prop]);
  if (__getOwnPropSymbols3)
    for (var prop of __getOwnPropSymbols3(b)) {
      if (__propIsEnum3.call(b, prop))
        __defNormalProp3(a, prop, b[prop]);
    }
  return a;
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_resolveDynamicComponent(_ctx.tag), {
    class: _normalizeClass($setup.classes),
    style: _normalizeStyle($setup.style)
  }, {
    default: _withCtx(() => [
      _renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "style"]);
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhCol"
}, {
  __name: "col",
  props: colProps,
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const ns = useNamespace("col");
    const { themeStyle } = useComponentTheme(
      "col",
      computed3(() => props.themeOverrides)
    );
    const { gutter } = inject3(rowContextKey, { gutter: computed3(() => 0) });
    const style = computed3(() => {
      const styles = __spreadValues3({}, themeStyle.value);
      if (gutter.value) {
        styles.paddingLeft = `${gutter.value / 2}px`;
        styles.paddingRight = `${gutter.value / 2}px`;
      }
      return styles;
    });
    const classes = computed3(() => {
      const classes2 = [];
      const pos = ["span", "offset", "pull", "push"];
      pos.forEach((prop) => {
        const size = props[prop];
        if (typeof size === "number") {
          if (prop === "span") classes2.push(ns.b(`${size}`));
          else if (size > 0) classes2.push(ns.b(`${prop}-${size}`));
        }
      });
      const sizes = ["xs", "sm", "md", "lg", "xl"];
      sizes.forEach((size) => {
        if (typeof props[size] === "number") {
          classes2.push(ns.b(`${size}-${props[size]}`));
        } else if (typeof props[size] === "object" && props[size] !== null) {
          const sizeProps = props[size];
          Object.keys(sizeProps).forEach((prop) => {
            const propValue = sizeProps[prop];
            if (typeof propValue === "number") {
              classes2.push(
                prop !== "span" ? ns.b(`${size}-${prop}-${propValue}`) : ns.b(`${size}-${propValue}`)
              );
            }
          });
        }
      });
      return [ns.b(), ...classes2];
    });
    const __returned__ = { props, ns, themeStyle, gutter, style, classes, computed: computed3, inject: inject3, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get colProps() {
      return colProps;
    }, get rowContextKey() {
      return rowContextKey;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default2 = __sfc__;
export {
  stdin_default2 as default
};
