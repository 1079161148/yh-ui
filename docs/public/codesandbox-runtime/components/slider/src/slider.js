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
import { createVNode as _createVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, createCommentVNode as _createCommentVNode, normalizeStyle as _normalizeStyle, createElementVNode as _createElementVNode, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, renderSlot as _renderSlot, withCtx as _withCtx, createSlots as _createSlots, createBlock as _createBlock, renderList as _renderList, Fragment as _Fragment, toDisplayString as _toDisplayString } from "vue";
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.sliderClasses),
      style: _normalizeStyle($setup.sliderStyle)
    },
    [
      _ctx.showInput && !_ctx.range ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("input"))
        },
        [
          _createVNode($setup["YhInputNumber"], {
            "model-value": $setup.firstValue,
            min: _ctx.min,
            max: _ctx.max,
            step: _ctx.step,
            disabled: $setup.mergedDisabled,
            size: _ctx.inputSize || $setup.mergedSize,
            controls: _ctx.showInputControls,
            onChange: $setup.handleInputChange
          }, null, 8, ["model-value", "min", "max", "step", "disabled", "size", "controls"])
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createElementVNode(
        "div",
        {
          ref: "sliderRef",
          class: _normalizeClass($setup.ns.e("runway")),
          onMousedown: $setup.onSliderClick
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("bar")),
              style: _normalizeStyle($setup.barStyle)
            },
            null,
            6
            /* CLASS, STYLE */
          ),
          _createVNode($setup["SliderButton"], {
            modelValue: $setup.firstValue,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.firstValue = $event),
            vertical: $setup.vertical,
            disabled: $setup.mergedDisabled,
            min: _ctx.min,
            max: _ctx.max,
            step: _ctx.step,
            "show-tooltip": _ctx.showTooltip,
            "format-tooltip": _ctx.formatTooltip,
            "tooltip-class": _ctx.tooltipClass,
            placement: _ctx.placement,
            onChange: $setup.handleButtonChange,
            onInput: $setup.handleButtonInput
          }, _createSlots({
            _: 2
            /* DYNAMIC */
          }, [
            _ctx.$slots.thumb ? {
              name: "thumb",
              fn: _withCtx((scope) => [
                _renderSlot(_ctx.$slots, "thumb", _normalizeProps(_guardReactiveProps(scope)))
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["modelValue", "vertical", "disabled", "min", "max", "step", "show-tooltip", "format-tooltip", "tooltip-class", "placement"]),
          _ctx.range ? (_openBlock(), _createBlock($setup["SliderButton"], {
            key: 0,
            modelValue: $setup.secondValue,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.secondValue = $event),
            vertical: $setup.vertical,
            disabled: $setup.mergedDisabled,
            min: _ctx.min,
            max: _ctx.max,
            step: _ctx.step,
            "show-tooltip": _ctx.showTooltip,
            "format-tooltip": _ctx.formatTooltip,
            "tooltip-class": _ctx.tooltipClass,
            placement: _ctx.placement,
            onChange: $setup.handleButtonChange,
            onInput: $setup.handleButtonInput
          }, _createSlots({
            _: 2
            /* DYNAMIC */
          }, [
            _ctx.$slots.thumb ? {
              name: "thumb",
              fn: _withCtx((scope) => [
                _renderSlot(_ctx.$slots, "thumb", _normalizeProps(_guardReactiveProps(scope)))
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["modelValue", "vertical", "disabled", "min", "max", "step", "show-tooltip", "format-tooltip", "tooltip-class", "placement"])) : _createCommentVNode("v-if", true),
          _ctx.showStops ? (_openBlock(true), _createElementBlock(
            _Fragment,
            { key: 1 },
            _renderList($setup.stops, (stop, index) => {
              return _openBlock(), _createElementBlock(
                "div",
                {
                  key: index,
                  class: _normalizeClass($setup.ns.e("stop")),
                  style: _normalizeStyle($setup.vertical ? {
                    bottom: stop + "%"
                  } : {
                    left: stop + "%"
                  })
                },
                null,
                6
                /* CLASS, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          )) : _createCommentVNode("v-if", true),
          $setup.markList.length > 0 ? (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 2 },
            [
              _createElementVNode("div", null, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList($setup.markList, (item, index) => {
                    return _openBlock(), _createElementBlock(
                      "div",
                      {
                        key: index,
                        class: _normalizeClass($setup.ns.e("stop")),
                        style: _normalizeStyle($setup.vertical ? {
                          bottom: item.point + "%"
                        } : {
                          left: item.point + "%"
                        })
                      },
                      null,
                      6
                      /* CLASS, STYLE */
                    );
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("marks"))
                },
                [
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList($setup.markList, (item, index) => {
                      return _openBlock(), _createElementBlock(
                        "div",
                        {
                          key: index,
                          class: _normalizeClass($setup.ns.e("mark-text")),
                          style: _normalizeStyle($setup.vertical ? {
                            bottom: item.point + "%"
                          } : {
                            left: item.point + "%"
                          })
                        },
                        [
                          _renderSlot(_ctx.$slots, "mark", {
                            mark: item.label.label
                          }, () => [
                            _createElementVNode(
                              "div",
                              {
                                style: _normalizeStyle(item.label.style)
                              },
                              _toDisplayString(item.label.label),
                              5
                              /* TEXT, STYLE */
                            )
                          ])
                        ],
                        6
                        /* CLASS, STYLE */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ],
                2
                /* CLASS */
              )
            ],
            64
            /* STABLE_FRAGMENT */
          )) : _createCommentVNode("v-if", true)
        ],
        34
        /* CLASS, NEED_HYDRATION */
      ),
      _renderSlot(_ctx.$slots, "default")
    ],
    6
    /* CLASS, STYLE */
  );
}
import { ref, computed, watch, onMounted, provide, toRefs } from "vue";
import { useFormItem } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { useConfig } from "../../../hooks/use-config/index.js";
import { sliderProps, sliderEmits } from "./slider-meta.js";
import SliderButton from "./slider-button.js";
import YhInputNumber from "../../input-number/src/input-number.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhSlider"
}, {
  __name: "slider",
  props: sliderProps,
  emits: sliderEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const { vertical } = toRefs(props);
    const emit = __emit;
    const ns = useNamespace("slider");
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { themeStyle } = useComponentTheme(
      "slider",
      computed(() => props.themeOverrides)
    );
    const { globalSize } = useConfig();
    const sliderRef = ref();
    const firstValue = ref(0);
    const secondValue = ref(0);
    const mergedDisabled = computed(() => props.disabled || (form == null ? void 0 : form.disabled) || false);
    const mergedSize = computed(() => {
      const size = props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default";
      return size === "" ? "default" : size;
    });
    provide("slider", {
      sliderRef,
      props,
      emit
    });
    const initValues = () => {
      if (props.range && Array.isArray(props.modelValue)) {
        firstValue.value = Math.max(props.min, Math.min(props.max, props.modelValue[0] || 0));
        secondValue.value = Math.max(props.min, Math.min(props.max, props.modelValue[1] || 0));
      } else {
        const val = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
        firstValue.value = Math.max(props.min, Math.min(props.max, Number(val) || 0));
        secondValue.value = props.min;
      }
    };
    watch(
      () => props.modelValue,
      () => {
        initValues();
      },
      { deep: true }
    );
    initValues();
    const minValue = computed(
      () => props.range ? Math.min(firstValue.value, secondValue.value) : props.min
    );
    const maxValue = computed(
      () => props.range ? Math.max(firstValue.value, secondValue.value) : firstValue.value
    );
    const barSize = computed(() => {
      return props.range ? `${100 * (maxValue.value - minValue.value) / (props.max - props.min)}%` : `${100 * (firstValue.value - props.min) / (props.max - props.min)}%`;
    });
    const barStart = computed(() => {
      return props.range ? `${100 * (minValue.value - props.min) / (props.max - props.min)}%` : "0%";
    });
    const barStyle = computed(() => {
      const style = props.vertical ? {
        height: barSize.value,
        bottom: barStart.value,
        top: "auto"
      } : {
        width: barSize.value,
        left: barStart.value,
        right: "auto"
      };
      if (props.color) {
        style.background = props.color;
      }
      return style;
    });
    const stops = computed(() => {
      if (!props.showStops || props.min >= props.max) return [];
      const stopCount = (props.max - props.min) / props.step;
      const stepWidth = 100 / stopCount;
      const result = [];
      for (let i = 1; i < stopCount; i++) {
        result.push(i * stepWidth);
      }
      if (props.range) {
        return result.filter((step) => {
          const val = props.min + step * (props.max - props.min) / 100;
          return val < minValue.value || val > maxValue.value;
        });
      } else {
        return result.filter(
          (step) => props.min + step * (props.max - props.min) / 100 > firstValue.value
        );
      }
    });
    const markList = computed(() => {
      if (!props.marks) return [];
      const marksKeys = Object.keys(props.marks).map(Number).filter((n) => !isNaN(n) && n >= props.min && n <= props.max);
      return marksKeys.map((key) => {
        var _a;
        const mark = (_a = props.marks) == null ? void 0 : _a[key];
        return {
          point: (key - props.min) / (props.max - props.min) * 100,
          label: typeof mark === "string" ? { label: mark, style: void 0 } : mark != null ? mark : { label: "", style: void 0 }
        };
      });
    });
    const sliderClasses = computed(
      () => [
        ns.b(),
        ns.m(mergedSize.value),
        vertical.value ? ns.is("vertical") : "",
        mergedDisabled.value ? ns.is("disabled") : "",
        props.showInput && !props.range ? ns.is("with-input") : ""
      ].filter(Boolean)
    );
    const sliderStyle = computed(() => {
      const style = {};
      if (props.color) {
        style["--yh-slider-main-color"] = props.color;
        style["--yh-slider-secondary-color"] = props.color;
      }
      if (props.vertical && props.height) {
        style.height = props.height;
      }
      return __spreadValues(__spreadValues({}, themeStyle.value), style);
    });
    const emitValue = (val) => {
      emit("update:modelValue", val);
      emit("input", val);
      if (props.validateEvent) {
        triggerValidate("change");
      }
    };
    const updateValue = (isChange = false) => {
      const val = props.range ? [minValue.value, maxValue.value] : firstValue.value;
      emitValue(val);
      if (isChange) {
        emit("change", val);
      }
    };
    const handleButtonChange = () => updateValue(true);
    const handleButtonInput = () => updateValue(false);
    const onSliderClick = (event) => {
      if (mergedDisabled.value) return;
      const slider = sliderRef.value;
      if (!slider) return;
      const rect = slider.getBoundingClientRect();
      let percent = 0;
      if (props.vertical) {
        const clientY = event.clientY;
        percent = (rect.bottom - clientY) / rect.height * 100;
      } else {
        const clientX = event.clientX;
        percent = (clientX - rect.left) / rect.width * 100;
      }
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;
      const lengthPerStep = 100 / ((props.max - props.min) / props.step);
      const steps = Math.round(percent / lengthPerStep);
      let value = steps * lengthPerStep * (props.max - props.min) * 0.01 + props.min;
      value = parseFloat(value.toFixed(getPrecision(props.step)));
      if (props.range) {
        if (Math.abs(value - firstValue.value) < Math.abs(value - secondValue.value)) {
          firstValue.value = value;
        } else {
          secondValue.value = value;
        }
      } else {
        firstValue.value = value;
      }
      updateValue();
    };
    const getPrecision = (step) => {
      const stepStr = step.toString();
      const dotIndex = stepStr.indexOf(".");
      return dotIndex > -1 ? stepStr.length - dotIndex - 1 : 0;
    };
    const handleInputChange = (val) => {
      if (val === void 0) return;
      firstValue.value = val;
      updateValue();
    };
    onMounted(() => {
      initValues();
    });
    __expose({
      sliderRef,
      firstValue,
      secondValue
    });
    const __returned__ = { props, vertical, emit, ns, form, formItem, triggerValidate, themeStyle, globalSize, sliderRef, firstValue, secondValue, mergedDisabled, mergedSize, initValues, minValue, maxValue, barSize, barStart, barStyle, stops, markList, sliderClasses, sliderStyle, emitValue, updateValue, handleButtonChange, handleButtonInput, onSliderClick, getPrecision, handleInputChange, ref, computed, watch, onMounted, provide, toRefs, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
    }, get sliderProps() {
      return sliderProps;
    }, get sliderEmits() {
      return sliderEmits;
    }, SliderButton, YhInputNumber };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
});
__sfc__.render = render;
var stdin_default = __sfc__;
export {
  stdin_default as default
};
