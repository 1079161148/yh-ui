<template>
  <div
    ref="containerRef"
    class="yh-flow"
    :class="{ 'is-readonly': readonly }"
    @wheel.prevent="handleWheel"
    @mousedown="handlePaneMouseDown"
  >
    <!-- Background -->
    <Background
      v-if="background !== 'none'"
      :type="background"
      :color="backgroundColor"
      :zoom="viewportRef.zoom"
      :offset="{ x: viewportRef.x, y: viewportRef.y }"
      :gap="gridSize"
    />

    <!-- Main Content -->
    <div class="yh-flow__content" :style="contentStyle">
      <!-- Edges -->
      <EdgeRenderer
        :edges="edgesRef"
        :nodes="nodesRef"
        :transform="viewportRef"
        :connecting-edge="connectingEdge"
        @edge-click="handleEdgeClick"
        @edge-dblclick="handleEdgeDblClick"
        @edge-contextmenu="handleEdgeContextMenu"
      />

      <!-- Nodes -->
      <NodeRenderer
        :nodes="visibleNodes"
        :transform="viewportRef"
        :draggable="nodesDraggable && !readonly"
        :readonly="readonly"
        @node-click="handleNodeClick"
        @node-dblclick="handleNodeDblClick"
        @node-contextmenu="handleNodeContextMenu"
        @node-drag-start="handleNodeDragStart"
        @node-drag="handleNodeDrag"
        @node-drag-end="handleNodeDragEnd"
        @connect-start="handleConnectStart"
        @node-select-toggle="handleNodeSelectToggle"
      />

      <!-- Selection Box -->
      <SelectionBox
        :selection-rect="selectionManager.selectionRect.value"
        :transform="viewportRef"
      />

      <!-- Alignment Lines -->
      <AlignmentLines
        v-if="showAlignmentLines && draggingNodeId"
        :nodes="nodesRef"
        :dragging-node-id="draggingNodeId"
        :dragging-position="draggingPosition || undefined"
        :container-width="containerWidth"
        :container-height="containerHeight"
        :snap-threshold="snapThreshold"
      />
    </div>

    <!-- Controls -->
    <Controls
      v-if="showControls"
      :zoom="viewportRef.zoom"
      :readonly="readonly"
      @zoom-in="zoomIn"
      @zoom-out="zoomOut"
      @fit-view="handleFitView"
      @update:readonly="readonly = $event"
    />

    <!-- Minimap -->
    <Minimap
      v-if="showMinimap"
      :nodes="nodesRef"
      :edges="edgesRef"
      :viewport="viewportRef"
      :viewport-size="{ width: containerWidth, height: containerHeight }"
      :node-color="minimapNodeColor"
    />

    <!-- Connection Line (dragging) -->
    <svg v-if="isConnecting" class="yh-flow__connection-line">
      <path
        :d="connectionLinePath"
        stroke="#3b82f6"
        stroke-width="2"
        fill="none"
        stroke-dasharray="5,5"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, shallowRef } from 'vue'
import type {
  Node,
  Edge,
  ViewportTransform,
  HandleType,
  Position,
  Connection,
  FitViewOptions,
  FlowEventKey,
  FlowEventHandler,
  FlowEvents,
  FlowInstance
} from './types'
import Background from './renderer/Background.vue'
import EdgeRenderer from './renderer/EdgeRenderer.vue'
import NodeRenderer from './renderer/NodeRenderer.vue'
import SelectionBox from './renderer/SelectionBox.vue'
import Controls from './renderer/Controls.vue'
import Minimap from './renderer/Minimap.vue'
import AlignmentLines from './renderer/AlignmentLines.vue'
import { useViewport } from './core/useViewport'
import { useNodes } from './core/useNodes'
import { useEdges } from './core/useEdges'
import { useSelection } from './core/useSelection'
import { useHistory } from './core/useHistory'
import { useKeyboard } from './core/useKeyboard'
import { useAlignment } from './core/useAlignment'
import { getEdgePath } from './utils/edge'
import { screenToCanvas, canvasToScreen } from './utils/transform'
import { isValidConnection, detectCycles } from './utils/validation'
import { provideFlowContext } from './core/FlowContext'
import { createEventBus } from './utils/event-bus'
import { PluginManager } from './plugins/plugin'
import type { FlowPlugin } from './plugins/plugin'

