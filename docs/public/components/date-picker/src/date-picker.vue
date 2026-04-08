<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useNamespace, useFormItem, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import { useConfig } from "@yh-ui/hooks";
import DateTable from "./date-table.vue";
import MonthTable from "./month-table.vue";
import YearTable from "./year-table.vue";
import QuarterTable from "./quarter-table.vue";
import {
  datePickerProps
} from "./date-picker";
import { DEFAULT_FORMATS, formatDate } from "./panel-utils";
import dayjs from "../../dayjs";
defineOptions({
  name: "YhDatePicker"
});
const props = defineProps(datePickerProps);
const emit = defineEmits(["update:modelValue", "change", "focus", "blur", "clear", "confirm", "panel-change", "visible-change"]);
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
  () => props.size || formItem?.size || form?.size || globalSize.value || "default"
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
  dropdownStyle.value = {
    ...themeStyle.value,
    position: "fixed",
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    zIndex: "2000",
    "--yh-color-primary": primary,
    "--yh-color-primary-rgb": primaryRgb,
    "--yh-color-primary-light-9": primaryLight9
  };
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
  if (!visible.value || props.panelOnly) return;
  const target = e.target;
  if (wrapperRef.value?.contains(target)) return;
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
</script>

<template>
  <div
    ref="wrapperRef"
    :class="wrapperClasses"
    :style="themeStyle"
    @click="togglePanel"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- 输入框部分 -->
    <div v-if="!panelOnly" :class="ns.e('wrapper')">
      <span :class="ns.e('icon')">
        <slot name="prefix-icon">
          <component :is="prefixIcon" v-if="prefixIcon" />
          <svg v-else viewBox="0 0 24 24" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 4H11V16h2z"
            />
          </svg>
        </slot>
      </span>

      <template v-if="!isRange">
        <input
          :class="ns.e('inner')"
          :placeholder="placeholder ?? t('datepicker.selectDate')"
          :value="displayValue"
          readonly
        />
      </template>
      <template v-else>
        <div :class="ns.e('range-input-wrapper')">
          <input
            :class="ns.e('range-input')"
            :placeholder="startPlaceholder ?? t('datepicker.startDate')"
            :value="rangeDisplayValue[0]"
            readonly
          />
          <span :class="ns.e('range-separator')">{{ rangeSeparator }}</span>
          <input
            :class="ns.e('range-input')"
            :placeholder="endPlaceholder ?? t('datepicker.endDate')"
            :value="rangeDisplayValue[1]"
            readonly
          />
        </div>
      </template>

      <span :class="ns.e('suffix')">
        <span
          v-if="clearable && modelValue && hovering && !disabled"
          :class="ns.e('clear')"
          @click.stop="handleClear"
        >
          <slot name="clear-icon">
            <component :is="clearIcon" v-if="clearIcon" />
            <svg v-else viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
              />
            </svg>
          </slot>
        </span>
      </span>
    </div>

    <!-- 弹窗面板 -->
    <component :is="panelOnly ? 'div' : 'Teleport'" to="body" :disabled="!teleported || panelOnly">
      <Transition :name="panelOnly ? '' : ns.b('panel')">
        <div
          v-if="visible"
          :class="[ns.e('panel'), popperClass, ns.is('plain', panelOnly)]"
          :style="!panelOnly && teleported ? dropdownStyle : {}"
          @click.stop
        >
          <div :class="ns.e('header')">
            <div :class="ns.e('header-group')">
              <button
                :class="[ns.e('header-btns'), ns.em('header-btns', 'double-left')]"
                @click="moveYear(-1)"
              >
                «
              </button>
              <button
                v-if="currentView === 'date'"
                :class="[ns.e('header-btns'), ns.em('header-btns', 'left')]"
                @click="moveMonth(-1)"
              >
                ‹
              </button>
            </div>
            <span :class="ns.e('header-label')" @click="handleHeaderClick">{{ headerLabel }}</span>
            <div :class="ns.e('header-group')">
              <button
                v-if="currentView === 'date'"
                :class="[ns.e('header-btns'), ns.em('header-btns', 'right')]"
                @click="moveMonth(1)"
              >
                ›
              </button>
              <button
                :class="[ns.e('header-btns'), ns.em('header-btns', 'double-right')]"
                @click="moveYear(1)"
              >
                »
              </button>
            </div>
          </div>

          <div :class="ns.e('content')">
            <DateTable
              v-if="currentView === 'date'"
              :date="innerDate"
              :selected-date="parsedSelectedDate"
              :selection-mode="type === 'week' ? 'week' : 'date'"
              :range-state="parsedRangeState"
              :disabled-date="disabledDate"
              :first-day-of-week="firstDayOfWeek"
              :cell-shape="cellShape"
              :cell-render="cellRender"
              @select="handleSelect"
              @hover="val => rangeHoverDate = val"
            >
              <template #date-cell="slotProps">
                <slot name="date-cell" v-bind="slotProps" />
              </template>
            </DateTable>
            <MonthTable
              v-else-if="currentView === 'month'"
              :date="innerDate"
              :selected-date="parsedSelectedDate"
              :range-state="parsedRangeState"
              :disabled-date="disabledDate"
              :cell-shape="cellShape"
              @select="handleSelect"
              @hover="val => rangeHoverDate = val"
            />
            <YearTable
              v-else-if="currentView === 'year'"
              :date="innerDate"
              :selected-date="parsedSelectedDate"
              :range-state="parsedRangeState"
              :disabled-date="disabledDate"
              :cell-shape="cellShape"
              @select="handleSelect"
              @hover="val => rangeHoverDate = val"
            />
            <QuarterTable
              v-else-if="currentView === 'quarter'"
              :date="innerDate"
              :selected-date="parsedSelectedDate"
              :range-state="parsedRangeState"
              :disabled-date="disabledDate"
              :cell-shape="cellShape"
              @select="handleSelect"
              @hover="val => rangeHoverDate = val"
            />
          </div>

          <div v-if="$slots.extra" :class="ns.e('extra')">
            <slot name="extra"></slot>
          </div>

          <div v-if="presets.length > 0" :class="ns.e('presets')">
            <button
              v-for="p in presets"
              :key="p.label"
              :class="ns.e('preset-item')"
              @click="handleSelect(typeof p.value === 'function' ? p.value() : p.value)"
            >
              {{ p.label }}
            </button>
          </div>

          <div v-if="shouldShowFooter" :class="ns.e('footer')">
            <slot name="footer">
              <div v-if="type.includes('datetime') && !isRange" :class="ns.e('footer-time')">
                {{
                  dayjs(modelValue || /* @__PURE__ */new Date()).format(props.timeFormat || "HH:mm:ss")
                }}
              </div>
              <div :class="ns.e('footer-btns')">
                <button
                  v-if="isRange || type.includes('datetime')"
                  :class="ns.e('footer-btn')"
                  @click="visible = false"
                >
                  {{ t("datepicker.cancel") }}
                </button>
                <button
                  :class="[ns.e('footer-btn'), ns.e('footer-btn--confirm')]"
                  @click="handleConfirmClick"
                >
                  {{ t("datepicker.confirm") }}
                </button>
              </div>
            </slot>
          </div>
        </div>
      </Transition>
    </component>
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
/* 尺寸变量映射 - 统一对接 YH-UI 全局主题变量 */
.yh-date-picker {
  /* 局部变量定义 - 允许通过作用域或内联样式覆盖 */
  --yh-date-picker-primary: var(--yh-color-primary);
  --yh-date-picker-primary-rgb: var(--yh-color-primary-rgb);
  --yh-date-picker-text-main: var(--yh-text-color-primary);
  --yh-date-picker-text-secondary: var(--yh-text-color-secondary);
  --yh-date-picker-border: var(--yh-border-color);
  --yh-date-picker-panel-shadow: var(--yh-shadow-lg);
  --yh-date-picker-item-hover: var(--yh-fill-color-light);
  --yh-date-picker-range-bg: var(--yh-color-primary-light-9);
  --yh-date-picker-panel-width: 380px;
  --yh-date-picker-panel-bg: var(--yh-bg-color-overlay);
  --yh-date-picker-hover-bg: var(--yh-date-picker-item-hover);
  --yh-date-picker-active-bg: var(--yh-date-picker-primary);
  --yh-date-picker-active-color: var(--yh-color-white);
  position: relative;
  display: inline-flex;
  width: var(--yh-date-picker-width, 220px);
  font-family: var(--yh-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  box-sizing: border-box;
}
.yh-date-picker.is-range {
  width: var(--yh-date-picker-range-width, 400px);
}
.yh-date-picker.is-disabled {
  opacity: var(--yh-disabled-opacity, 0.5);
  cursor: not-allowed;
}
.yh-date-picker__wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  padding: 0 12px;
  background: var(--yh-bg-color);
  border: 1px solid var(--yh-date-picker-border);
  border-radius: var(--yh-radius-md);
  transition: border-color 0.25s, box-shadow 0.25s;
  cursor: pointer;
  box-sizing: border-box;
}
.yh-date-picker__wrapper:hover:not(.is-disabled) {
  border-color: var(--yh-date-picker-primary);
}

