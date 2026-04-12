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
import { createCommentVNode as _createCommentVNode, renderSlot as _renderSlot, toDisplayString as _toDisplayString, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, createElementVNode as _createElementVNode, withCtx as _withCtx, createVNode as _createVNode, openBlock as _openBlock, createElementBlock as _createElementBlock, renderList as _renderList, Fragment as _Fragment, normalizeStyle as _normalizeStyle } from "vue";
const _hoisted_1 = ["onClick", "onMouseenter"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return _openBlock(), _createElementBlock(
    "div",
    {
      class: _normalizeClass($setup.rootClass),
      style: _normalizeStyle($setup.themeStyle)
    },
    [
      _createCommentVNode(" \u9876\u680F "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("header"))
        },
        [
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("title"))
            },
            [
              _renderSlot(_ctx.$slots, "header", { date: $setup.title }, () => [
                _createTextVNode(
                  _toDisplayString($setup.title),
                  1
                  /* TEXT */
                )
              ])
            ],
            2
            /* CLASS */
          ),
          _createElementVNode(
            "div",
            {
              class: _normalizeClass($setup.ns.e("controls"))
            },
            [
              _createElementVNode(
                "div",
                {
                  class: _normalizeClass($setup.ns.e("nav-group"))
                },
                [
                  _createVNode($setup["YhButton"], {
                    class: "yh-calendar__nav-btn",
                    size: "small",
                    onClick: _cache[0] || (_cache[0] = ($event) => $setup.moveMonth(-1))
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString($setup.t("calendar.prevMonth")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  _createVNode($setup["YhButton"], {
                    class: "yh-calendar__nav-btn yh-calendar__nav-btn--today",
                    size: "small",
                    onClick: $setup.goToday
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString($setup.t("calendar.today")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  _createVNode($setup["YhButton"], {
                    class: "yh-calendar__nav-btn",
                    size: "small",
                    onClick: _cache[1] || (_cache[1] = ($event) => $setup.moveMonth(1))
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(
                        _toDisplayString($setup.t("calendar.nextMonth")),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ],
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
      _createCommentVNode(" \u8868\u8EAB "),
      _createElementVNode(
        "div",
        {
          class: _normalizeClass($setup.ns.e("body"))
        },
        [
          _createElementVNode(
            "table",
            {
              class: _normalizeClass($setup.ns.e("table"))
            },
            [
              _createElementVNode("thead", null, [
                _createElementVNode("tr", null, [
                  _ctx.showWeekNumber ? (_openBlock(), _createElementBlock(
                    "th",
                    {
                      key: 0,
                      class: _normalizeClass($setup.ns.e("week-number-header"))
                    },
                    _toDisplayString($setup.t("calendar.week")),
                    3
                    /* TEXT, CLASS */
                  )) : _createCommentVNode("v-if", true),
                  (_openBlock(true), _createElementBlock(
                    _Fragment,
                    null,
                    _renderList($setup.weekDays, (day, idx) => {
                      return _openBlock(), _createElementBlock(
                        "th",
                        {
                          key: day,
                          class: _normalizeClass([$setup.ns.e("weekday"), {
                            [$setup.ns.em("weekday", "weekend")]: _ctx.highlightWeekends && (idx === 0 || idx === 6)
                          }])
                        },
                        _toDisplayString(day),
                        3
                        /* TEXT, CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ]),
              _createElementVNode("tbody", null, [
                (_openBlock(true), _createElementBlock(
                  _Fragment,
                  null,
                  _renderList($setup.rows, (row, rowIndex) => {
                    return _openBlock(), _createElementBlock("tr", { key: rowIndex }, [
                      _ctx.showWeekNumber ? (_openBlock(), _createElementBlock(
                        "td",
                        {
                          key: 0,
                          class: _normalizeClass($setup.ns.e("week-number"))
                        },
                        _toDisplayString(row.weekNumber),
                        3
                        /* TEXT, CLASS */
                      )) : _createCommentVNode("v-if", true),
                      (_openBlock(true), _createElementBlock(
                        _Fragment,
                        null,
                        _renderList(row.cells, (cell, cellIndex) => {
                          return _openBlock(), _createElementBlock("td", {
                            key: cellIndex,
                            class: _normalizeClass([$setup.ns.e("day"), $setup.ns.is("today", cell.isToday), $setup.ns.is("selected", cell.isSelected), $setup.ns.is("disabled", cell.isDisabled), $setup.ns.is("weekend", _ctx.highlightWeekends && cell.isWeekend), $setup.ns.is("holiday", cell.isHoliday), $setup.ns.is("workday", cell.isWorkday), $setup.ns.is("in-range", cell.isInRange), $setup.ns.is("range-start", cell.isRangeStart), $setup.ns.is("range-end", cell.isRangeEnd), $setup.ns.is("other-month", cell.type !== "current-month"), $setup.ns.is("hidden", !_ctx.showOtherMonths && cell.type !== "current-month"), $setup.ns.is(cell.type, true), $setup.getCellExtraClass(cell)]),
                            onClick: ($event) => $setup.selectDate(cell),
                            onMouseenter: ($event) => $setup.handleCellHover(cell)
                          }, [
                            _createElementVNode(
                              "div",
                              {
                                class: _normalizeClass($setup.ns.e("day-inner"))
                              },
                              [
                                _createCommentVNode(" \u65E5\u671F\u6570\u5B57 "),
                                _createElementVNode(
                                  "div",
                                  {
                                    class: _normalizeClass($setup.ns.e("day-value"))
                                  },
                                  _toDisplayString(cell.day),
                                  3
                                  /* TEXT, CLASS */
                                ),
                                _createCommentVNode(" \u5047\u671F/\u8865\u73ED\u6807\u8BB0 "),
                                _ctx.showHoliday && (cell.isHoliday || cell.isWorkday) ? (_openBlock(), _createElementBlock(
                                  "div",
                                  {
                                    key: 0,
                                    class: _normalizeClass([$setup.ns.e("day-badge"), cell.isHoliday ? $setup.ns.em("day-badge", "holiday") : $setup.ns.em("day-badge", "workday")])
                                  },
                                  _toDisplayString(cell.isHoliday ? $setup.t("calendar.holiday") : $setup.t("calendar.workday")),
                                  3
                                  /* TEXT, CLASS */
                                )) : _createCommentVNode("v-if", true),
                                _createCommentVNode(" \u81EA\u5B9A\u4E49\u5185\u5BB9\u63D2\u69FD "),
                                _createElementVNode(
                                  "div",
                                  {
                                    class: _normalizeClass($setup.ns.e("day-content"))
                                  },
                                  [
                                    _renderSlot(_ctx.$slots, "date-cell", {
                                      data: $setup.getSlotData(cell)
                                    })
                                  ],
                                  2
                                  /* CLASS */
                                )
                              ],
                              2
                              /* CLASS */
                            )
                          ], 42, _hoisted_1);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      ),
      _createCommentVNode(" \u5E95\u90E8\u63D2\u69FD "),
      _ctx.$slots.footer ? (_openBlock(), _createElementBlock(
        "div",
        {
          key: 0,
          class: _normalizeClass($setup.ns.e("footer"))
        },
        [
          _renderSlot(_ctx.$slots, "footer")
        ],
        2
        /* CLASS */
      )) : _createCommentVNode("v-if", true)
    ],
    6
    /* CLASS, STYLE */
  );
}
import { ref, computed, watch, onMounted } from "vue";
import dayjs from "../../dayjs.js";
import isoWeekPluginModule from "dayjs/plugin/isoWeek.js";
import { useLocale } from "../../../hooks/index.js";
import { useNamespace } from "../../../hooks/use-namespace/index.js";
import { useComponentTheme } from "../../../theme/component-theme.js";
import {
  calendarProps,
  calendarEmits,
  DEFAULT_CHINA_HOLIDAYS_2026
} from "./calendar-meta.js";
import { YhButton } from "../../button/index.js";
const __sfc__ = /* @__PURE__ */ Object.assign({
  name: "YhCalendar"
}, {
  __name: "calendar",
  props: calendarProps,
  emits: calendarEmits,
  setup(__props, { expose: __expose, emit: __emit }) {
    var _a, _b, _c;
    dayjs.extend(isoWeekPluginModule);
    const props = __props;
    const emit = __emit;
    const ns = useNamespace("calendar");
    const { t, locale } = useLocale();
    const { themeStyle } = useComponentTheme(
      "calendar",
      computed(() => props.themeOverrides)
    );
    const now = dayjs();
    const displayDate = ref(props.modelValue ? dayjs(props.modelValue) : now);
    const selectedDate = ref(props.modelValue ? dayjs(props.modelValue) : void 0);
    const rangeStart = ref(
      ((_a = props.rangeValue) == null ? void 0 : _a[0]) ? dayjs(props.rangeValue[0]) : void 0
    );
    const rangeEnd = ref(
      ((_b = props.rangeValue) == null ? void 0 : _b[1]) ? dayjs(props.rangeValue[1]) : void 0
    );
    const hoverDate = ref(void 0);
    const multipleSelected = ref(((_c = props.multipleValue) == null ? void 0 : _c.map((d) => dayjs(d))) || []);
    const mergedHolidays = computed(() => {
      if (props.showHoliday) {
        return __spreadValues(__spreadValues({}, DEFAULT_CHINA_HOLIDAYS_2026), props.holidays);
      }
      return props.holidays;
    });
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
    const title = computed(() => {
      var _a2, _b2;
      if (props.monthHeaderFormat) {
        return displayDate.value.format(props.monthHeaderFormat);
      }
      const calendarLocale = (_a2 = locale.value.yh) == null ? void 0 : _a2.calendar;
      if (calendarLocale == null ? void 0 : calendarLocale.monthHeaderFormat) {
        return displayDate.value.format(calendarLocale.monthHeaderFormat);
      }
      const dateLocale = (_b2 = locale.value.yh) == null ? void 0 : _b2.datepicker;
      if (dateLocale) {
        const monthName = dateLocale.months[monthKeys[displayDate.value.month()]];
        const year = displayDate.value.year();
        if (!dateLocale.monthBeforeYear && dateLocale.year) {
          return `${year}${dateLocale.year}${monthName}`;
        }
        return dateLocale.monthBeforeYear ? `${monthName} ${year}` : `${year} ${dateLocale.year} ${monthName}`;
      }
      return displayDate.value.format("YYYY-MM");
    });
    const weekDays = computed(() => {
      const days = [
        t("calendar.weeks.sun"),
        t("calendar.weeks.mon"),
        t("calendar.weeks.tue"),
        t("calendar.weeks.wed"),
        t("calendar.weeks.thu"),
        t("calendar.weeks.fri"),
        t("calendar.weeks.sat")
      ];
      const start = props.firstDayOfWeek % 7;
      return [...days.slice(start), ...days.slice(0, start)];
    });
    const isDateDisabled = (date) => {
      if (props.disabled) return true;
      if (props.disabledDate && props.disabledDate(date.toDate())) return true;
      if (props.minDate && date.isBefore(dayjs(props.minDate), "day")) return true;
      if (props.maxDate && date.isAfter(dayjs(props.maxDate), "day")) return true;
      return false;
    };
    const isWeekend = (date) => {
      const day = date.day();
      return day === 0 || day === 6;
    };
    const isInRange = (date) => {
      if (props.selectionMode !== "range") return false;
      const start = rangeStart.value;
      const end = rangeEnd.value || hoverDate.value;
      if (!start || !end) return false;
      const min = start.isBefore(end) ? start : end;
      const max = start.isBefore(end) ? end : start;
      return date.isAfter(min, "day") && date.isBefore(max, "day");
    };
    const isMultipleSelected = (date) => {
      if (props.selectionMode !== "multiple") return false;
      return multipleSelected.value.some((d) => d.isSame(date, "day"));
    };
    const rows = computed(() => {
      var _a2, _b2;
      const date = displayDate.value;
      const firstDay = date.startOf("month");
      const weekday = firstDay.day();
      const offset = (weekday - props.firstDayOfWeek % 7 + 7) % 7;
      let current = firstDay.subtract(offset, "day");
      const matrix = [];
      for (let i = 0; i < 6; i++) {
        const weekNumber = current.isoWeek();
        const row = [];
        for (let j = 0; j < 7; j++) {
          const dateStr = current.format("YYYY-MM-DD");
          const holidayInfo = mergedHolidays.value[dateStr];
          const isCurrentMonth = current.isSame(displayDate.value, "month");
          const isTodayDate = current.isSame(now, "day");
          const disabled = isDateDisabled(current);
          let isSelected = false;
          if (props.selectionMode === "single") {
            isSelected = selectedDate.value ? current.isSame(selectedDate.value, "day") : false;
          } else if (props.selectionMode === "multiple") {
            isSelected = isMultipleSelected(current);
          } else if (props.selectionMode === "range") {
            isSelected = rangeStart.value && current.isSame(rangeStart.value, "day") || rangeEnd.value && current.isSame(rangeEnd.value, "day") || false;
          }
          const cell = {
            date: current,
            day: current.date(),
            type: getDayType(current),
            isCurrent: isCurrentMonth,
            isToday: isTodayDate,
            isSelected,
            isDisabled: disabled,
            isWeekend: isWeekend(current),
            isHoliday: (holidayInfo == null ? void 0 : holidayInfo.isOffDay) === true,
            holidayName: holidayInfo == null ? void 0 : holidayInfo.name,
            isWorkday: (holidayInfo == null ? void 0 : holidayInfo.isOffDay) === false,
            isInRange: isInRange(current),
            isRangeStart: props.selectionMode === "range" && ((_a2 = rangeStart.value) == null ? void 0 : _a2.isSame(current, "day")),
            isRangeEnd: props.selectionMode === "range" && ((_b2 = rangeEnd.value) == null ? void 0 : _b2.isSame(current, "day")),
            dateStr
          };
          row.push(cell);
          current = current.add(1, "day");
        }
        matrix.push({ weekNumber, cells: row });
      }
      return matrix;
    });
    function getDayType(date) {
      if (date.isBefore(displayDate.value, "month")) return "prev-month";
      if (date.isAfter(displayDate.value, "month")) return "next-month";
      return "current-month";
    }
    const selectDate = (cell) => {
      if (props.readonly || cell.isDisabled) return;
      const date = cell.date;
      if (!props.showOtherMonths && cell.type !== "current-month") return;
      if (props.selectionMode === "single") {
        const oldDate = selectedDate.value;
        selectedDate.value = date;
        if (!date.isSame(displayDate.value, "month")) {
          displayDate.value = date;
        }
        emit("update:modelValue", date.toDate());
        emit("select", date.toDate(), cell);
        if (!oldDate || !date.isSame(oldDate, "day")) {
          emit("change", date.toDate());
        }
      } else if (props.selectionMode === "range") {
        if (!rangeStart.value || rangeStart.value && rangeEnd.value) {
          rangeStart.value = date;
          rangeEnd.value = void 0;
        } else {
          if (date.isBefore(rangeStart.value)) {
            rangeEnd.value = rangeStart.value;
            rangeStart.value = date;
          } else {
            rangeEnd.value = date;
          }
          emit("update:rangeValue", [rangeStart.value.toDate(), rangeEnd.value.toDate()]);
          emit("range-change", [rangeStart.value.toDate(), rangeEnd.value.toDate()]);
        }
        emit("select", date.toDate(), cell);
      } else if (props.selectionMode === "multiple") {
        const idx = multipleSelected.value.findIndex((d) => d.isSame(date, "day"));
        if (idx > -1) {
          multipleSelected.value.splice(idx, 1);
        } else {
          multipleSelected.value.push(date);
        }
        emit(
          "update:multipleValue",
          multipleSelected.value.map((d) => d.toDate())
        );
        emit("select", date.toDate(), cell);
      }
    };
    const handleCellHover = (cell) => {
      if (props.selectionMode === "range" && rangeStart.value && !rangeEnd.value) {
        hoverDate.value = cell.date;
      }
    };
    const moveMonth = (delta) => {
      displayDate.value = displayDate.value.add(delta, "month");
      emit("panel-change", displayDate.value.toDate(), props.mode);
    };
    const goToday = () => {
      displayDate.value = now;
      if (props.selectionMode === "single" && !props.readonly && !props.disabled) {
        const todayCell = rows.value.flatMap((r) => r.cells).find((c) => c.isToday);
        if (todayCell && !todayCell.isDisabled) {
          selectDate(todayCell);
        }
      }
    };
    watch(
      () => props.modelValue,
      (val) => {
        if (val) {
          const d = dayjs(val);
          selectedDate.value = d;
          displayDate.value = d;
        }
      }
    );
    watch(
      () => props.rangeValue,
      (val) => {
        if (val) {
          rangeStart.value = val[0] ? dayjs(val[0]) : void 0;
          rangeEnd.value = val[1] ? dayjs(val[1]) : void 0;
        }
      }
    );
    watch(
      () => props.multipleValue,
      (val) => {
        multipleSelected.value = (val == null ? void 0 : val.map((d) => dayjs(d))) || [];
      }
    );
    onMounted(() => {
      if (props.defaultValue && !props.modelValue) {
        selectedDate.value = dayjs(props.defaultValue);
        displayDate.value = dayjs(props.defaultValue);
      }
    });
    const getSlotData = (cell) => {
      return {
        isSelected: cell.isSelected,
        type: cell.type,
        day: cell.dateStr,
        date: cell.date.toDate(),
        isToday: cell.isToday,
        isDisabled: cell.isDisabled,
        isWeekend: cell.isWeekend,
        isHoliday: cell.isHoliday,
        holidayName: cell.holidayName,
        isWorkday: cell.isWorkday,
        isInRange: cell.isInRange,
        isRangeStart: cell.isRangeStart,
        isRangeEnd: cell.isRangeEnd
      };
    };
    const getCellExtraClass = (cell) => {
      if (props.cellClassName) {
        return props.cellClassName(cell.date.toDate());
      }
      return "";
    };
    const rootClass = computed(() => [
      ns.b(),
      ns.is("fullscreen", props.fullscreen),
      ns.is("readonly", props.readonly),
      ns.is("disabled", props.disabled),
      ns.m(props.size)
    ]);
    __expose({
      /** 当前显示的日期对象 (Dayjs) */
      displayDate,
      /** 当前选中的日期对象 (Dayjs - 单选模式) */
      selectedDate,
      /** 切换月份 (delta: 1 或 -1) */
      moveMonth,
      /** 跳转到今天 */
      goToday,
      /** 手动选中日期 */
      selectDate
    });
    const __returned__ = { props, emit, ns, t, locale, themeStyle, now, displayDate, selectedDate, rangeStart, rangeEnd, hoverDate, multipleSelected, mergedHolidays, monthKeys, title, weekDays, isDateDisabled, isWeekend, isInRange, isMultipleSelected, rows, getDayType, selectDate, handleCellHover, moveMonth, goToday, getSlotData, getCellExtraClass, rootClass, ref, computed, watch, onMounted, get dayjs() {
      return dayjs;
    }, get isoWeekPluginModule() {
      return isoWeekPluginModule;
    }, get useNamespace() {
      return useNamespace;
    }, get useLocale() {
      return useLocale;
    }, get useComponentTheme() {
      return useComponentTheme;
    }, get calendarProps() {
      return calendarProps;
    }, get calendarEmits() {
      return calendarEmits;
    }, get DEFAULT_CHINA_HOLIDAYS_2026() {
      return DEFAULT_CHINA_HOLIDAYS_2026;
    }, get YhButton() {
      return YhButton;
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
