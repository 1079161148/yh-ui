<template>
  <svg
    class="yh-flow-edges"
    style="
      overflow: visible;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    "
  >
    <defs>
      <!-- 保留 defs 以防外部传入依赖此 id 的 marker，但默认情况不渲染 -->
      <marker
        id="yh-arrow-default"
        markerWidth="6"
        markerHeight="4"
        refX="6"
        refY="2"
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path d="M 0 0 L 6 2 L 0 4 Z" fill="#b1b1b7" />
      </marker>
      <marker
        id="yh-arrow-selected"
        markerWidth="6"
        markerHeight="4"
        refX="6"
        refY="2"
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path d="M 0 0 L 6 2 L 0 4 Z" fill="#3b82f6" />
      </marker>
      <marker
        id="yh-arrow-animated"
        markerWidth="6"
        markerHeight="4"
        refX="6"
        refY="2"
        orient="auto"
        markerUnits="userSpaceOnUse"
      >
        <path d="M 0 0 L 6 2 L 0 4 Z" fill="#3b82f6" />
      </marker>
    </defs>

    <!-- ★ 使用预计算的 edgeData，每条边路径只计算一次 -->
    <g
      v-for="ed in edgeData"
      :key="ed.edge.id"
      class="yh-flow-edge-group"
      :data-edge-id="ed.edge.id"
    >
      <slot
        name="edge"
        :edge="ed.edge"
        :path="ed.path"
        :label-x="ed.labelX"
        :label-y="ed.labelY"
        :source-x="ed.sourceX"
        :source-y="ed.sourceY"
        :target-x="ed.targetX"
        :target-y="ed.targetY"
      >
        <!-- 宽透明交互区域 -->
        <path
          :d="ed.path"
          stroke="transparent"
          stroke-width="10"
          fill="none"
          style="cursor: pointer"
          @click.stop="handleEdgeClick($event, ed.edge)"
          @dblclick.stop="handleEdgeDblClick($event, ed.edge)"
          @contextmenu.stop.prevent="handleEdgeContextMenu($event, ed.edge)"
        />
        <!-- 实际可见路径 -->
        <path
          :d="ed.path"
          :stroke="ed.stroke"
          :stroke-width="ed.edge.style?.strokeWidth ?? 1.5"
          :stroke-dasharray="
            ed.edge.animated ? '6 3' : (ed.edge.style?.strokeDasharray ?? undefined)
          "
          :marker-end="ed.markerEnd"
          :class="ed.cls"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          @click.stop="handleEdgeClick($event, ed.edge)"
          @dblclick.stop="handleEdgeDblClick($event, ed.edge)"
          @contextmenu.stop.prevent="handleEdgeContextMenu($event, ed.edge)"
        />
        <!-- 动画流光点 -->
        <circle v-if="ed.edge.animated" r="3" :fill="ed.stroke" class="yh-flow-edge-dot">
          <animateMotion
            :dur="`${1.5 / (ed.edge.style?.strokeWidth ?? 2)}s`"
            repeatCount="indefinite"
            :path="ed.path"
          />
        </circle>
        <!-- 边标签 -->
        <g
          v-if="ed.edge.label"
          class="yh-flow-edge-label"
          :class="{ 'is-bg': ed.edge.labelShowBg }"
        >
          <rect
            v-if="ed.edge.labelShowBg !== false"
            :x="ed.labelX - ed.labelW / 2 - 4"
            :y="ed.labelY - 24"
            :width="ed.labelW + 8"
            height="20"
            :rx="3"
            :fill="ed.edge.labelBgColor ?? '#fff'"
            opacity="0.9"
          />
          <text
            :x="ed.labelX"
            :y="ed.labelY - 14"
            text-anchor="middle"
            dominant-baseline="middle"
            :fill="(ed.edge.labelStyle?.fill as string) ?? '#374151'"
            :font-size="ed.edge.labelStyle?.fontSize ?? 12"
            :class="{ 'is-selected': ed.edge.selected }"
          >
            {{ ed.edge.label }}
          </text>
        </g>

        <!-- Edge Updater Handles (visible when edge is selected and updatable) -->
        <g
          v-if="ed.cls['is-selected'] && ed.edge.updatable !== false"
          class="yh-flow-edge-updaters"
        >
          <circle
            class="yh-flow-edge-updater source"
            :cx="ed.sourceX"
            :cy="ed.sourceY"
            r="4"
            @mousedown.stop="handleEdgeUpdateStart($event, ed.edge, 'source')"
          />
          <circle
            class="yh-flow-edge-updater target"
            :cx="ed.targetX"
            :cy="ed.targetY"
            r="4"
            @mousedown.stop="handleEdgeUpdateStart($event, ed.edge, 'target')"
          />
        </g>
      </slot>
    </g>

    <!-- 正在拖拽的连接线 -->
    <g v-if="connectingEdge">
      <path
        :d="connectingEdge.path"
        stroke="#3b82f6"
        stroke-width="2"
        fill="none"
        stroke-dasharray="6 3"
        opacity="0.8"
      />
      <circle :cx="connectingEdge.tx" :cy="connectingEdge.ty" r="4" fill="#3b82f6" opacity="0.5" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Edge, Node, Position, HandleType, NodeHandle } from '../types'
