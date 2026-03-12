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
        'is-hidden': node.hidden
      }"
      :style="getNodeStyle(node)"
      @mousedown="handleNodeMouseDown($event, node)"
      @click="handleNodeClick($event, node)"
      @dblclick="handleNodeDblClick($event, node)"
      @contextmenu="handleNodeContextMenu($event, node)"
    >
      <!-- Handle (连接点) -->
      <template v-if="node.connectable !== false">
        <!-- Source handles -->
        <div
          v-for="handle in getHandles(node, 'source')"
          :key="`handle-${handle.id || 'source'}`"
          class="yh-flow-handle is-source"
          :class="`position-${handle.position}`"
          :data-handle-id="handle.id"
          :data-handle-type="handle.type"
          @mousedown.stop="handleConnectStart($event, node, handle)"
        />
        <!-- Target handles -->
        <div
          v-for="handle in getHandles(node, 'target')"
          :key="`handle-${handle.id || 'target'}`"
          class="yh-flow-handle is-target"
          :class="`position-${handle.position}`"
          :data-handle-id="handle.id"
          :data-handle-type="handle.type"
          @mousedown.stop="handleConnectStart($event, node, handle)"
        />
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

const props = defineProps<{
  nodes: Node[]
  transform: { x: number; y: number; zoom: number }
  draggable?: boolean
  readonly?: boolean
}>()

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

  return {
    transform: `translate(${node.position.x * props.transform.zoom + props.transform.x}px, ${node.position.y * props.transform.zoom + props.transform.y}px)`,
    width: `${width * props.transform.zoom}px`,
    minHeight: `${height * props.transform.zoom}px`,
    zIndex: node.selected ? 100 : node.zIndex || 1
  }
}

const getHandles = (node: Node, type: HandleType) => {
  if (node.handleBounds) {
    return node.handleBounds[type] || []
  }
  // 默认 handle
  return [
    {
      type,
      position: type === 'source' ? ('right' as Position) : ('left' as Position)
    }
  ]
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
  if ((event.target as HTMLElement).classList.contains('yh-flow-handle')) return

  event.preventDefault()

  // 检查是否有其他节点被同时选中
  const selectedNodes = props.nodes.filter((n) => n.selected && n.id !== node.id)

  if (selectedNodes.length > 0 && !event.shiftKey && !event.metaKey && !event.ctrlKey) {
    // 多节点拖拽模式：拖动所有选中的节点
    draggingNodes.value = [node.id, ...selectedNodes.map((n) => n.id)]
    nodesStartPositions.value = new Map()

    // 记录所有选中节点的起始位置
    draggingNodes.value.forEach((nodeId) => {
      const n = props.nodes.find((nd) => nd.id === nodeId)
      if (n) {
        nodesStartPositions.value.set(nodeId, { ...n.position })
      }
    })

    dragStartPos.value = { x: event.clientX, y: event.clientY }

    // 触发拖拽开始事件
    emit('nodeDragStart', event, node)
  } else {
    // 单节点拖拽模式（原有逻辑）
    // 如果按住shift/ctrl/meta，点击未选中节点则添加到选区
    if (event.shiftKey || event.metaKey || event.ctrlKey) {
      emit('nodeSelectToggle', node.id)
    }

    draggingNode.value = node.id
    dragStartPos.value = { x: event.clientX, y: event.clientY }
    nodeStartPos.value = { ...node.position }

    emit('nodeDragStart', event, node)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (event: MouseEvent) => {
  // 多节点拖拽
  if (draggingNodes.value.length > 0) {
    const dx = (event.clientX - dragStartPos.value.x) / props.transform.zoom
    const dy = (event.clientY - dragStartPos.value.y) / props.transform.zoom

    // 更新所有拖拽中的节点位置
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
    return
  }

  // 单节点拖拽
  if (!draggingNode.value) return

  const dx = (event.clientX - dragStartPos.value.x) / props.transform.zoom
  const dy = (event.clientY - dragStartPos.value.y) / props.transform.zoom

  const newPosition = {
    x: nodeStartPos.value.x + dx,
    y: nodeStartPos.value.y + dy
  }

  const node = props.nodes.find((n) => n.id === draggingNode.value)
  if (node) {
    emit('nodeDrag', event, node, newPosition)
  }
}

const handleMouseUp = (event: MouseEvent) => {
  // 多节点拖拽结束
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

  // 单节点拖拽结束
  if (draggingNode.value) {
    const node = props.nodes.find((n) => n.id === draggingNode.value)
    if (node) {
      emit('nodeDragEnd', event, node)
    }
  }

  draggingNode.value = null
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

const handleNodeClick = (event: MouseEvent, node: Node) => {
  emit('nodeClick', event, node)
}

const handleNodeDblClick = (event: MouseEvent, node: Node) => {
  emit('nodeDblClick', event, node)
}

const handleNodeContextMenu = (event: MouseEvent, node: Node) => {
  emit('nodeContextMenu', event, node)
}

const handleConnectStart = (event: MouseEvent, node: Node, handle: NodeHandle) => {
  emit('connectStart', event, node.id, handle.id || '', handle.type)
}
</script>

<style scoped>
.yh-flow-nodes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.yh-flow-node {
  position: absolute;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: move;
  user-select: none;
  transition:
    box-shadow 0.2s,
    border-color 0.2s;
}

.yh-flow-node:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.yh-flow-node.is-selected {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.yh-flow-node.is-dragging {
  cursor: grabbing;
  opacity: 0.8;
}

.yh-flow-node.is-hidden {
  display: none;
}

.yh-flow-node__content {
  padding: 12px;
}

.yh-flow-node__header {
  font-weight: 600;
  font-size: 14px;
  color: #374151;
}

.yh-flow-handle {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fff;
  border: 2px solid #9ca3af;
  border-radius: 50%;
  cursor: crosshair;
  z-index: 10;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.yh-flow-handle:hover {
  background: #3b82f6;
  border-color: #3b82f6;
}

.yh-flow-handle.is-source.position-right {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.yh-flow-handle.is-source.position-left {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.yh-flow-handle.is-source.position-top {
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
}

.yh-flow-handle.is-source.position-bottom {
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
}

.yh-flow-handle.is-target.position-right {
  right: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.yh-flow-handle.is-target.position-left {
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
}

.yh-flow-handle.is-target.position-top {
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
}

.yh-flow-handle.is-target.position-bottom {
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
