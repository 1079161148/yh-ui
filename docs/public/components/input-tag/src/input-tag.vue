<script setup>
import { computed, ref, useSlots } from "vue";
import { useNamespace, useFormItem, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import { useConfig } from "@yh-ui/hooks";
defineOptions({
  name: "YhInputTag"
});
const props = defineProps({
  modelValue: { type: Array, required: false, default: () => [] },
  type: { type: null, required: false, default: "info" },
  size: { type: null, required: false, default: "default" },
  disabled: { type: Boolean, required: false, default: false },
  readonly: { type: Boolean, required: false, default: false },
  max: { type: Number, required: false },
  separator: { type: [String, Array], required: false, default: () => [",", "Enter"] },
  placeholder: { type: String, required: false, default: "" },
  clearable: { type: Boolean, required: false, default: false },
  addOnBlur: { type: Boolean, required: false, default: true },
  prefix: { type: String, required: false },
  suffix: { type: String, required: false },
  prefixIcon: { type: null, required: false },
  suffixIcon: { type: null, required: false },
  closable: { type: Boolean, required: false, default: true },
  validateTag: { type: Function, required: false },
  trim: { type: Boolean, required: false, default: true },
  allowDuplicate: { type: Boolean, required: false, default: false },
  collapseTags: { type: Boolean, required: false, default: false },
  collapseTagsTooltip: { type: Boolean, required: false, default: false },
  maxCollapseTags: { type: Number, required: false, default: 1 },
  draggable: { type: Boolean, required: false, default: false },
  tagEffect: { type: String, required: false, default: "light" },
  validateEvent: { type: Boolean, required: false, default: true },
  themeOverrides: { type: null, required: false }
});
const emit = defineEmits(["update:modelValue", "change", "input", "add", "remove", "focus", "blur", "clear", "drag-end"]);
const slots = useSlots();
const ns = useNamespace("input-tag");
const { t } = useLocale();
const { themeStyle } = useComponentTheme(
  "input-tag",
  computed(() => props.themeOverrides)
);
const { globalSize } = useConfig();
const inputRef = ref();
const wrapperRef = ref();
const { validate: triggerValidate } = useFormItem();
const inputValue = ref("");
const focused = ref(false);
const hovering = ref(false);
const showTooltip = ref(false);
const dragIndex = ref(null);
const dragOverIndex = ref(null);
const tags = computed(() => props.modelValue || []);
const displayTags = computed(() => {
  if (!props.collapseTags) {
    return tags.value;
  }
  return tags.value.slice(0, props.maxCollapseTags);
});
const collapsedTags = computed(() => {
  if (!props.collapseTags) {
    return [];
  }
  return tags.value.slice(props.maxCollapseTags);
});
const collapsedCount = computed(() => collapsedTags.value.length);
const isMaxReached = computed(() => {
  return props.max !== void 0 && tags.value.length >= props.max;
});
const showClear = computed(() => {
  return props.clearable && !props.disabled && !props.readonly && tags.value.length > 0 && (focused.value || hovering.value);
});
const hasPrefix = computed(() => {
  return !!props.prefix || !!props.prefixIcon || !!slots.prefix;
});
const hasSuffix = computed(() => {
  return !!props.suffix || !!props.suffixIcon || !!slots.suffix || showClear.value;
});
const separators = computed(() => {
  if (Array.isArray(props.separator)) {
    return props.separator;
  }
  return [props.separator];
});
const inputTagClasses = computed(() => [
  ns.b(),
  ns.m(props.size || globalSize.value || "default"),
  ns.is("disabled", props.disabled),
  ns.is("focused", focused.value),
  ns.is("has-prefix", hasPrefix.value),
  ns.is("has-suffix", hasSuffix.value)
]);
const getTagClasses = (index) => [
  ns.e("tag"),
  `is-${props.type}`,
  `is-${props.tagEffect}`,
  {
    "is-dragging": dragIndex.value === index,
    "is-drag-over": dragOverIndex.value === index
  }
];
const addTag = (value) => {
  let tagValue = value;
  if (props.trim) {
    tagValue = tagValue.trim();
  }
  if (!tagValue) {
    return false;
  }
  if (isMaxReached.value) {
    return false;
  }
  if (!props.allowDuplicate && tags.value.includes(tagValue)) {
    return false;
  }
  if (props.validateTag && !props.validateTag(tagValue)) {
    return false;
  }
  const newTags = [...tags.value, tagValue];
  emit("update:modelValue", newTags);
  emit("change", newTags);
  emit("add", tagValue);
  if (props.validateEvent) {
    triggerValidate("change");
  }
  return true;
};
const removeTag = (index) => {
  if (props.disabled || props.readonly) {
    return;
  }
  const removedTag = tags.value[index];
  const newTags = tags.value.filter((_, i) => i !== index);
  emit("update:modelValue", newTags);
  emit("change", newTags);
  emit("remove", removedTag, index);
  if (props.validateEvent) {
    triggerValidate("change");
  }
};
const clearTags = () => {
  if (props.disabled || props.readonly) {
    return;
  }
  emit("update:modelValue", []);
  emit("change", []);
  emit("clear");
  inputValue.value = "";
};
const handleInput = (event) => {
  const target = event.target;
  inputValue.value = target.value;
  emit("input", target.value);
};
const handleKeydown = (event) => {
  if (props.disabled || props.readonly) {
    return;
  }
  const value = inputValue.value;
  if (separators.value.includes(event.key)) {
    event.preventDefault();
    if (addTag(value)) {
      inputValue.value = "";
    }
    return;
  }
  if (event.key === "Backspace" && !value && tags.value.length > 0) {
    removeTag(tags.value.length - 1);
  }
};
const handleFocus = (event) => {
  focused.value = true;
  emit("focus", event);
};
const handleBlur = (event) => {
  focused.value = false;
  if (props.addOnBlur && inputValue.value) {
    if (addTag(inputValue.value)) {
      inputValue.value = "";
    }
  }
  emit("blur", event);
  if (props.validateEvent) {
    triggerValidate("blur");
  }
};
const handleWrapperClick = () => {
  if (!props.disabled && !props.readonly) {
    inputRef.value?.focus();
  }
};
const handleMouseenter = () => {
  hovering.value = true;
};
const handleMouseleave = () => {
  hovering.value = false;
};
const handleCollapseMouseenter = () => {
  if (props.collapseTagsTooltip && collapsedCount.value > 0) {
    showTooltip.value = true;
  }
};
const handleCollapseMouseleave = () => {
  showTooltip.value = false;
};
const handleDragStart = (event, index) => {
  if (!props.draggable || props.disabled || props.readonly) {
    event.preventDefault();
    return;
  }
  dragIndex.value = index;
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
  }
};
const handleDragOver = (event, index) => {
  if (!props.draggable) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
  dragOverIndex.value = index;
};
const handleDragLeave = () => {
  dragOverIndex.value = null;
};
const handleDrop = (event, targetIndex) => {
  if (!props.draggable) return;
  event.preventDefault();
  const sourceIndex = dragIndex.value;
  if (sourceIndex === null || sourceIndex === targetIndex) {
    dragIndex.value = null;
    dragOverIndex.value = null;
    return;
  }
  const newTags = [...tags.value];
  const [removed] = newTags.splice(sourceIndex, 1);
  newTags.splice(targetIndex, 0, removed);
  emit("update:modelValue", newTags);
  emit("change", newTags);
  emit("drag-end", newTags);
  dragIndex.value = null;
  dragOverIndex.value = null;
};
const handleDragEnd = () => {
  dragIndex.value = null;
  dragOverIndex.value = null;
};
const focus = () => {
  inputRef.value?.focus();
};
const blur = () => {
  inputRef.value?.blur();
};
const clear = () => {
  clearTags();
};
defineExpose({
  focus,
  blur,
  clear
});
</script>

