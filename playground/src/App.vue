<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { Flow, type Node, type Edge, type ViewportTransform } from '@yh-ui/flow'

// 交互配置状态
const config = reactive({
  // 视口交互
  zoomEnabled: true,
  panEnabled: true,
  minZoom: 0.1,
  maxZoom: 5,
  zoomStep: 0.1,

  // 节点交互
  nodesDraggable: true,
  selectable: true,
  multipleSelection: true, // Shift多选

  // 连线交互
  edgesConnectable: true,
  connectionValidator: true,
  noCycleValidation: false,

  // 网格与对齐
  snapToGrid: true,
  snapGrid: [15, 15] as [number, number],
  showAlignmentLines: true,
  snapThreshold: 10,

  // 辅助功能
  background: 'dots' as 'none' | 'dots' | 'grid',
  backgroundColor: '#f8f9fa',
  gridSize: 15,
  showControls: true,
  showMinimap: true,

  // 历史记录
  history: true,
  maxHistory: 50,

  // 键盘快捷键
  keyboardShortcuts: true,

  // 只读模式
  readonly: false
})

// 视口状态
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

// 初始节点数据
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    position: { x: 100, y: 100 },
    data: { label: '开始节点' },
    width: 180,
    height: 50
  },
  {
    id: '2',
    type: 'default',
    position: { x: 400, y: 100 },
    data: { label: '处理节点 A' },
    width: 180,
    height: 50
  },
  {
    id: '3',
    type: 'default',
    position: { x: 700, y: 100 },
    data: { label: '处理节点 B' },
    width: 180,
    height: 50
  },
  {
    id: '4',
    type: 'default',
    position: { x: 400, y: 300 },
    data: { label: '判断节点' },
    width: 180,
    height: 60
  },
  {
    id: '5',
    type: 'output',
    position: { x: 700, y: 300 },
    data: { label: '结束节点' },
    width: 180,
    height: 50
  }
]

// 初始边数据
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'bezier', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'bezier' },
  { id: 'e2-4', source: '2', target: '4', type: 'bezier' },
  { id: 'e4-5', source: '4', target: '5', type: 'bezier', label: '是' }
]

const nodes = ref<Node[]>([...initialNodes])
const edges = ref<Edge[]>([...initialEdges])

// Flow 组件实例引用
const flowRef = ref<InstanceType<typeof Flow> | null>(null)

// 事件日志
const eventLogs = ref<Array<{ type: string; message: string; time: string }>>([])

const addLog = (type: string, message: string) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  eventLogs.value.unshift({ type, message, time })
  // 限制日志数量
  if (eventLogs.value.length > 50) {
    eventLogs.value.pop()
  }
}

// 节点事件处理
const handleNodeClick = (event: { node: Node; nativeEvent: MouseEvent }) => {
  addLog('click', `节点 clicked: ${event.node.data?.label || event.node.id}`)
}

const handleNodeDblClick = (event: { node: Node; nativeEvent: MouseEvent }) => {
  addLog('dblclick', `节点 double-clicked: ${event.node.data?.label || event.node.id}`)
}

const handleNodeDragStart = (event: { node: Node; nativeEvent: MouseEvent }) => {
  addLog('drag', `开始拖拽节点: ${event.node.data?.label || event.node.id}`)
}

const handleNodeDrag = (event: {
  node: Node
  nativeEvent: MouseEvent
  position: { x: number; y: number }
}) => {
  // 频繁事件，不记录日志
  void event
}

const handleNodeDragEnd = (event: { node: Node; nativeEvent: MouseEvent }) => {
  addLog('drag', `结束拖拽节点: ${event.node.data?.label || event.node.id}`)
}

const handleNodeContextMenu = (event: { node: Node; nativeEvent: MouseEvent }) => {
  addLog('context', `节点 context menu: ${event.node.data?.label || event.node.id}`)
}

// 边事件处理
const handleEdgeClick = (event: { edge: Edge; nativeEvent: MouseEvent }) => {
  addLog('click', `边 clicked: ${event.edge.id}`)
}

const handleEdgeDblClick = (event: { edge: Edge; nativeEvent: MouseEvent }) => {
  addLog('dblclick', `边 double-clicked: ${event.edge.id}`)
}

const handleEdgeContextMenu = (event: { edge: Edge; nativeEvent: MouseEvent }) => {
  addLog('context', `边 context menu: ${event.edge.id}`)
}

