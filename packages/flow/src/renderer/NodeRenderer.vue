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
          <!-- Automatic Custom Node Component -->
          <component v-if="getComponent(node.type)" :is="getComponent(node.type)" :node="node" />
          <div v-else class="yh-flow-node__header">{{ node.data?.label || node.id }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Node, NodeHandle, HandleType, Position, NodeTypes } from '../types'
import { getCustomNodeTemplate, getCustomNode } from '../utils/custom-types'

const props = withDefaults(
  defineProps<{
    nodes: Node[]
    nodeTypes?: NodeTypes
    transform: { x: number; y: number; zoom: number }
    draggable?: boolean
    connectable?: boolean
    readonly?: boolean
  }>(),
  {
    nodeTypes: () => ({}),
    draggable: true,
    connectable: true,
    readonly: false
  }
)

const emit = defineEmits<{
  (e: 'node-click', event: MouseEvent, node: Node): void
  (e: 'node-dblclick', event: MouseEvent, node: Node): void
  (e: 'node-contextmenu', event: MouseEvent, node: Node): void
  (e: 'node-drag-start', event: MouseEvent, node: Node): void
  (e: 'node-drag', event: MouseEvent, node: Node, position: { x: number; y: number }): void
  (e: 'node-drag-end', event: MouseEvent, node: Node): void
  (
    e: 'connect-start',
    event: MouseEvent,
    nodeId: string,
    handleId: string,
    handleType: HandleType
  ): void
  (e: 'node-select-toggle', nodeId: string): void
}>()

const getComponent = (type: string) => {
  if (props.nodeTypes && props.nodeTypes[type]) {
    return props.nodeTypes[type]
  }
  // Try template first, then legacy custom node
  return getCustomNodeTemplate(type)?.component || getCustomNode(type)?.component
}

const visibleNodes = computed(() => {
  return props.nodes.filter((n) => !n.hidden)
})

const getNodeStyle = (node: Node) => {
  const width = node.width || 150
  const height = node.height || 40

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

  // BPMN 节点 handle 策略
  if (node.type === 'bpmn-start') {
    return type === 'source' ? [{ type: 'source', position: 'right' as Position }] : []
  }
  if (node.type === 'bpmn-end') {
    return type === 'target' ? [{ type: 'target', position: 'left' as Position }] : []
  }
  if (
    node.type === 'bpmn-task' ||
    node.type === 'bpmn-service-task' ||
    node.type === 'bpmn-user-task'
  ) {
    if (type === 'source') return [{ type: 'source', position: 'right' as Position }]
    return [{ type: 'target', position: 'left' as Position }]
  }
  if (
    node.type === 'bpmn-exclusive-gateway' ||
    node.type === 'bpmn-parallel-gateway' ||
    node.type === 'bpmn-inclusive-gateway'
  ) {
    if (type === 'source') {
      return [
        { type: 'source', position: 'right' as Position },
        { type: 'source', position: 'bottom' as Position }
      ]
    }
    return [{ type: 'target', position: 'left' as Position }]
  }

  // AI Workflow 节点 handle 策略
  if (node.type === 'ai-start') {
    return type === 'source' ? [{ type: 'source', position: 'right' as Position }] : []
  }
  if (node.type === 'ai-end') {
    return type === 'target' ? [{ type: 'target', position: 'left' as Position }] : []
  }
  if (
    node.type === 'ai-llm' ||
    node.type === 'ai-prompt' ||
    node.type === 'ai-agent' ||
    node.type === 'ai-tool' ||
    node.type === 'ai-memory'
  ) {
    if (type === 'source') return [{ type: 'source', position: 'right' as Position }]
    return [{ type: 'target', position: 'left' as Position }]
  }
  if (node.type === 'ai-condition') {
    if (type === 'source') {
      return [
        { type: 'source', position: 'right' as Position },
        { type: 'source', position: 'bottom' as Position }
      ]
    }
    return [{ type: 'target', position: 'left' as Position }]
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
// 拖拽移动阈值：只有鼠标移动超过此值才认为是拖拽，否则视为点击
const DRAG_THRESHOLD = 3
const hasDragged = ref(false)
const pendingClickNode = ref<Node | null>(null)
const pendingClickEvent = ref<MouseEvent | null>(null)

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

  // 确保拖拽时不会触发文本选中
  const selection = window.getSelection()
  if (selection) selection.removeAllRanges()

  // 延迟 nodeClick 到 mouseup（click 阶段），避免在 mousedown 阶段触发 Vue 重渲染
  // 阻止浏览器 dblclick 事件的正常检测
  pendingClickNode.value = node
  pendingClickEvent.value = event
  hasDragged.value = false

  const wasSelected = node.selected

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

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  if (draggingNodes.value.length === 0) return

  // 检查是否超过拖拽阈值
  const rawDx = event.clientX - dragStartPos.value.x
  const rawDy = event.clientY - dragStartPos.value.y
  if (!hasDragged.value && Math.abs(rawDx) < DRAG_THRESHOLD && Math.abs(rawDy) < DRAG_THRESHOLD)
    return

  // 首次超过阈值时发射 dragStart 事件
  if (!hasDragged.value) {
    hasDragged.value = true
    const mainNode = pendingClickNode.value
    if (mainNode) emit('node-drag-start', event, mainNode)
  }

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
        emit('node-drag', event, node, newPosition)
      }
    }
  })
}

