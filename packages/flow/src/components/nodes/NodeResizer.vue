<template>
  <div v-if="isVisible" class="yh-flow-node-resizer" @mousedown.stop @click.stop>
    <div
      v-for="handle in handles"
      :key="handle"
      class="resizer-handle"
      :class="`handle-${handle}`"
      @mousedown.stop="onResizeStart($event, handle)"
      @click.stop
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFlowContext } from '../../core/FlowContext'

const props = defineProps<{
  nodeId: string
  selected?: boolean
  minWidth?: number
  minHeight?: number
  keepAspectRatio?: boolean
}>()

const flow = useFlowContext()

const emit = defineEmits<{
  (e: 'resize', data: { width: number; height: number; x?: number; y?: number }): void
  (e: 'resizeStart', event: MouseEvent): void
  (e: 'resizeEnd', event: MouseEvent): void
}>()

const isVisible = computed(() => props.selected)

const handles = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

let startX = 0
let startY = 0
let lastX = 0
let lastY = 0
let startWidth = 0
let startHeight = 0
let currentHandle = ''

const onResizeStart = (event: MouseEvent, handle: string) => {
  event.preventDefault()

  startX = event.clientX
  startY = event.clientY
  lastX = event.clientX
  lastY = event.clientY
  currentHandle = handle

  // Get current node element to find its dimensions
  const nodeEl = document.getElementById(`node-${props.nodeId}`)
  if (!nodeEl) return

  startWidth = nodeEl.offsetWidth
  startHeight = nodeEl.offsetHeight

  emit('resizeStart', event)

  document.addEventListener('mousemove', onResizing)
  document.addEventListener('mouseup', onResizeEnd)
}

const onResizing = (event: MouseEvent) => {
  const zoom = flow.viewport.value.zoom || 1

  // Total delta since start - used for width/height to avoid drift
  const totalDX = (event.clientX - startX) / zoom
  const totalDY = (event.clientY - startY) / zoom

  // Incremental delta since last frame - used for position changes (x/y)
  const incrementalDX = (event.clientX - lastX) / zoom
  const incrementalDY = (event.clientY - lastY) / zoom

  lastX = event.clientX
  lastY = event.clientY

  let newWidth = startWidth
  let newHeight = startHeight
  let deltaX = 0
  let deltaY = 0

  if (currentHandle.includes('e')) {
    newWidth = startWidth + totalDX
  }
  if (currentHandle.includes('w')) {
    newWidth = startWidth - totalDX
    deltaX = incrementalDX
  }
  if (currentHandle.includes('s')) {
    newHeight = startHeight + totalDY
  }
  if (currentHandle.includes('n')) {
    newHeight = startHeight - totalDY
    deltaY = incrementalDY
  }

  // MIN Constraints
  newWidth = Math.max(newWidth, props.minWidth || 50)
  newHeight = Math.max(newHeight, props.minHeight || 30)

  emit('resize', { width: newWidth, height: newHeight, x: deltaX, y: deltaY })
}

const onResizeEnd = (event: MouseEvent) => {
  emit('resizeEnd', event)
  document.removeEventListener('mousemove', onResizing)
  document.removeEventListener('mouseup', onResizeEnd)
}
</script>

<style scoped>
.yh-flow-node-resizer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1001;
}

.resizer-handle {
  position: absolute;
  width: 16px;
  height: 16px;
  background: transparent;
  pointer-events: auto;
  z-index: 1002;
  cursor: pointer;
}

.resizer-handle::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: #3b82f6;
  border: 1px solid #fff;
  border-radius: 2px;
  top: 4px;
  left: 4px;
}

.handle-n {
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}

.handle-s {
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}

.handle-e {
  right: -8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.handle-w {
  left: -8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.handle-ne {
  top: -8px;
  right: -8px;
  cursor: nesw-resize;
}

.handle-nw {
  top: -8px;
  left: -8px;
  cursor: nwse-resize;
}

.handle-se {
  bottom: -8px;
  right: -8px;
  cursor: nwse-resize;
}

.handle-sw {
  bottom: -8px;
  left: -8px;
  cursor: nesw-resize;
}
</style>
