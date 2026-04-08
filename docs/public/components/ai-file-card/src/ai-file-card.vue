<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useNamespace } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import { aiFileCardProps, aiFileCardEmits } from "./ai-file-card";
import { YhIcon } from "../../icon";
import { YhSpin } from "../../spin";
import { YhImageViewer } from "../../image";
import { YhTooltip } from "../../tooltip";
defineOptions({
  name: "YhAiFileCard"
});
const props = defineProps(aiFileCardProps);
const emit = defineEmits(aiFileCardEmits);
const ns = useNamespace("ai-file-card");
const imageViewerVisible = ref(false);
const { themeStyle } = useComponentTheme(
  "ai-file-card",
  computed(() => props.themeOverrides)
);
const formatFileSize = (bytes) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  let unitIndex = 0;
  let size = bytes;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};
const iconMap = {
  default: "document",
  excel: "file-excel",
  image: "image",
  markdown: "document",
  pdf: "file-pdf",
  ppt: "document",
  word: "file-word",
  zip: "folder",
  video: "file-video",
  audio: "file-audio",
  java: "document",
  javascript: "document",
  python: "document",
  txt: "file-txt"
};
const fileIcon = computed(() => {
  if (props.icon && iconMap[props.icon]) {
    return iconMap[props.icon];
  }
  if (props.type === "image") return "image";
  if (props.type === "video") return "file-video";
  if (props.type === "audio") return "file-audio";
  return iconMap.default;
});
const showImagePreview = computed(() => {
  return props.type === "image" && props.src;
});
const showVideoPreview = computed(() => props.type === "video");
const showAudioPreview = computed(() => props.type === "audio");
const isHorizontalAudio = computed(() => props.type === "audio" && !!props.src);
const audioThumbIconSize = computed(() => {
  if (props.size === "small") return 18;
  if (props.size === "large") return 32;
  return 24;
});
const nameRef = ref(null);
const showNameTooltip = ref(false);
const updateNameTooltip = () => {
  const el = nameRef.value;
  if (!el) return;
  showNameTooltip.value = el.scrollWidth > el.clientWidth + 1;
};
const scheduleUpdate = () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(updateNameTooltip);
    });
  });
};
let resizeObserver = null;
onMounted(() => {
  scheduleUpdate();
  const el = nameRef.value;
  if (el && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(el);
  }
});
onUnmounted(() => {
  if (resizeObserver && nameRef.value) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
});
watch(() => [props.name, props.size], scheduleUpdate);
const sizeClass = computed(() => {
  return ns.m(props.size || "default");
});
const handleClick = () => {
  if (!props.loading) {
    if (showImagePreview.value) {
      imageViewerVisible.value = true;
    }
    emit("click");
  }
};
</script>