// Connection validation
const validateConnection = (
  sourceNode: Node | undefined,
  targetNode: Node | undefined,
  connection: {
    source: string
    target: string
    sourceHandle?: string | null
    targetHandle?: string | null
  }
) => {
  // 首先进行基本验证
  const basicResult = isValidConnection(sourceNode, targetNode, connection)
  if (!basicResult.isValid) {
    return basicResult
  }

  // 如果提供了自定义验证器，使用自定义验证器
  if (props.connectionValidator && !props.connectionValidator(connection)) {
    return { isValid: false, message: 'Connection not allowed by custom validator' }
  }

  // 检查循环（如果未禁用）
  if (!props.noCycleValidation) {
    const wouldCreateCycle = detectCycles(edgesRef.value, {
      source: connection.source,
      target: connection.target
    })
    if (wouldCreateCycle) {
      return { isValid: false, message: 'Connection would create a cycle' }
    }
  }

  return { isValid: true }
}

// Props
const props = defineProps<{
  nodes?: Node[]
  edges?: Edge[]
  modelValue?: ViewportTransform
  minZoom?: number
  maxZoom?: number
  zoomStep?: number
  nodesDraggable?: boolean
  edgesConnectable?: boolean
  selectable?: boolean
  background?: 'none' | 'dots' | 'grid'
  backgroundColor?: string
  gridSize?: number
  snapToGrid?: boolean
  snapGrid?: [number, number]
  readonly?: boolean
  showControls?: boolean
  showMinimap?: boolean
  minimapNodeColor?: string
  history?: boolean
  maxHistory?: number
  keyboardShortcuts?: boolean
  connectionValidator?: (connection: {
    source: string
    target: string
    sourceHandle?: string | null
    targetHandle?: string | null
  }) => boolean
  noCycleValidation?: boolean
  showAlignmentLines?: boolean
  snapThreshold?: number
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: ViewportTransform): void
  (e: 'update:nodes', nodes: Node[]): void
  (e: 'update:edges', edges: Edge[]): void
  (e: 'nodeClick', event: { node: Node; nativeEvent: MouseEvent }): void
  (e: 'nodeDblClick', event: { node: Node; nativeEvent: MouseEvent }): void
  (e: 'nodeDragStart', event: { node: Node; nativeEvent: MouseEvent }): void
  (
    e: 'nodeDrag',
    event: { node: Node; nativeEvent: MouseEvent; position: { x: number; y: number } }
  ): void
  (e: 'nodeDragEnd', event: { node: Node; nativeEvent: MouseEvent }): void
  (e: 'nodeContextMenu', event: { node: Node; nativeEvent: MouseEvent }): void
  (e: 'edgeClick', event: { edge: Edge; nativeEvent: MouseEvent }): void
  (e: 'edgeDblClick', event: { edge: Edge; nativeEvent: MouseEvent }): void
  (e: 'edgeContextMenu', event: { edge: Edge; nativeEvent: MouseEvent }): void
  (e: 'edgeConnect', connection: Connection): void
  (e: 'selectionChange', event: { selectedNodes: Node[]; selectedEdges: Edge[] }): void
  (e: 'historyChange', event: { canUndo: boolean; canRedo: boolean }): void
  (e: 'viewportChange', transform: ViewportTransform): void
}>()

// Refs
const containerRef = ref<HTMLElement>()
const containerWidth = ref(800)
const containerHeight = ref(600)
const nodesRef = ref<Node[]>(props.nodes || [])
const edgesRef = ref<Edge[]>(props.edges || [])
const viewportRef = shallowRef<ViewportTransform>(props.modelValue || { x: 0, y: 0, zoom: 1 })
const readonly = ref(props.readonly || false)

// Event Bus - 事件总线
const eventBus = createEventBus()

// Plugin Manager - 插件管理器
const pluginManager = new PluginManager()

// Alignment lines state (before useAlignment)
const showAlignmentLines = ref(props.showAlignmentLines ?? true)
const snapThreshold = ref(props.snapThreshold ?? 10)

// Initialize managers
const viewport = useViewport(viewportRef, {
  minZoom: props.minZoom || 0.1,
  maxZoom: props.maxZoom || 5,
  zoomStep: props.zoomStep || 0.1
})

const nodesManager = useNodes(viewportRef, {
  nodes: nodesRef,
  snapToGrid: props.snapToGrid || false,
  snapGrid: props.snapGrid || [15, 15]
})

const edgesManager = useEdges({
  edges: edgesRef,
  nodes: nodesRef
})

const selectionManager = useSelection({
  nodes: nodesRef,
  edges: edgesRef
})

