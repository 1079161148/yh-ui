<template>
  <div class="yh-flow-nodes">
    <div
      v-for="node in visibleNodes"
      :key="node.id"
      :id="`node-${node.id}`"
      class="yh-flow-node"
      :class="{
        'is-selected': node.selected,
        'is-dragging': node.dragging,
        'is-hidden': node.hidden,
        [`type-${node.type}`]: true
      }"
      :style="getNodeStyle(node)"
      @mousedown="handleNodeMouseDown($event, node)"
      @click="handleNodeClick($event, node)"
      @dblclick="handleNodeDblClick($event, node)"
      @contextmenu="handleNodeContextMenu($event, node)"
    >
      <!-- Handle (连接点) -->
      <template v-if="props.connectable !== false && node.connectable !== false">
        <!-- Source handles -->
        <div
          v-for="handle in getHandles(node, 'source')"
          :key="`handle-source-${handle.id || handle.position}`"
          class="yh-flow-handle is-source"
          :class="`position-${handle.position}`"
          :data-handle-id="handle.id"
          :data-handle-type="'source'"
          @mousedown.stop="handleConnectStart($event, node, handle)"
        ></div>
        <!-- Target handles -->
        <div
          v-for="handle in getHandles(node, 'target')"
          :key="`handle-target-${handle.id || handle.position}`"
          class="yh-flow-handle is-target"
          :class="`position-${handle.position}`"
          :data-handle-id="handle.id"
          :data-handle-type="'target'"
          @mousedown.stop="handleConnectStart($event, node, handle)"
        ></div>
      </template>
      <!-- 节点内容 -->
      <div class="yh-flow-node__content">
        <slot name="node" :node="node">
          <div class="yh-flow-node__header">{{ node.data?.label || node.id }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Node, NodeHandle, HandleType, Position } from '../types'

const props = withDefaults(
  defineProps<{
    nodes: Node[]
    transform: { x: number; y: number; zoom: number }
    draggable?: boolean
    connectable?: boolean
    readonly?: boolean
  }>(),
  {
    draggable: true,
    connectable: true,
    readonly: false
  }
)

const emit = defineEmits<{
  (e: 'nodeClick', event: MouseEvent, node: Node): void
  (e: 'nodeDblClick', event: MouseEvent, node: Node): void
  (e: 'nodeContextMenu', event: MouseEvent, node: Node): void
  (e: 'nodeDragStart', event: MouseEvent, node: Node): void
  (e: 'nodeDrag', event: MouseEvent, node: Node, position: { x: number; y: number }): void
  (e: 'nodeDragEnd', event: MouseEvent, node: Node): void
  (
    e: 'connectStart',
    event: MouseEvent,
    nodeId: string,
    handleId: string,
    handleType: HandleType
  ): void
  (e: 'nodeSelectToggle', nodeId: string): void
}>()

const visibleNodes = computed(() => {
  return props.nodes.filter((n) => !n.hidden)
})

const getNodeStyle = (node: Node) => {
  const width = node.width || 200
  const height = node.height || 50

  let zIndex = node.zIndex || 10
  if (node.type === 'group') {
    zIndex = node.selected ? 2 : 1
  } else {
    zIndex = node.selected ? 100 : Math.max(10, zIndex)
  }

  return {
    transform: `translate(${node.position.x}px, ${node.position.y}px)`,
    width: `${width}px`,
    height: `${height}px`,
    zIndex,
    ...node.style
  }
}