<template>
  <div
    ref="wrapperRef"
    :class="inputTagClasses"
    :style="themeStyle"
    @click="handleWrapperClick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <!-- 前缀 -->
    <span v-if="hasPrefix" :class="ns.e('prefix')">
      <slot name="prefix">
        <span v-if="prefix" :class="ns.e('prefix-text')">{{ prefix }}</span>
        <component v-if="prefixIcon && typeof prefixIcon !== 'string'" :is="prefixIcon" />
      </slot>
    </span>

    <!-- 标签区域 -->
    <div :class="ns.e('wrapper')">
      <!-- 已有标签 -->
      <template v-for="(tag, index) in displayTags" :key="index">
        <slot name="tag" :tag="tag" :index="index" :close="() => removeTag(index)">
          <span
            :class="getTagClasses(index)"
            :draggable="draggable && !disabled && !readonly"
            @dragstart="handleDragStart($event, index)"
            @dragover="handleDragOver($event, index)"
            @dragleave="handleDragLeave"
            @drop="handleDrop($event, index)"
            @dragend="handleDragEnd"
          >
            <span :class="ns.e('tag-content')">{{ tag }}</span>
            <span
              v-if="closable && !disabled && !readonly"
              :class="ns.e('tag-close')"
              @click.stop="removeTag(index)"
            >
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
              >
                <path
                  fill="currentColor"
                  d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
                />
              </svg>
            </span>
          </span>
        </slot>
      </template>

      <!-- 折叠标签 -->
      <span
        v-if="collapseTags && collapsedCount > 0"
        :class="[ns.e('collapsed'), `is-${type}`, `is-${tagEffect}`]"
        @mouseenter="handleCollapseMouseenter"
        @mouseleave="handleCollapseMouseleave"
      >
        <slot name="collapseTag" :count="collapsedCount" :tags="collapsedTags">
          + {{ collapsedCount }}
        </slot>

        <!-- Tooltip -->
        <transition name="yh-fade">
          <div v-if="showTooltip && collapseTagsTooltip" :class="ns.e('tooltip')">
            <span
              v-for="(tag, index) in collapsedTags"
              :key="index"
              :class="[ns.e('tooltip-tag'), `is-${type}`, `is-${tagEffect}`]"
            >
              {{ tag }}
            </span>
          </div>
        </transition>
      </span>

      <!-- 输入框 -->
      <input
        ref="inputRef"
        type="text"
        :class="ns.e('inner')"
        :value="inputValue"
        :placeholder="tags.length === 0 ? placeholder || t('inputtag.placeholder') : ''"
        :disabled="disabled"
        :readonly="readonly || isMaxReached"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>

    <!-- 后缀/清空按钮 -->
    <span v-if="hasSuffix" :class="ns.e('suffix')">
      <!-- 清空按钮 -->
      <span v-if="showClear" :class="ns.e('clear')" @click.stop="clearTags">
        <slot name="clearIcon">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm-160-448l128 128-128 128 45.248 45.248L525.248 621.248l128 128L698.496 704l-128-128 128-128L653.248 402.752 525.248 530.752l-128-128z"
            />
          </svg>
        </slot>
      </span>
      <slot name="suffix">
        <span v-if="suffix" :class="ns.e('suffix-text')">{{ suffix }}</span>
        <component v-if="suffixIcon && typeof suffixIcon !== 'string'" :is="suffixIcon" />
      </slot>
    </span>
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
.yh-input-tag {
  --yh-input-tag-min-height: var(--yh-component-size-default);
  --yh-input-tag-font-size: var(--yh-font-size-base);
  --yh-input-tag-bg-color: var(--yh-fill-color-blank);
  --yh-input-tag-border-color: var(--yh-border-color);
  --yh-input-tag-text-color: var(--yh-text-color-regular);
  --yh-input-tag-placeholder-color: var(--yh-text-color-placeholder);
  --yh-input-tag-hover-border-color: var(--yh-input-tag-focus-border-color);
  --yh-input-tag-focus-border-color: var(--yh-color-primary);
  --yh-input-tag-tag-height: 22px;
  --yh-input-tag-gap: 4px;
  position: relative;
  display: flex;
  align-items: center;
  min-height: var(--yh-input-tag-min-height);
  padding: 2px 8px;
  font-size: var(--yh-input-tag-font-size);
  background-color: var(--yh-input-tag-bg-color);
  border: var(--yh-border-width) var(--yh-border-style) var(--yh-input-tag-border-color);
  border-radius: var(--yh-radius-base);
  box-sizing: border-box;
  cursor: text;
  transition: var(--yh-transition-fast);
}
.yh-input-tag:hover:not(.is-disabled) {
  border-color: var(--yh-input-tag-hover-border-color);
}
.yh-input-tag__prefix {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--yh-text-color-placeholder);
  margin-right: 8px;
}

