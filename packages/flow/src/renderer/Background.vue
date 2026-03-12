<template>
  <div class="yh-flow-background" :style="backgroundStyle">
    <canvas ref="canvasRef" :width="canvasWidth" :height="canvasHeight" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps<{
  type?: 'dots' | 'grid' | 'none'
  color?: string
  zoom?: number
  offset?: { x: number; y: number }
  gap?: number
}>()

const canvasRef = ref<HTMLCanvasElement>()
const canvasWidth = ref(2000)
const canvasHeight = ref(2000)

const backgroundStyle = computed(() => ({
  backgroundColor: props.color || '#f8f9fa'
}))

const drawBackground = () => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const gap = props.gap || 20

  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

  if (props.type === 'dots') {
    ctx.fillStyle = props.color || '#b1b1b7'
    const scaledGap = gap * (props.zoom || 1)
    const offsetX = (props.offset?.x || 0) % scaledGap
    const offsetY = (props.offset?.y || 0) % scaledGap

    for (let x = offsetX; x < canvasWidth.value; x += scaledGap) {
      for (let y = offsetY; y < canvasHeight.value; y += scaledGap) {
        ctx.beginPath()
        ctx.arc(x, y, 1, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  } else if (props.type === 'grid') {
    ctx.strokeStyle = props.color || '#e5e7eb'
    ctx.lineWidth = 1
    const scaledGap = gap * (props.zoom || 1)
    const offsetX = (props.offset?.x || 0) % scaledGap
    const offsetY = (props.offset?.y || 0) % scaledGap

    // 垂直线
    for (let x = offsetX; x < canvasWidth.value; x += scaledGap) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvasHeight.value)
      ctx.stroke()
    }

    // 水平线
    for (let y = offsetY; y < canvasHeight.value; y += scaledGap) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvasWidth.value, y)
      ctx.stroke()
    }
  }
}

onMounted(() => {
  drawBackground()
})

watch(
  () => [props.type, props.color, props.zoom, props.offset],
  () => {
    drawBackground()
  },
  { deep: true }
)
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
}

.yh-flow-background canvas {
  display: block;
}
</style>
