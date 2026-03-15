<template>
  <div
    class="yh-flow-minimap"
    :style="{ width: cW + 'px', height: cH + 'px' }"
    @mousedown.stop="handleMouseDown"
  >
    <!-- Canvas：绘制节点+连线（静态部分，节点变化才重绘） -->
    <canvas ref="canvasRef" :width="cW" :height="cH" class="yh-flow-minimap__canvas" />
    <!-- SVG：视口框（由 updateViewport 直接 DOM 操作，高频更新） -->
    <svg
      ref="svgRef"
      class="yh-flow-minimap__vp"
      :width="cW"
      :height="cH"
      :viewBox="`0 0 ${cW} ${cH}`"
    >
      <rect
        ref="vpRectEl"
        x="0"
        y="0"
        width="20"
        height="20"
        fill="rgba(59,130,246,0.15)"
        stroke="#3b82f6"
        stroke-width="1.5"
        rx="2"
        class="yh-flow-minimap__rect"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { Node, Edge, ViewportTransform } from '../types'
import { useFlowContext } from '../core/FlowContext'

const props = defineProps<{
  nodes: Node[]
  edges: Edge[]
  viewport: ViewportTransform
  viewportSize: { width: number; height: number }
  nodeColor?: string
  width?: number
  height?: number
}>()

const cW = computed(() => props.width || 200)
const cH = computed(() => props.height || 150)
const canvasRef = ref<HTMLCanvasElement>()
const vpRectEl = ref<SVGRectElement>()
const flowInstance = useFlowContext()

// ── 内部状态（不走响应式，直接保存） ─────────────────────────────────────
let _mapScale = 1
let _minX = 0
let _minY = 0
let _offsetX = 0
let _offsetY = 0

// ── 包围盒计算 ────────────────────────────────────────────────────────────
const computeGraphBounds = () => {
  const nodes = props.nodes
  if (!nodes.length) return { minX: 0, minY: 0, maxX: 1, maxY: 1 }
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
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

// ── Canvas 绘制 ─────────────────────────────────────────────────────────
const drawCanvas = () => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return

  const nodes = props.nodes
  const edges = props.edges
  const b = computeGraphBounds()

  _minX = b.minX
  _minY = b.minY

  const gW = b.maxX - b.minX || 1
  const gH = b.maxY - b.minY || 1
  const pad = 4

  // 等比缩放，适应 Minimap 宽高
  _mapScale = Math.min((cW.value - pad * 2) / gW, (cH.value - pad * 2) / gH)

  // 居中偏移，如果某一边没有填满，将其居中
  _offsetX = (cW.value - gW * _mapScale) / 2
  _offsetY = (cH.value - gH * _mapScale) / 2

  const cw = cW.value
  const ch = cH.value
  ctx.clearRect(0, 0, cw, ch)
  if (!nodes.length) {
    updateVpRect(props.viewport)
    return
  }

  // ─ 绘制连线 ─
  // 不做步长跳跃，直接全画，Canvas 性能非常高
  const nodeMap = new Map<string, Node>()
  for (let i = 0; i < nodes.length; i++) {
    nodeMap.set(nodes[i].id, nodes[i])
  }

  ctx.strokeStyle = '#d1d5db'
  ctx.lineWidth = 0.5
  ctx.globalAlpha = 0.55
  ctx.beginPath()
  for (let i = 0; i < edges.length; i++) {
    const e = edges[i]
    if (e.hidden) continue
    const src = nodeMap.get(e.source)
    const tgt = nodeMap.get(e.target)
    if (!src || !tgt) continue
    ctx.moveTo(
      toMX(src.position.x + (src.width || 120) / 2),
      toMY(src.position.y + (src.height || 50) / 2)
    )
    ctx.lineTo(
      toMX(tgt.position.x + (tgt.width || 120) / 2),
      toMY(tgt.position.y + (tgt.height || 50) / 2)
    )
  }
  ctx.stroke()

  // ─ 绘制节点 ─
  const baseColor = props.nodeColor || '#c6d0e0'
  const selColor = '#3b82f6'

  ctx.globalAlpha = 0.85
  // 分别绘制基础节点和选中的节点（降低 fillStyle 切换开销）
  ctx.fillStyle = baseColor
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    if (n.hidden || n.selected) continue
    const nw = Math.max((n.width || 120) * _mapScale, 1.5)
    const nh = Math.max((n.height || 50) * _mapScale, 1)
    ctx.fillRect(toMX(n.position.x), toMY(n.position.y), nw, nh)
  }

  ctx.fillStyle = selColor
  for (let i = 0; i < nodes.length; i++) {
    const n = nodes[i]
    if (n.hidden || !n.selected) continue
    const nw = Math.max((n.width || 120) * _mapScale, 2)
    const nh = Math.max((n.height || 50) * _mapScale, 1.5)
    ctx.fillRect(toMX(n.position.x), toMY(n.position.y), nw, nh)
  }

  ctx.globalAlpha = 1

  // 绘制完成后，同步更新视口框
  updateVpRect(props.viewport)
}

