<script setup>
import { inject, onMounted, onBeforeUnmount, provide, reactive, ref, computed, toRefs } from "vue";
import AsyncValidator, {} from "async-validator";
import { formItemProps } from "./form-item";
import { useNamespace, useLocale, FormContextKey, FormItemContextKey, useId } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import { useConfig } from "@yh-ui/hooks";
import { get, set } from "@yh-ui/utils";
defineOptions({
  name: "YhFormItem"
});
const props = defineProps(formItemProps);
const ns = useNamespace("form-item");
const { t } = useLocale();
const formContext = inject(FormContextKey, null);
const { globalSize } = useConfig();
const { themeStyle } = useComponentTheme(
  "form-item",
  computed(
    () => props.themeOverrides || formContext?.themeOverrides
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
  const formRules = formContext?.rules;
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
  const model = formContext?.model;
  if (!model || !props.prop) return void 0;
  return get(model, props.prop);
});
const labelStyle = computed(() => {
  const width = props.labelWidth || formContext?.labelWidth;
  if (width) {
    return { width: typeof width === "number" ? `${width}px` : width };
  }
  return {};
});
const itemSize = computed(() => props.size || formContext?.size || globalSize.value || "default");
const isDisabled = computed(() => props.disabled || formContext?.disabled || false);
const validate = async (trigger = "", callback) => {
  const rules = trigger ? itemRules.value.filter(
    (rule) => !rule.trigger || (Array.isArray(rule.trigger) ? rule.trigger.includes(trigger) : rule.trigger === trigger)
  ) : itemRules.value;
  if (rules.length === 0) {
    callback?.(true);
    return true;
  }
  innerValidateStatus.value = "validating";
  const descriptor = { [props.prop]: rules };
  const validator = new AsyncValidator(descriptor);
  const model = { [props.prop]: fieldValue.value };
  return validator.validate(model, { firstFields: true }).then(() => {
    innerValidateStatus.value = "success";
    innerValidateMessage.value = "";
    callback?.(true);
    return true;
  }).catch((errorData) => {
    innerValidateStatus.value = "error";
    const { errors } = errorData || {};
    if (errors && errors.length > 0) {
      innerValidateMessage.value = errors[0].message || t("form.validationFailed");
    } else {
      innerValidateMessage.value = typeof errorData === "string" ? errorData : t("form.validationFailed");
    }
    callback?.(false);
    return Promise.reject(errorData);
  });
};
const resetField = () => {
  innerValidateStatus.value = "";
  innerValidateMessage.value = "";
  const model = formContext?.model;
  if (model && props.prop && initialValue.value !== void 0) {
    set(model, props.prop, initialValue.value);
  }
};
const clearValidate = () => {
  innerValidateStatus.value = "";
  innerValidateMessage.value = "";
};
const context = reactive({
  ...toRefs(props),
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
});
provide(FormItemContextKey, context);
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    if (fieldValue.value !== void 0) {
      try {
        initialValue.value = JSON.parse(JSON.stringify(fieldValue.value));
      } catch {
        initialValue.value = fieldValue.value;
      }
    }
  }
});
onBeforeUnmount(() => {
  if (props.prop) {
    formContext?.removeField(context);
  }
});
defineExpose({
  validate,
  resetField,
  clearValidate,
  validateStatus: currentValidateStatus,
  validateMessage: currentValidateMessage,
  size: itemSize
});
</script>

<template>
  <div
    :class="[ns.b(), ns.m(itemSize), ns.is('error', currentValidateStatus === 'error'), ns.is('validating', currentValidateStatus === 'validating'), ns.is('success', currentValidateStatus === 'success'), ns.is('required', isRequired), ns.is('disabled', isDisabled)]"
    :style="themeStyle"
    :data-prop="prop"
  >
    <!-- 标签 -->
    <label
      v-if="label || $slots.label"
      :id="labelId"
      :for="contentId"
      :class="ns.e('label')"
      :style="labelStyle"
    >
      <slot name="label">{{ label }}{{ formContext?.labelSuffix }}</slot>
    </label>

    <div :class="ns.e('content')" :id="contentId">
      <slot />

      <!-- 状态图标 -->
      <div
        v-if="formContext?.statusIcon && currentValidateStatus"
        :class="[ns.e('status-icon'), ns.is(currentValidateStatus)]"
      >
        <svg
          v-if="currentValidateStatus === 'success'"
          viewBox="0 0 1024 1024"
          width="16"
          height="16"
        >
          <path
            fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.32l-114.944-114.88a32 32 0 1 0-45.248 45.248l137.536 137.472a32 32 0 0 0 45.248 0l310.4-310.272a32 32 0 1 0-45.248-45.248L456.192 600.32z"
          />
        </svg>
        <svg
          v-else-if="currentValidateStatus === 'error'"
          viewBox="0 0 1024 1024"
          width="16"
          height="16"
        >
          <path
            fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
          />
        </svg>
      </div>

      <!-- 校验提示 - 确保即使没有点击提交，通过触发 blur/change 也能即时显示 -->
      <Transition name="yh-fade">
        <div
          v-if="currentValidateStatus === 'error' && showMessage && (formContext?.showMessage ?? true)"
          :id="errorId"
          :class="[ns.e('error'), ns.is(errorPosition)]"
          role="alert"
          aria-live="polite"
        >
          {{ currentValidateMessage }}
        </div>
      </Transition>
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
:root {
  --yh-form-item-height: 32px;
  --yh-form-item-margin-bottom: 22px;
  --yh-form-label-font-size: 14px;
}