const handleEdgeConnect = (connection: { source: string; target: string }) => {
  addLog('connect', `连接 created: ${connection.source} -> ${connection.target}`)
}

// 选区事件
const handleSelectionChange = (event: { selectedNodes: Node[]; selectedEdges: Edge[] }) => {
  const nodeCount = event.selectedNodes.length
  const edgeCount = event.selectedEdges.length
  if (nodeCount > 0 || edgeCount > 0) {
    addLog('selection', `选区变化: ${nodeCount} 节点, ${edgeCount} 边`)
  }
}

// 历史事件
const handleHistoryChange = (event: { canUndo: boolean; canRedo: boolean }) => {
  addLog('history', `历史状态变化: undo=${event.canUndo}, redo=${event.canRedo}`)
}

// 视口事件
const handleViewportChange = (_transform: ViewportTransform) => {
  // 频繁事件，不记录日志
}

// 快捷操作
const resetGraph = () => {
  nodes.value = JSON.parse(JSON.stringify(initialNodes))
  edges.value = JSON.parse(JSON.stringify(initialEdges))
  viewport.value = { x: 0, y: 0, zoom: 1 }
  addLog('action', '重置图数据')
}

const addRandomNode = () => {
  const id = `node-${Date.now()}`
  const x = Math.random() * 600 + 100
  const y = Math.random() * 400 + 100
  nodes.value.push({
    id,
    type: 'default',
    position: { x, y },
    data: { label: `新节点 ${id.slice(-4)}` },
    width: 150,
    height: 50
  })
  addLog('action', `添加节点: ${id}`)
}

const fitView = () => {
  // 调用 Flow 组件的 fitView 方法
  if (flowRef.value?.fitView) {
    flowRef.value.fitView({ padding: 50 })
  }
  addLog('action', 'Fit View')
}

const zoomIn = () => {
  if (flowRef.value?.zoomIn) {
    flowRef.value.zoomIn(1.2)
  }
  addLog('action', 'Zoom In')
}

const zoomOut = () => {
  if (flowRef.value?.zoomOut) {
    flowRef.value.zoomOut(1.2)
  }
  addLog('action', 'Zoom Out')
}

const centerView = () => {
  if (flowRef.value?.centerView) {
    flowRef.value.centerView()
  }
  addLog('action', 'Center View')
}

const pan = (dx: number, dy: number) => {
  if (flowRef.value?.pan) {
    flowRef.value.pan(dx, dy)
  }
  addLog('action', `Pan: ${dx}, ${dy}`)
}

const setZoom = (zoom: number) => {
  if (flowRef.value?.setViewport) {
    flowRef.value.setViewport({ x: viewport.value.x, y: viewport.value.y, zoom })
    viewport.value.zoom = zoom
  }
  addLog('action', `Set Zoom: ${zoom}`)
}

const clearLogs = () => {
  eventLogs.value = []
  addLog('action', '清除日志')
}

// 选中的节点和边数量
const selectedInfo = computed(() => {
  const selectedNodes = nodes.value.filter((n) => n.selected).length
  const selectedEdges = edges.value.filter((e) => e.selected).length
  return { selectedNodes, selectedEdges }
})
</script>

