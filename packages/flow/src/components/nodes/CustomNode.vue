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
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #dcdfe6',
    backgroundColor: '#ffffff',
    minWidth: '120px',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #409eff'
    base.boxShadow = '0 0 8px rgba(64, 158, 255, 0.4)'
  }
  if (props.dragging) {
    base.opacity = '0.8'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['flow-custom-node', { selected, dragging }]" :style="nodeStyle">
    <slot :node="{ id, type, data, selected }" />
  </div>
</template>

<style scoped>
.flow-custom-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.flow-custom-node.selected {
  z-index: 10;
}

.flow-custom-node.dragging {
  cursor: grabbing;
  z-index: 100;
}
</style>
