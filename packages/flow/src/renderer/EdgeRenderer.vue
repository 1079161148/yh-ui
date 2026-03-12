<template>
  <svg class="yh-flow-edges">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#b1b1b7" />
      </marker>
      <marker
        id="arrowhead-selected"
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
      <marker
        id="arrowhead-animated"
        markerWidth="10"
        markerHeight="7"
        refX="9"
        refY="3.5"
        orient="auto"
      >
        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
      </marker>
      <!-- Gradient for animated edges -->
      <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#b1b1b7" />
        <stop offset="50%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#b1b1b7" />
      </linearGradient>
    </defs>
    <g v-for="edge in visibleEdges" :key="edge.id">
      <path
        :d="getEdgePath(edge)"
        :stroke="edge.style?.stroke || '#b1b1b7'"
        :stroke-width="edge.style?.strokeWidth || 2"
        :stroke-dasharray="edge.style?.strokeDasharray"
        :marker-end="getMarkerEnd(edge)"
        :class="getEdgeClass(edge)"
        @click="handleEdgeClick($event, edge)"
        @dblclick="handleEdgeDblClick($event, edge)"
        @contextmenu="handleEdgeContextMenu($event, edge)"
      />
      <!-- Edge label with position support -->
      <text
        v-if="edge.label"
        :x="getEdgeLabelPosition(edge).x"
        :y="getEdgeLabelPosition(edge).y"
        class="edge-label"
        :class="{ 'edge-label-selected': edge.selected }"
        :style="getEdgeLabelStyle(edge)"
      >
        {{ edge.label }}
      </text>
    </g>
    <!-- 拖拽中的连线 -->
    <path
      v-if="connectingEdge"
      :d="connectingEdge.path"
      stroke="#3b82f6"
      stroke-width="2"
      stroke-dasharray="5,5"
      fill="none"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Edge, Node, Position } from '../types'
import { getEdgePath as getPath, getEdgeCenter } from '../utils/edge'

const props = defineProps<{
  edges: Edge[]
  nodes: Node[]
  transform: { x: number; y: number; zoom: number }
  connectingEdge?: { path: string } | null
}>()

const emit = defineEmits<{
  (e: 'edgeClick', event: MouseEvent, edge: Edge): void
  (e: 'edgeDblClick', event: MouseEvent, edge: Edge): void
  (e: 'edgeContextMenu', event: MouseEvent, edge: Edge): void
}>()

const visibleEdges = computed(() => {
  return props.edges.filter((e) => !e.hidden)
})

const nodeMap = computed(() => {
  const map = new Map<string, Node>()
  for (const n of props.nodes) map.set(n.id, n)
  return map
})

const getSourceNode = (edge: Edge) => {
  return nodeMap.value.get(edge.source)
}

const getTargetNode = (edge: Edge) => {
  return nodeMap.value.get(edge.target)
}

const getHandlePosition = (
  node: Node | undefined,
  handleType: 'source' | 'target',
  handleId?: string
): { x: number; y: number; position: Position } => {
  if (!node) return { x: 0, y: 0, position: 'right' }

  const width = node.width || 200
  const height = node.height || 50

  // 如果有指定的 handle ID，需要从 handleBounds 中查找
  if (handleId && node.handleBounds) {
    const handles = node.handleBounds[handleType === 'source' ? 'right' : 'left']
    const handle = handles?.find((h) => h.id === handleId)
    if (handle) {
      const pos = handle.position
      return {
        x:
          pos === 'left'
            ? node.position.x
            : pos === 'right'
              ? node.position.x + width
              : node.position.x + width / 2,
        y:
          pos === 'top'
            ? node.position.y
            : pos === 'bottom'
              ? node.position.y + height
              : node.position.y + height / 2,
        position: pos
      }
    }
  }

  // 默认 handle 位置
  return {
    x: handleType === 'source' ? node.position.x + width : node.position.x,
    y:
      handleType === 'source' || handleType === 'target'
        ? node.position.y + height / 2
        : node.position.y,
    position: handleType === 'source' ? 'right' : 'left'
  }
}

const getEdgePath = (edge: Edge): string => {
  const sourceNode = getSourceNode(edge)
  const targetNode = getTargetNode(edge)

  if (!sourceNode || !targetNode) return ''

  const source = getHandlePosition(sourceNode, 'source', edge.sourceHandle || undefined)
  const target = getHandlePosition(targetNode, 'target', edge.targetHandle || undefined)

  // 应用变换
  const sx = source.x * props.transform.zoom + props.transform.x
  const sy = source.y * props.transform.zoom + props.transform.y
  const tx = target.x * props.transform.zoom + props.transform.x
  const ty = target.y * props.transform.zoom + props.transform.y

  return getPath(edge.type || 'bezier', {
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: source.position,
    targetPosition: target.position
  })
}