.yh-date-picker {
  /* 应用统一 Size */
}
.yh-date-picker--large .yh-date-picker__wrapper {
  height: var(--yh-component-size-large);
}

.yh-date-picker--large {
  font-size: var(--yh-font-size-lg);
}

.yh-date-picker--default .yh-date-picker__wrapper {
  height: var(--yh-component-size-default);
}

.yh-date-picker--default {
  font-size: var(--yh-font-size-base);
}

.yh-date-picker--small .yh-date-picker__wrapper {
  height: var(--yh-component-size-small);
}

.yh-date-picker--small {
  font-size: var(--yh-font-size-sm);
}

.yh-date-picker__icon {
  display: flex;
  align-items: center;
  color: var(--yh-date-picker-text-secondary);
  margin-right: 8px;
  font-size: 16px;
  flex-shrink: 0;
}

.yh-date-picker__inner {
  flex: 1;
  border: none !important;
  outline: none !important;
  background: transparent !important;
  color: var(--yh-date-picker-text-main);
  font-size: inherit;
  cursor: pointer;
  padding: 0 30px 0 0 !important; /* 为右侧清空按钮留出固定空间，防止文字重叠和布局抖动 */
  box-shadow: none !important;
  height: 100%;
}

.yh-date-picker__range-input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-right: 30px; /* 范围模式同样留出后缀空间 */
}

