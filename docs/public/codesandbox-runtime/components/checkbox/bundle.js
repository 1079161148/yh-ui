// public/codesandbox-runtime/components/checkbox/src/checkbox.js
import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle } from "vue";
import { computed as computed3, ref as ref2, inject as inject4, onMounted, watch } from "vue";

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

// public/codesandbox-runtime/components/checkbox/src/checkbox-meta.js
var checkboxGroupContextKey = Symbol("checkboxGroupContextKey");

// public/codesandbox-runtime/components/checkbox/src/checkbox.js
var _hoisted_1 = ["name", "id", "tabindex", "disabled", "checked"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "label",
    {
      class: _normalizeClass($setup.checkboxClasses),
      style: _normalizeStyle($setup.themeStyle),
      onMouseenter: _cache[0] || (_cache[0] = ($event) => $setup.hovering = true),
      onMouseleave: _cache[1] || (_cache[1] = ($event) => $setup.hovering = false)
    },
    [
      _createElementVNode(
        "span",
        {
          class: _normalizeClass([$setup.ns.e("input"), $setup.ns.is("disabled", $setup.actualDisabled), $setup.ns.is("checked", $setup.isChecked), $setup.ns.is("indeterminate", $setup.props.indeterminate)])
        },
        [
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.innerClasses)
            },
            null,
            2
            /* CLASS */
          ),
          _createElementVNode("input", {
            ref: "inputRef",
            class: _normalizeClass($setup.ns.e("original")),
            type: "checkbox",
            name: $props.name,
            id: $props.id,
            tabindex: $props.tabindex,
            disabled: $setup.actualDisabled,
            checked: $setup.isChecked,
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
  name: "YhCheckbox"
}, {
  __name: "checkbox",
  props: {
    modelValue: { type: [String, Number, Boolean], required: false },
    trueValue: { type: [String, Number, Boolean], required: false, default: true },
    falseValue: { type: [String, Number, Boolean], required: false, default: false },
    value: { type: [String, Number, Boolean], required: false },
    name: { type: String, required: false },
    label: { type: String, required: false },
    size: { type: null, required: false, default: "default" },
    disabled: { type: Boolean, required: false, default: false },
    indeterminate: { type: Boolean, required: false, default: false },
    border: { type: Boolean, required: false, default: false },
    validateEvent: { type: Boolean, required: false, default: true },
    id: { type: String, required: false },
    tabindex: { type: [String, Number], required: false },
    checked: { type: Boolean, required: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("checkbox");
    const checkboxGroup = inject4(checkboxGroupContextKey, void 0);
    const { themeStyle } = useComponentTheme("checkbox", computed3(() => props.themeOverrides || (checkboxGroup == null ? void 0 : checkboxGroup.themeOverrides)));
    const inputRef = ref2();
    const focused = ref2(false);
    const hovering = ref2(false);
    const { globalSize } = useConfig();
    const isGroup = computed3(() => !!checkboxGroup);
    const checkboxSize = computed3(() => {
      return (props.size !== "default" ? props.size : checkboxGroup == null ? void 0 : checkboxGroup.size) || globalSize.value || "default";
    });
    const isDisabled = computed3(() => {
      return props.disabled || (checkboxGroup == null ? void 0 : checkboxGroup.disabled) || false;
    });
    const isLimitDisabled = computed3(() => {
      if (isGroup.value && checkboxGroup) {
        const modelValue = checkboxGroup.modelValue || [];
        const isChecked2 = modelValue.includes(props.value);
        if (checkboxGroup.max !== void 0 && modelValue.length >= checkboxGroup.max && !isChecked2) {
          return true;
        }
        if (checkboxGroup.min !== void 0 && modelValue.length <= checkboxGroup.min && isChecked2) {
          return true;
        }
      }
      return false;
    });
    const actualDisabled = computed3(() => isDisabled.value || isLimitDisabled.value);
    const isChecked = computed3(() => {
      if (isGroup.value && checkboxGroup) {
        return (checkboxGroup.modelValue || []).includes(
          props.value
        );
      }
      return props.modelValue === props.trueValue;
    });
    const checkboxClasses = computed3(() => [
      ns.b(),
      ns.m(checkboxSize.value),
      ns.is("disabled", actualDisabled.value),
      ns.is("checked", isChecked.value),
      ns.is("indeterminate", props.indeterminate),
      ns.is("focused", focused.value),
      ns.is("border", props.border)
    ]);
    const innerClasses = computed3(() => [
      ns.e("inner")
    ]);
    const handleChange = (event) => {
      var _a;
      if (actualDisabled.value) return;
      const target = event.target;
      if (isGroup.value && checkboxGroup) {
        const currentValue = [...checkboxGroup.modelValue || []];
        const value = props.value;
        if (target.checked) {
          if (!currentValue.includes(value)) {
            currentValue.push(value);
          }
        } else {
          const index = currentValue.indexOf(value);
          if (index > -1) {
            currentValue.splice(index, 1);
          }
        }
        (_a = checkboxGroup.changeEvent) == null ? void 0 : _a.call(checkboxGroup, currentValue);
      } else {
        const newValue = target.checked ? props.trueValue : props.falseValue;
        emit("update:modelValue", newValue);
        emit("change", newValue);
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
    watch(
      () => props.checked,
      (val) => {
        if (val !== void 0 && !isGroup.value) {
          const newValue = val ? props.trueValue : props.falseValue;
          if (props.modelValue !== newValue) {
            emit("update:modelValue", newValue);
          }
        }
      },
      { immediate: true }
    );
    onMounted(() => {
      if (inputRef.value && props.checked !== void 0 && !isGroup.value) {
        inputRef.value.checked = isChecked.value;
      }
    });
    __expose({
      get ref() {
        return inputRef.value;
      },
      get checked() {
        return isChecked.value;
      },
      focus,
      blur
    });
    const __returned__ = { props, emit, ns, checkboxGroup, themeStyle, inputRef, focused, hovering, globalSize, isGroup, checkboxSize, isDisabled, isLimitDisabled, actualDisabled, isChecked, checkboxClasses, innerClasses, handleChange, handleFocus, handleBlur, focus, blur, computed: computed3, ref: ref2, inject: inject4, onMounted, watch, get useNamespace() {
      return useNamespace;
    }, get useConfig() {
      return useConfig;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get checkboxGroupContextKey() {
      return checkboxGroupContextKey;
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
