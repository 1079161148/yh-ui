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
    borderRadius: '12px 4px 4px 4px',
    border: '1px solid #e6a23c',
    backgroundColor: '#fff7e6',
    minWidth: '80px',
    textAlign: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #e6a23c'
    base.boxShadow = '0 0 8px rgba(230, 162, 60, 0.4)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['flow-output-node', { selected, dragging }]" :style="nodeStyle">
    <div
      class="flow-handle-left"
      v-if="connectable"
      data-handle-type="target"
      data-handle-position="left"
    />
    <div class="flow-node-label">{{ label || data?.label || 'Output' }}</div>
  </div>
</template>

<style scoped>
.flow-output-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.flow-output-node.dragging {
  cursor: grabbing;
}

.flow-output-node .flow-handle-left {
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-color: #e6a23c;
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