.yh-form--inline {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0 18px;
}
.yh-form--inline .yh-form-item {
  display: inline-flex;
  align-items: flex-start;
  margin-right: 0;
  margin-bottom: 18px;
  vertical-align: top;
}
.yh-form--inline .yh-form-item__label {
  height: var(--yh-form-item-height);
  line-height: var(--yh-form-item-height);
}
.yh-form--inline .yh-form-item__content {
  line-height: var(--yh-form-item-height);
}
.yh-form--grid {
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px;
  margin-right: -12px;
}
.yh-form--grid .yh-form-col {
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
}
.yh-form--grid .yh-form-col--1 {
  flex: 0 0 calc(4.1666666667% * 1);
  max-width: calc(4.1666666667% * 1);
}
.yh-form--grid .yh-form-col--2 {
  flex: 0 0 calc(4.1666666667% * 2);
  max-width: calc(4.1666666667% * 2);
}
.yh-form--grid .yh-form-col--3 {
  flex: 0 0 calc(4.1666666667% * 3);
  max-width: calc(4.1666666667% * 3);
}
.yh-form--grid .yh-form-col--4 {
  flex: 0 0 calc(4.1666666667% * 4);
  max-width: calc(4.1666666667% * 4);
}
.yh-form--grid .yh-form-col--5 {
  flex: 0 0 calc(4.1666666667% * 5);
  max-width: calc(4.1666666667% * 5);
}
.yh-form--grid .yh-form-col--6 {
  flex: 0 0 calc(4.1666666667% * 6);
  max-width: calc(4.1666666667% * 6);
}
.yh-form--grid .yh-form-col--7 {
  flex: 0 0 calc(4.1666666667% * 7);
  max-width: calc(4.1666666667% * 7);
}
.yh-form--grid .yh-form-col--8 {
  flex: 0 0 calc(4.1666666667% * 8);
  max-width: calc(4.1666666667% * 8);
}
.yh-form--grid .yh-form-col--9 {
  flex: 0 0 calc(4.1666666667% * 9);
  max-width: calc(4.1666666667% * 9);
}
.yh-form--grid .yh-form-col--10 {
  flex: 0 0 calc(4.1666666667% * 10);
  max-width: calc(4.1666666667% * 10);
}
.yh-form--grid .yh-form-col--11 {
  flex: 0 0 calc(4.1666666667% * 11);
  max-width: calc(4.1666666667% * 11);
}
.yh-form--grid .yh-form-col--12 {
  flex: 0 0 calc(4.1666666667% * 12);
  max-width: calc(4.1666666667% * 12);
}
.yh-form--grid .yh-form-col--13 {
  flex: 0 0 calc(4.1666666667% * 13);
  max-width: calc(4.1666666667% * 13);
}
.yh-form--grid .yh-form-col--14 {
  flex: 0 0 calc(4.1666666667% * 14);
  max-width: calc(4.1666666667% * 14);
}
.yh-form--grid .yh-form-col--15 {
  flex: 0 0 calc(4.1666666667% * 15);
  max-width: calc(4.1666666667% * 15);
}
.yh-form--grid .yh-form-col--16 {
  flex: 0 0 calc(4.1666666667% * 16);
  max-width: calc(4.1666666667% * 16);
}
.yh-form--grid .yh-form-col--17 {
  flex: 0 0 calc(4.1666666667% * 17);
  max-width: calc(4.1666666667% * 17);
}
.yh-form--grid .yh-form-col--18 {
  flex: 0 0 calc(4.1666666667% * 18);
  max-width: calc(4.1666666667% * 18);
}
.yh-form--grid .yh-form-col--19 {
  flex: 0 0 calc(4.1666666667% * 19);
  max-width: calc(4.1666666667% * 19);
}
.yh-form--grid .yh-form-col--20 {
  flex: 0 0 calc(4.1666666667% * 20);
  max-width: calc(4.1666666667% * 20);
}
.yh-form--grid .yh-form-col--21 {
  flex: 0 0 calc(4.1666666667% * 21);
  max-width: calc(4.1666666667% * 21);
}
.yh-form--grid .yh-form-col--22 {
  flex: 0 0 calc(4.1666666667% * 22);
  max-width: calc(4.1666666667% * 22);
}
.yh-form--grid .yh-form-col--23 {
  flex: 0 0 calc(4.1666666667% * 23);
  max-width: calc(4.1666666667% * 23);
}
.yh-form--grid .yh-form-col--24 {
  flex: 0 0 calc(4.1666666667% * 24);
  max-width: calc(4.1666666667% * 24);
}
.yh-form--large {
  --yh-form-item-height: 40px;
  --yh-form-label-font-size: 14px;
  --yh-component-size-default: 40px;
}

