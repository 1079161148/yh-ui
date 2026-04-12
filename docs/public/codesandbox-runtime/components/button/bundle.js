// public/codesandbox-runtime/components/button/src/button.js
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, resolveDynamicComponent as _resolveDynamicComponent, createBlock as _createBlock, normalizeStyle as _normalizeStyle, withCtx as _withCtx } from "vue";
import { computed as computed3, ref as ref2, useSlots } from "vue";

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

// public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject2, computed, unref as unref2 } from "vue";
var configProviderContextKey = Symbol(
  "configProviderContextKey"
);
var useConfig = () => {
  const configRef = inject2(configProviderContextKey, null);
  const globalSize = computed(() => {
    const config = unref2(configRef);
    return (config == null ? void 0 : config.size) || "default";
  });
  const globalZIndex = computed(() => {
    const config = unref2(configRef);
    return (config == null ? void 0 : config.zIndex) || 2e3;
  });
  const globalLocale = computed(() => {
    const config = unref2(configRef);
    return config == null ? void 0 : config.locale;
  });
  return {
    config: configRef,
    globalSize,
    globalZIndex,
    globalLocale
  };
};

// public/codesandbox-runtime/theme/component-theme.js
import { inject as inject3, provide, computed as computed2, unref as unref3 } from "vue";
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
  const globalThemes = inject3(COMPONENT_THEME_KEY, {});
  const mergedVars = computed2(() => {
    const globalVars = globalThemes[componentName] || {};
    const local = unref3(localOverrides) || {};
    return __spreadValues(__spreadValues({}, globalVars), local);
  });
  const themeStyle = computed2(() => {
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
  const hasCustomTheme = computed2(() => {
    return Object.keys(mergedVars.value).length > 0;
  });
  return {
    themeVars: mergedVars,
    themeStyle,
    hasCustomTheme
  };
}

// public/codesandbox-runtime/components/button/src/button.js
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
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createBlock(_resolveDynamicComponent($props.tag), {
    ref: "buttonRef",
    class: _normalizeClass($setup.buttonClasses),
    style: _normalizeStyle($setup.buttonStyles),
    type: $props.tag === "button" ? $props.nativeType : void 0,
    disabled: $props.disabled || $props.loading,
    autofocus: $props.autofocus,
    onClick: $setup.handleClick
  }, {
    default: _withCtx(() => [
      _createCommentVNode(" 1. \u52A0\u8F7D\u56FE\u6807 (\u4F18\u5148\u7EA7\u6700\u9AD8\uFF0C\u5B58\u5728\u65F6\u901A\u5E38\u9690\u85CF\u539F\u56FE\u6807) "),
      $props.loading ? _renderSlot(_ctx.$slots, "loading", { key: 0 }, () => [
        _createElementVNode(
          "span",
          {
            class: _normalizeClass($setup.ns.e("loading-icon"))
          },
          [
            (_openBlock(), _createElementBlock(
              "svg",
              {
                class: _normalizeClass($setup.ns.e("loading-svg")),
                viewBox: "0 0 1024 1024"
              },
              [..._cache[0] || (_cache[0] = [
                _createElementVNode(
                  "path",
                  {
                    fill: "currentColor",
                    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
                  },
                  null,
                  -1
                  /* CACHED */
                )
              ])],
              2
              /* CLASS */
            ))
          ],
          2
          /* CLASS */
        )
      ]) : _createCommentVNode("v-if", true),
      _createCommentVNode(" 2. \u524D\u7F6E/\u4E0A\u7F6E\u56FE\u6807 "),
      !$props.loading && $setup.hasIcon && ($props.iconPosition === "left" || $props.iconPosition === "top") ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 1,
          class: _normalizeClass($setup.ns.e("icon"))
        },
        [
          _renderSlot(_ctx.$slots, "icon", {}, () => [
            $props.icon && typeof $props.icon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.icon), { key: 0 })) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" 3. \u5185\u5BB9\u533A "),
      _ctx.$slots.default ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 2,
          class: _normalizeClass($setup.ns.e("text"))
        },
        [
          _renderSlot(_ctx.$slots, "default")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" 4. \u540E\u7F6E/\u4E0B\u7F6E\u56FE\u6807 "),
      !$props.loading && $setup.hasIcon && ($props.iconPosition === "right" || $props.iconPosition === "bottom") ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 3,
          class: _normalizeClass($setup.ns.e("icon"))
        },
        [
          _renderSlot(_ctx.$slots, "icon", {}, () => [
            $props.icon && typeof $props.icon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.icon), { key: 0 })) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" 5. \u72EC\u7ACB\u7684\u540E\u7F00\u56FE\u6807\uFF08suffixIcon \u63D2\u69FD\uFF09 "),
      !$props.loading && $setup.hasSuffixIcon ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 4,
          class: _normalizeClass($setup.ns.e("suffix-icon"))
        },
        [
          _renderSlot(_ctx.$slots, "suffixIcon", {}, () => [
            $props.suffixIcon && typeof $props.suffixIcon !== "string" ? (_openBlock(), _createBlock(_resolveDynamicComponent($props.suffixIcon), { key: 0 })) : _createCommentVNode("v-if", true)
          ])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ]),
    _: 3
    /* FORWARDED */
  }, 8, ["class", "style", "type", "disabled", "autofocus"]);
}
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhButton"
}, {
  __name: "button",
  props: {
    type: { type: null, required: false, default: "default" },
    size: { type: null, required: false },
    disabled: { type: Boolean, required: false, default: false },
    loading: { type: Boolean, required: false, default: false },
    plain: { type: Boolean, required: false, default: false },
    round: { type: Boolean, required: false, default: false },
    circle: { type: Boolean, required: false, default: false },
    text: { type: Boolean, required: false, default: false },
    link: { type: Boolean, required: false, default: false },
    nativeType: { type: null, required: false, default: "button" },
    autofocus: { type: Boolean, required: false, default: false },
    icon: { type: null, required: false },
    suffixIcon: { type: null, required: false },
    iconPosition: { type: null, required: false, default: "left" },
    color: { type: String, required: false },
    tag: { type: null, required: false, default: "button" },
    block: { type: Boolean, required: false, default: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["click"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const slots = useSlots();
    const ns = useNamespace("button");
    const { globalSize } = useConfig();
    const { themeStyle } = useComponentTheme(
      "button",
      computed3(() => props.themeOverrides)
    );
    const actualSize = computed3(() => props.size || globalSize.value || "default");
    const buttonRef = ref2();
    const hasIcon = computed3(() => props.icon || slots.icon);
    const hasSuffixIcon = computed3(() => props.suffixIcon || slots.suffixIcon);
    const isVertical = computed3(() => props.iconPosition === "top" || props.iconPosition === "bottom");
    const buttonClasses = computed3(() => [
      ns.b(),
      props.type !== "default" && ns.m(props.type),
      actualSize.value !== "default" && ns.m(actualSize.value),
      ns.is("disabled", props.disabled),
      ns.is("loading", props.loading),
      ns.is("plain", props.plain),
      ns.is("round", props.round),
      ns.is("circle", props.circle),
      ns.is("text", props.text),
      ns.is("link", props.link),
      ns.is("block", props.block),
      ns.is("vertical", isVertical.value),
      ns.is("custom-color", !!props.color)
    ]);
    const buttonStyles = computed3(() => {
      const base = themeStyle.value;
      if (!props.color) return base;
      const color = props.color;
      return __spreadProps(__spreadValues2({}, base), {
        "--yh-button-bg-color": props.plain ? "transparent" : color,
        "--yh-button-text-color": props.plain ? color : "var(--yh-color-white)",
        "--yh-button-border-color": color,
        "--yh-button-hover-bg-color": color,
        "--yh-button-hover-text-color": "var(--yh-color-white)",
        "--yh-button-hover-border-color": color,
        "--yh-button-active-bg-color": color,
        "--yh-button-active-border-color": color
      });
    });
    const handleClick = (event) => {
      if (props.disabled || props.loading) {
        event.preventDefault();
        return;
      }
      emit("click", event);
    };
    __expose({
      ref: buttonRef.value,
      size: actualSize.value,
      type: props.type,
      disabled: props.disabled
    });
    const __returned__ = { props, emit, slots, ns, globalSize, themeStyle, actualSize, buttonRef, hasIcon, hasSuffixIcon, isVertical, buttonClasses, buttonStyles, handleClick, computed: computed3, ref: ref2, useSlots, get useNamespace() {
      return useNamespace;
    }, get useConfig() {
      return useConfig;
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