const getHandles = (node: Node, type: HandleType): NodeHandle[] => {
  if (node.handleBounds) {
    const handles: NodeHandle[] = []
    if (node.handleBounds.top) handles.push(...node.handleBounds.top)
    if (node.handleBounds.right) handles.push(...node.handleBounds.right)
    if (node.handleBounds.bottom) handles.push(...node.handleBounds.bottom)
    if (node.handleBounds.left) handles.push(...node.handleBounds.left)
    return handles.filter((h) => h.type === type)
  }

  if (node.type === 'group') {
    return []
  }

  // 默认 handles 策略，优化为标准的从左到右工作流习惯
  if (node.type === 'input') {
    return type === 'source' ? [{ type: 'source', position: 'right' as Position }] : []
  }
  if (node.type === 'output') {
    return type === 'target' ? [{ type: 'target', position: 'left' as Position }] : []
  }

  // default node: source on right/bottom, target on left/top
  if (type === 'source') {
    return [
      { type: 'source', position: 'right' as Position },
      { type: 'source', position: 'bottom' as Position }
    ]
  } else {
    return [
      { type: 'target', position: 'left' as Position },
      { type: 'target', position: 'top' as Position }
    ]
  }
}

// 拖拽状态
const draggingNode = ref<string | null>(null)
const dragStartPos = ref({ x: 0, y: 0 })
const nodeStartPos = ref({ x: 0, y: 0 })
// 多节点拖拽支持
const draggingNodes = ref<string[]>([])
const nodesStartPositions = ref<Map<string, { x: number; y: number }>>(new Map())

const handleNodeMouseDown = (event: MouseEvent, node: Node) => {
  if (props.readonly || !props.draggable || node.draggable === false) return

  // 严谨检测：如果点击的是连接点或者缩放手柄，不触发节点拖拽
  const target = event.target as HTMLElement
  if (
    target.closest('.yh-flow-handle') ||
    target.closest('.resizer-handle') ||
    target.closest('.yh-flow-node-toolbar')
  ) {
    return
  }

  event.preventDefault()

  const wasSelected = node.selected

  // 立即触发 click，实现点击（按下）即选中当前节点
  emit('nodeClick', event, node)

  const draggedIds = new Set<string>()
  const addNodeAndChildren = (id: string) => {
    if (draggedIds.has(id)) return
    draggedIds.add(id)
    props.nodes.forEach((n) => {
      if (n.parentId === id) addNodeAndChildren(n.id)
    })
  }

  const isMultiSelection = event.shiftKey || event.metaKey || event.ctrlKey
  const otherSelectedNodes = props.nodes.filter((n) => n.selected && n.id !== node.id)

  let nodesToDrag = [node.id]

  if (isMultiSelection || wasSelected) {
    if (otherSelectedNodes.length > 0) {
      nodesToDrag = [node.id, ...otherSelectedNodes.map((n) => n.id)]
    }
  }

  nodesToDrag.forEach(addNodeAndChildren)

  draggingNodes.value = Array.from(draggedIds)
  nodesStartPositions.value = new Map()

  draggingNodes.value.forEach((nodeId) => {
    const n = props.nodes.find((nd) => nd.id === nodeId)
    if (n) {
      nodesStartPositions.value.set(nodeId, { ...n.position })
    }
  })

  // 同步标记，某些外部依赖可能会获取此值
  if (draggingNodes.value.length === 1) {
    draggingNode.value = node.id
    nodeStartPos.value = { ...node.position }
  } else {
    draggingNode.value = null
  }

  dragStartPos.value = { x: event.clientX, y: event.clientY }
  emit('nodeDragStart', event, node)

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  if (draggingNodes.value.length === 0) return

  const dx = (event.clientX - dragStartPos.value.x) / props.transform.zoom
  const dy = (event.clientY - dragStartPos.value.y) / props.transform.zoom

  draggingNodes.value.forEach((nodeId) => {
    const startPos = nodesStartPositions.value.get(nodeId)
    if (startPos) {
      const newPosition = {
        x: startPos.x + dx,
        y: startPos.y + dy
      }
      const node = props.nodes.find((n) => n.id === nodeId)
      if (node) {
        emit('nodeDrag', event, node, newPosition)
      }
    }
  })
}

