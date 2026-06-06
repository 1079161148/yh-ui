<template>
  <div class="yh-flow-background" :style="backgroundStyle">
    <canvas ref="canvasRef" :width="canvasWidth" :height="canvasHeight" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useFlowContext } from '../core/FlowContext'

const props = defineProps<{
  type?: 'dots' | 'grid' | 'none'
  color?: string
  gap?: number
}>()

const canvasRef = ref<HTMLCanvasElement>()
const canvasWidth = ref(2000)
const canvasHeight = ref(2000)
const flowInstance = useFlowContext()
const viewport = flowInstance.viewport

const backgroundStyle = computed(() => ({
  backgroundColor: 'var(--flow-background-color, #f8f9fa)'
}))

const drawBackground = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const rootStyles = getComputedStyle(canvas)
  const themeGridColor = rootStyles.getPropertyValue('--flow-grid-color').trim()

  const type = props.type || 'dots'
  const color = props.color || themeGridColor || (type === 'dots' ? '#b1b1b7' : '#e5e7eb')
  const gap = props.gap || 20
  const zoom = viewport.value.zoom
  const offset = { x: viewport.value.x, y: viewport.value.y }

  const container = flowInstance.$el
  if (container) {
    // 强制设置 canvas 尺寸，避免渲染后被重置清空
    const w = container.clientWidth || 2000
    const h = container.clientHeight || 2000
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
      canvasWidth.value = w
      canvasHeight.value = h
    }
  }

  const width = canvas.width
  const height = canvas.height

  ctx.clearRect(0, 0, width, height)

  const scaledGap = gap * zoom
  const offsetX = offset.x % scaledGap
  const offsetY = offset.y % scaledGap

  if (type === 'dots') {
    ctx.fillStyle = color
    for (let x = offsetX; x < width; x += scaledGap) {
      for (let y = offsetY; y < height; y += scaledGap) {
        ctx.beginPath()
        ctx.arc(x, y, 0.7 * zoom, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  } else if (type === 'grid') {
    ctx.strokeStyle = color
    ctx.lineWidth = 0.5
    for (let x = offsetX; x < width; x += scaledGap) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = offsetY; y < height; y += scaledGap) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }
  }
}

onMounted(drawBackground)
watch([viewport, () => props.type, () => props.color, () => props.gap], drawBackground, {
  deep: true
})
</script>

<style scoped>
.yh-flow-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.yh-flow-background canvas {
  display: block;
}
</style>