const historyManager = useHistory(nodesRef, edgesRef, {
  maxHistory: props.maxHistory || 50,
  onHistoryChange: (canUndo, canRedo) => {
    emit('historyChange', { canUndo, canRedo })
  }
})

// Alignment (snap to nodes)
const alignmentManager = useAlignment({
  nodes: nodesRef,
  snapThreshold: snapThreshold.value
})

// Visible nodes (virtualized)
const visibleNodes = computed(() => {
  if (!containerRef.value) return nodesRef.value

  const padding = 100
  const visibleBounds = {
    x: -viewportRef.value.x / viewportRef.value.zoom - padding,
    y: -viewportRef.value.y / viewportRef.value.zoom - padding,
    width: containerWidth.value / viewportRef.value.zoom + padding * 2,
    height: containerHeight.value / viewportRef.value.zoom + padding * 2
  }

  return nodesRef.value.filter((node) => {
    const width = node.width || 200
    const height = node.height || 50
    return !(
      node.position.x + width < visibleBounds.x ||
      node.position.x > visibleBounds.x + visibleBounds.width ||
      node.position.y + height < visibleBounds.y ||
      node.position.y > visibleBounds.y + visibleBounds.height
    )
  })
})

// Content style
const contentStyle = computed(() => ({
  transform: `translate(${viewportRef.value.x}px, ${viewportRef.value.y}px) scale(${viewportRef.value.zoom})`,
  transformOrigin: '0 0'
}))

// Panning state
const isPanning = ref(false)
const panStart = ref({ x: 0, y: 0 })

// Selection state
const isSelecting = ref(false)

// Alignment lines state
const draggingNodeId = ref<string | null>(null)
const draggingPosition = ref<{ x: number; y: number } | null>(null)

// Connecting state
const isConnecting = ref(false)
const connectionStart = ref<{
  nodeId: string
  handleId: string
  handleType: HandleType
  position: Position
  x: number
  y: number
} | null>(null)
const connectionEnd = ref({ x: 0, y: 0 })

const connectingEdge = computed(() => {
  if (!isConnecting.value || !connectionStart.value) return null
  return { path: connectionLinePath.value }
})

const connectionLinePath = computed(() => {
  if (!connectionStart.value) return ''
  return getEdgePath('bezier', {
    sourceX: connectionStart.value.x * viewportRef.value.zoom + viewportRef.value.x,
    sourceY: connectionStart.value.y * viewportRef.value.zoom + viewportRef.value.y,
    targetX: connectionEnd.value.x,
    targetY: connectionEnd.value.y,
    sourcePosition: connectionStart.value.position,
    targetPosition: 'left'
  })
})

// Event handlers
const handleWheel = (event: WheelEvent) => {
  if (event.ctrlKey || event.metaKey) {
    // Zoom
    const delta = event.deltaY > 0 ? 0.9 : 1.1
    const rect = containerRef.value?.getBoundingClientRect()
    if (rect) {
      viewport.zoomTo(viewportRef.value.zoom * delta, {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      })
    }
  } else {
    // Pan
    viewport.pan(-event.deltaX, -event.deltaY)
  }
}

const handlePaneMouseDown = (event: MouseEvent) => {
  if (event.target !== containerRef.value) return
  if (!props.selectable) return

  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect) return

  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  // 按住 Alt/Option 键时进行框选，否则进行平移
  if (event.altKey) {
    // Start selection box - 使用画布坐标
    const canvasPos = {
      x: (mouseX - viewportRef.value.x) / viewportRef.value.zoom,
      y: (mouseY - viewportRef.value.y) / viewportRef.value.zoom
    }
    isSelecting.value = true
    selectionManager.startSelection(canvasPos.x, canvasPos.y)
    // 清除当前选择
    selectionManager.clearSelection()
  } else {
    // Start pan
    isPanning.value = true
    panStart.value = { x: event.clientX, y: event.clientY }
  }
}

const handleMouseMove = (event: MouseEvent) => {
  if (isPanning.value) {
    const dx = event.clientX - panStart.value.x
    const dy = event.clientY - panStart.value.y
    viewport.pan(dx, dy)
    panStart.value = { x: event.clientX, y: event.clientY }
  }

  if (isSelecting.value) {
    const rect = containerRef.value?.getBoundingClientRect()
    if (rect) {
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top
      // 使用画布坐标进行选区更新
      const canvasPos = {
        x: (mouseX - viewportRef.value.x) / viewportRef.value.zoom,
        y: (mouseY - viewportRef.value.y) / viewportRef.value.zoom
      }
      selectionManager.updateSelection(canvasPos.x, canvasPos.y)
    }
  }

  if (isConnecting.value) {
    const rect = containerRef.value?.getBoundingClientRect()
    if (rect) {
      connectionEnd.value = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    }
  }
}