.yh-form--default {
  --yh-form-item-height: 32px;
  --yh-form-label-font-size: 14px;
  --yh-component-size-default: 32px;
}

.yh-form--small {
  --yh-form-item-height: 24px;
  --yh-form-label-font-size: 12px;
  --yh-component-size-default: 24px;
}

.yh-form-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: var(--yh-form-item-margin-bottom);
  position: relative;
}
.yh-form--label-left .yh-form-item__label {
  justify-content: flex-start;
}
.yh-form--label-top .yh-form-item {
  flex-direction: column;
}
.yh-form--label-top .yh-form-item__label {
  justify-content: flex-start;
  margin-bottom: 8px;
  width: 100% !important;
  text-align: left;
  height: auto;
  line-height: 1.5;
}
.yh-form-item__label {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
  font-size: var(--yh-form-label-font-size);
  color: var(--yh-text-color-regular, #606266);
  height: var(--yh-form-item-height);
  line-height: var(--yh-form-item-height);
  box-sizing: border-box;
  flex-shrink: 0;
  white-space: nowrap;
}
.yh-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  position: relative;
  font-size: 14px;
  min-width: 0;
  min-height: var(--yh-form-item-height);
  line-height: var(--yh-form-item-height);
}
.yh-form-item__content > .yh-input,
.yh-form-item__content > .yh-select,
.yh-form-item__content > .yh-input-number {
  width: 100%;
}
.yh-form-item__error {
  color: var(--yh-color-danger, #f56c6c);
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
}
.yh-form-item__error.is-center {
  text-align: center;
}
.yh-form-item__error.is-right {
  text-align: right;
}
.yh-form-item__status-icon {
  position: absolute;
  right: 10px;
  top: 0;
  height: var(--yh-form-item-height);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: none;
}
.yh-form-item__status-icon svg {
  width: 14px;
  height: 14px;
}
.yh-form-item__status-icon.is-success {
  color: var(--yh-color-success, #67c23a);
}
.yh-form-item__status-icon.is-error {
  color: var(--yh-color-danger, #f56c6c);
}
.yh-form-item__status-icon.is-validating {
  color: var(--yh-color-primary, #409eff);
}
.yh-form-item__status-icon.is-validating svg {
  animation: yh-rotating 2s linear infinite;
}
.yh-form-item.is-required:not(.is-no-asterisk) > .yh-form-item__label::before {
  content: "*";
  color: var(--yh-color-danger, #f56c6c);
  margin-right: 4px;
}
.yh-form-item.is-error .yh-input__inner,
.yh-form-item.is-error .yh-input-number__wrapper,
.yh-form-item.is-error .yh-select__wrapper,
.yh-form-item.is-error .yh-textarea__inner {
  border-color: var(--yh-color-danger, #f56c6c) !important;
}
.yh-form-item.is-error .yh-input__inner:hover, .yh-form-item.is-error .yh-input__inner:focus,
.yh-form-item.is-error .yh-input-number__wrapper:hover,
.yh-form-item.is-error .yh-input-number__wrapper:focus,
.yh-form-item.is-error .yh-select__wrapper:hover,
.yh-form-item.is-error .yh-select__wrapper:focus,
.yh-form-item.is-error .yh-textarea__inner:hover,
.yh-form-item.is-error .yh-textarea__inner:focus {
  border-color: var(--yh-color-danger, #f56c6c) !important;
}
.yh-form-item.is-success .yh-input__inner,
.yh-form-item.is-success .yh-input-number__wrapper,
.yh-form-item.is-success .yh-select__wrapper,
.yh-form-item.is-success .yh-textarea__inner {
  border-color: var(--yh-color-success, #67c23a) !important;
}
.yh-form-item--large {
  --yh-form-item-height: 40px;
  --yh-component-size-default: 40px;
}

.yh-form-item--default {
  --yh-form-item-height: 32px;
  --yh-component-size-default: 32px;
}

.yh-form-item--small {
  --yh-form-item-height: 24px;
  --yh-form-label-font-size: 12px;
  --yh-component-size-default: 24px;
}

@keyframes yh-rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.yh-fade-enter-active,
.yh-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.yh-fade-enter-from,
.yh-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
