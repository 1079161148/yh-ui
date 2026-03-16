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
    </defs>
    <g
      v-for="ed in edgeData"
      :key="ed.edge.id"
      class="yh-flow-edge-group"
      :data-edge-id="ed.edge.id"
      style="pointer-events: auto"
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
        <path
          :d="ed.path"
          stroke="transparent"
          stroke-width="10"
          fill="none"
          style="cursor: pointer; pointer-events: auto"
          @click.stop="emit('edge-click', $event, ed.edge)"
          @dblclick.stop="emit('edge-dblclick', $event, ed.edge)"
          @contextmenu.stop.prevent="emit('edge-contextmenu', $event, ed.edge)"
        />
        <path
          :d="ed.path"
          :stroke="ed.stroke"
          :stroke-width="ed.edge.style?.strokeWidth ?? 1.5"
          fill="none"
          :marker-end="ed.markerEnd"
        />

        <!-- Updatable handles -->
        <circle
          v-if="ed.edge.updatable === true || ed.edge.updatable === 'source'"
          class="yh-flow-edge-handle"
          :cx="ed.sourceX"
          :cy="ed.sourceY"
          r="5"
          fill="#3b82f6"
          style="cursor: crosshair; pointer-events: auto"
          @mousedown.stop="emit('edge-update-start', $event, ed.edge, 'source')"
        />
        <circle
          v-if="ed.edge.updatable === true || ed.edge.updatable === 'target'"
          class="yh-flow-edge-handle"
          :cx="ed.targetX"
          :cy="ed.targetY"
          r="5"
          fill="#3b82f6"
          style="cursor: crosshair; pointer-events: auto"
          @mousedown.stop="emit('edge-update-start', $event, ed.edge, 'target')"
        />
      </slot>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Edge, Node, HandleType } from '../types'
import { getEdgePath, getEdgeCenter } from '../utils/edge'

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

const edgeData = computed(() => {
  const result = []
  for (const edge of props.edges) {
    if (edge.hidden) continue
    // 正在更新的连线在主渲染中隐藏
    if (props.updatingEdgeId && edge.id === props.updatingEdgeId) continue

    const sourceNode = nodeMap.value.get(edge.source)
    const targetNode = nodeMap.value.get(edge.target)
    if (!sourceNode || !targetNode) continue

    const sPos = {
      x: sourceNode.position.x + (sourceNode.width || 200) / 2,
      y: sourceNode.position.y + (sourceNode.height || 50) / 2
    }
    const tPos = {
      x: targetNode.position.x + (targetNode.width || 200) / 2,
      y: targetNode.position.y + (targetNode.height || 50) / 2
    }

    const path = getEdgePath(edge.type || 'bezier', {
      sourceX: sPos.x,
      sourceY: sPos.y,
      targetX: tPos.x,
      targetY: tPos.y,
      sourcePosition: 'right',
      targetPosition: 'left'
    })
    const center = getEdgeCenter({
      sourceX: sPos.x,
      sourceY: sPos.y,
      targetX: tPos.x,
      targetY: tPos.y,
      sourcePosition: 'right',
      targetPosition: 'left'
    })

    result.push({
      edge,
      path,
      sourceX: sPos.x,
      sourceY: sPos.y,
      targetX: tPos.x,
      targetY: tPos.y,
      labelX: center.x,
      labelY: center.y,
      stroke: edge.selected ? '#3b82f6' : '#b1b1b7',
      markerEnd: 'url(#yh-arrow-default)'
    })
  }
  return result
})
</script>