const handleMouseUp = (event: MouseEvent) => {
  isPanning.value = false

  // 结束框选
  if (isSelecting.value) {
    isSelecting.value = false
    selectionManager.endSelection()
  }

  // 处理连接结束
  if (isConnecting.value && connectionStart.value) {
    // 查找鼠标位置下的目标节点
    const rect = containerRef.value?.getBoundingClientRect()
    if (rect) {
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      // 转换为画布坐标
      const canvasPos = {
        x: (mouseX - viewportRef.value.x) / viewportRef.value.zoom,
        y: (mouseY - viewportRef.value.y) / viewportRef.value.zoom
      }

      // 查找目标节点
      const targetNode = findTargetNode(canvasPos)
      if (targetNode) {
        // 验证连接是否有效
        const sourceNode = nodesRef.value.find((n) => n.id === connectionStart.value!.nodeId)
        const validationResult = validateConnection(sourceNode, targetNode, {
          source: connectionStart.value!.nodeId,
          target: targetNode.id,
          sourceHandle: connectionStart.value!.handleId,
          targetHandle: undefined
        })

        if (!validationResult.isValid) {
          console.warn('Invalid connection:', validationResult.message)
          return
        }

        // 创建新连线
        const newEdge: Edge = {
          id: `edge-${Date.now()}`,
          source: connectionStart.value.nodeId,
          target: targetNode.id,
          sourceHandle: connectionStart.value.handleId || undefined,
          targetHandle: undefined,
          type: 'bezier'
        }
        edgesManager.addEdge(newEdge)
        emit('edgeConnect', {
          source: newEdge.source,
          target: newEdge.target,
          sourceHandle: newEdge.sourceHandle,
          targetHandle: newEdge.targetHandle
        })
        eventBus.emit('edge:connect', {
          connection: {
            source: newEdge.source,
            target: newEdge.target,
            sourceHandle: newEdge.sourceHandle,
            targetHandle: newEdge.targetHandle
          }
        })
      }
    }

    isConnecting.value = false
    connectionStart.value = null
  }
}

// 查找鼠标位置下的目标节点
const findTargetNode = (canvasPos: { x: number; y: number }): Node | null => {
  for (const node of nodesRef.value) {
    const width = node.width || 200
    const height = node.height || 50

    if (
      canvasPos.x >= node.position.x &&
      canvasPos.x <= node.position.x + width &&
      canvasPos.y >= node.position.y &&
      canvasPos.y <= node.position.y + height
    ) {
      // 不能连接到源节点本身
      if (connectionStart.value && node.id !== connectionStart.value.nodeId) {
        return node
      }
    }
  }
  return null
}

// Node handlers
const handleNodeClick = (event: MouseEvent, node: Node) => {
  const multi = event.shiftKey || event.metaKey || event.ctrlKey
  nodesManager.selectNode(node.id, true, multi)
  emit('nodeClick', { node, nativeEvent: event })
  eventBus.emit('node:click', { node, nativeEvent: event })
}

const handleNodeSelectToggle = (nodeId: string) => {
  const node = nodesRef.value.find((n) => n.id === nodeId)
  if (node) {
    node.selected = !node.selected
  }
}

const handleNodeDblClick = (event: MouseEvent, node: Node) => {
  emit('nodeDblClick', { node, nativeEvent: event })
  eventBus.emit('node:dblclick', { node, nativeEvent: event })
}

const handleNodeContextMenu = (event: MouseEvent, node: Node) => {
  emit('nodeContextMenu', { node, nativeEvent: event })
  eventBus.emit('node:contextmenu', { node, nativeEvent: event })
}

const handleNodeDragStart = (event: MouseEvent, node: Node) => {
  historyManager.push({ nodes: nodesRef.value, edges: edgesRef.value })
  draggingNodeId.value = node.id
  draggingPosition.value = { ...node.position }
  emit('nodeDragStart', { node, nativeEvent: event })
  eventBus.emit('node:dragstart', { node, nativeEvent: event })
}

