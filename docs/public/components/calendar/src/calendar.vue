<script setup>
import { ref, computed, watch, onMounted } from "vue";
import dayjs from "../../dayjs";
import isoWeekPlugin from "dayjs/plugin/isoWeek.js";
import { useNamespace, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import {
  calendarProps,
  calendarEmits,
  DEFAULT_CHINA_HOLIDAYS_2026
} from "./calendar";
import { YhButton } from "../../button";
dayjs.extend(isoWeekPlugin);
defineOptions({
  name: "YhCalendar"
});
const props = defineProps(calendarProps);
const emit = defineEmits(calendarEmits);
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
  props.rangeValue?.[0] ? dayjs(props.rangeValue[0]) : void 0
);
const rangeEnd = ref(
  props.rangeValue?.[1] ? dayjs(props.rangeValue[1]) : void 0
);
const hoverDate = ref(void 0);
const multipleSelected = ref(props.multipleValue?.map((d) => dayjs(d)) || []);
const mergedHolidays = computed(() => {
  if (props.showHoliday) {
    return { ...DEFAULT_CHINA_HOLIDAYS_2026, ...props.holidays };
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
  if (props.monthHeaderFormat) {
    return displayDate.value.format(props.monthHeaderFormat);
  }
  const calendarLocale = locale.value.yh?.calendar;
  if (calendarLocale?.monthHeaderFormat) {
    return displayDate.value.format(calendarLocale.monthHeaderFormat);
  }
  const dateLocale = locale.value.yh?.datepicker;
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
        isHoliday: holidayInfo?.isOffDay === true,
        holidayName: holidayInfo?.name,
        isWorkday: holidayInfo?.isOffDay === false,
        isInRange: isInRange(current),
        isRangeStart: props.selectionMode === "range" && rangeStart.value?.isSame(current, "day"),
        isRangeEnd: props.selectionMode === "range" && rangeEnd.value?.isSame(current, "day"),
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
    multipleSelected.value = val?.map((d) => dayjs(d)) || [];
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
defineExpose({
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
</script>

<template>
  <div :class="rootClass" :style="themeStyle">
    <!-- 顶栏 -->
    <div :class="ns.e('header')">
      <div :class="ns.e('title')">
        <slot name="header" :date="title">{{ title }}</slot>
      </div>

      <div :class="ns.e('controls')">
        <div :class="ns.e('nav-group')">
          <yh-button class="yh-calendar__nav-btn" size="small" @click="moveMonth(-1)">
            {{ t("calendar.prevMonth") }}
          </yh-button>
          <yh-button
            class="yh-calendar__nav-btn yh-calendar__nav-btn--today"
            size="small"
            @click="goToday"
          >
            {{ t("calendar.today") }}
          </yh-button>
          <yh-button class="yh-calendar__nav-btn" size="small" @click="moveMonth(1)">
            {{ t("calendar.nextMonth") }}
          </yh-button>
        </div>
      </div>
    </div>

    <!-- 表身 -->
    <div :class="ns.e('body')">
      <table :class="ns.e('table')">
        <thead>
          <tr>
            <th v-if="showWeekNumber" :class="ns.e('week-number-header')">
              {{ t("calendar.week") }}
            </th>
            <th
              v-for="(day, idx) in weekDays"
              :key="day"
              :class="[ns.e('weekday'), {
  [ns.em('weekday', 'weekend')]: highlightWeekends && (idx === 0 || idx === 6)
}]"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-if="showWeekNumber" :class="ns.e('week-number')">
              {{ row.weekNumber }}
            </td>
            <td
              v-for="(cell, cellIndex) in row.cells"
              :key="cellIndex"
              :class="[ns.e('day'), ns.is('today', cell.isToday), ns.is('selected', cell.isSelected), ns.is('disabled', cell.isDisabled), ns.is('weekend', highlightWeekends && cell.isWeekend), ns.is('holiday', cell.isHoliday), ns.is('workday', cell.isWorkday), ns.is('in-range', cell.isInRange), ns.is('range-start', cell.isRangeStart), ns.is('range-end', cell.isRangeEnd), ns.is('other-month', cell.type !== 'current-month'), ns.is('hidden', !showOtherMonths && cell.type !== 'current-month'), ns.is(cell.type, true), getCellExtraClass(cell)]"
              @click="selectDate(cell)"
              @mouseenter="handleCellHover(cell)"
            >
              <div :class="ns.e('day-inner')">
                <!-- 日期数字 -->
                <div :class="ns.e('day-value')">
                  {{ cell.day }}
                </div>

                <!-- 假期/补班标记 -->
                <div
                  v-if="showHoliday && (cell.isHoliday || cell.isWorkday)"
                  :class="[ns.e('day-badge'), cell.isHoliday ? ns.em('day-badge', 'holiday') : ns.em('day-badge', 'workday')]"
                >
                  {{ cell.isHoliday ? t("calendar.holiday") : t("calendar.workday") }}
                </div>

                <!-- 自定义内容插槽 -->
                <div :class="ns.e('day-content')">
                  <slot name="date-cell" :data="getSlotData(cell)"></slot>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 底部插槽 -->
    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style>
@charset "UTF-8";
/**
 * YH-UI CSS Variables
 * 全局 CSS 变量定义 - 业内最佳主题系统
 */
:root {
  /* ==================== 密度/紧凑度系统 ==================== */
  --yh-density-factor: 1;
  --yh-component-size-default: 32px;
  --yh-component-size-small: 24px;
  --yh-component-size-large: 40px;
  --yh-padding-default: 12px 16px;
  --yh-padding-small: 8px 12px;
  --yh-padding-large: 16px 20px;
  --yh-spacing-unit: 8px;
  /* ==================== 基础颜色 ==================== */
  --yh-color-white: #ffffff;
  --yh-color-black: #000000;
  /* ==================== 颜色系统 ==================== */
  /* 主色 */
  --yh-color-primary: #409eff;
  --yh-color-primary-light-1: #53a8ff;
  --yh-color-primary-light-2: #66b1ff;
  --yh-color-primary-light-3: #79bbff;
  --yh-color-primary-light-4: #8cc5ff;
  --yh-color-primary-light-5: #a0cfff;
  --yh-color-primary-light-6: #b3d8ff;
  --yh-color-primary-light-7: #c6e2ff;
  --yh-color-primary-light-8: #d9ecff;
  --yh-color-primary-light-9: #ecf5ff;
  --yh-color-primary-dark-2: #337ecc;
  /* 成功色 */
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #95d475;
  --yh-color-success-light-5: #b3e19d;
  --yh-color-success-light-7: #d1edc4;
  --yh-color-success-light-9: #f0f9eb;
  --yh-color-success-dark-2: #529b2e;
  /* 警告色 */
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #eebe77;
  --yh-color-warning-light-5: #f3d19e;
  --yh-color-warning-light-7: #f8e3c5;
  --yh-color-warning-light-9: #fdf6ec;
  --yh-color-warning-dark-2: #b88230;
  /* 危险色 */
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #f89898;
  --yh-color-danger-light-5: #fab6b6;
  --yh-color-danger-light-7: #fcd3d3;
  --yh-color-danger-light-9: #fef0f0;
  --yh-color-danger-dark-2: #c45656;
  /* 信息色 */
  --yh-color-info: #909399;
  --yh-color-info-light-3: #b1b3b8;
  --yh-color-info-light-5: #c8c9cc;
  --yh-color-info-light-7: #dedfe0;
  --yh-color-info-light-9: #f4f4f5;
  --yh-color-info-dark-2: #73767a;
  /* 文字颜色 */
  --yh-text-color-primary: #303133;
  --yh-text-color-regular: #606266;
  --yh-text-color-secondary: #909399;
  --yh-text-color-placeholder: #a8abb2;
  --yh-text-color-disabled: #c0c4cc;
  /* 边框颜色 */
  --yh-border-color: #dcdfe6;
  --yh-border-color-hover: var(--yh-color-primary);
  --yh-border-color-light: #e4e7ed;
  --yh-border-color-lighter: #ebeef5;
  --yh-border-color-extra-light: #f2f6fc;
  --yh-border-color-dark: #d4d7de;
  --yh-border-color-darker: #cdd0d6;
  /* 填充颜色 */
  --yh-fill-color: #f0f2f5;
  --yh-fill-color-light: #f5f7fa;
  --yh-fill-color-lighter: #fafafa;
  --yh-fill-color-extra-light: #fafcff;
  --yh-fill-color-dark: #ebedf0;
  --yh-fill-color-darker: #e6e8eb;
  --yh-fill-color-blank: #ffffff;
  /* 背景颜色 */
  --yh-bg-color: #ffffff;
  --yh-bg-color-page: #f2f3f5;
  --yh-bg-color-overlay: #ffffff;
  /* ==================== 间距系统 ==================== */
  --yh-spacing-none: 0;
  --yh-spacing-xs: 4px;
  --yh-spacing-sm: 8px;
  --yh-spacing-md: 16px;
  --yh-spacing-lg: 24px;
  --yh-spacing-xl: 32px;
  --yh-spacing-xxl: 48px;
  /* ==================== 圆角系统 ==================== */
  --yh-radius-none: 0;
  --yh-radius-sm: 2px;
  --yh-radius-base: 4px;
  --yh-radius-md: 8px;
  --yh-radius-lg: 12px;
  --yh-radius-xl: 16px;
  --yh-radius-round: 20px;
  --yh-radius-circle: 50%;
  /* ==================== 字体系统 ==================== */
  --yh-font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  /* 字号 */
  --yh-font-size-xs: 12px;
  --yh-font-size-sm: 13px;
  --yh-font-size-base: 14px;
  --yh-font-size-md: 16px;
  --yh-font-size-lg: 18px;
  --yh-font-size-xl: 20px;
  --yh-font-size-xxl: 24px;
  /* 行高 */
  --yh-line-height-none: 1;
  --yh-line-height-tight: 1.25;
  --yh-line-height-snug: 1.375;
  --yh-line-height-normal: 1.5;
  --yh-line-height-relaxed: 1.625;
  --yh-line-height-loose: 2;
  /* 字重 */
  --yh-font-weight-light: 300;
  --yh-font-weight-normal: 400;
  --yh-font-weight-medium: 500;
  --yh-font-weight-semibold: 600;
  --yh-font-weight-bold: 700;
  /* ==================== 阴影系统 ==================== */
  --yh-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --yh-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --yh-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --yh-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --yh-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  /* ==================== 过渡动效 ==================== */
  --yh-duration-fast: 150ms;
  --yh-duration-base: 200ms;
  --yh-duration-slow: 300ms;
  --yh-timing-ease: ease;
  --yh-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --yh-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --yh-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --yh-timing-linear: linear;
  --yh-transition-base: all var(--yh-duration-base) var(--yh-timing-ease-in-out);
  --yh-transition-fast: all var(--yh-duration-fast) var(--yh-timing-ease-in-out);
  --yh-transition-slow: all var(--yh-duration-slow) var(--yh-timing-ease-in-out);
  /* ==================== 层级系统 ==================== */
  --yh-z-index-normal: 1;
  --yh-z-index-top: 1000;
  --yh-z-index-popper: 2000;
  --yh-z-index-overlay: 2001;
  --yh-z-index-modal: 2002;
  --yh-z-index-popover: 2003;
  --yh-z-index-tooltip: 2004;
  --yh-z-index-loading: 2005;
  /* ==================== 组件尺寸 ==================== */
  /* Large */
  --yh-component-size-large: 40px;
  --yh-component-size-large-font: 14px;
  --yh-component-size-large-padding: 20px;
  /* Default */
  --yh-component-size-default: 32px;
  --yh-component-size-default-font: 14px;
  --yh-component-size-default-padding: 16px;
  /* Small */
  --yh-component-size-small: 24px;
  --yh-component-size-small-font: 12px;
  --yh-component-size-small-padding: 12px;
  /* ==================== 组件语义化变量 ==================== */
  --yh-border-radius-base: var(--yh-radius-base);
  --yh-border-radius-small: var(--yh-radius-sm);
  --yh-border-radius-round: var(--yh-radius-round);
  /* Message 消息提示 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-message-shadow: var(--yh-shadow-lg);
  --yh-message-text-color: var(--yh-text-color-primary);
  --yh-message-close-color: var(--yh-text-color-secondary);
  --yh-message-close-hover-color: var(--yh-text-color-primary);
  /* Notification 通知 */
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-notification-shadow: var(--yh-shadow-lg);
  --yh-notification-title-color: var(--yh-text-color-primary);
  --yh-notification-content-color: var(--yh-text-color-regular);
  /* Badge 徽标 */
  --yh-badge-bg-color: var(--yh-color-danger);
  --yh-badge-text-color: #ffffff;
  --yh-badge-border-color: var(--yh-bg-color);
  /* Card 卡片 */
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  --yh-card-shadow: var(--yh-shadow-base);
  --yh-card-header-padding: 18px 20px;
  --yh-card-body-padding: 20px;
  /* Input 输入框 */
  --yh-input-bg-color: var(--yh-fill-color-blank);
  --yh-input-text-color: var(--yh-text-color-regular);
  --yh-input-border-color: var(--yh-border-color);
  --yh-input-hover-border-color: var(--yh-color-primary);
  --yh-input-focus-border-color: var(--yh-color-primary);
  --yh-input-placeholder-color: var(--yh-text-color-placeholder);
  --yh-input-icon-color: var(--yh-text-color-placeholder);
  --yh-input-disabled-bg-color: var(--yh-fill-color-light);
  --yh-input-disabled-text-color: var(--yh-text-color-disabled);
  --yh-input-disabled-border-color: var(--yh-border-color-light);
  /* Image 图片 */
  --yh-image-placeholder-bg-color: var(--yh-fill-color-light);
  --yh-image-placeholder-text-color: var(--yh-text-color-placeholder);
  --yh-image-error-bg-color: var(--yh-fill-color-extra-light);
  --yh-image-error-text-color: var(--yh-text-color-placeholder);
  /* Image Viewer 预览器 */
  --yh-image-viewer-mask-bg-color: rgba(0, 0, 0, 0.5);
  --yh-image-viewer-btn-bg-color: var(--yh-text-color-regular);
  --yh-image-viewer-btn-color: #ffffff;
  --yh-image-viewer-btn-hover-bg-color: var(--yh-color-primary);
  /* Calendar 日历 */
  --yh-calendar-bg: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  --yh-calendar-border-color: rgba(0, 0, 0, 0.06);
  --yh-calendar-border-radius: var(--yh-radius-xl);
  --yh-calendar-header-bg: rgba(255, 255, 255, 0.95);
  --yh-calendar-header-border: rgba(0, 0, 0, 0.04);
  --yh-calendar-header-padding: 18px 22px;
  --yh-calendar-body-padding: 14px 18px 18px;
  /* Calendar 尺寸 */
  --yh-calendar-cell-height: 85px;
  --yh-calendar-cell-height-small: 52px;
  --yh-calendar-cell-height-large: 110px;
  --yh-calendar-cell-radius: 10px;
  --yh-calendar-cell-radius-small: 6px;
  --yh-calendar-cell-radius-large: 12px;
  /* Calendar 颜色 */
  --yh-calendar-primary: var(--yh-color-primary);
  --yh-calendar-primary-light: rgba(59, 130, 246, 0.1);
  --yh-calendar-selected-bg: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  --yh-calendar-selected-border: rgba(59, 130, 246, 0.4);
  --yh-calendar-today-dot: var(--yh-color-primary);
  --yh-calendar-weekend-color: #f97316;
  --yh-calendar-disabled-color: var(--yh-text-color-disabled);
  --yh-calendar-other-month-opacity: 0.35;
  /* Calendar 假日 */
  --yh-calendar-holiday-color: var(--yh-color-success);
  --yh-calendar-holiday-bg: rgba(16, 185, 129, 0.12);
  --yh-calendar-holiday-border: rgba(16, 185, 129, 0.25);
  --yh-calendar-workday-color: var(--yh-color-warning);
  --yh-calendar-workday-bg: rgba(245, 158, 11, 0.12);
  --yh-calendar-workday-border: rgba(245, 158, 11, 0.25);
  /* Calendar 范围选择 */
  --yh-calendar-range-bg: rgba(59, 130, 246, 0.08);
  --yh-calendar-range-border: rgba(59, 130, 246, 0.2);
  /* Calendar 字体 */
  --yh-calendar-weekday-font-size: var(--yh-font-size-sm);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-day-font-size: 15px;
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-badge-font-size: 9px;
  /* Table 表格 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-light);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-header-font-weight: var(--yh-font-weight-semibold);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color-light);
  --yh-table-row-stripe-bg: var(--yh-fill-color-lighter);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-8);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-text-color: var(--yh-text-color-regular);
  --yh-table-empty-text-color: var(--yh-text-color-secondary);
  --yh-table-font-size: var(--yh-font-size-base);
  --yh-table-cell-padding: 12px 0;
  --yh-table-cell-spacing: 12px;
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.15);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.15);
  /* ==================== 边框基础 ==================== */
  --yh-border-width: 1px;
  --yh-border-style: solid;
  --yh-border: var(--yh-border-width) var(--yh-border-style) var(--yh-border-color);
  /* ==================== 断点系统 ==================== */
  --yh-breakpoint-xs: 0;
  --yh-breakpoint-sm: 576px;
  --yh-breakpoint-md: 768px;
  --yh-breakpoint-lg: 992px;
  --yh-breakpoint-xl: 1200px;
  --yh-breakpoint-xxl: 1400px;
  /* ==================== 字体系统扩展 ==================== */
  --yh-font-family-monospace:
    'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  --yh-font-family-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
  /* ==================== 无障碍/聚焦系统 ==================== */
  --yh-focus-ring-color: var(--yh-color-primary);
  --yh-focus-ring-width: 2px;
  --yh-focus-ring-offset: 2px;
  --yh-focus-ring-opacity: 0.2;
  --yh-focus-ring:
    0 0 0 var(--yh-focus-ring-offset) var(--yh-bg-color),
    0 0 0 calc(var(--yh-focus-ring-offset) + var(--yh-focus-ring-width)) var(--yh-focus-ring-color);
  /* 高对比度模式支持 */
  --yh-high-contrast-outline: 2px solid transparent;
  --yh-high-contrast-outline-offset: 2px;
  /* ==================== 滚动条样式 ==================== */
  --yh-scrollbar-width: 6px;
  --yh-scrollbar-thumb-color: var(--yh-text-color-disabled);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-secondary);
  --yh-scrollbar-track-color: transparent;
  --yh-scrollbar-thumb-radius: 3px;
  /* ==================== 遮罩层 ==================== */
  --yh-mask-color: rgba(0, 0, 0, 0.5);
  --yh-mask-color-light: rgba(0, 0, 0, 0.3);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.1);
}

/* ==================== 暗黑模式 ==================== */
html.dark {
  --yh-color-primary: #409eff;
  --yh-color-primary-light-3: #3375b9;
  --yh-color-primary-light-5: #2a598a;
  --yh-color-primary-light-7: #213d5b;
  --yh-color-primary-light-9: #18222c;
  --yh-color-primary-dark-2: #66b1ff;
  --yh-color-success: #67c23a;
  --yh-color-success-light-3: #4e8e2f;
  --yh-color-success-light-5: #3e6b27;
  --yh-color-success-light-7: #2d481f;
  --yh-color-success-light-9: #1d2518;
  --yh-color-warning: #e6a23c;
  --yh-color-warning-light-3: #a77730;
  --yh-color-warning-light-5: #7d5b28;
  --yh-color-warning-light-7: #533f20;
  --yh-color-warning-light-9: #292218;
  --yh-color-danger: #f56c6c;
  --yh-color-danger-light-3: #b25252;
  --yh-color-danger-light-5: #854040;
  --yh-color-danger-light-7: #582e2e;
  --yh-color-danger-light-9: #2b1d1d;
  --yh-color-info: #909399;
  --yh-color-info-light-3: #6b6d71;
  --yh-color-info-light-5: #525457;
  --yh-color-info-light-7: #393b3e;
  --yh-color-info-light-9: #202124;
  --yh-text-color-primary: #e5eaf3;
  --yh-text-color-regular: #cfd3dc;
  --yh-text-color-secondary: #a3a6ad;
  --yh-text-color-placeholder: #8d9095;
  --yh-text-color-disabled: #6c6e72;
  --yh-border-color: #4c4d4f;
  --yh-border-color-light: #414243;
  --yh-border-color-lighter: #363637;
  --yh-border-color-extra-light: #2b2b2c;
  --yh-border-color-dark: #58585b;
  --yh-border-color-darker: #636466;
  --yh-fill-color: #303030;
  --yh-fill-color-light: #262727;
  --yh-fill-color-lighter: #1d1d1d;
  --yh-fill-color-extra-light: #191919;
  --yh-fill-color-dark: #39393a;
  --yh-fill-color-darker: #424243;
  --yh-fill-color-blank: transparent;
  --yh-bg-color: #141414;
  --yh-bg-color-page: #0a0a0a;
  --yh-bg-color-overlay: #1d1e1f;
  /* 组件暗色模式覆盖 */
  --yh-message-bg-color: var(--yh-bg-color-overlay);
  --yh-message-border-color: var(--yh-border-color-lighter);
  --yh-notification-bg-color: var(--yh-bg-color-overlay);
  --yh-notification-border-color: var(--yh-border-color-lighter);
  --yh-badge-border-color: var(--yh-bg-color);
  --yh-card-bg-color: var(--yh-bg-color-overlay);
  --yh-card-border-color: var(--yh-border-color-lighter);
  /* Calendar 暗黑模式 */
  --yh-calendar-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  --yh-calendar-border-color: rgba(255, 255, 255, 0.08);
  --yh-calendar-header-bg: rgba(30, 30, 30, 0.95);
  --yh-calendar-header-border: rgba(255, 255, 255, 0.06);
  --yh-calendar-day-color: var(--yh-text-color-primary);
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-selected-bg: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.2) 0%,
    rgba(59, 130, 246, 0.1) 100%
  );
  /* Table 暗黑模式 */
  --yh-table-border-color: var(--yh-border-color-lighter);
  --yh-table-header-bg: var(--yh-fill-color-dark);
  --yh-table-header-text-color: var(--yh-text-color-primary);
  --yh-table-row-bg: var(--yh-bg-color);
  --yh-table-row-hover-bg: var(--yh-fill-color);
  --yh-table-row-stripe-bg: var(--yh-fill-color-light);
  --yh-table-row-current-bg: var(--yh-color-primary-light-9);
  --yh-table-row-selected-bg: var(--yh-color-primary-light-9);
  --yh-table-row-success-bg: var(--yh-color-success-light-9);
  --yh-table-row-warning-bg: var(--yh-color-warning-light-9);
  --yh-table-fixed-left-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, 0.3);
  --yh-table-fixed-right-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, 0.3);
  /* 遮罩层暗黑模式 */
  --yh-mask-color: rgba(0, 0, 0, 0.7);
  --yh-mask-color-light: rgba(0, 0, 0, 0.5);
  --yh-mask-color-extra-light: rgba(0, 0, 0, 0.3);
  /* 滚动条暗黑模式 */
  --yh-scrollbar-thumb-color: var(--yh-fill-color-darker);
  --yh-scrollbar-thumb-hover-color: var(--yh-text-color-placeholder);
}