.yh-input-tag__suffix {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: var(--yh-text-color-placeholder);
  margin-left: 8px;
}

.yh-input-tag__prefix-text {
  font-size: inherit;
  white-space: nowrap;
}

.yh-input-tag__suffix-text {
  font-size: inherit;
  white-space: nowrap;
}

.yh-input-tag__wrapper {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--yh-input-tag-gap);
  min-width: 0;
}

.yh-input-tag__tag {
  display: inline-flex;
  align-items: center;
  height: var(--yh-input-tag-tag-height);
  padding: 0 6px;
  font-size: var(--yh-font-size-xs);
  line-height: 1;
  border-radius: var(--yh-radius-sm);
  box-sizing: border-box;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  cursor: default;
  transition: var(--yh-transition-fast);
}
.yh-input-tag__tag.is-light.is-primary {
  color: var(--yh-color-primary);
  background-color: var(--yh-color-primary-light-9);
  border: 1px solid var(--yh-color-primary-light-7);
}

.yh-input-tag__tag.is-light.is-success {
  color: var(--yh-color-success);
  background-color: var(--yh-color-success-light-9);
  border: 1px solid var(--yh-color-success-light-7);
}

.yh-input-tag__tag.is-light.is-warning {
  color: var(--yh-color-warning);
  background-color: var(--yh-color-warning-light-9);
  border: 1px solid var(--yh-color-warning-light-7);
}