const handleMouseUp = (event: MouseEvent) => {
  if (draggingNodes.value.length > 0) {
    if (hasDragged.value) {
      draggingNodes.value.forEach((nodeId) => {
        const node = props.nodes.find((n) => n.id === nodeId)
        if (node) {
          emit('node-drag-end', event, node)
        }
      })
    }
    draggingNodes.value = []
    nodesStartPositions.value = new Map()
  }

  // 如果没有发生拖拽（未超过阈值），在 mouseup 阶段触发 click 选中
  if (!hasDragged.value && pendingClickNode.value) {
    emit('node-click', event, pendingClickNode.value)
  }

  draggingNode.value = null
  pendingClickNode.value = null
  pendingClickEvent.value = null
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleNodeClick = (_event: MouseEvent, _node: Node) => {
  // nodeClick 已在 handleMouseUp 中根据拖拽阈值判断后触发
}

const handleNodeDblClick = (event: MouseEvent, node: Node) => {
  emit('node-dblclick', event, node)
}

const handleNodeContextMenu = (event: MouseEvent, node: Node) => {
  emit('node-contextmenu', event, node)
}

const handleConnectStart = (event: MouseEvent, node: Node, handle: NodeHandle) => {
  // 传递 handle.position 让 Flow.vue 精确定位连接线起点
  emit('connect-start', event, node.id, handle.id || handle.position || '', handle.type)
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
  background: var(--flow-node-background, #fff);
  border: 1px solid var(--flow-node-border, #1a192b);
  border-radius: var(--flow-node-border-radius, 3px);
  box-shadow: var(--flow-node-shadow, none);
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
  border-color: var(--flow-node-selected-border, #3b82f6);
  box-shadow: var(--flow-node-selected-shadow, 0 0 0 1px #3b82f6);
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
  font-weight: var(--flow-node-label-font-weight, 500);
  font-size: var(--flow-node-label-font-size, 12px);
  color: var(--flow-node-label-color, #222);
  text-align: center;
  width: 100%;
  box-sizing: border-box;
}

.yh-flow-handle {
  position: absolute;
  width: var(--flow-handle-size, 6px);
  height: var(--flow-handle-size, 6px);
  background: var(--flow-handle-background, #1a192b);
  border: 1px solid var(--flow-handle-border, #fff);
  border-radius: var(--flow-handle-border-radius, 50%);
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
  background: var(--flow-handle-hover-background, #3b82f6);
  border-color: var(--flow-handle-border, #fff);
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
