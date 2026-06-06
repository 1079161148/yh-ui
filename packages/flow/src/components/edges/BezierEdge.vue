<script setup lang="ts">
import { computed } from 'vue'
import type { Position, EdgeStyle } from '../../types'

interface Props {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  sourcePosition?: Position
  targetPosition?: Position
  style?: EdgeStyle
  selected?: boolean
  animated?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  sourcePosition: 'right',
  targetPosition: 'left',
  selected: false,
  animated: false,
  style: () => ({}),
  label: ''
})

const path = computed(() => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props
  const curvature = 0.5

  let sourceControlX = sourceX
  let sourceControlY = sourceY
  let targetControlX = targetX
  let targetControlY = targetY

  const deltaX = Math.abs(targetX - sourceX) * curvature
  const deltaY = Math.abs(targetY - sourceY) * curvature

  if (sourcePosition === 'right') sourceControlX += deltaX
  else if (sourcePosition === 'left') sourceControlX -= deltaX
  else if (sourcePosition === 'bottom') sourceControlY += deltaY
  else if (sourcePosition === 'top') sourceControlY -= deltaY

  if (targetPosition === 'right') targetControlX += deltaX
  else if (targetPosition === 'left') targetControlX -= deltaX
  else if (targetPosition === 'bottom') targetControlY += deltaY
  else if (targetPosition === 'top') targetControlY -= deltaY

  return `M ${sourceX} ${sourceY} C ${sourceControlX} ${sourceControlY}, ${targetControlX} ${targetControlY}, ${targetX} ${targetY}`
})

const centerX = computed(() => (props.sourceX + props.targetX) / 2)
const centerY = computed(() => (props.sourceY + props.targetY) / 2)

const pathStyle = computed(() => ({
  ...props.style,
  strokeDasharray: props.animated ? '5,5' : undefined,
  animation: props.animated ? 'dash 0.5s linear infinite' : undefined
}))
</script>

<template>
  <g :class="['flow-bezier-edge', { selected, animated }]">
    <path :d="path" fill="none" :style="pathStyle" stroke-width="2" stroke="#b1b1b7" />
    <foreignObject v-if="label" :x="centerX - 30" :y="centerY - 10" width="60" height="20">
      <div class="flow-edge-label">{{ label }}</div>
    </foreignObject>
  </g>
</template>

<style scoped>
.flow-edge-label {
  text-align: center;
  font-size: 12px;
  color: #666;
  background: #fff;
  padding: 2px 6px;
  border-radius: 4px;
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}
</style>
