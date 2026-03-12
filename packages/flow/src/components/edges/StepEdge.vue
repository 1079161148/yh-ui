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
  const { sourceX, sourceY, targetX, targetY } = props
  const midX = (sourceX + targetX) / 2
  return `M ${sourceX} ${sourceY} H ${midX} V ${targetY} H ${targetX}`
})

const centerX = computed(() => (props.sourceX + props.targetX) / 2)
const centerY = computed(() => (props.sourceY + props.targetY) / 2)

const pathStyle = computed(() => ({
  ...props.style,
  strokeDasharray: props.animated ? '5,5' : undefined
}))
</script>

<template>
  <g :class="['flow-step-edge', { selected, animated }]">
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
  padding: 2px 4px;
}
</style>