const handleMouseUp = (event: MouseEvent) => {
  if (draggingNodes.value.length > 0) {
    draggingNodes.value.forEach((nodeId) => {
      const node = props.nodes.find((n) => n.id === nodeId)
      if (node) {
        emit('nodeDragEnd', event, node)
      }
    })
    draggingNodes.value = []
    nodesStartPositions.value = new Map()
  }

  draggingNode.value = null
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleNodeClick = (_event: MouseEvent, _node: Node) => {
  // 不在此 emit nodeClick，避免和 mousedown 中触发的逻辑重复，仅作保留或去除
  // emit('nodeClick', event, node)
}

const handleNodeDblClick = (event: MouseEvent, node: Node) => {
  emit('nodeDblClick', event, node)
}

const handleNodeContextMenu = (event: MouseEvent, node: Node) => {
  emit('nodeContextMenu', event, node)
}

const handleConnectStart = (event: MouseEvent, node: Node, handle: NodeHandle) => {
  // 传递 handle.position 让 Flow.vue 精确定位连接线起点
  emit('connectStart', event, node.id, handle.id || handle.position || '', handle.type)
}
</script>

<style scoped>
.yh-flow-nodes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.yh-flow-node {
  position: absolute;
  background: #fff;
  border: 1px solid #1a192b;
  border-radius: 3px;
  box-shadow: none;
  cursor: pointer;
  user-select: none;
  overflow: visible;
  /* Handle markers should be visible */
  box-sizing: border-box;
  pointer-events: auto;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
}

.yh-flow-node:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.yh-flow-node.is-selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.yh-flow-node.is-dragging {
  cursor: grabbing;
  opacity: 0.8;
}

.yh-flow-node.is-hidden {
  display: none;
}

.yh-flow-node.type-group {
  background: rgba(248, 250, 252, 0.5);
  border: 1px dashed #9ca3af;
  box-shadow: none;
}

.yh-flow-node.type-group.is-selected {
  border: 1px solid #3b82f6;
  background: rgba(248, 250, 252, 0.7);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.yh-flow-node.type-group:hover {
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
}

.yh-flow-node.type-group .yh-flow-node__content {
  padding: 8px 12px;
}

.yh-flow-node.type-group .yh-flow-node__header {
  font-size: 13px;
  color: #6b7280;
}

.yh-flow-node__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  /* Default no padding to allow tools to align to borders */
}

.yh-flow-node__header {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 12px;
  color: #222;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.yh-flow-handle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #1a192b;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: crosshair;
  z-index: 10;
  box-sizing: border-box;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    transform 0.2s;
}

.yh-flow-handle:hover,
.yh-flow-node.is-selected .yh-flow-handle {
  background: #3b82f6;
  border-color: #fff;
}

/* Right */
.yh-flow-handle.is-source.position-right,
.yh-flow-handle.is-target.position-right {
  right: -3px;
  top: 50%;
  transform: translateY(-50%);
}

.yh-flow-handle.is-source.position-right:hover,
.yh-flow-handle.is-target.position-right:hover,
.yh-flow-node.is-selected .yh-flow-handle.position-right {
  transform: translateY(-50%) scale(1.3);
}

/* Left */
.yh-flow-handle.is-source.position-left,
.yh-flow-handle.is-target.position-left {
  left: -3px;
  top: 50%;
  transform: translateY(-50%);
}

.yh-flow-handle.is-source.position-left:hover,
.yh-flow-handle.is-target.position-left:hover,
.yh-flow-node.is-selected .yh-flow-handle.position-left {
  transform: translateY(-50%) scale(1.3);
}

/* Top */
.yh-flow-handle.is-source.position-top,
.yh-flow-handle.is-target.position-top {
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
}

.yh-flow-handle.is-source.position-top:hover,
.yh-flow-handle.is-target.position-top:hover,
.yh-flow-node.is-selected .yh-flow-handle.position-top {
  transform: translateX(-50%) scale(1.3);
}

/* Bottom */
.yh-flow-handle.is-source.position-bottom,
.yh-flow-handle.is-target.position-bottom {
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
}

.yh-flow-handle.is-source.position-bottom:hover,
.yh-flow-handle.is-target.position-bottom:hover,
.yh-flow-node.is-selected .yh-flow-handle.position-bottom {
  transform: translateX(-50%) scale(1.3);
}
</style>
