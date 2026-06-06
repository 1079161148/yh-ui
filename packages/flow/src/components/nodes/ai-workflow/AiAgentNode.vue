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
  label: 'Agent',
  data: () => ({})
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    padding: '12px 16px',
    minWidth: '160px',
    borderRadius: '12px',
    border: '1px solid #f97316',
    backgroundColor: '#fff7ed',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #f97316'
    base.boxShadow = '0 0 12px rgba(249, 115, 22, 0.4)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['ai-agent-node', { selected, dragging }]" :style="nodeStyle">
    <div
      v-if="connectable"
      class="ai-handle ai-handle-target"
      data-handle-type="target"
      data-handle-position="left"
    />
    <div class="ai-node-header">
      <span class="ai-node-icon">🤖</span>
      <span class="ai-node-title">{{ label || data?.label || 'Agent' }}</span>
    </div>
    <div class="ai-node-body">
      <div class="ai-node-tools">{{ (props.data?.tools as string[])?.length || 0 }} 个工具</div>
    </div>
    <div
      v-if="connectable"
      class="ai-handle ai-handle-source"
      data-handle-type="source"
      data-handle-position="right"
    />
  </div>
</template>

<style scoped>
.ai-agent-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.ai-agent-node.dragging {
  cursor: grabbing;
  z-index: 100;
}

.ai-node-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.ai-node-icon {
  font-size: 16px;
}

.ai-node-title {
  font-size: 13px;
  font-weight: 600;
  color: #c2410c;
}

.ai-node-body {
  font-size: 12px;
}

.ai-node-tools {
  color: #ea580c;
  background: #ffedd5;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
}

.ai-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #f97316;
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

.ai-handle-source {
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