/* ==================== 减少动画偏好支持 ==================== */
@media (prefers-reduced-motion: reduce) {
  :root,
  html.dark {
    --yh-duration-fast: 0ms;
    --yh-duration-base: 0ms;
    --yh-duration-slow: 0ms;
    --yh-transition-base: none;
    --yh-transition-fast: none;
    --yh-transition-slow: none;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
/* ==================== 高对比度模式支持 ==================== */
@media (prefers-contrast: high) {
  :root {
    --yh-border-color: #000000;
    --yh-border-color-light: #333333;
    --yh-text-color-primary: #000000;
    --yh-text-color-regular: #1a1a1a;
    --yh-focus-ring-width: 3px;
    --yh-focus-ring-color: #000000;
  }
  html.dark {
    --yh-border-color: #ffffff;
    --yh-border-color-light: #cccccc;
    --yh-text-color-primary: #ffffff;
    --yh-text-color-regular: #e5e5e5;
    --yh-focus-ring-color: #ffffff;
  }
}
/* ==================== 强制颜色模式支持 (Windows 高对比度) ==================== */
@media (forced-colors: active) {
  :root {
    --yh-color-primary: LinkText;
    --yh-border-color: ButtonBorder;
    --yh-bg-color: Canvas;
    --yh-text-color-primary: CanvasText;
    --yh-focus-ring-color: Highlight;
  }
}
.yh-calendar {
  --yh-calendar-primary: var(--yh-color-primary);
  --yh-calendar-primary-light: var(--yh-color-primary-light-9);
  --yh-calendar-primary-dark: var(--yh-color-primary-dark-2);
  --yh-calendar-bg: var(--yh-bg-color);
  --yh-calendar-text: var(--yh-text-color-primary);
  --yh-calendar-cell-height: 100px;
  --yh-calendar-cell-radius: var(--yh-radius-lg);
  --yh-calendar-head-height: 80px;
  --yh-calendar-title-size: 22px;
  --yh-calendar-weekday-color: var(--yh-text-color-secondary);
  --yh-calendar-week-number-color: var(--yh-text-color-placeholder);
  --yh-calendar-holiday-color: var(--yh-color-danger);
  --yh-calendar-disabled-bg: var(--yh-fill-color-light);
  --yh-calendar-disabled-text: var(--yh-text-color-placeholder);
  background: var(--yh-calendar-bg);
  border-radius: var(--yh-radius-xl);
  box-shadow: var(--yh-shadow-lg);
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 650px;
  overflow: hidden;
}
.yh-calendar, .yh-calendar *, .yh-calendar *::before, .yh-calendar *::after {
  box-sizing: border-box;
}
.yh-calendar__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 32px 20px;
  background: var(--yh-bg-color);
  flex: none;
  min-height: var(--yh-calendar-head-height);
  position: relative;
  border-bottom: 1px solid var(--yh-border-color-extra-light);
  gap: 16px;
}

.yh-calendar__title {
  font-size: var(--yh-calendar-title-size);
  font-weight: 900;
  color: var(--yh-calendar-text);
  letter-spacing: 1px;
  position: relative;
}
.yh-calendar__title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 15%;
  right: 15%;
  height: 4px;
  background: var(--yh-calendar-primary);
  border-radius: 10px;
  opacity: 0.8;
}

