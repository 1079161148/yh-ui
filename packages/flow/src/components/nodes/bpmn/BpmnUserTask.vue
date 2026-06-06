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
  label: '用户任务'
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    padding: '10px 16px 10px 36px',
    minWidth: '100px',
    borderRadius: '4px',
    border: '1px solid #fa8c16',
    backgroundColor: '#fff7e6',
    textAlign: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #fa8c16'
    base.boxShadow = '0 0 8px rgba(250, 140, 22, 0.4)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['bpmn-user-task', { selected, dragging }]" :style="nodeStyle">
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-target"
      data-handle-type="target"
      data-handle-position="left"
    />
    <span class="bpmn-user-icon" aria-hidden="true">👤</span>
    <span class="bpmn-task-label">{{ label || data?.label || '用户任务' }}</span>
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-source"
      data-handle-type="source"
      data-handle-position="right"
    />
  </div>
</template>

<style scoped>
.bpmn-user-task {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.bpmn-user-task.dragging {
  cursor: grabbing;
  z-index: 100;
}

.bpmn-user-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
}

.bpmn-task-label {
  font-size: 13px;
  color: #ad6800;
}

.bpmn-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fa8c16;
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
