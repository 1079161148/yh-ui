<script setup>
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, useSlots } from "vue";
import { useNamespace, useFormItem, useId, useZIndex, useLocale, useConfig } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
defineOptions({ name: "YhMention" });
const props = defineProps({
  modelValue: { type: String, required: false, default: "" },
  options: { type: Array, required: false, default: () => [] },
  triggers: { type: Array, required: false, default: () => ["@"] },
  type: { type: String, required: false, default: "input" },
  placement: { type: null, required: false, default: "bottom" },
  placeholder: { type: String, required: false },
  disabled: { type: Boolean, required: false, default: false },
  readonly: { type: Boolean, required: false, default: false },
  size: { type: null, required: false, default: void 0 },
  maxlength: { type: Number, required: false },
  clearable: { type: Boolean, required: false, default: false },
  showWordLimit: { type: Boolean, required: false, default: false },
  prefixIcon: { type: null, required: false },
  suffixIcon: { type: null, required: false },
  maxCount: { type: Number, required: false, default: 8 },
  filterOption: { type: [Function, Boolean], required: false, default: void 0 },
  loading: { type: Boolean, required: false, default: false },
  loadingText: { type: String, required: false, default: void 0 },
  noDataText: { type: String, required: false, default: void 0 },
  teleported: { type: Boolean, required: false, default: true },
  popperClass: { type: String, required: false, default: "" },
  split: { type: String, required: false, default: " " },
  wholeWord: { type: Boolean, required: false, default: false },
  autofocus: { type: Boolean, required: false, default: false },
  rows: { type: Number, required: false, default: 3 },
  autosize: { type: [Boolean, Object], required: false },
  debounce: { type: Number, required: false, default: 100 },
  validateEvent: { type: Boolean, required: false, default: true },
  themeOverrides: { type: null, required: false }
});
const emit = defineEmits(["update:modelValue", "input", "change", "focus", "blur", "clear", "search", "select", "open", "close", "keydown"]);
const slots = useSlots();
const ns = useNamespace("mention");
const inputId = useId();
const { t } = useLocale();
const { nextZIndex } = useZIndex();
const { themeStyle } = useComponentTheme(
  "mention",
  computed(() => props.themeOverrides)
);
const { form, formItem, validate: triggerValidate } = useFormItem();
const { globalSize } = useConfig();
const mentionSize = computed(
  () => props.size || formItem?.size || form?.size || globalSize.value || "default"
);
const mentionDisabled = computed(() => props.disabled || form?.disabled || false);
const inputRef = ref();
const wrapperRef = ref();
const dropdownRef = ref();
const focused = ref(false);
const hovering = ref(false);
const dropdownVisible = ref(false);
const isClickingDropdown = ref(false);
const highlightedIndex = ref(-1);
const dropdownZIndex = ref(nextZIndex());
const triggerPos = ref(null);
const filteredOptions = computed(() => {
  const keyword = triggerPos.value?.keyword ?? "";
  return props.options.filter((opt) => {
    if (props.filterOption === false) return true;
    if (typeof props.filterOption === "function") {
      return props.filterOption(keyword, opt);
    }
    const text = (opt.label ?? opt.value).toLowerCase();
    return text.includes(keyword.toLowerCase());
  });
});
const groupedOptions = computed(() => {
  const map = /* @__PURE__ */ new Map();
  for (const opt of filteredOptions.value) {
    const g = opt.group ?? "";
    if (!map.has(g)) map.set(g, []);
    map.get(g).push(opt);
  }
  return map;
});
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(mentionSize.value),
  ns.is("disabled", mentionDisabled.value),
  ns.is("focused", focused.value),
  ns.is("textarea", props.type === "textarea"),
  !!slots.prefix || !!props.prefixIcon ? ns.is("prefix", true) : "",
  !!slots.suffix || !!props.suffixIcon || props.clearable ? ns.is("suffix", true) : ""
]);
const dropdownStyle = ref({});
const updateDropdownPosition = () => {
  if (!wrapperRef.value || !props.teleported) return;
  const rect = wrapperRef.value.getBoundingClientRect();
  const style = {
    position: "fixed",
    zIndex: String(dropdownZIndex.value),
    minWidth: `${rect.width}px`
  };
  if (props.placement === "top") {
    style.bottom = `${window.innerHeight - rect.top + 4}px`;
    style.left = `${rect.left}px`;
  } else {
    style.top = `${rect.bottom + 4}px`;
    style.left = `${rect.left}px`;
  }
  dropdownStyle.value = style;
};
watch(dropdownVisible, (val) => {
  if (val) {
    dropdownZIndex.value = nextZIndex();
    nextTick(updateDropdownPosition);
    emit("open");
  } else {
    emit("close");
  }
});
const parseTrigger = (value, cursorIndex) => {
  for (const trigger of props.triggers) {
    const segment = value.substring(0, cursorIndex);
    const lastIdx = segment.lastIndexOf(trigger);
    if (lastIdx === -1) continue;
    const after = segment.substring(lastIdx + trigger.length);
    if (/\s/.test(after)) continue;
    const before = segment[lastIdx - 1];
    if (before !== void 0 && !/[\s\n]/.test(before)) continue;
    return {
      index: lastIdx,
      trigger,
      keyword: after
    };
  }
  return null;
};
let debounceTimer = null;
const debouncedSearch = (keyword, trigger) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit("search", keyword, trigger);
  }, props.debounce);
};
const handleInput = (event) => {
  const target = event.target;
  const value = target.value;
  const rawCursor = target.selectionStart;
  const cursor = rawCursor === null || rawCursor === 0 && value.length > 0 ? value.length : rawCursor;
  emit("update:modelValue", value);
  emit("input", value);
  const hit = parseTrigger(value, cursor);
  if (hit) {
    triggerPos.value = hit;
    dropdownVisible.value = true;
    highlightedIndex.value = 0;
    debouncedSearch(hit.keyword, hit.trigger);
  } else {
    dropdownVisible.value = false;
    triggerPos.value = null;
  }
};
const handleChange = (event) => {
  const target = event.target;
  emit("change", target.value);
  if (props.validateEvent) triggerValidate("change");
};
const handleFocus = (event) => {
  focused.value = true;
  emit("focus", event);
};
const handleBlur = (event) => {
  setTimeout(() => {
    if (!isClickingDropdown.value) {
      focused.value = false;
      dropdownVisible.value = false;
      triggerPos.value = null;
      emit("blur", event);
      if (props.validateEvent) triggerValidate("blur");
    }
  }, 150);
};
const handleKeydown = (event) => {
  emit("keydown", event);
  if (!dropdownVisible.value) return;
  const total = filteredOptions.value.length;
  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      highlightedIndex.value = (highlightedIndex.value + 1) % total;
      break;
    case "ArrowUp":
      event.preventDefault();
      highlightedIndex.value = (highlightedIndex.value - 1 + total) % total;
      break;
    case "Enter":
      event.preventDefault();
      if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
        selectOption(filteredOptions.value[highlightedIndex.value]);
      }
      break;
    case "Escape":
      event.preventDefault();
      dropdownVisible.value = false;
      triggerPos.value = null;
      break;
    case "Tab":
      if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
        event.preventDefault();
        selectOption(filteredOptions.value[highlightedIndex.value]);
      } else {
        dropdownVisible.value = false;
      }
      break;
  }
};
const selectOption = (option) => {
  if (option.disabled || !triggerPos.value) return;
  const { index, trigger } = triggerPos.value;
  const before = (props.modelValue ?? "").substring(0, index);
  const after = (() => {
    const cursor = inputRef.value?.selectionStart ?? (props.modelValue ?? "").length;
    return (props.modelValue ?? "").substring(cursor);
  })();
  const label = option.label ?? option.value;
  const insertText = props.wholeWord ? `${trigger}${label}${props.split}` : `${trigger}${label}${props.split}`;
  const newValue = before + insertText + after;
  emit("update:modelValue", newValue);
  emit("select", option, trigger);
  dropdownVisible.value = false;
  triggerPos.value = null;
  nextTick(() => {
    const el = inputRef.value;
    if (!el) return;
    const pos = before.length + insertText.length;
    el.setSelectionRange(pos, pos);
    el.focus();
  });
  if (props.validateEvent) triggerValidate("change");
};
const showClear = computed(
  () => props.clearable && !mentionDisabled.value && !props.readonly && !!props.modelValue && (focused.value || hovering.value)
);
const handleClear = () => {
  emit("update:modelValue", "");
  emit("change", "");
  emit("clear");
  dropdownVisible.value = false;
  triggerPos.value = null;
  nextTick(() => focus());
};
const handleOutsideClick = (e) => {
  const target = e.target;
  if (wrapperRef.value?.contains(target) || dropdownRef.value?.contains(target)) return;
  dropdownVisible.value = false;
  triggerPos.value = null;
};
const handleResize = () => {
  if (dropdownVisible.value) updateDropdownPosition();
};
onMounted(() => {
  if (typeof window !== "undefined") {
    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("resize", handleResize);
    if (props.teleported) {
      window.addEventListener("scroll", handleResize, true);
    }
  }
});
onBeforeUnmount(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("click", handleOutsideClick);
    window.removeEventListener("resize", handleResize);
    if (props.teleported) {
      window.removeEventListener("scroll", handleResize, true);
    }
  }
  if (debounceTimer) clearTimeout(debounceTimer);
});
const insertMention = (option, trigger) => {
  const t2 = trigger ?? props.triggers[0] ?? "@";
  const label = option.label ?? option.value;
  const insertText = `${t2}${label}${props.split}`;
  const current = props.modelValue ?? "";
  const cursor = inputRef.value?.selectionStart ?? current.length;
  const newValue = current.substring(0, cursor) + insertText + current.substring(cursor);
  emit("update:modelValue", newValue);
};
const focus = () => inputRef.value?.focus();
const blur = () => inputRef.value?.blur();
const clear = () => handleClear();
defineExpose({
  get ref() {
    return inputRef.value;
  },
  get wrapperRef() {
    return wrapperRef.value;
  },
  focus,
  blur,
  clear,
  insertMention
});
const textLength = computed(() => (props.modelValue ?? "").length);
</script>

