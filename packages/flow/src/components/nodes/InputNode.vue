<script setup lang="ts">
import { computed } from 'vue'
import type { Node, NodeStyle } from '../../types'

interface Props {
  id: string
  type: string
  data: Node['data']
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
  label: ''
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    padding: '10px 15px',
    borderRadius: '4px 4px 12px 4px',
    border: '1px solid #67c23a',
    backgroundColor: '#f0f9ff',
    minWidth: '80px',
    textAlign: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #67c23a'
    base.boxShadow = '0 0 8px rgba(103, 194, 58, 0.4)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['flow-input-node', { selected, dragging }]" :style="nodeStyle">
    <div class="flow-node-label">{{ label || data?.label || 'Input' }}</div>
    <div
      class="flow-handle-right"
      v-if="connectable"
      data-handle-type="source"
      data-handle-position="right"
    />
  </div>
</template>

<style scoped>
.flow-input-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.flow-input-node.dragging {
  cursor: grabbing;
}

.flow-input-node .flow-handle-right {
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: #67c23a;
  border-radius: 50%;
  cursor: crosshair;
  border: 2px solid #fff;
}

.flow-node-label {
  font-size: 13px;
  font-weight: 400;
  color: #000;
  font-family: 'Courier New', Courier, monospace;
}
</style>
