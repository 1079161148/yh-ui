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
  label: '结束'
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: '3px solid #ef4444',
    backgroundColor: '#fef2f2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '4px solid #ef4444'
    base.boxShadow = '0 0 12px rgba(239, 68, 68, 0.5)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['ai-end-node', { selected, dragging }]" :style="nodeStyle">
    <span class="ai-end-icon">■</span>
    <div
      v-if="connectable"
      class="ai-handle ai-handle-target"
      data-handle-type="target"
      data-handle-position="left"
    />
  </div>
</template>

<style scoped>
.ai-end-node {
  position: relative;
  user-select: none;
  cursor: pointer;
}

.ai-end-node.dragging {
  cursor: grabbing;
  z-index: 100;
}

.ai-end-icon {
  font-size: 16px;
  color: #dc2626;
}

.ai-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ef4444;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: crosshair;
  z-index: 20;
}

.ai-handle-target {
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
