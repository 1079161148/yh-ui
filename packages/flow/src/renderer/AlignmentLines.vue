<template>
  <svg v-if="draggingNodeId && draggingPosition" class="yh-flow-alignment-lines">
    <!-- Horizontal alignment lines -->
    <line
      v-for="(line, index) in horizontalLines"
      :key="`h-${index}`"
      :x1="0"
      :y1="line.y"
      :x2="containerWidth"
      :y2="line.y"
      class="alignment-line horizontal"
      :class="{ active: line.active }"
    />
    <!-- Vertical alignment lines -->
    <line
      v-for="(line, index) in verticalLines"
      :key="`v-${index}`"
      :x1="line.x"
      :y1="0"
      :x2="line.x"
      :y2="containerHeight"
      class="alignment-line vertical"
      :class="{ active: line.active }"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFlowContext } from '../core/FlowContext'
import { getNodeAbsolutePosition } from '../utils/custom-types'

interface AlignmentLine {
  x?: number
  y?: number
  active: boolean
}

const props = defineProps<{
  snapThreshold?: number
}>()

const flowInstance = useFlowContext()
const nodes = flowInstance.nodes
const draggingNodeId = flowInstance.draggingNodeId
const draggingPosition = flowInstance.draggingPosition

const containerWidth = computed(() => flowInstance.$el?.clientWidth || 800)
const containerHeight = computed(() => flowInstance.$el?.clientHeight || 600)
const SNAP_THRESHOLD = props.snapThreshold ?? 10

const nodeMap = computed(() => {
  return new Map(nodes.value.map((n) => [n.id, n]))
})

const horizontalLines = computed(() => {
  const dNodeId = draggingNodeId.value
  const dPos = draggingPosition.value
  if (!dNodeId || !dPos) return []

  const lines: AlignmentLine[] = []
  const draggingNode = nodes.value.find((n) => n.id === dNodeId)
  if (!draggingNode) return []

  const nodeHeight = draggingNode.measured?.height ?? draggingNode.height ?? 50
  const otherNodes = nodes.value.filter((n) => n.id !== dNodeId && !n.hidden)

  const m = nodeMap.value
  const draggingNodeAbs = getNodeAbsolutePosition(draggingNode, m)
  const positions = [
    { y: draggingNodeAbs.y, key: 'top' },
    { y: draggingNodeAbs.y + nodeHeight / 2, key: 'center' },
    { y: draggingNodeAbs.y + nodeHeight, key: 'bottom' }
  ]

  for (const pos of positions) {
    for (const node of otherNodes) {
      const nHeight = node.measured?.height ?? node.height ?? 50
      const otherAbs = getNodeAbsolutePosition(node, m)
      const nodePositions = [
        { y: otherAbs.y, key: 'top' },
        { y: otherAbs.y + nHeight / 2, key: 'center' },
        { y: otherAbs.y + nHeight, key: 'bottom' }
      ]

      for (const np of nodePositions) {
        if (Math.abs(pos.y - np.y) < SNAP_THRESHOLD) {
          lines.push({ y: np.y, active: true })
          break
        }
      }
    }
  }
  return lines
})

const verticalLines = computed(() => {
  const dNodeId = draggingNodeId.value
  const dPos = draggingPosition.value
  if (!dNodeId || !dPos) return []

  const lines: AlignmentLine[] = []
  const draggingNode = nodes.value.find((n) => n.id === dNodeId)
  if (!draggingNode) return []

  const nodeWidth = draggingNode.measured?.width ?? draggingNode.width ?? 200
  const otherNodes = nodes.value.filter((n) => n.id !== dNodeId && !n.hidden)

  const m = nodeMap.value
  const draggingNodeAbs = getNodeAbsolutePosition(draggingNode, m)
  const positions = [
    { x: draggingNodeAbs.x, key: 'left' },
    { x: draggingNodeAbs.x + nodeWidth / 2, key: 'center' },
    { x: draggingNodeAbs.x + nodeWidth, key: 'right' }
  ]

  for (const pos of positions) {
    for (const node of otherNodes) {
      const nWidth = node.measured?.width ?? node.width ?? 200
      const otherAbs = getNodeAbsolutePosition(node, m)
      const nodePositions = [
        { x: otherAbs.x, key: 'left' },
        { x: otherAbs.x + nWidth / 2, key: 'center' },
        { x: otherAbs.x + nWidth, key: 'right' }
      ]

      for (const np of nodePositions) {
        if (Math.abs(pos.x - np.x) < SNAP_THRESHOLD) {
          lines.push({ x: np.x, active: true })
          break
        }
      }
    }
  }
  return lines
})
</script>

<style scoped>
.yh-flow-alignment-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}

.alignment-line {
  stroke: var(--flow-alignment-line-color, #c0c4cc);
  stroke-width: 1;
  stroke-dasharray: 4 2;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.alignment-line.active {
  stroke: var(--flow-alignment-line-active-color, #409eff);
  opacity: 1;
}
</style>
