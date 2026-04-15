<script setup>
import { ref, computed, reactive, watch, onUnmounted, nextTick } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { imageMagnifierProps, imageMagnifierEmits } from './image-magnifier'
defineOptions({ name: 'YhImageMagnifier' })
const props = defineProps(imageMagnifierProps)
const emit = defineEmits(imageMagnifierEmits)
const ns = useNamespace('image-magnifier')
const { t } = useLocale()
const { themeStyle } = useComponentTheme(
  'image-magnifier',
  computed(() => props.themeOverrides)
)
const rootStyle = computed(() => {
  const { width, height } = props
  return {
    ...themeStyle.value,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  }
})
const currentIndex = ref(props.modelValue)
watch(
  () => props.modelValue,
  (val) => {
    currentIndex.value = val
  }
)
const galleryImages = computed(() => {
  if (props.images.length > 0) return props.images
  return [{ src: props.src, zoomSrc: props.zoomSrc, alt: props.alt }]
})
const currentImage = computed(
  () => galleryImages.value[currentIndex.value] ?? galleryImages.value[0]
)
const currentSrc = computed(() => currentImage.value.src)
const currentZoomSrc = computed(() => currentImage.value.zoomSrc || currentImage.value.src)
const currentAlt = computed(() => currentImage.value.alt || props.alt)
const getSwitchToImageLabel = (index) => t('imagemagnifier.switchToImage', { index: index + 1 })
const getGalleryItemAlt = (index) => t('imagemagnifier.galleryItem', { index: index + 1 })
const fullscreenCloseLabel = computed(() => t('imagemagnifier.close'))
const switchImage = (index) => {
  currentIndex.value = index
  emit('update:modelValue', index)
  emit('image-change', index)
}
const isHdLoaded = ref(false)
const isHdLoading = ref(false)
const preloadHdImage = () => {
  if (isHdLoaded.value || isHdLoading.value) return
  const zoomUrl = currentZoomSrc.value
  if (!zoomUrl) return
  isHdLoading.value = true
  const img = new Image()
  img.onload = () => {
    isHdLoaded.value = true
    isHdLoading.value = false
  }
  img.onerror = () => {
    isHdLoading.value = false
  }
  img.src = zoomUrl
}
watch(currentIndex, () => {
  isHdLoaded.value = false
  isHdLoading.value = false
})
const visible = ref(false)
const maskPos = reactive({ top: 0, left: 0 })
const largePos = reactive({ top: 0, left: 0 })
const containerRef = ref(null)
const currentScale = ref(props.scale)
watch(
  () => props.scale,
  (val) => {
    currentScale.value = val
  }
)
const resolvedPosition = ref('right')
const computeSmartPosition = () => {
  if (
    props.position !== 'auto' &&
    props.position !== 'right' &&
    props.position !== 'left' &&
    props.position !== 'inside'
  )
    return
  if (props.position !== 'auto') {
    resolvedPosition.value = props.position
    return
  }
  if (!containerRef.value) {
    resolvedPosition.value = 'right'
    return
  }
  const rect = containerRef.value.getBoundingClientRect()
  const previewW = props.maskWidth * currentScale.value
  const rightSpace = window.innerWidth - rect.right
  const leftSpace = rect.left
  if (rightSpace >= previewW + props.offset) {
    resolvedPosition.value = 'right'
  } else if (leftSpace >= previewW + props.offset) {
    resolvedPosition.value = 'left'
  } else {
    resolvedPosition.value = 'inside'
  }
}
const handleMouseEnter = () => {
  visible.value = true
  computeSmartPosition()
  preloadHdImage()
  emit('enter')
  emit('zoom-start')
}
const handleMouseLeave = () => {
  visible.value = false
  emit('leave')
  emit('zoom-end')
}
const handleMouseMove = (e) => {
  if (!containerRef.value) return
  const rect = containerRef.value.getBoundingClientRect()
  const mouseX = e.clientX - rect.left
  const mouseY = e.clientY - rect.top
  let left = mouseX - props.maskWidth / 2
  let top = mouseY - props.maskHeight / 2
  left = Math.max(0, Math.min(left, rect.width - props.maskWidth))
  top = Math.max(0, Math.min(top, rect.height - props.maskHeight))
  maskPos.left = left
  maskPos.top = top
  if (resolvedPosition.value === 'inside') {
    largePos.left = props.maskWidth / 2 - mouseX * currentScale.value
    largePos.top = props.maskHeight / 2 - mouseY * currentScale.value
  } else {
    largePos.left = -left * currentScale.value
    largePos.top = -top * currentScale.value
  }
}
const handleWheel = (e) => {
  if (!props.wheelZoom || !visible.value) return
  e.preventDefault()
  const delta = e.deltaY > 0 ? -props.scaleStep : props.scaleStep
  currentScale.value =
    Math.round(
      Math.min(props.maxScale, Math.max(props.minScale, currentScale.value + delta)) * 10
    ) / 10
  emit('scale-change', currentScale.value)
}
const addWheelListener = () => {
  containerRef.value?.addEventListener('wheel', handleWheel, { passive: false })
}
const removeWheelListener = () => {
  containerRef.value?.removeEventListener('wheel', handleWheel)
}
watch(containerRef, (el) => {
  if (el) {
    nextTick(addWheelListener)
  }
})
const previewStyle = computed(() => {
  const isInside = resolvedPosition.value === 'inside'
  const base = {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 100,
    pointerEvents: 'none'
  }
  if (isInside) {
    return {
      ...base,
      left: `${maskPos.left}px`,
      top: `${maskPos.top}px`,
      width: `${props.maskWidth}px`,
      height: `${props.maskHeight}px`,
      borderRadius: props.maskShape === 'circle' ? '50%' : 'var(--yh-radius-base)',
      boxShadow: '0 0 0 1px rgba(255,255,255,0.6), 0 4px 16px rgba(0,0,0,0.25)',
      zIndex: 10,
      backgroundColor: 'var(--yh-bg-color-overlay)'
    }
  }
  return {
    ...base,
    top: '0',
    width: `${props.maskWidth * currentScale.value}px`,
    height: `${props.maskHeight * currentScale.value}px`,
    ...(resolvedPosition.value === 'right' ? { left: `calc(100% + ${props.offset}px)` } : {}),
    ...(resolvedPosition.value === 'left' ? { right: `calc(100% + ${props.offset}px)` } : {})
  }
})
const largeImageStyle = computed(() => {
  const w = containerRef.value?.offsetWidth ?? 0
  const h = containerRef.value?.offsetHeight ?? 0
  return {
    width: `${w * currentScale.value}px`,
    height: `${h * currentScale.value}px`,
    transform: `translate(${largePos.left}px, ${largePos.top}px)`,
    position: 'absolute',
    top: '0',
    left: '0',
    opacity: isHdLoaded.value || !isHdLoading.value ? 1 : 0.5,
    transition: 'opacity 0.2s'
  }
})
const maskStyle = computed(() => ({
  width: `${props.maskWidth}px`,
  height: `${props.maskHeight}px`,
  transform: `translate(${maskPos.left}px, ${maskPos.top}px)`,
  backgroundColor: props.maskColor,
  position: 'absolute',
  top: '0',
  left: '0'
}))
const minimapIndicatorStyle = computed(() => {
  if (!containerRef.value) return {}
  const cW = containerRef.value.offsetWidth || 1
  const cH = containerRef.value.offsetHeight || 1
  const ratioX = maskPos.left / cW
  const ratioY = maskPos.top / cH
  const ratioW = props.maskWidth / cW
  const ratioH = props.maskHeight / cH
  return {
    left: `${ratioX * 100}%`,
    top: `${ratioY * 100}%`,
    width: `${ratioW * 100}%`,
    height: `${ratioH * 100}%`
  }
})
const fullscreenVisible = ref(false)
const openFullscreen = () => {
  if (!props.clickToFullscreen) return
  fullscreenVisible.value = true
}
const closeFullscreen = () => {
  fullscreenVisible.value = false
}
const handleFullscreenKeydown = (e) => {
  if (e.key === 'Escape') closeFullscreen()
}
watch(fullscreenVisible, (val) => {
  if (val) {
    document.addEventListener('keydown', handleFullscreenKeydown)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleFullscreenKeydown)
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
})
onUnmounted(() => {
  removeWheelListener()
  document.removeEventListener('keydown', handleFullscreenKeydown)
})
defineExpose({ visible, currentScale, currentIndex, switchImage })
</script>

