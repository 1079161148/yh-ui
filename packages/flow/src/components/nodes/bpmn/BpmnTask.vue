<script setup lang="ts">
import { computed } from 'vue'
import type { Node, NodeStyle } from '../../../types'

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
  label: '任务'
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    padding: '10px 16px',
    minWidth: '100px',
    borderRadius: '4px',
    border: '1px solid #1890ff',
    backgroundColor: '#e6f7ff',
    textAlign: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #1890ff'
    base.boxShadow = '0 0 8px rgba(24, 144, 255, 0.4)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['bpmn-task', { selected, dragging }]" :style="nodeStyle">
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-target"
      data-handle-type="target"
      data-handle-position="left"
    />
    <span class="bpmn-task-label">{{ label || data?.label || '任务' }}</span>
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-source"
      data-handle-type="source"
      data-handle-position="right"
    />
  </div>
</template>

<style scoped>
.bpmn-task {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.bpmn-task.dragging {
  cursor: grabbing;
  z-index: 100;
}

.bpmn-task-label {
  font-size: 13px;
  color: #0050b3;
}

.bpmn-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #1890ff;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: crosshair;
  z-index: 20;
}

.bpmn-handle-target {
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
}

.bpmn-handle-source {
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
