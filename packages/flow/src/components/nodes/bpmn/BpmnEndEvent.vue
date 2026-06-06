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
  label: '结束'
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '3px solid #ff4d4f',
    backgroundColor: '#fff2f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '4px solid #ff4d4f'
    base.boxShadow = '0 0 8px rgba(255, 77, 79, 0.5)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['bpmn-end-event', { selected, dragging }]" :style="nodeStyle">
    <span class="bpmn-end-event-label">{{ label || data?.label || '结束' }}</span>
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-target"
      data-handle-type="target"
      data-handle-position="left"
    />
  </div>
</template>

<style scoped>
.bpmn-end-event {
  position: relative;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
  color: #cf1322;
}

.bpmn-end-event.dragging {
  cursor: grabbing;
  z-index: 100;
}

.bpmn-end-event-label {
  max-width: 32px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bpmn-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #ff4d4f;
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
</style>
