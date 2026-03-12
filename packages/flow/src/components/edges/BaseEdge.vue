<script setup lang="ts">
import { computed } from 'vue'
import type { Position, EdgeStyle } from '../../types'

interface Props {
  id: string
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
  return `M ${sourceX} ${sourceY} L ${targetX} ${targetY}`
})

const pathStyle = computed(() => ({
  ...props.style,
  strokeDasharray: props.animated ? '5,5' : undefined,
  animation: props.animated ? 'dash 0.5s linear infinite' : undefined
}))
</script>

<template>
  <g :class="['flow-base-edge', { selected, animated }]">
    <path :d="path" fill="none" :style="pathStyle" stroke-width="2" stroke="#b1b1b7" />
    <path
      v-if="label"
      :d="path"
      fill="none"
      stroke="transparent"
      stroke-width="20"
      class="flow-edge-label-path"
    />
    <foreignObject
      v-if="label"
      :x="(sourceX + targetX) / 2 - 30"
      :y="(sourceY + targetY) / 2 - 10"
      width="60"
      height="20"
    >
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
