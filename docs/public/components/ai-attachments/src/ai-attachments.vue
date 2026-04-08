<script setup>
import { ref, computed, watch } from "vue";
import { useNamespace, useLocale } from "@yh-ui/hooks";
import { useComponentTheme } from "@yh-ui/theme";
import {
  aiAttachmentsProps,
  aiAttachmentsEmits
} from "./ai-attachments";
import { YhAiFileCard } from "../../ai-file-card";
import { YhIcon } from "../../icon";
defineOptions({
  name: "YhAiAttachments"
});
const props = defineProps(aiAttachmentsProps);
const emit = defineEmits(aiAttachmentsEmits);
const ns = useNamespace("ai-attachments");
const { t } = useLocale();
const { themeStyle } = useComponentTheme(
  "ai-attachments",
  computed(() => props.themeOverrides)
);
const internalItems = ref([...props.items]);
watch(
  () => props.items,
  (newItems) => {
    internalItems.value = [...newItems];
  },
  { deep: true }
);
const normalizePlaceholder = (raw) => {
  if (typeof raw === "function") {
    return raw("inline");
  }
  if (typeof raw === "string") {
    return { icon: "upload", title: raw };
  }
  return raw || {};
};
const computedPlaceholder = computed(() => {
  return normalizePlaceholder(props.placeholder);
});
const computedDropPlaceholder = computed(() => {
  const placeholder = props.placeholder;
  if (typeof placeholder === "function") {
    return placeholder("drop");
  }
  if (typeof placeholder === "string") {
    return { icon: "upload", title: placeholder };
  }
  return placeholder || {};
});
const canUpload = computed(() => {
  if (props.disabled) return false;
  if (props.maxCount !== void 0 && internalItems.value.length >= props.maxCount) {
    return false;
  }
  return true;
});
const overflowClass = computed(() => {
  return ns.m(`overflow-${props.overflow}`);
});
const extensionIconMap = {
  pdf: "pdf",
  xlsx: "excel",
  xls: "excel",
  doc: "word",
  docx: "word",
  ppt: "ppt",
  pptx: "ppt",
  png: "image",
  jpg: "image",
  jpeg: "image",
  gif: "image",
  webp: "image",
  svg: "image",
  mp4: "video",
  webm: "video",
  mp3: "audio",
  wav: "audio",
  zip: "zip",
  md: "markdown",
  txt: "txt",
  java: "java",
  js: "javascript",
  ts: "javascript",
  py: "python"
};
function getItemIcon(item) {
  if (item.icon) return item.icon;
  const ext = (item.name || "").split(".").pop()?.toLowerCase();
  return ext ? extensionIconMap[ext] : void 0;
}
const fileInputRef = ref(null);
const isDragging = ref(false);
const dragCounter = ref(0);
const handleFileSelect = async (event) => {
  const input = event.target;
  const files = Array.from(input.files || []);
  if (files.length > 0) {
    await processFiles(files);
  }
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};
const handleDragEnter = (e) => {
  e.preventDefault();
  dragCounter.value += 1;
  isDragging.value = true;
};
const handleDragLeave = (e) => {
  e.preventDefault();
  dragCounter.value = Math.max(0, dragCounter.value - 1);
  if (dragCounter.value === 0) {
    isDragging.value = false;
  }
};
const handleDragOver = (e) => {
  e.preventDefault();
};
const handleDrop = async (e) => {
  e.preventDefault();
  dragCounter.value = 0;
  isDragging.value = false;
  const files = Array.from(e.dataTransfer?.files || []);
  if (files.length > 0) {
    emit("upload-drop", files);
    await processFiles(files);
  }
};
const processFiles = async (files) => {
  const validFiles = files.filter((f) => f.type !== "");
  if (validFiles.length === 0) return;
  for (const file of validFiles) {
    if (props.beforeUpload) {
      const result = await props.beforeUpload(file);
      if (!result) continue;
    }
    const fileItem = {
      uid: Date.now() + Math.random(),
      name: file.name,
      byte: file.size,
      type: file.type.split("/")[0] || "file",
      status: "uploading",
      percent: 0
    };
    internalItems.value.push(fileItem);
    emit("upload-change", file, internalItems.value);
    if (props.httpRequest) {
      try {
        await props.httpRequest({ file });
        const index = internalItems.value.findIndex((item) => item.uid === fileItem.uid);
        if (index !== -1) {
          internalItems.value[index] = {
            ...internalItems.value[index],
            status: "done",
            percent: 100
          };
        }
        emit("upload-success", { success: true }, file, internalItems.value);
      } catch (error) {
        const index = internalItems.value.findIndex((item) => item.uid === fileItem.uid);
        if (index !== -1) {
          internalItems.value[index] = {
            ...internalItems.value[index],
            status: "error",
            error: String(error)
          };
        }
        emit("upload-error", error, file, internalItems.value);
      }
    }
  }
  emit("update:items", internalItems.value);
};
const triggerUpload = () => {
  if (!canUpload.value) return;
  fileInputRef.value?.click();
};
const handleDelete = (item, index) => {
  internalItems.value.splice(index, 1);
  emit("delete-card", item, index);
  emit("update:items", internalItems.value);
};
const listContainerRef = ref(null);
const scrollLeft = () => {
  if (listContainerRef.value) {
    listContainerRef.value.scrollLeft -= 200;
  }
};
const scrollRight = () => {
  if (listContainerRef.value) {
    listContainerRef.value.scrollLeft += 200;
  }
};
const showScrollButtons = computed(() => {
  if (props.overflow !== "scrollX") {
    return false;
  }
  return internalItems.value.length > 3;
});
</script>