<template>
  <div
    :class="ns.b()"
    :style="rootStyle"
    ref="containerRef"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMove"
  >
    <!-- 主图区域：点击全屏绑定在 wrapper 上，避免 img pointer-events:none 吃掉事件 -->
    <div
      :class="[
        ns.e('image-wrapper'),
        ns.is('bordered', props.border),
        ns.is('shadow', props.shadow)
      ]"
      :style="props.clickToFullscreen ? 'cursor:zoom-in' : ''"
      @click="openFullscreen"
    >
      <slot>
        <img :src="currentSrc" :alt="currentAlt" :class="ns.e('image')" />
      </slot>

      <!-- 渐进加载提示 -->
      <div v-if="visible && isHdLoading" :class="ns.e('loading')">
        <div :class="ns.e('loading-bar')" />
      </div>

      <!-- 遮罩 (外部模式) -->
      <div
        v-if="visible && resolvedPosition !== 'inside'"
        :class="[ns.e('mask'), ns.is(props.maskShape)]"
        :style="maskStyle"
      />

      <!-- 内部透镜预览 (inside) -->
      <div
        v-if="visible && resolvedPosition === 'inside'"
        :class="ns.e('preview')"
        :style="previewStyle"
      >
        <img
          :src="currentZoomSrc"
          :class="ns.e('large-image')"
          :style="largeImageStyle"
          :alt="currentAlt"
        />
        <!-- 地图缩略导航 -->
        <div v-if="props.showMinimap" :class="ns.e('minimap')">
          <img :src="currentSrc" :class="ns.e('minimap-img')" />
          <div :class="ns.e('minimap-indicator')" :style="minimapIndicatorStyle" />
        </div>
      </div>

      <!-- 提示文字 -->
      <div v-if="!visible && props.title" :class="ns.e('title')">
        <slot name="title">{{ props.title }}</slot>
      </div>
    </div>

    <!-- 外部预览图 (right/left) -->
    <div
      v-if="visible && resolvedPosition !== 'inside'"
      :class="ns.e('preview')"
      :style="previewStyle"
    >
      <img
        :src="currentZoomSrc"
        :class="ns.e('large-image')"
        :style="largeImageStyle"
        :alt="currentAlt"
      />
      <!-- 地图缩略导航 -->
      <div v-if="props.showMinimap" :class="ns.e('minimap')">
        <img :src="currentSrc" :class="ns.e('minimap-img')" :alt="currentAlt" />
        <div :class="ns.e('minimap-indicator')" :style="minimapIndicatorStyle" />
      </div>
    </div>

    <!-- 图片库缩略图 -->
    <div v-if="galleryImages.length > 1" :class="ns.e('gallery')">
      <button
        v-for="(img, idx) in galleryImages"
        :key="idx"
        :class="[ns.e('gallery-item'), ns.is('active', idx === currentIndex)]"
        @click="switchImage(idx)"
        type="button"
        :aria-label="getSwitchToImageLabel(idx)"
      >
        <img :src="img.src" :alt="img.alt || getGalleryItemAlt(idx)" />
      </button>
    </div>

    <!-- 当前倍率显示 (wheelZoom 开启时) -->
    <div v-if="props.wheelZoom && visible" :class="ns.e('scale-badge')"> {{ currentScale }}x </div>

    <!-- 全屏弹层：Esc 通过 document 级监听处理，不依赖元素焦点 -->
    <Teleport to="body">
      <div v-if="fullscreenVisible" :class="[ns.b(), ns.m('fullscreen-wrapper')]">
        <div
          :class="ns.e('fullscreen-overlay')"
          role="dialog"
          aria-modal="true"
          @click.self="closeFullscreen"
        >
          <button
            :class="ns.e('fullscreen-close')"
            @click="closeFullscreen"
            type="button"
            :aria-label="fullscreenCloseLabel"
          >
            <slot name="close-icon">✕</slot>
          </button>
          <div :class="ns.e('fullscreen-body')">
            <slot name="fullscreen" :src="currentZoomSrc" :alt="currentAlt">
              <img :src="currentZoomSrc" :alt="currentAlt" :class="ns.e('fullscreen-image')" />
            </slot>
          </div>
          <div v-if="galleryImages.length > 1" :class="ns.e('fullscreen-gallery')">
            <button
              v-for="(img, idx) in galleryImages"
              :key="idx"
              :class="[ns.e('fullscreen-thumb'), ns.is('active', idx === currentIndex)]"
              @click="switchImage(idx)"
              type="button"
            >
              <img :src="img.src" :alt="img.alt || getGalleryItemAlt(idx)" />
            </button>
          </div>
        </div>
      </div>
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
.yh-image-magnifier {
  --yh-magnifier-preview-border: var(--yh-border-color-lighter);
  --yh-magnifier-preview-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  --yh-magnifier-mask-bg: rgba(0, 0, 0, 0.2);
  --yh-magnifier-mask-border: rgba(255, 255, 255, 0.6);
  --yh-magnifier-radius: var(--yh-radius-base);
  --yh-magnifier-loading-color: var(--yh-color-primary);
  --yh-magnifier-gallery-active-border: var(--yh-color-primary);
  --yh-magnifier-badge-bg: rgba(0, 0, 0, 0.55);
  --yh-magnifier-badge-color: #fff;
  --yh-magnifier-minimap-size: 80px;
  --yh-magnifier-fullscreen-bg: rgba(0, 0, 0, 0.88);
  --yh-magnifier-title-bg: rgba(0, 0, 0, 0.5);
  position: relative;
  width: 100%;
  display: inline-block;
  cursor: crosshair;
}
.yh-image-magnifier__image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--yh-magnifier-radius);
  background-color: var(--yh-fill-color-light);
}
.yh-image-magnifier__image-wrapper.is-bordered {
  border: 1px solid var(--yh-border-color-lighter);
}
.yh-image-magnifier__image-wrapper.is-shadow {
  box-shadow: var(--yh-shadow-light);
}

