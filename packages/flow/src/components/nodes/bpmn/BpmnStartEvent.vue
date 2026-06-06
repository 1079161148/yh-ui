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
  label: '开始'
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid #52c41a',
    backgroundColor: '#f6ffed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '3px solid #52c41a'
    base.boxShadow = '0 0 8px rgba(82, 196, 26, 0.5)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['bpmn-start-event', { selected, dragging }]" :style="nodeStyle">
    <span class="bpmn-start-event-label">{{ label || data?.label || '开始' }}</span>
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-source"
      data-handle-type="source"
      data-handle-position="right"
    />
  </div>
</template>

<style scoped>
.bpmn-start-event {
  position: relative;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
  color: #389e0d;
}

.bpmn-start-event.dragging {
  cursor: grabbing;
  z-index: 100;
}

.bpmn-start-event-label {
  max-width: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bpmn-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #52c41a;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: crosshair;
  z-index: 20;
}

.bpmn-handle-source {
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