// ── 视口框直接 DOM 更新（高频调用，0 Vue 开销） ─────────────────────────
const updateVpRect = (vp: { x: number; y: number; zoom: number }) => {
  const el = vpRectEl.value
  if (!el || !_mapScale) return

  // 视口左上角在画布坐标系
  const canvasLeft = -vp.x / vp.zoom
  const canvasTop = -vp.y / vp.zoom
  const canvasW = props.viewportSize.width / vp.zoom
  const canvasH = props.viewportSize.height / vp.zoom

  const rx = (canvasLeft - _minX) * _mapScale + _offsetX
  const ry = (canvasTop - _minY) * _mapScale + _offsetY
  const rw = Math.max(canvasW * _mapScale, 2)
  const rh = Math.max(canvasH * _mapScale, 2)

  el.setAttribute('x', String(rx))
  el.setAttribute('y', String(ry))
  el.setAttribute('width', String(rw))
  el.setAttribute('height', String(rh))
}

// ── 交互支持：点击和拖拽 ─────────────────────────
let isDragging = false

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging || !flowInstance) return

  const canvasEl = canvasRef.value
  if (!canvasEl) return
  const rect = canvasEl.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top

  // 将 Minimap 鼠标坐标转换为对应的图表坐标
  const canvasX = (mx - _offsetX) / _mapScale + _minX
  const canvasY = (my - _offsetY) / _mapScale + _minY

  const zoom = props.viewport.zoom
  // 计算平移的 x 和 y，使得点击的坐标位于屏幕居中
  const newX = props.viewportSize.width / 2 - canvasX * zoom
  const newY = props.viewportSize.height / 2 - canvasY * zoom

  flowInstance.setViewport({ x: newX, y: newY, zoom })
}

const handleMouseUp = () => {
  isDragging = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleMouseDown = (e: MouseEvent) => {
  isDragging = true
  handleMouseMove(e) // 立即跳到点击位置
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// 暴露给父组件
defineExpose({ updateViewport: updateVpRect, redraw: drawCanvas })

// ── 生命周期 ──────────────────────────────────────────────────────────────
onMounted(drawCanvas)

onBeforeUnmount(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
})

// 节点/边变化时重绘（全量重绘在大量节点时也很快）
watch(() => props.nodes, drawCanvas, { flush: 'post' })
watch(() => props.edges, drawCanvas, { flush: 'post' })

// 视口变化或屏幕尺寸变化时更新视口框
watch(
  () =>
    [
      props.viewport.x,
      props.viewport.y,
      props.viewport.zoom,
      props.viewportSize.width,
      props.viewportSize.height
    ] as const,
  ([x, y, zoom]) => updateVpRect({ x, y, zoom }),
  { flush: 'sync' }
)
</script>

<style scoped>
.yh-flow-minimap {
  position: absolute;
  right: 14px;
  bottom: 14px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  /* 开启交互 */
  pointer-events: auto;
  z-index: 10;
  cursor: crosshair;
}

.yh-flow-minimap__canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
}

.yh-flow-minimap__vp {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.yh-flow-minimap__rect {
  transition: all 0.05s linear;
}
</style>