<template>
  <div class="interaction-demo">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="toolbar-section">
        <h3>交互控制面板</h3>
      </div>
      <div class="toolbar-actions">
        <button class="btn btn-primary" @click="fitView" title="适应视图">Fit View</button>
        <button class="btn" @click="zoomIn" title="放大">Zoom In</button>
        <button class="btn" @click="zoomOut" title="缩小">Zoom Out</button>
        <button class="btn" @click="centerView" title="居中视图">Center</button>
        <button class="btn" @click="() => pan(100, 0)" title="向右平移">Pan Right</button>
        <button class="btn" @click="addRandomNode">添加节点</button>
        <button class="btn" @click="resetGraph">重置图</button>
        <button class="btn btn-warning" @click="config.readonly = !config.readonly">
          {{ config.readonly ? '编辑模式' : '只读模式' }}
        </button>
      </div>
    </div>

    <div class="main-content">
      <!-- 左侧配置面板 -->
      <div class="config-panel">
        <div class="config-section">
          <h4>视口交互</h4>
          <label class="config-item">
            <input type="checkbox" v-model="config.zoomEnabled" />
            <span>启用缩放 (Ctrl+滚轮)</span>
          </label>
          <label class="config-item">
            <input type="checkbox" v-model="config.panEnabled" />
            <span>启用平移 (拖拽空白区域)</span>
          </label>
          <div class="config-item">
            <span>最小缩放</span>
            <input type="number" v-model.number="config.minZoom" step="0.1" min="0.1" max="2" />
          </div>
          <div class="config-item">
            <span>最大缩放</span>
            <input type="number" v-model.number="config.maxZoom" step="0.1" min="1" max="10" />
          </div>
          <div class="config-item">
            <span>缩放步长</span>
            <input type="number" v-model.number="config.zoomStep" step="0.05" min="0.05" max="1" />
          </div>
          <div class="config-item config-actions">
            <button class="btn-tiny" @click="setZoom(0.5)">50%</button>
            <button class="btn-tiny" @click="setZoom(1)">100%</button>
            <button class="btn-tiny" @click="setZoom(2)">200%</button>
          </div>
        </div>

        <div class="config-section">
          <h4>节点交互</h4>
          <label class="config-item">
            <input type="checkbox" v-model="config.nodesDraggable" />
            <span>节点可拖拽</span>
          </label>
          <label class="config-item">
            <input type="checkbox" v-model="config.selectable" />
            <span>节点可选中</span>
          </label>
          <label class="config-item">
            <input type="checkbox" v-model="config.multipleSelection" />
            <span>Shift多选</span>
          </label>
          <label class="config-item">
            <span>框选 (Alt+拖拽)</span>
          </label>
        </div>

        <div class="config-section">
          <h4>连线交互</h4>
          <label class="config-item">
            <input type="checkbox" v-model="config.edgesConnectable" />
            <span>可创建连接</span>
          </label>
          <label class="config-item">
            <input type="checkbox" v-model="config.connectionValidator" />
            <span>连接验证</span>
          </label>
          <label class="config-item">
            <input type="checkbox" v-model="config.noCycleValidation" />
            <span>禁用循环检测</span>
          </label>
        </div>

        <div class="config-section">
          <h4>网格与对齐</h4>
          <label class="config-item">
            <input type="checkbox" v-model="config.snapToGrid" />
            <span>吸附到网格</span>
          </label>
          <div class="config-item">
            <span>网格大小</span>
            <input type="number" v-model.number="config.gridSize" step="5" min="5" max="50" />
          </div>
          <label class="config-item">
            <input type="checkbox" v-model="config.showAlignmentLines" />
            <span>显示对齐线</span>
          </label>
          <div class="config-item">
            <span>吸附阈值</span>
            <input type="number" v-model.number="config.snapThreshold" step="1" min="5" max="30" />
          </div>
        </div>

        <div class="config-section">
          <h4>辅助功能</h4>
          <label class="config-item">
            <span>背景类型</span>
            <select v-model="config.background">
              <option value="none">无</option>
              <option value="dots">点阵</option>
              <option value="grid">网格</option>
            </select>
          </label>
          <label class="config-item">
            <input type="checkbox" v-model="config.showControls" />
            <span>显示控制栏</span>
          </label>
          <label class="config-item">
            <input type="checkbox" v-model="config.showMinimap" />
            <span>显示小地图</span>
          </label>
        </div>

        <div class="config-section">
          <h4>历史与快捷键</h4>
          <label class="config-item">
            <input type="checkbox" v-model="config.history" />
            <span>启用撤销/重做</span>
          </label>
          <label class="config-item">
            <input type="checkbox" v-model="config.keyboardShortcuts" />
            <span>启用键盘快捷键</span>
          </label>
        </div>
      </div>

      <!-- 中间流程图 -->
      <div class="flow-container">
        <Flow
          ref="flowRef"
          v-model:nodes="nodes"
          v-model:edges="edges"
          v-model="viewport"
          :zoom-enabled="config.zoomEnabled"
          :pan-enabled="config.panEnabled"
          :nodes-draggable="config.nodesDraggable"
          :edges-connectable="config.edgesConnectable"
          :selectable="config.selectable"
          :background="config.background"
          :background-color="config.backgroundColor"
          :grid-size="config.gridSize"
          :snap-to-grid="config.snapToGrid"
          :snap-grid="config.snapGrid"
          :readonly="config.readonly"
          :show-controls="config.showControls"
          :show-minimap="config.showMinimap"
          :history="config.history"
          :max-history="config.maxHistory"
          :keyboard-shortcuts="config.keyboardShortcuts"
          :connection-validator="config.connectionValidator ? undefined : () => true"
          :no-cycle-validation="config.noCycleValidation"
          :show-alignment-lines="config.showAlignmentLines"
          :snap-threshold="config.snapThreshold"
          :min-zoom="config.minZoom"
          :max-zoom="config.maxZoom"
          :zoom-step="config.zoomStep"
          @node-click="handleNodeClick"
          @node-dblclick="handleNodeDblClick"
          @node-drag-start="handleNodeDragStart"
          @node-drag="handleNodeDrag"
          @node-drag-end="handleNodeDragEnd"
          @node-contextmenu="handleNodeContextMenu"
          @edge-click="handleEdgeClick"
          @edge-dblclick="handleEdgeDblClick"
          @edge-contextmenu="handleEdgeContextMenu"
          @edge-connect="handleEdgeConnect"
          @selection-change="handleSelectionChange"
          @history-change="handleHistoryChange"
          @viewport-change="handleViewportChange"
        >
          <template #node="{ node }">
            <div class="custom-node" :class="{ 'is-selected': node.selected }">
              <div class="node-icon">{{
                node.type === 'input' ? '▶' : node.type === 'output' ? '■' : '●'
              }}</div>
              <div class="node-content">
                <div class="node-label">{{ node.data?.label || node.id }}</div>
                <div class="node-type">{{ node.type }}</div>
              </div>
            </div>
          </template>
        </Flow>

        <!-- 选区信息 -->
        <div class="selection-info">
          已选择: {{ selectedInfo.selectedNodes }} 节点, {{ selectedInfo.selectedEdges }} 边
        </div>

        <!-- 视口信息 -->
        <div class="viewport-info">
          缩放: {{ (viewport.zoom * 100).toFixed(0) }}% | 位置: {{ viewport.x.toFixed(0) }},
          {{ viewport.y.toFixed(0) }}
        </div>
      </div>

      <!-- 右侧日志面板 -->
      <div class="log-panel">
        <div class="log-header">
          <h4>事件日志</h4>
          <button class="btn-small" @click="clearLogs">清除</button>
        </div>
        <div class="log-list">
          <div
            v-for="(log, index) in eventLogs"
            :key="index"
            class="log-item"
            :class="`log-${log.type}`"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-type">[{{ log.type }}]</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
          <div v-if="eventLogs.length === 0" class="log-empty"> 暂无日志 </div>
        </div>
      </div>
    </div>

    <!-- 底部快捷键提示 -->
    <div class="shortcuts-hint">
      <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>滚轮</kbd> 缩放</div>
      <div class="shortcut"><kbd>拖拽</kbd> 空白区域 平移</div>
      <div class="shortcut"><kbd>Alt</kbd>+<kbd>拖拽</kbd> 框选</div>
      <div class="shortcut"><kbd>Shift</kbd>+<kbd>点击</kbd> 多选</div>
      <div class="shortcut"><kbd>Delete</kbd> 删除选中</div>
      <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>Z</kbd> 撤销</div>
      <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>Y</kbd> 重做</div>
      <div class="shortcut"><kbd>Ctrl</kbd>+<kbd>A</kbd> 全选</div>
      <div class="shortcut"><kbd>Esc</kbd> 取消选择</div>
    </div>
  </div>
