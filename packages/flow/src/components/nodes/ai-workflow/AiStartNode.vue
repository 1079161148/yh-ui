<script setup lang="ts">
import { computed } from 'vue'
import type { NodeStyle, NodeData } from '../../../types'

interface Props {
  id: string
  type: string
  data: NodeData
  selected: boolean
  dragging: boolean
  connectable: boolean
  style?: NodeStyle
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  dragging: false,
  connectable: true,
  style: () => ({}),
  label: '开始'
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '2px solid #22c55e',
    backgroundColor: '#f0fdf4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '3px solid #22c55e'
    base.boxShadow = '0 0 12px rgba(34, 197, 94, 0.5)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['ai-start-node', { selected, dragging }]" :style="nodeStyle">
    <span class="ai-start-icon">▶</span>
    <div
      v-if="connectable"
      class="ai-handle ai-handle-source"
      data-handle-type="source"
      data-handle-position="right"
    />
  </div>
</template>

<style scoped>
.ai-start-node {
  position: relative;
  user-select: none;
  cursor: pointer;
}

.ai-start-node.dragging {
  cursor: grabbing;
  z-index: 100;
}

.ai-start-icon {
  font-size: 18px;
  color: #16a34a;
}

.ai-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #22c55e;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: crosshair;
  z-index: 20;
}

.ai-handle-source {
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