const handleNodeDrag = (event: MouseEvent, node: Node, position: { x: number; y: number }) => {
  // Apply alignment snap
  const snappedPosition = alignmentManager.getAlignmentSnap(node.id, position)

  nodesManager.updateNodePosition(node.id, snappedPosition, { dragging: true })
  draggingPosition.value = snappedPosition

  emit('nodeDrag', { node, nativeEvent: event, position: snappedPosition })
  eventBus.emit('node:drag', { node, nativeEvent: event, position: snappedPosition })
}

const handleNodeDragEnd = (event: MouseEvent, node: Node) => {
  nodesManager.updateNodePosition(node.id, node.position, { dragging: false })
  draggingNodeId.value = null
  draggingPosition.value = null
  emit('nodeDragEnd', { node, nativeEvent: event })
  eventBus.emit('node:dragend', { node, nativeEvent: event })
}

// Edge handlers
const handleEdgeClick = (event: MouseEvent, edge: Edge) => {
  const multi = event.shiftKey || event.metaKey || event.ctrlKey
  edgesManager.selectEdge(edge.id, true, multi)
  emit('edgeClick', { edge, nativeEvent: event })
  eventBus.emit('edge:click', { edge, nativeEvent: event })
}

const handleEdgeDblClick = (event: MouseEvent, edge: Edge) => {
  emit('edgeDblClick', { edge, nativeEvent: event })
  eventBus.emit('edge:dblclick', { edge, nativeEvent: event })
}

const handleEdgeContextMenu = (event: MouseEvent, edge: Edge) => {
  emit('edgeContextMenu', { edge, nativeEvent: event })
  eventBus.emit('edge:contextmenu', { edge, nativeEvent: event })
}

// Connection handlers
const handleConnectStart = (
  event: MouseEvent,
  nodeId: string,
  handleId: string,
  handleType: HandleType
) => {
  const node = nodesRef.value.find((n) => n.id === nodeId)
  if (!node) return

  const rect = containerRef.value?.getBoundingClientRect()
  if (!rect) return

  const width = node.width || 200
  const height = node.height || 50
  const position: Position = handleType === 'source' ? 'right' : 'left'

  isConnecting.value = true
  connectionStart.value = {
    nodeId,
    handleId,
    handleType,
    position,
    x: position === 'right' ? node.position.x + width : node.position.x,
    y: node.position.y + height / 2
  }
  connectionEnd.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

// Fit view
const handleFitView = () => {
  viewport.fitView({ width: containerWidth.value, height: containerHeight.value }, nodesRef.value, {
    padding: 50
  })
}

// Zoom methods
const zoomIn = () => viewport.zoomIn(1.2)
const zoomOut = () => viewport.zoomOut(1.2)

// Provide Flow context for plugins / hooks
const getNodes = () => nodesRef.value
const getEdges = () => edgesRef.value

// Plugin methods
const usePlugin = (plugin: FlowPlugin) => {
  pluginManager.register(plugin)
}

const removePlugin = (pluginId: string) => {
  pluginManager.unregister(pluginId)
}

// Event methods
const onEvent = <K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>) => {
  eventBus.on(event, handler)
}

const offEvent = <K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>) => {
  eventBus.off(event, handler)
}

const emitEvent = <K extends FlowEventKey>(event: K, payload?: FlowEvents[K]) => {
  eventBus.emit(event, payload)
}

const flowInstance: FlowInstance = {
  nodes: nodesRef,
  edges: edgesRef,
  viewport: viewportRef,
  addNode: nodesManager.addNode,
  removeNode: nodesManager.removeNode,
  updateNode: nodesManager.updateNode,
  getNode: nodesManager.getNode,
  addEdge: edgesManager.addEdge,
  removeEdge: edgesManager.removeEdge,
  updateEdge: edgesManager.updateEdge,
  getEdge: edgesManager.getEdge,
  setViewport: (transform: ViewportTransform) =>
    viewport.setViewport(transform.x, transform.y, transform.zoom),
  fitView: (options?: FitViewOptions) =>
    viewport.fitView(
      { width: containerWidth.value, height: containerHeight.value },
      nodesRef.value,
      options
    ),
  zoomIn: viewport.zoomIn,
  zoomOut: viewport.zoomOut,
  centerView: viewport.center,
  selectNode: nodesManager.selectNode,
  selectEdge: edgesManager.selectEdge,
  clearSelection: selectionManager.clearSelection,
  on: onEvent,
  off: offEvent,
  emit: emitEvent,
  isValidConnection: (connection: Connection) =>
    isValidConnection(
      nodesRef.value.find((n) => n.id === connection.source),
      nodesRef.value.find((n) => n.id === connection.target),
      connection
    ).isValid,
  getNodes,
  getEdges,
  screenToCanvas,
  canvasToScreen,
  usePlugin,
  removePlugin
} as FlowInstance

