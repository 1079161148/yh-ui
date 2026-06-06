# 隐藏 (Hidden)

在流程图中，我们经常需要实现类似于“折叠”或“过滤”视图的高级交互。比起硬生生地从数据中将 Node 或 Edge `splice` 删掉（这会丢失它的坐标和配置），我们在 Flow 中直接提供了一个非侵入式的 `hidden` 属性。

## 隐藏节点与连线示例

点击下方工具栏的复选框，观察部分节点及连线是如何从视图中消失的，但它们并没有被销毁。

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs } from '../.vitepress/theme/utils/demo-utils'

const tsCode = `<template>
  <div style="display: flex; flex-direction: column; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 16px; align-items: center; z-index: 2;">
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">
        <input type="checkbox" v-model="isHidden" style="cursor: pointer;" />
        隐藏高亮元素 (红边框)
      <\/label>
    <\/div>
    
    <div style="flex: 1; height: 100%;">
      <yh-flow
        :nodes="computedNodes"
        :edges="computedEdges"
        background="grid"
      />
    <\/div>
  <\/div>
<\/template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Node, Edge } from '@yh-ui/flow'

const isHidden = ref(false)

const baseNodes: Node[] = [
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: '节点 1' } },
  { 
    id: '2', 
    type: 'default', 
    position: { x: 100, y: 150 }, 
    data: { label: '节点 2 (可隐藏)' },
    style: { border: '2px solid #ef4444', color: '#ef4444' }
  },
  { id: '3', type: 'output', position: { x: 100, y: 250 }, data: { label: '节点 3' } },
  { 
    id: '4', 
    type: 'default', 
    position: { x: 350, y: 150 }, 
    data: { label: '节点 4 (可隐藏)' },
    style: { border: '2px solid #ef4444', color: '#ef4444' }
  }
]

const baseEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight' },
  { id: 'e2-3', source: '2', target: '3', type: 'straight' },
  { 
    id: 'e1-4', 
    source: '1', 
    target: '4', 
    type: 'default',
    label: '可隐藏连线',
    style: { stroke: '#ef4444' } 
  }
]

const computedNodes = computed(() => {
  return baseNodes.map(node => ({
    ...node,
    hidden: (node.id === '2' || node.id === '4') ? isHidden.value : false
  }))
})

const computedEdges = computed(() => {
  return baseEdges.map(edge => ({
    ...edge,
    hidden: edge.id === 'e1-4' ? isHidden.value : false
  }))
})
<\/script>
`

const jsCode = toJs(tsCode)

const isHidden = ref(false)

const baseNodes = [
  { id: '1', type: 'input', position: { x: 100, y: 50 }, data: { label: '节点 1' } },
  { 
    id: '2', 
    type: 'default', 
    position: { x: 100, y: 150 }, 
    data: { label: '节点 2' },
    style: { border: '1px solid #ef4444', color: '#ef4444' }
  },
  { id: '3', type: 'output', position: { x: 100, y: 250 }, data: { label: '节点 3' } },
  { 
    id: '4', 
    type: 'default', 
    position: { x: 350, y: 150 }, 
    data: { label: '节点 4' },
    style: { border: '1px solid #ef4444', color: '#ef4444' }
  }
]

const baseEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight' },
  { id: 'e2-3', source: '2', target: '3', type: 'straight' },
  { 
    id: 'e1-4', 
    source: '1', 
    target: '4', 
    type: 'default',
    label: '可隐藏连线',
    style: { stroke: '#ef4444' } 
  }
]

const computedNodes = computed(() => {
  return baseNodes.map(node => {
    if (node.id === '2' || node.id === '4') {
      return { ...node, hidden: isHidden.value }
    }
    return node
  })
})

const computedEdges = computed(() => {
  return baseEdges.map(edge => {
    if (edge.id === 'e1-4') {
      return { ...edge, hidden: isHidden.value }
    }
    return edge
  })
})
</script>

<DemoBlock title="基础隐藏逻辑" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 450px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 16px; align-items: center; z-index: 2;">
      <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px; user-select: none;">
        <input type="checkbox" v-model="isHidden" style="cursor: pointer;" />
        隐藏高亮元素 (红边框)
      </label>
    </div>
    <div style="flex: 1; height: 100%;">
      <yh-flow
        :model-value="{ x: 100, y: 0, zoom: 1 }"
        :nodes="computedNodes"
        :edges="computedEdges"
        background="grid"
      />
    </div>
  </div>
</DemoBlock>

## 为什么使用 `hidden`？

使用 `hidden` 标志胜过直接从状态数组中删除。它保留了图表的数学完整性（位置、尺寸、父子关系），允许您在无需重新计算布局的情况下瞬间恢复它们。

| 字段          | 目标         | 说明                                             |
| :------------ | :----------- | :----------------------------------------------- |
| `Node.hidden` | **单个节点** | 为 `true` 时，节点被跳过渲染。其坐标记录被保留。 |
| `Edge.hidden` | **单个连线** | 为 `true` 时，标准的 SVG 路径将不被绘制。        |

> [!TIP]
>
> **级联隐藏**：当一个 **Node** 被隐藏时，所有与其相连（无论是作为起点还是终点）的 **Edge** 都会被引擎自动隐藏。这防止了在缺少锚点的情况下，“幽灵”连接线在视图中散乱排布。
