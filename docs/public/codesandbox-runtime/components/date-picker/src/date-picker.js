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
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, resolveDynamicComponent as _resolveDynamicComponent, openBlock as _openBlock, createBlock as _createBlock, createElementVNode as _createElementVNode, createElementBlock as _createElementBlock, normalizeClass as _normalizeClass, toDisplayString as _toDisplayString, withModifiers as _withModifiers, normalizeProps as _normalizeProps, guardReactiveProps as _guardReactiveProps, withCtx as _withCtx, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle, Transition as _Transition, createVNode as _createVNode } from "vue";
const _hoisted_1 = {
  key: 1,
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em"
};
const _hoisted_2 = ["placeholder", "value"];
const _hoisted_3 = ["placeholder", "value"];
const _hoisted_4 = ["placeholder", "value"];
const _hoisted_5 = {
  key: 1,
  viewBox: "0 0 1024 1024",
  width: "1em",
  height: "1em"
};
const _hoisted_6 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c;
  return _openBlock(), _createElementBlock(
    "div",
    {
      ref: "wrapperRef",
      class: _normalizeClass($setup.wrapperClasses),
      style: _normalizeStyle($setup.themeStyle),
      onClick: $setup.togglePanel,
      onMouseenter: _cache[10] || (_cache[10] = ($event) => $setup.hovering = true),
      onMouseleave: _cache[11] || (_cache[11] = ($event) => $setup.hovering = false)
    },
    [
      _createCommentVNode(" \u8F93\u5165\u6846\u90E8\u5206 "),
      !_ctx.panelOnly ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("wrapper"))
        },
        [
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("icon"))
            },
            [
              _renderSlot(_ctx.$slots, "prefix-icon", {}, () => [
                _ctx.prefixIcon ? (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.prefixIcon), { key: 0 })) : (_openBlock(), _createElementBlock("svg", _hoisted_1, [..._cache[12] || (_cache[12] = [
                  _createElementVNode(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 4H11V16h2z"
                    },
                    null,
                    -1
                    /* CACHED */
                  )
                ])]))
              ])
            ],
            2
            /* CLASS */
          ),
          !$setup.isRange ? (_openBlock(), _createElementBlock("input", {
            key: 0,
            class: _normalizeClass($setup.ns.e("inner")),
            placeholder: (_a = _ctx.placeholder) != null ? _a : $setup.t("datepicker.selectDate"),
            value: $setup.displayValue,
            readonly: ""
          }, null, 10, _hoisted_2)) : (_openBlock(), _createElementBlock(
            "div",
            {
              key: 1,
              class: _normalizeClass($setup.ns.e("range-input-wrapper"))
            },
            [
              _createElementVNode("input", {
                class: _normalizeClass($setup.ns.e("range-input")),
                placeholder: (_b = _ctx.startPlaceholder) != null ? _b : $setup.t("datepicker.startDate"),
                value: $setup.rangeDisplayValue[0],
                readonly: ""
              }, null, 10, _hoisted_3),
              _createElementVNode(
                "span",
                {
                  class: _normalizeClass($setup.ns.e("range-separator"))
                },
                _toDisplayString(_ctx.rangeSeparator),
                3
                /* TEXT, CLASS */
              ),
              _createElementVNode("input", {
                class: _normalizeClass($setup.ns.e("range-input")),
                placeholder: (_c = _ctx.endPlaceholder) != null ? _c : $setup.t("datepicker.endDate"),
                value: $setup.rangeDisplayValue[1],
                readonly: ""
              }, null, 10, _hoisted_4)
            ],
            2
            /* CLASS */
          )),
          _createElementVNode(
            "span",
            {
              class: _normalizeClass($setup.ns.e("suffix"))
            },
            [
              _ctx.clearable && _ctx.modelValue && $setup.hovering && !_ctx.disabled ? (_openBlock(), _createElementBlock(
                "span",
                {
                  key: 0,
                  class: _normalizeClass($setup.ns.e("clear")),
                  onClick: _withModifiers($setup.handleClear, ["stop"])
                },
                [
                  _renderSlot(_ctx.$slots, "clear-icon", {}, () => [
                    _ctx.clearIcon ? (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.clearIcon), { key: 0 })) : (_openBlock(), _createElementBlock("svg", _hoisted_5, [..._cache[13] || (_cache[13] = [
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
                    ])]))
                  ])
                ],
                2
                /* CLASS */
              )) : _createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true),
      _createCommentVNode(" \u5F39\u7A97\u9762\u677F "),
      (_openBlock(), _createBlock(_resolveDynamicComponent(_ctx.panelOnly ? "div" : "Teleport"), {
        to: "body",
        disabled: !_ctx.teleported || _ctx.panelOnly
      }, {
        default: _withCtx(() => [
          _createVNode(_Transition, {
            name: _ctx.panelOnly ? "" : $setup.ns.b("panel")
          }, {
            default: _withCtx(() => [
              $setup.visible ? (_openBlock(), _createElementBlock(
                "div",
                {
                  key: 0,
                  class: _normalizeClass([$setup.ns.e("panel"), _ctx.popperClass, $setup.ns.is("plain", _ctx.panelOnly)]),
                  style: _normalizeStyle(!_ctx.panelOnly && _ctx.teleported ? $setup.dropdownStyle : {}),
                  onClick: _cache[9] || (_cache[9] = _withModifiers(() => {
                  }, ["stop"]))
                },
                [
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("header"))
                    },
                    [
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("header-group"))
                        },
                        [
                          _createElementVNode(
                            "button",
                            {
                              class: _normalizeClass([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "double-left")]),
                              onClick: _cache[0] || (_cache[0] = ($event) => $setup.moveYear(-1))
                            },
                            " \xAB ",
                            2
                            /* CLASS */
                          ),
                          $setup.currentView === "date" ? (_openBlock(), _createElementBlock(
                            "button",
                            {
                              key: 0,
                              class: _normalizeClass([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "left")]),
                              onClick: _cache[1] || (_cache[1] = ($event) => $setup.moveMonth(-1))
                            },
                            " \u2039 ",
                            2
                            /* CLASS */
                          )) : _createCommentVNode("v-if", true)
                        ],
                        2
                        /* CLASS */
                      ),
                      _createElementVNode(
                        "span",
                        {
                          class: _normalizeClass($setup.ns.e("header-label")),
                          onClick: $setup.handleHeaderClick
                        },
                        _toDisplayString($setup.headerLabel),
                        3
                        /* TEXT, CLASS */
                      ),
                      _createElementVNode(
                        "div",
                        {
                          class: _normalizeClass($setup.ns.e("header-group"))
                        },
                        [
                          $setup.currentView === "date" ? (_openBlock(), _createElementBlock(
                            "button",
                            {
                              key: 0,
                              class: _normalizeClass([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "right")]),
                              onClick: _cache[2] || (_cache[2] = ($event) => $setup.moveMonth(1))
                            },
                            " \u203A ",
                            2
                            /* CLASS */
                          )) : _createCommentVNode("v-if", true),
                          _createElementVNode(
                            "button",
                            {
                              class: _normalizeClass([$setup.ns.e("header-btns"), $setup.ns.em("header-btns", "double-right")]),
                              onClick: _cache[3] || (_cache[3] = ($event) => $setup.moveYear(1))
                            },
                            " \xBB ",
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
                  _createElementVNode(
                    "div",
                    {
                      class: _normalizeClass($setup.ns.e("content"))
                    },
                    [
                      $setup.currentView === "date" ? (_openBlock(), _createBlock($setup["DateTable"], {
                        key: 0,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "selection-mode": _ctx.type === "week" ? "week" : "date",
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "first-day-of-week": _ctx.firstDayOfWeek,
                        "cell-shape": _ctx.cellShape,
                        "cell-render": _ctx.cellRender,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[4] || (_cache[4] = (val) => $setup.rangeHoverDate = val)
                      }, {
                        "date-cell": _withCtx((slotProps) => [
                          _renderSlot(_ctx.$slots, "date-cell", _normalizeProps(_guardReactiveProps(slotProps)))
                        ]),
                        _: 3
                        /* FORWARDED */
                      }, 8, ["date", "selected-date", "selection-mode", "range-state", "disabled-date", "first-day-of-week", "cell-shape", "cell-render"])) : $setup.currentView === "month" ? (_openBlock(), _createBlock($setup["MonthTable"], {
                        key: 1,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[5] || (_cache[5] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : $setup.currentView === "year" ? (_openBlock(), _createBlock($setup["YearTable"], {
                        key: 2,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[6] || (_cache[6] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : $setup.currentView === "quarter" ? (_openBlock(), _createBlock($setup["QuarterTable"], {
                        key: 3,
                        date: $setup.innerDate,
                        "selected-date": $setup.parsedSelectedDate,
                        "range-state": $setup.parsedRangeState,
                        "disabled-date": _ctx.disabledDate,
                        "cell-shape": _ctx.cellShape,
                        onSelect: $setup.handleSelect,
                        onHover: _cache[7] || (_cache[7] = (val) => $setup.rangeHoverDate = val)
                      }, null, 8, ["date", "selected-date", "range-state", "disabled-date", "cell-shape"])) : _createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  _ctx.$slots.extra ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("extra"))
                    },
                    [
                      _renderSlot(_ctx.$slots, "extra")
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true),
                  _ctx.presets.length > 0 ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 1,
                      class: _normalizeClass($setup.ns.e("presets"))
                    },
                    [
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(_ctx.presets, (p) => {
                          return _openBlock(), _createElementBlock("button", {
                            key: p.label,
                            class: _normalizeClass($setup.ns.e("preset-item")),
                            onClick: ($event) => $setup.handleSelect(typeof p.value === "function" ? p.value() : p.value)
                          }, _toDisplayString(p.label), 11, _hoisted_6);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true),
                  $setup.shouldShowFooter ? (_openBlock(), _createElementBlock(
                    "div",
                    {
                      key: 2,
                      class: _normalizeClass($setup.ns.e("footer"))
                    },
                    [
                      _renderSlot(_ctx.$slots, "footer", {}, () => [
                        _ctx.type.includes("datetime") && !$setup.isRange ? (_openBlock(), _createElementBlock(
                          "div",
                          {
                            key: 0,
                            class: _normalizeClass($setup.ns.e("footer-time"))
                          },
                          _toDisplayString($setup.dayjs(_ctx.modelValue || /* @__PURE__ */ new Date()).format($setup.props.timeFormat || "HH:mm:ss")),
                          3
                          /* TEXT, CLASS */
                        )) : _createCommentVNode("v-if", true),
                        _createElementVNode(
                          "div",
                          {
                            class: _normalizeClass($setup.ns.e("footer-btns"))
                          },
                          [
                            $setup.isRange || _ctx.type.includes("datetime") ? (_openBlock(), _createElementBlock(
                              "button",
                              {
                                key: 0,
                                class: _normalizeClass($setup.ns.e("footer-btn")),
                                onClick: _cache[8] || (_cache[8] = ($event) => $setup.visible = false)
                              },
                              _toDisplayString($setup.t("datepicker.cancel")),
                              3
                              /* TEXT, CLASS */
                            )) : _createCommentVNode("v-if", true),
                            _createElementVNode(
                              "button",
                              {
                                class: _normalizeClass([$setup.ns.e("footer-btn"), $setup.ns.e("footer-btn--confirm")]),
                                onClick: $setup.handleConfirmClick
                              },
                              _toDisplayString($setup.t("datepicker.confirm")),
                              3
                              /* TEXT, CLASS */
                            )
                          ],
                          2
                          /* CLASS */
                        )
                      ])
                    ],
                    2
                    /* CLASS */
                  )) : _createCommentVNode("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              )) : _createCommentVNode("v-if", true)
            ]),
            _: 3
            /* FORWARDED */
          }, 8, ["name"])
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["disabled"]))
    ],
    38
    /* CLASS, STYLE, NEED_HYDRATION */
  );
}
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useFormItem, useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import { useConfig } from "../../../hooks/use-config/index.js";
import DateTable from "./date-table.js";
import MonthTable from "./month-table.js";
import YearTable from "./year-table.js";
import QuarterTable from "./quarter-table.js";
import {
  datePickerProps
} from "./date-picker-meta.js";
import { DEFAULT_FORMATS, formatDate } from "./panel-utils.js";
import dayjs from "../../dayjs.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhDatePicker"
}, {
  __name: "date-picker",
  props: datePickerProps,
  emits: ["update:modelValue", "change", "focus", "blur", "clear", "confirm", "panel-change", "visible-change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    __expose();
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("date-picker");
    const { t, locale } = useLocale();
    const { form, formItem, validate: triggerValidate } = useFormItem();
    const { globalSize } = useConfig();
    const { themeStyle } = useComponentTheme(
      "date-picker",
      computed(() => props.themeOverrides)
    );
    const visible = ref(props.panelOnly);
    const hovering = ref(false);
    const getInitialView = (type) => {
      if (type.includes("year")) return "year";
      if (type.includes("month")) return "month";
      if (type.includes("quarter")) return "quarter";
      if (type === "week") return "date";
      return "date";
    };
    const currentView = ref(getInitialView(props.type));
    const innerDate = ref(/* @__PURE__ */ new Date());
    const rangeHoverDate = ref(null);
    const wrapperRef = ref();
    const isRange = computed(() => props.type.includes("range"));
    const selectSize = computed(
      () => props.size || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalSize.value || "default"
    );
    const getFormat = () => {
      if (props.format) return props.format;
      return DEFAULT_FORMATS[props.type] || "YYYY-MM-DD";
    };
    const displayValue = computed(() => {
      if (isRange.value) return "";
      if (!props.modelValue || props.modelValue === "") return "";
      const dateVal = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
      if (!dateVal) return "";
      const result = formatDate(dateVal, getFormat());
      return result === "Invalid Date" ? "" : result;
    });
    const rangeDisplayValue = computed(() => {
      if (!isRange.value || !Array.isArray(props.modelValue)) return ["", ""];
      const fmt = getFormat();
      const [start, end] = props.modelValue;
      return [start ? formatDate(start, fmt) : "", end ? formatDate(end, fmt) : ""];
    });
    const parsedSelectedDate = computed(() => {
      const val = props.modelValue;
      if (val === "" || val === null || val === void 0) return null;
      if (Array.isArray(val)) {
        return val.map((v) => v && v !== "" ? dayjs(v).toDate() : null).filter((v) => v !== null);
      }
      const d = dayjs(val);
      return d.isValid() ? d.toDate() : null;
    });
    const parsedRangeState = computed(() => {
      if (!isRange.value) return void 0;
      const val = props.modelValue;
      const from = Array.isArray(val) && val[0] ? dayjs(val[0]).toDate() : null;
      const to = Array.isArray(val) && val[1] ? dayjs(val[1]).toDate() : null;
      return {
        from,
        to,
        hovering: rangeHoverDate.value
      };
    });
    const wrapperClasses = computed(() => [
      ns.b(),
      ns.m(selectSize.value),
      ns.is("disabled", props.disabled),
      ns.is("focused", visible.value),
      ns.is("range", isRange.value),
      ns.is("panel-only", props.panelOnly),
      ns.m(props.status)
    ]);
    const monthKeys = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec"
    ];
    const headerLabel = computed(() => {
      const d = dayjs(innerDate.value);
      const dateLocale = locale.value.yh.datepicker;
      if (currentView.value === "year") {
        const start = Math.floor(d.year() / 10) * 10;
        return `${start} - ${start + 9}`;
      }
      if (currentView.value === "month" || currentView.value === "quarter") {
        return dateLocale.monthBeforeYear ? d.format("YYYY") : `${d.year()}${dateLocale.year || ""}`;
      }
      const monthName = dateLocale.months[monthKeys[d.month()]];
      if (!dateLocale.monthBeforeYear) {
        return `${d.year()}${dateLocale.year || ""}${monthName}`;
      }
      return `${monthName} ${d.year()}`;
    });
    const moveMonth = (offset) => {
      innerDate.value = dayjs(innerDate.value).add(offset, "month").toDate();
    };
    const moveYear = (offset) => {
      const step = currentView.value === "year" ? 10 : 1;
      innerDate.value = dayjs(innerDate.value).add(offset * step, "year").toDate();
    };
    const handleHeaderClick = () => {
      if (currentView.value === "date") currentView.value = "month";
      else if (currentView.value === "month") currentView.value = "year";
    };
    const emitChange = (val) => {
      const fmt = props.valueFormat || "";
      let result = val;
      if (fmt && val) {
        if (Array.isArray(val)) {
          result = [val[0] ? formatDate(val[0], fmt) : null, val[1] ? formatDate(val[1], fmt) : null];
        } else {
          result = formatDate(val, fmt);
        }
      }
      emit("update:modelValue", result);
      emit("change", result);
      if (props.validateEvent) triggerValidate("change");
    };
    const handleSelect = (val) => {
      if (Array.isArray(val)) {
        if (isRange.value) emitChange([val[0], val[1]]);
        else emitChange(val[0]);
        if (!props.panelOnly) visible.value = false;
        return;
      }
      let targetDate;
      if (typeof val === "number") {
        if (currentView.value === "year") {
          targetDate = dayjs(innerDate.value).year(val).toDate();
          if (props.type.includes("year")) {
            performFinalSelect(targetDate);
          } else {
            innerDate.value = targetDate;
            currentView.value = "month";
          }
        } else if (currentView.value === "month") {
          targetDate = dayjs(innerDate.value).month(val).toDate();
          if (props.type.includes("month")) {
            performFinalSelect(targetDate);
          } else {
            innerDate.value = targetDate;
            currentView.value = "date";
          }
        } else if (currentView.value === "quarter") {
          targetDate = dayjs(innerDate.value).month((val - 1) * 3).toDate();
          performFinalSelect(targetDate);
        }
      } else {
        performFinalSelect(val);
      }
    };
    const performFinalSelect = (date) => {
      if (isRange.value) {
        const current = props.modelValue || [null, null];
        if (!current[0] || current[0] && current[1]) {
          emit("update:modelValue", [date, null]);
        } else {
          let start = dayjs(current[0]).toDate();
          let end = date;
          if (dayjs(end).isBefore(dayjs(start))) {
            if (props.orderOnConfirm) [start, end] = [end, start];
            else {
              start = date;
              end = null;
            }
          }
          emitChange([start, end]);
          if (end && !props.panelOnly) visible.value = false;
        }
      } else {
        emitChange(date);
        if (!props.panelOnly && !props.type.includes("datetime")) {
          visible.value = false;
        }
      }
    };
    const dropdownStyle = ref({});
    const updatePosition = () => {
      if (!wrapperRef.value || !props.teleported || props.panelOnly) return;
      const rect = wrapperRef.value.getBoundingClientRect();
      const styles = window.getComputedStyle(wrapperRef.value);
      const primary = styles.getPropertyValue("--yh-color-primary").trim();
      const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
      const primaryLight9 = styles.getPropertyValue("--yh-color-primary-light-9").trim();
      dropdownStyle.value = __spreadProps(__spreadValues({}, themeStyle.value), {
        position: "fixed",
        top: `${rect.bottom + 4}px`,
        left: `${rect.left}px`,
        zIndex: "2000",
        "--yh-color-primary": primary,
        "--yh-color-primary-rgb": primaryRgb,
        "--yh-color-primary-light-9": primaryLight9
      });
    };
    const syncInnerDate = () => {
      const modelVal = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue;
      const defaultVal = Array.isArray(props.defaultValue) ? props.defaultValue[0] : props.defaultValue;
      if (modelVal && dayjs(modelVal).isValid()) {
        innerDate.value = dayjs(modelVal).toDate();
      } else if (defaultVal && dayjs(defaultVal).isValid()) {
        innerDate.value = dayjs(defaultVal).toDate();
      } else {
        innerDate.value = /* @__PURE__ */ new Date();
      }
    };
    watch(visible, (val) => {
      if (val) {
        currentView.value = getInitialView(props.type);
        updatePosition();
        syncInnerDate();
      }
    });
    const handleClear = (e) => {
      e.stopPropagation();
      emitChange(null);
      emit("clear");
    };
    const togglePanel = (e) => {
      if (props.disabled || props.readonly || props.panelOnly) return;
      if (e) e.stopPropagation();
      visible.value = !visible.value;
    };
    const handleOutsideClick = (e) => {
      var _a;
      if (!visible.value || props.panelOnly) return;
      const target = e.target;
      if ((_a = wrapperRef.value) == null ? void 0 : _a.contains(target)) return;
      const poppers = document.querySelectorAll(`.${ns.e("panel")}`);
      for (const p of poppers) {
        if (p.contains(target)) return;
      }
      visible.value = false;
    };
    const shouldShowFooter = computed(() => {
      if (props.showFooter === false) return false;
      return props.type.includes("datetime") || isRange.value || props.presets.length > 0;
    });
    const handleConfirmClick = () => {
      emit("confirm", props.modelValue);
      visible.value = false;
    };
    onMounted(() => {
      syncInnerDate();
      if (!props.panelOnly) {
        window.addEventListener("click", handleOutsideClick, true);
        if (props.teleported) {
          window.addEventListener("scroll", updatePosition, true);
          window.addEventListener("resize", updatePosition);
        }
      }
    });
    onBeforeUnmount(() => {
      window.removeEventListener("click", handleOutsideClick, true);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    });
    const __returned__ = { props, emit, ns, t, locale, form, formItem, triggerValidate, globalSize, themeStyle, visible, hovering, getInitialView, currentView, innerDate, rangeHoverDate, wrapperRef, isRange, selectSize, getFormat, displayValue, rangeDisplayValue, parsedSelectedDate, parsedRangeState, wrapperClasses, monthKeys, headerLabel, moveMonth, moveYear, handleHeaderClick, emitChange, handleSelect, performFinalSelect, dropdownStyle, updatePosition, syncInnerDate, handleClear, togglePanel, handleOutsideClick, shouldShowFooter, handleConfirmClick, ref, computed, watch, onMounted, onBeforeUnmount, get useNamespace() {
      return useNamespace;
    }, get useFormItem() {
      return useFormItem;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get useConfig() {
      return useConfig;
    }, DateTable, MonthTable, YearTable, QuarterTable, get datePickerProps() {
      return datePickerProps;
    }, get DEFAULT_FORMATS() {
      return DEFAULT_FORMATS;
    }, get formatDate() {
      return formatDate;
    }, get dayjs() {
      return dayjs;
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