.yh-calendar__controls {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}

.yh-calendar__body {
  padding: 20px 24px 28px;
  flex: 1;
  background: var(--yh-bg-color-page);
  display: flex;
  flex-direction: column;
}

.yh-calendar__table {
  display: table;
  width: 100%;
  height: auto;
  border-collapse: separate;
  border-spacing: 12px 10px;
  table-layout: fixed;
  margin: 0;
}
.yh-calendar__table tr {
  display: table-row;
  background: transparent;
  border: none;
}
.yh-calendar__table th,
.yh-calendar__table td {
  display: table-cell;
  padding: 0;
  border: none;
  background: transparent;
  position: relative;
  text-align: center;
  vertical-align: middle;
}

.yh-calendar__weekday {
  height: 64px;
  color: var(--yh-calendar-weekday-color);
  font-weight: 800;
  font-size: 15px;
  position: relative;
}
.yh-calendar__weekday > span {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}
.yh-calendar__weekday::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  z-index: 0;
  border: 1px solid rgba(0, 0, 0, 0.02);
}

.yh-calendar__day {
  --yh-day-bg: var(--yh-bg-color);
  --yh-day-color: var(--yh-calendar-text);
  --yh-day-radius: var(--yh-calendar-cell-radius);
  --yh-day-shadow: var(--yh-shadow-sm);
  --yh-day-scale: 1;
  height: var(--yh-calendar-cell-height);
  cursor: pointer;
  position: relative;
  user-select: none;
}
.yh-calendar__day::before {
  content: "";
  position: absolute;
  inset: 0;
  background-color: var(--yh-day-bg);
  border-radius: var(--yh-day-radius);
  box-shadow: var(--yh-day-shadow);
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 0;
}
.yh-calendar__day:hover:not(.is-disabled):not(.is-selected):not(.is-in-range) {
  --yh-day-color: var(--yh-calendar-primary);
  --yh-day-shadow: var(--yh-shadow-lg);
  --yh-day-scale: 1.05;
  z-index: 2;
}
.yh-calendar__day.is-in-range {
  --yh-day-bg: var(--yh-calendar-primary-light);
  --yh-day-radius: 0;
  --yh-day-shadow: none;
}
.yh-calendar__day.is-in-range::before {
  margin: 0 -7px;
}
.yh-calendar__day.is-range-start {
  --yh-day-radius: var(--yh-calendar-cell-radius) 0 0 var(--yh-calendar-cell-radius);
}
.yh-calendar__day.is-range-start::before {
  margin: 0 -7px 0 0;
}
.yh-calendar__day.is-range-end {
  --yh-day-radius: 0 var(--yh-calendar-cell-radius) var(--yh-calendar-cell-radius) 0;
}
.yh-calendar__day.is-range-end::before {
  margin: 0 0 0 -7px;
}
.yh-calendar__day.is-selected {
  z-index: 5;
  --yh-day-bg: var(--yh-calendar-primary-light);
  --yh-day-color: var(--yh-calendar-primary);
  --yh-day-shadow: var(--yh-shadow-md);
}
.yh-calendar__day.is-selected::before {
  border: 2.5px solid var(--yh-calendar-primary);
}
.yh-calendar__day.is-selected .yh-calendar__day-value {
  color: var(--yh-calendar-primary);
  font-weight: 900;
  font-size: 19px;
}
.yh-calendar__day.is-selected.is-today .yh-calendar__day-value::after {
  background-color: var(--yh-calendar-primary);
}
.yh-calendar__day.is-today:not(.is-selected) .yh-calendar__day-value {
  color: var(--yh-calendar-primary);
  font-weight: 800;
}
.yh-calendar__day.is-today .yh-calendar__day-value::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 4px;
  background: var(--yh-calendar-primary);
  border-radius: 4px;
}

