<template>
  <div
    class="yh-flow-minimap"
    :class="[position]"
    :style="{ width: cW + 'px', height: cH + 'px' }"
    @mousedown.stop="handleMouseDown"
  >
    <!-- Canvas：绘制节点+连线（静态部分，节点变化才重绘） -->
    <canvas ref="canvasRef" :width="cW" :height="cH" class="yh-flow-minimap__canvas" />
    <!-- SVG：视口框 -->
    <svg
      ref="svgRef"
      class="yh-flow-minimap__vp"
      :width="cW"
      :height="cH"
      :viewBox="`0 0 ${cW} ${cH}`"
      :style="{ background: props.maskColor || 'transparent' }"
    >
      <rect
        ref="vpRectEl"
        x="0"
        y="0"
        width="20"
        height="20"
        :fill="props.maskColor || 'rgba(59,130,246,0.08)'"
        :stroke="props.maskStrokeColor || '#3b82f6'"
        :stroke-width="props.maskStrokeWidth || 1.2"
        rx="2"
        class="yh-flow-minimap__rect"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { Node, ViewportTransform } from '../types'
import { useFlowContext } from '../core/FlowContext'

const props = defineProps<{
  nodeColor?: string | ((node: Node) => string)
  nodeStrokeColor?: string | ((node: Node) => string)
  nodeStrokeWidth?: number
  maskColor?: string
  maskStrokeColor?: string
  maskStrokeWidth?: number
  width?: number
  height?: number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  pannable?: boolean
  zoomable?: boolean
}>()

const cW = computed(() => props.width || 200)
const cH = computed(() => props.height || 150)
const canvasRef = ref<HTMLCanvasElement>()
const vpRectEl = ref<SVGRectElement>()
const flowInstance = useFlowContext()

const nodes = flowInstance.nodes
const edges = flowInstance.edges
const viewport = flowInstance.viewport

// ── 内部状态 ─────────────────────────────────────
let _mapScale = 1
let _minX = 0
let _minY = 0
let _offsetX = 0
let _offsetY = 0

// ── 包围盒计算 ──────────────────────────────────
const computeGraphBounds = () => {
  const currentNodes = nodes.value
  if (!currentNodes.length) return { minX: 0, minY: 0, maxX: 1, maxY: 1 }
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity
  for (let i = 0; i < currentNodes.length; i++) {
    const n = currentNodes[i]
    if (n.hidden) continue
    const nw = n.width || 120
    const nh = n.height || 50
    if (n.position.x < minX) minX = n.position.x
    if (n.position.y < minY) minY = n.position.y
    if (n.position.x + nw > maxX) maxX = n.position.x + nw
    if (n.position.y + nh > maxY) maxY = n.position.y + nh
  }
  if (minX === Infinity) return { minX: 0, minY: 0, maxX: 1, maxY: 1 }
  return { minX, minY, maxX, maxY }
}

const toMX = (x: number) => (x - _minX) * _mapScale + _offsetX
const toMY = (y: number) => (y - _minY) * _mapScale + _offsetY

