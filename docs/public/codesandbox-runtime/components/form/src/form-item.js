var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle, openBlock as _openBlock, createElementBlock as _createElementBlock, createElementVNode as _createElementVNode, Transition as _Transition, withCtx as _withCtx, createVNode as _createVNode } from "vue";
const _hoisted_1 = ["data-prop"];
const _hoisted_2 = {
  key: 0,
  viewBox: "0 0 1024 1024",
  width: "16",
  height: "16"
};
const _hoisted_3 = {
  key: 1,
  viewBox: "0 0 1024 1024",
  width: "16",
  height: "16"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return _openBlock(), _createElementBlock("div", {
    class: _normalizeClass([$setup.ns.b(), $setup.ns.m($setup.itemSize), $setup.ns.is("error", $setup.currentValidateStatus === "error"), $setup.ns.is("validating", $setup.currentValidateStatus === "validating"), $setup.ns.is("success", $setup.currentValidateStatus === "success"), $setup.ns.is("required", $setup.isRequired), $setup.ns.is("disabled", $setup.isDisabled)]),
    style: _normalizeStyle($setup.themeStyle),
    "data-prop": _ctx.prop
  }, [
    _createCommentVNode(" \u6807\u7B7E "),
    _ctx.label || _ctx.$slots.label ? (_openBlock(), _createElementBlock(
      "label",
      {
        key: 0,
        id: $setup.labelId,
        for: $setup.contentId,
        class: _normalizeClass($setup.ns.e("label")),
        style: _normalizeStyle($setup.labelStyle)
      },
      [
        _renderSlot(_ctx.$slots, "label", {}, () => {
          var _a2;
          return [
            _createTextVNode(
              _toDisplayString(_ctx.label) + _toDisplayString((_a2 = $setup.formContext) == null ? void 0 : _a2.labelSuffix),
              1
              /* TEXT */
            )
          ];
        })
      ],
      6
      /* CLASS, STYLE */
    )) : _createCommentVNode("v-if", true),
    _createElementVNode(
      "div",
      {
        class: _normalizeClass($setup.ns.e("content")),
        id: $setup.contentId
      },
      [
        _renderSlot(_ctx.$slots, "default"),
        _createCommentVNode(" \u72B6\u6001\u56FE\u6807 "),
        ((_a = $setup.formContext) == null ? void 0 : _a.statusIcon) && $setup.currentValidateStatus ? (_openBlock(), _createElementBlock(
          "div",
          {
            key: 0,
            class: _normalizeClass([$setup.ns.e("status-icon"), $setup.ns.is($setup.currentValidateStatus)])
          },
          [
            $setup.currentValidateStatus === "success" ? (_openBlock(), _createElementBlock("svg", _hoisted_2, [..._cache[0] || (_cache[0] = [
              _createElementVNode(
                "path",
                {
                  fill: "currentColor",
                  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.32l-114.944-114.88a32 32 0 1 0-45.248 45.248l137.536 137.472a32 32 0 0 0 45.248 0l310.4-310.272a32 32 0 1 0-45.248-45.248L456.192 600.32z"
                },
                null,
                -1
                /* CACHED */
              )
            ])])) : $setup.currentValidateStatus === "error" ? (_openBlock(), _createElementBlock("svg", _hoisted_3, [..._cache[1] || (_cache[1] = [
              _createElementVNode(
                "path",
                {
                  fill: "currentColor",
                  d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                },
                null,
                -1
                /* CACHED */
              )
            ])])) : _createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : _createCommentVNode("v-if", true),
        _createCommentVNode(" \u6821\u9A8C\u63D0\u793A - \u786E\u4FDD\u5373\u4F7F\u6CA1\u6709\u70B9\u51FB\u63D0\u4EA4\uFF0C\u901A\u8FC7\u89E6\u53D1 blur/change \u4E5F\u80FD\u5373\u65F6\u663E\u793A "),
        _createVNode(_Transition, { name: "yh-fade" }, {
          default: _withCtx(() => {
            var _a2, _b;
            return [
              $setup.currentValidateStatus === "error" && _ctx.showMessage && ((_b = (_a2 = $setup.formContext) == null ? void 0 : _a2.showMessage) != null ? _b : true) ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  id: $setup.errorId,
                  class: _normalizeClass([$setup.ns.e("error"), $setup.ns.is(_ctx.errorPosition)]),
                  role: "alert",
                  "aria-live": "polite"
                },
                _toDisplayString($setup.currentValidateMessage),
                3
                /* TEXT, CLASS */
              )) : _createCommentVNode("v-if", true)
            ];
          }),
          _: 1
          /* STABLE */
        })
      ],
      2
      /* CLASS */
    )
  ], 14, _hoisted_1);
}
import { inject, onMounted, onBeforeUnmount, provide, reactive, ref, computed, toRefs } from "vue";
import AsyncValidator, {} from "async-validator";
import { formItemProps } from "./form-item-meta.js";
import { useLocale, FormContextKey, FormItemContextKey, useId } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { useConfig } from "../../../hooks/use-config/index.js";
import { get, set } from "../../../utils/index.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhFormItem"
}, {
  __name: "form-item",
  props: formItemProps,
  setup(__props, { expose: __expose }) {
    const props = __props;
    const ns = useNamespace("form-item");
    const { t } = useLocale();
    const formContext = inject(FormContextKey, null);
    const { globalSize } = useConfig();
    const { themeStyle } = useComponentTheme(
      "form-item",
      computed(
        () => props.themeOverrides || (formContext == null ? void 0 : formContext.themeOverrides)
      )
    );
    const id = useId().value;
    const labelId = `yh-label-${id}`;
    const contentId = `yh-content-${id}`;
    const errorId = `yh-error-${id}`;
    const innerValidateStatus = ref("");
    const innerValidateMessage = ref("");
    const initialValue = ref(void 0);
    const currentValidateStatus = computed(() => props.validateStatus || innerValidateStatus.value);
    const currentValidateMessage = computed(() => props.error || innerValidateMessage.value);
    const itemRules = computed(() => {
      const rules = [];
      if (props.rules) {
        const pRules = Array.isArray(props.rules) ? props.rules : [props.rules];
        rules.push(...pRules);
      }
      const formRules = formContext == null ? void 0 : formContext.rules;
      if (formRules && props.prop) {
        const fRules = formRules[props.prop];
        if (fRules) {
          const fRulesArray = Array.isArray(fRules) ? fRules : [fRules];
          rules.push(...fRulesArray);
        }
      }
      return rules;
    });
    const isRequired = computed(() => {
      if (props.required) return true;
      return itemRules.value.some((rule) => !!rule.required);
    });
    const fieldValue = computed(() => {
      const model = formContext == null ? void 0 : formContext.model;
      if (!model || !props.prop) return void 0;
      return get(model, props.prop);
    });
    const labelStyle = computed(() => {
      const width = props.labelWidth || (formContext == null ? void 0 : formContext.labelWidth);
      if (width) {
        return { width: typeof width === "number" ? `${width}px` : width };
      }
      return {};
    });
    const itemSize = computed(() => props.size || (formContext == null ? void 0 : formContext.size) || globalSize.value || "default");
    const isDisabled = computed(() => props.disabled || (formContext == null ? void 0 : formContext.disabled) || false);
    const validate = async (trigger = "", callback) => {
      const rules = trigger ? itemRules.value.filter(
        (rule) => !rule.trigger || (Array.isArray(rule.trigger) ? rule.trigger.includes(trigger) : rule.trigger === trigger)
      ) : itemRules.value;
      if (rules.length === 0) {
        callback == null ? void 0 : callback(true);
        return true;
      }
      innerValidateStatus.value = "validating";
      const descriptor = { [props.prop]: rules };
      const validator = new AsyncValidator(descriptor);
      const model = { [props.prop]: fieldValue.value };
      return validator.validate(model, { firstFields: true }).then(() => {
        innerValidateStatus.value = "success";
        innerValidateMessage.value = "";
        callback == null ? void 0 : callback(true);
        return true;
      }).catch((errorData) => {
        innerValidateStatus.value = "error";
        const { errors } = errorData || {};
        if (errors && errors.length > 0) {
          innerValidateMessage.value = errors[0].message || t("form.validationFailed");
        } else {
          innerValidateMessage.value = typeof errorData === "string" ? errorData : t("form.validationFailed");
        }
        callback == null ? void 0 : callback(false);
        return Promise.reject(errorData);
      });
    };
    const resetField = () => {
      innerValidateStatus.value = "";
      innerValidateMessage.value = "";
      const model = formContext == null ? void 0 : formContext.model;
      if (model && props.prop && initialValue.value !== void 0) {
        set(model, props.prop, initialValue.value);
      }
    };
    const clearValidate = () => {
      innerValidateStatus.value = "";
      innerValidateMessage.value = "";
    };
    const context = reactive(__spreadProps(__spreadValues({}, toRefs(props)), {
      validate,
      resetField,
      clearValidate,
      validateStatus: currentValidateStatus,
      validateMessage: currentValidateMessage,
      label: computed(() => props.label),
      disabled: isDisabled,
      size: itemSize,
      errorId,
      inputId: contentId
    }));
    provide(FormItemContextKey, context);
    onMounted(() => {
      if (props.prop) {
        formContext == null ? void 0 : formContext.addField(context);
        if (fieldValue.value !== void 0) {
          try {
            initialValue.value = JSON.parse(JSON.stringify(fieldValue.value));
          } catch (e) {
            initialValue.value = fieldValue.value;
          }
        }
      }
    });
    onBeforeUnmount(() => {
      if (props.prop) {
        formContext == null ? void 0 : formContext.removeField(context);
      }
    });
    __expose({
      validate,
      resetField,
      clearValidate,
      validateStatus: currentValidateStatus,
      validateMessage: currentValidateMessage,
      size: itemSize
    });
    const __returned__ = { props, ns, t, formContext, globalSize, themeStyle, id, labelId, contentId, errorId, innerValidateStatus, innerValidateMessage, initialValue, currentValidateStatus, currentValidateMessage, itemRules, isRequired, fieldValue, labelStyle, itemSize, isDisabled, validate, resetField, clearValidate, context, inject, onMounted, onBeforeUnmount, provide, reactive, ref, computed, toRefs, get AsyncValidator() {
      return AsyncValidator;
    }, get formItemProps() {
      return formItemProps;
    }, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get FormContextKey() {
      return FormContextKey;
    }, get FormItemContextKey() {
      return FormItemContextKey;
    }, get useId() {
      return useId;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
    }, get get() {
      return get;
    }, get set() {
      return set;
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