<template>
  <div
    :class="[ns.b(), sizeClass, isHorizontalAudio && ns.is('horizontal-audio')]"
    :style="themeStyle"
    @click="handleClick"
  >
    <!-- 图片类型：加载时显示模糊图，加载完成后过渡为清晰 -->
    <template v-if="showImagePreview">
      <div :class="[ns.e('image-wrapper'), ns.is('image-loading', loading)]">
        <img :src="src" :alt="name" :class="ns.e('image')" v-bind="imageProps" />
        <div v-if="loading" :class="ns.e('image-loading-overlay')">
          <YhSpin />
        </div>
        <!-- 遮罩 -->
        <div v-if="mask" :class="ns.e('mask')">
          <span>{{ mask }}</span>
        </div>
      </div>
    </template>

    <!-- 视频类型：与 Ant Design X 一致，使用原生 <video> 可直接播放；有 src 时展示播放器 -->
    <template v-else-if="showVideoPreview">
      <div :class="ns.e('image-wrapper')">
        <video
          v-if="src"
          :src="src"
          :class="ns.e('media-video')"
          controls
          preload="metadata"
          playsinline
          v-bind="videoProps"
        />
        <div v-else :class="[ns.e('media-placeholder'), ns.e('media-placeholder--video')]">
          <YhIcon :name="fileIcon" :size="size === 'small' ? 32 : size === 'large' ? 64 : 48" />
        </div>
        <div v-if="loading" :class="ns.e('image-loading-overlay')">
          <YhSpin />
        </div>
        <div v-if="mask" :class="ns.e('mask')">
          <span>{{ mask }}</span>
        </div>
      </div>
      <div :class="ns.e('info')">
        <div :class="ns.e('name-wrap')">
          <YhTooltip
            :content="name"
            placement="bottom"
            :popper-class="ns.e('name-tooltip')"
            :disabled="!showNameTooltip"
          >
            <div ref="nameRef" :class="ns.e('name')">
              {{ name }}
            </div>
          </YhTooltip>
        </div>
        <div v-if="byte !== void 0" :class="ns.e('size')">
          {{ formatFileSize(byte) }}
        </div>
        <div v-if="description" :class="ns.e('description')">
          {{ description }}
        </div>
      </div>
    </template>

    <!-- 音频类型：有 src 时使用横向布局（左图标 + 右内容 + 播放条），无 src 时方形占位卡片 -->
    <template v-else-if="showAudioPreview">
      <!-- 有 src：纵向布局（顶部文件信息行 + 底部全宽播放器） -->
      <template v-if="src">
        <div :class="ns.e('audio-header')">
          <div :class="ns.e('audio-thumb')">
            <YhIcon :name="fileIcon" :size="audioThumbIconSize" />
          </div>
          <div :class="ns.e('audio-meta')">
            <div :class="ns.e('name-wrap')">
              <YhTooltip
                :content="name"
                placement="bottom"
                :popper-class="ns.e('name-tooltip')"
                :disabled="!showNameTooltip"
              >
                <div ref="nameRef" :class="ns.e('name')">
                  {{ name }}
                </div>
              </YhTooltip>
            </div>
            <div v-if="byte !== void 0" :class="ns.e('size')">
              {{ formatFileSize(byte) }}
            </div>
          </div>
        </div>
        <audio :src="src" :class="ns.e('media-audio')" controls v-bind="audioProps" />
        <div v-if="loading" :class="ns.e('image-loading-overlay')">
          <YhSpin />
        </div>
      </template>
      <!-- 无 src：方形占位卡片（与之前一致） -->
      <template v-else>
        <div :class="ns.e('image-wrapper')">
          <div :class="[ns.e('media-placeholder'), ns.e('media-placeholder--audio')]">
            <YhIcon :name="fileIcon" :size="size === 'small' ? 32 : size === 'large' ? 64 : 48" />
          </div>
          <div v-if="loading" :class="ns.e('image-loading-overlay')">
            <YhSpin />
          </div>
          <div v-if="mask" :class="ns.e('mask')">
            <span>{{ mask }}</span>
          </div>
        </div>
        <div :class="ns.e('info')">
          <div :class="ns.e('name-wrap')">
            <YhTooltip
              :content="name"
              placement="bottom"
              :popper-class="ns.e('name-tooltip')"
              :disabled="!showNameTooltip"
            >
              <div ref="nameRef" :class="ns.e('name')">
                {{ name }}
              </div>
            </YhTooltip>
          </div>
          <div v-if="byte !== void 0" :class="ns.e('size')">
            {{ formatFileSize(byte) }}
          </div>
          <div v-if="description" :class="ns.e('description')">
            {{ description }}
          </div>
        </div>
      </template>
    </template>

    <!-- 文件类型 -->
    <template v-else>
      <div :class="ns.e('icon-wrapper')">
        <!-- 加载状态 -->
        <YhSpin v-if="loading" />
        <!-- 文件图标 -->
        <YhIcon
          v-else
          :name="fileIcon"
          :size="size === 'small' ? 32 : size === 'large' ? 64 : 48"
        />
      </div>

      <div :class="ns.e('info')">
        <div :class="ns.e('name-wrap')">
          <YhTooltip
            :content="name"
            placement="bottom"
            :popper-class="ns.e('name-tooltip')"
            :disabled="!showNameTooltip"
          >
            <div ref="nameRef" :class="ns.e('name')">
              {{ name }}
            </div>
          </YhTooltip>
        </div>
        <div v-if="byte !== void 0" :class="ns.e('size')">
          {{ formatFileSize(byte) }}
        </div>
        <div v-if="description" :class="ns.e('description')">
          {{ description }}
        </div>
      </div>
    </template>

    <!-- 遮罩层（非图片类型） -->
    <div v-if="mask && !showImagePreview" :class="ns.e('file-mask')">
      <span>{{ mask }}</span>
    </div>

    <!-- 扩展插槽（用于 AiAttachments 传入的删除按钮、进度条等） -->
    <div :class="ns.e('actions')">
      <slot />
    </div>
  </div>

  <!-- 图片预览 -->
  <YhImageViewer
    v-if="showImagePreview && imageViewerVisible"
    :url-list="[src || '']"
    @close="imageViewerVisible = false"
  />
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
.yh-ai-file-card {
  --yh-ai-file-card-bg-color: var(--yh-bg-color, #fff);
  --yh-ai-file-card-border-color: var(--yh-border-color, #dcdfe6);
  --yh-ai-file-card-text-color: var(--yh-text-color, #303133);
  --yh-ai-file-card-text-secondary-color: var(--yh-text-color-secondary, #909399);
  --yh-ai-file-card-hover-bg-color: var(--yh-fill-color-light, #f5f7fa);
  --yh-ai-file-card-shadow: var(--yh-box-shadow, 0 2px 12px 0 rgba(0, 0, 0, 0.1));
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: var(--yh-ai-file-card-bg-color);
  border: 1px solid var(--yh-ai-file-card-border-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.yh-ai-file-card:hover {
  background: var(--yh-ai-file-card-hover-bg-color);
  box-shadow: var(--yh-ai-file-card-shadow);
}
.yh-ai-file-card--small {
  padding: 8px;
  border-radius: 4px;
  min-width: 80px;
}
.yh-ai-file-card--small .yh-ai-file-card__icon-wrapper {
  width: 40px;
  height: 40px;
}
.yh-ai-file-card--small .yh-ai-file-card__name {
  font-size: 12px;
  max-width: 64px;
}
.yh-ai-file-card--small .yh-ai-file-card__size {
  font-size: 10px;
}
.yh-ai-file-card--large {
  padding: 24px;
  border-radius: 12px;
  min-width: 180px;
}
.yh-ai-file-card--large .yh-ai-file-card__icon-wrapper {
  width: 80px;
  height: 80px;
}
.yh-ai-file-card--large .yh-ai-file-card__name {
  font-size: 16px;
  max-width: 160px;
}
.yh-ai-file-card--large .yh-ai-file-card__size {
  font-size: 14px;
}
.yh-ai-file-card--default {
  min-width: 120px;
}
.yh-ai-file-card--default .yh-ai-file-card__icon-wrapper {
  width: 56px;
  height: 56px;
}
.yh-ai-file-card--default .yh-ai-file-card__name {
  font-size: 14px;
  max-width: 100px;
}
.yh-ai-file-card--default .yh-ai-file-card__size {
  font-size: 12px;
}
.yh-ai-file-card__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: 8px;
  color: var(--yh-color-primary, #409eff);
}
.yh-ai-file-card__info {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  overflow: hidden;
  min-width: 0;
  width: 100%;
}
.yh-ai-file-card__name-wrap {
  width: 100%;
  min-width: 0;
  overflow: hidden;
}
.yh-ai-file-card__name-wrap .yh-tooltip {
  display: block;
  width: 100%;
  min-width: 0;
  overflow: hidden;
}
.yh-ai-file-card__name {
  font-size: 14px;
  line-height: 1.5;
  color: var(--yh-ai-file-card-text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  max-width: 100%;
  width: 100%;
  min-width: 0;
  margin: 0 auto;
}
.yh-ai-file-card__size {
  font-size: 12px;
  color: var(--yh-ai-file-card-text-secondary-color);
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.yh-ai-file-card__description {
  font-size: 12px;
  color: var(--yh-ai-file-card-text-secondary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  max-width: 150px;
  margin: 0 auto;
}
.yh-ai-file-card__image-wrapper {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 8px;
}
.yh-ai-file-card__image-wrapper.is-image-loading .yh-ai-file-card__image {
  filter: blur(8px);
  opacity: 0.7;
}
.yh-ai-file-card__image-wrapper .yh-ai-file-card__image {
  transition: filter 0.5s ease, opacity 0.5s ease;
}
.yh-ai-file-card__media-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 4px;
}
.yh-ai-file-card__media-audio {
  width: 100%;
  max-width: 100%;
  min-height: 40px;
  height: auto;
  display: block;
  border-radius: 4px;
  box-sizing: border-box;
}
.yh-ai-file-card.is-horizontal-audio {
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  padding: 10px 12px;
  min-width: 260px;
  cursor: default;
}
.yh-ai-file-card.is-horizontal-audio.yh-ai-file-card--small {
  gap: 6px;
  padding: 8px 10px;
  min-width: 220px;
}
.yh-ai-file-card.is-horizontal-audio.yh-ai-file-card--large {
  gap: 10px;
  padding: 16px;
  min-width: 320px;
}
.yh-ai-file-card__audio-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
}
.yh-ai-file-card__audio-thumb {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--yh-color-primary-light-9, #ecf5ff) 0%, var(--yh-color-primary-light-7, #c6e2ff) 100%);
  color: var(--yh-color-primary, #409eff);
}
.yh-ai-file-card--small .yh-ai-file-card__audio-thumb {
  width: 28px;
  height: 28px;
  border-radius: 6px;
}
.yh-ai-file-card--large .yh-ai-file-card__audio-thumb {
  width: 44px;
  height: 44px;
  border-radius: 10px;
}
.yh-ai-file-card__audio-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.yh-ai-file-card__audio-meta .yh-ai-file-card__name-wrap {
  width: 100%;
  min-width: 0;
}
.yh-ai-file-card__audio-meta .yh-ai-file-card__name {
  font-size: 13px;
  font-weight: 500;
  text-align: left;
  max-width: 100%;
  margin: 0;
}
.yh-ai-file-card__audio-meta .yh-ai-file-card__size {
  font-size: 11px;
  text-align: left;
  margin: 0;
}
.yh-ai-file-card__media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: var(--yh-color-primary, #409eff);
}
.yh-ai-file-card__media-placeholder--video {
  background: var(--yh-fill-color-light, #f5f7fa);
}
.yh-ai-file-card__media-placeholder--audio {
  background: linear-gradient(135deg, var(--yh-fill-color-light, #f5f7fa) 0%, var(--yh-fill-color, #fafafa) 100%);
}
.yh-ai-file-card__image-loading-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
}
.yh-ai-file-card__image {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  object-fit: cover;
}
.yh-ai-file-card__mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
}
.yh-ai-file-card__file-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
}
.yh-ai-file-card__actions {
  position: absolute;
  inset: 0;
  z-index: 80;
  pointer-events: none;
}
.yh-ai-file-card__actions > * {
  pointer-events: auto;
}

.yh-ai-file-card__name-tooltip {
  max-width: 320px;
}
.yh-ai-file-card__name-tooltip .yh-tooltip__content {
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
  overflow-x: hidden;
}
</style>