<template>
  <div
    ref="wrapperRef"
    :class="wrapperClasses"
    :style="themeStyle"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- 前缀 -->
    <span v-if="slots.prefix || prefixIcon" :class="ns.e('prefix')">
      <slot name="prefix">
        <component
          v-if="prefixIcon && typeof prefixIcon !== 'string'"
          :is="prefixIcon"
          :class="ns.e('icon')"
        />
        <span v-else-if="prefixIcon" :class="ns.e('icon')">{{ prefixIcon }}</span>
      </slot>
    </span>

    <!-- 输入框 -->
    <textarea
      v-if="type === 'textarea'"
      :id="inputId"
      ref="inputRef"
      :class="ns.e('inner')"
      :value="modelValue"
      :placeholder="placeholder || t('mention.placeholder')"
      :disabled="mentionDisabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :rows="rows"
      :autofocus="autofocus"
      role="combobox"
      :aria-expanded="dropdownVisible"
      :aria-autocomplete="'list'"
      :aria-controls="`${inputId}-listbox`"
      :aria-activedescendant="highlightedIndex >= 0 ? `${inputId}-option-${highlightedIndex}` : void 0"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />
    <input
      v-else
      :id="inputId"
      ref="inputRef"
      :class="ns.e('inner')"
      type="text"
      :value="modelValue"
      :placeholder="placeholder || t('mention.placeholder')"
      :disabled="mentionDisabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :autofocus="autofocus"
      role="combobox"
      :aria-expanded="dropdownVisible"
      :aria-autocomplete="'list'"
      :aria-controls="`${inputId}-listbox`"
      :aria-activedescendant="highlightedIndex >= 0 ? `${inputId}-option-${highlightedIndex}` : void 0"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />

    <!-- 后缀 / 清空 -->
    <span v-if="slots.suffix || suffixIcon || showClear || showWordLimit" :class="ns.e('suffix')">
      <!-- 清空按钮 -->
      <span
        v-if="showClear"
        :class="[ns.e('icon'), ns.e('clear')]"
        @mousedown.prevent
        @click.stop="handleClear"
        aria-label="Clear"
      >
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
          <path
            fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
          />
        </svg>
      </span>
      <!-- 字数统计 -->
      <span v-if="showWordLimit && maxlength" :class="ns.e('count')">
        {{ textLength }} / {{ maxlength }}
      </span>
      <!-- 自定义后缀 -->
      <slot name="suffix">
        <component
          v-if="suffixIcon && typeof suffixIcon !== 'string'"
          :is="suffixIcon"
          :class="ns.e('icon')"
        />
        <span v-else-if="suffixIcon" :class="ns.e('icon')">{{ suffixIcon }}</span>
      </slot>
    </span>

    <!-- 下拉面板 -->
    <Teleport to="body" :disabled="!teleported">
      <Transition :name="ns.b('dropdown')">
        <div
          v-show="dropdownVisible"
          ref="dropdownRef"
          :id="`${inputId}-listbox`"
          :class="[ns.e('dropdown'), popperClass]"
          :style="teleported ? {
  ...themeStyle,
  ...dropdownStyle
} : themeStyle"
          role="listbox"
          @mousedown="isClickingDropdown = true"
          @mouseup="isClickingDropdown = false"
        >
          <!-- 加载中 -->
          <div v-if="loading" :class="ns.e('loading')">
            <slot name="loading">
              <svg
                :class="ns.e('loading-icon')"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32z"
                />
              </svg>
              <span>{{ loadingText || t("mention.loading") }}</span>
            </slot>
          </div>

          <!-- 无数据 -->
          <div v-else-if="!loading && filteredOptions.length === 0" :class="ns.e('empty')">
            <slot name="empty">
              <span>{{ noDataText || t("mention.noData") }}</span>
            </slot>
          </div>

          <!-- 选项列表（分组支持） -->
          <template v-else>
            <template v-for="[group, groupOpts] in groupedOptions" :key="group">
              <!-- 分组标题 -->
              <div v-if="group" :class="ns.e('group-label')">{{ group }}</div>
              <!-- 选项条目 -->
              <div
                v-for="option in groupOpts"
                :key="option.value"
                :id="`${inputId}-option-${filteredOptions.indexOf(option)}`"
                :class="[ns.e('option'), ns.is('highlighted', filteredOptions.indexOf(option) === highlightedIndex), ns.is('disabled', !!option.disabled)]"
                role="option"
                :aria-selected="filteredOptions.indexOf(option) === highlightedIndex"
                :aria-disabled="option.disabled"
                @mousedown.prevent
                @click="selectOption(option)"
                @mouseenter="highlightedIndex = filteredOptions.indexOf(option)"
              >
                <slot name="option" :option="option" :keyword="triggerPos?.keyword ?? ''">
                  <!-- 头像 -->
                  <img
                    v-if="option.avatar"
                    :src="option.avatar"
                    :class="ns.e('option-avatar')"
                    :alt="option.label ?? option.value"
                  />
                  <div :class="ns.e('option-content')">
                    <span :class="ns.e('option-label')">{{ option.label ?? option.value }}</span>
                    <span v-if="option.description" :class="ns.e('option-desc')">{{
                      option.description
                    }}</span>
                  </div>
                </slot>
              </div>
            </template>
          </template>
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
.yh-mention {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  font-size: var(--yh-mention-font-size, var(--yh-font-size-base));
  border-radius: var(--yh-mention-border-radius, var(--yh-border-radius-base));
  border: 1px solid var(--yh-mention-border-color, var(--yh-border-color));
  background-color: var(--yh-mention-bg-color, var(--yh-fill-color-blank));
  transition: border-color var(--yh-transition-duration), box-shadow var(--yh-transition-duration);
  box-sizing: border-box;
}
.yh-mention--large {
  height: var(--yh-mention-height-large, var(--yh-component-size-large));
  font-size: var(--yh-font-size-large);
}
.yh-mention--large .yh-mention__inner {
  padding: 0 14px;
}

