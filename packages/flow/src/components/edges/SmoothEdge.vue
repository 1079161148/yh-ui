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

const centerX = computed(() => (props.sourceX + props.targetX) / 2)
const centerY = computed(() => (props.sourceY + props.targetY) / 2)

const path = computed(() => {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props
  const deltaX = Math.abs(targetX - sourceX) * 0.5
  const deltaY = Math.abs(targetY - sourceY) * 0.5

  let cp1x = sourceX,
    cp1y = sourceY,
    cp2x = targetX,
    cp2y = targetY

  if (sourcePosition === 'right') cp1x += deltaX
  else if (sourcePosition === 'left') cp1x -= deltaX
  else if (sourcePosition === 'bottom') cp1y += deltaY
  else if (sourcePosition === 'top') cp1y -= deltaY

  if (targetPosition === 'right') cp2x += deltaX
  else if (targetPosition === 'left') cp2x -= deltaX
  else if (targetPosition === 'bottom') cp2y += deltaY
  else if (targetPosition === 'top') cp2y -= deltaY

  return `M ${sourceX} ${sourceY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`
})

const pathStyle = computed(() => ({
  ...props.style,
  strokeDasharray: props.animated ? '5,5' : undefined,
  animation: props.animated ? 'dash 0.5s linear infinite' : undefined
}))
</script>

<template>
  <g :class="['flow-smooth-edge', { selected, animated }]">
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
}

@keyframes dash {
  to {
    stroke-dashoffset: -10;
  }
}
</style>