.yh-image-magnifier__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  pointer-events: none;
}

.yh-image-magnifier__mask {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: var(--yh-magnifier-mask-bg);
  border: 1px solid var(--yh-magnifier-mask-border);
  pointer-events: none;
  box-sizing: border-box;
}
.yh-image-magnifier__mask.is-square {
  border-radius: 2px;
}
.yh-image-magnifier__mask.is-circle {
  border-radius: 50%;
}

.yh-image-magnifier__preview {
  position: absolute;
  top: 0;
  z-index: 100;
  overflow: hidden;
  border: 1px solid var(--yh-magnifier-preview-border);
  box-shadow: var(--yh-magnifier-preview-shadow);
  background-color: var(--yh-bg-color-overlay);
  border-radius: var(--yh-magnifier-radius);
}
.yh-image-magnifier__large-image {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  max-width: none;
  pointer-events: none;
  will-change: transform;
  transition: none;
}

.yh-image-magnifier__loading {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  overflow: hidden;
  pointer-events: none;
  z-index: 20;
}

.yh-image-magnifier__loading-bar {
  height: 100%;
  width: 40%;
  background: var(--yh-magnifier-loading-color);
  border-radius: 2px;
  animation: yh-magnifier-loading-slide 1.2s ease-in-out infinite;
}

