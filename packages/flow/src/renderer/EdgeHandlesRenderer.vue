<template>
  <svg
    class="yh-flow-edge-handles"
    style="
      overflow: visible;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10;
    "
  >
    <g v-for="ed in selectedUpdatableEdges" :key="ed.edge.id">
      <!-- Source Handle with interaction overlay -->
      <g
        v-if="ed.edge.updatable === true || ed.edge.updatable === 'source'"
        class="yh-flow-edge-handle-group"
        style="cursor: crosshair; pointer-events: auto"
        @mousedown.stop="emit('edge-update-start', $event, ed.edge, 'source')"
      >
        <circle :cx="ed.sourceX" :cy="ed.sourceY" r="10" fill="transparent" />
        <circle :cx="ed.sourceX" :cy="ed.sourceY" r="4" fill="#3b82f6" />
      </g>
      <!-- Target Handle with interaction overlay -->
      <g
        v-if="ed.edge.updatable === true || ed.edge.updatable === 'target'"
        class="yh-flow-edge-handle-group"
        style="cursor: crosshair; pointer-events: auto"
        @mousedown.stop="emit('edge-update-start', $event, ed.edge, 'target')"
      >
        <circle :cx="ed.targetX" :cy="ed.targetY" r="10" fill="transparent" />
        <circle :cx="ed.targetX" :cy="ed.targetY" r="4" fill="#1a192b" />
      </g>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Edge, Node, HandleType, Position } from '../types'
import { getHandlePosition } from '../utils/edge'

const props = defineProps<{
  edges: Edge[]
  nodes: Node[]
}>()

const emit = defineEmits<{
  (e: 'edge-update-start', event: MouseEvent, edge: Edge, handleType: HandleType): void
}>()

const nodeMap = computed(() => {
  const m = new Map<string, Node>()
  props.nodes.forEach((n) => m.set(n.id, n))
  return m
})

const selectedUpdatableEdges = computed(() => {
  const result = []
  for (const edge of props.edges) {
    if (edge.selected && edge.updatable) {
      const sourceNode = nodeMap.value.get(edge.source)
      const targetNode = nodeMap.value.get(edge.target)
      if (!sourceNode || !targetNode) continue

      const sPosDesc = (edge.sourceHandle || 'right') as Position
      const tPosDesc = (edge.targetHandle || 'left') as Position

      const sPos = getHandlePosition(sourceNode, sPosDesc, edge.sourceHandle)
      const tPos = getHandlePosition(targetNode, tPosDesc, edge.targetHandle)

      result.push({
        edge,
        sourceX: sPos.x,
        sourceY: sPos.y,
        targetX: tPos.x,
        targetY: tPos.y
      })
    }
  }
  return result
})
</script>
