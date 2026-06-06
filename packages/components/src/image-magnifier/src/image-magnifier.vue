<script setup lang="ts">
import { ref, computed, reactive, watch, onUnmounted, nextTick } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { ImageMagnifierPosition } from './image-magnifier'
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

// ─── Root style ───────────────────────────────────────────────────────────────
const rootStyle = computed<Record<string, string>>(() => {
  const { width, height } = props
  return {
    ...(themeStyle.value as Record<string, string>),
    width: typeof width === 'number' ? `${width}px` : (width as string),
    height: typeof height === 'number' ? `${height}px` : (height as string)
  }
})

// ─── Gallery support ──────────────────────────────────────────────────────────
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
const getSwitchToImageLabel = (index: number) =>
  t('imagemagnifier.switchToImage', { index: index + 1 })
const getGalleryItemAlt = (index: number) => t('imagemagnifier.galleryItem', { index: index + 1 })
const fullscreenCloseLabel = computed(() => t('imagemagnifier.close'))

const switchImage = (index: number) => {
  currentIndex.value = index
  emit('update:modelValue', index)
  emit('image-change', index)
}

// ─── Loading state ────────────────────────────────────────────────────────────
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

// ─── Mouse tracking ───────────────────────────────────────────────────────────
const visible = ref(false)
const maskPos = reactive({ top: 0, left: 0 })
const largePos = reactive({ top: 0, left: 0 })
const containerRef = ref<HTMLElement | null>(null)

// ─── Zoom scale (supports wheel) ─────────────────────────────────────────────
const currentScale = ref(props.scale)

watch(
  () => props.scale,
  (val) => {
    currentScale.value = val
  }
)

// ─── Smart positioning ────────────────────────────────────────────────────────
const resolvedPosition = ref<ImageMagnifierPosition>('right')

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

// ─── Events ───────────────────────────────────────────────────────────────────
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

const handleMouseMove = (e: MouseEvent) => {
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

const handleWheel = (e: WheelEvent) => {
  if (!props.wheelZoom || !visible.value) return
  e.preventDefault()
  const delta = e.deltaY > 0 ? -props.scaleStep : props.scaleStep
  currentScale.value =
    Math.round(
      Math.min(props.maxScale, Math.max(props.minScale, currentScale.value + delta)) * 10
    ) / 10
  emit('scale-change', currentScale.value)
}

// ─── Wheel event (non-passive, must use addEventListener) ─────────────────────
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

// onUnmounted 统一在下方全屏块中处理

// ─── Computed styles ──────────────────────────────────────────────────────────
const previewStyle = computed<Record<string, string | number>>(() => {
  const isInside = resolvedPosition.value === 'inside'

  const base: Record<string, string | number> = {
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

const largeImageStyle = computed<Record<string, string | number>>(() => {
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

const maskStyle = computed<Record<string, string | number>>(() => ({
  width: `${props.maskWidth}px`,
  height: `${props.maskHeight}px`,
  transform: `translate(${maskPos.left}px, ${maskPos.top}px)`,
  backgroundColor: props.maskColor,
  position: 'absolute',
  top: '0',
  left: '0'
}))

// ─── Minimap ──────────────────────────────────────────────────────────────────
const minimapIndicatorStyle = computed<Record<string, string>>(() => {
  if (!containerRef.value) return {} as Record<string, string>
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

// ─── Fullscreen ───────────────────────────────────────────────────────────────
const fullscreenVisible = ref(false)

const openFullscreen = () => {
  if (!props.clickToFullscreen) return
  fullscreenVisible.value = true
}

const closeFullscreen = () => {
  fullscreenVisible.value = false
}

const handleFullscreenKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeFullscreen()
}

// 全屏时锁定 body/html 滚动 + 挂载 Esc 监听
// 锁定 body 可防止 VitePress 等框架滚动容器遮挡 fixed 弹层
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

<style lang="scss">
@use './image-magnifier.scss';
</style>