// ── Canvas 绘制 ──────────────────────────────────
const drawCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  const b = computeGraphBounds()
  _minX = b.minX
  _minY = b.minY

  const gW = b.maxX - b.minX || 1
  const gH = b.maxY - b.minY || 1
  const pad = 4

  _mapScale = Math.min((cW.value - pad * 2) / gW, (cH.value - pad * 2) / gH)
  _offsetX = (cW.value - gW * _mapScale) / 2
  _offsetY = (cH.value - gH * _mapScale) / 2

  ctx.clearRect(0, 0, cW.value, cH.value)
  if (!nodes.value.length) {
    updateVpRect(viewport.value)
    return
  }

  // 连线
  const nodeMap = new Map<string, Node>()
  nodes.value.forEach((n) => nodeMap.set(n.id, n))

  ctx.strokeStyle = '#94a3b8' // 加深颜色
  ctx.lineWidth = 1.2 // 加粗线条
  ctx.globalAlpha = 0.5
  ctx.beginPath()
  edges.value.forEach((e) => {
    if (e.hidden) return
    const src = nodeMap.get(e.source)
    const tgt = nodeMap.get(e.target)
    if (!src || !tgt) return
    ctx.moveTo(
      toMX(src.position.x + (src.width || 120) / 2),
      toMY(src.position.y + (src.height || 50) / 2)
    )
    ctx.lineTo(
      toMX(tgt.position.x + (tgt.width || 120) / 2),
      toMY(tgt.position.y + (tgt.height || 50) / 2)
    )
  })
  ctx.stroke()

  // 节点
  const selColor = '#3b82f6'

  ctx.globalAlpha = 0.85
  nodes.value.forEach((n) => {
    if (n.hidden) return

    let color = n.selected ? selColor : '#cbd5e1'
    if (!n.selected && props.nodeColor) {
      color = typeof props.nodeColor === 'function' ? props.nodeColor(n) : props.nodeColor
    }

    ctx.fillStyle = color
    // 保证节点在小地图上至少有 3x3 的大小
    const nw = Math.max((n.width || 120) * _mapScale, 3)
    const nh = Math.max((n.height || 50) * _mapScale, 3)
    const nx = toMX(n.position.x)
    const ny = toMY(n.position.y)

    ctx.fillRect(nx, ny, nw, nh)

    // 绘制节点边框（如果指定）
    if (props.nodeStrokeWidth || props.nodeStrokeColor) {
      let strokeColor = '#94a3b8'
      if (props.nodeStrokeColor) {
        strokeColor =
          typeof props.nodeStrokeColor === 'function'
            ? props.nodeStrokeColor(n)
            : props.nodeStrokeColor
      }
      ctx.strokeStyle = strokeColor
      ctx.lineWidth = props.nodeStrokeWidth || 0.5
      ctx.strokeRect(nx, ny, nw, nh)
    }
  })

  ctx.globalAlpha = 1
  updateVpRect(viewport.value)
}

const updateVpRect = (vp: ViewportTransform) => {
  const el = vpRectEl.value
  if (!el || !_mapScale) return

  const container = flowInstance.$el
  const containerW = container?.clientWidth || 800
  const containerH = container?.clientHeight || 600

  const canvasLeft = -vp.x / vp.zoom
  const canvasTop = -vp.y / vp.zoom
  const canvasW = containerW / vp.zoom
  const canvasH = containerH / vp.zoom

  const rx = (canvasLeft - _minX) * _mapScale + _offsetX
  const ry = (canvasTop - _minY) * _mapScale + _offsetY
  const rw = Math.max(canvasW * _mapScale, 2)
  const rh = Math.max(canvasH * _mapScale, 2)

  el.setAttribute('x', String(rx))
  el.setAttribute('y', String(ry))
  el.setAttribute('width', String(rw))
  el.setAttribute('height', String(rh))
}

// ── 交互支持 ────────────────────────────────────
let isDragging = false
const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging || props.pannable === false) return
  const rect = canvasRef.value?.getBoundingClientRect()
  if (!rect) return
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top

  const canvasX = (mx - _offsetX) / _mapScale + _minX
  const canvasY = (my - _offsetY) / _mapScale + _minY

  const zoom = viewport.value.zoom
  const container = flowInstance.$el
  const containerW = container?.clientWidth || 800
  const containerH = container?.clientHeight || 600

  const newX = containerW / 2 - canvasX * zoom
  const newY = containerH / 2 - canvasY * zoom

  flowInstance.setViewport({ x: newX, y: newY, zoom })
}

const handleMouseUp = () => {
  isDragging = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleMouseDown = (e: MouseEvent) => {
  if (props.pannable === false) return
  isDragging = true
  handleMouseMove(e)
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

onMounted(drawCanvas)
onBeforeUnmount(handleMouseUp)

watch([nodes, edges], drawCanvas, { deep: true, flush: 'post' })
watch(viewport, (vp) => updateVpRect(vp), { flush: 'sync' })
</script>

<style scoped>
.yh-flow-minimap {
  position: absolute;
  /* Premium Glassmorphism Effect */
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  pointer-events: auto;
  z-index: 10;
  cursor: crosshair;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.yh-flow-minimap:hover {
  transform: scale(1.02);
}

.yh-flow-minimap.bottom-right {
  right: 16px;
  bottom: 16px;
}

.yh-flow-minimap.top-right {
  right: 16px;
  top: 16px;
}

.yh-flow-minimap.bottom-left {
  left: 16px;
  bottom: 16px;
}

.yh-flow-minimap.top-left {
  left: 16px;
  top: 16px;
}

.yh-flow-minimap__canvas,
.yh-flow-minimap__vp {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.yh-flow-minimap__vp {
  pointer-events: none;
}

.yh-flow-minimap__rect {
  transition: all 0.1s ease-out;
  filter: drop-shadow(0 0 2px rgba(59, 130, 246, 0.3));
}
</style>
