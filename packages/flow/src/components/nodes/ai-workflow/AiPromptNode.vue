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
  label: '提示词'
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    padding: '12px 16px',
    minWidth: '160px',
    borderRadius: '12px',
    border: '1px solid #06b6d4',
    backgroundColor: '#ecfeff',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #06b6d4'
    base.boxShadow = '0 0 12px rgba(6, 182, 212, 0.4)'
  }
  return { ...base, ...props.style }
})
</script>

<template>
  <div :class="['ai-prompt-node', { selected, dragging }]" :style="nodeStyle">
    <div
      v-if="connectable"
      class="ai-handle ai-handle-target"
      data-handle-type="target"
      data-handle-position="left"
    />
    <div class="ai-node-header">
      <span class="ai-node-icon">💬</span>
      <span class="ai-node-title">{{ label || data?.label || '提示词' }}</span>
    </div>
    <div class="ai-node-body">
      <div class="ai-node-preview">
        {{ String(data?.prompt || '').slice(0, 30) || '点击编辑提示词...' }}...
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
.ai-prompt-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
}

.ai-prompt-node.dragging {
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
  color: #0e7490;
}

.ai-node-body {
  font-size: 11px;
  color: #155e75;
}

.ai-node-preview {
  background: #cffafe;
  padding: 4px 8px;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ai-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #06b6d4;
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
