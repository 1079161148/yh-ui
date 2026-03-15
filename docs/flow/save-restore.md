# 保存并恢复 (Save & Restore)

在编辑器场景中，您非常需要将用户操作后呈现的画布（Nodes 和 Edges 的状态及视图状态）持久化，并在随后重新加载它们。在 Flow 中，我们可以利用自带的方法方便地提取和恢复整个画布状态。

## 基础保存与恢复示例

修改下方的图表，然后尝试“保存”和“恢复”按钮。我们使用浏览器的 `localStorage` 来模拟持久化数据层。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, ViewportTransform, Node, Edge } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="sr-container">
    <div class="sr-toolbar">
      <button class="sr-btn" @click="saveState">保存至 LocalStorage<\/button>
      <button class="sr-btn restore" @click="restoreState">恢复状态<\/button>
      <button class="sr-btn clear" @click="clearState">清空画布<\/button>
      <div v-if="saveTime" class="sr-tip">上次保存: {{ saveTime }}<\/div>
    <\/div>
    
    <div class="sr-flowbox">
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform, FlowInstance } from '@yh-ui/flow'

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: '节点 2' } }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' }
])

const saveTime = ref('')
const STORAGE_KEY = 'yh-flow-persistence-demo'

const saveState = () => {
  if (!flowRef.value) return
  
  // 直接从引擎实例中提取状态
  const data = {
    nodes: flowRef.value.getNodes(),
    edges: flowRef.value.getEdges(),
    viewport: flowRef.value.getViewport()
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  saveTime.value = new Date().toLocaleTimeString()
}

const restoreState = () => {
  const dataStr = localStorage.getItem(STORAGE_KEY)
  if (dataStr) {
    const data = JSON.parse(dataStr)
    nodes.value = data.nodes || []
    edges.value = data.edges || []
    if (data.viewport) {
      flowRef.value?.setViewport(data.viewport)
    }
  }
}

const clearState = () => {
  nodes.value = []
  edges.value = []
}
<\/script>

<style scoped>
.sr-container {
  display: flex; flex-direction: column; height: 450px; width: 100%;
  border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;
}
.sr-toolbar {
  padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee;
  display: flex; gap: 8px; align-items: center;
}
.sr-btn {
  padding: 6px 12px; background: #3b82f6; color: white; border-radius: 4px;
  font-size: 13px; cursor: pointer; border: none;
}
.sr-btn.restore { background: #10b981; }
.sr-btn.clear { background: #ef4444; }
.sr-tip { font-size: 12px; color: #64748b; margin-left: auto; }
.sr-flowbox { flex: 1; height: 100%; }
<\/style>`

const jsCode = toJs(tsCode)

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 250, y: 150 }, data: { label: '节点 2' } }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' }
])

const saveTime = ref('')
const STORAGE_KEY = 'yh-flow-persistence-demo'

const saveState = () => {
  if (!flowRef.value) return
  const data = {
    nodes: flowRef.value.getNodes(),
    edges: flowRef.value.getEdges(),
    viewport: flowRef.value.getViewport()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  saveTime.value = new Date().toLocaleTimeString()
}

const restoreState = () => {
  const dataStr = localStorage.getItem(STORAGE_KEY)
  if (dataStr) {
    const data = JSON.parse(dataStr)
    nodes.value = data.nodes || []
    edges.value = data.edges || []
    if (data.viewport) {
      flowRef.value?.setViewport(data.viewport)
    }
  }
}

const clearState = () => { nodes.value = []; edges.value = [] }
</script>

<DemoBlock title="状态保存与加载" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; align-items: center; z-index: 2;">
      <button @click="saveState" style="padding: 6px 12px; background: #3b82f6; color: white; border-radius: 4px; font-size: 13px; border:none; cursor:pointer;">保存</button>
      <button @click="restoreState" style="padding: 6px 12px; background: #10b981; color: white; border-radius: 4px; font-size: 13px; border:none; cursor:pointer;">恢复</button>
      <button @click="clearState" style="padding: 6px 12px; background: #ef4444; color: white; border-radius: 4px; font-size: 13px; border:none; cursor:pointer;">清空</button>
      <div v-if="saveTime" style="font-size: 12px; color: #64748b; margin-left: auto;">保存于: {{ saveTime }}</div>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## 核心原理

捕捉图表状态以进行持久化主要有两种方式：

1.  **从引擎实例捕获**：这是最准确的方法。通过 `ref` 访问 `FlowInstance` 并调用 `getNodes()` 和 `getEdges()` 等方法。这将检索所有实体的当前内部状态，包括用户驱动的位置更改。
2.  **外部响应式状态同步**：如果您正在使用全局状态管理器（如 Pinia），您可以在组件发出更改事件（如 `@nodes-drag-end`）时同步您的 `nodes` 和 `edges` 数组。

### 实例方法参考

| 方法名         | 返回类型 | 说明                                                |
| :------------- | :------- | :-------------------------------------------------- |
| `getNodes()`   | `Node[]` | 返回引擎中当前所有节点的深度快照。                  |
| `getEdges()`   | `Edge[]` | 返回引擎中当前所有连线的深度快照。                  |
| `exportJson()` | `string` | [(需要导出插件)] 将内部图表数据包装成序列化字符串。 |
