# 更新节点 (Updating Nodes)

在 `yh-flow` 中，节点是完全响应式的。这意味着当您通过代码修改传入组件的 `nodes` 数组数据（例如修改坐标、样式、标签或业务元数据）时，画布视口将实时同步更新。无需手动调用 `refresh()` 或 `render()` 方法。

## 实时属性绑定示例

在该示例中，我们演示了如何通过外部表单动态绑定节点的标签和背景颜色。点击下方的图表节点以启用编辑面板。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="update-container">
    <div class="update-toolbar">
      <div class="form-item">
        <label>标签:<\/label>
        <input v-model="selectedNodeLabel" :disabled="!selectedNodeId" placeholder="选择一个节点..." />
      <\/div>
      <div class="form-item">
        <label>颜色:<\/label>
        <input type="color" v-model="selectedNodeColor" :disabled="!selectedNodeId" />
      <\/div>
    <\/div>
    
    <div class="update-flowbox">
      <yh-flow
        :nodes="nodes"
        :edges="edges"
        @node-click="onNodeClick"
        @pane-click="onPaneClick"
        background="dots"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 A' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: '节点 B' } }
])
const edges = ref<Edge[]>([])

const selectedNodeId = ref<string | null>(null)

const selectedNodeLabel = computed({
  get: () => nodes.value.find(n => n.id === selectedNodeId.value)?.data?.label || '',
  set: (val) => {
    const index = nodes.value.findIndex(n => n.id === selectedNodeId.value)
    if (index !== -1) {
      const newNodes = [...nodes.value]
      newNodes[index] = { ...newNodes[index], data: { ...newNodes[index].data, label: val } }
      nodes.value = newNodes
    }
  }
})

const selectedNodeColor = computed({
  get: () => nodes.value.find(n => n.id === selectedNodeId.value)?.style?.backgroundColor || '#ffffff',
  set: (val) => {
    const index = nodes.value.findIndex(n => n.id === selectedNodeId.value)
    if (index !== -1) {
      const newNodes = [...nodes.value]
      newNodes[index] = { ...newNodes[index], style: { ...newNodes[index].style, backgroundColor: val } }
      nodes.value = newNodes
    }
  }
})

const onNodeClick = ({ node }) => selectedNodeId.value = node.id
const onPaneClick = () => selectedNodeId.value = null
<\/script>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 A' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: '节点 B' } }
])
const selectedNodeId = ref<string | null>(null)

const selectedNodeLabel = computed({
  get: () => nodes.value.find(n => n.id === selectedNodeId.value)?.data?.label || '',
  set: (val) => {
    const index = nodes.value.findIndex(n => n.id === selectedNodeId.value)
    if (index !== -1) {
      const newNodes = [...nodes.value]
      newNodes[index] = { ...newNodes[index], data: { ...newNodes[index].data, label: val } }
      nodes.value = newNodes
    }
  }
})

const selectedNodeColor = computed({
  get: () => nodes.value.find(n => n.id === selectedNodeId.value)?.style?.backgroundColor || '#ffffff',
  set: (val) => {
    const index = nodes.value.findIndex(n => n.id === selectedNodeId.value)
    if (index !== -1) {
      const newNodes = [...nodes.value]
      newNodes[index] = { ...newNodes[index], style: { ...newNodes[index].style, backgroundColor: val } }
      nodes.value = newNodes
    }
  }
})

function onNodeClick(e: { node: Node }) {
  selectedNodeId.value = e.node.id
}
function onPaneClick() {
  selectedNodeId.value = null
}
</script>

<DemoBlock title="响应式属性更新" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 24px; align-items: center; z-index: 2;">
      <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569;">
        <label>标签:</label>
        <input v-model="selectedNodeLabel" :disabled="!selectedNodeId" placeholder="点击节点进行编辑" style="border: 1px solid #cbd5e1; padding: 4px 8px; border-radius: 4px;" />
      </div>
      <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569;">
        <label>颜色:</label>
        <input type="color" v-model="selectedNodeColor" :disabled="!selectedNodeId" />
      </div>
      <div v-if="!selectedNodeId" style="font-size: 11px; color: #94a3b8;">➔ 选择一个节点开始编辑</div>
    </div>
    <div style="flex: 1;">
      <yh-flow
        :nodes="nodes"
        :edges="[]"
        @node-click="onNodeClick"
        @pane-click="onPaneClick"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

1.  **状态管理**：由于 `yh-flow` 出于性能优化原因不再进行全量深度追踪（Deep Watch），**您必须通过全新的对象/数组引用替换**来触发属性更新（不可变更新范式）。例如：`nodes.value = nodes.value.map(n => n.id === id ? { ...n, data: { ...n.data, label: 'Value' } } : n)`。
2.  **位置偏移**：要通过编程方式移动节点（例如用于自动布局或对齐），请同步更新新的节点对象数组覆盖旧的 `nodes`。
3.  **高频更新**：对于拥有数千个节点的大型图表，我们暴露了内部的 `flowInstance.updateNode(nodeId, data)` 方法用于极其高频和大规模的局部属性修改，以避免产生整个数组重构或不必要的应用层重绘开销。
