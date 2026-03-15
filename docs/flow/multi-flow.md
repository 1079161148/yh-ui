# 多流程 (Multi Flow)

在某些复杂的业务管理系统中，您可能需要在同一个页面上同时展示多个独立的流程图实例（例如：左侧是来源流程，右侧是转换后的目标流程）。

`yh-flow` 的设计天然支持多实例。每个 `<yh-flow>` 组件都是完全隔离的，拥有自己独立的坐标系、选择状态、撤销/重做堆栈以及插件系统。

## 多实例协作示例

下方展示了两个完全独立的 Flow 实例。您可以通过点击中间的按钮，尝试将左侧选中的节点“迁移”到右侧。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="multi-container">
    <div class="flow-panel">
      <div class="panel-header">来源流程 (Source)<\/div>
      <yh-flow
        v-model="viewport1"
        :nodes="nodes1"
        :edges="edges1"
        background="dots"
        @selection-change="s => selection1 = s.selectedNodes"
      />
    <\/div>

    <div class="action-bar">
      <button 
        class="move-btn" 
        :disabled="selection1.length === 0"
        @click="transferToRight"
      >
        迁移所选 ➔
      <\/button>
    <\/div>

    <div class="flow-panel">
      <div class="panel-header">目标流程 (Target)<\/div>
      <yh-flow
        v-model="viewport2"
        :nodes="nodes2"
        :edges="edges2"
        background="grid"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const viewport1 = ref<ViewportTransform>({ x: 0, y: 0, zoom: 0.8 })
const viewport2 = ref<ViewportTransform>({ x: 0, y: 0, zoom: 0.8 })

const nodes1 = ref<Node[]>([
  { id: 'S1', type: 'input', position: { x: 50, y: 50 }, data: { label: '来源 A' } },
  { id: 'S2', type: 'default', position: { x: 50, y: 150 }, data: { label: '来源 B' } }
])
const edges1 = ref<Edge[]>([])

const nodes2 = ref<Node[]>([
  { id: 'T1', type: 'output', position: { x: 50, y: 100 }, data: { label: '目标根节点' } }
])
const edges2 = ref<Edge[]>([])

const selection1 = ref<Node[]>([])

const transferToRight = () => {
  selection1.value.forEach(node => {
    // 1. 从源中移除
    nodes1.value = nodes1.value.filter(n => n.id !== node.id)
    
    // 2. 注入到目标，分配新 ID 以防冲突
    nodes2.value.push({
      ...node,
      id: \`moved-\${node.id}-\${Date.now()}\`,
      selected: false,
      position: { x: 50, y: nodes2.value.length * 80 + 50 }
    })
  })
  selection1.value = []
}
<\/script>

<style scoped>
.multi-container { display: flex; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white; }
.flow-panel { flex: 1; display: flex; flex-direction: column; border: 1px solid #f1f5f9; }
.panel-header { padding: 8px; background: #f8fafc; font-size: 12px; font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9; text-align: center; }
.action-bar { width: 120px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; }
.move-btn { padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer; }
.move-btn:disabled { background: #cbd5e1; cursor: not-allowed; }
<\/style>`

const jsCode = toJs(tsCode)

const viewport1 = ref<ViewportTransform>({ x: 20, y: 20, zoom: 0.8 })
const viewport2 = ref<ViewportTransform>({ x: 20, y: 20, zoom: 0.8 })
const nodes1 = ref<Node[]>([{ id: 'S1', type: 'input', position: { x: 20, y: 50 }, data: { label: '来源 A' } }, { id: 'S2', type: 'default', position: { x: 20, y: 150 }, data: { label: '来源 B' } }])
const nodes2 = ref<Node[]>([{ id: 'T1', type: 'output', position: { x: 20, y: 20 }, data: { label: '目标根节点' } }])
const selection1 = ref<Node[]>([])

const transferToRight = () => {
  selection1.value.forEach(node => {
    nodes1.value = nodes1.value.filter(n => n.id !== node.id)
    nodes2.value.push({
      ...node,
      id: `moved-${node.id}-${Date.now()}`,
      selected: false,
      position: { x: 20, y: nodes2.value.length * 80 + 20 }
    })
  })
  selection1.value = []
}
</script>

<DemoBlock title="并发实例" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <div style="flex: 1; display: flex; flex-direction: column; position: relative;">
      <div style="padding: 8px; background: #f8fafc; font-size: 12px; font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9; text-align: center;">来源流程 (Source)</div>
      <yh-flow
        v-model="viewport1"
        :nodes="nodes1"
        :edges="[]"
        background="dots"
        @selection-change="s => selection1 = s.selectedNodes"
      />
    </div>
    <div style="width: 120px; display: flex; align-items: center; justify-content: center; background: #f8fafc; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; z-index: 5;">
      <button 
        style="padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 11px; cursor: pointer;"
        :disabled="selection1.length === 0"
        @click="transferToRight"
      >
        迁移所选 ➔
      </button>
    </div>
    <div style="flex: 1; display: flex; flex-direction: column; position: relative;">
      <div style="padding: 8px; background: #f8fafc; font-size: 12px; font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9; text-align: center;">目标流程 (Target)</div>
      <yh-flow
        v-model="viewport2"
        :nodes="nodes2"
        :edges="[]"
        background="grid"
      />
    </div>
  </div>
</DemoBlock>

## 核心概念

1.  **状态隔离**：视口变换 (Viewport)、选择状态和历史记录堆栈（撤销/重做）严格属于每个本地实例。您无需担心交叉污染。
2.  **父组件驱动同步**：多实例间的通信最好通过父组件状态（如本示例所示）或 Pinia 等全局存储来处理。
3.  **性能可扩展性**：虽然可以激活多个实例，但每个实例都会增加自己的事件监听器和渲染开销。对于大多数桌面浏览器，显示 3-5 个并发流程（每个节点数 <100）是非常流畅的。