.yh-input-tag__tag.is-light.is-danger {
  color: var(--yh-color-danger);
  background-color: var(--yh-color-danger-light-9);
  border: 1px solid var(--yh-color-danger-light-7);
}

.yh-input-tag__tag.is-light.is-info {
  color: var(--yh-color-info);
  background-color: var(--yh-color-info-light-9);
  border: 1px solid var(--yh-color-info-light-7);
}

.yh-input-tag__tag.is-dark {
  color: #fff;
}
.yh-input-tag__tag.is-dark.is-primary {
  background-color: var(--yh-color-primary);
  border: 1px solid var(--yh-color-primary);
}

.yh-input-tag__tag.is-dark.is-success {
  background-color: var(--yh-color-success);
  border: 1px solid var(--yh-color-success);
}

.yh-input-tag__tag.is-dark.is-warning {
  background-color: var(--yh-color-warning);
  border: 1px solid var(--yh-color-warning);
}

.yh-input-tag__tag.is-dark.is-danger {
  background-color: var(--yh-color-danger);
  border: 1px solid var(--yh-color-danger);
}

.yh-input-tag__tag.is-dark.is-info {
  background-color: var(--yh-color-info);
  border: 1px solid var(--yh-color-info);
}

.yh-input-tag__tag.is-plain {
  background-color: transparent;
}
.yh-input-tag__tag.is-plain.is-primary {
  color: var(--yh-color-primary);
  border: 1px solid var(--yh-color-primary-light-5);
}

.yh-input-tag__tag.is-plain.is-success {
  color: var(--yh-color-success);
  border: 1px solid var(--yh-color-success-light-5);
}

.yh-input-tag__tag.is-plain.is-warning {
  color: var(--yh-color-warning);
  border: 1px solid var(--yh-color-warning-light-5);
}

.yh-input-tag__tag.is-plain.is-danger {
  color: var(--yh-color-danger);
  border: 1px solid var(--yh-color-danger-light-5);
}

.yh-input-tag__tag.is-plain.is-info {
  color: var(--yh-color-info);
  border: 1px solid var(--yh-color-info-light-5);
}

.yh-input-tag__tag.is-dragging {
  opacity: 0.5;
}

.yh-input-tag__tag.is-drag-over {
  transform: translateX(4px);
}

.yh-input-tag__tag[draggable=true] {
  cursor: grab;
}
.yh-input-tag__tag[draggable=true]:active {
  cursor: grabbing;
}

.yh-input-tag__tag-content {
  overflow: hidden;
  text-overflow: ellipsis;
}

.yh-input-tag__tag-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin-left: 2px;
  color: inherit;
  cursor: pointer;
  border-radius: 50%;
  transition: var(--yh-transition-fast);
}
.yh-input-tag__tag-close svg {
  width: 10px;
  height: 10px;
}
.yh-input-tag__tag-close:hover {
  background-color: currentColor;
}
.yh-input-tag__tag-close:hover svg {
  color: var(--yh-fill-color-blank);
}