const getMarkerEnd = (edge: Edge): string => {
  if (edge.selected) {
    return 'url(#arrowhead-selected)'
  }
  return 'url(#arrowhead)'
}

const getEdgeClass = (edge: Edge): Record<string, boolean> => {
  return {
    'is-selected': edge.selected || false,
    'is-animated': edge.animated || false,
    'animation-dash': edge.animated && edge.animationType === 'dash',
    'animation-dot': edge.animated && edge.animationType === 'dot',
    'animation-taper': edge.animated && edge.animationType === 'taper'
  }
}

const getEdgeLabelPosition = (edge: Edge) => {
  const center = getEdgeCenterPoint(edge)
  // 支持自定义标签位置偏移
  const labelX = edge.labelStyle?.labelX as number
  const labelY = edge.labelStyle?.labelY as number

  return {
    x: labelX !== undefined ? center.x + labelX : center.x,
    y: labelY !== undefined ? center.y + labelY : center.y
  }
}

const getEdgeLabelStyle = (edge: Edge) => {
  const style: Record<string, string> = {}

  if (edge.labelStyle) {
    if (edge.labelStyle.fill) style.fill = edge.labelStyle.fill as string
    if (edge.labelStyle.fontSize) style.fontSize = `${edge.labelStyle.fontSize}px`
    if (edge.labelStyle.fontWeight) style.fontWeight = String(edge.labelStyle.fontWeight)
  }

  if (edge.labelShowBg) {
    style.backgroundColor = edge.labelBgColor || '#fff'
    style.padding = edge.labelBgPadding
      ? `${edge.labelBgPadding[0]}px ${edge.labelBgPadding[1]}px`
      : '2px 6px'
    style.borderRadius = edge.labelBgBorderRadius ? `${edge.labelBgBorderRadius}px` : '4px'
  }

  return style
}

const getEdgeCenterPoint = (edge: Edge) => {
  const sourceNode = getSourceNode(edge)
  const targetNode = getTargetNode(edge)

  if (!sourceNode || !targetNode) return { x: 0, y: 0 }

  const source = getHandlePosition(sourceNode, 'source')
  const target = getHandlePosition(targetNode, 'target')

  const sx = source.x * props.transform.zoom + props.transform.x
  const sy = source.y * props.transform.zoom + props.transform.y
  const tx = target.x * props.transform.zoom + props.transform.x
  const ty = target.y * props.transform.zoom + props.transform.y

  const center = getEdgeCenter({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
    sourcePosition: source.position,
    targetPosition: target.position
  })

  return { x: center.x, y: center.y }
}

const handleEdgeClick = (event: MouseEvent, edge: Edge) => {
  emit('edgeClick', event, edge)
}

const handleEdgeDblClick = (event: MouseEvent, edge: Edge) => {
  emit('edgeDblClick', event, edge)
}

const handleEdgeContextMenu = (event: MouseEvent, edge: Edge) => {
  emit('edgeContextMenu', event, edge)
}
</script>

<style scoped>
.yh-flow-edges {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.yh-flow-edges path {
  pointer-events: stroke;
  cursor: pointer;
}

.yh-flow-edges path.is-selected {
  stroke: #3b82f6;
}

.yh-flow-edges path.is-animated {
  stroke-dasharray: 5;
  animation: dash 0.5s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}

.edge-label {
  font-size: 12px;
  fill: #374151;
  text-anchor: middle;
  pointer-events: none;
  user-select: none;
}

.edge-label-selected {
  font-weight: 600;
}

.edge-label[style*='backgroundColor'] {
  paint-order: stroke fill;
  stroke: #fff;
  stroke-width: 3px;
}

/* Edge animations */
.yh-flow-edges path.is-animated {
  stroke-dasharray: 5;
  animation: dash 0.5s linear infinite;
}

.yh-flow-edges path.is-animated.animation-dash {
  stroke-dasharray: 8 4;
  animation: dash 0.6s linear infinite;
}

.yh-flow-edges path.is-animated.animation-dot {
  stroke-dasharray: 1 6;
  stroke-linecap: round;
  animation: dash 0.8s linear infinite;
}

.yh-flow-edges path.is-animated.animation-taper {
  stroke-dasharray: 0 10;
  animation: dash-taper 1s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}

@keyframes dash-taper {
  0% {
    stroke-dasharray: 0 10;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 5 5;
    stroke-dashoffset: -5;
  }
  100% {
    stroke-dasharray: 10 0;
    stroke-dashoffset: -10;
  }
}
</style>
