import { normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue";
const _hoisted_1 = ["name", "id", "tabindex", "disabled", "checked", "value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return _openBlock(), _createElementBlock(
    "label",
    {
      class: _normalizeClass($setup.buttonClasses),
      style: _normalizeStyle([$setup.activeStyle, $setup.themeStyle])
    },
    [
      _createElementVNode("input", {
        ref: "inputRef",
        class: _normalizeClass($setup.ns.e("original")),
        type: "radio",
        name: $setup.radioName,
        id: $props.id,
        tabindex: $props.tabindex,
        disabled: $setup.isDisabled,
        checked: $setup.isChecked,
        value: (_a = $props.value) != null ? _a : $props.label,
        onChange: $setup.handleChange,
        onFocus: $setup.handleFocus,
        onBlur: $setup.handleBlur
      }, null, 42, _hoisted_1),
      _createElementVNode(
        "span",
        {
          class: _normalizeClass($setup.ns.e("inner"))
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
      )
    ],
    6
    /* CLASS, STYLE */
  );
}
import { computed, ref, inject } from "vue";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { radioGroupContextKey } from "./radio-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhRadioButton"
}, {
  __name: "radio-button",
  props: {
    modelValue: { type: [String, Number, Boolean], required: false },
    value: { type: [String, Number, Boolean], required: false },
    name: { type: String, required: false },
    label: { type: String, required: false },
    size: { type: null, required: false },
    disabled: { type: Boolean, required: false, default: false },
    id: { type: String, required: false },
    tabindex: { type: [String, Number], required: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("radio-button");
    const radioGroup = inject(radioGroupContextKey, void 0);
    const { themeStyle } = useComponentTheme(
      "radio-button",
      computed(() => props.themeOverrides || (radioGroup == null ? void 0 : radioGroup.themeOverrides))
    );
    const inputRef = ref();
    const focused = ref(false);
    const isGroup = computed(() => !!radioGroup);
    const buttonSize = computed(() => {
      return props.size || (radioGroup == null ? void 0 : radioGroup.size) || "default";
    });
    const isDisabled = computed(() => {
      return props.disabled || (radioGroup == null ? void 0 : radioGroup.disabled) || false;
    });
    const radioName = computed(() => {
      return props.name || (radioGroup == null ? void 0 : radioGroup.name) || "";
    });
    const isChecked = computed(() => {
      var _a;
      const value = (_a = props.value) != null ? _a : props.label;
      if (isGroup.value && radioGroup) {
        return radioGroup.modelValue === value;
      }
      return props.modelValue === value;
    });
    const activeStyle = computed(() => {
      if (!isChecked.value) return {};
      const style = {};
      if (radioGroup == null ? void 0 : radioGroup.fill) {
        style["--yh-radio-button-checked-bg-color"] = radioGroup.fill;
        style["--yh-radio-button-checked-border-color"] = radioGroup.fill;
      }
      if (radioGroup == null ? void 0 : radioGroup.textColor) {
        style["--yh-radio-button-checked-text-color"] = radioGroup.textColor;
      }
      return style;
    });
    const buttonClasses = computed(() => [
      ns.b(),
      buttonSize.value !== "default" ? ns.m(buttonSize.value) : "",
      ns.is("disabled", isDisabled.value),
      ns.is("checked", isChecked.value),
      ns.is("focused", focused.value)
    ]);
    const handleChange = () => {
      var _a, _b;
      if (isDisabled.value) return;
      const value = (_a = props.value) != null ? _a : props.label;
      if (isGroup.value && radioGroup) {
        (_b = radioGroup.changeEvent) == null ? void 0 : _b.call(radioGroup, value);
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
    const __returned__ = { props, emit, ns, radioGroup, themeStyle, inputRef, focused, isGroup, buttonSize, isDisabled, radioName, isChecked, activeStyle, buttonClasses, handleChange, handleFocus, handleBlur, focus, blur, computed, ref, inject, get useNamespace() {
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