.yh-mention--default {
  height: var(--yh-mention-height-default, var(--yh-component-size-default));
}

.yh-mention--small {
  height: var(--yh-mention-height-small, var(--yh-component-size-small));
  font-size: var(--yh-font-size-small);
}
.yh-mention--small .yh-mention__inner {
  padding: 0 8px;
}

.yh-mention.is-textarea {
  height: auto;
  align-items: flex-start;
}
.yh-mention.is-textarea .yh-mention__inner {
  resize: vertical;
  min-height: 80px;
  padding: 8px 12px;
  line-height: 1.6;
}

.yh-mention.is-textarea .yh-mention__prefix {
  align-self: flex-start;
  margin-top: 8px;
}

.yh-mention.is-textarea .yh-mention__suffix {
  align-self: flex-start;
  margin-top: 8px;
}

.yh-mention.is-focused {
  border-color: var(--yh-color-primary);
  box-shadow: 0 0 0 2px var(--yh-color-primary-light-8);
}

.yh-mention.is-disabled {
  cursor: not-allowed;
  background-color: var(--yh-disabled-bg-color);
  border-color: var(--yh-border-color-light);
}
.yh-mention.is-disabled .yh-mention__inner {
  color: var(--yh-disabled-text-color);
  cursor: not-allowed;
}