</template>

<style lang="scss">
.interaction-demo {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1a1a2e;
  color: #eee;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #16213e;
  border-bottom: 1px solid #0f3460;

  h3 {
    margin: 0;
    font-size: 18px;
    color: #00d9ff;
  }
}

.toolbar-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #0f3460;
  border-radius: 6px;
  background: #1a1a2e;
  color: #eee;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #0f3460;
    border-color: #00d9ff;
  }

  &.btn-primary {
    background: #00d9ff;
    color: #1a1a2e;
    border-color: #00d9ff;

    &:hover {
      background: #00b8d9;
    }
  }

  &.btn-warning {
    background: #f39c12;
    color: #1a1a2e;
    border-color: #f39c12;

    &:hover {
      background: #e67e22;
    }
  }
}

.btn-tiny {
  padding: 2px 8px;
  border: 1px solid #0f3460;
  border-radius: 4px;
  background: #1a1a2e;
  color: #00d9ff;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #0f3460;
    border-color: #00d9ff;
  }
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.config-panel {
  width: 280px;
  padding: 16px;
  background: #16213e;
  overflow-y: auto;
  border-right: 1px solid #0f3460;
}

.config-section {
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #0f3460;

  h4 {
    margin: 0 0 12px 0;
    font-size: 14px;
    color: #00d9ff;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.config-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 13px;

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    accent-color: #00d9ff;
  }

  input[type='number'],
  select {
    flex: 1;
    padding: 4px 8px;
    border: 1px solid #0f3460;
    border-radius: 4px;
    background: #1a1a2e;
    color: #eee;
    font-size: 12px;

    &:focus {
      outline: none;
      border-color: #00d9ff;
    }
  }

  span {
    flex: 1;
  }

  &.config-actions {
    display: flex;
    gap: 4px;
    margin-top: 4px;
    padding-top: 4px;
    border-top: 1px dashed #0f3460;
  }
}

