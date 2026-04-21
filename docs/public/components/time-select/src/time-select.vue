<script setup>
import { computed, ref, nextTick, watch, onMounted, onBeforeUnmount } from "vue";
import { useNamespace, useFormItem, useId, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import { useConfig } from "@yh-ui/hooks";
import { generateTimeOptions, parseTimeToMinutes, isTimeInRange } from "./time-select";
defineOptions({
  name: "YhTimeSelect"
});
const props = defineProps({
  modelValue: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  editable: { type: Boolean, required: false, default: true },
  clearable: { type: Boolean, required: false, default: true },
  size: { type: String, required: false, default: void 0 },
  placeholder: { type: String, required: false, default: "" },
  name: { type: String, required: false },
  effect: { type: String, required: false, default: "light" },
  prefixIcon: { type: null, required: false },
  clearIcon: { type: null, required: false },
  start: { type: String, required: false, default: "09:00" },
  end: { type: String, required: false, default: "18:00" },
  step: { type: String, required: false, default: "00:30" },
  minTime: { type: String, required: false },
  maxTime: { type: String, required: false },
  valueOnClear: { type: String, required: false },
  format: { type: String, required: false, default: "HH:mm" },
  popperClass: { type: String, required: false },
  popperStyle: { type: [String, Object], required: false },
  teleported: { type: Boolean, required: false, default: true },
  includeEndTime: { type: Boolean, required: false, default: false },
  validateEvent: { type: Boolean, required: false, default: true },
  options: { type: Array, required: false },
  disabledHours: { type: Array, required: false },
  themeOverrides: { type: null, required: false }
});
const emit = defineEmits(["update:modelValue", "change", "focus", "blur", "clear", "visible-change"]);
const ns = useNamespace("time-select");
const { t } = useLocale();
const inputId = useId();
const { themeStyle } = useComponentTheme(
  "time-select",
  computed(() => props.themeOverrides)
);
const { form, formItem, validate: triggerValidate } = useFormItem();
const { globalSize } = useConfig();
const selectSize = computed(
  () => props.size || formItem?.size || form?.size || globalSize.value || "default"
);
const wrapperRef = ref();
const inputRef = ref();
const optionsRef = ref();
const visible = ref(false);
const focused = ref(false);
const hovering = ref(false);
const query = ref("");
const hoveredIndex = ref(-1);
const isClickingDropdown = ref(false);
const dropdownStyle = ref({});
const timeOptions = computed(() => {
  if (props.options && props.options.length > 0) {
    return props.options;
  }
  return generateTimeOptions(props.start, props.end, props.step, props.format, props.includeEndTime);
});
const filteredOptions = computed(() => {
  let options = timeOptions.value;
  if (props.disabledHours && props.disabledHours.length > 0) {
    options = options.map((opt) => {
      const isDisabled = props.disabledHours.some((range) => {
        if (range.length >= 2) {
          return isTimeInRange(opt.value, range[0], range[1]);
        }
        return false;
      });
      return { ...opt, disabled: opt.disabled || isDisabled };
    });
  }
  if (props.minTime) {
    const minMinutes = parseTimeToMinutes(props.minTime);
    options = options.map((opt) => ({
      ...opt,
      disabled: opt.disabled || parseTimeToMinutes(opt.value) < minMinutes
    }));
  }
  if (props.maxTime) {
    const maxMinutes = parseTimeToMinutes(props.maxTime);
    options = options.map((opt) => ({
      ...opt,
      disabled: opt.disabled || parseTimeToMinutes(opt.value) > maxMinutes
    }));
  }
  if (query.value && props.editable) {
    const q = query.value.toLowerCase();
    return options.filter(
      (opt) => opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q)
    );
  }
  return options;
});
const displayLabel = computed(() => {
  if (!props.modelValue) return "";
  const opt = timeOptions.value.find((o) => o.value === props.modelValue);
  return opt ? opt.label : props.modelValue;
});
const showClear = computed(
  () => props.clearable && !props.disabled && props.modelValue !== void 0 && props.modelValue !== "" && (focused.value || hovering.value)
);
const hasValue = computed(() => props.modelValue !== void 0 && props.modelValue !== "");
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(selectSize.value),
  ns.is("disabled", props.disabled),
  ns.is("focused", focused.value || visible.value)
]);
const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return;
  const rect = wrapperRef.value.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const dropdownHeight = 274;
  const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;
  const styles = window.getComputedStyle(wrapperRef.value);
  const primary = styles.getPropertyValue("--yh-color-primary").trim();
  const primaryRgb = styles.getPropertyValue("--yh-color-primary-rgb").trim();
  dropdownStyle.value = {
    position: "fixed",
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: "2000",
    "--yh-color-primary": primary,
    "--yh-color-primary-rgb": primaryRgb,
    ...showAbove ? { bottom: `${window.innerHeight - rect.top + 4}px` } : { top: `${rect.bottom + 4}px` }
  };
};
const scrollToSelected = () => {
  if (!optionsRef.value || !props.modelValue) return;
  nextTick(() => {
    const selectedEl = optionsRef.value?.querySelector(
      `.${ns.is("selected", true).slice(1)}`
    );
    if (selectedEl && optionsRef.value) {
      const containerHeight = optionsRef.value.clientHeight;
      const scrollTop = selectedEl.offsetTop - containerHeight / 2 + selectedEl.offsetHeight / 2;
      optionsRef.value.scrollTop = Math.max(0, scrollTop);
    }
  });
};
watch(visible, (val) => {
  if (val) {
    if (props.teleported) {
      nextTick(updateDropdownPosition);
    }
    scrollToSelected();
    query.value = "";
  }
  emit("visible-change", val);
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
const handleOptionSelect = (option, event) => {
  if (option.disabled) return;
  if (event) {
    event.stopPropagation();
  }
  emit("update:modelValue", option.value);
  emit("change", option.value);
  visible.value = false;
  query.value = "";
  if (props.validateEvent) {
    triggerValidate("change");
  }
};
const handleClear = (event) => {
  event.stopPropagation();
  const value = props.valueOnClear ?? void 0;
  emit("update:modelValue", value);
  emit("change", value);
  emit("clear");
  query.value = "";
  if (props.validateEvent) {
    triggerValidate("change");
  }
};
const toggleDropdown = () => {
  if (props.disabled) return;
  visible.value = !visible.value;
  if (visible.value) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
};
const handleInput = (event) => {
  if (!props.editable) return;
  const target = event.target;
  query.value = target.value;
};
const handleKeydown = (event) => {
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      if (!visible.value) {
        visible.value = true;
      } else {
        let nextIndex = hoveredIndex.value + 1;
        while (nextIndex < filteredOptions.value.length && filteredOptions.value[nextIndex]?.disabled) {
          nextIndex++;
        }
        if (nextIndex < filteredOptions.value.length) {
          hoveredIndex.value = nextIndex;
        }
      }
      break;
    case "ArrowUp":
      event.preventDefault();
      let prevIndex = hoveredIndex.value - 1;
      while (prevIndex >= 0 && filteredOptions.value[prevIndex]?.disabled) {
        prevIndex--;
      }
      if (prevIndex >= 0) {
        hoveredIndex.value = prevIndex;
      }
      break;
    case "Enter":
      event.preventDefault();
      if (visible.value && hoveredIndex.value >= 0 && filteredOptions.value[hoveredIndex.value]) {
        handleOptionSelect(filteredOptions.value[hoveredIndex.value]);
      } else if (!visible.value) {
        visible.value = true;
      }
      break;
    case "Escape":
      visible.value = false;
      break;
    case "Tab":
      visible.value = false;
      break;
  }
};
const handleFocus = (event) => {
  focused.value = true;
  emit("focus", event);
};
const handleBlur = (event) => {
  if (isClickingDropdown.value) {
    return;
  }
  focused.value = false;
  visible.value = false;
  emit("blur", event);
  if (props.validateEvent) {
    triggerValidate("blur");
  }
};
const handleDropdownMousedown = (event) => {
  event.preventDefault();
  isClickingDropdown.value = true;
};
const handleDropdownMouseup = () => {
  setTimeout(() => {
    isClickingDropdown.value = false;
  }, 0);
};
const handleOptionClick = (option, event) => {
  event.stopPropagation();
  handleOptionSelect(option, event);
  nextTick(() => {
    inputRef.value?.focus();
  });
};
const handleMouseEnter = () => {
  hovering.value = true;
};
const handleMouseLeave = () => {
  hovering.value = false;
};
const focus = () => {
  inputRef.value?.focus();
};
const blur = () => {
  inputRef.value?.blur();
};
defineExpose({
  focus,
  blur,
  inputRef
});
</script>

<template>
  <div
    ref="wrapperRef"
    :class="wrapperClasses"
    :style="themeStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="toggleDropdown"
  >
    <!-- 输入区域 -->
    <div :class="ns.e('wrapper')">
      <!-- 前缀图标 -->
      <span :class="ns.e('prefix')">
        <slot name="prefix">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" :class="ns.e('icon')">
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 128a32 32 0 0 1 32 32v192l128 64a32 32 0 0 1-28.864 57.088l-144-72A32 32 0 0 1 480 512V288a32 32 0 0 1 32-32z"
            />
          </svg>
        </slot>
      </span>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        :id="inputId"
        :class="ns.e('inner')"
        :value="editable && visible ? query : ''"
        :placeholder="hasValue ? '' : placeholder || t('timeselect.placeholder')"
        :disabled="disabled"
        :readonly="!editable"
        :name="name"
        autocomplete="off"
        role="combobox"
        :aria-expanded="visible"
        :aria-controls="`${inputId}-listbox`"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />

      <!-- 显示值 -->
      <span v-if="hasValue && !(editable && visible && query)" :class="ns.e('display-value')">
        {{ displayLabel }}
      </span>

      <!-- 后缀图标 -->
      <span :class="ns.e('suffix')">
        <!-- 清空按钮 -->
        <span v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]" @click.stop="handleClear">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
            />
          </svg>
        </span>

        <!-- 箭头图标 -->
        <span :class="[ns.e('icon'), ns.e('arrow'), {
  'is-reverse': visible
}]">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
            />
          </svg>
        </span>
      </span>
    </div>

    <!-- 下拉框 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition :name="ns.b('dropdown')">
        <div
          v-show="visible"
          :class="[ns.e('dropdown'), popperClass, `is-${effect}`]"
          :style="teleported ? dropdownStyle : {}"
          @mousedown="handleDropdownMousedown"
          @mouseup="handleDropdownMouseup"
        >
          <!-- 无数据 -->
          <div v-if="filteredOptions.length === 0" :class="ns.e('empty')">
            <slot name="empty">
              {{ t("select.noData") }}
            </slot>
          </div>

          <!-- 选项列表 -->
          <div
            v-else
            ref="optionsRef"
            :id="`${inputId}-listbox`"
            :class="ns.e('options')"
            role="listbox"
          >
            <div
              v-for="(option, index) in filteredOptions"
              :key="option.value"
              :class="[ns.e('option'), ns.is('selected', modelValue === option.value), ns.is('disabled', option.disabled), ns.is('hovering', hoveredIndex === index)]"
              role="option"
              :aria-selected="modelValue === option.value"
              @mousedown.prevent
              @click="handleOptionClick(option, $event)"
              @mouseenter="hoveredIndex = index"
            >
              <slot name="option" :option="option">
                {{ option.label }}
              </slot>
              <span v-if="modelValue === option.value" :class="ns.e('option-check')">
                <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                  <path
                    fill="currentColor"
                    d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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