import { getEdgePath, getEdgeCenter } from '../utils/edge'

const props = defineProps<{
  edges: Edge[]
  nodes: Node[]
  transform?: { x: number; y: number; zoom: number }
  connectingEdge?: { path: string; tx: number; ty: number } | null
}>()

const emit = defineEmits<{
  (e: 'edgeClick', event: MouseEvent, edge: Edge): void
  (e: 'edgeDblClick', event: MouseEvent, edge: Edge): void
  (e: 'edgeContextMenu', event: MouseEvent, edge: Edge): void
  (e: 'edgeUpdateStart', event: MouseEvent, edge: Edge, handleType: HandleType): void
}>()

// ★ 节点 Map：O(1) 查找，避免每条边都遍历
const nodeMap = computed<Map<string, Node>>(() => {
  const m = new Map<string, Node>()
  props.nodes.forEach((n) => m.set(n.id, n))
  return m
})

const gatherHandles = (node: Node, type: HandleType): NodeHandle[] => {
  if (node.handleBounds) {
    const all: NodeHandle[] = []
    if (node.handleBounds.top) all.push(...node.handleBounds.top)
    if (node.handleBounds.right) all.push(...node.handleBounds.right)
    if (node.handleBounds.bottom) all.push(...node.handleBounds.bottom)
    if (node.handleBounds.left) all.push(...node.handleBounds.left)
    return all.filter((h) => h.type === type)
  }
  return []
}

const posToCoord = (node: Node, pos: Position): { x: number; y: number } => {
  const w = node.width ?? 200
  const h = node.height ?? 50
  switch (pos) {
    case 'left':
      return { x: node.position.x, y: node.position.y + h / 2 }
    case 'right':
      return { x: node.position.x + w, y: node.position.y + h / 2 }
    case 'top':
      return { x: node.position.x + w / 2, y: node.position.y }
    case 'bottom':
      return { x: node.position.x + w / 2, y: node.position.y + h }
  }
}

const getDefaultHandles = (node: Node, type: HandleType): NodeHandle[] => {
  if (node.type === 'input') return type === 'source' ? [{ type: 'source', position: 'right' }] : []
  if (node.type === 'output') return type === 'target' ? [{ type: 'target', position: 'left' }] : []
  if (type === 'source')
    return [
      { type: 'source', position: 'right' },
      { type: 'source', position: 'bottom' }
    ]
  return [
    { type: 'target', position: 'left' },
    { type: 'target', position: 'top' }
  ]
}

const getNodeHandles = (node: Node, type: HandleType): NodeHandle[] => {
  const fromBounds = gatherHandles(node, type)
  return fromBounds.length > 0 ? fromBounds : getDefaultHandles(node, type)
}

const resolveHandleCoord = (
  node: Node,
  type: HandleType,
  handleId?: string | null,
  otherPos?: { x: number; y: number }
): { x: number; y: number; position: Position } => {
  const handles = getNodeHandles(node, type)

  if (handleId) {
    const h = handles.find((hh) => hh.id === handleId)
    if (h) return { ...posToCoord(node, h.position), position: h.position }
  }

  if (handles.length === 0) {
    const pos: Position = type === 'source' ? 'right' : 'left'
    return { ...posToCoord(node, pos), position: pos }
  }

  if (otherPos) {
    let minDist = Infinity
    let best = handles[0]
    for (const h of handles) {
      const c = posToCoord(node, h.position)
      const d = (c.x - otherPos.x) ** 2 + (c.y - otherPos.y) ** 2 // 不开方，只比较
      if (d < minDist) {
        minDist = d
        best = h
      }
    }
    return { ...posToCoord(node, best.position), position: best.position }
  }

  return { ...posToCoord(node, handles[0].position), position: handles[0].position }
}