.yh-mention.is-prefix .yh-mention__inner {
  padding-left: 30px;
}

.yh-mention.is-suffix .yh-mention__inner {
  padding-right: 30px;
}

.yh-mention__inner {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--yh-text-color-regular);
  font-size: inherit;
  font-family: inherit;
  line-height: 1;
  padding: 0 12px;
  box-sizing: border-box;
}
.yh-mention__inner::placeholder {
  color: var(--yh-text-color-placeholder);
}
.yh-mention__inner[rows] {
  height: auto;
  line-height: 1.6;
}

.yh-mention__prefix {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  color: var(--yh-text-color-placeholder);
  transition: color var(--yh-transition-duration);
  flex-shrink: 0;
  order: -1;
}

.yh-mention__suffix {
  display: inline-flex;
  align-items: center;
  padding: 0 8px;
  color: var(--yh-text-color-placeholder);
  transition: color var(--yh-transition-duration);
  flex-shrink: 0;
}

.yh-mention__icon {
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  transition: color var(--yh-transition-duration);
}
.yh-mention__icon:hover {
  color: var(--yh-color-primary);
}

.yh-mention__clear {
  cursor: pointer;
  color: var(--yh-text-color-placeholder);
  transition: color var(--yh-transition-duration);
}
.yh-mention__clear:hover {
  color: var(--yh-text-color-secondary);
}