.yh-time-select {
  --yh-time-select-height: var(--yh-component-size-default, 32px);
  --yh-time-select-font-size: var(--yh-font-size-base, 14px);
  --yh-time-select-icon-size: 14px;
  --yh-time-select-prefix-margin: 12px;
  --yh-time-select-display-padding: 38px;
  position: relative;
  display: inline-flex;
  width: 100%;
  cursor: pointer;
}
.yh-time-select__wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--yh-time-select-height);
  font-size: var(--yh-time-select-font-size);
  background-color: var(--yh-fill-color-blank, #fff);
  border: 1px solid var(--yh-border-color, #dcdfe6);
  border-radius: var(--yh-radius-base, 4px);
  transition: var(--yh-transition-base, all 0.2s ease);
  box-sizing: border-box;
}
.yh-time-select__wrapper:hover {
  border-color: var(--yh-border-color-hover, #c0c4cc);
}

.yh-time-select__prefix {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--yh-text-color-placeholder, #a8abb2);
  margin-right: 8px;
  margin-left: var(--yh-time-select-prefix-margin);
  font-size: var(--yh-time-select-icon-size);
}

.yh-time-select__inner {
  flex: 1;
  width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--yh-text-color-primary, #303133);
  font-size: inherit;
  padding: 0;
  cursor: inherit;
}
.yh-time-select__inner::placeholder {
  color: var(--yh-text-color-placeholder, #a8abb2);
}

.yh-time-select__display-value {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-left: var(--yh-time-select-display-padding);
  color: var(--yh-text-color-primary, #303133);
  font-size: inherit;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.yh-time-select__suffix {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 8px;
  gap: 4px;
}

.yh-time-select__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--yh-text-color-placeholder, #a8abb2);
  transition: var(--yh-transition-fast, all 0.15s ease);
  font-size: var(--yh-time-select-icon-size);
}
.yh-time-select__icon svg {
  width: 1em;
  height: 1em;
}

.yh-time-select__clear {
  cursor: pointer;
}
.yh-time-select__clear:hover {
  color: var(--yh-text-color-secondary, #909399);
}

.yh-time-select__arrow {
  transition: transform var(--yh-duration-base, 0.2s) ease;
}
.yh-time-select__arrow.is-reverse {
  transform: rotate(180deg);
}

.yh-time-select__dropdown {
  position: absolute;
  z-index: var(--yh-z-index-popper, 2000);
  background-color: var(--yh-fill-color-blank, #fff);
  border: 1px solid var(--yh-border-color-light, #e4e7ed);
  border-radius: var(--yh-radius-base, 4px);
  box-shadow: var(--yh-shadow-lg);
  overflow: hidden;
}

.yh-time-select__options {
  max-height: 274px;
  overflow-y: auto;
  padding: 4px 0;
}

.yh-time-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  color: var(--yh-text-color-regular, #606266);
  cursor: pointer;
  transition: background-color var(--yh-duration-fast) ease;
}
.yh-time-select__option:hover, .yh-time-select__option.is-hovering {
  background-color: var(--yh-fill-color-light, #f5f7fa);
}
.yh-time-select__option.is-selected {
  color: var(--yh-color-white, #ffffff);
  background-color: var(--yh-color-primary, #409eff);
  font-weight: 700;
}

.yh-time-select__option.is-disabled {
  color: var(--yh-text-color-disabled, #c0c4cc);
  cursor: not-allowed;
}
.yh-time-select__option.is-disabled:hover {
  background-color: transparent;
}

.yh-time-select__option-check {
  display: inline-flex;
  align-items: center;
  color: inherit;
  margin-left: 8px;
}
.yh-time-select__option-check svg {
  width: 14px;
  height: 14px;
}

.yh-time-select__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 14px;
  color: var(--yh-text-color-placeholder, #a8abb2);
}

.yh-time-select {
  /* 尺寸变体 - 通过变量继承解决 BEM 嵌套导致的 at-root 丢失上下文问题 */
}
.yh-time-select--large {
  --yh-time-select-height: var(--yh-component-size-large, 40px);
  --yh-time-select-font-size: var(--yh-font-size-base, 14px);
  --yh-time-select-icon-size: 16px;
  --yh-time-select-display-padding: 42px;
}

.yh-time-select--small {
  --yh-time-select-height: var(--yh-component-size-small, 24px);
  --yh-time-select-font-size: var(--yh-font-size-xs, 12px);
  --yh-time-select-icon-size: 12px;
  --yh-time-select-prefix-margin: 8px;
  --yh-time-select-display-padding: 30px;
}

.yh-time-select.is-focused .yh-time-select__wrapper {
  border-color: var(--yh-color-primary);
  box-shadow: 0 0 0 2px var(--yh-color-primary-light-8);
}

.yh-time-select.is-disabled {
  cursor: not-allowed;
}
.yh-time-select.is-disabled .yh-time-select__wrapper {
  background-color: var(--yh-fill-color-light);
  border-color: var(--yh-border-color-light);
  color: var(--yh-text-color-disabled);
  cursor: not-allowed;
}
.yh-time-select.is-disabled .yh-time-select__wrapper:hover {
  border-color: var(--yh-border-color-light);
}
.yh-time-select.is-disabled .yh-time-select__inner {
  color: var(--yh-text-color-disabled);
  cursor: not-allowed;
}
.yh-time-select.is-disabled .yh-time-select__display-value {
  color: var(--yh-text-color-disabled);
}
</style>
