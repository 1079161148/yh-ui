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
  expanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  dragging: false,
  connectable: false,
  expanded: true,
  style: () => ({}),
  label: ''
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    padding: '15px',
    borderRadius: '8px',
    border: '2px dashed #909399',
    backgroundColor: '#f5f7fa',
    minWidth: '200px',
    minHeight: '150px',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #409eff'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['flow-group-node', { selected, dragging, expanded }]" :style="nodeStyle">
    <div class="flow-group-header">
      <span class="flow-group-label">{{ label || data?.label || 'Group' }}</span>
    </div>
    <div class="flow-group-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.flow-group-node {
  position: relative;
  display: flex;
  flex-direction: column;
  user-select: none;
}

.flow-group-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 10px;
}

.flow-group-label {
  font-size: 12px;
  font-weight: 600;
  color: #909399;
  text-transform: uppercase;
}

.flow-group-content {
  flex: 1;
  min-height: 100px;
}
</style>
