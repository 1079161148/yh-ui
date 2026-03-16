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
      z-index: 5;
    "
  >
    <defs>
      <!-- Dynamic masks to create a true gap in the line behind the label -->
      <mask
        v-for="ed in edgeData"
        :key="`mask-${ed.edge.id}`"
        :id="`yh-mask-${ed.edge.id.replace(/\s/g, '')}`"
      >
        <rect x="-5000" y="-5000" width="10000" height="10000" fill="white" />
        <rect
          :x="ed.labelX - ed.labelWidth / 2 - 4"
          :y="ed.labelY - 10"
          :width="ed.labelWidth + 8"
          height="20"
          fill="black"
        />
      </mask>
    </defs>
    <g
      v-for="ed in edgeData"
      :key="ed.edge.id"
      class="yh-flow-edge-group"
      :class="{ 'is-selected': ed.edge.selected, 'is-animated': ed.edge.animated }"
      :data-edge-id="ed.edge.id"
      :style="{ color: ed.stroke, pointerEvents: 'auto', cursor: 'pointer' }"
      @click.stop="emit('edge-click', $event, ed.edge)"
      @dblclick.stop="emit('edge-dblclick', $event, ed.edge)"
      @contextmenu.stop.prevent="emit('edge-contextmenu', $event, ed.edge)"
    >
      <slot
        name="edge"
        v-bind="{
          edge: ed.edge,
          path: ed.path,
          labelX: ed.labelX,
          labelY: ed.labelY,
          sourceX: ed.sourceX,
          sourceY: ed.sourceY,
          targetX: ed.targetX,
          targetY: ed.targetY
        }"
      >
        <!-- Interaction Path (Hitbox) -->
        <path
          :d="ed.path"
          stroke="transparent"
          stroke-width="20"
          fill="none"
          style="cursor: pointer; pointer-events: all"
        />

        <!-- Visible Path -->
        <path
          :d="ed.path"
          :stroke="ed.stroke"
          :stroke-width="(ed.edge.style?.strokeWidth ?? 1.5) * (ed.edge.selected ? 1.5 : 1)"
          fill="none"
          :class="{ 'yh-flow-edge-path': true, 'is-animated': ed.edge.animated }"
          :mask="ed.edge.label ? `url(#yh-mask-${ed.edge.id.replace(/\s/g, '')})` : undefined"
          :style="{
            pointerEvents: 'none',
            transition: 'stroke 0.2s, stroke-width 0.2s',
            color: ed.stroke
          }"
        />

        <!-- Default Label -->
        <foreignObject
          v-if="ed.edge.label"
          :x="ed.labelX - 75"
          :y="ed.labelY - 15"
          width="150"
          height="30"
          style="pointer-events: auto"
        >
          <div
            style="
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            <div class="yh-flow-edge-label" :style="getLabelStyle(ed.edge)" v-html="ed.edge.label">
            </div>
          </div>
        </foreignObject>
      </slot>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Edge, Node, HandleType } from '../types'
import { getEdgePath, getEdgeCenter, getHandlePosition } from '../utils/edge'

const props = defineProps<{
  edges: Edge[]
  nodes: Node[]
  transform?: { x: number; y: number; zoom: number }
  connectingEdge?: { path: string; tx: number; ty: number } | null
  updatingEdgeId?: string | null
}>()

const emit = defineEmits<{
  (e: 'edge-click', event: MouseEvent, edge: Edge): void
  (e: 'edge-dblclick', event: MouseEvent, edge: Edge): void
  (e: 'edge-contextmenu', event: MouseEvent, edge: Edge): void
  (e: 'edge-update-start', event: MouseEvent, edge: Edge, handleType: HandleType): void
}>()

const nodeMap = computed(() => {
  const m = new Map<string, Node>()
  props.nodes.forEach((n) => m.set(n.id, n))
  return m
})

const getLabelStyle = (edge: Edge) => {
  const styles: any = {
    ...edge.labelStyle
  }

  if (edge.labelShowBg === true) {
    styles.backgroundColor = edge.labelBgColor || '#f1f5f9'
    styles.padding = '0 6px'
    styles.borderRadius = '2px'
    styles.border = '1px solid #ddd'
  } else {
    styles.backgroundColor = 'transparent'
  }
  return styles
}

const edgeData = computed(() => {
  const result = []
  for (const edge of props.edges) {
    if (edge.hidden) continue
    // 正在更新的连线在主渲染中隐藏
    if (props.updatingEdgeId && edge.id === props.updatingEdgeId) continue

    const sourceNode = nodeMap.value.get(edge.source)
    const targetNode = nodeMap.value.get(edge.target)
    if (!sourceNode || !targetNode) continue

    // 获取位置描述
    const sPosDesc = (edge.sourceHandle as any) || 'right'
    const tPosDesc = (edge.targetHandle as any) || 'left'

    const sPos = getHandlePosition(sourceNode, sPosDesc, edge.sourceHandle)
    const tPos = getHandlePosition(targetNode, tPosDesc, edge.targetHandle)

    const pathParams = {
      sourceX: sPos.x,
      sourceY: sPos.y,
      targetX: tPos.x,
      targetY: tPos.y,
      sourcePosition: sPosDesc,
      targetPosition: tPosDesc
    }

    const type = edge.type || 'bezier'
    const path = getEdgePath(type, pathParams)
    const center = getEdgeCenter({ ...pathParams, type })

    const labelText = edge.label || ''
    // Handle HTML by stripping tags for width estimation
    const strippedLabel = labelText.replace(/<[^>]*>/g, '')
    const labelWidth = Math.min(strippedLabel.length * 7, 120)

    result.push({
      edge,
      path,
      sourceX: sPos.x,
      sourceY: sPos.y,
      targetX: tPos.x,
      targetY: tPos.y,
      labelX: center.x,
      labelY: center.y,
      labelWidth,
      stroke: edge.selected ? '#3b82f6' : edge.style?.stroke || '#b1b1b7'
    })
  }
  return result
})
</script>

<style scoped>
.yh-flow-edge-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 400;
  color: #000;
  pointer-events: auto;
  white-space: nowrap;
  user-select: none;
  height: 100%;
  padding: 0 4px;
  font-family: 'Courier New', Courier, monospace;
  text-transform: uppercase;
  cursor: pointer;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.yh-flow-edge-label:hover {
  color: #3b82f6;
  font-weight: 600;
}

.yh-flow-edge-group:hover .yh-flow-edge-path {
  stroke-width: 2.5;
}

.is-animated {
  stroke-dasharray: 5;
  animation: dash 1s linear infinite;
}

@keyframes dash {
  from {
    stroke-dashoffset: 10;
  }

  to {
    stroke-dashoffset: 0;
  }
}
</style>
