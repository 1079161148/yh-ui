<template>
  <div ref="containerRef" :class="[ns.b(), { [ns.m('fullscreen')]: fullScreen }]" :style="containerStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick, type CSSProperties } from 'vue'
import { watermarkProps } from './watermark'
import { useNamespace } from '@yh-ui/hooks'

defineOptions({
  name: 'YhWatermark'
})

const props = defineProps(watermarkProps)
const ns = useNamespace('watermark')

const containerRef = ref<HTMLElement | null>(null)
let watermarkRef: HTMLElement | null = null
const watermarkUrl = ref('')

const containerStyle = computed(() => {
  if (props.fullScreen) return {}
  return {
    position: 'relative' as const,
    overflow: 'hidden'
  }
})

const watermarkInnerStyle = computed<CSSProperties>(() => {
  const isGlobalRotated = props.globalRotate !== 0
  const size = isGlobalRotated ? '150%' : '100%'
  const offset = isGlobalRotated ? '-25%' : '0'

  return {
    position: props.fullScreen ? 'fixed' : 'absolute',
    top: offset,
    left: offset,
    width: size,
    height: size,
    zIndex: props.zIndex,
    pointerEvents: 'none',
    backgroundRepeat: 'repeat',
    backgroundImage: `url(${watermarkUrl.value})`,
    backgroundSize: `${props.gap[0] + props.width}px ${props.gap[1] + props.height}px`,
    visibility: 'visible',
    opacity: 1,
    display: 'block',
    transform: `rotate(${props.globalRotate}deg)`,
    transformOrigin: 'center center'
  }
})

/**
 * 核心渲染逻辑：生成高质量水印数据
 */
const renderWatermark = () => {
  const canvas = document.createElement('canvas')
  const ratio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

  const canvasWidth = props.width + props.gap[0]
  const canvasHeight = props.height + props.gap[1]

  canvas.width = canvasWidth * ratio
  canvas.height = canvasHeight * ratio

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.scale(ratio, ratio)
  ctx.translate(canvasWidth / 2, canvasHeight / 2)
  ctx.rotate((props.rotate * Math.PI) / 180)

  if (props.image) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.referrerPolicy = 'no-referrer'
    img.src = props.image
    img.onload = () => {
      ctx.drawImage(img, -props.width / 2, -props.height / 2, props.width, props.height)
      watermarkUrl.value = canvas.toDataURL()
      createOrUpdateWatermark()
    }
  } else {
    const { color, fontSize, fontWeight, fontFamily, fontStyle, textAlign, lineHeight } = props.font
    ctx.fillStyle = color || 'rgba(0,0,0,0.15)'
    ctx.font = `${fontStyle} ${fontWeight} ${typeof fontSize === 'number' ? fontSize + 'px' : fontSize} ${fontFamily}`
    ctx.textAlign = textAlign || 'center'
    ctx.textBaseline = 'middle'

    const contents = Array.isArray(props.content)
      ? props.content
      : (typeof props.content === 'string' ? props.content.split('\n') : [props.content])
    const lH = lineHeight || 22

    contents.forEach((text, index) => {
      const yOffset = (index - (contents.length - 1) / 2) * lH
      ctx.fillText(text, 0, yOffset)
    })

    watermarkUrl.value = canvas.toDataURL()
    createOrUpdateWatermark()
  }
}

/**
 * 创建或强制更新水印节点
 */
const createOrUpdateWatermark = () => {
  if (!containerRef.value) return

  if (watermarkRef && watermarkRef.parentNode) {
    watermarkRef.parentNode.removeChild(watermarkRef)
  }

  const div = document.createElement('div')
  const style = watermarkInnerStyle.value

  Object.assign(div.style, style)
  if (style.zIndex !== undefined) {
    div.style.zIndex = style.zIndex.toString()
  }

  div.className = `yh-wm-${Math.random().toString(36).slice(2, 9)}`

  watermarkRef = div
  containerRef.value.appendChild(div)
}

/**
 * 极致防删除监控中心
 */
let observer: MutationObserver | null = null
let checkTimer: ReturnType<typeof setInterval> | null = null

const initGuard = () => {
  if (!props.antiTamper || !containerRef.value) return

  if (observer) observer.disconnect()
  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        const removed = Array.from(mutation.removedNodes)
        if (removed.includes(watermarkRef!)) {
          createOrUpdateWatermark()
        }
      }
      else if (mutation.type === 'attributes' && mutation.target === watermarkRef) {
        createOrUpdateWatermark()
      }
    }
  })

  observer.observe(containerRef.value, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['style', 'class', 'hidden']
  })

  if (checkTimer) clearInterval(checkTimer)
  checkTimer = setInterval(() => {
    if (!watermarkRef || !watermarkRef.parentNode || watermarkRef.style.display === 'none') {
      createOrUpdateWatermark()
    }
  }, 3000)
}

watch(() => [props.content, props.image, props.width, props.height, props.gap, props.rotate, props.globalRotate, props.zIndex, props.fullScreen, props.font], () => {
  renderWatermark()
}, { deep: true })

onMounted(() => {
  renderWatermark()
  nextTick(() => {
    initGuard()
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (checkTimer) clearInterval(checkTimer)
  if (watermarkRef && watermarkRef.parentNode) {
    watermarkRef.parentNode.removeChild(watermarkRef)
  }
})

defineExpose({
  renderWatermark
})
</script>

<style lang="scss">
@use './watermark.scss';
</style>