.flow-container {
  flex: 1;
  position: relative;
  background: #0f0f23;

  :deep(.yh-flow) {
    background: transparent;
  }

  :deep(.yh-flow-node) {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border: 1px solid #0f3460;

    &.is-selected {
      border-color: #00d9ff;
      box-shadow: 0 0 20px rgba(0, 217, 255, 0.3);
    }
  }

  :deep(.yh-flow-handle) {
    background: #00d9ff;
    border-color: #00d9ff;
  }
}

.custom-node {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  height: 100%;

  .node-icon {
    font-size: 16px;
    color: #00d9ff;
  }

  .node-content {
    flex: 1;
  }

  .node-label {
    font-size: 14px;
    font-weight: 600;
    color: #eee;
  }

  .node-type {
    font-size: 11px;
    color: #888;
    text-transform: uppercase;
  }
}

.selection-info,
.viewport-info {
  position: absolute;
  bottom: 16px;
  padding: 8px 12px;
  background: rgba(22, 33, 62, 0.9);
  border: 1px solid #0f3460;
  border-radius: 6px;
  font-size: 12px;
  color: #aaa;
}

.selection-info {
  left: 16px;
}

.viewport-info {
  right: 16px;
}

.log-panel {
  width: 300px;
  display: flex;
  flex-direction: column;
  background: #16213e;
  border-left: 1px solid #0f3460;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #0f3460;

  h4 {
    margin: 0;
    font-size: 14px;
    color: #00d9ff;
  }
}

.btn-small {
  padding: 4px 8px;
  border: 1px solid #0f3460;
  border-radius: 4px;
  background: transparent;
  color: #888;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: #0f3460;
    color: #eee;
  }
}

.log-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.log-item {
  display: flex;
  gap: 6px;
  padding: 6px 8px;
  margin-bottom: 4px;
  font-size: 11px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.2);

  .log-time {
    color: #666;
    flex-shrink: 0;
  }

  .log-type {
    flex-shrink: 0;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 10px;
    text-transform: uppercase;
  }

  .log-message {
    color: #aaa;
    word-break: break-all;
  }

  &.log-click .log-type {
    background: #3498db;
    color: white;
  }

  &.log-dblclick .log-type {
    background: #9b59b6;
    color: white;
  }

  &.log-drag .log-type {
    background: #e67e22;
    color: white;
  }

  &.log-context .log-type {
    background: #e74c3c;
    color: white;
  }

  &.log-connect .log-type {
    background: #2ecc71;
    color: white;
  }

  &.log-selection .log-type {
    background: #f39c12;
    color: white;
  }

  &.log-history .log-type {
    background: #1abc9c;
    color: white;
  }

  &.log-action .log-type {
    background: #34495e;
    color: white;
  }
}

.log-empty {
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 13px;
}

.shortcuts-hint {
  display: flex;
  justify-content: center;
  gap: 24px;
  padding: 12px;
  background: #16213e;
  border-top: 1px solid #0f3460;
  flex-wrap: wrap;
}

.shortcut {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #888;

  kbd {
    padding: 2px 6px;
    background: #0f3460;
    border-radius: 4px;
    font-family: monospace;
    color: #00d9ff;
  }
}
</style>