interface EdgeData {
  edge: Edge
  path: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  labelX: number
  labelY: number
  labelW: number
  stroke: string
  markerEnd: string
  cls: Record<string, boolean>
}

// ★ 核心优化：所有边数据在一个 computed 中计算，每条边路径只算一次
const edgeData = computed<EdgeData[]>(() => {
  const map = nodeMap.value
  return props.edges
    .filter((edge) => !edge.hidden)
    .map((edge) => {
      const sourceNode = map.get(edge.source)
      const targetNode = map.get(edge.target)

      if (!sourceNode || !targetNode) {
        return {
          edge,
          path: '',
          sourceX: 0,
          sourceY: 0,
          targetX: 0,
          targetY: 0,
          labelX: 0,
          labelY: 0,
          labelW: 0,
          stroke: '#b1b1b7',
          markerEnd: 'url(#yh-arrow-default)',
          cls: {
            'yh-flow-edge': true,
            'is-selected': false,
            'is-animated': false,
            'is-updatable': false
          }
        }
      }

      const target = resolveHandleCoord(
        targetNode,
        'target',
        edge.targetHandle,
        posToCoord(sourceNode, 'right')
      )
      const source = resolveHandleCoord(sourceNode, 'source', edge.sourceHandle, target)

      const path = getEdgePath(edge.type ?? 'bezier', {
        sourceX: source.x,
        sourceY: source.y,
        targetX: target.x,
        targetY: target.y,
        sourcePosition: source.position,
        targetPosition: target.position
      })

      const labelCenter = getEdgeCenter({
        sourceX: source.x,
        sourceY: source.y,
        targetX: target.x,
        targetY: target.y,
        sourcePosition: source.position,
        targetPosition: target.position
      })

      // 粗估标签宽度
      const labelW = String(edge.label ?? '').length * 7

      const stroke = edge.selected
        ? '#3b82f6'
        : edge.animated
          ? (edge.style?.stroke ?? '#3b82f6')
          : (edge.style?.stroke ?? '#b1b1b7')

      const markerEndRaw = edge.markerEnd === 'none' ? '' : edge.markerEnd ? edge.markerEnd : '' // 移除了繁重的默认 markerEnd 箭头，需要的话通过属性传 "url(#yh-arrow-default)"

      const markerEnd = typeof markerEndRaw === 'string' ? markerEndRaw : ''

      // 强制坐标有效性
      const lx = typeof labelCenter.x === 'number' && !isNaN(labelCenter.x) ? labelCenter.x : 0
      const ly = typeof labelCenter.y === 'number' && !isNaN(labelCenter.y) ? labelCenter.y : 0

      return {
        edge,
        path,
        sourceX: source.x,
        sourceY: source.y,
        targetX: target.x,
        targetY: target.y,
        labelX: lx,
        labelY: ly,
        labelW,
        stroke,
        markerEnd,
        cls: {
          'yh-flow-edge': true,
          'is-selected': !!edge.selected,
          'is-animated': !!edge.animated,
          'is-updatable': edge.updatable !== false
        }
      }
    })
})

const handleEdgeClick = (event: MouseEvent, edge: Edge) => emit('edgeClick', event, edge)
const handleEdgeDblClick = (event: MouseEvent, edge: Edge) => emit('edgeDblClick', event, edge)
const handleEdgeContextMenu = (event: MouseEvent, edge: Edge) =>
  emit('edgeContextMenu', event, edge)
const handleEdgeUpdateStart = (event: MouseEvent, edge: Edge, handleType: HandleType) => {
  event.stopPropagation()
  emit('edgeUpdateStart', event, edge, handleType)
}
</script>

<style scoped>
.yh-flow-edge-group > * {
  pointer-events: auto;
}

.yh-flow-edge {
  cursor: pointer;
  transition:
    stroke 0.15s,
    stroke-width 0.15s;
  pointer-events: stroke;
}

.yh-flow-edge:hover {
  stroke-width: 3 !important;
}

.yh-flow-edge.is-selected {
  stroke: #3b82f6;
}

.yh-flow-edge-dot {
  pointer-events: none;
}

.yh-flow-edge-updater {
  fill: #fff;
  stroke: #3b82f6;
  stroke-width: 2px;
  cursor: crosshair;
  transition:
    r 0.15s,
    fill 0.15s;
}

.yh-flow-edge-updater:hover {
  r: 6;
  fill: #3b82f6;
}

.yh-flow-edge-label text {
  font-size: 12px;
  pointer-events: none;
  user-select: none;
}

.yh-flow-edge-label text.is-selected {
  fill: #3b82f6;
}
</style>
