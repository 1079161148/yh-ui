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
  label: '排他网关'
})

const nodeStyle = computed(() => {
  const size = 44
  const base: NodeStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: '2px solid #faad14',
    backgroundColor: '#fffbe6',
    transform: 'rotate(45deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '3px solid #faad14'
    base.boxShadow = '0 0 8px rgba(250, 173, 20, 0.5)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['bpmn-gateway bpmn-exclusive-gateway', { selected, dragging }]" :style="nodeStyle">
    <span class="bpmn-gateway-inner">×</span>
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-target"
      data-handle-type="target"
      data-handle-position="left"
    />
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-source"
      data-handle-type="source"
      data-handle-position="right"
    />
    <div
      v-if="connectable"
      class="bpmn-handle bpmn-handle-source-bottom"
      data-handle-type="source"
      data-handle-position="bottom"
    />
  </div>
</template>

<style scoped>
.bpmn-exclusive-gateway {
  position: relative;
  user-select: none;
  cursor: pointer;
}

.bpmn-exclusive-gateway.dragging {
  cursor: grabbing;
  z-index: 100;
}

.bpmn-gateway-inner {
  transform: rotate(-45deg);
  font-size: 20px;
  font-weight: bold;
  color: #ad8b00;
}

.bpmn-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #faad14;
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

.bpmn-handle-source-bottom {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
