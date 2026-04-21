<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useNamespace, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import { productCardProps, productCardEmits } from "./product-card";
defineOptions({ name: "YhProductCard" });
const props = defineProps(productCardProps);
const emit = defineEmits(productCardEmits);
const ns = useNamespace("product-card");
const { t } = useLocale();
const { themeStyle } = useComponentTheme(
  "product-card",
  computed(() => props.themeOverrides)
);
const cardRef = ref(null);
let observer = null;
const hasExposed = ref(false);
const setupObserver = () => {
  if (!props.exposure || hasExposed.value) return;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= props.exposureThreshold) {
          emit("expose");
          hasExposed.value = true;
          if (props.exposureOnce) observer?.disconnect();
        }
      });
    },
    { threshold: [props.exposureThreshold] }
  );
  if (cardRef.value) observer.observe(cardRef.value);
};
onMounted(setupObserver);
onUnmounted(() => observer?.disconnect());
const currentImage = ref(props.image);
const isHovering = ref(false);
const videoActive = ref(false);
watch(
  () => props.image,
  (val) => {
    currentImage.value = val;
  }
);
const handleMouseEnter = () => {
  isHovering.value = true;
  if (props.hoverImage) currentImage.value = props.hoverImage;
  if (props.videoSrc) videoActive.value = true;
};
const handleMouseLeave = () => {
  isHovering.value = false;
  currentImage.value = props.image;
  if (props.videoSrc) videoActive.value = false;
};
const displayPrice = computed(() => {
  const p = Number(props.price);
  return isNaN(p) ? props.price : p.toFixed(2);
});
const displayMarketPrice = computed(() => {
  const p = Number(props.marketPrice);
  return isNaN(p) ? props.marketPrice : p.toFixed(2);
});
const displayVipPrice = computed(() => {
  const p = Number(props.vipPrice);
  return isNaN(p) ? props.vipPrice : p.toFixed(2);
});
const vipLabelText = computed(() => props.vipLabel || t("productcard.vip"));
const soldOutText = computed(() => t("productcard.soldOut"));
const actionText = computed(() => props.actionText || t("productcard.buyNow"));
const stockStyle = computed(() => ({
  width: `${Math.min(100, Math.max(0, props.stockProgress))}%`,
  background: props.stockColor || "var(--yh-color-primary)"
}));
const handleAction = (e) => {
  if (props.soldOut || props.actionLoading) return;
  emit("action", e);
};
const handleClick = (e) => {
  emit("click", e);
};
const badgeImageErrors = ref({});
const handleBadgeImageError = (idx) => {
  badgeImageErrors.value[idx] = true;
};
</script>

