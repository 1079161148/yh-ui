<template>
  <div class="yh-flow-minimap" :style="minimapStyle">
    <svg :width="width" :height="height" :viewBox="viewBox">
      <!-- 节点 -->
      <rect
        v-for="node in nodes"
        :key="node.id"
        :x="(node.position.x - offset.x) * scale"
        :y="(node.position.y - offset.y) * scale"
        :width="(node.width || 200) * scale"
        :height="(node.height || 50) * scale"
        :fill="node.selected ? '#3b82f6' : nodeColor"
        :opacity="0.6"
        rx="2"
      />
      <!-- 连线 -->
      <line
        v-for="edge in edges"
        :key="edge.id"
        :x1="getEdgeX1(edge)"
        :y1="getEdgeY1(edge)"
        :x2="getEdgeX2(edge)"
        :y2="getEdgeY2(edge)"
        stroke="#9ca3af"
        :stroke-width="1 * scale"
        opacity="0.5"
      />
      <!-- 视口框 -->
      <rect
        :x="-offset.x * scale"
        :y="-offset.y * scale"
        :width="viewportWidth * scale"
        :height="viewportHeight * scale"
        fill="rgba(59, 130, 246, 0.1)"
        stroke="#3b82f6"
        stroke-width="2"
        rx="2"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Node, Edge } from '../types'

const props = defineProps<{
  nodes: Node[]
  edges: Edge[]
  viewport: { x: number; y: number; zoom: number }
  viewportSize: { width: number; height: number }
  nodeColor?: string
  width?: number
  height?: number
}>()

const width = computed(() => props.width || 200)
const height = computed(() => props.height || 150)
const scale = computed(() => 0.1)

const offset = computed(() => ({
  x: props.viewport.x,
  y: props.viewport.y
}))

const viewBox = computed(() => `0 0 ${width.value} ${height.value}`)

const viewportWidth = computed(() => props.viewportSize.width / props.viewport.zoom)
const viewportHeight = computed(() => props.viewportSize.height / props.viewport.zoom)

const getEdgeX1 = (edge: Edge) => {
  const source = props.nodes.find((n) => n.id === edge.source)
  if (!source) return 0
  return (source.position.x - offset.value.x) * scale.value
}

const getEdgeY1 = (edge: Edge) => {
  const source = props.nodes.find((n) => n.id === edge.source)
  if (!source) return 0
  const h = source.height || 50
  return (source.position.y + h / 2 - offset.value.y) * scale.value
}

const getEdgeX2 = (edge: Edge) => {
  const target = props.nodes.find((n) => n.id === edge.target)
  if (!target) return 0
  const w = target.width || 200
  return (target.position.x + w - offset.value.x) * scale.value
}

const getEdgeY2 = (edge: Edge) => {
  const target = props.nodes.find((n) => n.id === edge.target)
  if (!target) return 0
  const h = target.height || 50
  return (target.position.y + h / 2 - offset.value.y) * scale.value
}

const minimapStyle = computed(() => ({
  width: `${width.value}px`,
  height: `${height.value}px`
}))
</script>

<style scoped>
.yh-flow-minimap {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.yh-flow-minimap svg {
  display: block;
}
</style>