.yh-calendar__day.is-other-month {
  opacity: 0.4;
}
.yh-calendar__day.is-other-month .yh-calendar__day-value {
  color: var(--yh-text-color-secondary);
}
.yh-calendar__day.is-hidden {
  visibility: hidden;
  pointer-events: none;
}
.yh-calendar__day.is-disabled {
  cursor: not-allowed;
  opacity: 0.45;
  pointer-events: none !important;
}
.yh-calendar__day.is-disabled::before {
  background-color: var(--yh-calendar-disabled-bg);
  box-shadow: none;
}
.yh-calendar__day.is-disabled .yh-calendar__day-value {
  color: var(--yh-calendar-disabled-text);
}

.yh-calendar__day-inner {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  gap: 8px;
  z-index: 1;
  color: var(--yh-day-color);
  transform: scale(var(--yh-day-scale));
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.yh-calendar__day-value {
  font-size: 17px;
  position: relative;
  line-height: 1;
}

.yh-calendar__day-badge {
  position: static;
  order: -1;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 6px;
  transform: scale(0.85);
}
.yh-calendar__day-badge--holiday {
  color: var(--yh-calendar-holiday-color);
}

.yh-calendar__day-badge--workday {
  color: var(--yh-text-color-secondary);
}

.yh-calendar__day-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.yh-calendar.is-fullscreen {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.yh-calendar.is-fullscreen .yh-calendar__body {
  padding: 0 16px 16px;
  height: calc(100% - var(--yh-calendar-head-height) - 36px);
  overflow: hidden;
}
.yh-calendar.is-fullscreen .yh-calendar__table {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-spacing: 0;
  gap: 6px;
  min-height: 0;
  overflow: hidden;
}
.yh-calendar.is-fullscreen .yh-calendar__table thead {
  flex: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2px;
}
.yh-calendar.is-fullscreen .yh-calendar__table thead tr {
  display: flex;
  width: 100%;
  gap: 10px;
}
.yh-calendar.is-fullscreen .yh-calendar__table thead th {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
}
.yh-calendar.is-fullscreen .yh-calendar__table tbody {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 6px;
  min-height: 0;
  overflow: hidden;
}
.yh-calendar.is-fullscreen .yh-calendar__table tbody tr {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
  gap: 10px;
  min-height: 0;
}
.yh-calendar.is-fullscreen .yh-calendar__table tbody td {
  flex: 1;
  display: flex;
  align-items: stretch;
  justify-content: center;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
}
.yh-calendar.is-fullscreen .yh-calendar__day {
  height: 100%;
  min-height: 0;
  overflow: hidden;
}
.yh-calendar.is-fullscreen .yh-calendar__day-inner {
  padding-top: 10px;
}
.yh-calendar.is-fullscreen .yh-calendar__weekday {
  height: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.yh-calendar--small {
  --yh-calendar-cell-height: 56px;
  min-width: 550px;
}
.yh-calendar--small .yh-calendar__header {
  height: 64px;
}

.yh-calendar--large {
  --yh-calendar-cell-height: 120px;
  min-width: 850px;
}
</style>
