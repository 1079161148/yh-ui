# Pinia 存储 (Pinia Store)

在大型应用中，将节点和连线数据存储在 Vue 组件的本地 `ref` 中往往难以维护。最推荐的做法是使用 [Pinia](https://pinia.vuejs.org/) 来接管所有的流程图状态，将其视为一种特殊的响应式数据库。

## Pinia 集成示例

在该示例中，所有的节点位置、连线和视口变换都存储在一个中心化的 Pinia Store 中。哪怕您切换页面再回来，状态依然被可靠地保留。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="pinia-container">
    <div class="pinia-toolbar">
      <button class="pinia-btn" @click="flowStore.randomize">随机排列位置<\/button>
      <button class="pinia-btn add" @click="flowStore.addNode">添加动态节点<\/button>
      <div class="node-count">总节点数: {{ flowStore.nodes.length }}<\/div>
    <\/div>
    
    <div class="pinia-flowbox">
      <yh-flow
        v-model="flowStore.viewport"
        :nodes="flowStore.nodes"
        :edges="flowStore.edges"
        background="dots"
        @node-drag-end="flowStore.onNodeDragEnd"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Node, Edge, ViewportTransform } from '@yh-ui/flow'

// 1. 定义您的流程逻辑存储
export const useFlowStore = defineStore('flow-logic', () => {
  const nodes = ref<Node[]>([
    { id: 'p1', type: 'input', position: { x: 50, y: 50 }, data: { label: '由 Pinia 管理' } }
  ])
  const edges = ref<Edge[]>([])
  const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

  const addNode = () => {
    const id = \`node-\${nodes.value.length + 1}\`
    nodes.value.push({
      id,
      type: 'default',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { label: \`新节点 \${id}\` }
    })
  }

  const randomize = () => {
    nodes.value = nodes.value.map(n => ({
      ...n,
      position: { x: Math.random() * 300, y: Math.random() * 200 }
    }))
  }

  const onNodeDragEnd = ({ node, position }: { node: Node, position: { x: number, y: number } }) => {
     const target = nodes.value.find(n => n.id === node.id)
     if (target) {
       target.position = position
     }
  }

  return { nodes, edges, viewport, addNode, randomize, onNodeDragEnd }
})

const flowStore = useFlowStore()
<\/script>

<style scoped>
.pinia-container { display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.pinia-toolbar { padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; align-items: center; }
.pinia-btn { padding: 6px 14px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer; }
.pinia-btn.add { background: #10b981; }
.node-count { font-size: 12px; color: #64748b; margin-left: auto; }
.pinia-flowbox { flex: 1; height: 100%; }
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: 'p1', type: 'input', position: { x: 50, y: 50 }, data: { label: '由 Pinia 管理' } }
])
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })

const addNode = () => {
  const id = `node-${nodes.value.length + 1}`
  nodes.value.push({
    id,
    type: 'default',
    position: { x: Math.random() * 200, y: Math.random() * 200 },
    data: { label: `新节点 ${id}` }
  })
}

const randomize = () => {
  nodes.value = nodes.value.map(n => ({
    ...n,
    position: { x: Math.random() * 300, y: Math.random() * 200 }
  }))
}
</script>

<DemoBlock title="中心化状态管理" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; align-items: center; z-index: 2;">
      <button @click="randomize" style="padding: 6px 14px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer;">随机排列位置</button>
      <button @click="addNode" style="padding: 6px 14px; background: #10b981; color: white; border: none; border-radius: 4px; font-size: 13px; cursor: pointer;">添加动态节点</button>
      <div style="font-size: 12px; color: #64748b; margin-left: auto;">总节点数: {{ nodes.length }}</div>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        v-model="viewport"
        :nodes="nodes"
        :edges="[]"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## 最佳实践

1.  **Setup 风格**：我们强烈建议使用 Pinia 的 "Setup Store"（函数式语法）。这允许您在 Store 内部使用标准的 Vue 组合式 API 功能（如 `computed` 和 `watch`），这与 `Flow` 的架构完美契合。
2.  **细粒度更新**：出于性能考虑，除非必要，否则应避免大规模的数组替换。直接修改节点对象内部的特定属性（例如 `node.data.label = 'Value'`）是非常高效的，因为它利用了 Vue 的细粒度响应式系统。
3.  **多实例同步**：如果您的应用使用多个 `Flow` 实例，Pinia 是在它们之间共享逻辑和状态（如统一的“剪贴板”）的理想选择。