<template>
  <div
    ref="cardRef"
    :class="[ns.b(), ns.m(props.layout), ns.is('border', props.border), ns.is('shadow', props.shadow), ns.is('sold-out', props.soldOut)]"
    :style="[themeStyle, {
  '--yh-product-card-title-lines': props.titleLines,
  '--yh-product-card-desc-lines': props.descriptionLines
}]"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      v-if="props.ribbon"
      :class="ns.e('ribbon')"
      :style="{
  backgroundColor: props.ribbonColor
}"
    >
      {{ props.ribbon }}
    </div>

    <div :class="ns.e('image-wrapper')">
      <img
        :src="currentImage"
        :alt="props.title"
        :class="ns.e('image')"
        :loading="props.lazy ? 'lazy' : 'eager'"
      />

      <Transition name="yh-fade">
        <div v-if="videoActive && props.videoSrc" :class="ns.e('video-overlay')">
          <video :src="props.videoSrc" autoplay muted loop playsinline :class="ns.e('video')" />
        </div>
      </Transition>

      <div v-if="props.soldOut" :class="ns.e('sold-out-mask')">
        <span :class="ns.e('sold-out-text')">{{ soldOutText }}</span>
      </div>
    </div>

    <div :class="ns.e('content')">
      <div
        v-if="(props.tag || props.badges.length) && props.badgePosition === 'top'"
        :class="ns.e('badges')"
      >
        <span v-if="props.tag" :class="[ns.e('badge-tag'), ns.is(props.tagType)]">{{
          props.tag
        }}</span>
        <template v-for="(badge, idx) in props.badges" :key="idx">
          <span v-if="badge.image && !badgeImageErrors[idx]" :class="ns.e('badge-img-wrap')">
            <img
              :src="badge.image"
              :class="ns.e('badge-img')"
              alt="badge"
              @error="handleBadgeImageError(idx)"
            />
          </span>
          <span
            v-if="badge.text"
            :class="[ns.e('badge-tag'), ns.is(badge.type || 'primary')]"
            :style="{
  backgroundColor: badge.color
}"
            >{{ badge.text }}</span
          >
        </template>
      </div>

      <h3 :class="ns.e('title')" :title="props.title">
        <span
          v-if="(props.tag || props.badges.length) && props.badgePosition === 'inline'"
          :class="[ns.e('badges'), ns.is('inline')]"
        >
          <span v-if="props.tag" :class="[ns.e('badge-tag'), ns.is(props.tagType)]">{{
            props.tag
          }}</span>
          <template v-for="(badge, idx) in props.badges" :key="idx">
            <span v-if="badge.image && !badgeImageErrors[idx]" :class="ns.e('badge-img-wrap')">
              <img
                :src="badge.image"
                :class="ns.e('badge-img')"
                alt="badge"
                @error="handleBadgeImageError(idx)"
              />
            </span>
            <span
              v-if="badge.text"
              :class="[ns.e('badge-tag'), ns.is(badge.type || 'primary')]"
              :style="{
  backgroundColor: badge.color
}"
              >{{ badge.text }}</span
            >
          </template>
        </span>
        <slot name="title">{{ props.title }}</slot>
      </h3>

      <div
        v-if="props.description || $slots.description"
        :class="ns.e('description')"
        :title="props.description"
      >
        <slot name="description">{{ props.description }}</slot>
      </div>

      <div :class="ns.e('price-row')">
        <div :class="ns.e('main-price')">
          <span :class="ns.e('currency')">{{ props.currency }}</span>
          <span :class="ns.e('price-val')">{{ displayPrice }}</span>
          <span v-if="props.unit" :class="ns.e('unit')">{{ props.unit }}</span>
        </div>

        <div v-if="props.vipPrice" :class="ns.e('vip-row')">
          <span :class="ns.e('vip-label')">{{ vipLabelText }}</span>
          <span :class="ns.e('currency')">{{ props.currency }}</span>
          <span :class="ns.e('vip-price')">{{ displayVipPrice }}</span>
        </div>

        <div v-if="props.marketPrice" :class="ns.e('market-price')">
          {{ props.currency }}{{ displayMarketPrice }}
        </div>
      </div>

      <div v-if="props.stockProgress" :class="ns.e('stock-area')">
        <div :class="ns.e('stock-bar-bg')">
          <div :class="ns.e('stock-bar-inner')" :style="stockStyle" />
        </div>
        <span v-if="props.stockText" :class="ns.e('stock-text')">{{ props.stockText }}</span>
      </div>

      <div v-if="!props.readonly" :class="ns.e('footer')">
        <slot name="footer">
          <button
            :class="[ns.e('action-btn'), ns.is('loading', props.actionLoading), ns.is('disabled', props.soldOut)]"
            @click.stop="handleAction"
          >
            <span v-if="props.actionLoading" :class="ns.e('loading-spinner')" />
            {{ actionText }}
          </button>
        </slot>
      </div>
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
.yh-product-card {
  --yh-product-card-bg: var(--yh-bg-color-overlay);
  --yh-product-card-radius: var(--yh-radius-base);
  --yh-product-card-title-size: 15px;
  --yh-product-card-price-color: var(--yh-color-danger);
  --yh-product-card-vip-color: #f7d081;
  --yh-product-card-btn-bg: var(--yh-color-primary);
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--yh-product-card-bg);
  border-radius: var(--yh-product-card-radius);
  overflow: hidden;
  transition: all var(--yh-transition-base);
  cursor: pointer;
}
.yh-product-card.is-border {
  border: 1px solid var(--yh-border-color-lighter);
}

.yh-product-card.is-shadow:hover {
  box-shadow: var(--yh-shadow-base);
  transform: translateY(-5px);
}

.yh-product-card.is-sold-out {
  cursor: not-allowed;
}
.yh-product-card.is-sold-out .yh-product-card__image {
  filter: grayscale(0.8);
  opacity: 0.8;
}

.yh-product-card.is-sold-out .yh-product-card__title {
  opacity: 0.6;
}

.yh-product-card.is-sold-out .yh-product-card__price-row {
  opacity: 0.6;
}

.yh-product-card__ribbon {
  position: absolute;
  top: 12px;
  right: -28px;
  z-index: 10;
  width: 100px;
  padding: 2px 0;
  background-color: var(--yh-color-danger);
  color: #fff;
  font-size: 11px;
  text-align: center;
  transform: rotate(45deg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  pointer-events: none;
}

.yh-product-card__image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  background-color: var(--yh-fill-color-light);
}
.yh-product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--yh-transition-slow);
}

.yh-product-card__image-wrapper:hover .yh-product-card__image {
  transform: scale(1.08);
}

.yh-product-card__video-overlay {
  position: absolute;
  inset: 0;
  z-index: 5;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.yh-product-card__video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.yh-product-card__sold-out-mask {
  position: absolute;
  inset: 0;
  z-index: 8;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.yh-product-card__sold-out-text {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border: 2px solid #fff;
  padding: 4px 12px;
  border-radius: 4px;
  letter-spacing: 2px;
}

.yh-product-card__content {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.yh-product-card__badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}
.yh-product-card__badges.is-inline {
  display: inline-flex;
  vertical-align: middle;
  margin-right: 8px;
  margin-bottom: 0;
}

.yh-product-card__badge-img-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  vertical-align: middle;
  overflow: hidden;
}

.yh-product-card__badge-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.yh-product-card__badge-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  font-size: 10px;
  padding: 0 6px;
  border-radius: 2px;
  white-space: nowrap;
  font-weight: 500;
}
.yh-product-card__badge-tag.is-primary {
  background: var(--yh-color-primary-light-9);
  color: var(--yh-color-primary);
}

