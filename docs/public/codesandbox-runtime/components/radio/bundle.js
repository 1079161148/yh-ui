// public/codesandbox-runtime/components/radio/src/radio.js
import { createCommentVNode as _createCommentVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeStyle as _normalizeStyle } from "vue";
import { computed as computed2, ref as ref2, inject as inject3 } from "vue";

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

// public/codesandbox-runtime/components/radio/src/radio-meta.js
var radioGroupContextKey = Symbol("radioGroupContextKey");

// public/codesandbox-runtime/components/radio/src/radio.js
var _hoisted_1 = ["name", "id", "tabindex", "disabled", "checked", "value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "label",
    {
      class: _normalizeClass($setup.radioClasses),
      style: _normalizeStyle($setup.themeStyle),
      onMouseenter: _cache[0] || (_cache[0] = ($event) => $setup.hovering = true),
      onMouseleave: _cache[1] || (_cache[1] = ($event) => $setup.hovering = false)
    },
    [
      _createElementVNode(
        "span",
        {
          class: _normalizeClass($setup.ns.e("input"))
        },
        [
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.innerClasses)
            },
            [
              _createCommentVNode(" \u9009\u4E2D\u5706\u70B9 "),
              $setup.isChecked ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("dot"))
                },
                null,
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          ),
          _createElementVNode("input", {
            ref: "inputRef",
            class: _normalizeClass($setup.ns.e("original")),
            type: "radio",
            name: $setup.radioName,
            id: $props.id,
            tabindex: $props.tabindex,
            disabled: $setup.isDisabled,
            checked: $setup.isChecked,
            value: $props.value,
            onChange: $setup.handleChange,
            onFocus: $setup.handleFocus,
            onBlur: $setup.handleBlur
          }, null, 42, _hoisted_1)
        ],
        2
        /* CLASS */
      ),
      _ctx.$slots.default || $props.label ? (_openBlock(), _createElementBlock(
        "span",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("label"))
        },
        [
          _renderSlot(_ctx.$slots, "default", {}, () => [
            _createTextVNode(
              _toDisplayString($props.label),
              1
              /* TEXT */
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
var __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhRadio"
}, {
  __name: "radio",
  props: {
    modelValue: { type: [String, Number, Boolean], required: false },
    value: { type: [String, Number, Boolean], required: false },
    name: { type: String, required: false },
    label: { type: String, required: false },
    size: { type: null, required: false },
    disabled: { type: Boolean, required: false, default: false },
    border: { type: Boolean, required: false, default: false },
    id: { type: String, required: false },
    tabindex: { type: [String, Number], required: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio");
    const radioGroup = inject3(radioGroupContextKey, void 0);
    const { themeStyle } = useComponentTheme("radio", computed2(() => props.themeOverrides || (radioGroup == null ? void 0 : radioGroup.themeOverrides)));
    const inputRef = ref2();
    const focused = ref2(false);
    const hovering = ref2(false);
    const isGroup = computed2(() => !!radioGroup);
    const radioSize = computed2(() => {
      return props.size || (radioGroup == null ? void 0 : radioGroup.size) || "default";
    });
    const isDisabled = computed2(() => {
      return props.disabled || (radioGroup == null ? void 0 : radioGroup.disabled) || false;
    });
    const radioName = computed2(() => {
      return props.name || (radioGroup == null ? void 0 : radioGroup.name) || "";
    });
    const isChecked = computed2(() => {
      var _a;
      const value = (_a = props.value) != null ? _a : props.label;
      if (isGroup.value && radioGroup) {
        return radioGroup.modelValue === value;
      }
      return props.modelValue === value;
    });
    const radioClasses = computed2(() => [
      ns.b(),
      radioSize.value !== "default" ? ns.m(radioSize.value) : "",
      ns.is("disabled", isDisabled.value),
      ns.is("checked", isChecked.value),
      ns.is("focused", focused.value),
      ns.is("bordered", props.border)
    ]);
    const innerClasses = computed2(() => [
      ns.e("inner"),
      ns.is("checked", isChecked.value),
      ns.is("disabled", isDisabled.value)
    ]);
    const handleChange = () => {
      var _a;
      if (isDisabled.value) return;
      const value = props.value;
      if (isGroup.value && radioGroup) {
        (_a = radioGroup.changeEvent) == null ? void 0 : _a.call(radioGroup, value);
      } else {
        emit("update:modelValue", value);
        emit("change", value);
      }
    };
    const handleFocus = () => {
      focused.value = true;
    };
    const handleBlur = () => {
      focused.value = false;
    };
    const focus = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      (_a = inputRef.value) == null ? void 0 : _a.blur();
    };
    __expose({
      ref: inputRef.value,
      focus,
      blur
    });
    const __returned__ = { props, emit, ns, radioGroup, themeStyle, inputRef, focused, hovering, isGroup, radioSize, isDisabled, radioName, isChecked, radioClasses, innerClasses, handleChange, handleFocus, handleBlur, focus, blur, computed: computed2, ref: ref2, inject: inject3, get useNamespace() {
      return useNamespace;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get radioGroupContextKey() {
      return radioGroupContextKey;
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