.yh-mention__count {
  font-size: 12px;
  color: var(--yh-text-color-secondary);
  padding: 0 4px;
  white-space: nowrap;
  cursor: default;
}

.yh-mention__dropdown {
  background-color: var(--yh-bg-color-overlay);
  border: 1px solid var(--yh-border-color-light);
  border-radius: var(--yh-border-radius-base);
  box-shadow: var(--yh-mention-dropdown-shadow, var(--yh-box-shadow-light));
  overflow: hidden;
  z-index: var(--yh-index-popper);
  max-height: 300px;
  overflow-y: auto;
  min-width: 160px;
}

.yh-mention__option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: var(--yh-font-size-base);
  color: var(--yh-text-color-regular);
  transition: background-color 0.15s, color 0.15s;
  user-select: none;
}
.yh-mention__option:hover, .yh-mention__option.is-highlighted {
  background-color: var(--yh-fill-color-light);
  color: var(--yh-color-primary);
}
.yh-mention__option.is-disabled {
  color: var(--yh-disabled-text-color);
  cursor: not-allowed;
  background-color: transparent !important;
  pointer-events: none;
}

.yh-mention__option-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.yh-mention__option-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.yh-mention__option-label {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.yh-mention__option-desc {
  font-size: 12px;
  color: var(--yh-text-color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.yh-mention__group-label {
  padding: 6px 12px;
  font-size: 12px;
  color: var(--yh-text-color-secondary);
  background-color: var(--yh-fill-color-lighter);
  font-weight: 500;
}

.yh-mention__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  color: var(--yh-text-color-secondary);
  font-size: var(--yh-font-size-base);
}

.yh-mention__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  color: var(--yh-text-color-secondary);
  font-size: var(--yh-font-size-base);
}

.yh-mention__loading-icon {
  width: 16px;
  height: 16px;
  animation: yh-mention-spin 1s linear infinite;
}

.yh-mention-dropdown-enter-active,
.yh-mention-dropdown-leave-active {
  transition: opacity 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28), transform 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  transform-origin: top center;
}

.yh-mention-dropdown-enter-from,
.yh-mention-dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
}

@keyframes yh-mention-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