.yh-date-picker__range-input {
  flex: 1;
  border: none !important;
  outline: none !important;
  background: transparent !important;
  text-align: center;
  color: var(--yh-date-picker-text-main);
  font-weight: 500;
  padding: 0 !important;
  box-shadow: none !important;
  height: 100%;
}

.yh-date-picker__suffix {
  position: absolute; /* 核心修复：绝对定位确保不会飘出去或影响文字对齐 */
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  pointer-events: none; /* 穿透，除非内部按钮可见 */
}
.yh-date-picker__clear {
  font-size: 16px;
  color: var(--yh-date-picker-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  pointer-events: auto; /* 允许点击清空 */
}
.yh-date-picker__clear:hover {
  color: var(--yh-color-danger);
}

.yh-date-picker {
  /* 面板 - 彻底隔离文档样式干扰 */
}
.yh-date-picker__panel {
  /* 核心修复：确保面板在 Teleport 后也能解析局部变量 */
  --yh-date-picker-primary: var(--yh-color-primary);
  --yh-date-picker-primary-rgb: var(--yh-color-primary-rgb);
  --yh-date-picker-text-main: var(--yh-text-color-primary);
  --yh-date-picker-text-secondary: var(--yh-text-color-secondary);
  --yh-date-picker-border: var(--yh-border-color);
  --yh-date-picker-panel-shadow: var(--yh-shadow-lg);
  --yh-date-picker-item-hover: var(--yh-fill-color-light);
  --yh-date-picker-range-bg: var(--yh-color-primary-light-9);
  --yh-date-picker-panel-bg: var(--yh-bg-color-overlay);
  --yh-date-picker-hover-bg: var(--yh-date-picker-item-hover);
  --yh-date-picker-active-bg: var(--yh-date-picker-primary);
  --yh-date-picker-active-color: var(--yh-color-white);
  position: fixed;
  background: var(--yh-date-picker-panel-bg);
  border-radius: var(--yh-radius-xl);
  box-shadow: var(--yh-date-picker-panel-shadow);
  border: 1px solid var(--yh-border-color-extra-light);
  margin-top: 12px;
  z-index: var(--yh-z-index-popper);
  width: var(--yh-date-picker-panel-width) !important;
  box-sizing: border-box !important;
  display: inline-block;
  overflow: hidden;
  animation: yh-picker-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.yh-date-picker__panel.is-plain {
  position: static;
  box-shadow: none;
  border: none;
}

.yh-date-picker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 8px;
  box-sizing: border-box;
}
.yh-date-picker__header-label {
  font-size: 17px;
  font-weight: 700;
  color: var(--yh-date-picker-text-main);
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 8px;
  transition: all 0.2s;
}
.yh-date-picker__header-label:hover {
  background: var(--yh-date-picker-item-hover);
  color: var(--yh-date-picker-primary);
}

.yh-date-picker__header-group {
  display: flex;
  gap: 4px;
  background: var(--yh-date-picker-item-hover);
  padding: 4px;
  border-radius: 50px;
}

.yh-date-picker__header-btns {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: var(--yh-date-picker-text-main);
}
.yh-date-picker__header-btns:hover {
  background: var(--yh-bg-color);
  color: var(--yh-date-picker-primary);
  box-shadow: var(--yh-shadow-sm);
}

.yh-date-picker__content {
  padding: 0 20px 24px; /* 极致平衡补白 */
  width: 100% !important;
  box-sizing: border-box !important;
  display: block !important; /* 避免 flex 导致 table 宽度计算失效 */
}

.yh-date-picker {
  /* 表格系统 - 强制重置，防御文档样式 */
}
.yh-date-picker table.yh-date-picker__table {
  display: table !important;
  width: 100% !important;
  max-width: 100% !important;
  table-layout: fixed !important;
  border-collapse: collapse !important;
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
  background: transparent !important;
  /* 暴力重置文档中 table th td 可能存在的干扰 */
}
.yh-date-picker table.yh-date-picker__table thead,
.yh-date-picker table.yh-date-picker__table tbody,
.yh-date-picker table.yh-date-picker__table tr {
  border: none !important;
  background: transparent !important;
}
.yh-date-picker table.yh-date-picker__table th {
  height: 44px !important;
  border: none !important;
  padding: 0 !important;
  font-size: 12px;
  color: var(--yh-date-picker-text-secondary);
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  opacity: 0.5;
  background: transparent !important;
}
.yh-date-picker table.yh-date-picker__table td {
  border: none !important;
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
  text-align: center;
  vertical-align: middle;
}
.yh-date-picker__cell {
  height: 48px;
  position: relative;
  cursor: pointer;
}
.yh-date-picker__cell-content {
  width: 42px;
  height: 44px; /* 提升高度，给间距留出空间 */
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}
.yh-date-picker__cell-date {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}

.yh-date-picker__cell-extra {
  font-size: 10px;
  font-weight: 400;
  line-height: 1.2;
  margin-top: 4px; /* 增加文案间距 */
  opacity: 0.8;
}

.yh-date-picker__cell {
  /* 范围背景条 - 统一背景逻辑 */
}
.yh-date-picker__cell.is-in-range::before, .yh-date-picker__cell.is-range-start::before, .yh-date-picker__cell.is-range-end::before {
  content: "";
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 0;
  right: 0;
  background: var(--yh-date-picker-range-bg);
  z-index: 1;
}
.yh-date-picker__cell.is-in-range .yh-date-picker__cell-content {
  color: var(--yh-date-picker-primary);
}

.yh-date-picker__cell.is-range-start::before {
  border-radius: 10px 0 0 10px;
}
.yh-date-picker__cell.is-range-end::before {
  border-radius: 0 10px 10px 0;
}
.yh-date-picker__cell {
  /* 选中效果 */
}
.yh-date-picker__cell.is-selected .yh-date-picker__cell-content {
  background: var(--yh-date-picker-primary);
  color: var(--yh-color-white) !important;
  box-shadow: var(--yh-shadow-md);
}

.yh-date-picker__cell {
  /* 形状配置化逻辑 */
}
.yh-date-picker__cell.is-round .yh-date-picker__cell-content {
  border-radius: 50%;
}

.yh-date-picker__cell.is-round.is-range-start::before {
  border-radius: 19px 0 0 19px;
}
.yh-date-picker__cell.is-round.is-range-end::before {
  border-radius: 0 19px 19px 0;
}
.yh-date-picker__cell:hover:not(.is-disabled):not(.is-selected) .yh-date-picker__cell-content {
  background: var(--yh-date-picker-item-hover);
  color: var(--yh-date-picker-primary);
  transform: translateY(-1px);
}

.yh-date-picker__cell {
  /* 今日点缀 */
}
.yh-date-picker__cell.is-today:not(.is-selected) .yh-date-picker__cell-content {
  color: var(--yh-date-picker-primary);
}
.yh-date-picker__cell.is-today:not(.is-selected) .yh-date-picker__cell-content::after {
  content: "";
  position: absolute;
  bottom: 0px; /* 向下微调，增加点与文字的距离 */
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background: var(--yh-date-picker-primary);
  border-radius: 50%;
}

.yh-date-picker__cell.is-prev-month, .yh-date-picker__cell.is-next-month {
  color: var(--yh-date-picker-text-secondary);
  opacity: 0.35;
}
.yh-date-picker__cell.is-disabled {
  opacity: 0.2;
  cursor: not-allowed;
}

.yh-date-picker {
  /* 非日期视图网格 - 彻底解决编译合并报错 */
}
.yh-date-picker__table--month {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 0; /* 移除 gap 保证范围背景连贯 */
  padding: 12px 0;
}
.yh-date-picker__table--month .yh-date-picker__cell {
  height: 74px;
}
.yh-date-picker__table--month .yh-date-picker__cell .yh-date-picker__cell-content {
  width: 100%;
  max-width: 68px; /* 约束宽度避免过扁 */
  height: 48px;
  border-radius: 14px;
}

.yh-date-picker__table--year {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 0;
  padding: 12px 0;
}
.yh-date-picker__table--year .yh-date-picker__cell {
  height: 74px;
}
.yh-date-picker__table--year .yh-date-picker__cell .yh-date-picker__cell-content {
  width: 100%;
  max-width: 68px;
  height: 48px;
  border-radius: 14px;
}

.yh-date-picker__table--quarter {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 0;
  padding: 12px 0;
}
.yh-date-picker__table--quarter .yh-date-picker__cell {
  height: 90px;
}
.yh-date-picker__table--quarter .yh-date-picker__cell .yh-date-picker__cell-content {
  width: 100%;
  max-width: 68px;
  height: 64px;
  border-radius: 18px;
}

.yh-date-picker {
  /* 快捷预设区域 */
}
.yh-date-picker__presets {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 24px;
  background: var(--yh-date-picker-item-hover);
  border-top: 1px solid rgba(0, 0, 0, 0.04);
}

.yh-date-picker__preset-item {
  padding: 5px 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--yh-date-picker-text-secondary);
  background: var(--yh-bg-color);
  border: 1px solid var(--yh-date-picker-border);
  border-radius: var(--yh-radius-md);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.yh-date-picker__preset-item:hover {
  color: var(--yh-date-picker-primary);
  border-color: var(--yh-date-picker-primary);
  box-shadow: var(--yh-shadow-sm);
  transform: translateY(-1px);
}

.yh-date-picker {
  /* 底部操作 */
}
.yh-date-picker__footer {
  padding: 16px 24px 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
}
.yh-date-picker__footer-time {
  font-weight: 700;
  color: var(--yh-date-picker-text-main);
  font-size: 13px;
  padding: 6px 12px;
  background: var(--yh-date-picker-item-hover);
  border-radius: 10px;
}

.yh-date-picker__footer-btns {
  display: flex;
  gap: 12px;
  margin-left: auto;
}

.yh-date-picker__footer-btn {
  padding: 10px 22px;
  border-radius: var(--yh-radius-lg);
  font-weight: 600;
  font-size: var(--yh-font-size-base);
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid var(--yh-date-picker-border);
  background: var(--yh-bg-color);
  color: var(--yh-date-picker-text-main);
}
.yh-date-picker__footer-btn:hover {
  border-color: var(--yh-date-picker-primary);
  color: var(--yh-date-picker-primary);
  transform: translateY(-1px);
}
.yh-date-picker__footer-btn--confirm {
  background: var(--yh-date-picker-primary);
  color: var(--yh-color-white) !important;
  border: none;
  box-shadow: var(--yh-shadow-md);
}

@keyframes yh-picker-pop {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
