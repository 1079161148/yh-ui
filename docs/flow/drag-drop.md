# 拖放 (Drag & Drop)

在构建节点流程编辑器时，一个常见的需求是将侧边栏中的节点拖放到画布中。
在 Flow 中，我们可以直接通过原生的 HTML5 `Drag and Drop` API 和我们暴露的 `screenToCanvas` 方法来实现这一功能。

## 基础拖放示例

您可以在左侧的侧边栏中拖拽不同类型的块，并将其放置到右侧的画布内。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, Node, Edge, ViewportTransform } from '@yh-ui/flow'

const tsCode = `<template>
  <div class="dnd-container">
    <div class="dnd-sidebar">
      <div class="sidebar-title">拖拽下方节点:</div>
      <div 
        class="dnd-node input" 
        draggable="true" 
        @dragstart="onDragStart($event, 'input')"
      >
        输入节点
      <\/div>
      <div 
        class="dnd-node default" 
        draggable="true" 
        @dragstart="onDragStart($event, 'default')"
      >
        默认节点
      <\/div>
      <div 
        class="dnd-node output" 
        draggable="true" 
        @dragstart="onDragStart($event, 'output')"
      >
        输出节点
      <\/div>
    <\/div>
    
    <div class="dnd-flowbox" @drop="onDrop" @dragover="onDragOver">
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
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 5 },
    data: { label: '现有节点' }
  }
])

const edges = ref<Edge[]>([])

let id = 0
const getId = () => \`dndnode_\${id++}\`

const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/yhflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!flowRef.value) return
  
  const type = event.dataTransfer?.getData('application/yhflow')
  if (!type) return

  // screenToCanvas 需要传入相对 Flow 容器的坐标
  const el = (flowRef.value as any).$el
  const rect = el?.getBoundingClientRect()
  if (!rect) return
  const position = flowRef.value.screenToCanvas(event.clientX - rect.left, event.clientY - rect.top)
  
  const newNode: Node = {
    id: getId(),
    type,
    position,
    data: { label: \`\${type} 节点\` }
  }
  
  nodes.value.push(newNode)
}
<\/script>

<style scoped>
.dnd-container {
  display: flex;
  height: 400px;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.dnd-sidebar {
  width: 150px;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sidebar-title {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
}
.dnd-node {
  padding: 10px 12px;
  border: 1px solid #1a192b;
  border-radius: 4px;
  cursor: grab;
  background: white;
  font-size: 13px;
  text-align: center;
  transition: all 0.2s;
}
.dnd-node:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.dnd-node.input { border-color: #3b82f6; color: #3b82f6; }
.dnd-node.output { border-color: #10b981; color: #10b981; }
.dnd-flowbox {
  flex: 1;
  height: 100%;
}
<\/style>`

const jsCode = toJs(tsCode)

const flowRef = ref<FlowInstance>()
const viewport = ref<ViewportTransform>({ x: 0, y: 0, zoom: 1 })
const nodes = ref<Node[]>([
  {
    id: '1',
    type: 'input',
    position: { x: 250, y: 50 },
    data: { label: '现有节点' }
  }
])
const edges = ref<Edge[]>([])

let idCount = 0
const getId = () => `dndnode_${idCount++}`

const onDragStart = (event: DragEvent, nodeType: string) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/yhflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  if (!flowRef.value) return
  
  const type = event.dataTransfer?.getData('application/yhflow')
  if (!type) return

  const el = (flowRef.value as any).$el
  const rect = el?.getBoundingClientRect()
  if (!rect) return
  const position = flowRef.value.screenToCanvas(event.clientX - rect.left, event.clientY - rect.top)
  
  nodes.value.push({
    id: getId(),
    type,
    position,
    data: { label: `${type} 节点` }
  })
}
</script>

<DemoBlock title="基础拖放" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; height: 400px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="width: 150px; border-right: 1px solid #eee; padding: 15px 10px; background: #f8fafc; display: flex; flex-direction: column; gap: 12px; z-index: 2;">
      <div style="font-size: 13px; color: #64748b; margin-bottom: 8px;">拖拽下方节点:</div>
      <div style="padding: 10px 12px; border: 1px solid #3b82f6; color: #3b82f6; border-radius: 4px; cursor: grab; background: white; font-size: 13px; text-align: center;" draggable="true" @dragstart="onDragStart($event, 'input')">输入节点</div>
      <div style="padding: 10px 12px; border: 1px solid #1a192b; color: #1a192b; border-radius: 4px; cursor: grab; background: white; font-size: 13px; text-align: center;" draggable="true" @dragstart="onDragStart($event, 'default')">默认节点</div>
      <div style="padding: 10px 12px; border: 1px solid #10b981; color: #10b981; border-radius: 4px; cursor: grab; background: white; font-size: 13px; text-align: center;" draggable="true" @dragstart="onDragStart($event, 'output')">输出节点</div>
    </div>
    <div style="flex: 1; height: 100%;" @drop="onDrop" @dragover="onDragOver">
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        v-model:nodes="nodes"
        v-model:edges="edges"
        background="dots"
      />
    </div>
  </div>
</DemoBlock>

## API 概述

拖放与 HTML Native API 完全脱钩，核心依赖的是坐标系转换。因为屏幕坐标与视图内的画布坐标包含由无极缩放和平移带来的增减量是不同的：

| 方法出口               | 说明                                                                                                                                   | 签名                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `screenToCanvas(x, y)` | 传入**相对 Flow 容器**的坐标 (x, y)，返回画布内部坐标。需先将 `event.clientX/clientY` 减去容器 `getBoundingClientRect()` 的 left/top。 | `(x: number, y: number) => { x: number, y: number }` |

```ts
const onDrop = (event: DragEvent) => {
  const flowInstance = flowRef.value
  if (!flowInstance) return
  const el = (flowInstance as any).$el
  const rect = el?.getBoundingClientRect()
  if (!rect) return
  const dropPosition = flowInstance.screenToCanvas(
    event.clientX - rect.left,
    event.clientY - rect.top
  )
  // 将 dropPosition 设置为新节点的 position
}
```
