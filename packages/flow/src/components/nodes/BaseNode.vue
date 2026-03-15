<script setup lang="ts">
import { computed } from 'vue'
import type { Node, NodeHandle, NodeStyle } from '../../types'

interface Props {
  id: string
  type: string
  data: Node['data']
  selected: boolean
  dragging: boolean
  connectable: boolean
  style?: NodeStyle
  handles?: NodeHandle[]
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  dragging: false,
  connectable: true,
  handles: () => [
    { type: 'source', position: 'right', isConnectable: true },
    { type: 'target', position: 'left', isConnectable: true }
  ],
  style: () => ({}),
  label: ''
})

const nodeStyle = computed(() => {
  const base: NodeStyle = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    minWidth: '100px',
    textAlign: 'center',
    transition: 'all 0.2s'
  }
  if (props.selected) {
    base.border = '2px solid #409eff'
    base.boxShadow = '0 0 8px rgba(64, 158, 255, 0.4)'
  }
  if (props.dragging) {
    base.opacity = '0.8'
    base.cursor = 'grabbing'
  }
  return { ...base, ...props.style }
})

function getHandleStyle(handle: NodeHandle) {
  const style: NodeStyle = {
    width: '12px',
    height: '12px',
    backgroundColor: '#fff',
    border: '2px solid #409eff',
    borderRadius: '50%',
    cursor: 'crosshair'
  }
  if (handle.style) {
    Object.assign(style, handle.style)
  }
  return style
}
</script>

<template>
  <div :class="['flow-base-node', { selected, dragging }]" :style="nodeStyle">
    <div class="flow-node-label">{{ label || data?.label || type }}</div>
    <div v-if="data?.description" class="flow-node-description">
      {{ data.description }}
    </div>
    <template v-for="handle in handles" :key="`${handle.type}-${handle.position}`">
      <div
        v-if="handle.isConnectable !== false && connectable"
        class="flow-handle"
        :class="[`flow-handle-${handle.type}`, `flow-handle-position-${handle.position}`]"
        :style="getHandleStyle(handle)"
        :data-handle-id="handle.id"
        :data-handle-type="handle.type"
        :data-handle-position="handle.position"
      />
    </template>
  </div>
</template>

<style scoped>
.flow-base-node {
  position: relative;
  display: inline-block;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
}

.flow-base-node.selected {
  z-index: 10;
}

.flow-base-node.dragging {
  cursor: grabbing;
  z-index: 100;
}

.flow-node-label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.flow-node-description {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.flow-handle {
  position: absolute;
  z-index: 20;
}

.flow-handle-position-top {
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
}

.flow-handle-position-right {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.flow-handle-position-bottom {
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
}

.flow-handle-position-left {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