.yh-product-card__badge-tag.is-danger {
  background: var(--yh-color-danger-light-9);
  color: var(--yh-color-danger);
}

.yh-product-card__badge-tag.is-success {
  background: var(--yh-color-success-light-9);
  color: var(--yh-color-success);
}

.yh-product-card__badge-tag.is-warning {
  background: var(--yh-color-warning-light-9);
  color: var(--yh-color-warning);
}

.yh-product-card__badge-tag.is-info {
  background: var(--yh-color-info-light-9);
  color: var(--yh-color-info);
}

.yh-product-card__title {
  margin: 0;
  font-size: var(--yh-product-card-title-size);
  color: var(--yh-text-color-primary);
  line-height: 1.4;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: var(--yh-product-card-title-lines, 2);
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.yh-product-card__description {
  font-size: 12px;
  color: var(--yh-text-color-secondary);
  display: -webkit-box;
  -webkit-line-clamp: var(--yh-product-card-desc-lines, 1);
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.yh-product-card__price-row {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
}

.yh-product-card__main-price {
  color: var(--yh-product-card-price-color);
  display: flex;
  align-items: baseline;
  gap: 1px;
}
.yh-product-card__currency {
  font-size: 12px;
  font-weight: bold;
}

.yh-product-card__price-val {
  font-size: 20px;
  font-weight: bold;
  font-family: "Din", sans-serif;
}

.yh-product-card__unit {
  font-size: 11px;
  color: var(--yh-text-color-placeholder);
  margin-left: 2px;
}

.yh-product-card__vip-row {
  display: inline-flex;
  align-items: center;
  background: #1a1a1a;
  color: var(--yh-product-card-vip-color);
  padding: 0 6px;
  border-radius: 2px;
  font-size: 10px;
  width: fit-content;
}
.yh-product-card__vip-label {
  font-weight: bold;
  margin-right: 4px;
}

.yh-product-card__vip-price {
  font-weight: bold;
  font-family: "Din";
}

.yh-product-card__market-price {
  font-size: 11px;
  color: var(--yh-text-color-placeholder);
  text-decoration: line-through;
}

.yh-product-card__stock-area {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
}
.yh-product-card__stock-bar-bg {
  flex: 1;
  height: 6px;
  background: var(--yh-fill-color-darker);
  border-radius: 10px;
  overflow: hidden;
}

.yh-product-card__stock-bar-inner {
  height: 100%;
  border-radius: 10px;
  transition: width var(--yh-transition-slow) ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) inset;
}

.yh-product-card__stock-text {
  font-size: 10px;
  color: var(--yh-text-color-secondary);
  flex-shrink: 0;
}

.yh-product-card__footer {
  margin-top: 8px;
}

.yh-product-card__action-btn {
  width: 100%;
  height: 36px;
  border: none;
  background-color: var(--yh-product-card-btn-bg);
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: filter var(--yh-transition-fast);
}
.yh-product-card__action-btn:hover {
  filter: brightness(1.1);
}
.yh-product-card__action-btn:active {
  filter: brightness(0.9);
}
.yh-product-card__action-btn.is-disabled {
  background: var(--yh-fill-color-dark) !important;
  cursor: not-allowed;
  filter: none;
}

.yh-product-card__action-btn.is-loading {
  cursor: wait;
  opacity: 0.8;
}

.yh-product-card__loading-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: yh-rotate 0.8s linear infinite;
}

.yh-product-card {
  /* --- 布局适配 --- */
}
.yh-product-card--horizontal {
  flex-direction: row;
  height: 160px;
}
.yh-product-card--horizontal .yh-product-card__image-wrapper {
  width: 160px;
  height: 100%;
}

.yh-product-card--horizontal .yh-product-card__content {
  padding: 12px 16px;
  justify-content: space-between;
}

.yh-product-card--horizontal .yh-product-card__action-btn {
  width: auto;
  padding: 0 24px;
  align-self: flex-end;
}

.yh-product-card--compact .yh-product-card__content {
  padding: 8px;
  gap: 4px;
}

.yh-product-card--compact .yh-product-card__title {
  font-size: 13px;
  -webkit-line-clamp: 1;
}

.yh-product-card--compact .yh-product-card__description {
  font-size: 11px;
  opacity: 0.8;
}

.yh-product-card--compact .yh-product-card__price-val {
  font-size: 16px;
  font-weight: 600;
}

.yh-product-card--compact .yh-product-card__footer {
  margin-top: 4px;
}

.yh-product-card--compact .yh-product-card__action-btn {
  height: 26px;
  font-size: 12px;
}

@keyframes yh-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes yh-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