// Provide Flow context for plugins / hooks
provideFlowContext(flowInstance)
pluginManager.init(flowInstance)

// Watch for changes
watch(
  () => props.nodes,
  (newNodes) => {
    nodesRef.value = newNodes || []
  },
  { deep: true }
)

watch(
  () => props.edges,
  (newEdges) => {
    edgesRef.value = newEdges || []
  },
  { deep: true }
)

// Selection / selected events (diff-based)
const prevSelectedNodeIds = ref<Set<string>>(new Set())
const prevSelectedEdgeIds = ref<Set<string>>(new Set())

watch(
  [nodesRef, edgesRef],
  ([nodes, edges]) => {
    const selectedNodes = nodes.filter((n) => n.selected)
    const selectedEdges = edges.filter((e) => e.selected)

    const nextNodeIds = new Set(selectedNodes.map((n) => n.id))
    const nextEdgeIds = new Set(selectedEdges.map((e) => e.id))

    // node:selected / node:unselected
    for (const id of nextNodeIds) {
      if (!prevSelectedNodeIds.value.has(id)) {
        const node = nodes.find((n) => n.id === id)
        if (node) eventBus.emit('node:selected', { node })
      }
    }
    for (const id of prevSelectedNodeIds.value) {
      if (!nextNodeIds.has(id)) {
        const node = nodes.find((n) => n.id === id)
        if (node) eventBus.emit('node:unselected', { node })
      }
    }

    // edge:selected / edge:unselected
    for (const id of nextEdgeIds) {
      if (!prevSelectedEdgeIds.value.has(id)) {
        const edge = edges.find((e) => e.id === id)
        if (edge) eventBus.emit('edge:selected', { edge })
      }
    }
    for (const id of prevSelectedEdgeIds.value) {
      if (!nextEdgeIds.has(id)) {
        const edge = edges.find((e) => e.id === id)
        if (edge) eventBus.emit('edge:unselected', { edge })
      }
    }

    // selection:change (always when watcher fires)
    eventBus.emit('selection:change', { selectedNodes, selectedEdges })

    prevSelectedNodeIds.value = nextNodeIds
    prevSelectedEdgeIds.value = nextEdgeIds
  },
  { deep: true }
)

watch(
  viewportRef,
  (newViewport) => {
    emit('update:modelValue', newViewport)
    emit('viewportChange', newViewport)
    eventBus.emit('viewport:change', { transform: newViewport })
  },
  { deep: true }
)

// Lifecycle
let handleKeyDown: (event: KeyboardEvent) => void
onMounted(() => {
  if (containerRef.value) {
    containerWidth.value = containerRef.value.clientWidth
    containerHeight.value = containerRef.value.clientHeight

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidth.value = entry.contentRect.width
        containerHeight.value = entry.contentRect.height
      }
    })
    resizeObserver.observe(containerRef.value)
  }

  // Setup keyboard shortcuts
  if (props.keyboardShortcuts) {
    const keyboard = useKeyboard({
      enabled: true,
      onDelete: () => {
        const selectedNodes = nodesRef.value.filter((n) => n.selected)
        const selectedEdges = edgesRef.value.filter((e) => e.selected)
        selectedNodes.forEach((node) => nodesManager.removeNode(node.id))
        selectedEdges.forEach((edge) => edgesManager.removeEdge(edge.id))
      },
      onUndo: () => historyManager.undo(),
      onRedo: () => historyManager.redo(),
      onSelectAll: () => {
        nodesRef.value.forEach((n) => {
          n.selected = true
        })
        edgesRef.value.forEach((e) => {
          e.selected = true
        })
      },
      onEscape: () => selectionManager.clearSelection()
    })
    handleKeyDown = keyboard.handleKeyDown
    document.addEventListener('keydown', handleKeyDown)
  }
})

onBeforeUnmount(() => {
  if (props.keyboardShortcuts && handleKeyDown) {
    document.removeEventListener('keydown', handleKeyDown)
  }
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
  // Clean up plugins and event bus
  pluginManager.destroyAll()
  eventBus.clear()
})
</script>

<style scoped>
.yh-flow {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f8f9fa;
  user-select: none;
}

.yh-flow.is-readonly {
  cursor: default;
}

.yh-flow__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.yh-flow__content > * {
  pointer-events: auto;
}

.yh-flow__connection-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 1000;
}
</style>