<template>
  <div
    :class="[ns.b(), overflowClass]"
    :style="[themeStyle, props.overflow === 'scrollY' && props.scrollMaxHeight ? {
  maxHeight: props.scrollMaxHeight
} : {}]"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <!-- 文件列表 -->
    <div
      v-if="internalItems.length > 0"
      ref="listContainerRef"
      :class="ns.e('list')"
      :style="listStyle"
    >
      <div
        v-for="(item, index) in internalItems"
        :key="item.uid || index"
        :class="[ns.e('item'), ns.is('error', item.status === 'error')]"
      >
        <slot name="file-item" :item="item" :index="index">
          <YhAiFileCard
            :name="item.name"
            :byte="item.byte"
            :type="item.type"
            :icon="getItemIcon(item)"
            :src="item.url || item.thumbUrl"
            :description="item.status === 'error' ? item.error : item.description"
            :loading="item.status === 'uploading'"
            size="small"
          >
            <template #default>
              <!-- 上传进度（进度条 + 百分比） -->
              <div v-if="item.status === 'uploading'" :class="ns.e('progress-wrap')">
                <span :class="ns.e('progress-text')">{{ item.percent ?? 0 }}%</span>
                <div :class="ns.e('progress')">
                  <div
                    :class="ns.e('progress-bar')"
                    :style="{
  width: `${item.percent || 0}%`
}"
                  ></div>
                </div>
              </div>
              <!-- 删除按钮 -->
              <button
                v-if="item.status !== 'uploading'"
                :class="ns.e('delete-btn')"
                @click.stop="handleDelete(item, index)"
              >
                <YhIcon name="close" />
              </button>
            </template>
          </YhAiFileCard>
        </slot>
      </div>
    </div>

    <!-- 上传按钮 / 占位符 -->
    <div
      v-if="!hideUpload && canUpload"
      :class="[ns.e('upload'), ns.is('dragging', isDragging)]"
      @click="triggerUpload"
    >
      <slot name="upload-button" :can-upload="canUpload">
        <div :class="ns.e('upload-content')">
          <YhIcon :name="computedPlaceholder.icon || 'upload'" :size="uploadIconSize" />
          <div :class="ns.e('upload-text')">
            <div :class="ns.e('upload-title')">
              {{ isDragging ? computedDropPlaceholder.title : computedPlaceholder.title }}
            </div>
            <div v-if="computedPlaceholder.description" :class="ns.e('upload-description')">
              {{ computedPlaceholder.description }}
            </div>
          </div>
        </div>
      </slot>
    </div>

    <!-- 拖拽遮罩 -->
    <div v-if="isDragging" :class="ns.e('drop-mask')">
      <slot name="drop-area">
        <div :class="ns.e('drop-content')">
          <YhIcon :name="computedDropPlaceholder.icon || 'upload'" :size="uploadIconSize" />
          <div :class="ns.e('drop-text')">
            {{ computedDropPlaceholder.title || t("ai.attachments.dropTip") }}
          </div>
        </div>
      </slot>
    </div>

    <!-- 滚动按钮 -->
    <button
      v-if="showScrollButtons"
      :class="[ns.e('scroll-btn'), ns.e('scroll-prev')]"
      @click="scrollLeft"
    >
      <YhIcon name="arrow-left" />
    </button>
    <button
      v-if="showScrollButtons"
      :class="[ns.e('scroll-btn'), ns.e('scroll-next')]"
      @click="scrollRight"
    >
      <YhIcon name="arrow-right" />
    </button>

    <!-- 隐藏的文件输入 -->
    <input
      ref="fileInputRef"
      type="file"
      :class="ns.e('file-input')"
      multiple
      :disabled="disabled"
      @change="handleFileSelect"
    />
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
.yh-ai-attachments {
  --yh-ai-attachments-bg-color: var(--yh-bg-color, #fff);
  --yh-ai-attachments-border-color: var(--yh-border-color, #dcdfe6);
  --yh-ai-attachments-border-dashed-color: var(--yh-border-colordashed, #d9d9d9);
  --yh-ai-attachments-text-color: var(--yh-text-color, #303133);
  --yh-ai-attachments-text-secondary-color: var(--yh-text-color-secondary, #909399);
  --yh-ai-attachments-hover-bg-color: var(--yh-fill-color-light, #f5f7fa);
  --yh-ai-attachments-primary-color: var(--yh-color-primary, #409eff);
  --yh-ai-attachments-shadow: var(--yh-box-shadow, 0 2px 12px 0 rgba(0, 0, 0, 0.1));
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 8px;
  background: var(--yh-ai-attachments-bg-color);
  border-radius: 8px;
  box-sizing: border-box;
}
.yh-ai-attachments--overflow-scrollX {
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.yh-ai-attachments--overflow-scrollX .yh-ai-attachments__list {
  flex-wrap: nowrap;
  overflow-x: auto;
}
.yh-ai-attachments--overflow-scrollX .yh-ai-attachments__item {
  flex-shrink: 0;
}
.yh-ai-attachments--overflow-scrollY {
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 400px;
}
.yh-ai-attachments--overflow-wrap {
  flex-wrap: wrap;
}
.yh-ai-attachments__list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.yh-ai-attachments__item {
  position: relative;
  width: 120px;
  min-width: 120px;
  height: 120px;
  flex-shrink: 0;
}
.yh-ai-attachments__item:hover .yh-ai-attachments__delete-btn {
  opacity: 1;
}
.yh-ai-attachments__item.is-error .yh-ai-file-card {
  border-color: var(--yh-color-danger, #f56c6c);
}
.yh-ai-attachments__item.is-error .yh-ai-file-card .yh-ai-file-card__description {
  color: var(--yh-color-danger, #f56c6c);
}
.yh-ai-attachments__item .yh-ai-file-card {
  width: 100%;
  height: 100%;
  min-width: 0;
  padding: 6px;
}
.yh-ai-attachments__item .yh-ai-file-card .yh-ai-file-card__info {
  min-width: 0;
  width: 100%;
}
.yh-ai-attachments__item .yh-ai-file-card .yh-ai-file-card__name {
  max-width: 100%;
  width: 100%;
  min-width: 0;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.yh-ai-attachments__item .yh-ai-file-card .yh-ai-file-card__size {
  font-size: 11px;
}
.yh-ai-attachments__upload {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 220px;
  width: auto;
  min-width: 220px;
  height: 120px;
  padding: 16px;
  border: 2px dashed var(--yh-ai-attachments-border-dashed-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
}
.yh-ai-attachments__upload:hover {
  border-color: var(--yh-ai-attachments-primary-color);
  background: var(--yh-ai-attachments-hover-bg-color);
}
.yh-ai-attachments__upload.is-dragging {
  border-color: var(--yh-ai-attachments-primary-color);
  background: rgba(var(--yh-ai-attachments-primary-color), 0.1);
}
.yh-ai-attachments__upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--yh-ai-attachments-text-secondary-color);
}
.yh-ai-attachments__upload-text {
  text-align: center;
}
.yh-ai-attachments__upload-title {
  font-size: 12px;
  line-height: 1.4;
  color: var(--yh-ai-attachments-text-color);
}
.yh-ai-attachments__upload-description {
  font-size: 12px;
  line-height: 1.4;
  color: var(--yh-ai-attachments-text-secondary-color);
}
.yh-ai-attachments__progress-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  z-index: 5;
}
.yh-ai-attachments__progress-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--yh-ai-attachments-primary-color);
}
.yh-ai-attachments__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--yh-fill-color, #f5f7fa);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}
.yh-ai-attachments__progress-wrap .yh-ai-attachments__progress {
  position: relative;
  width: 80px;
  left: auto;
  right: auto;
}
.yh-ai-attachments__progress-bar {
  height: 100%;
  background: var(--yh-ai-attachments-primary-color);
  transition: width 0.3s ease;
}
.yh-ai-attachments__delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}
.yh-ai-attachments__delete-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}
.yh-ai-attachments__drop-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--yh-ai-attachments-primary-color), 0.1);
  border: 2px dashed var(--yh-ai-attachments-primary-color);
  border-radius: 8px;
  z-index: 100;
}
.yh-ai-attachments__drop-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--yh-ai-attachments-primary-color);
}
.yh-ai-attachments__drop-text {
  font-size: 12px;
  font-weight: 500;
}
.yh-ai-attachments__scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--yh-ai-attachments-bg-color);
  border: 1px solid var(--yh-ai-attachments-border-color);
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}
.yh-ai-attachments__scroll-btn:hover {
  background: var(--yh-ai-attachments-hover-bg-color);
  border-color: var(--yh-ai-attachments-primary-color);
}
.yh-ai-attachments__scroll-btn--scroll-prev {
  left: -16px;
}
.yh-ai-attachments__scroll-btn--scroll-next {
  right: -16px;
}
.yh-ai-attachments__file-input {
  display: none;
}
</style>
