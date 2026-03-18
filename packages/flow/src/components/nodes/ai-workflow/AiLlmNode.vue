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
  label: 'LLM'
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    padding: '12px 16px',
    minWidth: '180px',
    borderRadius: '12px',
    border: '1px solid #8b5cf6',
    backgroundColor: '#f5f3ff',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #8b5cf6'
    base.boxShadow = '0 0 12px rgba(139, 92, 246, 0.4)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['ai-llm-node', { selected, dragging }]" :style="nodeStyle">
    <div
      v-if="connectable"
      class="ai-handle ai-handle-target"
      data-handle-type="target"
      data-handle-position="left"
    />
    <div class="ai-node-header">
      <span class="ai-node-icon">🧠</span>
      <span class="ai-node-title">{{ label || data?.label || 'LLM' }}</span>
    </div>
    <div class="ai-node-body">
      <div class="ai-node-model">{{ data?.model || 'GPT-4' }}</div>
      <div v-if="data?.status" class="ai-node-status" :class="`status-${data.status}`">
        {{
          data.status === 'running' ? '● 运行中' : data.status === 'success' ? '✓ 成功' : '○ 待运行'
        }}
      </div>
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
.ai-llm-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.ai-llm-node.dragging {
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
  color: #6d28d9;
}

.ai-node-body {
  font-size: 12px;
}

.ai-node-model {
  color: #7c3aed;
  background: #ede9fe;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
}

.ai-node-status {
  margin-top: 4px;
  font-size: 11px;
}

.status-running {
  color: #f59e0b;
}

.status-success {
  color: #10b981;
}

.status-pending {
  color: #9ca3af;
}

.ai-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #8b5cf6;
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