.yh-image-magnifier__minimap {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: var(--yh-magnifier-minimap-size);
  height: var(--yh-magnifier-minimap-size);
  border: 1px solid var(--yh-magnifier-preview-border);
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--yh-bg-color-overlay);
  pointer-events: none;
  opacity: 0.85;
}

.yh-image-magnifier__minimap-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

.yh-image-magnifier__minimap-indicator {
  position: absolute;
  top: 0;
  left: 0;
  border: 1.5px solid var(--yh-magnifier-gallery-active-border);
  background: rgba(var(--yh-color-primary-rgb, 64, 158, 255), 0.2);
  box-sizing: border-box;
  pointer-events: none;
}

.yh-image-magnifier__scale-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 8px;
  background: var(--yh-magnifier-badge-bg);
  color: var(--yh-magnifier-badge-color);
  font-size: var(--yh-font-size-xs);
  border-radius: 10px;
  pointer-events: none;
  user-select: none;
  z-index: 50;
  letter-spacing: 0.5px;
  backdrop-filter: blur(4px);
}

.yh-image-magnifier__title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 12px;
  background: var(--yh-magnifier-title-bg);
  color: white;
  font-size: var(--yh-font-size-xs);
  text-align: center;
  backdrop-filter: blur(4px);
  pointer-events: none;
}

.yh-image-magnifier__gallery {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.yh-image-magnifier__gallery-item {
  width: 56px;
  height: 56px;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: var(--yh-fill-color-light);
  transition: border-color var(--yh-transition-fast);
  flex-shrink: 0;
}
.yh-image-magnifier__gallery-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
.yh-image-magnifier__gallery-item:hover {
  border-color: var(--yh-magnifier-gallery-active-border);
  opacity: 0.85;
}
.yh-image-magnifier__gallery-item.is-active {
  border-color: var(--yh-magnifier-gallery-active-border);
}

.yh-image-magnifier--fullscreen-wrapper {
  position: fixed;
  inset: 0;
  z-index: 100000;
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
}

.yh-image-magnifier__fullscreen-overlay {
  width: 100%;
  height: 100%;
  background: var(--yh-magnifier-fullscreen-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: yh-fade-in 0.2s ease;
}

.yh-image-magnifier__fullscreen-close {
  position: absolute;
  top: 20px;
  right: 24px;
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 18px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--yh-transition-fast);
}
.yh-image-magnifier__fullscreen-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.yh-image-magnifier__fullscreen-body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 90vw;
  max-height: 80vh;
  overflow: hidden;
}

.yh-image-magnifier__fullscreen-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 4px;
  user-select: none;
  pointer-events: none;
}

.yh-image-magnifier__fullscreen-gallery {
  display: flex;
  gap: 8px;
  padding: 16px;
  overflow-x: auto;
  max-width: 90vw;
}

.yh-image-magnifier__fullscreen-thumb {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.1);
  transition: border-color var(--yh-transition-fast);
}
.yh-image-magnifier__fullscreen-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.yh-image-magnifier__fullscreen-thumb.is-active {
  border-color: var(--yh-magnifier-gallery-active-border);
}
.yh-image-magnifier__fullscreen-thumb:hover {
  border-color: rgba(255, 255, 255, 0.5);
}

@keyframes yh-magnifier-loading-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}
@keyframes yh-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
