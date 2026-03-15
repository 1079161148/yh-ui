# 简单布局 (Simple Layout)

在处理大量自动生成的节点数据时，手动指定每一个节点的坐标是非常耗时的。`yh-flow` 本身不强制内置复杂的图布局算法以保持体积轻量，但它能够完美地与业界成熟的布局库（如 [dagre](https://github.com/dagrejs/dagre)）结合。

## Dagre 自动排列示例

点击下方的按钮，系统将使用 Dagre 算法自动计算节点的最优层级位置，并平滑地应用到画布上。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="layout-container">
    <div class="layout-toolbar">
      <button class="layout-btn" @click="onLayout('TB')">垂直切换<\/button>
      <button class="layout-btn" @click="onLayout('LR')">水平切换<\/button>
    <\/div>
    
    <div class="layout-flowbox">
      <yh-flow
        ref="flowRef"
        :nodes="nodes"
        :edges="edges"
        background="dots"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'
// 前提：npm install dagre
import dagre from 'dagre'

const flowRef = ref<FlowInstance>()

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 0, y: 0 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 0, y: 0 }, data: { label: '节点 2' } },
  { id: '3', type: 'default', position: { x: 0, y: 0 }, data: { label: '节点 3' } },
  { id: '4', type: 'default', position: { x: 0, y: 0 }, data: { label: '节点 4' } },
  { id: '5', type: 'output', position: { x: 0, y: 0 }, data: { label: '节点 5' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' }
])

const onLayout = (direction: 'TB' | 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph()
  dagreGraph.setDefaultEdgeLabel(() => ({}))
  
  // 1. 配置布局参数
  dagreGraph.setGraph({ 
    rankdir: direction,
    nodesep: 50,
    ranksep: 70 
  })

  // 2. 将 Flow 数据导入 Dagre
  nodes.value.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 150, height: 50 })
  })

  edges.value.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  // 3. 执行布局计算
  dagre.layout(dagreGraph)

  // 4. 将计算后的坐标回填给 Vue 响应式数据
  nodes.value = nodes.value.map((node) => {
    const calculated = dagreGraph.node(node.id)
    return {
      ...node,
      position: {
        x: calculated.x - 75, // 这里的偏移是为了对齐中心点计算
        y: calculated.y - 25
      }
    }
  })
}
<\/script>

<style scoped>
.layout-container { display: flex; flex-direction: column; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
.layout-toolbar { padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; }
.layout-btn { padding: 6px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer; }
.layout-flowbox { flex: 1; height: 100%; }
<\/style>`

const jsCode = toJs(tsCode)

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 50, y: 150 }, data: { label: '节点 2' } },
  { id: '3', type: 'default', position: { x: 250, y: 150 }, data: { label: '节点 3' } },
  { id: '4', type: 'default', position: { x: 150, y: 250 }, data: { label: '节点 4' } },
  { id: '5', type: 'output', position: { x: 150, y: 350 }, data: { label: '节点 5' } }
])

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' }
])

const onLayout = async (direction: 'TB' | 'LR') => {
  try {
    const dagre = (await import('dagre')).default
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 70 })
    nodes.value.forEach((node) => dagreGraph.setNode(node.id, { width: 150, height: 50 }))
    edges.value.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target))
    dagre.layout(dagreGraph)
    nodes.value = nodes.value.map((node) => {
      const calculated = dagreGraph.node(node.id)
      return { ...node, position: { x: calculated.x - 75, y: calculated.y - 25 } }
    })
  } catch (err) {
    console.warn('Dagre 库加载失败')
  }
}
</script>

<DemoBlock title="Dagre 层级布局" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 12px; z-index: 2;">
      <button @click="onLayout('TB')" style="padding: 6px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">垂直排列 (TB)</button>
      <button @click="onLayout('LR')" style="padding: 6px 14px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">水平排列 (LR)</button>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        :nodes="nodes"
        :edges="edges"
        :model-value="{ x: 100, y: 50, zoom: 0.8 }"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## 实现工作流

在使用外部布局计算时，通常遵循以下步骤：

1.  **实例化引擎**：创建一个布局库（如 Dagre）的实例。
2.  **同步拓扑**：遍历您的 `nodes` 和 `edges` 数组，在布局引擎中镜像这一结构。_注意：大多数布局引擎需要您提供节点尺寸（width/height）以准确计算间距。_
3.  **运行计算**：执行布局命令。
4.  **回填状态**：从布局引擎中提取生成的 `x, y` 坐标，并批量更新 Vue 中的响应式 `nodes` 集合。

> [!TIP]
>
> 为了获得更出色的用户体验，您可以结合 CSS 过渡动画来执行布局变换，让节点顺滑地滑动到新位置。详情请参阅 **[动画与布局](./layout-animation)** 章节。