.yh-input-tag__collapsed {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--yh-input-tag-tag-height);
  padding: 0 6px;
  font-size: var(--yh-font-size-xs);
  line-height: 1;
  border-radius: var(--yh-radius-sm);
  cursor: pointer;
  transition: var(--yh-transition-fast);
}
.yh-input-tag__collapsed.is-light.is-info {
  color: var(--yh-text-color-secondary);
  background-color: var(--yh-fill-color-light);
  border: 1px solid var(--yh-border-color-light);
}

.yh-input-tag__collapsed:hover {
  background-color: var(--yh-fill-color);
}

.yh-input-tag__tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  max-width: 300px;
  padding: 8px 12px;
  background-color: var(--yh-bg-color-overlay);
  border: 1px solid var(--yh-border-color-light);
  border-radius: var(--yh-radius-base);
  box-shadow: var(--yh-box-shadow-light);
  z-index: 2000;
}
.yh-input-tag__tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--yh-bg-color-overlay);
}

.yh-input-tag__tooltip-tag {
  display: inline-block;
  padding: 2px 6px;
  font-size: var(--yh-font-size-xs);
  border-radius: var(--yh-radius-sm);
}
.yh-input-tag__tooltip-tag.is-light.is-info {
  color: var(--yh-color-info);
  background-color: var(--yh-color-info-light-9);
}

.yh-input-tag__inner {
  flex: 1;
  min-width: 50px;
  height: var(--yh-input-tag-tag-height);
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  color: var(--yh-input-tag-text-color);
  background: transparent;
  border: none;
  outline: none;
}
.yh-input-tag__inner::placeholder {
  color: var(--yh-input-tag-placeholder-color);
}

.yh-input-tag__clear {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--yh-text-color-placeholder);
  cursor: pointer;
  transition: var(--yh-transition-fast);
}
.yh-input-tag__clear svg {
  width: 14px;
  height: 14px;
}
.yh-input-tag__clear:hover {
  color: var(--yh-text-color-secondary);
}

.yh-input-tag.is-focused {
  border-color: var(--yh-input-tag-focus-border-color);
  box-shadow: 0 0 0 2px var(--yh-color-primary-light-8);
}

.yh-input-tag.is-disabled {
  background-color: var(--yh-fill-color-light);
  cursor: not-allowed;
}
.yh-input-tag.is-disabled .yh-input-tag__inner {
  cursor: not-allowed;
}

.yh-input-tag.is-disabled .yh-input-tag__tag {
  opacity: 0.6;
}

.yh-input-tag--large {
  --yh-input-tag-min-height: var(--yh-component-size-large);
  --yh-input-tag-font-size: var(--yh-font-size-md);
  --yh-input-tag-tag-height: 26px;
  --yh-input-tag-gap: 6px;
  padding: 4px 12px;
}
.yh-input-tag--large .yh-input-tag__tag {
  padding: 0 8px;
  font-size: var(--yh-font-size-sm);
}

.yh-input-tag--large .yh-input-tag__collapsed {
  padding: 0 8px;
  font-size: var(--yh-font-size-sm);
}

.yh-input-tag--large .yh-input-tag__tag-close {
  width: 16px;
  height: 16px;
}
.yh-input-tag--large .yh-input-tag__tag-close svg {
  width: 12px;
  height: 12px;
}

.yh-input-tag--small {
  --yh-input-tag-min-height: var(--yh-component-size-small);
  --yh-input-tag-font-size: var(--yh-font-size-xs);
  --yh-input-tag-tag-height: 18px;
  --yh-input-tag-gap: 2px;
  padding: 1px 6px;
}
.yh-input-tag--small .yh-input-tag__tag {
  padding: 0 4px;
  font-size: 11px;
}

.yh-input-tag--small .yh-input-tag__collapsed {
  padding: 0 4px;
  font-size: 11px;
}

.yh-input-tag--small .yh-input-tag__tag-close {
  width: 12px;
  height: 12px;
  margin-left: 1px;
}
.yh-input-tag--small .yh-input-tag__tag-close svg {
  width: 8px;
  height: 8px;
}

.yh-fade-enter-active,
.yh-fade-leave-active {
  transition: opacity var(--yh-duration-fast) var(--yh-timing-ease-in-out);
}

.yh-fade-enter-from,
.yh-fade-leave-to {
  opacity: 0;
}
</style>
