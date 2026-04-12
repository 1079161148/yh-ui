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
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, openBlock as _openBlock, createElementBlock as _createElementBlock, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, Fragment as _Fragment, withModifiers as _withModifiers, createBlock as _createBlock, createVNode as _createVNode, normalizeStyle as _normalizeStyle, Transition as _Transition, withCtx as _withCtx, Teleport as _Teleport } from "vue";
const _hoisted_1 = ["id", "value", "placeholder", "disabled", "readonly", "name", "tabindex", "aria-expanded"];
const _hoisted_2 = ["value", "placeholder", "disabled", "readonly", "tabindex"];
const _hoisted_3 = ["value", "placeholder", "disabled", "readonly", "tabindex"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass($setup.wrapperClasses),
      style: _normalizeStyle($setup.themeStyle),
      onMouseenter: $setup.handleMouseEnter,
      onMouseleave: $setup.handleMouseLeave,
      onClick: $setup.togglePanel
    },
    [
      _createCommentVNode(" \u8F93\u5165\u533A\u57DF "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("wrapper"))
        },
        [
          _createCommentVNode(" \u524D\u7F00\u56FE\u6807 "),
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("prefix"))
            },
            [
              _renderSlot(_ctx.$slots, "prefix", {}, () => [
                (_openBlock(), _createElementBlock(
                  "svg",
                  {
                    viewBox: "0 0 1024 1024",
                    width: "1em",
                    height: "1em",
                    class: _normalizeClass($setup.ns.e("icon"))
                  },
                  [..._cache[3] || (_cache[3] = [
                    _createElementVNode(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 128a32 32 0 0 1 32 32v192l128 64a32 32 0 0 1-28.864 57.088l-144-72A32 32 0 0 1 480 512V288a32 32 0 0 1 32-32z"
                      },
                      null,
                      -1
                      /* CACHED */
                    )
                  ])],
                  2
                  /* CLASS */
                ))
              ])
            ],
            2
            /* CLASS */
          ),
          _createCommentVNode(" \u5355\u9009\u8F93\u5165\u6846 "),
          !$props.isRange ? (_openBlock(), _createElementBlock("input", {
            key: 0,
            ref: "inputRef",
            id: $props.id || $setup.inputId,
            class: _normalizeClass($setup.ns.e("inner")),
            value: $setup.displayValue,
            placeholder: $props.placeholder || $setup.t("timepicker.placeholder"),
            disabled: $props.disabled,
            readonly: !$props.editable,
            name: $props.name,
            tabindex: $props.tabindex,
            autocomplete: "off",
            role: "combobox",
            "aria-expanded": $setup.visible,
            onFocus: $setup.handleFocus,
            onBlur: $setup.handleBlur,
            onKeydown: $setup.handleKeydown
          }, null, 42, _hoisted_1)) : (_openBlock(), _createElementBlock(
            _Fragment,
            { key: 1 },
            [
              _createCommentVNode(" \u8303\u56F4\u9009\u62E9\u8F93\u5165\u6846 "),
              _createElementVNode("input", {
                ref: "startInputRef",
                class: _normalizeClass($setup.ns.e("range-input")),
                value: $setup.rangeStartDisplayValue,
                placeholder: $props.startPlaceholder || $setup.t("timepicker.startPlaceholder"),
                disabled: $props.disabled,
                readonly: !$props.editable,
                tabindex: $props.tabindex,
                autocomplete: "off",
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown
              }, null, 42, _hoisted_2),
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass($setup.ns.e("range-separator"))
                },
                [
                  _renderSlot(_ctx.$slots, "rangeSeparator", {}, () => [
                    _createTextVNode(
                      _toDisplayString($props.rangeSeparator),
                      1
                      /* TEXT */
                    )
                  ])
                ],
                2
                /* CLASS */
              ),
              _createElementVNode("input", {
                ref: "endInputRef",
                class: _normalizeClass($setup.ns.e("range-input")),
                value: $setup.rangeEndDisplayValue,
                placeholder: $props.endPlaceholder || $setup.t("timepicker.endPlaceholder"),
                disabled: $props.disabled,
                readonly: !$props.editable,
                tabindex: $props.tabindex,
                autocomplete: "off",
                onFocus: $setup.handleFocus,
                onBlur: $setup.handleBlur,
                onKeydown: $setup.handleKeydown
              }, null, 42, _hoisted_3)
            ],
            64
            /* STABLE_FRAGMENT */
          )),
          _createCommentVNode(" \u540E\u7F00\u56FE\u6807 "),
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("suffix"))
            },
            [
              _createCommentVNode(" \u6E05\u7A7A\u6309\u94AE "),
              $setup.showClear ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass([$setup.ns.e("icon"), $setup.ns.e("clear")]),
                  onClick: _withModifiers($setup.handleClear, ["stop"])
                },
                [..._cache[4] || (_cache[4] = [
                  _createElementVNode(
                    "svg",
                    {
                      viewBox: "0 0 1024 1024",
                      width: "1em",
                      height: "1em"
                    },
                    [
                      _createElementVNode("path", {
                        fill: "currentColor",
                        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true),
              _createCommentVNode(" \u7BAD\u5934\u56FE\u6807 "),
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass([$setup.ns.e("icon"), $setup.ns.e("arrow"), {
                    "is-reverse": $setup.visible
                  }])
                },
                [..._cache[5] || (_cache[5] = [
                  _createElementVNode(
                    "svg",
                    {
                      viewBox: "0 0 1024 1024",
                      width: "1em",
                      height: "1em"
                    },
                    [
                      _createElementVNode("path", {
                        fill: "currentColor",
                        d: "M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
                      })
                    ],
                    -1
                    /* CACHED */
                  )
                ])],
                2
                /* CLASS */
              )
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u4E0B\u62C9\u9762\u677F "),
      (_openBlock(), _createBlock(_Teleport, {
        to: "body",
        disabled: !$props.teleported
      }, [
        _createVNode(_Transition, {
          name: $setup.ns.b("panel")
        }, {
          default: _withCtx(() => [
            $setup.visible ? (_openBlock(), _createElementBlock(
              "div",
              {
                key: 0,
                class: _normalizeClass([$setup.ns.e("panel"), $props.popperClass]),
                style: _normalizeStyle($props.teleported ? $setup.dropdownStyle : {}),
                onMousedown: $setup.handlePanelMousedown,
                onMouseup: $setup.handlePanelMouseup
              },
              [
                _createCommentVNode(" \u5355\u9009\u9762\u677F "),
                !$props.isRange ? (_openBlock(), _createBlock($setup["TimeSpinner"], {
                  key: 0,
                  modelValue: $setup.internalTimeState,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.internalTimeState = $event),
                  "show-seconds": $props.showSeconds,
                  "arrow-control": $props.arrowControl,
                  "hour-step": $props.hourStep,
                  "minute-step": $props.minuteStep,
                  "second-step": $props.secondStep,
                  "disabled-time": $props.disabledTime,
                  "use12-hours": $props.use12Hours,
                  "hour-options": $props.hourOptions,
                  "minute-options": $props.minuteOptions,
                  "second-options": $props.secondOptions
                }, null, 8, ["modelValue", "show-seconds", "arrow-control", "hour-step", "minute-step", "second-step", "disabled-time", "use12-hours", "hour-options", "minute-options", "second-options"])) : (_openBlock(), _createElementBlock(
                  _Fragment,
                  { key: 1 },
                  [
                    _createCommentVNode(" \u8303\u56F4\u9009\u62E9\u9762\u677F "),
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("range-panel"))
                      },
                      [
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass($setup.ns.e("range-panel-item"))
                          },
                          [
                            _createElementVNode(
                              "div",
                              {
                                class: _normalizeClass($setup.ns.e("range-panel-title"))
                              },
                              _toDisplayString($props.startPlaceholder || $setup.t("timepicker.startPlaceholder")),
                              3
                              /* TEXT, CLASS */
                            ),
                            _createVNode($setup["TimeSpinner"], {
                              modelValue: $setup.internalStartTimeState,
                              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.internalStartTimeState = $event),
                              "show-seconds": $props.showSeconds,
                              "arrow-control": $props.arrowControl,
                              "hour-step": $props.hourStep,
                              "minute-step": $props.minuteStep,
                              "second-step": $props.secondStep,
                              "disabled-time": $setup.getDisabledStartTime($props.disabledTime),
                              "use12-hours": $props.use12Hours
                            }, null, 8, ["modelValue", "show-seconds", "arrow-control", "hour-step", "minute-step", "second-step", "disabled-time", "use12-hours"])
                          ],
                          2
                          /* CLASS */
                        ),
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass($setup.ns.e("range-panel-separator"))
                          },
                          [..._cache[6] || (_cache[6] = [
                            _createElementVNode(
                              "svg",
                              {
                                viewBox: "0 0 1024 1024",
                                width: "1em",
                                height: "1em"
                              },
                              [
                                _createElementVNode("path", {
                                  fill: "currentColor",
                                  d: "M384 512l256-256v512z"
                                })
                              ],
                              -1
                              /* CACHED */
                            )
                          ])],
                          2
                          /* CLASS */
                        ),
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass($setup.ns.e("range-panel-item"))
                          },
                          [
                            _createElementVNode(
                              "div",
                              {
                                class: _normalizeClass($setup.ns.e("range-panel-title"))
                              },
                              _toDisplayString($props.endPlaceholder || $setup.t("timepicker.endPlaceholder")),
                              3
                              /* TEXT, CLASS */
                            ),
                            _createVNode($setup["TimeSpinner"], {
                              modelValue: $setup.internalEndTimeState,
                              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.internalEndTimeState = $event),
                              "show-seconds": $props.showSeconds,
                              "arrow-control": $props.arrowControl,
                              "hour-step": $props.hourStep,
                              "minute-step": $props.minuteStep,
                              "second-step": $props.secondStep,
                              "disabled-time": $setup.getDisabledEndTime($props.disabledTime),
                              "use12-hours": $props.use12Hours
                            }, null, 8, ["modelValue", "show-seconds", "arrow-control", "hour-step", "minute-step", "second-step", "disabled-time", "use12-hours"])
                          ],
                          2
                          /* CLASS */
                        )
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  64
                  /* STABLE_FRAGMENT */
                )),
                _createCommentVNode(" \u5E95\u90E8\u64CD\u4F5C\u680F "),
                $props.showFooter ? (_openBlock(), _createElementBlock(
                  "div",
                  {
                    key: 2,
                    class: _normalizeClass($setup.ns.e("footer"))
                  },
                  [
                    $props.showNow ? (_openBlock(), _createElementBlock(
                      "button",
                      {
                        key: 0,
                        type: "button",
                        class: _normalizeClass($setup.ns.e("footer-btn")),
                        onClick: $setup.handleNow
                      },
                      _toDisplayString($props.nowText || $setup.t("timepicker.now")),
                      3
                      /* TEXT, CLASS */
                    )) : _createCommentVNode("v-if", true),
                    _createElementVNode(
                      "div",
                      {
                        class: _normalizeClass($setup.ns.e("footer-actions"))
                      },
                      [
                        _createElementVNode(
                          "button",
                          {
                            type: "button",
                            class: _normalizeClass([$setup.ns.e("footer-btn"), $setup.ns.e("footer-btn--cancel")]),
                            onClick: $setup.handleCancel
                          },
                          _toDisplayString($props.cancelText || $setup.t("timepicker.cancel")),
                          3
                          /* TEXT, CLASS */
                        ),
                        _createElementVNode(
                          "button",
                          {
                            type: "button",
                            class: _normalizeClass([$setup.ns.e("footer-btn"), $setup.ns.e("footer-btn--confirm")]),
                            onClick: $setup.handleConfirm
                          },
                          _toDisplayString($props.confirmText || $setup.t("timepicker.confirm")),
                          3
                          /* TEXT, CLASS */
                        )
                      ],
                      2
                      /* CLASS */
                    )
                  ],
                  2
                  /* CLASS */
                )) : _createCommentVNode("v-if", true)
              ],
              38
              /* CLASS, STYLE, NEED_HYDRATION */
            )) : _createCommentVNode("v-if", true)
          ]),
          _: 1
          /* STABLE */
        }, 8, ["name"])
      ], 8, ["disabled"]))
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { computed, ref, nextTick, watch, onMounted, onBeforeUnmount } from "vue";
import { useFormItem, useId, useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { useConfig } from "../../../hooks/use-config/index.js";
import TimeSpinner from "./time-spinner.js";
import { parseTimeValue, formatTimeState, getCurrentTimeState } from "./time-picker-meta.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhTimePicker"
}, {
  __name: "time-picker",
  props: {
    modelValue: { type: [String, Date, Number, null, Array], required: false },
    disabled: { type: Boolean, required: false, default: false },
    editable: { type: Boolean, required: false, default: true },
    clearable: { type: Boolean, required: false, default: true },
    size: { type: String, required: false, default: void 0 },
    placeholder: { type: String, required: false, default: "" },
    startPlaceholder: { type: String, required: false, default: "" },
    endPlaceholder: { type: String, required: false, default: "" },
    name: { type: String, required: false },
    isRange: { type: Boolean, required: false, default: false },
    format: { type: String, required: false, default: "HH:mm:ss" },
    valueFormat: { type: String, required: false },
    prefixIcon: { type: null, required: false },
    clearIcon: { type: null, required: false },
    use12Hours: { type: Boolean, required: false, default: false },
    showSeconds: { type: Boolean, required: false, default: true },
    hourStep: { type: Number, required: false, default: 1 },
    minuteStep: { type: Number, required: false, default: 1 },
    secondStep: { type: Number, required: false, default: 1 },
    disabledTime: { type: Object, required: false },
    popperClass: { type: String, required: false },
    popperStyle: { type: [String, Object], required: false },
    teleported: { type: Boolean, required: false, default: true },
    validateEvent: { type: Boolean, required: false, default: true },
    popperOffset: { type: Number, required: false, default: 4 },
    rangeSeparator: { type: String, required: false, default: "-" },
    defaultValue: { type: [String, Date, Number, null, Array], required: false },
    hourOptions: { type: Array, required: false },
    minuteOptions: { type: Array, required: false },
    secondOptions: { type: Array, required: false },
    hideOnBlur: { type: Boolean, required: false, default: true },
    confirmText: { type: String, required: false, default: "" },
    cancelText: { type: String, required: false, default: "" },
    nowText: { type: String, required: false, default: "" },
    showFooter: { type: Boolean, required: false, default: true },
    showNow: { type: Boolean, required: false, default: true },
    arrowControl: { type: Boolean, required: false, default: false },
    tabindex: { type: [Number, String], required: false, default: 0 },
    id: { type: String, required: false },
    orderOnConfirm: { type: Boolean, required: false, default: false },
    themeOverrides: { type: null, required: false }
  },
  emits: ["update:modelValue", "change", "focus", "blur", "clear", "visible-change", "confirm", "cancel"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("time-picker");
    const { t } = useLocale();
    const inputId = useId();
    const { themeStyle } = useComponentTheme(
      "time-picker",
      computed(() => props.themeOverrides)
    );
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { globalSize } = useConfig();
    const selectSize = computed(
      () => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default"
    );
    const wrapperRef = ref();
    const inputRef = ref();
    const startInputRef = ref();
    const endInputRef = ref();
    const visible = ref(false);
    const focused = ref(false);
    const hovering = ref(false);
    const isClickingPanel = ref(false);
    const internalTimeState = ref({ hours: 0, minutes: 0, seconds: 0 });
    const internalStartTimeState = ref({ hours: 0, minutes: 0, seconds: 0 });
    const internalEndTimeState = ref({ hours: 0, minutes: 0, seconds: 0 });
    const dropdownStyle = ref({});
    const parsedValue = computed(() => {
      if (props.isRange) {
        const rangeValue = props.modelValue;
        if (!rangeValue || !Array.isArray(rangeValue)) return [null, null];
        return [
          parseTimeValue(rangeValue[0], props.format),
          parseTimeValue(rangeValue[1], rangeValue.length > 1 ? props.format : void 0)
        ];
      }
      return parseTimeValue(props.modelValue, props.format);
    });
    const displayValue = computed(() => {
      if (props.isRange) {
        return "";
      }
      return formatTimeState(parsedValue.value, props.format, props.use12Hours);
    });
    const rangeStartDisplayValue = computed(() => {
      if (!props.isRange) return "";
      const [start] = parsedValue.value;
      return formatTimeState(start, props.format, props.use12Hours);
    });
    const rangeEndDisplayValue = computed(() => {
      if (!props.isRange) return "";
      const [, end] = parsedValue.value;
      return formatTimeState(end, props.format, props.use12Hours);
    });
    const hasValue = computed(() => {
      if (props.isRange) {
        const rangeValue = props.modelValue;
        return rangeValue && rangeValue[0] !== null && rangeValue[1] !== null;
      }
      return props.modelValue !== null && props.modelValue !== void 0 && props.modelValue !== "";
    });
    const showClear = computed(
      () => props.clearable && !props.disabled && hasValue.value && (focused.value || hovering.value)
    );
    const wrapperClasses = computed(() => [
      ns.b(),
      ns.m(selectSize.value),
      ns.is("disabled", props.disabled),
      ns.is("focused", focused.value || visible.value),
      ns.is("range", props.isRange)
    ]);
    const updateDropdownPosition = () => {
      if (!wrapperRef.value || !props.teleported) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const panelHeight = 320;
      const showAbove = spaceBelow < panelHeight && rect.top > spaceBelow;
      const styles = window.getComputedStyle(wrapperRef.value);
      const primary = styles.getPropertyValue("--yh-color-primary").trim();
      const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
      dropdownStyle.value = __spreadValues({
        position: "fixed",
        left: `${rect.left}px`,
        minWidth: `${rect.width}px`,
        zIndex: "2000",
        "--yh-color-primary": primary,
        "--yh-color-primary-rgb": primaryRgb
      }, showAbove ? { bottom: `${window.innerHeight - rect.top + props.popperOffset}px` } : { top: `${rect.bottom + props.popperOffset}px` });
    };
    const syncInternalState = () => {
      if (props.isRange) {
        const [start, end] = parsedValue.value;
        internalStartTimeState.value = start || { hours: 0, minutes: 0, seconds: 0 };
        internalEndTimeState.value = end || { hours: 0, minutes: 0, seconds: 0 };
      } else {
        const state = parsedValue.value;
        internalTimeState.value = state || (props.defaultValue ? parseTimeValue(props.defaultValue, props.format) : null) || { hours: 0, minutes: 0, seconds: 0 };
      }
    };
    const getDisabledStartTime = (originalConfig) => {
      if (props.orderOnConfirm || !props.isRange) return originalConfig;
      return __spreadProps(__spreadValues({}, originalConfig), {
        disabledHours: () => {
          var _a;
          return ((_a = originalConfig == null ? void 0 : originalConfig.disabledHours) == null ? void 0 : _a.call(originalConfig)) || [];
        },
        disabledMinutes: (h) => {
          var _a;
          return ((_a = originalConfig == null ? void 0 : originalConfig.disabledMinutes) == null ? void 0 : _a.call(originalConfig, h)) || [];
        },
        disabledSeconds: (h, m) => {
          var _a;
          return ((_a = originalConfig == null ? void 0 : originalConfig.disabledSeconds) == null ? void 0 : _a.call(originalConfig, h, m)) || [];
        }
      });
    };
    const getDisabledEndTime = (originalConfig) => {
      if (props.orderOnConfirm || !props.isRange) return originalConfig;
      return __spreadProps(__spreadValues({}, originalConfig), {
        disabledHours: () => {
          var _a;
          const hours = ((_a = originalConfig == null ? void 0 : originalConfig.disabledHours) == null ? void 0 : _a.call(originalConfig)) || [];
          const startHour = internalStartTimeState.value.hours;
          for (let i = 0; i < startHour; i++) {
            if (!hours.includes(i)) hours.push(i);
          }
          return hours;
        },
        disabledMinutes: (h) => {
          var _a;
          const minutes = ((_a = originalConfig == null ? void 0 : originalConfig.disabledMinutes) == null ? void 0 : _a.call(originalConfig, h)) || [];
          const startHour = internalStartTimeState.value.hours;
          const startMin = internalStartTimeState.value.minutes;
          if (h === startHour) {
            for (let i = 0; i < startMin; i++) {
              if (!minutes.includes(i)) minutes.push(i);
            }
          }
          return minutes;
        },
        disabledSeconds: (h, m) => {
          var _a;
          const seconds = ((_a = originalConfig == null ? void 0 : originalConfig.disabledSeconds) == null ? void 0 : _a.call(originalConfig, h, m)) || [];
          const startHour = internalStartTimeState.value.hours;
          const startMin = internalStartTimeState.value.minutes;
          const startSec = internalStartTimeState.value.seconds;
          if (h === startHour && m === startMin) {
            for (let i = 0; i < startSec; i++) {
              if (!seconds.includes(i)) seconds.push(i);
            }
          }
          return seconds;
        }
      });
    };
    const openPanel = () => {
      if (props.disabled) return;
      visible.value = true;
      syncInternalState();
      if (props.teleported) {
        nextTick(updateDropdownPosition);
      }
      emit("visible-change", true);
    };
    const closePanel = () => {
      visible.value = false;
      emit("visible-change", false);
    };
    const handleConfirm = () => {
      let valueToEmit;
      if (props.isRange) {
        const startSec = internalStartTimeState.value.hours * 3600 + internalStartTimeState.value.minutes * 60 + internalStartTimeState.value.seconds;
        const endSec = internalEndTimeState.value.hours * 3600 + internalEndTimeState.value.minutes * 60 + internalEndTimeState.value.seconds;
        let finalStart = __spreadValues({}, internalStartTimeState.value);
        let finalEnd = __spreadValues({}, internalEndTimeState.value);
        if (startSec > endSec) {
          if (props.orderOnConfirm) {
            finalStart = __spreadValues({}, internalEndTimeState.value);
            finalEnd = __spreadValues({}, internalStartTimeState.value);
          } else {
            return;
          }
        }
        valueToEmit = [
          formatTimeState(finalStart, props.valueFormat || props.format),
          formatTimeState(finalEnd, props.valueFormat || props.format)
        ];
      } else {
        valueToEmit = formatTimeState(internalTimeState.value, props.valueFormat || props.format);
      }
      emit("update:modelValue", valueToEmit);
      emit("change", valueToEmit);
      emit("confirm", valueToEmit);
      if (props.validateEvent) {
        triggerValidate("change");
      }
      closePanel();
    };
    const handleCancel = () => {
      syncInternalState();
      emit("cancel");
      closePanel();
    };
    const handleNow = () => {
      const now = getCurrentTimeState();
      if (props.isRange) {
        internalStartTimeState.value = __spreadValues({}, now);
        internalEndTimeState.value = __spreadValues({}, now);
      } else {
        internalTimeState.value = __spreadValues({}, now);
      }
    };
    const handleClear = (event) => {
      event.stopPropagation();
      const value = props.isRange ? [null, null] : null;
      emit("update:modelValue", value);
      emit("change", value);
      emit("clear");
      if (props.validateEvent) {
        triggerValidate("change");
      }
    };
    const togglePanel = () => {
      if (props.disabled) return;
      if (visible.value) {
        closePanel();
      } else {
        openPanel();
      }
    };
    const handleFocus = (event) => {
      focused.value = true;
      emit("focus", event);
    };
    const handleBlur = (event) => {
      if (isClickingPanel.value) return;
      focused.value = false;
      if (props.hideOnBlur) {
        closePanel();
      }
      emit("blur", event);
      if (props.validateEvent) {
        triggerValidate("blur");
      }
    };
    const handlePanelMousedown = (event) => {
      event.preventDefault();
      isClickingPanel.value = true;
    };
    const handlePanelMouseup = () => {
      setTimeout(() => {
        isClickingPanel.value = false;
      }, 0);
    };
    const handleMouseEnter = () => {
      hovering.value = true;
    };
    const handleMouseLeave = () => {
      hovering.value = false;
    };
    const handleKeydown = (event) => {
      switch (event.key) {
        case "Enter":
          if (visible.value) {
            handleConfirm();
          } else {
            openPanel();
          }
          break;
        case "Escape":
          handleCancel();
          break;
        case "Tab":
          if (visible.value) {
            closePanel();
          }
          break;
      }
    };
    watch(visible, (val) => {
      if (val && props.teleported) {
        nextTick(updateDropdownPosition);
      }
    });
    onMounted(() => {
      if (props.teleported) {
        window.addEventListener("scroll", updateDropdownPosition, true);
        window.addEventListener("resize", updateDropdownPosition);
      }
    });
    onBeforeUnmount(() => {
      if (props.teleported) {
        window.removeEventListener("scroll", updateDropdownPosition, true);
        window.removeEventListener("resize", updateDropdownPosition);
      }
    });
    const focus = () => {
      var _a, _b;
      if (props.isRange) {
        (_a = startInputRef.value) == null ? void 0 : _a.focus();
      } else {
        (_b = inputRef.value) == null ? void 0 : _b.focus();
      }
    };
    const blur = () => {
      var _a, _b, _c;
      if (props.isRange) {
        (_a = startInputRef.value) == null ? void 0 : _a.blur();
        (_b = endInputRef.value) == null ? void 0 : _b.blur();
      } else {
        (_c = inputRef.value) == null ? void 0 : _c.blur();
      }
    };
    __expose({
      focus,
      blur,
      open: openPanel,
      close: closePanel,
      inputRef: inputRef.value
    });
    const __returned__ = { props, emit, ns, t, inputId, themeStyle, form, formItem, triggerValidate, globalSize, selectSize, wrapperRef, inputRef, startInputRef, endInputRef, visible, focused, hovering, isClickingPanel, internalTimeState, internalStartTimeState, internalEndTimeState, dropdownStyle, parsedValue, displayValue, rangeStartDisplayValue, rangeEndDisplayValue, hasValue, showClear, wrapperClasses, updateDropdownPosition, syncInternalState, getDisabledStartTime, getDisabledEndTime, openPanel, closePanel, handleConfirm, handleCancel, handleNow, handleClear, togglePanel, handleFocus, handleBlur, handlePanelMousedown, handlePanelMouseup, handleMouseEnter, handleMouseLeave, handleKeydown, focus, blur, computed, ref, nextTick, watch, onMounted, onBeforeUnmount, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useId() {
      return useId;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
    }, TimeSpinner, get parseTimeValue() {
      return parseTimeValue;
    }, get formatTimeState() {
      return formatTimeState;
    }, get getCurrentTimeState() {
      return getCurrentTimeState;
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
